import { mapActions } from 'vuex';

export const ForbidLoggedInUser = {
  async created() {
    await this.logInWithToken();
  },
  methods: {
    ...mapActions('account', ['logInWithToken']),
  },
};
