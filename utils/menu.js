const Menu = [
  { header: 'Dashboard' },
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'mdi-home-city',
    name: 'Dashboard',
    action: '/'
  },
  { header: 'Client Management' },
  {
    title: 'Client Management',
    group: 'Client Management',
    icon: 'mdi-file',
    items: [
      { name: 'staffs', title: 'Staffs', action: '/client_management/staffs', icon: 'mdi-home-city' },
      { name: 'branches', title: 'Branches', action: '/client_management/branches', icon: 'mdi-home-city' },
      { name: 'providers', title: 'Providers', action: '/client_management/providers', icon: 'mdi-home-city' },
      { name: 'owners', title: 'Owners', action: '/client_management/owners', icon: 'mdi-home-city' },
      { name: 'shops', title: 'Shops', action: '/client_management/shops', icon: 'mdi-home-city' }
    ]
  },
  { header: 'Meta' },
  {
    title: 'Meta',
    group: 'Meta',
    icon: 'mdi-file',
    items: [
      { name: 'regions', title: 'Regions', action: '/meta/regions', icon: 'mdi-home-city' },
      { name: 'cities', title: 'Cities', action: '/meta/cities', icon: 'mdi-home-city' },
      { name: 'townships', title: 'Townships', action: '/meta/townships', icon: 'mdi-home-city' },
      { name: 'departments', title: 'Departments', action: '/meta/departments', icon: 'mdi-home-city' },
      { name: 'payment_methods', title: 'PaymentMethods', action: '/meta/payment_methods', icon: 'mdi-home-city' },
      { name: 'payment_types', title: 'PaymentTypes', action: '/meta/payment_types', icon: 'mdi-home-city' }
    ]
  },
  { header: 'CRM' },
  {
    title: 'CRM',
    group: 'CRM',
    icon: 'mdi-account-group',
    items: [
      { name: 'customers', title: 'Customers', action: '/crm/customers', icon: 'mdi-account-group' },
      { name: 'orders', title: 'Orders', action: '/crm/orders', icon: 'mdi-account-group' }
    ]
  },
  { header: 'Store' },
  {
    title: 'Store',
    group: 'Store',
    icon: 'mdi-store-cog',
    items: [
      { name: 'categories', title: 'Categories', action: '/store/categories', icon: 'mdi-store-outline' },
      { name: 'products', title: 'Products', badge: 'new', action: '/store/products/create', icon: 'mdi-store-plus' }
    ]
  },
  { header: 'Setting' },
  {
    title: 'Setting',
    group: 'Setting',
    icon: 'mdi-wrench',
    items: [
      { name: 'profile', title: 'profile', action: '/setting/profile', icon: 'mdi-account' },
      { name: 'shops', title: 'shops', badge: 'new', action: '/setting/shops', icon: 'mdi-store-plus' }
    ]
  }
]
// reorder menu
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      const textA = x.title.toUpperCase()
      const textB = y.title.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    })
  }
})

export default Menu
