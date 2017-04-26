本地开发测试

1.  安装nodejs
2.  运行 npm config set registry https://registry.npm.taobao.org
3.  cd 根目录 运行npm install
4.  运行 npm start
5.  打开浏览器访问 http://localhost:3000/home.html
    微信访问 http://ip:3000/home.html

打包上线部署
1. npm run build
2. 拷贝dist目录下面的所有的文件 到 服务器 ，需要和api服务器同域名