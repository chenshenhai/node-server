# 基于 ES6 开发的静态服务器
在src/setting.js配置静态资源目录 ，如果没有配置是默认静态资源是项目的asset目录下
```js
let setting = {
    "workspace" : "", // 静态资源路径
    "port" : 5000
}

export default setting;
```

``` sh
#安装依赖
npm install

#ES6开发启动模式
npm run dev-start

#ES6编译启动模式
npm run start

#ES6编译
npm run build

#启动编译后服务
node ./dist/index.js


```
