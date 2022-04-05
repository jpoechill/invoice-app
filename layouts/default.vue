<template>
  <div>
    <!-- New Invoice Modal -->
    <div class="offcanvas offcanvas-start" style="padding-left: 90px; width: 750px;" tabindex="-1" id="offcanvasNewInvoice" aria-labelledby="offcanvasNewInvoiceLabel">
      <div class="container bg-white p-5 offcanvas-body">
        <div class="row">
          <div class="col-md-12">
            <div class="small-24">
              <span class="fw-medium">New Invoice</span>
            </div>
          </div>
        </div>

        <div class="row mt-4 small-12 text-light-purple">
          <div class="col-md-12 mb-3 fw-medium text-purple">
            Bill From
          </div>
          <div class="col-md-12">
            Street Address <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" value="" type="text">
          </div>
        </div>
        <div class="row small-12 text-light-purple">
          <div class="col-md-4">
            City <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" type="text" value="">
          </div>
          <div class="col-md-4">
            Post Code <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" value="">
          </div>
          <div class="col-md-4">
            Country <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" value="">
          </div>
        </div>

        <div class="row mt-4 small-12 text-light-purple">
          <div class="col-md-12 mb-3 fw-medium text-purple">
            Bill To
          </div>
          <div class="col-md-12 mt-2">
            Client's Name <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" value="" type="text">
          </div>
          <div class="col-md-12 mt-2">
            Client's Email <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" value="" type="text">
          </div>
          <div class="col-md-12 mt-2">
            Street Address <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" value="" type="text">
          </div>
        </div>
        <div class="row small-12 text-light-purple">
          <div class="col-md-4 mt-2">
            City <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" type="text" value="">
          </div>
          <div class="col-md-4 mt-2">
            Post Code <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" value="">
          </div>
          <div class="col-md-4 mt-2">
            Country <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" value="">
          </div>
        </div>
        <div class="row mt-4 small-12 text-light-purple">
          <div class="col-md-6">
            Invoice Date <br>
            <input class="form-control mb-3 mt-2 small-12 fw-medium p-3" type="text" value="">
          </div>
          <div class="col-md-6">
            Payment Terms <br>
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" value="">
          </div>
          <div class="col-md-12 mt-2">
            Project Description
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" value="">
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
        <div class="row d-flex align-items-center">
          <div class="col-md-5">
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" value="Email Design">
          </div>
          <div class="col-md-1-5">
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" value="1">
          </div>
          <div class="col-md-3">
            <input class="form-control mt-2 small-12 fw-medium p-3" type="text" value="156.00">
          </div>
          <div class="col-md-2-5 text-light small-12 fw-medium">
            115.00 
            <img class="float-end" src="/icon-delete.svg" alt="Delete">
          </div>
          <!-- <div class="col-md-1"> -->
          <!-- </div> -->
        </div>
        <div class="row">
          <div class="col-md-12">
            <button class="btn bg-light text-light text-dark btn-round small-12 w-100 p-3 my-3 px-4 fw-medium me-2">
              + Add New Item
            </button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <button class="btn bg-light text-light text-dark btn-round small-12 p-3 px-4 fw-medium me-2">
              Discard
            </button>
            <div class="float-end">
              <button class="btn bg-light text-light text-dark btn-round small-12 p-3 px-4 fw-medium me-2">
                Save as Draft
              </button>
              <button class="btn bg-purple text-white btn-round small-12 p-3 px-4 fw-medium">
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
        <img src="/logo.svg" class="mx-auto" alt="Logo" style="z-index: 9999;">
        <div class="position-absolute top-50 w-100 rounded-top-left bg-light-purple h-100"></div>
      </div>
      <div class="w-100 mx-auto text-center py-3">
        <img @click="alert('Toggle light/dark mode.')" src="/icon-moon.svg" alt="Toggle Light/Dark Mode">
        <hr class="">
        <img src="/image-avatar.jpg" class="rounded-full" alt="Image Avatar">
      </div>
    </div>

    <slot />
  </div>
</template>

<style>
</style>
