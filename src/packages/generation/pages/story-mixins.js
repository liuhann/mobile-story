
const storyMixins = {
  computed: {
    imageHost () {
      return this.ctx.bootOpts.servers.image.baseURL
    },
    fileHost () {
      return this.ctx.bootOpts.servers.file.baseURL
    }
  },

  methods: {
    getStoryCover (cover) {
      return `${this.imageHost}/story/cover/480/480/${cover}.png`
    },

    getImageUrl: function (cover, width = 120) {
      if (cover) {
        return `${this.imageHost}/story/thumb/${cover}.png`
      } else {
        return this.imageHost + '/image/imgSure.jpg'
      }
    },

    formatDura: function (story) {
      if (story.duration) {
        const number = parseInt(story.duration)
        return Math.floor(number / 60) + ':' + (100 + number % 60).toString().substring(1)
      } else {
	      const number = parseInt(story)
	      return Math.floor(number / 60) + ':' + (100 + number % 60).toString().substring(1)
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

export default storyMixins
