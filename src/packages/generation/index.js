import Generation from './pages/generation'
// 异步的写法
// const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')

export default {
  routes: [{
    path: '/generation',
    component: Generation
  }],

  async loaded (ctx) {
  }
}
