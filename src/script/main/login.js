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
    $('#chat-wrap').style.display = 'block'
    $('#login-wrap').style.display = 'none'
    info.setUserName(oUserName.innerHTML)
    info.setPortraitUrl(sPorSrc)
    initWebSocket()
  }
}

