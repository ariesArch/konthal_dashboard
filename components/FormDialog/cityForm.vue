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
              <validation-provider v-slot="{errors}" rules="required" name="Region">
                <v-autocomplete
                  v-model="model.region_id"
                  :items="regions"
                  item-text="name"
                  item-value="id"
                  outlined
                  :error-messages="errors"
                  label="Region"
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
    regions: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    model: {}
  }),
  computed: {
    ...mapGetters({
      isUpdateCity: 'isUpdateCity'
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
    this.$parent.$on('openCityForm', (item) => {
      this.model = item
    })
  },
  methods: {
    async submitForm () {
      await this.validateFormData(this)
      if (this.model.id) {
        this.$store.dispatch('city/updateCity', this.model.id, this.model)
      }
      this.$store.dispatch('city/createCity', this.model)
      this.isOpenForm = false
    }
  }
}
</script>
