import ShopRepository from '~/repositories/ShopRepository'
import BranchRepository from '~/repositories/BranchRepository'

export default $axios => ({
  shop: ShopRepository($axios),
  branch: BranchRepository($axios)
})
