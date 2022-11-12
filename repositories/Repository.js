import ShopRepository from '~/repositories/ShopRepository'
import BranchRepository from '~/repositories/BranchRepository'
import CityRepository from '~/repositories/CityRepository'
import TownshipRepository from '~/repositories/TownshipRepository'
import RegionRepository from '~/repositories/RegionRepository'
import PaymentMethodRepository from '~/repositories/PaymentMethodRepository'
import PaymentTypeRepository from '~/repositories/PaymentTypeRepository'
import OwnerRepository from '~/repositories/OwnerRepository'
import ProviderRepository from '~/repositories/ProviderRepository'
import DepartmentRepository from '~/repositories/DepartmentRepository'

export default $axios => ({
  shop: ShopRepository($axios),
  branch: BranchRepository($axios),
  city: CityRepository($axios),
  township: TownshipRepository($axios),
  region: RegionRepository($axios),
  payment_method: PaymentMethodRepository($axios),
  payment_type: PaymentTypeRepository($axios),
  owner: OwnerRepository($axios),
  provider: ProviderRepository($axios),
  department: DepartmentRepository($axios)
})
