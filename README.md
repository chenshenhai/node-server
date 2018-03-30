# 最简Node.js静态服务器
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

#启动
npm run start

```
