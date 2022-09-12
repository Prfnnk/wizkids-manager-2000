<template>
  <header class="header">
    <p class="header__greeting">Hello, {{ visitor }}!</p>
    <button class="button" v-if="isWizkid" @click="logOut">Log Out</button>
    <router-link class="button header__login" to="/login" v-else>Log In</router-link>
  </header>
</template>

<script>
// import WizkidCard from "./wizkid-card/WizkidCard.vue";
export default {
  name: "main-page",
  computed: {
    visitor() {
      return this.$store.state.isWizkid ? "Wizkid" : "Guest";
    },
    isWizkid() {
      return this.$store.state.isWizkid;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("setIsWizkid", false);
    },
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  width: 100%;
  justify-content: flex-end;

  &__greeting {
    margin-right: 1.5em;
  }

  &__login {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
