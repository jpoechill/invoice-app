<template>
  <div>
    <div class="container pt-5">
      <div class="row"> 
        <div class="offset-md-2 col-md-3">
          <span class="d-block small-32 fw-medium" :class="[lightMode ? 'text-dark' : 'text-white']">Invoices</span>
          <span class="small-12" :class="[lightMode ? 'text-light' : 'text-light-purple']">
            There are {{ store.invoices.length }} total invoices
          </span>
          <br>
        </div>
        <div class="col-md-5 ps-0 text-end">
          
          <div class="btn-group">
            <div class="dropdown d-inline">
              <button class="d-inline bg-transparent fw-medium border-0 small-12 ps-3 me-4"  :class="[lightMode ? 'text-dark' : 'text-white']" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Filter by status <img src="/icon-arrow-down.svg" class="ms-2" alt="Filter by status">
              </button>
              <div class="dropdown-menu small-12 p-2 pt-3 pb-2 mt-3" aria-labelledby="dropdownMenuButton">
                <div class="dropdown-item fw-medium py-0">
                  <div class="d-block form-check">
                    <input @click="toggleFilters('draft')" class="form-check-input" type="checkbox" value="" checked id="sortDraftsCheckbox">
                    <label class="form-check-label pt-1-5" role="button" for="sortDraftsCheckbox">
                      Draft
                    </label>
                  </div>
                </div>
                <div class="dropdown-item fw-medium py-0">
                  <div class="d-block form-check">
                    <input @click="toggleFilters('pending')" class="form-check-input" type="checkbox" value="" checked id="sortPendingCheckbox">
                    <label class="form-check-label pt-1-5" role="button" for="sortPendingCheckbox">
                      Pending
                    </label>
                  </div>
                </div>
                <div class="dropdown-item fw-bold py-0">
                  <div class="d-block form-check">
                    <input @click="toggleFilters('paid')" class="form-check-input" type="checkbox" value="" checked id="sortPaidCheckbox">
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

    <div class="container mt-5 pb-4">
      <div class="row">
        <div v-if="filteredInvoices.length === 0" class="container">
          <div class="row">
            <div class="offset-md-2 col-md-8 text-center">
              <img src="/illustration-empty.svg" alt="">
              <p class="mt-5 fw-bold">
                There is nothing here
              </p>
              <p class="small-11 text-light">
                Create an invoice by clicking the <br>
                <span class="fw-bold">New Invoice</span> button and get started
              </p>
            </div>
          </div>
        </div>
        <div v-for="(invoice, index) in filteredInvoices" :key="index" @click="this.$router.push({path: '/invoice/' + invoice.id})" class="offset-md-2 col-md-8 text-light rounded px-4 py-3 mb-3 shadow hover"  :class="[lightMode ? 'bg-white' : 'bg-dark-purple']" role="button">
          <!-- <nuxt-link :to="'/invoice/' + invoice.id"> -->
            <div class="container p-0">
              <div class="row small-12 align-items-center">
                <div class="col-md-2 fw-mediumer">
                  #<span class="fw-bold" :class="[lightMode ? 'text-dark' : 'text-white']">{{ invoice.id }}</span>
                </div>
                <div class="col-md-2-5 p-0 fw-mediumer">
                  Due {{ convertDate(invoice.paymentDue) }}
                </div>
                <div class="col-md-2-5 fw-mediumer">
                  {{ invoice.clientName }}
                </div>
                <div class="col-md-2 small-15 p-0 text-end fw-bold" :class="[lightMode ? 'text-dark' : 'text-white']">
                  £ {{ formatTotal(invoice.total) }}
                </div>
                <div class="col-md-3 text-end float-end py-0">
                  <div v-if="invoice.status === 'pending'" class="d-inline-block w-104 text-orange bg-orange small-12 fw-medium p-3 ms-3 text-center rounded">
                    <svg width="8" height="8" viewBox="0 0 8 8" class="mb-1 me-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="4" cy="4" r="4" fill="#FF8F00"/>
                    </svg>
                    {{ invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) }}
                  </div>
                  <div v-else-if="invoice.status === 'paid'" class="d-inline-block w-104 text-green bg-green small-12 fw-medium p-3 ms-3 text-center rounded">
                    <svg width="8" height="8" viewBox="0 0 8 8" class="mb-1 me-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="4" cy="4" r="4" fill="#33D69F"/>
                    </svg>
                    {{ invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) }}
                  </div>
                  <div v-else class="d-inline-block w-104 text-dark bg-grey small-12 fw-medium p-3 ms-3 text-center rounded">
                    <svg width="8" height="8" viewBox="0 0 8 8" class="mb-1 me-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="4" cy="4" r="4" fill="#111"/>
                    </svg>
                    {{ invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) }}
                  </div>
                  <img src="/icon-arrow-right.svg" class="ms-3 d-inline" alt="Right Chevron Arrow">
                </div>
              </div>
            </div>
          <!-- </nuxt-link> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useStore } from '~/stores/store'

