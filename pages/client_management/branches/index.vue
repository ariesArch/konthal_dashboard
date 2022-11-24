<template>
  <div class="container-fluid">
    <v-data-table :items="branches" :headers="branchHeaders">
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
    <branchForm
      v-model="openBranchForm"
      :title="dialogTitle"
      :cities="cities"
      :townships="townships"
      :shops="shops"
      :shoptypes="shopTypes"
    />
    <DetailDialog v-model="openDetailDialog" :item="selectedItem" title="Branch" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { branchHeaders } from '@/utils/tableHeaders'
import branchForm from '@/components/FormDialog/branchForm'
import DetailDialog from '@/components/DetailDialog/index'
export default {
  components: {
    branchForm,
    DetailDialog
  },
  layout: 'dashboard',
  data: () => ({
    branchHeaders,
    search: '',
    openBranchForm: false,
    dialogTitle: '',
    selectedItem: {},
    openDetailDialog: false
  }),
  async fetch ({ store }) {
    await store.dispatch('branch/getBranches')
    await store.dispatch('shop/getShops')
    await store.dispatch('shopType/getShopTypes')
  },
  computed: {
    ...mapState({
      branches: (state) => {
        return state.branch.branches
      },
      cities: (state) => {
        return state.city.cities
      },
      townships: (state) => {
        return state.township.townships
      },
      shops: (state) => {
        return state.shop.shops
      },
      shopTypes: (state) => {
        return state.shopType.shopTypes
      },
      error: (state) => {
        return state.error
      }
    })
  },
  methods: {
    showDialog (type, item = {}) {
      if (type === 'show') {
        this.selectedItem = (({ name, name_mm, phone_number, address, description, city, township }) => ({ name, name_mm, phone_number, address, description, city_name: city.name, township_name: township.name }))(item)
        this.openDetailDialog = !this.openDetailDialog
      } else {
        if (type === 'edit') {
          this.dialogTitle = 'Edit Branch'
        } else {
          this.dialogTitle = 'Create Branch'
        }
        this.$emit('openBranchForm', JSON.parse(JSON.stringify(item)))
        this.openBranchForm = true
      }
    }
  }
}
</script>
