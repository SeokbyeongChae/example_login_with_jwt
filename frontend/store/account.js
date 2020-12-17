export const state = () => ({
  userInfo: undefined,
});

export const mutations = {};

export const actions = {
  logIn({ commit }, [email, password]) {
    console.log(email, password);
    this.$axios
      .$post('/login', { email, password })
      .then((res, data1) => {
        console.log('res..');
        console.dir(document);
        console.dir(res);
      })
      .catch((err) => {
        console.log('err..');
        console.dir(err);
      });
  },
};

export const getters = {
  loggedIn: (state) => {
    return state.userInfo !== undefined;
  },
};
