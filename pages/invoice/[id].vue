<template>
  <div>
    <InvoiceDetail />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useStore } from '~/stores/store'
import InvoiceDetail from '@/components/InvoiceDetail'

export default defineComponent({
  setup() {
    const store = useStore()

    return { store }
  },
  components: {
    InvoiceDetail
  }
})
</script>