<template>
  <div>
    <div class="container mt-5 small-11">
      <div class="row"> 
        <div class="offset-md-2 col-md-8">
          <nuxt-link to="/">
            Go back
          </nuxt-link>
           {{ invoice }}
        </div>
        <div class="offset-md-2 col-md-8 bg-white mt-4 p-3 d-flex align-items-center justify-content-between">
          
          <div class="d-inline">
            Status
            <div class="d-inline bg-dark p-2 ms-3 text-white rounded">
              • Pending
            </div>
          </div>
          <div class="d-inline float-end">
            <button class="btn btn-light">
              Edit
            </button>
            <button class="btn btn-danger">
              Delete
            </button>
            <button class="btn btn-primary">
              Mark as Paid
            </button>
          </div>
        </div>
        <div class="offset-md-2 col-md-8 bg-white mt-3 p-3 py-5">
          
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <span class="fw-bold mb-2 fs-6">
                  {{ '#' + invoice.id }}
                </span> <br>
                {{ invoice.description }}
              </div>
              <div class="col-md-6 text-end">
                {{ invoice.senderAddress.street }} <br>
                {{ invoice.senderAddress.city }}  <br>
                {{ invoice.senderAddress.postCode }}  <br>
                {{ invoice.senderAddress.country }} 
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-md-3">
                Invoice Date <br>
                <span class="d-block fw-bold mt-2 fs-6">
                  {{ invoice.createdAt }}
                </span> <br>

                Payment Due <br>
                <span class="d-block fw-bold mt-2 fs-6">
                  {{ invoice.paymentDue }}
                </span>
              </div>
              <div class="col-md-4">
                Bill To <br>

                <span class="d-block fw-bold mt-2 fs-6"> 
                  {{ invoice.clientName }}
                </span> <br>
                {{ invoice.clientAddress.street }} <br>
                {{ invoice.clientAddress.city }}  <br>
                {{ invoice.clientAddress.postCode }}  <br>
                {{ invoice.clientAddress.country }} 
              </div>
              <div class="col-md-5">
                Sent To <br>
                <span class="d-block fw-bold mt-2 fs-6"> 
                  {{ invoice.clientEmail }}
                </span> 
              </div>
            </div>
          </div>

          <div class="bg-light mx-4">
            <div class="container py-4 px-4 mt-5">
              <div class="row">
                <div class="col-md-6">
                  Item Name
                </div>
                <div class="col-md-2">
                  QTY.
                </div>
                <div class="col-md-2 text-end">
                  Price
                </div>
                <div class="col-md-2 text-end">
                  Total
                </div>
              </div>

              <div v-for="(item, index) in invoice.items" :key="index" class="row mt-3">
                <div class="col-md-6 fw-bold">
                  {{ item.name }}
                </div>
                <div class="col-md-2">
                  {{ item.quantity }}
                </div>
                <div class="col-md-2 text-end">
                  {{ item.price }}
                </div>
                <div class="col-md-2 text-end">
                  {{ item.total }}
                </div>
              </div>

            </div>
          </div>

          <div class="bg-dark-blue text-white mx-4">
            <div class="container py-4 px-4">
              <div class="row">
                <div class="col-md-6">
                  Amount Due
                </div>
                <div class="col-md-6 text-end">
                  <h1 class="mb-0">
                  {{ invoice.total }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useStore } from '~~/stores/store'

export default defineComponent({
  setup() {
    
  },
  data() {
    return {
      invoice: {},
      store: useStore(),
    }
  },
  created () {
    this.invoice = this.store.invoices.find(x => x.id === this.$route.params.id)
  }
})
</script>


<style>
.bg-dark-blue {
  background-color: #373B53;
}

.bg-light {
  background-color: #F9FAFE!important;
}
</style>