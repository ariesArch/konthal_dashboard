<template>
  <div class="container-fluid">
    <div class="row">
      <div class="cols">
        <v-card>
          <v-card-title>Dashboard</v-card-title>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
  // middleware: 'auth'
  async created () {
    const { status, data } = (await this.$axios.get('/init_fetch')).data
    if (status === 1) {
      console.log(data)
    }
  }
}
</script>
