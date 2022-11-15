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
                <v-text-field
                  v-model="model.username"
                  outlined
                  :error-messages="errors"
                  label="Name"
                />
              </validation-provider>
              <validation-provider v-slot="{errors}" rules="required" name="Password">
                <v-text-field
                  v-model="model.password"
                  outlined
                  :error-messages="errors"
                  label="Psaaword"
                />
              </validation-provider>
              <validation-provider v-slot="{errors}" rules="required" name="Email">
                <v-text-field
                  v-model="model.email"
                  outlined
                  :error-messages="errors"
                  label="Email"
                />
              </validation-provider>
              <validation-provider v-slot="{errors}" rules="required" name="Name">
                <v-text-field
                  v-model="model.name"
                  outlined
                  :error-messages="errors"
                  label="name"
                />
              </validation-provider>
              <validation-provider v-slot="{errors}" rules="required" name="PhoneNo">
                <v-text-field
                  v-model="model.phone_number"
                  outlined
                  :error-messages="errors"
                  label="Phone No"
                />
              </validation-provider>
              <validation-provider v-slot="{errors}" rules="required" name="ViberNo">
                <v-text-field
                  v-model="model.viber_number"
                  outlined
                  :error-messages="errors"
                  label="Viber No"
                />
              </validation-provider>
              <validation-provider v-slot="{errors}" rules="required" name="Address">
                <v-text-field
                  v-model="model.address"
                  outlined
                  :error-messages="errors"
                  label="Address"
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
    this.$parent.$on('openOwnerForm', (item) => {
      this.model = item
    })
  },
  methods: {
    async submitForm () {
      await this.validateFormData(this)
      if (this.model.id) {
        this.$store.dispatch('owner/updateOwner', this.model.id, this.model)
      }
      this.$store.dispatch('owner/createOwner', this.model)
      this.isOpenForm = false
    }
  }
}
</script>
