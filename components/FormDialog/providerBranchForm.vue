<template>
  <div class="text-center">
    <v-dialog
      v-model="isOpenForm"
      width="800"
      persistent
    >
      <v-card>
        <v-card-title>
          {{ title }} - {{ model.name }}
        </v-card-title>

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
                  <validation-provider v-slot="{errors}" rules="required" name="Name">
                    <v-text-field v-model="model.name" outlined :error-messages="errors" label="Name" />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Email">
                    <v-text-field v-model="model.email" outlined label="Email" :error-messages="errors" />
                  </validation-provider>
                </v-col>
                <v-col md="6">
                  <validation-provider v-slot="{errors}" rules="required" name="Phone Number">
                    <v-text-field v-model="model.phone" outlined label="Phone Number" :error-messages="errors" />
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
                @click="cancelDialog"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                type="submit"
                :disabled="isSubmitting"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </validation-observer>
        </v-form>

        <v-divider />
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
    isSubmitting: false,
    model: {}
  }),
  mounted () {
    this.$parent.$on('openProviderBranchForm', (item) => {
      this.model = item
    })
  },
  methods: {
    async submitForm () {
      await this.postDialogData(this, 'provider_branches', this.model)
    },
    async cancelDialog () {
      return await this.closeDialog(this)
    }
  }
}
</script>
