<template>
  <v-app>
    <v-main>
      <NavDrawer />
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import NavDrawer from '@/components/base/NavDrawer.vue'
export default {
  components: {
    NavDrawer
  }
}
</script>
