window.$ = (tag, all) => {
  if (!tag){
    console.warn('请检查传入的css选择器是否正确')
    return null
  }
  if (!document.querySelector) {
    console.warn('浏览器不支持querySelector')
    return null
  }
  if (all){
    return document.querySelectorAll(tag)
  }else{
    return document.querySelector(tag)
  }
}
window.tool = {
  addEveArr(domArr, eventName, fun){
    for (let i = 0; i < domArr.length; i++){
      domArr[i].addEventListener(eventName, (e) => {
        fun(e, domArr[i])
      })
    }
  }
}