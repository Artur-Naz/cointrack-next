import EventEmitter from 'eventemitter3'
import io, { Socket } from 'socket.io-client'

// @ts-ignore
import SocketIoSharedWorker from '../../public/shared-worker'
import { ManagerOptions } from 'socket.io-client/build/esm/manager'
import { SocketOptions } from 'socket.io-client/build/esm/socket'

export class SharedWorkerSocketIO {
  WorkerType: typeof global.SharedWorker | typeof global.Worker = global.SharedWorker || global.Worker
  worker?: SharedWorker | Worker
  workerUri?: string
  socketUri!: string
  events = new EventEmitter()
  socket?: Socket
  started = false
  opts!: Partial<ManagerOptions & SocketOptions>

  constructor(socketUri: string, opts: Partial<ManagerOptions & SocketOptions>) {
    this.log('SharedWorkerSocketIO ', socketUri)
    this.socketUri = socketUri
    this.opts = opts
  }

  startSocketIo() {
    this.socket = io(this.socketUri, this.opts)
  }

  startWorker() {
    const workerUri = this.getWorkerUri()
    this.log('Starting Worker', this.WorkerType, workerUri)
    this.worker = new this.WorkerType(workerUri, {
      name: this.socketUri
    })

    const port = (this.worker as SharedWorker).port || this.worker
    port.onmessage = event => {
      this.log('<< worker received message:', event.data.type, event.data.message)
      this.events.emit(event.data.type, event.data.message)
    }
    this.worker.onerror = event => {
      this.log('worker error', event)
      this.events.emit('error', event)
    }
    port.postMessage({
      eventType: 'init',
      event: 'opts',
      data: this.opts.auth
    })
    this.log('worker started')
  }

  emit(event: any, data: any, cb: () => void) {
    this.log('>> emit:', event, data, cb)
    if (!this.started) this.start()
    if (this.worker) {
      // todo: ack cb
      const port = (this.worker as SharedWorker).port || this.worker
      port.postMessage({
        eventType: 'emit',
        event: event,
        data: data
      })
    } else {
      this.socket?.emit(event, data)
    }
  }

  on(event: any, cb: (data?: any) => void) {
    if (!this.started) this.start()
    if (this.worker) {
      this.log('worker add handler on event:', event)
      const port = (this.worker as SharedWorker).port || this.worker
      port.postMessage({
        eventType: 'on',
        event: event
      })
      this.events.on(event, cb)
    } else {
      this.log('socket add handler on event:', event)
      this.socket?.on(event, cb)
    }
  }
  off(eventName: string) {
    if (this.worker) {
      this.log('worker add handler on event:', event)
      const port = (this.worker as SharedWorker).port || this.worker
      port.postMessage({
        eventType: 'off',
        event: eventName
      })
      this.events.on(event as any, () => null)
    } else {
      this.log('socket add handler on event:', event)
      this.socket?.on(event as any, () => null)
    }
  }

  start() {
    if (this.started) return
    this.started = true
    try {
      this.log('Attempting to start socket.io shared webworker')
      this.startWorker()
    } catch (e) {
      this.log('Error starting socket.io shared webwoker')
      this.log('Starting socket.io instead')
      this.worker = undefined // disable worker
      this.startSocketIo()
    }
  }

  setWorkerType(WorkerType: typeof global.SharedWorker | typeof global.Worker) {
    this.log('Setting WorkerType', WorkerType)
    this.WorkerType = WorkerType
  }

  getWorkerObjectUrl() {
    const script = '(' + SocketIoSharedWorker.toString() + ')()'

    return global.URL.createObjectURL(new Blob([script], { type: 'application/javascript' }))
  }

  getWorkerUri() {
    return this.workerUri || this.getWorkerObjectUrl()
  }

  useWorker(uri: string) {
    this.log('Starting worker', uri)
    this.workerUri = uri
    if (!this.started) {
      this.start()
    }
  }

  log = process.env.NODE_ENV !== 'production' ? console.log.bind(console) : () => null
}

export default (uri: string, options: Partial<ManagerOptions & SocketOptions> = {}) =>
  new SharedWorkerSocketIO(uri, options)
