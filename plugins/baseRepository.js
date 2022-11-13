import BaseRepository from '~/repositories/BaseRepository'

export default (ctx, inject) => {
  inject('baseRepository', BaseRepository(ctx.$axios, ctx.store))
}
