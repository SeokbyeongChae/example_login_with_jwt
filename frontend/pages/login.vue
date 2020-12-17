<template>
  <div>
    <input v-model="email" />
    <input v-model="password" />
    <button @click="onClickLogIn">LogIn</button>
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
    ...mapActions('account', ['logIn']),
    onClickLogIn() {
      this.logIn([this.email, this.password]);
    },
  },
};
</script>

<style></style>
