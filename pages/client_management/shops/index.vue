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
    <shopForm
      v-model="openShopForm"
      :title="dialogTitle"
      :cities="cities"
      :townships="townships"
      :owners="owners"
      :shoptypes="shopTypes"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { shopHeaders } from '@/utils/tableHeaders'
import shopForm from '@/components/FormDialog/shopForm'

export default {
  components: {
    shopForm

  },
  layout: 'dashboard',
  data: () => ({
    shopHeaders,
    search: '',
    openShopForm: false,
    dialogTitle: ''
  }),
  async fetch ({ store }) {
    await store.dispatch('shop/getShops')
    await store.dispatch('shopType/getShopTypes')
    await store.dispatch('owner/getOwners')
  },
  computed: {
    ...mapState({
      shops: (state) => {
        return state.shop.shops
      },
      cities: (state) => {
        return state.city.cities
      },
      townships: (state) => {
        return state.township.townships
      },
      owners: (state) => {
        return state.owner.owners
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
    showDialog (type = null, item = {}) {
      this.dialogTitle = 'Create Shop'
      this.$emit('openShopForm', JSON.parse(JSON.stringify(item)))
      this.openShopForm = true
    }
  //   showDialog (type, item = {}) {
  //     if (type === 'edit') {
  //       this.dialogTitle = 'Edit Shop'
  //     } else {
  //       this.dialogTitle = 'Create Shop'
  //     }
  //     this.$emit('openShopForm', JSON.parse(JSON.stringify(item)))
  //     this.openShopForm = true
  //   }
  }
}

</script>
