<template>
  <div class="container-fluid">
    <v-data-table :items="branches" :headers="branchHeaders">
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
    <branchForm v-model="openBranchForm" :title="dialogTitle" />
    <DetailDialog v-model="openDetailDialog" title="Branch" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { branchHeaders } from '@/utils/tableHeaders'
import branchForm from '@/components/FormDialog/branchForm'
import DetailDialog from '@/components/DetailDialog/index'
export default {
  components: {
    branchForm,
    DetailDialog
  },
  layout: 'dashboard',
  data: () => ({
    branchHeaders,
    search: '',
    openBranchForm: false,
    dialogTitle: '',
    openDetailDialog: false
  }),
  async fetch ({ store }) {
    await store.dispatch('branch/get_branches')
  },
  computed: {
    ...mapState({
      branches: (state) => {
        return state.branch.branches
      }
    })
  },
  methods: {
    showDialog (type, item = null) {
      if (type === 'show') {
        this.openDetailDialog = !this.openDetailDialog
      } else {
        if (type === 'edit') {
          this.dialogTitle = 'Edit Branch'
        } else {
          this.dialogTitle = 'Create Branch'
        }
        this.$emit('openBranchForm', item)
        this.openBranchForm = true
      }
    }
  }
}
</script>
