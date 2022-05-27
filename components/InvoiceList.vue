<template>
  <div>
    <!-- Desktop List -->
    <div class="container d-none d-lg-block pt-5">
      <div class="d-flex align-items-middle row pt-md-5 pt-lg-0"> 
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
                    <input @click="toggleFilters('draft')" class="form-check-input" type="checkbox"  v-model="filtersObj.draft" id="sortDraftsCheckbox1">
                    <label class="form-check-label pt-1-5" role="button" for="sortDraftsCheckbox1">
                      Draft
                    </label>
                  </div>
                </div>
                <div class="dropdown-item fw-medium py-0">
                  <div class="d-block form-check">
                    <input @click="toggleFilters('pending')" class="form-check-input" type="checkbox"  v-model="filtersObj.pending" checked id="sortPendingCheckbox1">
                    <label class="form-check-label pt-1-5" role="button" for="sortPendingCheckbox1">
                      Pending
                    </label>
                  </div>
                </div>
                <div class="dropdown-item fw-bold py-0">
                  <div class="d-block form-check">
                    <input @click="toggleFilters('paid')" class="form-check-input" type="checkbox" value=""  v-model="filtersObj.paid" id="sortPaidCheckbox1">
                    <label class="form-check-label pt-1-5" role="button" for="sortPaidCheckbox1">
                      Paid
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button @click="showOffCanvas()"  data-bs-toggle="offcanvas" href="#offcanvasNewInvoice" role="button" aria-controls="offcanvasNewInvoice" class="btn d-inline bg-purple btn-round text-white small-12 p-2 fw-medium">
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

    <div class="container d-none d-lg-block mt-5 pb-5">
      <div class="row">
        <div v-if="filteredInvoices.length === 0" class="container">
          <div class="row">
            <div class="offset-md-2 col-md-8 text-center pt-5">
              <img src="/illustration-empty.svg" alt="">
              <p class="mt-5 fw-bold" :class="[lightMode ? 'text-dark' : 'text-white']">
                There is nothing here
              </p>
              <p class="small-11 text-light">
                Create an invoice by clicking the <br>
                <span class="fw-bold">New Invoice</span> button and get started
              </p>
            </div>
          </div>
        </div>
        <button v-for="(invoice, index) in filteredInvoices" :key="index" @click="this.$router.push({path: '/invoice/' + invoice.id})" class="border-0 offset-md-2 col-md-8 text-light rounded px-4 py-3 mb-3 shadow hover" :class="[lightMode ? 'bg-white' : 'bg-dark-purple']" role="button">
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
                  <div v-if="invoice.status === 'pending'" class="d-inline-block w-104 text-orange bg-orange small-12 fw-medium p-3 ms-0 text-center rounded">
                    <svg width="8" height="8" viewBox="0 0 8 8" class="mb-1 me-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="4" cy="4" r="4" fill="#FF8F00"/>
                    </svg>
                    {{ invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) }}
                  </div>
                  <div v-else-if="invoice.status === 'paid'" class="d-inline-block w-104 text-green bg-green small-12 fw-medium p-3 ms-0 text-center rounded">
                    <svg width="8" height="8" viewBox="0 0 8 8" class="mb-1 me-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="4" cy="4" r="4" fill="#33D69F"/>
                    </svg>
                    {{ invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) }}
                  </div>
                  <div v-else class="d-inline-block w-104 small-12 fw-medium p-3 ms-0 text-center rounded" :class="[lightMode ? 'text-dark bg-grey' : 'bg-light-light-purple text-light-light-purple']">
                    <svg width="8" height="8" viewBox="0 0 8 8" class="mb-1 me-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="4" cy="4" r="4" :fill="lightMode ? '#111' : '#FFF'"/>
                    </svg>
                    {{ invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) }}
                  </div>
                  <img src="/icon-arrow-right.svg" class="ms-3 d-inline" alt="Right Chevron Arrow">
                </div>
              </div>
            </div>
        </button>
      </div>
    </div>

    <!-- Mobile List -->
    <div class="container d-lg-none pt-5">
      <div class="d-flex align-items-middle row pt-5 pt-lg-0"> 
        <div class="w-50 ps-4">
          <span class="d-block small-32 ps-1 fw-medium" :class="[lightMode ? 'text-dark' : 'text-white']">Invoices</span>
          <span class="small-12 ps-2" :class="[lightMode ? 'text-light' : 'text-light-purple']">
            {{ store.invoices.length }} invoices
          </span>
          <br>
        </div>
        <div class="w-50 d-flex align-items-center justify-content-end ps-0">
          <div class="float-end">
            <div class="btn-group pt-2 ps-0">
              <div class="dropdown d-inline">
                <button class="d-inline bg-transparent fw-medium border-0 small-12 ps-0 me-3"  :class="[lightMode ? 'text-dark' : 'text-white']" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Filter<img src="/icon-arrow-down.svg" class="ms-2" alt="Filter by status">
                </button>
                <div class="dropdown-menu small-12 p-2 pt-3 pb-2 mt-3" :class="lightMode ? '' : 'bg-dark-purple'" aria-labelledby="dropdownMenuButton">
                  <div class="dropdown-item fw-medium py-0">
                    <div class="d-block form-check">
                      <input @click="toggleFilters('draft')" class="form-check-input" type="checkbox" v-model="filtersObj.draft" id="sortDraftsCheckbox">
                      <label class="form-check-label pt-1-5" :class="lightMode ? '' : 'text-white'" role="button" for="sortDraftsCheckbox">
                        Draft
                      </label>
                    </div>
                  </div>
                  <div class="dropdown-item fw-medium py-0">
                    <div class="d-block form-check">
                      <input @click="toggleFilters('pending')" class="form-check-input" type="checkbox" v-model="filtersObj.pending" checked id="sortPendingCheckbox">
                      <label class="form-check-label pt-1-5" :class="lightMode ? '' : 'text-white'" role="button" for="sortPendingCheckbox">
                        Pending
                      </label>
                    </div>
                  </div>
                  <div class="dropdown-item fw-bold py-0">
                    <div class="d-block form-check">
                      <input @click="toggleFilters('paid')" class="form-check-input" type="checkbox" v-model="filtersObj.paid" checked id="sortPaidCheckbox">
                      <label class="form-check-label pt-1-5" :class="lightMode ? '' : 'text-white'" role="button" for="sortPaidCheckbox">
                        Paid
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button @click="showOffCanvas()" data-bs-toggle="offcanvas" href="#offcanvasNewInvoice" role="button" aria-controls="offcanvasNewInvoice" class="me-3 float-end btn d-inline bg-purple btn-round text-white small-12 p-2 fw-medium">
              <div class="d-inline-flex align-items-center me-2 justify-content-center text-dark btn-round bg-white p-2" style="height: 30px; width: 30px;">
                <img src="/icon-plus.svg" alt="">
              </div>
              <span class="d-inline-block me-2">
                New Invoice
              </span>
            </button>
          </div>
        </div>

        <div class="container mt-4 pb-5 px-4">
          <div class="row px-3">
            <div v-if="filteredInvoices.length === 0" class="container">
              <div class="row">
                <div class="col-md-12 text-center pt-5">
                  <img src="/illustration-empty.svg" alt="">
                  <p class="mt-5 fw-bold" :class="[lightMode ? 'text-dark' : 'text-white']">
                    There is nothing here
                  </p>
                  <p class="small-11 text-light">
                    Create an invoice by clicking the <br>
                    <span class="fw-bold">New Invoice</span> button and get started
                  </p>
                </div>
              </div>
            </div>

            <button v-for="(invoice, index) in filteredInvoices" :key="index" @click="this.$router.push({path: '/invoice/' + invoice.id})" class="border-0 text-light rounded px-4 py-3 mb-3 shadow hover" :class="[lightMode ? 'bg-white' : 'bg-dark-purple']" aria-label="asdas" role="button">

              <div class="container p-0">
                <div class="row small-12 align-items-center py-2">
                  <div class="d-flex w-100 justify-content-between fw-mediumer">
                    <div class="small-16">
                      #<span class="fw-bold" :class="[lightMode ? 'text-dark' : 'text-white']">{{ invoice.id }}</span>
                    </div>
                    <div class="small-15">{{ invoice.clientName }}</div>
                  </div>
                  <div class="pt-4 d-flex justify-content-between small-15">
                    <div>
                      Due {{ convertDate(invoice.paymentDue) }} <br>
                      <span class="d-block small-18 p-0 text-start fw-bold mt-2 ps-0 ms-0" :class="[lightMode ? 'text-dark' : 'text-white']">£ {{ formatTotal(invoice.total) }}
                      </span>
                    </div>
                    <div>
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
                    <div v-else class="d-inline-block w-104 small-12 fw-medium p-3 ms-3 text-center rounded" :class="[lightMode ? 'text-dark bg-grey' : 'bg-light-light-purple text-light-light-purple']">
                      <svg width="8" height="8" viewBox="0 0 8 8" class="mb-1 me-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="4" :fill="lightMode ? '#111' : '#FFF'"/>
                      </svg>
                      {{ invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) }}
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
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
        return this.filtersObj[x.status]
      }) 
    }
  },
  data() {
    return {
      filtersObj: {
        draft: true,
        pending: true,
        paid: true
      },
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
    showOffCanvas: function () {
      document.getElementById('offcanvasNewInvoice').classList.add('transform-special')
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

      return num;
    },
    convertDate: (date) => {
      date = date.split('-')
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      
      return Number(date[2]) + ' ' + months[Number(date[1])] + ' ' + date[0]
    }
  }
})
</script>