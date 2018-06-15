
class AppDao {
  constructor (ctx) {
    this.ctx = ctx
  }

  async listHome () {
    const result = await this.ctx.client.get(`/home?labels=今日推荐,凯迪克大奖,睡前故事,绘本故事`)
    return result.data
  }

  async listAllLabels () {
    const result = await this.ctx.client.get(`/story/labels`)
    return result
  }

  async getAllAlbums () {
    const result = await this.ctx.client.get(`/album/list`)
    return result
  }

  async getAlbumDetail (album) {
    const result = await this.ctx.client.get(`/album/info?album=` + album.name)
    return result
  }

  async filterStory (filter, skip, limit) {
    const result = await this.ctx.client.get(`/story/list`, Object.assign(filter, {skip, limit}))
    return result
  }

  async register (user, pwd) {
    const result = await this.ctx.client.post(`/user/register`, {
      user,
      pwd
    })
    return result
  }

  async login (user, pwd) {
    const result = await this.ctx.client.post(`/user/login`, {
      user,
      pwd
    })
    return result
  }

  async getUserByToken (token) {
    const result = await this.ctx.client.get(`/user/token/check?token=${token}`)
    return result
  }

  async getStoryContent (story) {
    const result = await this.ctx.client.get(`/story/content?story=` + story._id)
    return result
  }

  async addFavorite (story, token) {
    if (this.isFavorite(story)) {
      return
    }
    await this.ctx.client.post(`/user/favorite/add?token=${token}`, story)
  }

  isFavorite (story) {

  }

  addPlayHistory (story) {

  }

  getHistories () {

  }
}
export default AppDao
