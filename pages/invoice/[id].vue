<template>
  <div>
    <!-- Edit Modal -->
    <div class="offcanvas offcanvas-start" style="padding-left: 90px; width: 750px;" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="container bg-white p-5 offcanvas-body">
        <div class="row">
          <div class="col-md-12">
            <div class="small-24">
              <span class="fw-medium">Edit</span> #<span class="fw-medium">{{ invoice.id }}</span>
            </div>
          </div>
        </div>

        <div class="row mt-4 small-12 text-light-purple">
          <div class="col-md-12 mb-3 fw-medium text-purple">
            Bill From
          </div>
          <div class="col-md-12">
            Street Address <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :value="invoice.senderAddress.street" type="text">
          </div>
        </div>
        <div class="row small-12 text-light-purple">
          <div class="col-md-4">
            City <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" type="text"  :value="invoice.senderAddress.city">
          </div>
          <div class="col-md-4">
            Post Code <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text"  :value="invoice.senderAddress.postCode">
          </div>
          <div class="col-md-4">
            Country <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text"  :value="invoice.senderAddress.country">
          </div>
        </div>

        <div class="row mt-4 small-12 text-light-purple">
          <div class="col-md-12 mb-3 fw-medium text-purple">
            Bill To
          </div>
          <div class="col-md-12 mt-2">
            Client's Name <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :value="invoice.clientName" type="text">
          </div>
          <div class="col-md-12 mt-2">
            Client's Email <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :value="invoice.clientEmail"  type="text">
          </div>
          <div class="col-md-12 mt-2">
            Street Address <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" :value="invoice.clientAddress.street"  type="text">
          </div>
        </div>
        <div class="row small-12 text-light-purple">
          <div class="col-md-4 mt-2">
            City <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" type="text" :value="invoice.clientAddress.city" >
          </div>
          <div class="col-md-4 mt-2">
            Post Code <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" :value="invoice.clientAddress.postCode">
          </div>
          <div class="col-md-4 mt-2">
            Country <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" :value="invoice.clientAddress.country" >
          </div>
        </div>
        <div class="row mt-4 small-12 text-light-purple">
          <div class="col-md-6">
            Invoice Date <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" type="text" value="London">
          </div>
          <div class="col-md-6">
            Payment Terms <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" :value="invoice.paymentTerms">
          </div>
          <div class="col-md-12 mt-2">
            Project Description
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" :value="invoice.description" >
          </div>
        </div>
        <div class="row small-12 text-light-purple">
          <div class="col-md-12 mt-4 mb-3 fw-medium small-18">
            Item List
          </div>
          <div class="col-md-5">
            Item Name
          </div>
          <div class="col-md-1-5">
            Qty.
          </div>
          <div class="col-md-3">
            Price
          </div>
          <div class="col-md-2-5">
            Total
          </div>
        </div>
        <div v-for="(item, index) in invoice.items" :key="index" class="row d-flex align-items-center mb-2">
          <div class="col-md-5">
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" :value="item.name" placeholder="Web development">
          </div>
          <div class="col-md-1-5">
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" :value="item.quantity">
          </div>
          <div class="col-md-3">
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" :value="item.price" placeholder="99.99">
          </div>
          <div class="col-md-2-5 text-light small-12 fw-medium">
            {{ item.quantity * item.price }}
            <img class="float-end" @click="removeInvoiceItem(index)" role="button" src="/icon-delete.svg" alt="Delete">
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <button @click="addNewInvoiceItem()" class="btn bg-light text-light text-dark btn-round small-12 w-100 p-3 my-3 px-4 fw-medium me-2">
              + Add New Item
            </button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <div class="float-end">
              <button class="btn bg-light text-light text-dark btn-round small-12 p-3 px-4 fw-medium me-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
                Cancel
              </button>
              <button class="btn bg-purple text-white btn-round small-12 p-3 px-4 fw-medium">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Deletion Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
      <div class="modal-dialog d-flex align-items-center h-100 pb-5 p-2">
        <div class="modal-content rounded p-3">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-medium small-24" id="exampleModalLabel">
              Confirm Deletion
            </h5>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
          </div>
          <div class="modal-body text-light small-12">
            Are you sure you want to delete invoice #XM9141? This action cannot be undone.
          </div>
          <div class="modal-footer border-0">
            <button class="btn bg-light text-light text-dark btn-round small-12 p-3 px-4 fw-medium me-2" data-bs-toggle="modal" data-bs-target="#deleteModal" type="button"  data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn bg-red text-white btn-round small-12 p-3 px-4 fw-medium me-2">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Temp Modal, Might Delete -->
    <div class="modal fade" id="markPaidModal" tabindex="-1" aria-labelledby="markPaidModal" aria-hidden="true">
      <div class="modal-dialog d-flex align-items-center h-100 pb-5 p-2">
        <div class="modal-content p-3">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-5 small-11">
      <div class="row"> 
        <div class="offset-md-2 col-md-8 fw-medium">
          <nuxt-link to="/">
            <img src="/icon-arrow-left.svg" alt="Go Back Arrow" class="me-3">
            Go back
          </nuxt-link>
           <!-- {{ invoice }} -->
        </div>
        <div class="offset-md-2 col-md-8 bg-white mt-4 p-4 d-flex align-items-center justify-content-between rounded shadow">
          <div class="d-inline small-12 text-light">
            Status
            <div class="d-inline text-orange bg-orange small-12 fw-medium p-2 p-3 ms-3 rounded">
              • Pending
            </div>
          </div>
          <div class="d-inline float-end">
            <button class="btn bg-light text-light text-dark btn-round small-12 p-3 px-4 fw-medium me-2" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
              Edit
            </button>
            <button data-bs-toggle="modal" data-bs-target="#deleteModal" class="btn bg-red text-white btn-round small-12 p-3 px-4 fw-medium me-2">
              Delete
            </button>
            <button @click="alert('Mark invoice as Paid')" class="btn bg-purple text-white btn-round small-12 p-3 px-4 fw-medium">
              Mark as Paid
            </button>
          </div>
        </div>
        <div class="offset-md-2 col-md-8 bg-white text-light mt-3 p-3 py-5 mb-5 rounded shadow">
          
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <span class="fw-medium mb-2 small-15">
                  {{ '#' + invoice.id }}
                </span> <br>
                {{ invoice.description }}
              </div>
              <div class="col-md-6 text-end line-height">
                {{ invoice.senderAddress.street }} <br>
                {{ invoice.senderAddress.city }}  <br>
                {{ invoice.senderAddress.postCode }}  <br>
                {{ invoice.senderAddress.country }} 
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-md-3">
                Invoice Date <br>
                <span class="d-block text-dark fw-medium mt-2 mb-3 small-15">
                  {{ convertDate(invoice.createdAt) }}
                </span> <br>

                Payment Due <br>
                <span class="d-block text-dark fw-medium mt-2 small-15">
                  {{ convertDate(invoice.paymentDue) }}
                </span>
              </div>
              <div class="col-md-4">
                Bill To <br>

                <span class="d-block text-dark fw-medium mt-2 small-15"> 
                  {{ invoice.clientName }}
                </span> 
                <span class="d-block mt-2 line-height">
                  {{ invoice.clientAddress.street }} <br>
                  {{ invoice.clientAddress.city }}  <br>
                  {{ invoice.clientAddress.postCode }}  <br>
                  {{ invoice.clientAddress.country }} 
                </span>
              </div>
              <div class="col-md-5">
                Sent To <br>
                <span class="d-block text-dark fw-medium mt-2 small-15"> 
                  {{ invoice.clientEmail }}
                </span> 
              </div>
            </div>
          </div>

          <div class="bg-light mx-4 rounded-top">
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

              <div v-for="(item, index) in invoice.items" :key="index" class="row small-12 mt-3">
                <div class="col-md-6 text-dark fw-medium">
                  {{ item.name }}
                </div>
                <div class="col-md-2">
                  {{ item.quantity }}
                </div>
                <div class="col-md-2 fw-medium text-end">
                  {{ '£ ' + item.price }}
                </div>
                <div class="col-md-2 text-dark fw-medium text-end">
                  {{ '£ ' + item.total }}
                </div>
              </div>

            </div>
          </div>

          <div class="bg-dark-blue text-white mx-4 rounded-bottom">
            <div class="container py-4 px-4">
              <div class="row">
                <div class="col-md-6">
                  Amount Due
                </div>
                <div class="col-md-6 text-end">
                  <span class="small-24 fw-medium mb-0">
                  {{ '£ ' + invoice.total }}
                  </span>
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
import { useStore } from '~/stores/store'

