import { Manager, Socket } from 'socket.io-client'

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
      query: {
        'my-key': 'my-value'
      }
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
  }

  registerHandler(ev: string, listener: () => void){
    this.socket.on(ev, listener);
  }

  public unregisterHandlers(){
    this.socket.off('connect');
    this.socket.off('disconnect');
    this.socket.off('pong');
  }
}
