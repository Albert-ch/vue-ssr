const Vue = require('vue')
const Koa = require('koa')
const renderer = require('vue-server-renderer').createRenderer()

const server = new Koa()
server.use( async(ctx, next)=>{
    const app = new Vue({
        data(){
            return {
                url: ctx.url
            }
        },
        template: `<div>访问的 URL 是：{{ url }} </div>`
    })

    renderer.renderToString(app,  (err, html)=>{
        if (err){
            ctx.status = 500;
            ctx.body = 'Internal Server Error'
            return
        }
        ctx.body=`
              <!DOCTYPE html>
              <html lang="en">
                <head><title>Hello</title></head>
                <body>${html}</body>
              </html>
        `
    })
})

server.listen(8060)