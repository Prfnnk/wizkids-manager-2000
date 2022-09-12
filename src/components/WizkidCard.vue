<template>
  <div class="wizkid-card">
    <div class="wizkid-card__header">
      <div class="wizkid-card__tools">
        <div class="wizkid-card__tools-wrap">
          <button class="wizkid-card__tool button" @click="editCard" :disabled="!isWizkid || isFired">
            {{ edditInner }}
          </button>
          <button class="wizkid-card__tool button" @click="deleteCard" :disabled="!isWizkid || isFired">
            Delete 🗑
          </button>
          <button class="wizkid-card__tool button" @click="manageWizkid(!isFired)" :disabled="!isWizkid">
            {{ fireInner }}
          </button>
        </div>
        <p class="wizkid-card__tools-note" v-if="!isWizkid">Log in to get access to this tools</p>
        <span :class="['wizkid-card__fired-sign', { show: isFired }]"></span>
      </div>
    </div>
    <div class="wizkid-card__wrap">
      <div class="wizkid-card__part wizkid-card__part--left">
        <div class="wizkid-card__photo">
          <img :src="pictureSrc" alt="Wizkid picture" />
        </div>
      </div>
      <div class="wizkid-card__part wizkid-card__part--right">
        <div class="wizkid-card__info">
          <div class="wizkid-card__info-item">
            <p class="wizkid-card__info-title">Name</p>
            <input class="input" type="text" v-model="editName" v-if="editMode" />
            <p class="wizkid-card__info-data" v-else>{{ name }}</p>
          </div>
          <div class="wizkid-card__info-item">
            <p class="wizkid-card__info-title">Role</p>
            <select class="input" name="Role" id="role" v-if="editMode" v-model="editRole">
              <option value="Boss">Boss</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Intern">Intern</option>
            </select>
            <p class="wizkid-card__info-data" v-else>{{ role }}</p>
          </div>
          <div class="wizkid-card__info-item" v-show="isWizkid">
            <p class="wizkid-card__info-title">Email</p>
            <input class="input" type="text" v-model="editEmail" v-if="editMode" />
            <p class="wizkid-card__info-data" v-else>{{ email }}</p>
          </div>
          <div class="wizkid-card__info-item" v-show="isWizkid">
            <p class="wizkid-card__info-title">Phone</p>
            <input class="input" type="text" v-model="editPhone" v-if="editMode" />
            <p class="wizkid-card__info-data" v-else>{{ phone }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wizkid-card",
  props: {
    name: {
      type: String,
      default: "Wizkid",
    },
    role: {
      type: String,
      default: "Wizkid",
    },
    email: {
      type: String,
      default: "Wizkid@owow.io",
    },
    phone: {
      type: String,
      default: "+31-655-511-319",
    },
    index: {
      type: Number,
      default: 0,
    },
    id: {
      type: String,
      default: "",
    },
    isFired: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    edditInner() {
      return this.editMode ? "Save 💾" : "Edit 🪄";
    },
    fireInner() {
      return this.isFired ? "Unfire ❤️‍🩹" : "Fire 👋🏻";
    },
    isWizkid() {
      return this.$store.state.isWizkid;
    },
    pictureSrc() {
      return `https://ui-avatars.com/api/?length=1&name=${this.name}&size=256&background=random`;
    },
  },

  data() {
    return {
      editName: "",
      editRole: "",
      editEmail: "",
      editPhone: "",
      editMode: false,
    };
  },

  mounted() {
    // let edit a card when added
    if (this.name === "" && this.email === "" && this.phone === "") {
      this.editMode = true;
      document.querySelector(".wizkid-card").classList.add("entered");
      console.log(document.querySelector(".wizkid-card"));
    }
  },

  methods: {
    editCard() {
      // to leave already written in the input
      if (!this.editMode) {
        this.editMode = true;
        this.editName = this.name;
        this.editRole = this.role;
        this.editEmail = this.email;
        this.editPhone = this.phone;
      } else {
        // to save written
        this.editMode = false;
        this.$store.dispatch("setNewData", {
          index: this.index,
          name: this.editName,
          role: this.editRole,
          email: this.editEmail,
          phone: this.editPhone,
        });
      }
    },

    deleteCard() {
      this.$store.dispatch("deleteWizkid", this.id);
    },

    manageWizkid(value) {
      this.$store.dispatch("manageWizkid", {
        index: this.index,
        isFired: value,
      });
    },
  },
};
</script>

<style lang="scss">
.wizkid-card {
  width: 70%;
  border: 1px solid #fff;
  border-radius: 2.5rem;
  height: 26rem;
  padding: 0 2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: opacity 0.75s cubic-bezier(0.25, 0.45, 0.48, 0.98), transform 0.85s cubic-bezier(0.25, 0.45, 0.48, 0.98);

  &:not(.entered) {
    opacity: 0;
    transform: translateY(2rem);
  }

  &__fired-sign {
    display: block;
    position: absolute;
    top: 2rem;
    left: 0;
    width: 24rem;
    height: 15rem;
    background-image: url("../assets/fired.png");
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
    transition: opacity 0.55s ease, transform 0.35s ease-in;

    &:not(.show) {
      opacity: 0;
      transform: scale(1.7);
    }
  }

  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }

  &__header {
    display: flex;
    justify-content: flex-end;
  }

  &__info {
    &-item {
      display: flex;
      align-items: center;

      &:not(:last-of-type) {
        margin-bottom: 1rem;
      }
    }

    &-data {
      width: 100%;
      text-align: left;
    }

    &-title {
      font-weight: 700;
      margin-right: 2em;
      width: 5em;
    }
  }

  &__wrap {
    display: flex;
    width: 100%;
  }

  &__part {
    width: 50%;
    height: 100%;

    &--left {
      display: grid;
      place-items: center;
    }
  }

  &__photo {
    width: 15vw;
    height: 15vw;
    background: pink;

    img {
      width: 100%;
      display: block;
    }
  }

  &__tools {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem 1.5rem;
    &-note {
      color: gray;
      font-size: 0.8rem;
    }
  }

  &__tool {
    width: 7em;
    &:not(:last-of-type) {
      margin-right: 1em;
    }
  }
}
</style>
