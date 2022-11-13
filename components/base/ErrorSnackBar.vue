<template>
  <v-snackbar
    :value="error.hasError"
    absolute
    bottom
    right
    :timeout="5000 * 2"
    light
    height="80"
  >
    Error: <strong class="red--text">{{ error.errorMessage }}</strong>
    <v-icon
      color="warning"
      text
      small
      right
      style="float:right"
      @click="clearError()"
    >
      close
    </v-icon>
  </v-snackbar>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      error: 'error'
    })
  },
  methods: {
    ...mapMutations({
      clearError: 'CLEAR_ERROR'
    })
  }
}
</script>
