import info from './info.js'

$('.send-message').onclick = function(){
  // 发送消息
  const TEXT = $('.edit .inp').innerHTML.replace(/<div><br><\/div>/, '')
  $('.edit .inp').innerHTML = ''
  if (info.member == 'group' || info.member == ''){
    window.socket.emit('sendMessageGroup', {
      id: info.id,
      name: info.name,
      url: info.url,
      text: TEXT
    })
  } else {
    window.socket.emit('sendMessageMember', {
      memberId: info.member,
      id: info.id,
      name: info.name,
      url: info.url,
      text: TEXT
    })
  }
}

$('.edit .inp').onkeyup = function (event){
  if (event.keyCode == 13){
    $('.send-message').click()
    return false
  }
}