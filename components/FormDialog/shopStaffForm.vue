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
                  <validation-provider v-slot="{errors}" rules="required" name="ShopDepartment">
                    <v-autocomplete
                      v-model="model.shop_department_id"
                      :items="shopdepartments"
                      item-text="name"
                      item-value="id"
                      outlined
                      :error-messages="errors"
                      label="ShopDepartment"
                    />
                  </validation-provider>
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
                  <validation-provider v-slot="{errors}" rules="required" name="Username">
                    <v-text-field v-model="model.username" outlined :error-messages="errors" label="Username" />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Name">
                    <v-text-field v-model="model.name" outlined :error-messages="errors" label="Name" />
                  </validation-provider>
                </v-col>
                <v-col md="6">
                  <validation-provider v-slot="{errors}" rules="required" name="Phone Number">
                    <v-text-field v-model="model.phone_number" outlined label="Phone Number" :error-messages="errors" />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Email">
                    <v-textarea v-model="model.email" outlined label="Email" :error-messages="errors" />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Password">
                    <v-text-field v-model="model.password" outlined label="Password" :error-messages="errors" />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Address">
                    <v-textarea v-model="model.address" outlined label="Address" :error-messages="errors" />
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
    branches: {
      type: Array,
      default: () => ([])
    },
    shopdepartments: {
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
    this.$parent.$on('openShopStaffForm', (item) => {
      this.model = item
    })
  },
  methods: {
    async submitForm () {
      await this.validateFormData(this)
      if (this.model.id) {
        this.$store.dispatch('shopStaff/updateShopStaff', this.model.id, this.model)
      } else {
        this.$store.dispatch('shopStaff/createShopStaff', this.model)
      }
      this.isOpenForm = false
    }
  }
}
</script>
