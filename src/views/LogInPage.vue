<template>
  <div class="login">
    <div class="login__wrap">
      <div class="login__form">
        <input class="login__form-item" type="email" placeholder="Email" v-model="user" />
        <input class="login__form-item" type="password" placeholder="Password" v-model="password" />
        <button class="button" @click="logIn">Log in!</button>
      </div>
      <p :class="['login__msg', { show: isWrong }]">Try again!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "log-in-page",
  data() {
    return {
      user: "wizkid",
      password: "wizkid1",
      isWrong: false,
    };
  },
  computed: {
    linkText() {
      return this.$store.state.isWizkid ? "Log Out" : "Log In";
    },
  },
  methods: {
    logIn() {
      // check for mock data otherwise won't let you in
      if (this.user === "wizkid" && this.password === "wizkid1") {
        this.$router.push("/");
        this.$store.dispatch("setIsWizkid", true);
      } else this.isWrong = true;
    },
  },
};
</script>

<style lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;

  &__msg {
    transition: opacity 0.35s ease;
    &:not(.show) {
      opacity: 0;
    }
  }

  &__wrap {
    width: 100%;
  }

  &__form {
    display: flex;
    flex-direction: column;
    width: 20%;
    margin: 0 auto;

    &-item {
      margin-bottom: 1em;
      padding: 0.5em;
      font-size: 1.1rem;
      border-radius: 1rem;
      border: none;
    }
  }
}
</style>
