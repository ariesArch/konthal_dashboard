<template>
  <div class="container-fluid">
    {{ error }}
    <v-data-table :items="townships" :headers="townshipHeaders">
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
    <townshipForm v-model="openTownshipForm" :title="dialogTitle" :cities="cities" />
    <DetailDialog v-model="openDetailDialog" title="Township" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { townshipHeaders } from '@/utils/tableHeaders'
import townshipForm from '@/components/FormDialog/townshipForm'
import DetailDialog from '@/components/DetailDialog/index'
export default {
  components: {
    townshipForm,
    DetailDialog
  },
  layout: 'dashboard',
  data: () => ({
    townshipHeaders,
    search: '',
    openTownshipForm: false,
    openDetailDialog: false,
    dialogTitle: ''
  }),
  async fetch ({ store }) {
    await store.dispatch('township/getTownships')
  },
  computed: {
    ...mapState({
      townships: (state) => {
        return state.township.townships
      },
      cities: (state) => {
        return state.city.cities
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
          this.dialogTitle = 'Edit Township'
        } else {
          this.dialogTitle = 'Create Township'
        }
        this.$emit('openTownshipForm', JSON.parse(JSON.stringify(item)))
        this.openTownshipForm = true
      }
    }
  }
}
</script>
