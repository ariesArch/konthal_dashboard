<template>
  <div class="container-fluid">
    {{ error }}
    <v-data-table :items="regions" :headers="regionHeaders">
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
    <regionForm v-model="openRegionForm" :title="dialogTitle" />
    <DetailDialog v-model="openDetailDialog" title="Region" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { regionHeaders } from '@/utils/tableHeaders'
import regionForm from '@/components/FormDialog/regionForm'
import DetailDialog from '@/components/DetailDialog/index'
export default {
  components: {
    regionForm,
    DetailDialog
  },
  layout: 'dashboard',
  data: () => ({
    regionHeaders,
    search: '',
    openRegionForm: false,
    openDetailDialog: false,
    dialogTitle: ''
  }),
  async fetch ({ store }) {
    await store.dispatch('region/getRegions')
  },
  computed: {
    ...mapState({
      regions: (state) => {
        return state.region.regions
      },
      error: (state) => {
        return state.error
      }
    })
  },
  methods: {
    showDialog (type, item = {}) {
      if (type === 'show') {
        this.openDetailDialog = !this.openDetailDialog
      } else {
        if (type === 'edit') {
          this.dialogTitle = 'Edit Region'
        } else {
          this.dialogTitle = 'Create Region'
        }
        this.$emit('openRegionForm', JSON.parse(JSON.stringify(item)))
        this.openRegionForm = true
      }
    }
  }
}
</script>
