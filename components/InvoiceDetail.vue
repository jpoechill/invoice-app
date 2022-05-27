<template>
  <div>
    <!-- Mobile Fixed Nav -->
    <div class="fixed-bottom py-0 px-4 d-lg-none" :class="[lightMode ? 'bg-white' : 'bg-dark-purple']" >
      <div class="container">
        <div class="d-inline py-0 row">
          <div class="col-12 py-0 d-flex justify-content-between">
            <button class="btn btn-round small-15 p-3 px-4 fw-medium me-2" :class="[lightMode ? 'text-light bg-light' : 'text-white bg-light-light-purple']" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
              Edit
            </button>
            <button data-bs-toggle="modal" data-bs-target="#deleteModal" class="btn bg-red text-white btn-round small-15 p-3 px-4 fw-medium me-2">
              Delete
            </button>
            <button v-if="invoice.status === 'pending'" @click="markInvoicePaid()" class="btn bg-purple text-white btn-round small-15 p-3 px-4 fw-medium">
              Mark as Paid
            </button>
            <button v-if="invoice.status === 'draft'" @click="markInvoicePending()" class="btn bg-purple text-white btn-round small-15 p-3 px-4 fw-medium">
              Mark as Pending
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Edit Modal -->
    <div class="offcanvas offcanvas-start-custom" style="width: 750px;" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="container p-special ps-0 p-5 mt-5 mt-lg-0 offcanvas-body smooth-scroll" ref="editModal" :class="[lightMode ? 'bg-white' : 'bg-dark']" >
        <div class="row">
          <div class="col-md-12">
            <div class="small-24" :class="[lightMode ? '' : 'text-light-light-purple']">
              <span class="fw-medium" :class="[lightMode ? '' : 'text-white']">Edit</span> #<span class="fw-medium" :class="[lightMode ? '' : 'text-white']">{{ invoice.id }}</span>
            </div>
          </div>
        </div>

        <div class="row mt-4 small-12 text-light-purple">
          <div class="col-md-12 mb-3 fw-medium text-purple">
            Bill From
          </div>
          <div class="col-md-12" :class="[lightMode ? '' : 'text-light-light-purple', invoiceValidation.senderAddress.street.hasError ? 'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Street Address</span>
              <span v-if="invoiceValidation.senderAddress.street.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-4 mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', invoiceValidation.senderAddress.street.hasError ? 'has-error' : '']" v-model="invoiceValidation.senderAddress.street.value" type="text">
          </div>
        </div>
        <div class="row small-12 text-light-purple">
          <div class="col-md-4" :class="[lightMode ? '' : 'text-light-light-purple', invoiceValidation.senderAddress.city.hasError ? 'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>City</span>
              <span v-if="invoiceValidation.senderAddress.city.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-4 mt-2 small-12 fw-medium p-3"  :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text"  v-model="invoiceValidation.senderAddress.city.value">
          </div>
          <div class="col-md-4" :class="[lightMode ? '' : 'text-light-light-purple', invoiceValidation.senderAddress.postCode.hasError ? 'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Post Code</span>
              <span v-if="invoiceValidation.senderAddress.postCode.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-4 mt-2 small-12 fw-medium p-3"  :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" v-model="invoiceValidation.senderAddress.postCode.value">
          </div>
          <div class="col-md-4" :class="[lightMode ? '' : 'text-light-light-purple', invoiceValidation.senderAddress.country.hasError ? 'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Country</span>
              <span v-if="invoiceValidation.senderAddress.country.hasError">Can't be empty</span>
            </div>
            <input class="form-control mt-2 small-12 fw-medium p-3"  :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" v-model="invoiceValidation.senderAddress.country.value">
          </div>
        </div>

        <div class="row mt-4 small-12 text-light-purple">
          <div class="col-md-12 mb-3 fw-medium text-purple">
            Bill To
          </div>
          <div class="col-md-12 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoiceValidation.clientName.hasError ? 'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Client's Name </span>
              <span v-if="invoiceValidation.clientName.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3"  :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" v-model="invoiceValidation.clientName.value" type="text">
          </div>
          <div class="col-md-12 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoiceValidation.clientEmail.hasError ? 'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Client's Email</span>
              <span v-if="invoiceValidation.clientEmail.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3"  :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" v-model="invoiceValidation.clientEmail.value"  type="text">
          </div>
          <div class="col-md-12 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoiceValidation.clientAddress.street.hasError ? 'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Street Address</span>
              <span v-if="invoiceValidation.clientAddress.street.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3"  :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" v-model="invoiceValidation.clientAddress.street.value"  type="text">
          </div>
        </div>
        <div class="row small-12 text-light-purple">
          <div class="col-md-4 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoiceValidation.clientAddress.city.hasError ? 'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>City</span>
              <span v-if="invoiceValidation.clientAddress.city.hasError">Can't be empty</span>
            </div>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" type="text"  :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" v-model="invoiceValidation.clientAddress.city.value" >
          </div>
          <div class="col-md-4 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoiceValidation.clientAddress.postCode.hasError ? 'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Post Code</span>
              <span v-if="invoiceValidation.clientAddress.postCode.hasError">Can't be empty</span>
            </div>
            <input class="form-control mt-2 small-12 fw-medium mb-3 p-3" type="text"  :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" v-model="invoiceValidation.clientAddress.postCode.value">
          </div>
          <div class="col-md-4 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoiceValidation.clientAddress.country.hasError ? 'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Country</span>
              <span v-if="invoiceValidation.clientAddress.country.hasError">Can't be empty</span>
            </div>
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text"  :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" v-model="invoiceValidation.clientAddress.country.value" >
          </div>
        </div>
        <!-- Invoice Date Dropdown -->
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
                    <button class="form-control p-3 fw-medium small-12 w-100" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="float-start">
                        {{ selectedDate.full }}
                      </span>
                      <img src="/icon-calendar.svg" class="ms-2 float-end" alt="Filter by status">
                    </button>
                    <div class="dropdown-menu small-12 p-2 pt-3 pb-2 mt-2 px-0 w-100" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" aria-labelledby="dropdownMenuButton">
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
                              <div v-for="(day, dayIndex) in days" :key="dayIndex">
                                <div v-if="day === ' '">
                                  <button class="border-0 p-0 m-0 noClick" style="width: 2em"></button>
                                </div>
                                <button v-else @click="selectDay(day)" class="p-0 small-12 fw-bold btn text-end" :class="[lightMode ? '' : 'text-white']" style="width: 2em">
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
          </div>
          <div class="col-md-6" :class="[lightMode ? '' : 'text-light-light-purple', invoiceValidation.paymentDue.hasError ? 'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Payment Terms</span>
            </div>
            <div class="w-100 d-flex align-items-center justify-content-end ps-0 mb-3">
              <div class="float-end w-100">
                <div class="btn-group pt-2 w-100 ps-0">
                  <div class="dropdown d-inline w-100">
                    <button class="form-control p-3 fw-medium small-12 w-100"  :class="[lightMode ? '' : 'text-white bg-dark-dark-purple border-0']" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="float-start"> {{ activePaymentTerm.name }} </span>
                      <img src="/icon-arrow-down.svg" class="pt-1 ms-2 float-end" alt="Filter by status">
                    </button>
                    <div class="dropdown-menu small-12 p-2 pt-1 pb-0 mt-2 px-0 w-100" :class="[lightMode ? '' : 'text-white bg-dark-dark-purple']" aria-labelledby="dropdownMenuButton" role="button">
                      <div v-for="(term, index) in paymentTerms" :key="index" class="dropdown-item fw-medium py-0" :class="[lightMode ? '' : 'text-white', index !== paymentTerms.length - 1 && lightMode ? 'border-bottom' : '', index !== paymentTerms.length - 1 && !lightMode ? 'border-bottom-dark' : '']">
                        <div @click="handlePaymentClick(term.value)" class="d-block form-check ps-0">
                          <label class="form-check-label py-3" :class="[term.isActive === true ? 'text-purple' : '']" role="button" for="sortPaidCheckbox">
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
          <div class="col-md-12 mt-2" :class="[lightMode ? '' : 'text-light-light-purple', invoiceValidation.description.hasError ? 'text-error' : '']">
            <div class="w-100 d-flex justify-content-between">
              <span>Project Description</span>
              <span v-if="invoiceValidation.description.hasError">Can't be empty</span>
            </div>
            <input class="form-control mt-2 small-12 fw-medium p-3"  :class="[lightMode ? '' : 'text-white bg-dark-purple border-0']" type="text" v-model="invoiceValidation.description.value" >
          </div>
        </div>

        <!-- Mobile Item List -->
        <div class="d-lg-none">
          <div class="row small-12 text-light-purple">
            <div class="col-md-12 mt-4 mb-3 fw-medium small-18" :class="[lightMode ? '' : 'text-light-light-purple']">
              Item List
            </div>
          </div>
          <div v-for="(item, index) in invoiceValidation.items" :key="index" class="row d-flex align-items-center mb-3">
            <div class="col-md-5 small-12 text-light-purple" :class="[lightMode ? '' : 'text-light-light-purple']">
              Item Name
            </div>
            <div class="col-md-12">
              <input class="form-control mt-2 mb-4 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', item.name.hasError ? 'has-error' : '']" type="text" v-model="item.name.value" placeholder="">
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
            {{ item }}
            <div class="col-3 small-12 text-light-purple" :class="[lightMode ? '' : 'text-light-light-purple']">
              <input class="form-control mt-2 mb-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', item.quantity.hasError ? 'has-error' : '']" type="number" v-model="item.quantity.value" placeholder="">
            </div>
            <div class="col-4 small-12 text-light-purple" :class="[lightMode ? '' : 'text-light-light-purple']">
              <input class="form-control mt-2 mb-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', item.price.hasError ? 'has-error' : '']" type="number" v-model="item.price.value" placeholder="">
            </div>
            <div class="col-5 pb-3 small-12 fw-bold text-light-purple" :class="[lightMode ? '' : 'text-light-light-purple']">
              {{ '£ ' + formatTotal((item.quantity.value * item.price.value)) }} <img class="float-end" @click="removeInvoiceItem(index)" role="button" src="/icon-delete.svg" alt="Delete">
            </div>
          </div>
        </div>

        <!-- Desktop Item List -->
        <div class="d-none d-lg-block">
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
          <div v-for="(item, index) in invoiceValidation.items" :key="index" class="row d-flex align-items-center mb-2">
            <div class="col-md-4">
              <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', item.name.hasError ? 'has-error' : '']" type="text" min="0" v-model="item.name.value" placeholder="">
            </div>
            <div class="col-md-2">
              <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', item.quantity.hasError ? 'has-error' : '']" type="number" min="0" v-model="item.quantity.value">
            </div>
            <div class="col-md-3">
              <input class="form-control mt-2 small-12 fw-medium p-3" :class="[lightMode ? '' : 'text-white bg-dark-purple border-0', item.price.hasError ? 'has-error' : '']" type="number" min="0" v-model="item.price.value" placeholder="">
            </div>
            <div class="col-md-3 text-light small-12 fw-medium">
              {{ '£ ' + formatTotal((item.quantity.value * item.price.value)) }}
              <img class="float-end" @click="removeInvoiceItem(index)" role="button" src="/icon-delete.svg" alt="Delete">
            </div>
          </div>
        </div>
        
        <div class="row mb-0">
          <div class="col-md-12 mt-3">
            <button @click="addNewInvoiceItem()" class="btn btn-round small-12 w-100 p-3 mt-2 pb-3 px-4 mb-2 fw-medium me-2" :class="[lightMode ? 'bg-light text-dark' : 'bg-light-light-purple text-light-light-purple']">
              + Add New Item
            </button>
          </div>
        </div>
        <div class="row mt-4 pb-3" v-if="hasErrors">
          <div class="col-md-12 small-12 text-error">
            • All fields must be added
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <div class="float-end">
              <button @click="manualToggle()" class="btn btn-round small-12 p-3 px-4 fw-medium me-2" ref="oogabooga" :class="[lightMode ? 'bg-light text-dark' : 'bg-light-light-purple text-light-light-purple']" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
                Cancel
              </button>
              <button @click="updateInvoice()" class="btn bg-purple text-white btn-round small-12 p-3 px-4 fw-medium">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Edit Modal -->

    <!-- Confirm Deletion Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
      <div class="modal-dialog d-flex align-items-center h-100 pb-5 p-2">
        <div class="modal-content rounded p-3" :class="[lightMode ? '' : 'text-white bg-dark']">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-medium small-24" id="exampleModalLabel">
              Confirm Deletion
            </h5>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
          </div>
          <div class="modal-body text-light small-12">
            Are you sure you want to delete invoice #{{ invoice.id }}? This action cannot be undone.
          </div>
          <div class="modal-footer border-0">
            <button class="btn text-light text-dark btn-round small-12 p-3 px-4 fw-medium me-2"  :class="[lightMode ? 'bg-light ' : 'bg-light-light-purple text-light-light-purple']" data-bs-toggle="modal" data-bs-target="#deleteModal" type="button"  data-bs-dismiss="modal">Cancel</button>
            <button @click="deleteInvoice(invoice.id)" type="button" class="btn bg-red text-white btn-round small-12 p-3 px-4 fw-medium me-2" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container pt-5 pb-4 px-3 px-md-0 small-11">
      <div class="row px-4 px-md-0 pt-5 mt-3 pt-lg-4 mt-lg-0 pb-5 mb-3 mb-lg-0 pb-lg-0"> 
        <div class="offset-lg-2 col-lg-8 col-12 fw-medium">
          <nuxt-Link to="/" class="p-2" :class="[lightMode ? 'text-dark' : 'text-white']">
            <img src="/icon-arrow-left.svg" alt="Go Back Arrow" class="me-3">
            Go back
          </nuxt-Link>
        </div>
        <div class="offset-lg-2 col-lg-8 col-12 mt-4 p-4 d-flex align-items-center justify-content-between rounded shadow"  :class="[lightMode ? 'bg-white' : 'bg-dark-purple']" >
          
          <!--  Mobile Layout -->
          <div class="d-inline-flex justify-content-between align-items-center w-100 small-12 text-light px-3 d-lg-none">
            Status
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

          <!-- Desktop Layout -->
          <div class="d-inline small-12 text-light d-none d-lg-block">
            Status
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
                <circle cx="4" cy="4" r="4" :fill="lightMode ? '#111' : '#FFF'" />
              </svg>
              {{ invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) }}
            </div>
          </div>
          <div class="d-inline float-end d-none d-lg-block">
            <button class="btn bg-light btn-round small-12 p-3 px-4 fw-medium me-2" :class="[lightMode ? 'bg-light text-dark' : 'bg-light-light-purple text-light-light-purple']" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
              Edit
            </button>
            <button data-bs-toggle="modal" data-bs-target="#deleteModal" class="btn bg-red text-white btn-round small-12 p-3 px-4 fw-medium me-2">
              Delete
            </button>
            <button v-if="invoice.status === 'pending'" @click="markInvoicePaid()" class="btn bg-purple text-white btn-round small-12 p-3 px-4 fw-medium">
              Mark as Paid
            </button>
            <button v-if="invoice.status === 'draft'" @click="markInvoicePending()" class="btn bg-purple text-white btn-round small-12 p-3 px-4 fw-medium">
              Mark as Pending
            </button>
          </div>
        </div>

        <div class="offset-lg-2 col-lg-8 col-12 mt-3 p-3 py-5 mb-5 rounded shadow" :class="[lightMode ? 'bg-white text-light' : 'bg-dark-purple text-light-light-purple']">
          <!-- Mobile Layout -->
          <div class="container d-lg-none">
            <div class="row">
              <div class="col small-15">
                <span class="fw-medium mb-2">#</span> 
                <span class="fw-medium mb-2" :class="[lightMode ? 'text-dark' : 'text-white']">
                  {{ invoice.id }}
                </span><br>
                {{ invoice.description }}
              </div>
              <div class="col-12 pt-4  small-12 line-height">
                {{ invoice.senderAddress.street }} <br>
                {{ invoice.senderAddress.city }}  <br>
                {{ invoice.senderAddress.postCode }}  <br>
                {{ invoice.senderAddress.country }} 
              </div>
            </div>
            <div class="row mt-4">
              <div class="col small-12">
                Invoice Date <br>
                <span class="d-block fw-medium mt-2 mb-3 small-15" :class="[lightMode ? 'text-dark' : 'text-white']">
                  {{ convertDate(invoice.createdAt) }}
                </span> <br>

                Payment Due <br>
                <span class="d-block fw-medium mt-2 small-15" :class="[lightMode ? 'text-dark' : 'text-white']">
                  {{ convertDate(invoice.paymentDue) }}
                </span>
              </div>
              <div class="col">
                Bill To <br>
                <span class="d-block fw-medium mt-2 small-15" :class="[lightMode ? 'text-dark' : 'text-white']"> 
                  {{ invoice.clientName }}
                </span> 
                <span class="d-block mt-2 line-height">
                  {{ invoice.clientAddress.street }} <br>
                  {{ invoice.clientAddress.city }}  <br>
                  {{ invoice.clientAddress.postCode }}  <br>
                  {{ invoice.clientAddress.country }} 
                </span>
              </div>
              <div class="col-12 pt-4 small-12">
                Sent To <br>
                <span class="d-block fw-medium mt-2 small-15" :class="[lightMode ? 'text-dark' : 'text-white']"> 
                  {{ invoice.clientEmail }}
                </span> 
              </div>
            </div>
          </div>

          <!-- Desktop Layout -->
          <div class="container d-none d-lg-block">
            <div class="row">
              <div class="col-md-6">
                <span class="fw-medium mb-2 small-15">#</span> 
                <span class="fw-medium mb-2 small-15" :class="[lightMode ? 'text-dark' : 'text-white']">
                  {{ invoice.id }}
                </span><br>
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
                <span class="d-block fw-medium mt-2 mb-3 small-15" :class="[lightMode ? 'text-dark' : 'text-white']">
                  {{ convertDate(invoice.createdAt) }}
                </span> <br>

                Payment Due <br>
                <span class="d-block fw-medium mt-2 small-15" :class="[lightMode ? 'text-dark' : 'text-white']">
                  {{ convertDate(invoice.paymentDue) }}
                </span>
              </div>
              <div class="col-md-4">
                Bill To <br>
                <span class="d-block fw-medium mt-2 small-15" :class="[lightMode ? 'text-dark' : 'text-white']"> 
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
                <span class="d-block fw-medium mt-2 small-15" :class="[lightMode ? 'text-dark' : 'text-white']"> 
                  {{ invoice.clientEmail }}
                </span> 
              </div>
            </div>
          </div>

          <div class="mx-4 rounded-top" :class="[lightMode ? 'bg-light' : 'bg-light-light-purple']">
            
            <!-- Mobile List -->
            <div class="container pt-4 pb-3 px-4 mt-5 d-lg-none">
              <div v-for="(item, index) in invoice.items" :key="index" class="w-100 small-12 pb-4 mt-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="fw-bold small-15" :class="[lightMode ? 'text-dark' : 'text-white']">
                    {{ item.name }}
                    <div class="pt-2 fw-medium text-light">
                    {{ item.quantity }} x {{ '£ ' + formatTotal(item.price) }}
                    </div>
                  </div>
                  <div class="float-end fw-bold small-15 text-end" :class="[lightMode ? 'text-dark' : 'text-white']">
                    {{ '£ ' + formatTotal(item.total) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop List -->
            <div class="container py-4 px-4 mt-5 d-none d-lg-block">
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
                <div class="col-md-6 fw-medium" :class="[lightMode ? 'text-dark' : 'text-white']">
                  {{ item.name }}
                </div>
                <div class="col-md-2">
                  {{ item.quantity }}
                </div>
                <div class="col-md-2 fw-medium text-end ps-0">
                  {{ '£ ' + formatTotal(item.price) }}
                </div>
                <div class="col-md-2 fw-medium text-end ps-0" :class="[lightMode ? 'text-dark' : 'text-white']">
                  {{ '£ ' + formatTotal(item.total) }}
                </div>
              </div>
            </div>
          </div>
          <div class="text-white mx-4 rounded-bottom" :class="[lightMode ? 'bg-dark-blue' : 'bg-dark']">
            <div class="d-md-none">
              <div class="px-4 py-5 d-flex justify-content-between align-items-center">
                <div class="small-15">Grand Total</div>
                <div class="small-24 fw-bold float-end">
                {{ '£ ' + formatTotal(invoice.total) }}
                </div>
              </div>
            </div>
            <div class="d-none d-md-block">
              <div class="px-4 py-4 d-flex justify-content-between align-items-center">
                <div class="small-12">Amount Due</div>  
                <div class="small-24 fw-bold float-end">
                {{ '£ ' + formatTotal(invoice.total) }}
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
    filteredInvoices: function () {
      return this.allInvoices.filter(x => {
        return this.filters.includes(x.status)
      }) 
    }
  },
  data() {
    return {
      hasErrors: false,
      paymentTerms: [
        {
          name: 'Net 1 Day',
          value: 1,
          isActive: false,
        },
        {
          name: 'Net 7 Days',
          value: 7,
          isActive: false,
        },
        {
          name: 'Net 14 Days',
          value: 14,
          isActive: true,
        },
        {
          name: 'Net 21 Days',
          value: 21,
          isActive: false,
        },
      ],
      selectedDate: {
        full: '',
        month: '',
        day: '',
        year: '',
      },
      daysInMonth: [],
      currDate: {
        year: 0,
        month: 0,
        day: 0
      },
      invoiceValidation: {
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
        "status": "paid",
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
              value: "Brand Guidelines",
              hasError: true,
            },
            "quantity":  {
              value: 1,
              hasError: false,
            },
            "price":  {
              value: "1800.90",
              hasError: false,
            },
            "total":  {
              value: "1800.90",
              hasError: false,
            }
          }
        ],
        "total": 0
      },
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

      window.scrollTo(0, 0)
      this.fetchInvoice()
      this.initDateVals()

      if (!this.invoice || !id) {
        console.log('oh no')
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    manualToggle: function () {
      let closeCanvas = this.$refs.oogabooga
      this.fetchInvoice()
      this.hasErrors = false
      // closeCanvas.blur()
      // closeCanvas.click()
    },
    handlePaymentClick: function (value) {
      this.paymentTerms = this.paymentTerms.map(x => {
        if (x.value === value) {
          x.isActive = true

          this.invoiceValidation.paymentTerms = x.value
          this.updatePaymentDue()
        } else {
          x.isActive = false
        }

        return x
      })
    },
    updatePaymentDue: function () {
      // get current date
      // get days left in month
      // add remainder days to subsequent month
      // update payment due date

      let daysInMonth = new Date(this.selectedDate.year, this.selectedDate.month, 0).getDate()
      let paymentTerms = Number(this.invoiceValidation.paymentTerms)
      let selectedDay = Number(this.selectedDate.day)

      if (selectedDay + paymentTerms > daysInMonth) {
        let difference = (selectedDay + paymentTerms) - daysInMonth
        this.invoiceValidation.paymentDue = this.selectedDate.year + '-' + String(this.selectedDate.month + 1).padStart(2, '0') + '-' + String(difference).padStart(2, '0')
      } else {
        this.invoiceValidation.paymentDue = this.selectedDate.year + '-' + String(this.selectedDate.month).padStart(2, '0') + '-' + String(selectedDay + paymentTerms).padStart(2, '0')
      }

      console.log(this.invoiceValidation.paymentDue)
    },
    initDateVals: function () {
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

      arr = arr.concat(Array(7 - arr.length).fill(' '))
      this.daysInMonth.push(arr)
    },
    formatMonth: function (month) {
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return months[month - 1]
    },
    selectDay: function (day) {
      this.currDate.day = day

      this.selectedDate.full = this.formatMonth(this.currDate.month) + ' ' + this.currDate.day + ' ' + this.currDate.year
      this.selectedDate.month = this.currDate.month
      this.selectedDate.day = this.currDate.day
      this.selectedDate.year = this.currDate.year

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
    fetchInvoice: function () {
      let id = this.$route.params.id

      this.invoice = useStore().invoices.find(x => x.id === id)
      // this.invoiceCopy = JSON.parse(JSON.stringify(this.invoice))

      let softCopy = JSON.parse(JSON.stringify(this.invoice))
      let invoiceDate =  softCopy.createdAt.split('-')

      this.selectedDate.full =  this.formatMonth(Number(invoiceDate[1]) + 1) + ' ' + invoiceDate[2] + ' ' + invoiceDate[0]
      this.selectedDate.month = Number(invoiceDate[1]) + 1
      this.selectedDate.day = invoiceDate[2]
      this.selectedDate.year = invoiceDate[0]

      this.currDate.year = this.selectedDate.year
      this.currDate.month = this.selectedDate.month
      this.currDate.day = this.selectedDate.day

      this.invoiceValidation = {
        "createdAt": softCopy.createdAt,
        "paymentDue": softCopy.paymentDue,
        "description": {
          value: softCopy.description,
          hasError: false,
        },
        "paymentTerms": softCopy.paymentTerms,
        "clientName": {
          value: softCopy.clientName,
          hasError: false,
        },
        "clientEmail": {
          value: softCopy.clientEmail,
          hasError: false,
        },
        "status": softCopy.status,
        "senderAddress": {
          "street": {
            value: softCopy.senderAddress.street,
            hasError: false,
          },
          "city": {
            value: softCopy.senderAddress.city,
            hasError: false,
          },
          "postCode": {
            value: softCopy.senderAddress.postCode,
            hasError: false,
          },
          "country": {
            value: softCopy.senderAddress.country,
            hasError: false,
          }
        },
        "clientAddress": {
          "street": {
            value: softCopy.clientAddress.street,
            hasError: false,
          },
          "city": {
            value: softCopy.clientAddress.city,
            hasError: false,
          },
          "postCode": {
            value: softCopy.clientAddress.postCode,
            hasError: false,
          },
          "country": {
            value: softCopy.clientAddress.country,
            hasError: false,
          }
        },
        "items": softCopy.items.map(x => {
          return {
            "name": {
              value: x.name,
              hasError: false,
            },
            "quantity":  {
              value: x.quantity,
              hasError: false,
            },
            "price":  {
              value: x.price,
              hasError: false,
            },
            "total":  {
              value: x.total,
              hasError: false,
            }
          }
        }),
        "total": softCopy.total
      }
    },
    alert: function (msg) {
      alert(msg)
    },
    deleteInvoice: function (id) {
      useStore().deleteInvoice(id)
      this.$router.push('/')
    },
    validateNewInvoice: function () {
      let hasErrors = false

      if (this.invoiceValidation.description.value === '') {
        this.invoiceValidation.description.hasError = true
        hasErrors = true
      } else {
        this.invoiceValidation.description.hasError = false
      }

      if (this.invoiceValidation.clientName.value === '') {
        this.invoiceValidation.clientName.hasError = true
        hasErrors = true
      } else {
        this.invoiceValidation.clientName.hasError = false
      }

      if (this.invoiceValidation.clientEmail.value === '') {
        this.invoiceValidation.clientEmail.hasError = true
        hasErrors = true
      } else {
        this.invoiceValidation.clientEmail.hasError = false
      }

      if (this.invoiceValidation.senderAddress.street.value === '') {
        this.invoiceValidation.senderAddress.street.hasError = true
        hasErrors = true
      } else {
        this.invoiceValidation.senderAddress.street.hasError = false
      }

      if (this.invoiceValidation.senderAddress.city.value === '') {
        this.invoiceValidation.senderAddress.city.hasError = true
        hasErrors = true
      } else {
        this.invoiceValidation.senderAddress.city.hasError =  false
      }

      if (this.invoiceValidation.senderAddress.postCode.value === '') {
        this.invoiceValidation.senderAddress.postCode.hasError = true
        hasErrors = true
      } else {
        this.invoiceValidation.senderAddress.postCode.hasError = false
      }

      if (this.invoiceValidation.senderAddress.country.value === '') {
        this.invoiceValidation.senderAddress.country.hasError = true
        hasErrors = true
      } else {
        this.invoiceValidation.senderAddress.country.hasError = false
      }

      if (this.invoiceValidation.clientAddress.street.value === '') {
        this.invoiceValidation.clientAddress.street.hasError = true
        hasErrors = true
      } else {
        this.invoiceValidation.clientAddress.street.hasError = false
      }

      if (this.invoiceValidation.clientAddress.city.value === '') {
        this.invoiceValidation.clientAddress.city.hasError = true
        hasErrors = true
      } else {
        this.invoiceValidation.clientAddress.city.hasError = false
      }

      if (this.invoiceValidation.clientAddress.postCode.value === '') {
        this.invoiceValidation.clientAddress.postCode.hasError = true
        hasErrors = true
      } else {
        this.invoiceValidation.clientAddress.postCode.hasError = false
      }

      if (this.invoiceValidation.clientAddress.country.value === '') {
        this.invoiceValidation.clientAddress.country.hasError = true
        hasErrors = true
      } else {
        this.invoiceValidation.clientAddress.country.hasError = false
      }

      for (let i = 0; i < this.invoiceValidation.items.length; i++) {
        if (this.invoiceValidation.items[i].name.value === '') {
          this.invoiceValidation.items[i].name.hasError = true
          hasErrors = true
        } else {
          this.invoiceValidation.items[i].name.hasError = false
        }
      }

      if (hasErrors) {
        this.hasErrors = true
        this.$refs.editModal.scrollTo(0,0)
        return false
      } else {
        return true
      }
    },
    updateInvoice: function (id) {
      if (this.validateNewInvoice()) {

        let updated = {
          "id": this.invoice.id,
          "createdAt": this.selectedDate.year + '-' + (this.selectedDate.month - 1) + '-' + this.selectedDate.day,
          "paymentDue": this.invoiceValidation.paymentDue,
          "description": this.invoiceValidation.description.value,
          "paymentTerms": this.paymentTerms.find((x) => x.isActive).value,
          "clientName": this.invoiceValidation.clientName.value,
          "clientEmail": this.invoiceValidation.clientEmail.value,
          "status": 'pending',
          "senderAddress": {
            "street": this.invoiceValidation.senderAddress.street.value,
            "city": this.invoiceValidation.senderAddress.city.value,
            "postCode": this.invoiceValidation.senderAddress.postCode.value,
            "country": this.invoiceValidation.senderAddress.country.value,
          },
          "clientAddress": {
            "street": this.invoiceValidation.clientAddress.street.value,
            "city": this.invoiceValidation.clientAddress.city.value,
            "postCode": this.invoiceValidation.clientAddress.postCode.value,
            "country": this.invoiceValidation.clientAddress.country.value,
          },
          "items": this.invoiceValidation.items.map(x => {
            return {
              "name": x.name.value,
              "quantity": x.quantity.value,
              "price": x.price.value,
              "total": x.quantity.value * x.price.value
            }
          }),
        }

        let sum = 0

        for (let i = 0; i < updated.items.length; i++) {
          sum += updated.items[i].total
        }

        updated['total'] = sum
       
        this.manualToggle()
        this.store.updateInvoice(this.invoice.id, updated)
        this.fetchInvoice()
      }
    },
    markInvoicePaid: function () {
      useStore().markInvoicePaid(this.invoice.id)
    },
    markInvoicePending: function () {
      useStore().markInvoicePending(this.invoice.id)
    },
    addNewInvoiceItem: function () {
      this.invoiceValidation.items.push(
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
            value: "",
            hasError: false,
          }
        })
    },
    removeInvoiceItem: function (index) {
      if (this.invoiceValidation.items.length !== 1) {
        this.invoiceValidation.items.splice(index, 1)
      }
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
/* Big screen devices (889px and above) */
@media only screen and (min-width: 992px) {
  .p-special {
    padding-left: 134px!important; 
  }
}

@media only screen and (max-width: 992px) {
  .p-special {
    padding-left: 42px!important; 
  }
}
</style>