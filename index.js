// run `node index.js` in the terminal

const artTemplate = require('art-template');
const path = require('path');
const fs = require('fs');
const minify = require('html-minifier').minify;
const http = require('http');
const url = require('url');

console.log(`Hello Node.js v${process.versions.node}!`);

// 模板赋值
const html = artTemplate(path.join(__dirname, '/template/index.html'), {
  title: 'page title ',
  a: 'hello , world ',
  b: 2,
  c: 'b is 2',
});

// HTML 压缩
const minify_html = minify(html, {
  removeComments: true, // 去掉注释
  collapseWhitespace: true, // 去掉空格
  minifyJS: true,
  minifyCSS: true,
});

const outputFilePath = path.join(__dirname, '/data/');
fs.writeFile(outputFilePath + 'input.html', minify_html, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('数据写入成功！');
  console.log('--------我是分割线-------------');
  console.log('读取写入的数据！');
  fs.readFile(outputFilePath + 'input.html', function (err, data) {
    if (err) {
      return console.error(err);
    }
    console.log('异步读取文件数据: ' + data.toString());
  });
});

// 创建服务器
http
  .createServer(function (request, response) {
    // 解析请求，包括文件名
    var pathname = url.parse(request.url).pathname;

    // 输出请求的文件名
    console.log('Request for ' + pathname + ' received.');
    console.log('read html');
    // 从文件系统中读取请求的文件内容
    fs.readFile(outputFilePath + 'input.html', function (err, data) {
      //console.log(err, data);
      if (err) {
        console.log(err);
        // HTTP 状态码: 404 : NOT FOUND
        // Content Type: text/html
        response.writeHead(404, { 'Content-Type': 'text/html' });
      } else {
        //console.log('111111111111111111111111111111111111111111');
        // HTTP 状态码: 200 : OK
        // Content Type: text/html
        response.writeHead(200, { 'Content-Type': 'text/html' });

        // 响应文件内容
        response.write(data.toString());
      }
      //  发送响应数据
      response.end();
    });
  })
  .listen(8080);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');
