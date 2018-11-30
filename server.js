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
  console.log(socket.id) // 获取当前连接进入的客户端的id




  // 登陆（自定义事件）
  socket.on('login', userInfo => {
    userList.push(userInfo)
    io.sockets.emit('userList', userList)
  })
  // 退出（内置事件）
  socket.on('disconnect', reason => {
    userList = userList.filter(item => item.id != socket.id)
    io.sockets.emit('userList', userList)
  })
  // 接收群聊消息 （自定义事件）
  socket.on('sendMessageGroup', message => {
    io.sockets.emit('sendMessageGroup', message)
  })




  socket.on('error', (error) => {
    console.log('发生错误')
  })

  io.clients((error, ids) => {
    console.log(ids)  // 获取已连接的全部客户机的ID
  })

  // 给客户端发送事件
  setInterval(() => {
    socket.emit('asd', ++num)
  }, 1000)
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