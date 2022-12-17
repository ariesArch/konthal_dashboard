<template>
  <v-dialog
    v-model="isOpenForm"
    persistent
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-row no-gutters>
        <v-col md="8">
          <!-- <v-card-text> -->
          <v-stepper
            v-model="steps"
            elevation="0"
          >
            <v-stepper-header>
              <v-stepper-step
                :complete="steps >1"
                step="1"
              >
                Product Info
                <small>Fill about product</small>
              </v-stepper-step>
              <v-stepper-step
                :complete="steps >2"
                step="2"
              >
                Product Variation
                <small>Fill about product variation</small>
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-form @submit.prevent="submitForm">
                  <validation-observer ref="observer">
                    <v-row>
                      <v-col>
                        <h3>Description</h3>
                        <p>
                          Add your product description and necessary information from here
                        </p>
                      </v-col>
                      <v-col>
                        <validation-provider v-slot="{errors}" rules="required" name="Name">
                          <v-text-field
                            v-model="model.name"
                            outlined
                            :error-messages="errors"
                            label="Name"
                          />
                        </validation-provider>
                        <validation-provider v-slot="{errors}" rules="required" name="Name">
                          <v-text-field
                            v-model="model.name_mm"
                            outlined
                            :error-messages="errors"
                            label="Name"
                          />
                        </validation-provider>
                        <validation-provider v-slot="{errors}" rules="required" name="Description">
                          <v-textarea
                            v-model="model.description"
                            outlined
                            :error-messages="errors"
                            label="Description"
                            rows="3"
                          />
                        </validation-provider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <h3>Group & Categories</h3>
                        <p>
                          Select product group and categories from here
                        </p>
                      </v-col>
                      <v-col>
                        <validation-provider v-slot="{errors}" rules="required" name="Category">
                          <v-autocomplete
                            v-model="model.category_id"
                            :items="categories"
                            item-text="name"
                            item-value="id"
                            outlined
                            :error-messages="errors"
                            label="Category"
                          />
                        </validation-provider>
                        <validation-provider v-slot="{errors}" rules="required" name="Category">
                          <v-autocomplete
                            v-model="model.category_id"
                            :items="categories"
                            item-text="name"
                            item-value="id"
                            outlined
                            :error-messages="errors"
                            label="Category"
                          />
                        </validation-provider>
                        <validation-provider v-slot="{errors}" rules="required" name="Brand">
                          <v-autocomplete
                            v-model="model.brand_id"
                            :items="brands"
                            item-text="name"
                            item-value="id"
                            outlined
                            :error-messages="errors"
                            label="Brand"
                          />
                        </validation-provider>
                      </v-col>
                    </v-row>
                    <div class="float-right">
                      <v-btn
                        color="primary"
                        outlined
                        @click="step = 2"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="primary"
                        @click="steps = 2"
                      >
                        Containue
                      </v-btn>
                    </div>
                  </validation-observer>
                </v-form>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-form @submit.prevent="submitForm">
                  <validation-observer ref="observer">
                    <v-row>
                      <v-col>
                        <h3>Product Type</h3>
                        <p>
                          Select product type form here
                        </p>
                      </v-col>
                      <v-col>
                        <validation-provider v-slot="{errors}" rules="required" name="Product Type">
                          <v-autocomplete
                            v-model="model.product_type"
                            :items="product_types"
                            item-text="name"
                            item-value="id"
                            outlined
                            :error-messages="errors"
                            label="Product Type"
                          />
                        </validation-provider>
                      </v-col>
                    </v-row>
                    <v-divider class="my-2" />
                    <v-row v-if="model.product_type===1">
                      <v-col md-6>
                        <h3>Simple Product Information</h3>
                        <p>
                          Edit your simple product description and necessary information from here
                        </p>
                      </v-col>
                      <v-col>
                        <validation-provider v-slot="{errors}" rules="required" name="Price">
                          <v-text-field
                            v-model="model.price"
                            outlined
                            :error-messages="errors"
                            label="Price"
                          />
                        </validation-provider>
                        <validation-provider v-slot="{errors}" rules="required" name="Sale Price">
                          <v-text-field
                            v-model="model.sale_price"
                            outlined
                            :error-messages="errors"
                            label="Sale Price"
                          />
                        </validation-provider>
                        <validation-provider v-slot="{errors}" rules="required" name="Quantity">
                          <v-text-field
                            v-model="model.qty"
                            outlined
                            :error-messages="errors"
                            label="Quantity"
                          />
                        </validation-provider>
                        <validation-provider v-slot="{errors}" rules="required" name="SKU">
                          <v-text-field
                            v-model="model.sku"
                            outlined
                            :error-messages="errors"
                            label="SKU"
                          />
                        </validation-provider>
                        <validation-provider v-slot="{errors}" rules="required" name="Width">
                          <v-text-field
                            v-model="model.width"
                            outlined
                            :error-messages="errors"
                            label="Width"
                          />
                        </validation-provider>
                        <validation-provider v-slot="{errors}" rules="required" name="Height">
                          <v-text-field
                            v-model="model.height"
                            outlined
                            :error-messages="errors"
                            label="Height"
                          />
                        </validation-provider>
                        <validation-provider v-slot="{errors}" rules="required" name="Length">
                          <v-text-field
                            v-model="model.length"
                            outlined
                            :error-messages="errors"
                            label="Length"
                          />
                        </validation-provider>
                      </v-col>
                    </v-row>
                    <v-row v-else>
                      <v-col>
                        <h3>Product Variation Information</h3>
                        <p>
                          Choose your product variation and necessary information from here
                        </p>
                        <v-btn color="primary" class="mb-3">
                          ADD OPTION
                        </v-btn>
                        <v-row>
                          <v-col>
                            <validation-provider v-slot="{errors}" rules="required" name="Attributes">
                              <v-autocomplete
                                v-model="attributes[0]"
                                :items="attribute_names"
                                item-text="name"
                                item-value="id"
                                outlined
                                :error-messages="errors"
                                label="Attributes"
                              />
                            </validation-provider>
                          </v-col>
                          <v-col>
                            <validation-provider v-slot="{errors}" rules="required" name="Values">
                              <v-autocomplete
                                v-model="values[0]"
                                :items="attribute_values"
                                item-text="name"
                                item-value="id"
                                outlined
                                :error-messages="errors"
                                label="Values"
                                multiple
                              />
                            </validation-provider>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col>
                        <v-row>
                          <v-col>
                            <validation-provider v-slot="{errors}" rules="required" name="Attributes">
                              <v-autocomplete
                                v-model="attributes[0]"
                                :items="attribute_names"
                                item-text="name"
                                item-value="id"
                                outlined
                                :error-messages="errors"
                                label="Attributes"
                              />
                            </validation-provider>
                          </v-col>
                          <v-col>
                            <validation-provider v-slot="{errors}" rules="required" name="Values">
                              <v-autocomplete
                                v-model="values[0]"
                                :items="attribute_values"
                                item-text="name"
                                item-value="id"
                                outlined
                                :error-messages="errors"
                                label="Values"
                                multiple
                              />
                            </validation-provider>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <div class="float-right">
                      <v-btn
                        color="primary"
                        outlined
                        @click="steps = 1"
                      >
                        Back
                      </v-btn>
                      <v-btn
                        color="primary"
                        @click="steps = 2"
                      >
                        Containue
                      </v-btn>
                    </div>
                  </validation-observer>
                </v-form>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
        <v-col>
          <v-card elevation="0">
            <v-card-title>
              INfo
            </v-card-title>
            <v-card-text>
              {{ model.name }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
// import localforage from 'localforage'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    categories: {
      type: Array,
      default: () => ([])
    },
    brands: {
      type: Array,
      default: () => ([])
    },
    branches: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    model: {},
    steps: 1,
    current_step: 1,
    product_types: [
      { name: 'Simple Product', id: 1 },
      { name: 'Variable Product', id: 2 }
    ],
    attribute_names: [
      { name: 'Size', id: 1 },
      { name: 'Color', id: 2 }
    ],
    attribute_values: [
      { name: 'Red', id: 1 },
      { name: 'Green', id: 2 }
    ],
    attributes: [],
    values: []
  }),
  computed: {
    isOpenForm: {
      get () {
        return this.value
      },
      set (value) {
        return this.$emit('input', value)
      }
    }
  },
  mounted () {
    this.$parent.$on('openProductForm', (item) => {
      this.model = item
    })
  },
  methods: {
    async submitForm () {
      await this.validateFormData(this)
      if (this.model.id) {
        this.$store.dispatch('product/updateProduct', this.model.id, this.model)
      } else {
        this.$store.dispatch('product/createProduct', this.model)
      }
      this.isOpenForm = false
    }
  }
}
</script>
<style lang="scss">
.v-stepper__wrapper{
  padding-top:4px;
}
</style>
