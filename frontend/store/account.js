export const state = () => ({
  userInfo: undefined,
});

export const mutations = {};

export const actions = {
  logIn({ commit }, [email, password]) {
    console.log(email, password);
  },
};

export const getters = {
  loggedIn: (state) => {
    return state.userInfo !== undefined;
  },
};
