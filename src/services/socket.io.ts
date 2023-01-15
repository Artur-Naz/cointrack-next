import { Manager, Socket } from 'socket.io-client'
import { toast } from 'react-toastify'
import {AppDispatch} from "../store/store";
import {cointrackApi} from "./cointrack";
import {assetsItemAdapter, GetUserPortfolioState, portfolioSelectors} from "../modules/dashboard/api/portfoliosApi";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import wio, {SharedWorkerSocketIO} from "./socket.io-worker"
import {removeJob, updateJob} from "../modules/dashboard/slices/jobSlice";

export class Gateway {
  static instance?: Gateway
  private manager!: Manager
  private socket!:  SharedWorkerSocketIO
  private dispatch: ThunkDispatch<any, any, AnyAction>;
  private constructor(url: string, accessToken: string,  dispatch: AppDispatch) {
    console.log('init socket');
     this.dispatch = dispatch;
    this.socket = wio('http://localhost:8000/socket', {
      reconnectionDelayMax: 10000,
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      },
    })
    this.socket.useWorker('http://localhost:3000/shared-worker.js')
    this.socket.start() // use default SharedWorker script URL

    this.registerHandlers()

  }

  static SocketFactory(url: string, accessToken: string, dispatch: AppDispatch){
    if(!Gateway.instance){
      Gateway.instance = new Gateway(url, accessToken, dispatch)
    }

    return Gateway.instance
  }

  private registerHandlers(){
    this.socket.on('connect', () => {
      console.log('Connected');
    });
    this.socket.on('disconnect', () => {
      console.log('Disconnected');
    });
    this.socket.on('pong', () => {
      console.log(new Date().toISOString());
    });
    this.socket.on('message', (data) => {
      console.log('received message', data)
    });
    //Wallet connect events
    this.socket.on('connect.wallet.active', (data) => {
      console.log('connect.wallet.active', data);
      toast(`Job ${data.jobId} is active`)
      this.dispatch(updateJob({ id: data.jobId, state: 'active'}))
    });
    this.socket.on('connect.wallet.progress', (data) => {
      console.log('connect.wallet.progress', data);
      this.dispatch(updateJob({ id: data.jobId, progress: data.progress }))
    });
    this.socket.on('connect.wallet.fail', (data) => {
      console.log('connect.wallet.fail', data);
      toast(`Job ${data.jobId} is failed with error:  ${data.error}`)
      this.dispatch(updateJob({ id: data.jobId, state: data.state }))
    });
    this.socket.on('connect.wallet.completed', (data) => {
      console.log('connect.wallet.completed', data);
      toast(`Job ${data.jobId} is completed`)
      this.dispatch(updateJob({ id: data.jobId, state: data.state }))
    });
    //Wallet sync events
    this.socket.on('sync.wallet.active', (data) =>{
      console.log('sync.wallet.active', data);
      toast(`Job ${data.jobId} is active`)
      this.dispatch(updateJob({ id: data.jobId, state: data.state}))
    });
    this.socket.on('sync.wallet.progress', (data)  =>{
      console.log('sync.wallet.progress', data);
      this.dispatch(updateJob({ id: data.jobId, state: data.state, progress: data.progress }))
    });
    this.socket.on('sync.wallet.fail', (data) => {
      console.log('sync.wallet.fail', data);
      toast(`Job ${data.jobId} is failed with error:  ${data.error}`)
      this.dispatch(updateJob({ id: data.jobId, state: data.state }))
      setTimeout(() => this.dispatch(removeJob(data.jobId)), 30000)
    });
    this.socket.on('sync.wallet.completed', (data) => {
      console.log('sync.wallet.completed', data);
      toast(`Job ${data.jobId} is completed`)
      this.dispatch(updateJob({ id: data.jobId, state: data.state }))
      setTimeout(() => this.dispatch(removeJob(data.jobId)), 30000)
    });
  }

  registerHandler(ev: string, listener: () => void){
    this.socket.on(ev, listener);
  }

  public unregisterHandlers(){
    // this.socket.off('connect');
    // this.socket.off('disconnect');
    // this.socket.off('pong');
    // this.socket.close();
  }
}
