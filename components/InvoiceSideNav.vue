<template>
  <!-- Mobile SideNav -->
    <nav class="d-lg-none d-block fixed-top w-100 bg-dark-blue text-white d-inline-flex justify-content-between" style="height: 70px; z-index: 9999;" tabindex="1">
      <div class="mb-auto position-relative bg-purple d-flex align-items-center overflow-hidden vertical-align-middle rounded-bottom-right rounded-top-right" style="height: 70px; width: 70px;">
        <nuxt-link to="/" class="mx-auto" style="z-index: 9999;">
          <img src="/logo.svg" alt="Logo">
        </nuxt-link>
        <div class="position-absolute top-50 w-100 rounded-top-left bg-light-purple" style="min-height: 100%;"></div>
      </div>
      <div class=" d-inline-flex align-items-center">
        <button @click="toggleLightMode" class="btn p-0 me-3" role="button">
          <img :src="lightMode ? '/icon-moon.svg' : '/icon-sun.svg'" alt="Toggle Light/Dark Mode" role="button">
        </button>
        <div class="ms-3 h-100 border-start d-inline-flex align-items-center p-4">
          <img src="/image-avatar.jpg" class="rounded-full" alt="Image Avatar">
        </div>
      </div>
    </nav>

    <!-- Desktop SideNav -->
    <nav class="d-lg-block d-none" tabindex="0">
      <div class="fixed-top h-100 bg-dark-blue text-white d-flex flex-column align-items-start rounded-bottom-right rounded-top-right " style="width: 90px; z-index: 9999;">
        <div class="mb-auto position-relative bg-purple d-flex align-items-center overflow-hidden w-100 vertical-align-middle rounded-top-right rounded-bottom-right" style="height: 90px; width: 90px;">
          <nuxt-link to="/" class="mx-auto" style="z-index: 9999;">
            <img src="/logo.svg" alt="Logo">
          </nuxt-link>
          <div class="position-absolute top-50 w-100 rounded-top-left bg-light-purple h-100"></div>
        </div>
        <div @click="toggleLightMode()" class="w-100 mx-auto text-center py-3" id="toggleLM" style="z-index: 99999;" role="button">
          <button class="btn">
            <img  :src="lightMode ? '/icon-sun.svg' : '/icon-moon.svg'" class="noClick" role="button" alt="Toggle Light/Dark Mode">
          </button>
          <hr class="">
          <img src="/image-avatar.jpg" class="rounded-full" alt="Image Avatar">
        </div>
      </div>
    </nav>
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
        lightMode() {
            return this.store.lightMode
        }
    },
    methods: {
        toggleLightMode: function (event) {
            useStore().toggleLightMode(event)
        },
    }
})
</script>

<style>

</style>