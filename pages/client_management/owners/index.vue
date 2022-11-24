<template>
  <div class="container-fluid">
    <v-data-table :items="owners" :headers="ownerHeaders">
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
    <ownerForm v-model="openOwnerForm" :title="dialogTitle" :cities="cities" :townships="townships" />
    <DetailDialog v-model="openDetailDialog" :item="selectedItem" title="Owner" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { ownerHeaders } from '@/utils/tableHeaders'
import ownerForm from '@/components/FormDialog/ownerForm'
import DetailDialog from '@/components/DetailDialog/index'

export default {
  components: {
    ownerForm,
    DetailDialog
  },
  layout: 'dashboard',
  data: () => ({
    ownerHeaders,
    search: '',
    openOwnerForm: false,
    dialogTitle: '',
    selectedItem: {},
    openDetailDialog: false
  }),
  async fetch ({ store }) {
    await store.dispatch('owner/getOwners')
  },
  computed: {
    ...mapState({
      owners: (state) => {
        return state.owner.owners
      },
      cities: (state) => {
        return state.city.cities
      },
      townships: (state) => {
        return state.township.townships
      }
    })
  },
  methods: {
    showDialog (type, item = {}) {
      if (type === 'show') {
        this.selectedItem = (({ name, email, phone_number, address, city, township }) => ({ name, email, phone_number, address, city_name: city.name, township_name: township.name }))(item)
        this.openDetailDialog = !this.openDetailDialog
      } else {
        if (type === 'edit') {
          this.dialogTitle = 'Edit Owner'
        } else {
          this.dialogTitle = 'Create Owner'
        }
        this.$emit('openOwnerForm', JSON.parse(JSON.stringify(item)))
        this.openOwnerForm = true
      }
    }
  }
}
</script>
