<template>
  <div>
    <!-- New Invoice Modal -->
    <div class="offcanvas offcanvas-start p-special" :class="[lightMode ? '' : 'bg-dark']" style="width: 750px;" tabindex="-1" id="offcanvasNewInvoice" aria-labelledby="offcanvasNewInvoiceLabel">
      <div class="container p-5 mt-5 mt-lg-0 offcanvas-body smooth-scroll" ref="newInvoiceModal">
        <div class="row">
          <div class="col-md-12">
            <div class="small-24">
              <span class="fw-medium" :class="[lightMode ? '' : 'text-white']">New Invoice</span>
            </div>
          </div>
        </div>

        <div class="row mt-4 small-12 text-light-purple">
          <div class="col-md-12 mb-3 fw-medium text-purple">
            Bill From
          </div>
          <div class="col-md-12" :class="[lightMode ? '' : 'text-light-light-purple', invoice.senderAddress.street.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Street Address</span>
              <span v-if="invoice.senderAddress.street.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" v-model="invoice.senderAddress.street.value" type="text">
          </div>
        </div>
        <div class="row small-12 text-light-purple">
          <div class="col-md-4" :class="[lightMode ? '' : 'text-light-light-purple', invoice.senderAddress.city.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>City</span>
              <span v-if="invoice.senderAddress.city.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" v-model="invoice.senderAddress.city.value">
          </div>
          <div class="col-md-4" :class="[lightMode ? '' : 'text-light-light-purple', invoice.senderAddress.postCode.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Post Code</span>
              <span v-if="invoice.senderAddress.postCode.hasError">Can't be empty</span>
            </div>
            <input class="form-control mt-2 mb-3 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" v-model="invoice.senderAddress.postCode.value">
          </div>
          <div class="col-md-4" :class="[lightMode ? '' : 'text-light-light-purple', invoice.senderAddress.country.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Country</span>
              <span v-if="invoice.senderAddress.country.hasError">Can't be empty</span>
            </div>
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" v-model="invoice.senderAddress.country.value">
          </div>
        </div>

        <div class="row mt-4 small-12 text-light-purple">
          <div class="col-md-12 mb-3 fw-medium text-purple">
            Bill To
          </div>
          <div class="col-md-12 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoice.clientName.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Client's Name</span>
              <span v-if="invoice.clientName.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" v-model="invoice.clientName.value" type="text">
          </div>
          <div class="col-md-12 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoice.clientEmail.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Client's Email</span>
              <span v-if="invoice.clientEmail.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" v-model="invoice.clientEmail.value" type="text">
          </div>
          <div class="col-md-12 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoice.clientAddress.street.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Street Address</span>
              <span v-if="invoice.clientAddress.street.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" v-model="invoice.clientAddress.street.value" type="text">
          </div>
        </div>
        <div class="row small-12 text-light-purple">
          <div class="col-md-4 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoice.clientAddress.city.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>City</span>
              <span v-if="invoice.clientAddress.city.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" v-model="invoice.clientAddress.city.value">
          </div>
          <div class="col-md-4 mt-2 mb-3" :class="[lightMode ? '' : 'text-light-light-purple', invoice.clientAddress.postCode.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Post Code</span>
              <span v-if="invoice.clientAddress.postCode.hasError">Can't be empty</span>
            </div>
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" v-model="invoice.clientAddress.postCode.value">
          </div>
          <div class="col-md-4 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoice.clientAddress.country.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Country</span>
              <span v-if="invoice.clientAddress.country.hasError">Can't be empty</span>
            </div>
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" v-model="invoice.clientAddress.country.value">
          </div>
        </div>
        <div class="row mt-3 small-12 text-light-purple">
          <div class="col-md-6 mb-3" :class="[lightMode ? '' : 'text-light-light-purple']">
            <div class="w-100 d-flex justify-content-between">
              <span>Invoice Date</span>
              <span v-if="invoice.senderAddress.street.hasError">Can't be empty</span>
            </div>
            <div class="w-100 d-flex align-items-center justify-content-end ps-0">
              <div class="float-end w-100">
                <div class="btn-group pt-2 w-100 ps-0">
                  <div class="dropdown d-inline w-100">
                    <button class="form-control p-3 fw-medium small-12 w-100" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="float-start">Oct 10 2025</span>
                      <img src="/icon-calendar.svg" class="ms-2 float-end" alt="Filter by status">
                    </button>
                    <div class="dropdown-menu small-12 p-2 pt-3 pb-3 mt-2 px-0 w-100" aria-labelledby="dropdownMenuButton" role="button">
                      <div class="dropdown-item fw-medium py-0">
                        <div class="d-block form-check ps-0">
                          <label class="form-check-label py-2" role="button" for="sortDraftsCheckbox">
                            Net 1 Day
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-3" :class="[lightMode ? '' : 'text-light-light-purple']">
            <div class="w-100 d-flex justify-content-between">
              <span>Payment Terms</span>
              <span v-if="invoice.senderAddress.street.hasError">Can't be empty</span>
            </div>
            <div class="w-100 d-flex align-items-center justify-content-end ps-0">
              <div class="float-end w-100">
                <div class="btn-group pt-2 w-100 ps-0">
                  <div class="dropdown d-inline w-100">
                    <button class="form-control p-3 fw-medium small-12 w-100" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="float-start">Net 30 Days </span>
                      <img src="/icon-arrow-down.svg" class="pt-1 ms-2 float-end" alt="Filter by status">
                    </button>
                    <!-- <button class="d-inline bg-transparent fw-medium border small-12 ps-3 me-3"  :class="[lightMode ? 'text-dark' : 'text-white']" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Filter
                      <img src="/icon-arrow-down.svg" class="ms-2" alt="Filter by status">
                    </button> -->
                    <div class="dropdown-menu small-12 p-2 pt-3 pb-3 mt-2 px-0 w-100" aria-labelledby="dropdownMenuButton" role="button">
                      <div class="dropdown-item fw-medium py-0 border-bottom">
                        <div class="d-block form-check ps-0">
                          <label class="form-check-label py-2" role="button" for="sortDraftsCheckbox">
                            Net 1 Day
                          </label>
                        </div>
                      </div>
                      <div class="dropdown-item fw-medium py-0 border-bottom">
                        <div class="d-block form-check ps-0">
                          <label class="form-check-label py-3" role="button" for="sortPendingCheckbox">
                            Net 7 Days
                          </label>
                        </div>
                      </div>
                      <div class="dropdown-item fw-medium py-0 border-bottom">
                        <div class="d-block form-check ps-0">
                          <label class="form-check-label py-3" role="button" for="sortPaidCheckbox">
                            Net 14 Days
                          </label>
                        </div>
                      </div>
                      <div class="dropdown-item fw-medium py-0">
                        <div class="d-block form-check ps-0">
                          <label class="form-check-label pt-3" role="button" for="sortPaidCheckbox">
                            Net 30 Days
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 mt-0" :class="[lightMode ? '' : 'text-light-light-purple', invoice.description.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Project Description</span>
              <span v-if="invoice.description.hasError">Can't be empty</span>
            </div>
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" v-model="invoice.description.value">
          </div>
        </div>

        <!-- Mobile Item List -->
        <div class="d-lg-none">
          <div class="row small-12 text-light-purple">
            <div class="col-md-12 mt-4 mb-3 fw-medium small-18" :class="[lightMode ? '' : 'text-light-light-purple']">
              Item List
            </div>
          </div>
          <div v-for="(item, index) in invoice.items" :key="index" class="row d-flex align-items-center mb-3">
            <div class="col-md-5 small-12 text-light-purple" :class="[lightMode ? '' : 'text-light-light-purple']">
              Item Name
            </div>
            <div class="col-md-12">
              <input class="form-control mt-2 mb-4 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" v-model="item.value">
            </div>
            <div class="col-3 small-12 text-light-purple" :class="[lightMode ? '' : 'text-light-light-purple']">
              Qty.
            </div>
            <div class="col-4 small-12 text-light-purple" :class="[lightMode ? '' : 'text-light-light-purple']">
              Price
            </div>
            <div class="col-5 small-12 text-light-purple" :class="[lightMode ? '' : 'text-light-light-purple']">
              Total
            </div>
            <div class="col-3 small-12 text-light-purple" :class="[lightMode ? '' : 'text-light-light-purple']">
              <input class="form-control mt-2 mb-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text"  value="10">
            </div>
            <div class="col-4 small-12 text-light-purple" :class="[lightMode ? '' : 'text-light-light-purple']">
              <input class="form-control mt-2 mb-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" value="100.00">
            </div>
            <div class="col-5 pb-3 small-12 fw-bold text-light-purple" :class="[lightMode ? '' : 'text-light-light-purple']">
              400.00 <img class="float-end" @click="removeInvoiceItem(index)" role="button" src="/icon-delete.svg" alt="Delete">
            </div>
          </div>
        </div>

        <!-- Desktop Item List -->
        <div class="d-none d-lg-block">
          <div class="row small-12 text-light-purple">
            <div class="col-md-12 mt-4 mb-3 fw-medium small-18" :class="[lightMode ? '' : 'text-light-light-purple']">
              Item List
            </div>
            <div class="col-md-4" :class="[lightMode ? '' : 'text-light-light-purple']">
              Item Name
            </div>
            <div class="col-md-2" :class="[lightMode ? '' : 'text-light-light-purple']">
              Qty.
            </div>
            <div class="col-md-3" :class="[lightMode ? '' : 'text-light-light-purple']">
              Price
            </div>
            <div class="col-md-3" :class="[lightMode ? '' : 'text-light-light-purple']">
              Total
            </div>
          </div>
          <div v-for="(item, index) in invoice.items" :key="index" class="row d-flex align-items-center mb-2">
            <div class="col-md-4">
              
              <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" v-model="item.name.value" placeholder="">
            </div>
            <div class="col-md-2">
              <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="number" v-model="item.quantity.value">
            </div>
            <div class="col-md-3">
              <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="number" v-model="item.price" placeholder="99.99">
            </div>
            <div class="col-md-3 text-light small-12 fw-medium">
              {{ item.quantity.value * item.price.value }}
              <img class="float-end" @click="removeInvoiceItem(index)" role="button" src="/icon-delete.svg" alt="Delete">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mt-2 mb-3">
            <button @click="addNewInvoiceItem()" class="btn btn-round small-12 w-100 p-3 mt-2 mb-3 px-4 fw-medium me-2" :class="[lightMode ? 'bg-light text-dark' : 'bg-light-light-purple text-light-light-purple']" >
              + Add New Item
            </button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <button class="btn bg-light text-light text-dark btn-round small-12 p-3 px-4 fw-medium me-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNewInvoice">
              Discard
            </button>
            <div class="float-end">
              <button @click="submitNewDraft()" class="btn btn-round small-12 p-3 px-4 fw-medium me-2" :class="[lightMode ? 'bg-light text-dark' : 'bg-light-light-purple text-light-light-purple']" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNewInvoice">
                Save as Draft
              </button>
              <button @click="submitNewInvoice()" class="btn bg-purple text-white btn-round small-12 p-3 px-4 fw-medium" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNewInvoice">
                Save and Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Nav -->
    <div class="d-lg-none fixed-top w-100 bg-dark-blue text-white d-inline-flex justify-content-between" style="height: 70px; z-index: 9999;">
      <div class="mb-auto position-relative bg-purple d-flex align-items-center overflow-hidden vertical-align-middle rounded-bottom-right rounded-top-right" style="height: 70px; width: 70px;">
        <nuxt-link to="/" class="mx-auto" style="z-index: 9999;">
          <img src="/logo.svg" alt="Logo">
        </nuxt-link>
        <div class="position-absolute top-50 w-100 rounded-top-left bg-light-purple" style="min-height: 100%;"></div>
      </div>
      <div class=" d-inline-flex align-items-center">
        <button @click="toggleLightMode()" class="btn p-0 me-3" role="button">
          <img :src="lightMode ? '/icon-moon.svg' : '/icon-sun.svg'" alt="Toggle Light/Dark Mode" role="button">
        </button>
        <div class="ms-3 h-100 border-start d-inline-flex align-items-center p-4">
          <img src="/image-avatar.jpg" class="rounded-full" alt="Image Avatar">
        </div>
      </div>
    </div>

    <!-- Desktop Nav -->
    <div class="d-lg-block d-none">
      <div class="fixed-top h-100 bg-dark-blue text-white d-flex flex-column align-items-start rounded-bottom-right rounded-top-right " style="width: 90px; z-index: 9999;">
        <div class="mb-auto position-relative bg-purple d-flex align-items-center overflow-hidden w-100 vertical-align-middle rounded-top-right rounded-bottom-right" style="height: 90px; width: 90px;">
          <nuxt-link to="/" class="mx-auto" style="z-index: 9999;">
            <img src="/logo.svg" alt="Logo">
          </nuxt-link>
          <div class="position-absolute top-50 w-100 rounded-top-left bg-light-purple h-100"></div>
        </div>
        <div class="w-100 mx-auto text-center py-3">
          <img @click="toggleLightMode()" :src="lightMode ? '/icon-sun.svg' : '/icon-moon.svg'" alt="Toggle Light/Dark Mode" role="button">
          <hr class="">
          <img src="/image-avatar.jpg" class="rounded-full" alt="Image Avatar">
        </div>
      </div>
    </div>
    <slot />
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
  },
  mounted() {
    document.body.classList.add("bg-light-light")
  },
  data: function () {
    return {
      invoice: {
        "createdAt": "",
        "paymentDue": "",
        "description": {
          value: "Branding",
          hasError: false,
        },
        "paymentTerms": 1,
        "clientName": {
          value: "Jensen Huang",
          hasError: false,
        },
        "clientEmail": {
          value: "jensenh@mail.com",
          hasError: false,
        },
        "status": "paid",
        "senderAddress": {
          "street": {
            value: "19 Union Terrace",
            hasError: false,
          },
          "city": {
            value: "London",
            hasError: false,
          },
          "postCode": {
            value: "E1 3EZ",
            hasError: false,
          },
          "country": {
            value: "United Kingdom",
            hasError: false,
          }
        },
        "clientAddress": {
          "street": {
            value: "19 Union Terrace",
            hasError: false,
          },
          "city": {
            value: "London",
            hasError: false,
          },
          "postCode": {
            value: "E1 3EZ",
            hasError: false,
          },
          "country": {
            value: "United Kingdom",
            hasError: false,
          }
        },
        "items": [
          {
            "name": {
              value: "Brand Guidelines",
              hasError: true,
            },
            "quantity":  {
              value: 1,
              hasError: true,
            },
            "price":  {
              value: "1800.90",
              hasError: true,
            },
            "total":  {
              value: "1800.90",
              hasError: true,
            }
          }
        ],
        "total": 1800.90
      },
    }
  },
  methods: {
    alert: function (msg) {
      alert(msg)
    },
    toggleLightMode: function () {
      useStore().toggleLightMode()
      // this.lightMode = useStore().lightMode
      // console.log('from store: ' + useStore().lightMode)
    },
    validateNewInvoice: function () {
      let hasErrors = false

      if (this.invoice.description.value === '') {
        this.invoice.description.hasError = true
        hasErrors = true
      } else {
        this.invoice.description.hasError = false
      }

      if (this.invoice.clientName.value === '') {
        this.invoice.clientName.hasError = true
        hasErrors = true
      } else {
        this.invoice.clientName.hasError = false
      }

      if (this.invoice.clientEmail.value === '') {
        this.invoice.clientEmail.hasError = true
        hasErrors = true
      } else {
        this.invoice.clientEmail.hasError = false
      }

      if (this.invoice.senderAddress.street.value === '') {
        this.invoice.senderAddress.street.hasError = true
        hasErrors = true
      } else {
        this.invoice.senderAddress.street.hasError = false
      }

      if (this.invoice.senderAddress.city.value === '') {
        this.invoice.senderAddress.city.hasError = true
        hasErrors = true
      } else {
        this.invoice.senderAddress.city.hasError =  false
      }

      if (this.invoice.senderAddress.postCode.value === '') {
        this.invoice.senderAddress.postCode.hasError = true
        hasErrors = true
      } else {
        this.invoice.senderAddress.postCode.hasError = false
      }

      if (this.invoice.senderAddress.country.value === '') {
        this.invoice.senderAddress.country.hasError = true
        hasErrors = true
      } else {
        this.invoice.senderAddress.country.hasError = false
      }

      if (this.invoice.clientAddress.street.value === '') {
        this.invoice.clientAddress.street.hasError = true
        hasErrors = true
      } else {
        this.invoice.clientAddress.street.hasError = false
      }

      if (this.invoice.clientAddress.city.value === '') {
        this.invoice.clientAddress.city.hasError = true
        hasErrors = true
      } else {
        this.invoice.clientAddress.city.hasError = false
      }

      if (this.invoice.clientAddress.postCode.value === '') {
        this.invoice.clientAddress.postCode.hasError = true
        hasErrors = true
      } else {
        this.invoice.clientAddress.postCode.hasError = false
      }

      if (this.invoice.clientAddress.country.value === '') {
        this.invoice.clientAddress.country.hasError = true
        hasErrors = true
      } else {
        this.invoice.clientAddress.country.hasError = false
      }

      if (hasErrors) {
        this.$refs.newInvoiceModal.scrollTo(0,0)
        return false
      } else {
        return true
      }
    },
    submitNewInvoice: function () {
      if (this.validateNewInvoice()) {
        this.store.submitNewInvoice(
          {
            "createdAt": this.invoice.createdAt,
            "paymentDue": this.invoice.paymentDue,
            "description": this.invoice.description.value,
            "paymentTerms": 1,
            "clientName": this.invoice.clientName.value,
            "clientEmail": this.invoice.clientEmail.value,
            "status": 'pending',
            "senderAddress": {
              "street": this.invoice.senderAddress.street.value,
              "city": this.invoice.senderAddress.city.value,
              "postCode": this.invoice.senderAddress.postCode.value,
              "country": this.invoice.senderAddress.country.value,
            },
            "clientAddress": {
              "street": this.invoice.clientAddress.street.value,
              "city": this.invoice.clientAddress.city.value,
              "postCode": this.invoice.clientAddress.postCode.value,
              "country": this.invoice.clientAddress.country.value,
            },
            "items": this.invoice.items,
            "total": this.invoice.total
          }
        )
      } else {
        console.log('Please check form errors')
      }
    },
    submitNewDraft: function () {
      this.store.submitNewDraft(
        {
          "createdAt": this.invoice.createdAt,
          "paymentDue": this.invoice.paymentDue,
          "description": this.invoice.description.value,
          "paymentTerms": 1,
          "clientName": this.invoice.clientName.value,
          "clientEmail": this.invoice.clientEmail.value,
          "status": 'pending',
          "senderAddress": {
            "street": this.invoice.senderAddress.street.value,
            "city": this.invoice.senderAddress.city.value,
            "postCode": this.invoice.senderAddress.postCode.value,
            "country": this.invoice.senderAddress.country.value,
          },
          "clientAddress": {
            "street": this.invoice.clientAddress.street.value,
            "city": this.invoice.clientAddress.city.value,
            "postCode": this.invoice.clientAddress.postCode.value,
            "country": this.invoice.clientAddress.country.value,
          },
          "items": this.invoice.items,
          "total": this.invoice.total
        }
      )
    },
    addNewInvoiceItem: function () {
      this.invoice.items.push(
        {
          "name": {
            value: "",
            hasError: true,
          },
          "quantity":  {
            value: 1,
            hasError: true,
          },
          "price":  {
            value: "",
            hasError: true,
          },
          "total":  {
            value: "",
            hasError: true,
          }
        }
      )
    },
  },
  watch: {
    lightMode: function () {
      if (this.lightMode) {
        document.body.classList.remove('bg-dark')
        document.body.classList.add('bg-light-light')
      } else {
        document.body.classList.add('bg-dark')
        document.body.classList.remove('bg-light-light')
      }
    }
  }
})
</script>


<style>
</style>
