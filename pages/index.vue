<template>
  <div>
    <InvoiceList />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useStore } from '~/stores/store'
import InvoiceList from '@/components/InvoiceList';

export default defineComponent({
  setup() {
    const store = useStore()

    return { store }
  },
  components: {
    InvoiceList
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
      myVal: false,
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
    toggleFilters: function (filterItem) {
      this.filtersObj[filterItem] = !this.filtersObj[filterItem]
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


<style>
body, html {
  font-family: 'Spartan';
}

.smooth-scroll {
  scroll-behavior: smooth;
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

.text-orange {
  color: #FF8F00;
}

.text-purple {
  color: #7C5DFA;
}

.text-error { 
  color: red;
}

.has-error {
  outline: 1px solid red!important;
}

.text-light-light-purple {
  color: #DFE3FA;
}

.bg-light-light-purple {
  background-color: rgba(227,223,250,.06)
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

.border-start {
  border-left: 1px solid #777777!important;
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

.hover:hover, .hover:focus-visible {
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
  background-color: #1E2139!important;
}

.bg-dark-dark-purple {
  background-color: #252945!important;
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

.border-bottom-dark {
  border-bottom: 1px solid #1E2139!important;
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

.bg-light-light-purple.btn:hover {
  color: #FFFFFF;
}

input[type="text"]:focus.text-white {
  background-color: inherit;
}
</style>