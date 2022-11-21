<template>
  <div class="text-center">
    <v-dialog
      v-model="isOpenForm"
      width="800"
      persistent
    >
      <v-card>
        <v-card-title>
          {{ title }}
        </v-card-title>
        {{ model }}
        <v-form @submit.prevent="submitForm">
          <validation-observer ref="observer">
            <v-card-text>
              <v-row>
                <v-col md="6">
                  <validation-provider v-slot="{errors}" rules="required" name="City">
                    <v-autocomplete
                      v-model="model.city_id"
                      :items="cities"
                      item-text="name"
                      item-value="id"
                      outlined
                      :error-messages="errors"
                      label="City"
                    />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Township">
                    <v-autocomplete
                      v-model="model.township_id"
                      :items="townships"
                      item-text="name"
                      item-value="id"
                      outlined
                      :error-messages="errors"
                      label="Township"
                    />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Shop">
                    <v-autocomplete
                      v-model="model.shop_id"
                      :items="shops"
                      item-text="name"
                      item-value="id"
                      outlined
                      :error-messages="errors"
                      label="Shop"
                    />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="ShopType">
                    <v-autocomplete
                      v-model="model.shop_type_id"
                      :items="shoptypes"
                      item-text="name"
                      item-value="id"
                      outlined
                      :error-messages="errors"
                      label="Shop Type"
                    />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Name">
                    <v-text-field v-model="model.name" outlined :error-messages="errors" label="Name" />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="NameMM">
                    <v-text-field v-model="model.name_mm" outlined :error-messages="errors" label="NameMM" />
                  </validation-provider>
                </v-col>
                <v-col md="6">
                  <validation-provider v-slot="{errors}" rules="required" name="Phone Number">
                    <v-text-field v-model="model.phone_number" outlined label="Phone Number" :error-messages="errors" />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Address">
                    <v-textarea v-model="model.address" outlined label="Address" :error-messages="errors" />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Description">
                    <v-textarea v-model="model.description" outlined label="Description" :error-messages="errors" />
                  </validation-provider>
                </v-col>
              </v-row>
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
import { mapGetters } from 'vuex'
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
    cities: {
      type: Array,
      default: () => ([])
    },
    townships: {
      type: Array,
      default: () => ([])
    },
    shops: {
      type: Array,
      default: () => ([])
    },
    shoptypes: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    model: {}
  }),
  computed: {
    ...mapGetters({
      isUpdateBranch: 'isUpdateBranch'
    }),
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
    this.$parent.$on('openBranchForm', (item) => {
      this.model = item
    })
  },
  methods: {
    async submitForm () {
      await this.validateFormData(this)
      if (this.model.id) {
        this.$store.dispatch('branch/updateBranch', [this.model.id, this.model])
      } else {
        this.$store.dispatch('branch/createBranch', this.model)
      }
      this.isOpenForm = false
    }
  }
}
</script>
