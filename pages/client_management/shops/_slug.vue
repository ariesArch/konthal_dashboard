<template>
  <div class="container-fluid">
    <v-row v-if="isFetching">
      <v-col md="6">
        <v-skeleton-loader
          type="card"
          min-height="800"
        />
      </v-col>
      <v-col md-6>
        <v-skeleton-loader
          type="table"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col :md="`${isEditing?'6':'4'}`">
        <v-card>
          <v-card-title>
            {{ shopInfo.name }}
            <v-spacer />
            <v-icon
              class="mr-2"
              color="info"
              @click="isEditing = !isEditing"
            >
              {{ isEditing?'mdi-close':'mdi-pencil' }}
            </v-icon>
          </v-card-title>
          <validation-observer v-if="isEditing" ref="observer">
            <v-form @submit.prevent="updateForm">
              <v-card-text>
                <div class="row">
                  <div class="col-md-6">
                    <validation-provider v-slot="{errors}" name="Name" rules="required">
                      <v-text-field
                        v-model="shopPayload.name"
                        dense
                        outlined
                        label="Name"
                        name="Name"
                        :error-messages="errors"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" name="NameMM" rules="required">
                      <v-text-field
                        v-model="shopPayload.name_mm"
                        dense
                        outlined
                        label="NameMM"
                        name="NameMM"
                        :error-messages="errors"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" name="Phone" rules="required">
                      <v-text-field
                        v-model="shopPayload.phone_number"
                        dense
                        outlined
                        label="Phone"
                        name="Phone"
                        :error-messages="errors"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" name="Description" rules="required">
                      <v-textarea
                        v-model="shopPayload.description"
                        dense
                        outlined
                        label="Description"
                        name="Description"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </div>
                  <div class="col-md-6">
                    <validation-provider v-slot="{errors}" rules="required" name="Type">
                      <v-autocomplete
                        v-model="shopPayload.shop_type_id"
                        outlined
                        dense
                        :items="shop_types"
                        item-text="name"
                        item-value="id"
                        :error-messages="errors"
                        label="Type"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="City">
                      <v-autocomplete
                        v-model="shopPayload.city_id"
                        dense
                        outlined
                        :items="cities"
                        item-text="name"
                        item-value="id"
                        :error-messages="errors"
                        label="City"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Township">
                      <v-autocomplete
                        v-model="shopPayload.township_id"
                        outlined
                        dense
                        :items="townships"
                        item-text="name"
                        item-value="id"
                        :error-messages="errors"
                        label="Township"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" name="Address" rules="required">
                      <v-textarea
                        v-model="shopPayload.address"
                        dense
                        outlined
                        label="Address"
                        name="Address"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </div>
                </div>
              </v-card-text>
              <formButton v-model="isEditing" :disabled="isSubmitting" />
            </v-form>
          </validation-observer>
          <v-card-text v-else>
            <v-list dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ shopInfo.name }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ shopInfo.name_mm }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ shopInfo.shop_type.name }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-city</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ shopInfo.city.name }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ shopInfo.township.name }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ shopInfo.phone_number }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="text-wrap">
                  {{ shopInfo.address }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="text-wrap">
                  {{ shopInfo.description }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols>
        <ListTable
          :items="list"
          :headers="branchHeaders"
          title="Branches"
          @toggleCreateDialog="showCreateDialog"
          @toggleDetailDialog="showDetailDialog"
          @toggleEditDialog="showEditDialog"
        />
      </v-col>
      <v-col md="6">
        <ListTable
          :items="product"
          :headers="productHeaders"
          title="Products"
          @toggleCreateDialog="showCreateDialog"
          @toggleDetailDialog="showDetailDialog"
          @toggleEditDialog="showEditDialog"
        />
      </v-col>
    </v-row>
    <DetailDialog v-model="openDetailDialog" :item="selectedItem" title="Branch" />
    <branchForm
      v-model="openBranchForm"
      :title="dialogTitle"
      :cities="cities"
      :townships="townships"
      :shops="shops"
      :shoptypes="shopTypes"
    />
    <productForm v-model="openProductForm" :title="dialogTitle" :categories="categories" :brands="brands" />
  </div>
</template>
<script>
// import localforage from 'localforage'
import { mapState } from 'vuex'
import { branchHeaders, productHeaders } from '@/utils/tableHeaders'
import branchForm from '@/components/FormDialog/branchForm'
import productForm from '@/components/FormDialog/productForm'
import ListTable from '@/components/ListTable/index'
export default {
  components: {
    branchForm,
    productForm,
    ListTable
  },
  fetchOnServer: false,
  layout: 'dashboard',
  data: () => ({
    detail: {},
    shop_types: [],
    shopId: '',
    shopInfo: {},
    branches: [],
    branchHeaders,
    productHeaders,
    isEditing: false,
    shopPayload: {},
    isSubmitting: false,
    isFetching: false,
    selectedItem: {},
    openBranchForm: false,
    openDetailDialog: false,
    dialogTitle: '',
    openProductForm: false,
    product: []
  }),
  async fetch ({ store }) {
    await store.dispatch('branch/getBranches')
    await store.dispatch('shop/getShops')
    await store.dispatch('shopType/getShopTypes')
  },
  computed: {
    ...mapState({
      categories: (state) => {
        return state.category.categories
      },
      brands: (state) => {
        return state.brand.brands
      },
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
  watch: {
    detail (newVal, oldVal) {
      this.shopInfo = (({ id, name, name_mm, phone_number, address, description, owner, shop_type, city, township, branches }) => ({ id, name, name_mm, phone_number, address, description, owner, shop_type, city, township, branches }))(newVal)
      this.list = newVal.branches
      this.product = newVal.products
      this.shopPayload = (({ name, name_mm, phone_number, address, description, owner, shop_type, city, township }) => ({ name, name_mm, phone_number, address, description, owner_id: owner.id, shop_type_id: shop_type.id, city_id: city.id, township_id: township.id }))(newVal)
    }
  },
  async created () {
    this.shopId = this.$route.params.slug
    await this.fetchDetail(this, `/shops/${this.shopId}`)
  },
  methods: {
    async updateForm () {
      this.isSubmitting = true
      try {
        const isErrorFree = await this.$refs.observer.validate()
        if (!isErrorFree) {
          this.isSubmitting = false
          return
        }
        const { data, status } = (await this.$axios.put(`shops/${this.shopId}`, this.shopPayload)).data
        if (status === 1) {
          this.shopInfo = data
          this.isEditing = false
        }
      } catch (error) {
        console.log(error.message)
      }
      this.isSubmitting = false
    },
    showCreateDialog (title) {
      if (title === 'Branches') {
        this.selectedItem.shop_id = this.shopInfo.id
        this.$emit('openBranchForm', this.selectedItem)
        this.openBranchForm = true
        this.dialogTitle = 'Create Branch'
      } else {
        this.selectedItem.shop_id = this.shopInfo.id
        this.selectedItem.branch_id = this.shopInfo.branches[0].id
        this.$emit('openProductForm', this.selectedItem)
        this.openProductForm = true
        this.dialogTitle = 'Create Product'
      }
    },
    showDetailDialog (title, item) {
      if (title === 'Branches') {
        this.selectedItem = (({ name, name_mm, city, township, phone_number, address, description }) => ({ name, name_mm, city_name: city.name, township_name: township.name, phone_number, address, description }))(item)
        this.dialogTitle = 'Branch'
      } else {
        this.selectedItem = (({ name, name_mm, price, category, brand }) => ({ name, name_mm, price, category_name: category.name, brand_name: brand.name }))(item)
        this.dialogTitle = 'Product'
      }
      this.openDetailDialog = true
    },
    showEditDialog (title, item) {
      if (title === 'Branches') {
        this.selectedItem = (({ id, name, name_mm, city, township, phone_number, address, description }) => ({ id, name, name_mm, city_id: city.id, township_id: township.id, phone_number, address, description }))(item)
        this.selectedItem.shop_id = this.shopInfo.id
        this.selectedItem.shop_type_id = this.shopInfo.shop_type.id
        this.$emit('openBranchForm', this.selectedItem)
        this.openBranchForm = true
        this.dialogTitle = 'Edit Branch'
      } else {
        this.selectedItem = (({ id, name, name_mm, price }) => ({ id, name, name_mm, price }))(item)
        this.selectedItem.shop_id = this.shopInfo.id
        this.$emit('openProductForm', this.selectedItem)
        this.openProductForm = true
        this.dialogTitle = 'Edit Product'
      }
    }
  }
}
</script>
