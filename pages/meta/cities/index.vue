<template>
  <div class="container-fluid">
    {{ error }}
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
    <cityForm v-model="openCityForm" :title="dialogTitle" :regions="regions" />
    <DetailDialog v-model="openDetailDialog" title="City" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { cityHeaders } from '@/utils/tableHeaders'
import cityForm from '@/components/FormDialog/cityForm'
import DetailDialog from '@/components/DetailDialog/index'
export default {
  components: {
    cityForm,
    DetailDialog
  },
  layout: 'dashboard',
  data: () => ({
    cityHeaders,
    search: '',
    openCityForm: false,
    dialogTitle: '',
    openDetailDialog: false
  }),
  async fetch ({ store }) {
    await store.dispatch('city/getCities')
  },
  computed: {
    ...mapState({
      cities: (state) => {
        return state.city.cities
      },
      regions: (state) => {
        return state.region.regions
      },
      error: (state) => {
        return state.error
      }
    })
  },
  methods: {
    showDialog (type, item = {}) {
      if (type === 'show') {
        this.openDetailDialog = !this.openDetailDialog
      } else {
        if (type === 'edit') {
          this.dialogTitle = 'Edit City'
        } else {
          this.dialogTitle = 'Create City'
        }
        this.$emit('openCityForm', JSON.parse(JSON.stringify(item)))
        this.openCityForm = true
      }
    }
  }
}
</script>
