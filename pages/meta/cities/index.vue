<template>
  <div class="container-fluid">
    <v-data-table :items="cities" :headers="cityHeaders">
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
          @click="showDialog('show',item)"
        >
          mdi-eye
        </v-icon>
        <v-icon
          class="mr-2"
          color="info"
          @click="showDialog('edit',item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { cityHeaders } from '@/utils/tableHeaders'
export default {
  layout: 'dashboard',
  data: () => ({
    cityHeaders,
    search: '',
    openForm: false,
    dialogTitle: ''
  }),
  async fetch ({ store }) {
    await store.dispatch('city/get_cities')
  },
  computed: {
    ...mapState({
      cities: (state) => {
        return state.city.cities
      }
    })
  },
  methods: {
    showDialog (type, item = null) {
      if (type === 'show') {
        this.openForm = !this.openForm
      } else {
        if (type === 'edit') {
          this.dialogTitle = 'Edit City'
        } else {
          this.dialogTitle = 'Create City'
        }
        this.openForm = true
      }
    }
  }
}
</script>
