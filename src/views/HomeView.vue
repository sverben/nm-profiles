<script>
import Profile from "@/components/Profile.vue";

export default {
  data() {
    return {
      profile: null
    }
  },
  props: [
      'api',
      'player'
  ],
  methods: {
    async switch() {
      this.profile = await this.api.to(`profile/${this.$route['params']['who']}`)
    }
  },
  watch: {
    player() {
      this.switch()
    }
  },
  mounted() {
    this.switch()
  },
  components: {
    Profile
  }
}
</script>

<template>
  <div class="page" v-if="profile">
    <Profile :profile="profile" :api="api"></Profile>
  </div>
</template>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
