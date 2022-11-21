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
    this.$parent.$on('openTownshipForm', (item) => {
      this.model = item
    })
  },
  methods: {
    async submitForm () {
      await this.validateFormData(this)
      if (this.model.id) {
        this.$store.dispatch('township/updateTownship', [this.model.id, this.model])
      } else {
        this.$store.dispatch('township/createTownship', this.model)
      }
      this.isOpenForm = false
    }
  }
}
</script>
