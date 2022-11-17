<template>
  <div class="text-center">
    <v-dialog
      v-model="isOpenForm"
      width="800"
      persistent
    >
      <v-card>
        <v-card-title>
          {{ title }} - {{ model.name }}={{ model }}
        </v-card-title>

        <v-form @submit.prevent="submitForm">
          <validation-observer ref="observer">
            <v-card-text>
              <validation-provider v-slot="{errors}" rules="required" name="Branch">
                <v-autocomplete
                  v-model="model.branch_id"
                  :items="branches"
                  item-text="name"
                  item-value="id"
                  outlined
                  :error-messages="errors"
                  label="Branch"
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
              <validation-provider v-slot="{errors}" rules="required" name="Name">
                <v-text-field
                  v-model="model.name"
                  outlined
                  :error-messages="errors"
                  label="Name"
                />
              </validation-provider>
              <validation-provider v-slot="{errors}" rules="required" name="NameMM">
                <v-text-field
                  v-model="model.name_mm"
                  outlined
                  :error-messages="errors"
                  label="NameMM"
                />
              </validation-provider>
              <validation-provider v-slot="{errors}" rules="required" name="Price">
                <v-text-field
                  v-model="model.price"
                  outlined
                  :error-messages="errors"
                  label="Price"
                />
              </validation-provider>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                outlined
                @click="isOpenForm=false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                type="submit"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </validation-observer>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
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
    model: {}
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
      }
      this.$store.dispatch('product/createProduct', this.model)
      this.isOpenForm = false
    }
  }
}
</script>
