<template>
  <div v-if="!idle">
    <input v-model="email" />
    <input v-model="password" />
    <button @click="onClickResister">Register</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ForbidLoggedInUser } from '../mixins/ForbidLoggedInUser.js';
export default {
  mixins: [ForbidLoggedInUser],
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters('account', ['idle', 'loggingIn', 'loggedIn']),
  },
  watch: {
    loggedIn() {
      if (!this.loggedIn) return;

      this.$router.replace('/');
    },
  },
  created() {
    if (this.loggedIn) this.$router.replace('/');

    // await this.logInWithToken();
  },
  methods: {
    ...mapActions('account', ['register', 'logInWithToken']),
    onClickResister() {
      this.register([this.email, this.password]);
    },
  },
};
</script>

<style lans="scss"></style>
