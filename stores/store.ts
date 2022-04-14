import { defineStore, acceptHMRUpdate} from 'pinia'
import data from '~~/stores/data'

export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      ...data,
      lightMode: true,
      oogabooga: 'cat and the hat'
    }
  },
  actions:{
    toggleLightMode() {
      console.log(this.lightMode)
      this.lightMode = !this.lightMode
    },
    deleteInvoice(id){
      this.invoices = this.invoices.filter(x => x.id !== id)
    },
    submitNewInvoice: function (payload) {
      payload.id = makeid()
      payload.status = 'pending'
      payload.createdAt = getDate()
      payload.paymentDue = futureDate()

      this.invoices.push(payload)
    },
    submitNewDraft: function (payload) {
      payload.id = makeid()
      payload.status = 'draft'
      payload.items = payload.items.map((x) => {
        return {
          "name": x.name.value,
          "quantity": x.quantity.value,
          "price": x.price.value,
          "total": x.total.value
        }
      })
      payload.createdAt = getDate()
      payload.paymentDue = futureDate()

      this.invoices.push(payload)
    },
    markInvoicePaid(id){
      this.invoices = this.invoices.map(x => {
        if (x.id === id) {
          x.status = 'paid'
        }

        return x
      })
    },
    markInvoicePending(id){
      this.invoices = this.invoices.map(x => {
        if (x.id === id) {
          x.status = 'pending'
        }

        return x
      })
    },
    updateInvoice(id, payload){
      this.invoices = this.invoices.map(x => {
        if (x.id === id) {
          x = payload
        }

        return x
      })
    }
  },
  getters:{
    // getCount:(state)=>state.counter,
    getLightMode: (state)=> {
      console.log('123')
      console.log(state.lightMode)
      state.lightMode
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}

// generateID
// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numbers = '0123456789'

  for ( var i = 0; i < 2; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  for ( var i = 0; i < 4; i++ ) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return result;
}

function getDate() {
  // format: "2021-08-18"
  let today = new Date()
  return today.getFullYear() + '-' + 
  String(today.getMonth()).padStart(2, '0') + 
  '-' + String(today.getDate()).padStart(2, '0')
}

function futureDate() {
  // format: "2021-08-18"
  let today = new Date()
  return today.getFullYear() + '-' + 
  String(today.getMonth() + 1).padStart(2, '0') + 
  '-' + String(today.getDate()).padStart(2, '0')
}