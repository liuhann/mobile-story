import AsyncBoot from 'async-boot'
import AppRoot from './components/root.vue'
import config from './config/config'

import './style/variables.less'
import 'vant/lib/vant-css/base.css'

import dao from './packages/dao'
import main from './packages/home'

const boot = new AsyncBoot({
  vue: {
    rootApp: AppRoot,
    mount: '#app'
  },
  servers: config.servers,
  packages: [
    dao, main
  ],
  started: [(ctx, next) => {
    ctx.vueRouter.replace('/home')
  }]
})

boot.startUp()
