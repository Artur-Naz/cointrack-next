'use strict';
const SharedWorker = () => {
  const log = console.log.bind(console)
  const tryReconnect = () => {
    setTimeout(() => {
      log('reconnect')
      socket.io.open((err) => {
        if (err) {
          log(err)
          tryReconnect();
        }
      });
    }, 1000);
  }
  log('Loading shared worker', self.name, self)
  self.x = () => {
    log('reconnect')
    socket.io.open((err) => {
      if (err) {
        log(err)
        tryReconnect();
      }
    });
  }
  try {
    importScripts('http://localhost:3000/_next/static/chunks/socket.io.min.js')
  } catch(e) {
    window.io = require('socket.io-client')
  }

  let socket = io(self.name,{
      autoConnect: true,
      reconnection: true,
    }),
    ports = [],
    socketConnected = false

  // handle shared webworker clients already with ports
  socket.on('connect', function(msg) {
    log('socket connected successfuly')
    socketConnected = true
    ports.forEach(function(port) {
      port.postMessage({
        type: 'connect',
        message: msg
      })
    })
  })
  socket.on('disconnect', function(msg) {
    log('socket disconnected')
    socketConnected = false
    ports.forEach(function(port) {
      port.postMessage({
        type: 'disconnect',
        message: msg
      })
    })
  })

  // shared worker handle new clients
  addEventListener('connect', function(event) {
    const port = event.ports[0]
    ports.push(port)
    port.start()

    log('client connected to shared worker', event)

    port.addEventListener('message', event => handleMessage(event, port))
  })

  // regular worker handle messages
  addEventListener('message', event => handleMessage(event, self))
  if (typeof Worker !== 'undefined') {
    setTimeout(() => postMessage({
      type: 'connect',
      message: null
    }))
  }

  // handle messages
  function handleMessage(event, port) {

    const model = event.data
    log('port received message', model.eventType, model.event, model.data)
    switch(model.eventType) {
      case 'on':
        const eventName = model.event
        if (eventName == 'connect') {
          if (socketConnected) {
            port.postMessage({
              type: eventName
            })
          }
          break;
        }
        if (eventName == 'disconnect') {
          break;
        }
        socket.on(eventName, function(msg) {
          log('socket received message', msg)
          port.postMessage({
            type: eventName,
            message: msg
          })
        })
        break;
      case 'emit':
        socket.emit(model.event, model.data) // todo: ack cb
        break;
      case 'init':
        log('set socket options', model.data)
        log(socket.io.opts)
        socket.io.opts = {...socket.io.opts, ...model.data}
        log(socket.io.opts)
        break;
    }

  }
}

if (typeof window === 'object') {
  window.SocketIoSharedWorker = SharedWorker
}

if (typeof module === 'object') {
  module.exports = SharedWorker
} else {
  SharedWorker()
}
