// run `node index.js` in the terminal

const artTemplate = require('art-template');
const path = require('path');
const fs = require('fs');
const minify = require('html-minifier').minify;

console.log(`Hello Node.js v${process.versions.node}!`);

// 模板赋值
const html = artTemplate(path.join(__dirname, '/template/temp.art'), {
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
