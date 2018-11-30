import info from './info.js'

$('.send-message').onclick = function(){
  // 发送群聊消息
  socket.emit('sendMessageGroup', {
    id: info.id,
    name: info.name,
    url: info.url,
    text: $('.edit .inp').innerHTML
  })
}