<template>
  <div class="container-fluid">
    {{ error }}
    <v-data-table :items="payment_methods" :headers="paymentMethodHeaders">
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
    <paymentMethodForm v-model="openPaymentMethodForm" :title="dialogTitle" />
    <DetailDialog v-model="openDetailDialog" title="PaymentMethod" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { paymentMethodHeaders } from '@/utils/tableHeaders'
import paymentMethodForm from '@/components/FormDialog/paymentMethodFrom'
import DetailDialog from '@/components/DetailDialog/index'
export default {
  components: {
    paymentMethodForm,
    DetailDialog
  },
  layout: 'dashboard',
  data: () => ({
    paymentMethodHeaders,
    search: '',
    openPaymentMethodForm: false,
    openDetailDialog: false,
    dialogTitle: ''
  }),
  async fetch ({ store }) {
    await store.dispatch('paymentMethod/getPaymentMethods')
  },
  computed: {
    ...mapState({
      payment_methods: (state) => {
        return state.paymentMethod.paymentMethods
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
          this.dialogTitle = 'Edit PaymentMethod'
        } else {
          this.dialogTitle = 'Create PaymentMethod'
        }
        this.$emit('openPaymentMethodForm', JSON.parse(JSON.stringify(item)))
        this.openPaymentMethodForm = true
      }
    }
  }
}
</script>
