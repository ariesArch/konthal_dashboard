<template>
  <v-app>
    <v-main>
      <NavDrawer />
      <v-container fluid>
        <nuxt />
        <ErrorSnackBar />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import localforage from 'localforage'
import NavDrawer from '@/components/base/NavDrawer.vue'
export default {
  name: 'Dashboard',
  components: {
    NavDrawer
  },
  async created () {
    const { data, status } = (await this.$axios.get('/initial_fetch')).data
    if (status === 1) {
      localforage.setItem('stored:regions', data.regions)
      localforage.setItem('stored:cities', data.cities)
      localforage.setItem('stored:townships', data.townships)
      localforage.setItem('stored:shop_types', data.shop_types)
      localforage.setItem('stored:main_categories', data.main_categories)
      localforage.setItem('stored:brands', data.brands)
      localforage.setItem('stored:categories', data.categories)
    }
  }
  // await this.$store.dispatch('region/getRegions')
  // await this.$store.dispatch('city/getCities')
  // await this.$store.dispatch('township/getTownships')
  // await this.$store.dispatch('category/getCategories')
  // await this.$store.dispatch('brand/getBrands')
  // await this.$store.dispatch('branch/getBranches')
  // await this.$store.dispatch('shop/getShops')
  // await this.$store.dispatch('shopType/getShopTypes')
  // await this.$store.dispatch('owner/getOwners')
}
</script>
