export default class GenDAO {
  constructor (ctx) {
    this.ctx = ctx
  }

  async someMoreStories () {
    const result = await this.ctx.client.get('/story/samples')
    return result
  }
}
