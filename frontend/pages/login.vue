<template>
  <div>
    <input v-model="email" />
    <input v-model="password" />
    <button @click="onClickLogIn">LogIn</button>
    <button @click="onClickCheck">Check</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters('account', ['loggedIn']),
  },
  mounted() {
    console.log(`loggedIn: `, this.loggedIn);
  },
  methods: {
    ...mapActions('account', ['logIn', 'check']),
    onClickLogIn() {
      this.logIn([this.email, this.password]);
    },
    onClickCheck() {
      this.check();
    },
  },
};
</script>

<style></style>
