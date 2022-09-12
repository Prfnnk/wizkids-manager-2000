<template>
  <div class="main-page">
    <Header />
    <h1 class="main-page__title">Welcome to Wizkid Manager 2000!</h1>
    <p>Here you can view, add and edit the wizkids of OWOW</p>
    <p>Log in to get more powers 🔮</p>

    <div class="cards">
      <div class="cards__wrapper">
        <p v-if="noWizkids">No wizkids here</p>
        <WizkidCard
          v-else
          v-for="(wizkid, index) in wData"
          :key="wizkid.id"
          :name="wizkid.name"
          :role="wizkid.role"
          :email="wizkid.email"
          :phone="wizkid.phone"
          :index="index"
          :id="wizkid.id"
          :isFired="wizkid.fired"
        />
      </div>
    </div>
    <p class="main-page__note" v-if="!isWizkid">Log in to add a wizkid</p>
    <button @click="addWizkid" :disabled="!isWizkid" class="button">+ Add a new Wizkid 🧙‍♂️</button>
  </div>
</template>

<script>
import WizkidCard from "../components/wizkid-card/WizkidCard.vue";
import Header from "../components/Header.vue";
export default {
  name: "main-page",
  components: {
    WizkidCard,
    Header,
  },
  computed: {
    wData() {
      return this.$store.state.wizkidsData;
    },
    isWizkid() {
      return this.$store.state.isWizkid;
    },
    noWizkids() {
      return this.$store.state.wizkidsData.length === 0;
    },
  },

  methods: {
    addWizkid() {
      this.$store.dispatch("addNewItem");
    },
  },
};
</script>

<style lang="scss">
.cards {
  margin: 2rem 0;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.main-page {
  padding: 2rem;
  &__note {
    color: gray;
    font-size: 0.8rem;
  }

  &__title {
    font-size: 5rem;
  }
}
</style>
