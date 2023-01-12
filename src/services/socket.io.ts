import { Manager, Socket } from 'socket.io-client'
import { toast } from 'react-toastify'

export class Gateway {
  static instance?: Gateway
  private manager!: Manager
  private socket!: Socket
  private constructor(url: string, accessToken: string) {
    console.log('init socket');
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

  static SocketFactory(url: string, accessToken: string){
    if(Gateway.instance){
      return Gateway.instance
    }else{
      return new Gateway(url, accessToken)
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
    this.socket.on('connect.wallet.active', function(data) {
      console.log('connect.wallet.active', data);
      toast(`Job ${data.jobId} is active`)
    });
    this.socket.on('connect.wallet.progress', function(data) {
      console.log('connect.wallet.progress', data);
      toast(`Job ${data.jobId} is in progress ${data.progress}%`)
    });
    this.socket.on('connect.wallet.fail', function(data) {
      console.log('connect.wallet.fail', data);
      toast(`Job ${data.jobId} is failed with error:  ${data.error}`)
    });
    this.socket.on('connect.wallet.completed', function(data) {
      console.log('connect.wallet.completed', data);
      toast(`Job ${data.jobId} is completed`)
    });
    //Wallet sync events
    this.socket.on('sync.wallet.active', function(data) {
      console.log('sync.wallet.active', data);
      toast(`Job ${data.jobId} is active`)
    });
    this.socket.on('sync.wallet.progress', function(data) {
      console.log('sync.wallet.progress', data);
      toast(`Job ${data.jobId} is in progress ${data.progress}%`)
    });
    this.socket.on('sync.wallet.fail', function(data) {
      console.log('sync.wallet.fail', data);
      toast(`Job ${data.jobId} is failed with error:  ${data.error}`)
    });
    this.socket.on('sync.wallet.completed', function(data) {
      console.log('sync.wallet.completed', data);
      toast(`Job ${data.jobId} is completed`)
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
