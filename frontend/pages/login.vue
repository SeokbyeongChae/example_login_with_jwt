<template>
  <div>
    <input v-model="email" />
    <input v-model="password" />
    <button @click="onClickLogIn">LogIn</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('account', ['logIn']),
    onClickLogIn() {
      this.logIn([this.email, this.password]);
    },
  },
};
</script>

<style></style>
