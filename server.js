const path = require('path')
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server, {})

app.get('*', (req, res) => {
  const assetsType = req.url.split('/')[1]
  if (assetsType == 'YouChat' || assetsType == 'assets'){
    const assetsConfig = { YouChat: 'index.html', assets: req.url }
    const filepath = path.join(path.resolve('./dist'), assetsConfig[assetsType])   // 拼接路径
    res.sendFile(filepath.split('?')[0]) // 去hash
  }
})


// 服务器监听所有客户端 并返回该新连接对象
// 每个客户端socket连接时都会触发 connection 事件
let num = 0

let userList = []
io.on('connection', (socket) => {
  // 登陆（自定义事件）
  socket.on('login', userInfo => {
    userList.push(userInfo)
    socket.emit('userList', userList)
    socket.broadcast.emit('login', userInfo)
  })
  // 退出（内置事件）
  socket.on('disconnect', reason => {
    userList = userList.filter(item => item.id != socket.id)
    io.sockets.emit('quit', socket.id)
  })
  // 接收群聊消息 （自定义事件）
  socket.on('sendMessageGroup', message => {
    io.sockets.emit('sendMessageGroup', message)
  })
  // 接收私聊消息 （自定义事件）
  socket.on('sendMessageMember', message => {
    socket.emit('sendMessageMember', message)
    io.to(message.memberId).emit('sendMessageMember', message)
  })
})

server.listen(8686, () => {
  console.log(`server runing on port 8686 ...`)
})

/*
nodemon 打包fe
npm命令配置
打包的报错
客户端改造成new的写法
*/