export default defineComponent({
  setup() {
    
  },
  data() {
    return {
      invoice: 
        {
          "id": "",
          "createdAt": "",
          "paymentDue": "",
          "description": "",
          "paymentTerms": 1,
          "clientName": "",
          "clientEmail": "",
          "status": "",
          "senderAddress": {
            "street": "",
            "city": "",
            "postCode": "",
            "country": ""
          },
          "clientAddress": {
            "street": "",
            "city": "",
            "postCode": "",
            "country": ""
          },
          "items": [
            {
              "name": "",
              "quantity": 1,
              "price": 0,
              "total": 0
            }
          ],
          "total": 0
        },
      store: null,
    }
  },
  async mounted() {
    try {
      let id = this.$route.params.id

      this.invoice = useStore().invoices.find(x => x.id === id)

      window.scrollTo(0, 0)

      if (!this.invoice || !id) {
        console.log('no go')
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    alert: function (msg) {
      alert(msg)
    },
    addNewInvoiceItem: function () {
      this.invoice.items.push(
        {
          "name": "",
          "quantity": 1,
          "price": "",
          "total": ""
        })
    },
    removeInvoiceItem: function (index) {
      this.invoice.items.splice(index, 1)
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
.bg-dark-blue {
  background-color: #373B53;
}

.bg-light {
  background-color: #F9FAFE!important;
}

.bg-purple {
  background-color: #7C5DFA;
}

.bg-light-purple {
  background-color: #9277FF!important;
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