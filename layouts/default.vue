<template>
  <div>
    <!-- New Invoice Modal -->
    <div class="offcanvas offcanvas-start" :class="[lightMode ? '' : 'bg-dark']" style="padding-left: 90px; width: 750px;" tabindex="-1" id="offcanvasNewInvoice" aria-labelledby="offcanvasNewInvoiceLabel">
      <div class="container p-5 offcanvas-body">
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
          <div class="col-md-12" :class="[lightMode ? '' : 'text-light-light-purple']">
            Street Address <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" value="" type="text">
          </div>
        </div>
        <div class="row small-12 text-light-purple">
          <div class="col-md-4" :class="[lightMode ? '' : 'text-light-light-purple']">
            City <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" value="">
          </div>
          <div class="col-md-4" :class="[lightMode ? '' : 'text-light-light-purple']">
            Post Code <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" value="">
          </div>
          <div class="col-md-4" :class="[lightMode ? '' : 'text-light-light-purple']">
            Country <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" value="">
          </div>
        </div>

        <div class="row mt-4 small-12 text-light-purple">
          <div class="col-md-12 mb-3 fw-medium text-purple">
            Bill To
          </div>
          <div class="col-md-12 mt-2" :class="[lightMode ? '' : 'text-light-light-purple']">
            Client's Name <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" value="" type="text">
          </div>
          <div class="col-md-12 mt-2" :class="[lightMode ? '' : 'text-light-light-purple']">
            Client's Email <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" value="" type="text">
          </div>
          <div class="col-md-12 mt-2" :class="[lightMode ? '' : 'text-light-light-purple']">
            Street Address <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" value="" type="text">
          </div>
        </div>
        <div class="row small-12 text-light-purple">
          <div class="col-md-4 mt-2" :class="[lightMode ? '' : 'text-light-light-purple']">
            City <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" value="">
          </div>
          <div class="col-md-4 mt-2" :class="[lightMode ? '' : 'text-light-light-purple']">
            Post Code <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" value="">
          </div>
          <div class="col-md-4 mt-2" :class="[lightMode ? '' : 'text-light-light-purple']">
            Country <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" value="">
          </div>
        </div>
        <div class="row mt-4 small-12 text-light-purple">
          <div class="col-md-6" :class="[lightMode ? '' : 'text-light-light-purple']">
            Invoice Date <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" value="">
          </div>
          <div class="col-md-6" :class="[lightMode ? '' : 'text-light-light-purple']">
            Payment Terms <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" value="">
          </div>
          <div class="col-md-12 mt-2" :class="[lightMode ? '' : 'text-light-light-purple']">
            Project Description
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" value="">
          </div>
        </div>
        <div class="row small-12 text-light-purple">
          <div class="col-md-12 mt-4 mb-3 fw-medium small-18" :class="[lightMode ? '' : 'text-light-light-purple']">
            Item List
          </div>
          <div class="col-md-5" :class="[lightMode ? '' : 'text-light-light-purple']">
            Item Name
          </div>
          <div class="col-md-1-5" :class="[lightMode ? '' : 'text-light-light-purple']">
            Qty.
          </div>
          <div class="col-md-3" :class="[lightMode ? '' : 'text-light-light-purple']">
            Price
          </div>
          <div class="col-md-2-5" :class="[lightMode ? '' : 'text-light-light-purple']">
            Total
          </div>
        </div>
        <div class="row d-flex align-items-center">
          <div class="col-md-5">
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" value="Email Design">
          </div>
          <div class="col-md-1-5">
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" value="1">
          </div>
          <div class="col-md-3">
            <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" value="156.00">
          </div>
          <div class="col-md-2-5 text-light small-12 fw-medium" :class="[lightMode ? '' : 'text-light-light-purple']">
            115.00 
            <img class="float-end" src="/icon-delete.svg" alt="Delete">
          </div>
          <!-- <div class="col-md-1"> -->
          <!-- </div> -->
        </div>
        <div class="row">
          <div class="col-md-12">
            <button class="btn btn-round small-12 w-100 p-3 my-3 px-4 fw-medium me-2" :class="[lightMode ? 'bg-light text-dark' : 'bg-light-light-purple text-light-light-purple']" >
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
              <button class="btn btn-round small-12 p-3 px-4 fw-medium me-2" :class="[lightMode ? 'bg-light text-dark' : 'bg-light-light-purple text-light-light-purple']" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNewInvoice">
                Save as Draft
              </button>
              <button class="btn bg-purple text-white btn-round small-12 p-3 px-4 fw-medium" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNewInvoice">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Invoice-List Body -->
    <div class="fixed-top h-100 bg-dark-blue text-white d-flex flex-column align-items-start rounded-bottom-right rounded-top-right " style="width: 90px; z-index: 9999;">
      <div class="mb-auto position-relative bg-purple d-flex align-items-center overflow-hidden w-100 vertical-align-middle rounded-top-right rounded-bottom-right" style="height: 90px; width: 90px;">
        <nuxt-link to="/" class="mx-auto" style="z-index: 9999;">
          <img src="/logo.svg" alt="Logo">
        </nuxt-link>
        <div class="position-absolute top-50 w-100 rounded-top-left bg-light-purple h-100"></div>
      </div>
      <div class="w-100 mx-auto text-center py-3">
        <img @click="toggleLightMode()" :src="lightMode ? '/icon-moon.svg' : '/icon-sun.svg'" alt="Toggle Light/Dark Mode" role="button">
        <hr class="">
        <img src="/image-avatar.jpg" class="rounded-full" alt="Image Avatar">
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
    return {}
  },
  methods: {
    alert: function (msg) {
      alert(msg)
    },
    toggleLightMode: function () {
      useStore().toggleLightMode()
      // this.lightMode = useStore().lightMode
      // console.log('from store: ' + useStore().lightMode)
    }
  },
  watch: {
  // whenever active changes, this function will run
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
