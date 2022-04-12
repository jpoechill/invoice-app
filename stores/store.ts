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
      console.log('Submit new invoice')
      // this.invoices.push(payload)
    },
    submitNewDraft: function (payload) {
      console.log('Submit new draft')
      // this.invoices.push(payload)
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