export default defineComponent({
  setup() {
    const store = useStore()

    return { store }
  },
  computed: {
    lightMode() {
      return this.store.lightMode
    },
    filteredInvoices: function () {
      return this.allInvoices.filter(x => {
        return this.filters.includes(x.status)
      }) 
    }
  },
  data() {
    return {
      // filteredInvoices: [],
      filters: ['draft', 'pending', 'paid'],
      allInvoices: useStore().invoices,
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
    toggleFilters: function (filterItem) {
      let index = this.filters.indexOf(filterItem)

      console.log('click: ' + filterItem)

      if (index >= 0) {
        this.filters.splice(index, 1)
      } else {
        this.filters.push(filterItem)
      }
    },
    formatTotal: function (n) {
      let val = Math.round(Number(n) * 100) / 100;
      let parts = val.toString().split(".");
      let num = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");

      if (!num.split('').includes('.')) {
        num = num + '.00'
      } else if (num.split('.')[1].length === 1) {
        num = num + '0'
      }

      return num
    },
    alert: function (msg) {
      alert(msg)
    },
    convertDate: (date) => {
      date = date.split('-')
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      
      return Number(date[2]) + ' ' + months[Number(date[1])] + ' ' + date[0]
    }
  }
})
</script>


<style>
body, html {
  font-family: 'Spartan';
  /* background-color: #f8f9fa;  */
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

.fw-bold {
  font-weight: 700!important;
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

/* .text-dark {
  color: #111111!important;
} */

.text-orange {
  color: #FF8F00;
}

.text-purple {
  color: #7C5DFA;
}

.text-light-light-purple {
  color: #DFE3FA;
}

.text-light-purple {
  color: #7E88C3;
}

.bg-orange {
  background-color: rgba(255,143,0,.05)
}

.bg-grey {
  background-color: rgba(55,59,83,.05)
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

.hover:hover {
  outline: 1px solid #7C5DFA;
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
    color: #888EB0!important;
    background-color: transparent !important;
}

.pt-1-5 {
  padding-top: 0.15rem;
}

.bg-dark-blue {
  background-color: #373B53;
}

.bg-dark {
  background-color: #141625!important;
}

.bg-dark-purple {
  background-color: #1E2139;
}

.bg-light {
  background-color: #F9FAFE!important;
}

.bg-light-light {
  background-color: #F8F8FB!important;
}

.bg-purple {
  background-color: #7C5DFA;
}

.bg-light-purple {
  background-color: #9277FF!important;
}

.bg-light-light-purple {
  background-color: #252945!important;
}

.bg-red {
  background-color: #EC5757;
}

.btn-round {
  border-radius: 1000px;
}

.text-light {
  color: #858BB2!important;
}

.rounded-top {
  border-top-left-radius: 8px!important;
  border-top-right-radius: 8px!important;
}

.rounded-bottom {
  border-bottom-right-radius: 8px!important;
  border-bottom-left-radius: 8px!important;
}

.line-height {
  line-height: 20px;
}

</style>