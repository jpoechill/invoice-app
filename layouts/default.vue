<template>
  <div>
    <InvoiceModal />
    <InvoiceSideNav />
    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useStore } from '~/stores/store'
import InvoiceModal from '@/components/InvoiceModal'
import InvoiceSideNav from '@/components/InvoiceSideNav'

export default defineComponent({
  setup() {
    const store = useStore()
    return { store }
  },
  components: {
    InvoiceModal,
    InvoiceSideNav
  },
  computed: {
    lightMode() {
      return this.store.lightMode
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
@import '~/assets/main.css';

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
