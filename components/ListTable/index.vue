<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer />
      <!-- <createDialogButton v-model="selectedItem.openBranchForm" /> -->
      <v-btn color="primary" @click="switchCreateDialog">
        Create
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="items">
        <template #[`item.actions`]="{item}">
          <v-icon
            class="mr-2"
            color="info"
            @click="switchDetailDialog(item)"
          >
            mdi-eye
          </v-icon>
          <v-icon
            color="primary"
            @click="switchEditDialog(item)"
          >
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    headers: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    switchCreateDialog () {
      this.$emit('toggleCreateDialog', this.title)
    },
    switchDetailDialog (item) {
      this.$emit('toggleDetailDialog', this.title, item)
    },
    switchEditDialog (item) {
      this.$emit('toggleEditDialog', this.title, item)
    }
  }
}
</script>
