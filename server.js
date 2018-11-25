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


server.listen(8686, () => {
  console.log(`server runing on port 8686 ...`)
})

/*
nodemon 打包fe
npm命令配置
打包的报错
*/