const logInStatuses = {
  idle: 1,
  loggingIn: 2,
  loggedIn: 3,
  logOut: 4,
};

export const state = () => ({
  logInStatus: logInStatuses.idle,
  userInfo: undefined,
});

export const mutations = {
  setLogInStatus(state, status) {
    state.logInStatus = status;
  },

  resetPrivateData(state) {
    state.logInStatuses = logInStatuses.logOut;
    state.userInfo = undefined;
  },
};

export const actions = {
  register({ commit }, [email, password]) {
    this.$axios
      .$post('/register', { email, password })
      .then((res) => {
        commit('setLogInStatus', logInStatuses.loggedIn);
      })
      .catch((err) => {
        switch (err.response.status) {
          case 422: {
            commit('setLogInStatus', logInStatuses.logOut);
            alert('Already exist');
            break;
          }
        }
      });
  },

  logIn({ commit }, [email, password]) {
    console.log(email, password);
    this.$axios
      .$post('/login', { email, password })
      .then((res) => {
        console.dir(res);
      })
      .catch((err) => {
        console.dir(err);
      });
  },

  async logInWithToken({ commit }) {
    try {
      await this.$axios.$post('/loginWithToken');
      commit('setLogInStatus', logInStatuses.loggedIn);
    } catch (err) {
      commit('setLogInStatus', logInStatuses.logOut);
    }
  },

  check({ commit }) {
    this.$axios.$get('/check');
  },
};

export const getters = {
  idle: (state) => {
    return state.logInStatus === logInStatuses.idle;
  },

  logOut: (state) => {
    return state.logInStatus === logInStatuses.logOut;
  },

  loggingIn: (state) => {
    return state.logInStatus === logInStatuses.loggingIn;
  },

  loggedIn: (state) => {
    return state.logInStatus === logInStatuses.loggedIn;
  },
};
