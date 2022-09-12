<template>
  <div id="app">
    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
body {
  margin: 0;
}

* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: #000;
  height: 100%;
}
.button {
  background: none;
  border-radius: 2rem;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.8em 1.2em;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.55s ease, color 0.55s ease;

  &:hover {
    background: #fff;
    color: #000;
  }

  &:disabled {
    background: rgba($color: #ffff, $alpha: 0.2);
    cursor: not-allowed;
    border-color: rgba($color: #ffff, $alpha: 0.2);
    color: rgba($color: #ffff, $alpha: 0.2);
  }
}

.input {
  padding: 1em;
  font-size: 0.8rem;
  border-radius: 1rem;
  border: none;
  width: 100%;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter {
  opacity: 0;
  transform: translateX(50%);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}
</style>
