import ShopRepository from '~/repositories/ShopRepository'
import BranchRepository from '~/repositories/BranchRepository'
import OwnerRepository from '~/repositories/OwnerRepository'
import ProviderRepository from '~/repositories/ProviderRepository'

export default $axios => ({
  shop: ShopRepository($axios),
  branch: BranchRepository($axios),
  owner: OwnerRepository($axios),
  provider: ProviderRepository($axios)
})
