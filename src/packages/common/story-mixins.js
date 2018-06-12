import Vue from 'vue'
import config from './config'
import IScroll from './iscroll'

const commonMixins = {

  methods: {
    scroll (container) {
      setTimeout(() => {
        if (this.iscroll) {
          this.iscroll.destroy()
        }
        this.iscroll = null
        this.iscroll = new IScroll(container, {
          tap: true
        })
      }, 300)
    },

    getImageUrl: function (cover, width = 120) {
      if (cover) {
        return config.CDN_IMG + '/' + cover + '.png@w_' + width
      } else {
        return config.HOST + '/image/imgSure.jpg'
      }
    },

    getBigImageUrl: function (cover) {
      if (cover) {
        return config.CDN_IMG + '/' + cover + '.png@w_420,q_80'
      } else {
        return config.HOST + '/image/imgSure.jpg'
      }
    },

    getStoryTeller: function (story) {
      if (story && story.path) {
        const splits = story.path.split('/')
        for (const path of splits) {
          if (path !== '') {
            return path
          }
        }
      } else {
        return ''
      }
    },

    playStory: function (story) {
      this.$router.push('/story/play/' + story._id)
    },

    formatDura: function (story) {
      if (story.duration) {
        const number = parseInt(story.duration)
        return Math.floor(number / 60) + ':' + (100 + number % 60).toString().substring(1)
      } else {
        return ''
      }
    },

    addFavorite: async function (story) {
      const fav = {
        cover: story.cover,
        duration: story.duration,
        path: story.path,
        short: story.short,
        title: story.title
      }
      await this.ctx.appDao.addFavorite(fav)
      this.isFavorite = true
    },

    notice: function (msg) {
      const toast = document.getElementById('global-toast')
      if (toast) {
        document.body.removeChild(toast)
      }
      const ToastTpl = Vue.extend({
        data () {
          return {
            style: {
              position: 'absolute',
              zIndex: 9999,
              top: '80vh',
              textAlign: 'center',
              width: '100%',
              left: 0,
            },
            contentStyle: {
              fontSize: '4vw',
              color: '#fff',
              background: 'rgba(0,0,0,.7)',
              display: 'inline-block',
              padding: '5px 10px',
              borderRadius: '5px'
            }
          }
        },
        template: `<div :style="style" class="msg-toast" id="global-toast"><div class="content" :style="contentStyle">${msg}</div></div>`,
      })
      const toastVM = new ToastTpl()
      const tpl = toastVM.$mount().$el
      document.body.appendChild(tpl)

      setTimeout(function () {
        const toast = document.getElementById('global-toast')
        if (toast) {
          document.body.removeChild(toast)
        }
      }, 3000)
    },

    alert: function (msg) {
      const toast = document.getElementById('global-alert')
      if (toast) {
        document.body.removeChild(toast)
      }
      const ToastTpl = Vue.extend({
        data () {
          return {
            maskStyle: {
              position: 'absolute',
              zIndex: 9999,
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.6)'
            },
            bodyStyle: {
              position: 'absolute',
              width: '80%',
              maxWidth: '300px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#FFFFFF',
              textAlign: 'center',
              borderRadius: '3px',
              overflow: 'hidden',
            },
            contentStyle: {
              fontSize: '16px',
              padding: '20px 0 30px 0px',
              borderBottom: '1px solid #eee',
            },
            btnStyle: {
              margin: '10px 20px',
              lineHeight: '6vw',
              padding: '3vw 0',
              borderRadius: '5px',
              fontSize: '5vw',
              color: '#fff',
              backgroundColor: '#65bb57',
              letterSpacing: '3vw',
            }
          }
        },
        template: `<div :style="maskStyle" class="toast-mask" id="global-alert">
                        <div :style="bodyStyle">
                            <div class="content" :style="contentStyle">${msg}</div>
                            <div @click="closeThis"  :style="btnStyle">确定</div>
                        </div>
                    </div>`,
        methods: {
          closeThis () {
            const toast = document.getElementById('global-alert')
            if (toast) {
              document.body.removeChild(toast)
            }
          }
        }
      })
      const toastVM = new ToastTpl()
      const tpl = toastVM.$mount().$el
      document.body.appendChild(tpl)
    }
  }
}

export default commonMixins
