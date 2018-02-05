const Vue = require('vue')
const Koa = require('koa')
const renderer = require('vue-server-renderer').createRenderer( { template: require('fs').readFileSync('./static/index.template.html', 'utf-8') } )

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

    const context = {
        name : 'Lara',
        script: `<script> console.log('Hello Albert-ch') </script>`
    }

    renderer.renderToString(app, context, (err, html)=>{
        if (err){
            ctx.status = 500;
            ctx.body = 'Internal Server Error'
            return
        }
        ctx.body = html
    })
})

server.listen(8060)