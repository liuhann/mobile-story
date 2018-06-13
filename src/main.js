import AsyncBoot from 'async-boot'
import AppRoot from './components/root.vue'
import config from './config/config'

import './style/variables.less'
import 'vant/lib/vant-css/base.css'

import dao from './packages/dao/index'
import main from './packages/home/index'

const boot = new AsyncBoot({
  vue: {
    rootApp: AppRoot,
    mount: '#app'
  },
  servers: config.servers,
  systemModules: [],
  packages: [
    dao, main
  ]
})

boot.startUp()
