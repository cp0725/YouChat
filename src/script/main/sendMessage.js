import info from './info.js'

$('.send-message').onclick = function(){
  // 发送消息
  if (info.member == 'group' || info.member == ''){
    window.socket.emit('sendMessageGroup', {
      id: info.id,
      name: info.name,
      url: info.url,
      text: $('.edit .inp').innerHTML
    })
  } else {
    window.socket.emit('sendMessageMember', {
      memberId: info.member,
      id: info.id,
      name: info.name,
      url: info.url,
      text: $('.edit .inp').innerHTML
    })
  }
  $('.edit .inp').innerHTML = ''
}