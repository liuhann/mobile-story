import AppDAO from './app-dao'

export default {
  onload (ctx, next) {
    ctx.appDao = new AppDAO(ctx)
  }
}
