import IScroll from './iscroll'

const commonMixins = {
  computed: {
    imageHost () {
      return this.ctx.bootOpts.servers.image.baseURL
    },
    fileHost () {
      return this.ctx.bootOpts.servers.file.baseURL
    }
  },

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

    getStoryCover (cover, x, y) {
      return `${this.imageHost}/story/cover/${x}/${y}/${cover}.png`
    },

    getImageUrl: function (cover, width = 120) {
      if (cover) {
        return `${this.imageHost}/story/thumb/${cover}.png`
      } else {
        return this.imageHost + '/image/imgSure.jpg'
      }
    },

    getBigImageUrl: function (cover) {
      if (cover) {
        return this.imageHost + '/' + cover + '.png@w_420,q_80'
      } else {
        return this.imageHost + '/image/imgSure.jpg'
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
    }
  }
}

export default commonMixins
