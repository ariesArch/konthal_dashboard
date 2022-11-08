const Menu = [
  { header: 'Dashboard' },
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'mdi-home-city',
    name: 'Dashboard',
    action: '/'
  },
  { header: 'Management' },
  {
    title: 'Management',
    group: 'Management',
    icon: 'mdi-file',
    items: [
      { name: 'staffs', title: 'Staffs', action: '/management/staffs', icon: 'mdi-home-city' },
      { name: 'branches', title: 'Branches', action: '/management/branches', icon: 'mdi-home-city' },
      { name: 'providers', title: 'Providers', action: '/management/providers', icon: 'mdi-home-city' }
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
