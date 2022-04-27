<template>
  <div class="relative flex h-full flex-col justify-center bg-gray-300">
    <loading-overlay v-if="loading" class="z-10"></loading-overlay>
    <div class="my-2 h-12">
      <p v-show="error" class="text-center text-red-500">{{ error }}</p>
    </div>

    <form for="resno" class="mx-auto flex max-w-sm flex-col text-left">
      <label class="group flex flex-grow flex-col">
        <div class="relative flex flex-row place-items-center">
          <input
            id="resno"
            v-model="resno"
            :class="{ 'input-error': missinginput && !resno.length }"
            class="my-input uppercase"
            type="text"
            name="resno"
            placeholder="Reservation number"
          />
          <i class="form-i fal fa-book fa-fw absolute -left-5 -ml-2 mr-2"></i>
        </div>
      </label>
      <label for="lastname" class="group mt-2 flex flex-grow flex-col">
        <div class="relative flex flex-row place-items-center">
          <input
            id="lastname"
            v-model="lastname"
            :class="{ 'input-error': missinginput && !lastname.length }"
            class="my-input uppercase"
            type="text"
            name="lastname"
            placeholder="Last name"
          />
          <i class="form-i fal fa-user fa-fw absolute -left-5 -ml-2 mr-2"></i>
        </div>
      </label>
      <button
        class="group w-56 text-right text-4xl font-bold focus:outline-none"
        @click.prevent="findBooking(resno, lastname)"
      >
        <p class="mt-4 text-left text-4xl">online</p>
        <span>check in</span>
        <i
          class="fas fa-arrow-right z-0 transform align-middle transition duration-500 ease-out group-hover:translate-x-1 group-hover:text-blue-600"
        ></i>
      </button>
    </form>
  </div>
</template>

<script>
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import Mixins from "../Mixins";
export default {
  components: {
    LoadingOverlay,
  },
  mixins: [Mixins],
  data() {
    return {
      // resno: "211791",
      // lastname: "test",
      resno: "",
      lastname: "",
      missinginput: false,
      error: "",
      loading: true,
    };
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
  watch: {
    token: {
      handler(val) {
        if (val) {
          this.loading = false;
        }
      },
    },
  },
  mounted() {
    Mixins.methods.getToken();
    if (this.$route.query.valid == "false") {
      this.error =
        "This reservation is not ready for online check-in at this time.";
    }
  },
  methods: {
    findBooking(resno, lastname) {
      this.loading = true;
      this.error = "";
      let method = {
        method: "findbooking",
        reservationno: resno,
        lastname: lastname,
      };
      if (!resno || !lastname) {
        this.error = "Please enter reservation number and your last name.";
        this.missinginput = true;
        this.loading = false;
        return;
      }
      Mixins.methods
        .postapiCall(method)
        .then((res) => {
          if (res.status == "OK") {
            // console.log(res.results);
            let resref = res.results[0].reservationref;
            this.$store.dispatch("resref", resref);
            this.$router.push({ name: "Checkin" });
          } else if (res.status == "ERR") {
            throw res.error;
          }
        })
        .catch((err) => {
          this.loading = false;
          this.error = err;
          console.log("find booking (error): " + err);
        });
    },
  },
};
</script>

<style lang="postcss">
.btn-green {
  @apply rounded border border-green-500 px-2 text-sm text-green-600;
}
.btn-green:hover {
  @apply hover:bg-green-500 hover:text-white;
}
.btn-red {
  @apply rounded border border-red-400 px-2 text-sm text-red-600;
}
.btn-red:hover {
  @apply hover:bg-red-400 hover:text-white;
}
.input-error {
  @apply ring-2 ring-orange-400;
}

.my-input:focus + .form-i {
  @apply text-blue-600;
}
</style>
