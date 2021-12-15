const Koa = require("koa");
const app = new Koa();

var cors = require("koa2-cors");
app.use(cors());

function delay(time = 1000) {
  return new Promise((rs) => {
    setTimeout(() => {
      rs();
    }, time);
  });
}

// 请求例子: localhost:9999?offset=10&limit=20
// 生成随机的数据, 延时随机时长后返回
// 返回数据 [{id:123,value:}]
app.use(async (ctx) => {
  const delayTime = Math.random() * 1000;
  let offset = Number(ctx.query.offset) || 0;
  let limit = Number(ctx.query.limit) || 10;
  let list = new Array(limit).fill(null).map((_, i) => {
    return {
      id: `id${offset + i}`,
      value: Math.random(),
    };
  });

  await delay(delayTime);
  // ctx.body = new Date()
  ctx.body = list;
});

const port = 9999;
app.listen(port);
console.log("running on port " + port);
