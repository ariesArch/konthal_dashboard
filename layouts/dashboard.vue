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
  }
}
</script>
