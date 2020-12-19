export default async function ({ store, redirect }) {
  /*
  if (store.getters['account/idle']) {
    await store.dispatch('account/logInWithToken');
  }
  */
  await store.dispatch('account/logInWithToken');

  // If the user is not authenticated
  if (store.getters['account/logOut']) {
    return redirect('/login');
  }
}
