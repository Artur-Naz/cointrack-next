'use strict'
const SharedWorker = () => {
  const log = console.log.bind(console)
  log('Loading shared worker', self.name, self)

  try {
    importScripts('/_next/static/chunks/socket.io.min.js')
  } catch (e) {
    window.io = require('socket.io-client')
  }

  let socket = io(self.name, { autoConnect: false }),
    ports = [],
    socketConnected = false

  // handle shared webworker clients already with ports
  socket.on('connect', function (msg) {
    log('socket connected successfuly')
    socketConnected = true
    ports.forEach(function (port) {
      port.postMessage({
        type: 'connect',
        message: msg
      })
    })
  })
  socket.on('disconnect', function (msg) {
    log('socket disconnected')
    socketConnected = false
    setTimeout(() => socket.connect(), 5000)
    ports.forEach(function (port) {
      port.postMessage({
        type: 'disconnect',
        message: msg
      })
    })
  })
  socket.on('connect_error', msg => {
    log('socket connection error', msg)
    ports.forEach(function (port) {
      port.postMessage({
        type: 'connect_error',
        message: msg
      })
    })
  })

  // shared worker handle new clients
  addEventListener('connect', function (event) {
    const port = event.ports[0]
    ports.push(port)
    port.start()

    log('client connected to shared worker', event)

    port.addEventListener('message', event => handleMessage(event, port))
  })

  // regular worker handle messages
  addEventListener('message', event => handleMessage(event, self))
  if (typeof Worker !== 'undefined') {
    setTimeout(() =>
      postMessage({
        type: 'connect',
        message: null
      })
    )
  }

  // handle messages
  function handleMessage(event, port) {
    const model = event.data
    log('port received message', model.eventType, model.event, model.data)
    switch (model.eventType) {
      case 'on':
        const eventName = model.event
        if (eventName == 'connect') {
          if (socketConnected) {
            port.postMessage({
              type: eventName
            })
          }
          break
        }
        if (eventName == 'disconnect') {
          break
        }
        socket.on(eventName, function (msg) {
          log('socket received message', msg)
          port.postMessage({
            type: eventName,
            message: msg
          })
        })
        break
      case 'off':
        socket.off(model.event)
        break
      case 'emit':
        socket.emit(model.event, model.data) // todo: ack cb
        break
      case 'init':
        log('set socket options', model.data)
        socket.auth = model.data
        socket.connect()
        break
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
