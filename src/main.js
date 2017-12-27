// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store/'
import routerMap from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import SixiButton from 'components/my_component'
import SixiButtons from 'components/passwordBack'
import popupBox from 'components/pop-upBox'
import removeMaster from 'components/removeMaster'
import defini from 'components/defini'

import 'element-ui/lib/theme-default/index.css'

import 'bootstrap/dist/css/bootstrap.css'

import VueDND from 'awe-dnd'
import echarts from 'echarts'




//开启debug模式
Vue.config.debug = true
Vue.use(VueDND)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.component('six-button', SixiButton)
Vue.component('pop-upBox', popupBox)
Vue.component('remove-master', removeMaster)
Vue.component('defini', defini)
Vue.component('six-buttons', SixiButtons)


Vue.http.options.emulateJSON = true


// 并且配置路由规则
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: routerMap
})

Vue.http.interceptors.push((request, next) => {
    // api-push/validation_sms
    if (request.url == '/api-push/validation_sms' || request.url == '/api-org/org/userLoginValid' || request.url == '/api-push/get_validation_token' || request.url == '/api-push/validation_img' || request.url == '/api-auth/oauth/token' || request.url == '/api-push/get_sms') {

    } else {
        var TOKEN = sessionStorage.getItem('accessToken')
        if (TOKEN && request.method == 'POST') {
            var obj = request.body
            obj['access_token'] = TOKEN
            request.body = obj
        }
    }
    next((response) => {
        return response
    })
})

window.drag = new Vue();
const app = new Vue({
    store,
    router,
    render: h => h(App),
    data: {
        eventHub: new Vue()
    }
}).$mount('#app')
