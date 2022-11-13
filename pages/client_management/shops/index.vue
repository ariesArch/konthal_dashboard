<template>
  <div class="container-fluid">
    <v-data-table :items="shops" :headers="shopHeaders">
      <template #top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
          />
          <v-divider vertical inset />
          <v-spacer />
          <v-btn color="primary" @click="showDialog('create')">
            Create
          </v-btn>
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          class="mr-2"
          color="info"
          @click="$router.push(`/client_management/shops/${item.slug}`)"
        >
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { shopHeaders } from '@/utils/tableHeaders'

export default {
  layout: 'dashboard',
  data: () => ({
    shopHeaders,
    search: ''
  }),
  async fetch ({ store }) {
    await store.dispatch('shop/getShops')
  },
  computed: {
    ...mapState({
      shops: (state) => {
        return state.shop.shops
      },
      cities: (state) => {
        return state.city.cities
      }
    })
  },
  methods: {
    showDialog (type, item = null) {
      console.log('fnc')
    }
  }
}
</script>
