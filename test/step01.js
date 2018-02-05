const Vue = require('vue')
const app = new Vue({
    template: '<div>Hello world</div>'
})
const renderer = require('vue-server-renderer').createRenderer()

renderer.renderToString(app, (err, html) => {
    if(err) throw err
    console.log(html)
})