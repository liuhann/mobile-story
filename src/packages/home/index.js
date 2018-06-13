import Main from './pages/main'
// 异步的写法
// const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')

export default {
  routes: [{
    path: '/home',
    component: Main
  }]
}
