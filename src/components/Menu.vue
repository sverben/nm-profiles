<script>
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      search: ''
    }
  },
  props: [
      'api'
  ],
  methods: {
    visit() {
      window.location.replace(`/player/${this.search}`)
    }
  }
}
</script>

<template>
  <div class="menu">
    <img src="https://nm-games.eu/media/icon.png" alt="icon">
    <div class="name">Profiles</div>
    <form @submit.prevent="visit">
      <input type="text" v-model="search" class="inp">
    </form>

    <RouterLink to="/login" v-if="!api.token" class="login">Log in</RouterLink>
    <div v-else class="username">{{ api.name }}</div>
  </div>
</template>

<style scoped>
.menu {
  position: absolute;
  background: var(--primary);
  left: 0;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px;
}
form {
  display: flex;
  flex: 1;
}
.inp {
  flex: 1;
  background: var(--secondary);
  border-radius: 5px;
  border: none;
  outline: 0;
  padding: 7px;
  color: #fff;
}
img {
  width: 35px;
}
.login {
  text-decoration: none;
  color: #2268b6;
}
.login, .username {
  margin-left: 10px;
}
</style>
