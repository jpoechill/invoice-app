<template>
  <div>
    <div class="offcanvas offcanvas-start" style="padding-left: 90px; width: 600px;" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div>
          Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
        </div>
      </div>
    </div>

    <div class="fixed-top h-100 bg-dark-blue text-white d-flex flex-column align-items-start" style="width: 90px; z-index: 9999;">
      <div class="mb-auto text-center mx-auto py-3">
        [[ logo ]]
        <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
          x
        </a>
      </div>
      <div class="w-100 mx-auto text-center py-3">
        [[ moon ]]
        <hr class="">
        footer
      </div>
    </div>


    <div class="container mt-5">
      <div class="row"> 
        <div class="offset-md-2 col-md-3">
          <h1>Invoices</h1>
          There are {{ store.invoices.length }} total invoices
        </div>
        <div class="col-md-5 ps-0 text-end">
          <button class="btn btn-primary d-inline small-11 me-3">Filter by status x</button>
          <button class="btn btn-primary d-inline small-11">+ New Invoice</button>
        </div>
      </div>
    </div>

    <div class="container mt-5">
      <div class="row">
        <div v-for="(invoice, index) in store.invoices" :key="index" class="offset-md-2 col-md-8 bg-white rounded px-4 py-3 mb-3 shadow">
          
          <nuxt-link :to="'/invoice/' + invoice.id">
            <div class="container p-0">
              <div class="row small-11">
                <div class="col-md-2 fw-bold">
                  # {{ invoice.id }}
                </div>
                <div class="col-md-3 fw-light">
                  {{ invoice.paymentDue }}
                </div>
                <div class="col-md-3 fw-light">
                  {{ invoice.clientName }}
                </div>
                <div class="col-md-1 small-12 fw-bold">
                  £{{ invoice.total }}
                </div>
                <div class="col-md-3 text-end">
                  {{ invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) }} >
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
import { useStore } from '~~/stores/store'

export default defineComponent({
  setup() {
    
  },
  data() {
    return {
      store: useStore(),
    }
  }
})
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

.small-11 {
  font-size: 11px;
}

.small-12 {
  font-size: 12px;
}

.shadow {
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.02)!important;
}
</style>