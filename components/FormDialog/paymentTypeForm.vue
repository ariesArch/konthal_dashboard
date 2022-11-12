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
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            outlined
            @click="false"
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
        return this.$emit('input', { ...this.value, value })
      }
    }
  },
  mounted () {
    this.$parent.$on('openPaymentTypeForm', (item) => {
      this.model = item
    })
  }
}
</script>
