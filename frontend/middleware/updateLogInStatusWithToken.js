export default async function ({ store, redirect }) {
  await store.dispatch('account/logInWithToken');
}
