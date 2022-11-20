<template>
  <v-dialog v-model="isOpenDetail" width="500">
    <v-card>
      <v-card-title>{{ title }} {{ item.name }}- Detail</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(val,key) in item" :key="key">
            <v-list-item-title>
              {{ getItemLabel(key) }}
            </v-list-item-title>
            <v-list-item-title>
              {{ val }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
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
    item: {
      type: Object,
      default: () => ({})
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
