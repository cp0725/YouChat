import control from './control.js'
import info from './info.js';
export default {
  drawUserList(user){
    const TYPE = user.__proto__.constructor.name
    if (TYPE == 'Object'){
      $('.user-list').innerHTML += `
        <div class="item" data-id="${user.id}">
          <img class="item-por" src="${user.url}">
          <div class="item-info">
            <p class="item-name">
              <span>${user.name}</span>
            </p>
            <p class="item-text"></p>
          </div>
        </div>
      `
      control.bindEventUserList($('.user-list .item', 'all'))
    } else if (TYPE == 'Array'){
      const HTML = user.filter(me => me.id != info.id).map(item => `
        <div class="item" data-id="${item.id}">
          <img class="item-por" src="${item.url}">
          <div class="item-info">
            <p class="item-name">
              <span>${item.name}</span>
            </p>
            <p class="item-text"></p>
          </div>
        </div>
      `)
      $('.user-list').innerHTML = HTML.join('')
      control.bindEventUserList($('.user-list .item', 'all'))
    } else if (TYPE == 'String'){
      if (!$(`.item[data-id="${user}]"`)){ return }
      control.removeEventListener($(`.item[data-id="${user}]"`), 'click', e => {})
      $('.user-list').removeChild($(`.item[data-id="${user}]"`))
    }
  },
  drawMessageList(list){
    $('.message-wrap .list').innerHTML = ''
    if (!list){ return} 
    const HTML = list.map(item => `
      <div class="item" data-me="${item.id == info.id}">
        <img class="portrait" src="${item.url}" alt="">
        <div class="text">
          <p>${item.text}</p>
        </div>
      </div>
    `)
    $('.message-wrap .list').innerHTML = HTML.join('')
    $('.message-wrap .list').scrollTop = $('.message-wrap .list').scrollHeight
  }
}