const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mockList = require('./mock/index');

const app = new Koa();
const router = new Router();

// 使用 koa-bodyparser 中间件来解析请求体
app.use(bodyParser());
// 模拟异步请求
async function getRes(fn, ctx){
    return new Promise((resolve) => {
        setTimeout(() => {
            const res = fn(ctx);
            resolve(res);
        }, 500);
    })
};

// 注册mock路由
mockList.forEach(item => {
    const { url, method, response } = item;
    router[method](url, async (ctx) => {
        // const res = response();
        const res = await getRes(response, ctx);
        ctx.body = res;
    })
});

// 启动路由
app.use(router.routes());

// 监听3002端口
app.listen(3002); 