<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  props: [
      'api'
  ],
  methods: {
    async authorize() {
      await this.api.authorize(this.username, this.password)
      window.location.replace('/')
    }
  }
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="authorize">
      <label for="username">Username</label>
      <input type="text" v-model="username" id="username">
      <label for="password">Password</label>
      <input type="password" v-model="password" id="password">
      <input type="submit" value="Log in">
    </form>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
form {
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 5px;
  background: var(--primary);
  border-radius: 10px;
}
input {
  color: #fff;
  background: var(--secondary);
  border: none;
  outline: 0;
  padding: 5px;
  border-radius: 5px;
}
label {
  margin-top: 5px;
}
input[type=submit] {
  margin-top: 5px;
}
</style>
