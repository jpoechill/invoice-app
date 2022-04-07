import { defineStore, acceptHMRUpdate} from 'pinia'
import data from '~~/stores/data'

export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      ...data
    }
  },
  actions:{
    deleteInvoice(id){
      this.invoices = this.invoices.filter(x => x.id !== id)
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
    // getUser: (state)=> {
    //   state.name
    // }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}