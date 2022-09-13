<template>
  <div class="main-page">
    <Header />
    <h1 class="main-page__title">
      <span class="main-page__title-span" v-for="(letter, index) in title" :key="`${index}${letter}`">{{
        letter
      }}</span>
    </h1>
    <p>Here you can view, add and edit the wizkids of OWOW</p>
    <p>Log in to get more powers 🔮</p>

    <div class="cards">
      <div class="cards__wrapper">
        <p v-if="noWizkids">No wizkids here</p>
        <WizkidCard
          ref="card"
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
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import WizkidCard from "../components/WizkidCard.vue";
import Header from "../components/Header.vue";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "main-page",
  components: {
    WizkidCard,
    Header,
  },
  computed: {
    wData() {
      // mock data from draft.js
      return this.$store.state.wizkidsData;
    },
    isWizkid() {
      // check for user or guest
      return this.$store.state.isWizkid;
    },
    noWizkids() {
      // check for users left
      return this.$store.state.wizkidsData.length === 0;
    },
    title() {
      const string = "Welcome to Wizkid Manager 2000!";

      const arr = [...string];

      return arr;
    },
  },

  mounted() {
    this.addScrollTriggers();
    gsap.to(".main-page__title-span", { opacity: 1, stagger: 0.05 });
  },

  watch: {
    wData(to, from) {
      if (to.length !== from.length) {
        setTimeout(() => {
          this.addScrollTriggers();
          ScrollTrigger.refresh();
        }, 300);
      }
    },
  },

  methods: {
    addWizkid() {
      this.$store.dispatch("addNewItem");
    },
    addScrollTriggers() {
      const cards = this.$refs.card;

      console.log(cards, "cards");

      if (!cards || cards.length < 1) return;

      cards.map((item) => {
        return ScrollTrigger.create({
          trigger: item.$el,
          start: "center bottom",
          end: "80% bottom",
          onEnter: () => {
            item.$el.classList.add("entered");
          },
          onEnterBack: () => {
            if (item.$el.classList.contains("entered")) {
              item.$el.classList.remove("entered");
            }
          },
        });
      });
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
  height: 100%;
  min-height: 100vh;
  &__note {
    color: gray;
    font-size: 0.8rem;
  }

  &__title {
    font-size: 5rem;

    &-span {
      opacity: 0;
      transition: opacity 0.45s ease;
    }
  }
}
</style>
