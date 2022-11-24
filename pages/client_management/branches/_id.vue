<template>
  <div class="container-fluid">
    <v-row v-if="isFetching">
      <v-col cols>
        <v-skeleton-loader
          type="table"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols>
        <ListTable
          :items="product"
          :headers="productHeaders"
          title="Products"
          @toggleCreateDialog="showCreateDialog"
        />
      </v-col>
    </v-row>
    <DetailDialog v-model="openDetailDialog" :item="selectedItem" />
    <productForm v-model="openProductForm" :title="dialogTitle" :branches="[]" :categories="categories" :brands="brands" />
  </div>
</template>
<script>
import localforage from 'localforage'
import { productHeaders } from '@/utils/tableHeaders'
import productForm from '@/components/FormDialog/productForm'
export default {
  components: {
    productForm
  },
  layout: 'dashboard',
  data: () => ({
    branchId: '',
    isFetching: false,
    productHeaders,
    isEditing: false,
    detail: {},
    products: [],
    openDetailDialog: false,
    selectedItem: {},
    openProductForm: false,
    dialogTitle: '',
    categories: [],
    brands: []

  }),
  watch: {
    detail (newVal, oldVal) {
      this.products = newVal.products
    }
  },
  async created () {
    this.branchId = this.$route.params.id
    await this.fetchDetail(this, `/branches/${this.branchId}`)
  },
  async mounted () {
    this.brands = await localforage.getItem('stored:brands')
    this.categories = await localforage.getItem('stored:categories')
  },
  methods: {
    showCreateDialog (title) {
      this.selectedItem.shop_id = this.detail.shop_id
      this.selectedItem.branch_id = this.detail.id
      this.$emit('openProductForm', this.selectedItem)
      this.openProductForm = true
      this.dialogTitle = 'Create Product'
    }
  }
}
</script>
