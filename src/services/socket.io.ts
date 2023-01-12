import { Manager, Socket } from 'socket.io-client'
import { toast } from 'react-toastify'
import {AppDispatch} from "../store/store";
import {cointrackApi} from "./cointrack";
import {assetsItemAdapter, GetUserPortfolioState, portfolioSelectors} from "../modules/dashboard/api/portfoliosApi";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {updateJob} from "../modules/dashboard/slices/dashboardSlice";

export class Gateway {
  static instance?: Gateway
  private manager!: Manager
  private socket!: Socket
  private dispatch: ThunkDispatch<any, any, AnyAction>;
  private constructor(url: string, accessToken: string,  dispatch: AppDispatch) {
    console.log('init socket');
    this.dispatch = dispatch;
    this.manager = new Manager(url, {
      reconnectionDelayMax: 10000,
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      },
    })
    this.createSocket('socket')
    this.registerHandlers()
  }

  static SocketFactory(url: string, accessToken: string, dispatch: AppDispatch){
    if(Gateway.instance){
      return Gateway.instance
    }else{
      return new Gateway(url, accessToken, dispatch)
    }
  }
  createSocket(namespace: string) {
    this.socket = this.manager.socket(`/${namespace}`, {
      auth: {
        token: '123'
      }
    })
  }

  private registerHandlers(){
    this.socket.on('connect', function() {
      console.log('Connected');
    });
    this.socket.on('disconnect', function() {
      console.log('Disconnected');
    });
    this.socket.on('pong', () => {
      console.log(new Date().toISOString());
    });

    this.socket.on('sync-wallet-progress', function(data) {
      console.log('sync-wallet-progress', data);
    });
    //Wallet connect events
    this.socket.on('connect.wallet.active', (data) => {
      console.log('connect.wallet.active', data);
      toast(`Job ${data.jobId} is active`)
      this.dispatch(updateJob({ id: data.jobId, state: 'active'}))
    });
    this.socket.on('connect.wallet.progress', (data) => {
      console.log('connect.wallet.progress', data);
      toast(`Job ${data.jobId} is in progress ${data.progress}%`)
      this.dispatch(updateJob({ id: data.jobId, state: data.progress }))
    });
    this.socket.on('connect.wallet.fail', (data) => {
      console.log('connect.wallet.fail', data);
      toast(`Job ${data.jobId} is failed with error:  ${data.error}`)
      this.dispatch(updateJob({ id: data.jobId, state: 'fail' }))
    });
    this.socket.on('connect.wallet.completed', (data) => {
      console.log('connect.wallet.completed', data);
      toast(`Job ${data.jobId} is completed`)
      this.dispatch(updateJob({ id: data.jobId, state: 'complete' }))
    });
    //Wallet sync events
    this.socket.on('sync.wallet.active', (data) =>{
      console.log('sync.wallet.active', data);
      toast(`Job ${data.jobId} is active`)
      this.dispatch(updateJob({ id: data.jobId, state: 'active'}))
    });
    this.socket.on('sync.wallet.progress', (data)  =>{
      console.log('sync.wallet.progress', data);
      toast(`Job ${data.jobId} is in progress ${data.progress}%`)
      this.dispatch(updateJob({ id: data.jobId, state: data.progress }))
    });
    this.socket.on('sync.wallet.fail', (data) => {
      console.log('sync.wallet.fail', data);
      toast(`Job ${data.jobId} is failed with error:  ${data.error}`)
      this.dispatch(updateJob({ id: data.jobId, state: 'fail' }))
    });
    this.socket.on('sync.wallet.completed', (data) => {
      console.log('sync.wallet.completed', data);
      toast(`Job ${data.jobId} is completed`)
      this.dispatch(updateJob({ id: data.jobId, state: 'complete' }))
    });
  }

  registerHandler(ev: string, listener: () => void){
    this.socket.on(ev, listener);
  }

  public unregisterHandlers(){
    this.socket.off('connect');
    this.socket.off('disconnect');
    this.socket.off('pong');
    this.socket.close();
  }
}
