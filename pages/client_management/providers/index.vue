<template>
  <div class="container-fluid">
    <v-data-table :items="providers" :headers="providerHeaders">
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
          @click="$router.push(`/client_management/providers/${item.id}`)"
        >
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { providerHeaders } from '@/utils/tableHeaders'

export default {
  layout: 'dashboard',
  data: () => ({
    providerHeaders,
    search: ''
  }),
  async fetch ({ store }) {
    await store.dispatch('provider/get_providers')
  },
  computed: {
    ...mapState({
      providers: (state) => {
        return state.provider.providers
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
