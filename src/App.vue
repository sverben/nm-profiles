<script>
import { RouterView } from 'vue-router'
import Api from "@/tools/api"
import Menu from "@/components/Menu.vue";

export default {
  data() {
    const api = new Api('/api', localStorage.getItem('token'))
    console.log(api)
    return {
      api
    }
  },
  components: {
    RouterView,
    Menu
  }
}
</script>

<template>
  <Menu :api="api"></Menu>
  <RouterView :api="api" />
</template>

<style scoped>
</style>
