import info from './info.js'

export default function(){

  window.socket = io()

  window.socket.on('connect', () => { // 连接成功
    console.log('chengg', socket.id)
    const userInfo = {
      name: info.name,
      url: info.url,
      id: socket.id
    }
    info.setId(socket.id)
    socket.emit('login', userInfo)
  })

  // 服务端返回当前登陆用户列表
  window.socket.on('userList', list => {
    console.log('userList', list)
  })

  // 接收群聊消息
  window.socket.on('sendMessageGroup', message => {
    console.log(message)
  })

}