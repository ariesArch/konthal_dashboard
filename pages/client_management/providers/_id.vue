<template>
  <div class="container-fluid">
    <v-row v-if="isFetching">
      <v-col md="6">
        <v-skeleton-loader
          type="card"
          min-height="800"
        />
      </v-col>
      <v-col md-6>
        <v-skeleton-loader
          type="table"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col :md="`${isEditing?'6':'4'}`">
        <v-card>
          <v-card-title>
            {{ providerInfo.name }}
            <v-spacer />
            <v-icon
              class="mr-2"
              color="info"
              @click="isEditing = !isEditing"
            >
              {{ isEditing?'mdi-close':'mdi-pencil' }}
            </v-icon>
          </v-card-title>
          <validation-observer v-if="isEditing" ref="observer">
            <v-form @submit.prevent="updateForm">
              <v-card-text>
                <div class="row">
                  <div class="col-md-6">
                    <validation-provider v-slot="{errors}" name="Name" rules="required">
                      <v-text-field
                        v-model="providerPayload.name"
                        dense
                        outlined
                        label="Name"
                        name="Name"
                        :error-messages="errors"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" name="Phone" rules="required">
                      <v-text-field
                        v-model="providerPayload.phone"
                        dense
                        outlined
                        label="Phone"
                        name="Phone"
                        :error-messages="errors"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" name="Email" rules="required">
                      <v-text-field
                        v-model="providerPayload.email"
                        dense
                        outlined
                        label="Email"
                        name="Email"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </div>
                  <div class="col-md-6">
                    <validation-provider v-slot="{errors}" rules="required" name="City">
                      <v-autocomplete
                        v-model="providerPayload.city_id"
                        dense
                        outlined
                        :items="cities"
                        item-text="name"
                        item-value="id"
                        :error-messages="errors"
                        label="City"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Township">
                      <v-autocomplete
                        v-model="providerPayload.township_id"
                        outlined
                        dense
                        :items="townships"
                        item-text="name"
                        item-value="id"
                        :error-messages="errors"
                        label="Township"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" name="Address" rules="required">
                      <v-textarea
                        v-model="providerPayload.address"
                        dense
                        outlined
                        label="Address"
                        name="Address"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </div>
                </div>
              </v-card-text>
              <formButton v-model="isEditing" :disabled="isSubmitting" />
            </v-form>
          </validation-observer>
          <v-card-text v-else>
            <v-list dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ providerInfo.name }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-city</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ providerInfo.city.name }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ providerInfo.township.name }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ providerInfo.phone }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ providerInfo.email }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="text-wrap">
                  {{ providerInfo.address }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col col>
        <ListTable
          :items="list"
          :headers="providerBranchHeaders"
          title="ProvderBranches"
          @toggleCreateDialog="showCreateDialog"
          @toggleDetailDialog="showDetailDialog"
          @toggleEditDialog="showEditDialog"
        />
      </v-col>
    </v-row>
    <DetailDialog v-model="openDetailDialog" :item="selectedItem" title="Provider" />
    <providerBranchForm
      v-model="openProviderBranchForm"
      :title="dialogTitle"
      :cities="cities"
      :townships="townships"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { providerHeaders, providerBranchHeaders } from '@/utils/tableHeaders'
import providerBranchForm from '@/components/FormDialog/providerBranchForm'
import ListTable from '@/components/ListTable/index'
export default {
  components: {
    providerBranchForm,
    ListTable
  },
  fetchOnServer: false,
  layout: 'dashboard',
  data: () => ({
    detail: {},
    providerId: '',
    providerInfo: {},
    providerPayload: {},
    providerHeaders,
    providerBranches: [],
    providerBranchHeaders,
    isEditing: false,
    isSubmitting: false,
    isFetching: false,
    selectedItem: {},
    openProviderBranchForm: false,
    openDetailDialog: false,
    dialogTitle: ''
  }),
  computed: {
    ...mapState({
      cities: (state) => {
        return state.city.cities
      },
      townships: (state) => {
        return state.township.townships
      },
      error: (state) => {
        return state.error
      }
    })
  },
  watch: {
    detail (newVal, oldVal) {
      this.providerInfo = (({ id, name, phone, address, email, city, township }) => ({ id, name, phone, address, email, city, township }))(newVal)
      this.list = newVal.provider_branches
      this.providerPayload = (({ name, phone, address, email, city, township }) => ({ name, phone, address, email, city_id: city.id, township_id: township.id }))(newVal)
    }
  },
  async created () {
    this.providerId = this.$route.params.id
    await this.fetchDetail(this, `/providers/${this.providerId}`)
  },
  // async mounted () {
  //   this.cities = await localforage.getItem('stored:cities')
  //   this.townships = await localforage.getItem('stored:townships')
  // },
  methods: {
    async updateForm () {
      this.isSubmitting = true
      try {
        const isErrorFree = await this.$refs.observer.validate()
        if (!isErrorFree) {
          this.isSubmitting = false
          return
        }
        const { data, status } = (await this.$axios.put(`providers/${this.providerId}`, this.providerPayload)).data
        if (status === 1) {
          this.providerInfo = data
          this.isEditing = false
        }
      } catch (error) {
        console.log(error.message)
      }
      this.isSubmitting = false
    },
    showCreateDialog (title) {
      this.selectedItem.provider_id = this.providerInfo.id
      this.$emit('openProviderBranchForm', this.selectedItem)
      this.openProviderBranchForm = true
      this.dialogTitle = 'Create Provider Branch'
      return this.selectedItem
    },
    showDetailDialog (title, item) {
      this.selectedItem = (({ name, city, township, phone, address, email }) => ({ name, city_name: city.name, township_name: township.name, phone, address, email }))(item)
      this.dialogTitle = 'Provider Branch'
      this.openDetailDialog = true
    },
    showEditDialog (title, item) {
      this.selectedItem = (({ id, name, city, township, phone, address, email }) => ({ id, name, city_id: city.id, township_id: township.id, phone, address, email }))(item)
      this.$emit('openProviderBranchForm', this.selectedItem)
      this.selectedItem.provider_id = this.providerInfo.id
      this.openProviderBranchForm = true
      this.dialogTitle = 'Edit Provider Branch'
    }
  }
}
</script>
