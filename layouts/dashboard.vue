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
import NavDrawer from '@/components/base/NavDrawer.vue'
export default {
  components: {
    NavDrawer
  },
  async created () {
    await this.$store.dispatch('region/getRegions')
    await this.$store.dispatch('city/getCities')
    await this.$store.dispatch('township/getTownships')
    await this.$store.dispatch('category/getCategories')
    await this.$store.dispatch('brand/getBrands')
    await this.$store.dispatch('branch/getBranches')
    await this.$store.dispatch('shopDepartment/getShopDepartments')
    // await this.$store.dispatch('shop/getShops')
    // await this.$store.dispatch('shopType/getShopTypes')
    // await this.$store.dispatch('owner/getOwners')
  }
}
</script>
