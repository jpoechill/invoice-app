<template>
  <div>
    <!-- New Invoice Modal -->
    <!--  p-special -->
    <!-- {{ this.$refs }} -->
    <div class="offcanvas offcanvas-start-custom border-0" ref="offCanvas" style="width: 750px;" tabindex="-1" id="offcanvasNewInvoice" aria-labelledby="offcanvasNewInvoiceLabel">
      <div class="container p-special p-5 mt-5 mt-lg-0 offcanvas-body smooth-scroll"  :class="[lightMode ? '' : 'bg-dark']" ref="newInvoiceModal">
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
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', invoice.senderAddress.street.hasError ? 'has-error' : '']" v-model="invoice.senderAddress.street.value" type="text">
          </div>
        </div>
        <div class="row small-12 text-light-purple">
          <div class="col-md-4" :class="[lightMode ? '' : 'text-light-light-purple', invoice.senderAddress.city.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>City</span>
              <span v-if="invoice.senderAddress.city.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', invoice.senderAddress.city.hasError ? 'has-error' : '']" type="text" v-model="invoice.senderAddress.city.value">
          </div>
          <div class="col-md-4" :class="[lightMode ? '' : 'text-light-light-purple', invoice.senderAddress.postCode.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Post Code</span>
              <span v-if="invoice.senderAddress.postCode.hasError">Can't be empty</span>
            </div>
            <input class="form-control mt-2 mb-3 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', invoice.senderAddress.postCode.hasError ? 'has-error' : '']" type="text" v-model="invoice.senderAddress.postCode.value">
          </div>
          <div class="col-md-4" :class="[lightMode ? '' : 'text-light-light-purple', invoice.senderAddress.country.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Country</span>
              <span v-if="invoice.senderAddress.country.hasError">Can't be empty</span>
            </div>
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', invoice.senderAddress.country.hasError ? 'has-error' : '']" type="text" v-model="invoice.senderAddress.country.value">
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
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', invoice.clientName.hasError ? 'has-error' : '']" v-model="invoice.clientName.value" type="text">
          </div>
          <div class="col-md-12 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoice.clientEmail.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Client's Email</span>
              <span v-if="invoice.clientEmail.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', invoice.clientEmail.hasError ? 'has-error' : '']" v-model="invoice.clientEmail.value" type="text">
          </div>
          <div class="col-md-12 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoice.clientAddress.street.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Street Address</span>
              <span v-if="invoice.clientAddress.street.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', invoice.clientAddress.street.hasError ? 'has-error' : '']" v-model="invoice.clientAddress.street.value" type="text">
          </div>
        </div>
        <div class="row small-12 text-light-purple">
          <div class="col-md-4 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoice.clientAddress.city.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>City</span>
              <span v-if="invoice.clientAddress.city.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', invoice.clientAddress.city.hasError ? 'has-error' : '']" type="text" v-model="invoice.clientAddress.city.value">
          </div>
          <div class="col-md-4 mt-2 mb-3" :class="[lightMode ? '' : 'text-light-light-purple', invoice.clientAddress.postCode.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Post Code</span>
              <span v-if="invoice.clientAddress.postCode.hasError">Can't be empty</span>
            </div>
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', invoice.clientAddress.postCode.hasError ? 'has-error' : '']" type="text" v-model="invoice.clientAddress.postCode.value">
          </div>
          <div class="col-md-4 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoice.clientAddress.country.hasError ?  'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Country</span>
              <span v-if="invoice.clientAddress.country.hasError">Can't be empty</span>
            </div>
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', invoice.clientAddress.country.hasError ? 'has-error' : '']" type="text" v-model="invoice.clientAddress.country.value">
          </div>
        </div>
        <!-- Invoice Date Dropdown -->
        <div class="row mt-3 small-12 text-light-purple">
          <div class="col-md-6 mb-3" :class="[lightMode ? '' : 'text-light-light-purple']">
            <div class="w-100 d-flex justify-content-between">
              <span>Invoice Date</span>
            </div>
            <div class="w-100 d-flex align-items-center justify-content-end ps-0">
              <div class="float-end w-100">
                <div class="btn-group pt-2 w-100 ps-0">
                  <div class="dropdown d-inline w-100">
                    <button class="form-control p-3 fw-medium small-12 w-100" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="float-start">
                        {{ selectedDate.full }}
                      </span>
                      <img src="/icon-calendar.svg" class="ms-2 float-end" alt="Filter by status">
                    </button>
                    <div class="dropdown-menu small-12 p-2 pt-3 pb-2 mt-2 px-0 w-100"  :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" aria-labelledby="dropdownMenuButton">
                      <div class="px-3 fw-medium py-0">
                        <div class="d-block form-check ps-0">
                          <!-- Date Picker Header -->
                          <div class="mb-2 d-flex justify-content-between">
                            <div>
                              <img @click="navigateMonth('back')" onclick="event.stopPropagation()" src="/icon-arrow-left.svg" role="button" alt="">
                            </div>
                            <div class="pt-1">
                              <span>{{ formatMonth(currDate.month) + ' ' + currDate.year }}</span>
                            </div>
                            <div>
                              <img @click="navigateMonth('forward')" onclick="event.stopPropagation()" src="/icon-arrow-right.svg" role="button" alt="">  
                            </div>
                          </div>
                          <!-- Date Body Header -->
                          <div class="w-100 my-3" v-for="(days, weekIndex) in daysInMonth" :key="weekIndex">
                            <div class="d-flex justify-content-between pe-1">
                              <button @click="selectDay(day)" v-for="(day, dayIndex) in days" :key="dayIndex" class="p-0 small-12 fw-bold btn text-end" :class="[lightMode ? '' : 'text-white']" style="width: 2em">
                                <span v-if="day === selectedDate.day && selectedDate.year === currDate.year && selectedDate.month === currDate.month" class="text-purple">
                                  {{ day }}
                                </span>
                                <span v-else>
                                  {{ day }}
                                </span>
                              </button>
                            </div>
                          </div>
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
            </div>
            <div class="w-100 d-flex align-items-center justify-content-end ps-0">
              <div class="float-end w-100">
                <div class="btn-group pt-2 w-100 ps-0">
                  <div class="dropdown d-inline w-100">
                    <button class="form-control p-3 fw-medium small-12 w-100" :class="[lightMode ? '' : 'text-white bg-dark-dark-purple border-0']" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="float-start"> {{ activePaymentTerm.name }} </span>
                      <img src="/icon-arrow-down.svg" class="pt-1 ms-2 float-end" alt="Filter by status">
                    </button>
                    <div class="dropdown-menu small-12 p-2 pt-1 pb-0 mt-2 px-0 w-100"  :class="[lightMode ? '' : 'text-white bg-dark-dark-purple']" aria-labelledby="dropdownMenuButton" role="button">
                      <div v-for="(term, index) in paymentTerms" :key="index" class="dropdown-item fw-medium py-0" :class="[lightMode ? '' : 'text-white', index !== paymentTerms.length - 1 && lightMode ? 'border-bottom' : '', index !== paymentTerms.length - 1 && !lightMode ? 'border-bottom-dark' : '']">
                        <div @click="handlePaymentClick(term.value)" class="d-block form-check ps-0">
                          <label class="form-check-label py-3" :class="[term.isActive === true ? 'text-purple' : '']" role="button">
                            {{ term.name }}
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
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', invoice.description.hasError ? 'has-error' : '']" type="text" v-model="invoice.description.value">
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
              <input class="form-control mt-2 mb-4 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', item.name.hasError ? 'has-error' : '']" type="text" v-model="item.name.value">
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
              <input class="form-control mt-2 mb-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', item.quantity.hasError ? 'has-error' : '']" type="number" min="0" v-model="item.quantity.value">
            </div>
            <div class="col-4 small-12 text-light-purple" :class="[lightMode ? '' : 'text-light-light-purple']">
              <input class="form-control mt-2 mb-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', item.price.hasError ? 'has-error' : '']" type="number" min="0" v-model="item.price.value">
            </div>
            <div class="col-5 pb-3 small-12 fw-bold text-light-purple" :class="[lightMode ? '' : 'text-light-light-purple']">
              {{ '£ ' + formatTotal((Number(item.quantity.value) * Number(item.price.value))) }} 
              <img class="float-end" @click="removeInvoiceItem(index)" role="button" src="/icon-delete.svg" alt="Delete">
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
              <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', item.name.hasError ? 'has-error' : '']" type="text" v-model="item.name.value" placeholder="">
            </div>
            <div class="col-md-2">
              <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', item.quantity.hasError ? 'has-error' : '']" type="number" min="0" v-model="item.quantity.value">
            </div>
            <div class="col-md-3">
              <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', item.price.hasError ? 'has-error' : '']" type="number" min="0" v-model="item.price.value">
            </div>
            <div class="col-md-3 text-light small-12 fw-medium">
              {{ '£ ' + formatTotal((Number(item.quantity.value) * Number(item.price.value))) }} 
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
        <div class="row pb-3" v-if="hasErrors">
          <div class="col-md-12 small-12 text-error">
            • All fields must be added
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <button @click="clearInvoiceForm()" class="btn bg-light text-light text-dark btn-round small-12 p-3 px-4 fw-medium me-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNewInvoice">
              Discard
            </button>
            <div class="float-end">
              <button @click="submitNewDraft()" class="btn btn-round small-12 p-3 px-4 fw-medium me-2" :class="[lightMode ? 'bg-light text-dark' : 'bg-light-light-purple text-light-light-purple']" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNewInvoice">
                Save as Draft
              </button>
              <button @click="submitNewInvoice()" class="btn bg-purple text-white btn-round small-12 p-3 px-4 fw-medium">
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
        <button @click="toggleLightMode" class="btn p-0 me-3" role="button">
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
        <div @click="toggleLightMode" class="w-100 mx-auto text-center py-3" id="toggleLM" style="z-index: 99999;" role="button">
          <img  :src="lightMode ? '/icon-sun.svg' : '/icon-moon.svg'" class="noClick" alt="Toggle Light/Dark Mode">
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
    activePaymentTerm() {
      return this.paymentTerms.find(x => x.isActive)
    },
    lightMode() {
      return this.store.lightMode
    },
  },
  created () {
    this.clearInvoiceForm()
  },
  mounted() {
    document.body.classList.add("bg-light-light")
    this.initDateVals()
  },
  data: function () {
    return {
      hasErrors: false,
      paymentTerms: [
        {
          name: 'Net 1 Day',
          value: 1,
          isActive: true,
        },
        {
          name: 'Net 7 Days',
          value: 7,
          isActive: false,
        },
        {
          name: 'Net 14 Days',
          value: 14,
          isActive: false,
        },
        {
          name: 'Net 21 Days',
          value: 21,
          isActive: false,
        },
      ],
      invoice: {},
      selectedDate: {
        full: 'Oct 11 2022',
        month: '',
        day: '',
        year: '',
      },
      daysInMonth: [],
      currDate: {
        year: 0,
        month: 0,
        day: 0
      }
    }
  },
  methods: {
    manualToggle: function () {
      let closeCanvas = document.querySelector('[data-bs-toggle="offcanvas"]');
      closeCanvas.click();
    },
    formatTotal: function (n) {
      if (!n) { return 0 }

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
    handlePaymentClick: function (value) {
      this.paymentTerms = this.paymentTerms.map(x => {
        if (x.value === value) {
          x.isActive = true
          this.invoice.paymentTerms = x.value
        } else {
          x.isActive = false
        }

        return x
      })

      this.updatePaymentDue()
    },
    alert: function (msg) {
      alert(msg)
    },
    initDateVals: function () {
      let date = new Date()

      this.currDate.year = date.getFullYear()
      this.currDate.month = date.getMonth() + 1
      this.currDate.day = date.getDate()

      this.selectedDate.full = this.formatMonth(this.currDate.month) + ' ' + this.currDate.day + ' ' + this.currDate.year
      this.selectedDate.month = this.currDate.month
      this.selectedDate.day = this.currDate.day
      this.selectedDate.year = this.currDate.year

      // Populate days in current month, first time only
      let thisMonthSize = new Date(this.currDate.year, this.currDate.month, 0).getDate()
      let firstDayOfWeek = new Date(this.currDate.year, this.currDate.month - 1, 1).getDay()
      let arr = []

      arr = [...Array(firstDayOfWeek).fill(' '),...arr]

      for (let i = 1; i <= thisMonthSize; i++) {
        if (arr.length < 7) {
          arr.push(i)
        } else {
          this.daysInMonth.push(arr)
          arr = [i]
        }
      }

      this.invoice.createdAt = this.selectedDate.year + '-' + String(this.selectedDate.month).padStart(2, '0') + '-' + String(this.selectedDate.day).padStart(2, '0')
      this.updatePaymentDue()
      
      arr = arr.concat(Array(7 - arr.length).fill(' '))
      this.daysInMonth.push(arr)
    },
    formatMonth: function (month) {
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return months[month - 1]
    },
    updatePaymentDue: function () {
      let daysInMonth = new Date(this.selectedDate.year, this.selectedDate.month, 0).getDate()
      let paymentTerms = Number(this.invoice.paymentTerms)
      let selectedDay = Number(this.selectedDate.day)

      if (selectedDay + paymentTerms > daysInMonth) {
        let difference = (selectedDay + paymentTerms) - daysInMonth
        this.invoice.paymentDue = this.selectedDate.year + '-' + String(this.selectedDate.month + 1).padStart(2, '0') + '-' + String(difference).padStart(2, '0')
      } else {
        this.invoice.paymentDue = this.selectedDate.year + '-' + String(this.selectedDate.month).padStart(2, '0') + '-' + String(selectedDay + paymentTerms).padStart(2, '0')
      }
    },
    selectDay: function (day) {
      this.currDate.day = day

      this.selectedDate.full = this.formatMonth(this.currDate.month) + ' ' + this.currDate.day + ' ' + this.currDate.year
      this.selectedDate.month = this.currDate.month
      this.selectedDate.day = this.currDate.day
      this.selectedDate.year = this.currDate.year

      this.invoice.createdAt = this.selectedDate.year + '-' + String(this.selectedDate.month).padStart(2, '0') + '-' + String(this.selectedDate.day).padStart(2, '0')

      this.updatePaymentDue()
    },
    navigateMonth: function(direction) {
      if (direction === 'back') {
        if (this.currDate.month === 1) {
          this.currDate.month = 12
          this.currDate.year--
        } else {
          this.currDate.month--
        }
      } else {
        if (this.currDate.month === 12) {
          this.currDate.month = 1
          this.currDate.year++
        } else {
          this.currDate.month++
        }
      }

      this.daysInMonth = []
      let thisMonthSize = new Date(this.currDate.year, this.currDate.month, 0).getDate()
      let firstDayOfWeek = new Date(this.currDate.year, this.currDate.month - 1, 1).getDay()
      let arr = []

      arr = [...Array(firstDayOfWeek).fill(' '),...arr]

      for (let i = 1; i <= thisMonthSize; i++) {
        if (arr.length < 7) {
          arr.push(i)
        } else {
          this.daysInMonth.push(arr)
          arr = [i]
        }
      }

      arr = arr.concat(Array(7 - arr.length).fill(' '))
      this.daysInMonth.push(arr)
    },
    toggleLightMode: function (event) {
      useStore().toggleLightMode(event)
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

      for (let i = 0; i < this.invoice.items.length; i++) {
        if (this.invoice.items[i].name.value === '') {
          this.invoice.items[i].name.hasError = true
          hasErrors = true
        } else {
          this.invoice.items[i].name.hasError = false
        }
      }

      if (hasErrors) {
        this.hasErrors = hasErrors
        this.$refs.newInvoiceModal.scrollTo(0,0)
        return false
      } else {
        return true
      }
    },
    submitNewInvoice: function () {
      // this.validateNewInvoice()
      if (this.validateNewInvoice()) {

        console.log(this.invoice.items)
        console.log('pppp')

        this.invoice.items  = this.invoice.items.map(x => {
          return {
            "name": x.name.value,
            "quantity": x.quantity.value,
            "price": x.price.value,
            "total": x.quantity.value * Number(x.price.value)
          }
        })


        console.log('pppp')
        console.log(this.invoice.items)


        let sum = 0

        for (let i = 0; i < this.invoice.items.length; i++) {
          sum += this.invoice.items[i].total
        }

        this.store.submitNewInvoice(
          {
            "createdAt": this.invoice.createdAt,
            "paymentDue": this.invoice.paymentDue,
            "description": this.invoice.description.value,
            "paymentTerms": this.invoice.paymentTerms,
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
            "total": sum
          }
        )

        this.manualToggle()
        this.clearInvoiceForm()
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

      this.clearInvoiceForm()
    },
    clearInvoiceForm: function () {
      this.hasErrors = false

      this.invoice = {
        "createdAt": "",
        "paymentDue": "",
        "description": {
          value: "",
          hasError: false,
        },
        "paymentTerms": 1,
        "clientName": {
          value: "",
          hasError: false,
        },
        "clientEmail": {
          value: "",
          hasError: false,
        },
        "status": "draft",
        "senderAddress": {
          "street": {
            value: "",
            hasError: false,
          },
          "city": {
            value: "",
            hasError: false,
          },
          "postCode": {
            value: "",
            hasError: false,
          },
          "country": {
            value: "",
            hasError: false,
          }
        },
        "clientAddress": {
          "street": {
            value: "",
            hasError: false,
          },
          "city": {
            value: "",
            hasError: false,
          },
          "postCode": {
            value: "",
            hasError: false,
          },
          "country": {
            value: "",
            hasError: false,
          }
        },
        "items": [
          {
            "name": {
              value: "",
              hasError: false,
            },
            "quantity":  {
              value: 1,
              hasError: false,
            },
            "price":  {
              value: 99,
              hasError: false,
            },
            "total":  {
              value: "0",
              hasError: false,
            }
          }
        ],
        "total": 0
      }
    },
    addNewInvoiceItem: function () {
      this.invoice.items.push(
        {
          "name": {
            value: "",
            hasError: false,
          },
          "quantity":  {
            value: 1,
            hasError: false,
          },
          "price":  {
            value: 99,
            hasError: false,
          },
          "total":  {
            value: 1,
            hasError: false,
          }
        }
      )
    },
    removeInvoiceItem: function (index) {
      if (this.invoice.items.length !== 1) {
        this.invoice.items.splice(index, 1)
      }
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
.transform-special {
  /* transform: none!important; */
}

.noClick {
   pointer-events: none;
}

.offcanvas-start-custom {
  border: none!important;
  top: 0;
  left: 0;
  width: 400px;
  transform: translateX(-100%);
}

</style>
