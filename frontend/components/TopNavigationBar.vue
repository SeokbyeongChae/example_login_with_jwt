<template>
  <div class="topNavMenu">
    <div class="topNavMenu__menu">
      <div class="topNavMenu__memuItem">
        <nuxt-link :to="'/'">Home</nuxt-link>
      </div>
      <div class="topNavMenu__memuItem">
        <nuxt-link :to="'/my-page'">My Page</nuxt-link>
      </div>
    </div>
    <div class="topNavMenu__accountMenu">
      <div v-if="loggedIn">LoggedIn</div>
      <div class="topNavMenu__memuItem">
        <nuxt-link :to="'/register'">Register</nuxt-link>
      </div>
      <div class="topNavMenu__memuItem">
        <nuxt-link :to="'/login'">LogIn</nuxt-link>
      </div>
      <div class="topNavMenu__memuItem" @click="logOut">LogOut</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('account', ['loggedIn']),
  },
  methods: {
    ...mapActions('account', ['logOut']),
  },
};
</script>

<style lang="scss" scoped>
.topNavMenu {
  background-color: $grey;
  height: 64px;
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  align-items: center;

  &__menu,
  &__accountMenu {
    display: flex;
    height: 100%;
  }

  &__memuItem {
    height: 100%;
    padding: 12px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #ddd;
      color: black;
    }
  }

  &a {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;

    &:hover {
      background-color: #ddd;
      color: black;
    }
  }

  &--active {
    background-color: #4caf50;
    color: white;
  }
}
</style>
