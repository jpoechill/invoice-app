<template>
  <div>
    <div class="container mt-5">
      <div class="row"> 
        <div class="offset-md-2 col-md-3">
          <span class="d-block small-32 fw-medium">Invoices</span>
          <span class="small-12 text-light">
            There are {{ store.invoices.length }} total invoices
          </span>
        </div>
        <div class="col-md-5 ps-0 text-end">

          <div class="btn-group">

         <div class="dropdown d-inline">
            <button class="d-inline bg-transparent fw-medium border-0 small-12 ps-3 me-4" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Filter by status <img src="/icon-arrow-down.svg" class="ms-2" alt="Filter by status">
            </button>
            <div class="dropdown-menu small-12 p-2 pt-3 pb-2 mt-3" aria-labelledby="dropdownMenuButton">
              <div class="dropdown-item fw-medium py-0">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="sortDraftsCheckbox">
                  <label class="form-check-label pt-1-5" role="button" for="sortDraftsCheckbox">
                    Draft
                  </label>
                </div>
              </div>
              <div class="dropdown-item fw-medium py-0">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="sortPendingCheckbox">
                  <label class="form-check-label pt-1-5" role="button" for="sortPendingCheckbox">
                    Pending
                  </label>
                </div>
              </div>
              <div class="dropdown-item fw-medium py-0">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="sortPaidCheckbox">
                  <label class="form-check-label pt-1-5" role="button" for="sortPaidCheckbox">
                    Paid
                  </label>
                </div>
              </div>
            </div>
          </div>
          </div>


          <button data-bs-toggle="offcanvas" href="#offcanvasNewInvoice" role="button" aria-controls="offcanvasNewInvoice" class="btn d-inline bg-purple btn-round text-white small-12 p-2 fw-medium">
            <div class="d-inline-flex align-items-center me-2 justify-content-center text-dark btn-round bg-white p-2" style="height: 30px; width: 30px;">
              <img src="/icon-plus.svg" alt="">
            </div>
            <span class="d-inline-block me-2">
              New Invoice 
            </span>
          </button>
        </div>
      </div>
    </div>

    <div class="container mt-5 mb-4">
      <div class="row">
        <div v-for="(invoice, index) in store.invoices" :key="index" class="offset-md-2 col-md-8 bg-white text-light rounded px-4 py-3 mb-3 shadow">
          <nuxt-link :to="'/invoice/' + invoice.id">
            <div class="container p-0">
              <div class="row small-12 align-items-center">
                <div class="col-md-2 fw-mediumer">
                  #<span class="text-dark fw-medium">{{ invoice.id }}</span>
                </div>
                <div class="col-md-3 fw-mediumer">
                  Due {{ convertDate(invoice.paymentDue) }}
                </div>
                <div class="col-md-2-5 fw-mediumer">
                  {{ invoice.clientName }}
                </div>
                <div class="col-md-2 small-15 p-0 text-dark fw-medium">
                  £ {{ invoice.total }}
                </div>
                <div class="col-md-2-5 text-end float-end py-0">
                  <div v-if="invoice.status === 'pending'" class="d-inline-block w-104 text-orange bg-orange small-12 fw-medium p-3 ms-3 text-center rounded">
                    • {{ invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) }}
                  </div>
                  <div v-else class="d-inline-block w-104 text-green bg-green small-12 fw-medium p-3 ms-3 text-center rounded">
                    • {{ invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) }}
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useStore } from '~/stores/store'

export default {
  name: 'AppHeader',
  data() {
    return {
      filteredInvoices: [],
      store: null,
    }
  },
  async created() {
    try {
      this.store = useStore()
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    alert: function (msg) {
      alert(msg)
    },
    convertDate: (date) => {
      date = date.split('-')
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      
      return Number(date[2]) + ' ' + months[Number(date[1])] + ' ' + date[0]
    }
  }
}
</script>


<style>
body, html {
  font-family: 'Spartan';
  background-color: #f8f9fa; 
}

a {
  text-decoration: none;
  color: inherit;
}

.fw-medium {
  font-weight: 600;
}

.fw-mediumer {
  font-weight: 500;
}

.small-11 {
  font-size: 11px;
}

.small-12 {
  font-size: 12px;
}

.small-15 {
  font-size: 15px;
}

.small-16 {
  font-size: 16px;
}

.small-18 {
  font-size: 18px;
}

.small-24 {
  font-size: 24px;
}

.small-32 {
  font-size: 32px;
}

.shadow {
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.02)!important;
}

.rounded-full {
  border-radius: 1000px;
  width: 40px;
  height: 40px;
}

.text-orange {
  color: #FF8F00;
}

.text-purple {
  color: #7C5DFA;
}

.text-light-purple {
  color: #7E88C3;
}

.bg-orange {
  background-color: rgba(255,143,0,.05)
}

.text-green {
  color: #33D69F;
}

.w-104 {
  width: 104px!important;
}

.w-150 {
  width: 150px!important;
}

.bg-green {
  background-color: rgba(51,214,159,.05)
}

.rounded {
  border-radius: 8px!important;
}

.rounded-top-right {
  border-top-right-radius: 20px!important;
}

.rounded-bottom-right {
  border-bottom-right-radius: 20px!important;
}

.rounded-top-left {
  border-top-left-radius: 20px!important;
}

.shadow {
  box-shadow: rgba(72,84,159,.1);
}

.col-md-1-5 {
  flex: 0 0 auto;
  width: 12%;
}

.col-md-2-5 {
  flex: 0 0 auto;
  width: 20.83333%;
}

.btn-dropdown, .btn-dropdown:hover {
  color: white;
}

.btn-dropdown:focus {
  box-shadow: none;
}

.dropdown-menu {
  width: 52px;
  padding: 0px;
  padding-top: 6px;
  padding-bottom: 4px;
  padding-right: 0px;
  margin-left: 14px;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 5px 30px 10px rgba(0,0,0,0.1);
}

.dropdown-item {
  /* padding-right: 22px;
  padding-left: 22px;
  padding-top: 6px;
  padding-bottom: 6px; */
}

.dropdown-item:focus, .dropdown-item:hover {
    color: #AD1FEA!important;
    background-color: transparent !important;
}

.pt-1-5 {
  padding-top: 0.15rem;
}

</style>