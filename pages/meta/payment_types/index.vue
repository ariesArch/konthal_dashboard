<template>
  <div class="container-fluid">
    <v-data-table :items="payment_types" :headers="paymentTypeHeaders">
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
    <paymentTypeForm v-model="openPaymentTypeForm" :title="dialogTitle" />
    <DetailDialog v-model="openDetailDialog" title="PaymentType" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { paymentTypeHeaders } from '@/utils/tableHeaders'
import paymentTypeForm from '@/components/FormDialog/paymentTypeForm'
import DetailDialog from '@/components/DetailDialog/index'
export default {
  components: {
    paymentTypeForm,
    DetailDialog
  },
  layout: 'dashboard',
  data: () => ({
    paymentTypeHeaders,
    search: '',
    openPaymentTypeForm: false,
    openDetailDialog: false,
    dialogTitle: ''
  }),
  async fetch ({ store }) {
    await store.dispatch('paymentType/get_payment_types')
  },
  computed: {
    ...mapState({
      payment_types: (state) => {
        return state.paymentType.paymentTypes
      }
    })
  },
  methods: {
    showDialog (type, item = null) {
      if (type === 'show') {
        this.openDetailDialog = !this.openDetailDialog
      } else {
        if (type === 'edit') {
          this.dialogTitle = 'Edit PaymentType'
        } else {
          this.dialogTitle = 'Create PaymentType'
        }
        this.$emit('openPaymentTypeForm', item)
        this.openPaymentTypeForm = true
      }
    }
  }
}
</script>
