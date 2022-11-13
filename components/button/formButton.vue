<template>
  <v-card-actions class="justify-end">
    <v-btn type="button" color="primary" outlined @click="goBack">
      Cancel
    </v-btn>
    <v-btn type="submit" color="primary" class="my-1" :disabled="disabled">
      Submit
    </v-btn>
  </v-card-actions>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack () {
      if (this.value) {
        this.$emit('input', !this.value)
        return
      }
      return this.$router.go('-1')
    }
  }
}
</script>
