import initWebSocket from './initWebSocket.js'
import info from './info.js'

const oUserName = $('.user-name') 
oUserName.oninput = e => {
  const sUserName = oUserName.innerHTML
  if (sUserName != ''){
    oUserName.classList.remove('contenteditable')
  }else{
    oUserName.classList.add('contenteditable')
  }
}

// 重构改成事件委托
const oPortrait = $('.por', 'all')
const oMyPor = $('.my-por')
let sPorSrc = ''
tool.addEveArr(oPortrait, 'click', (e, dom) => {
  sPorSrc = dom.getAttribute('src')
  $('.tips').style.display = 'none'
  oMyPor.style.display = 'block'
  oMyPor.setAttribute('src', sPorSrc)
})

$('.chat-btn').onclick = e => {
  if (oUserName.innerHTML && sPorSrc){
    $('.my-info .portrait').setAttribute('src', sPorSrc)
    $('.my-info .name').innerHTML = oUserName.innerHTML
    $('#chat-wrap').style.display = 'block'
    $('#login-wrap').style.display = 'none'
    info.setData('name', oUserName.innerHTML)
    info.setData('url', sPorSrc)
    initWebSocket()
  }
}

