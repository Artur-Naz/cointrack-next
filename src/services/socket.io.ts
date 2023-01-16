import { toast } from 'react-toastify'
import { AppDispatch } from '../store/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import wio, { SharedWorkerSocketIO } from './socket.io-worker'
import { RawJob, removeJob, upsertJob } from '../modules/dashboard/slices/jobSlice'

export class Gateway {
  static instance?: Gateway
  private socket!: SharedWorkerSocketIO
  private dispatch: ThunkDispatch<any, any, AnyAction>
  private listeners: string[] = []
  private constructor(url: string, accessToken: string, dispatch: AppDispatch) {
    console.log('init socket')
    this.dispatch = dispatch
    this.socket = wio(`${process.env.NEXT_PUBLIC_COINTRACK_URL}/socket`, {
      reconnectionDelayMax: 10000,
      auth: {
        token: accessToken
      }
    })
    this.socket.useWorker('/shared-worker.js')

    this.registerHandlers()
  }

  static SocketFactory(url: string, accessToken: string, dispatch: AppDispatch) {
    if (!Gateway.instance) {
      Gateway.instance = new Gateway(url, accessToken, dispatch)
    }

    return Gateway.instance
  }

  private registerHandlers() {
    this.socket.on('connect', () => {
      console.log('Connected')
    })
    this.socket.on('disconnect', () => {
      console.log('Disconnected')
    })
    this.socket.on('pong', () => {
      console.log(new Date().toISOString())
    })
    this.socket.on('message', data => {
      console.log('received message', data)
    })

    //Wallet connect events
    this.on('connect.wallet.active', (data: RawJob) => {
      toast(`Job ${data.jobId} is active`)
      this.dispatch(upsertJob({ id: data.jobId, state: 'active' }))
    })
    this.on('connect.wallet.progress', (data: RawJob) => {
      this.dispatch(upsertJob({ id: data.jobId, state: 'active', progress: data.progress }))
    })
    this.on('connect.wallet.fail', (data: RawJob) => {
      toast(`Job ${data.jobId} is failed with error:  ${data.error}`)
      this.dispatch(upsertJob({ id: data.jobId, state: data.state }))
    })
    this.on('connect.wallet.completed', (data: RawJob) => {
      toast(`Job ${data.jobId} is completed`)
      this.dispatch(upsertJob({ id: data.jobId, state: data.state }))
    })

    //Wallet sync events
    this.on('sync.wallet.active', (data: RawJob) => {
      toast(`Job ${data.jobId} is active`)
      this.dispatch(upsertJob({ id: data.jobId, state: data.state }))
    })
    this.on('sync.wallet.progress', (data: RawJob) => {
      this.dispatch(upsertJob({ id: data.jobId, state: data.state, progress: data.progress }))
    })
    this.on('sync.wallet.fail', (data: RawJob) => {
      toast(`Job ${data.jobId} is failed with error:  ${data.error}`)
      this.dispatch(upsertJob({ id: data.jobId, state: data.state }))
      setTimeout(() => this.dispatch(removeJob(data.jobId)), 30000)
    })
    this.on('sync.wallet.completed', (data: RawJob) => {
      toast(`Job ${data.jobId} is completed`)
      this.dispatch(upsertJob({ id: data.jobId, state: data.state }))
      setTimeout(() => this.dispatch(removeJob(data.jobId)), 30000)
    })
  }

  on(event: string, cb: (data?: any) => void) {
    this.listeners.push(event)
    this.socket.on(event, cb)
  }

  registerHandler(ev: string, listener: () => void) {
    this.socket.on(ev, listener)
  }

  public unregisterHandlers() {
    this.listeners.forEach(listener => this.socket.off(listener))
    this.listeners = []
  }
}
