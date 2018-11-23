import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout'
import Layout1 from '@/views/layout/layout1'
import Layout2 from '@/views/layout/layout2'
import Layout3 from '@/views/layout/layout3'
import Layout4 from '@/views/layout/layout4'
import Layout5 from '@/views/layout/layout5'
import Layout6 from '@/views/layout/layout6'
import Layout7 from '@/views/layout/layout7'
import Layout8 from '@/views/layout/layout8'

Vue.use(Router)

const children = [{
    path: 'scopeSlot',
    name: 'scopeSlot',
    component: resolve => require(['../views/slot/slot-scope.vue'], resolve)
}]

export default new Router({
    mode: 'history',
    routes: [{
            path: '/layout',
            name: 'Layout',
            component: Layout
        },
        {
            path: '/layout1',
            name: 'layout1',
            component: Layout1
        },
        {
            path: '/layout2',
            name: 'layout2',
            component: Layout2
        },
        {
            path: '/layout3',
            name: 'layout3',
            component: Layout3
        },
        {
            path: '/layout4',
            name: 'layout4',
            component: Layout4
        },
        {
            path: '/layout5',
            name: 'layout5',
            component: Layout5
        },
        {
            path: '/layout6',
            name: 'layout6',
            component: Layout6
        },
        {
            path: '/layout7',
            name: 'layout7',
            component: Layout7
        },
        {
            path: '/',
            name: 'layout8',
            component: Layout8,
            children
        }
    ]
})
