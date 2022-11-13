<template>
  <v-dialog v-model="isOpenDetail" width="500">
    <v-card>
      <v-card-title>{{ title }} - Detail</v-card-title>
    </v-card>
  </v-dialog>
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
  computed: {
    isOpenDetail: {
      get () {
        return this.value
      },
      set (value) {
        return this.$emit('input', value)
      }
    }
  }
}
</script>
