export default {
  setId(id){
    this.id = id
  },
  setUserName(name){
    $('.my-info .name').innerHTML = name
    this.name = name
  },
  setPortraitUrl(url){
    $('.my-info .portrait').setAttribute('src', url)
    this.url = url
  }
}