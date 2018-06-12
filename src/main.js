import AsyncBoot from 'async-boot'
import AppRoot from './root'
const boot = new AsyncBoot({
  vue: {
    rootApp: AppRoot,
    mount: '#app'
  },
  systemModules: [],
  packages: [
    import('./packages/common/index.js'),
    import('./packages/ybstory-home/index.js')
  ]
})

boot.startUp()
