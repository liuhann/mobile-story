import AsyncBoot from 'async-boot'
import config from './config/config'

import './style/variables.less'
import 'vant/lib/vant-css/base.css'

import RouterView from './routerview'

import dao from './packages/dao'
import main from './packages/home'
import generation from './packages/generation'

const boot = new AsyncBoot({
  vue: {
    rootApp: RouterView,
    mount: '#app'
  },
  servers: config.servers,
  packages: [
    dao, main, generation
  ],
  started: [(ctx, next) => {
    ctx.vueRouter.replace('/generation')
  }]
})

boot.startUp()
