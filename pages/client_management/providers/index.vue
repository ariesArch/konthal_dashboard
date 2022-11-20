<template>
  <div class="container-fluid">
    <v-data-table :items="providers" :headers="providerHeaders">
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
          @click="$router.push(`/client_management/providers/${item.id}`)"
        >
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>
    <providerForm
      v-model="openProviderForm"
      :title="dialogTitle"
      :cities="cities"
      :townships="townships"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { providerHeaders } from '@/utils/tableHeaders'
import providerForm from '@/components/FormDialog/providerForm'

export default {
  components: {
    providerForm
  },
  layout: 'dashboard',
  data: () => ({
    providerHeaders,
    search: '',
    openProviderForm: false,
    dialogTitle: ''
  }),
  async fetch ({ store }) {
    await store.dispatch('provider/getProviders')
  },
  computed: {
    ...mapState({
      providers: (state) => {
        return state.provider.providers
      },
      cities: (state) => {
        return state.city.cities
      },
      townships: (state) => {
        return state.township.townships
      }
    })
  },
  methods: {
    showDialog (type = null, item = {}) {
      this.dialogTitle = 'Create Provider'
      this.$emit('openProviderForm', JSON.parse(JSON.stringify(item)))
      this.openProviderForm = true
    }
  }
}

</script>
