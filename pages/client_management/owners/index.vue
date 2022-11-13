<template>
  <div class="container-fluid">
    <v-data-table :items="owners" :headers="ownerHeaders">
      <template #top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
          />
          <v-divider vertical inset />
          <v-spacer />
          <v-btn color="primary" @click="showDialog('create')">
            Create
          </v-btn>
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          class="mr-2"
          color="info"
          @click="showDialog('show',item)"
        >
          mdi-eye
        </v-icon>
        <v-icon
          class="mr-2"
          color="info"
          @click="showDialog('edit',item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
    <ownerForm v-model="openOwnerForm" :title="dialogTitle" />
    <DetailDialog v-model="openDetailDialog" title="Owner" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { ownerHeaders } from '@/utils/tableHeaders'
import ownerForm from '@/components/FormDialog/ownerForm'
import DetailDialog from '@/components/DetailDialog/index'

export default {
  components: {
    ownerForm,
    DetailDialog
  },
  layout: 'dashboard',
  data: () => ({
    ownerHeaders,
    search: '',
    openOwnerForm: false,
    dialogTitle: '',
    openDetailDialog: false
  }),
  async fetch ({ store }) {
    await store.dispatch('owner/get_owners')
  },
  computed: {
    ...mapState({
      owners: (state) => {
        return state.owner.owners
      }
    })
  },
  methods: {
    showDialog (type, item = null) {
      if (type === 'show') {
        this.openDetailDialog = !this.openDetailDialog
      } else {
        if (type === 'edit') {
          this.dialogTitle = 'Edit Owner'
        } else {
          this.dialogTitle = 'Create Owner'
        }
        this.$emit('openOwnerForm', item)
        this.openOwnerForm = true
      }
    }
  }
}
</script>
