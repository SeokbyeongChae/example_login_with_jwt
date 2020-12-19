<template>
  <div>
    <input v-model="email" />
    <input v-model="password" />
    <button @click="onClickResister">LogIn</button>
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
    ...mapGetters('account', ['loggingIn', 'loggedIn']),
  },
  watch: {
    loggedIn() {
      if (!this.loggedIn) return;

      this.$router.replace('/');
    },
  },
  methods: {
    ...mapActions('account', ['register']),
    onClickResister() {
      this.register([this.email, this.password]);
    },
  },
};
</script>

<style></style>
