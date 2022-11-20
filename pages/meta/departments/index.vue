<template>
  <div class="container-fluid">
    {{ error }}
    <v-data-table :items="departments" :headers="departmentHeaders">
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
    <departmentForm v-model="openDepartmentForm" :title="dialogTitle" />
    <DetailDialog v-model="openDetailDialog" :item="selectedItem" title="Department" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { departmentHeaders } from '@/utils/tableHeaders'
import departmentForm from '@/components/FormDialog/departmentForm'
import DetailDialog from '@/components/DetailDialog/index'
export default {
  components: {
    departmentForm,
    DetailDialog
  },
  layout: 'dashboard',
  data: () => ({
    departmentHeaders,
    search: '',
    openDepartmentForm: false,
    openDetailDialog: false,
    selectedItem: {},
    dialogTitle: ''
  }),
  async fetch ({ store }) {
    await store.dispatch('department/getDepartments')
  },
  computed: {
    ...mapState({
      departments: (state) => {
        return state.department.departments
      },
      error: (state) => {
        return state.error
      }
    })
  },
  methods: {
    showDialog (type, item = {}) {
      if (type === 'show') {
        this.selectedItem = (({ name, name_mm }) => ({ name, name_mm }))(item)
        this.openDetailDialog = !this.openDetailDialog
      } else {
        if (type === 'edit') {
          this.dialogTitle = 'Edit Department'
        } else {
          this.dialogTitle = 'Create Department'
        }
        this.$emit('openDepartmentForm', JSON.parse(JSON.stringify(item)))
        this.openDepartmentForm = true
      }
    }
  }
}
</script>
