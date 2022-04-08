<template>
  <div class="relative h-full bg-gray-300 py-10 px-2">
    <loading-overlay v-if="loading"></loading-overlay>
    <drivers v-if="gotBooking"></drivers>
  </div>
</template>

<script>
import Mixins from "@/Mixins.js";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import Drivers from "@/components/Drivers.vue";
export default {
  components: {
    LoadingOverlay,
    Drivers,
  },
  mixins: [Mixins],
  data() {
    return {
      loading: true,
      ready: false,
    };
  },
  created() {
    this.getCountries();
    this.bookingInfo();
  },
  computed: {
    gotBooking() {
      if (this.$store.state.bookinginfo.bookinginfo) {
        return true;
      }
    },
  },
  methods: {
    getCountries() {
      let method = {
        method: "countries",
      };
      Mixins.methods.postapiCall(method).then((results) => {
        console.log(results);
        this.$store.dispatch("countries", results.results);
      });
    },
    bookingInfo() {
      let resref = this.$store.state.resref;
      this.loading = true;
      this.ready = false;
      let params = {
        method: "bookinginfo",
        reservationref: resref,
      };
      Mixins.methods
        .postapiCall(params)
        .then((response) => {
          if (response.status == "OK") {
            if (
              response.results.bookinginfo[0].reservationstatus != "Reservation"
            ) {
              this.$router.push({ name: "Home", query: { valid: false } });
            }
            this.loading = false;
            this.$store.dispatch("bookinginfo", response.results);
            this.ready = true;
          } else if (response.status == "ERR") {
            console.log(response.error);
            this.$router.push({
              name: "home",
            });
          }
          if (response.Message) {
            console.log(response.Message);
            this.$router.push({
              name: "Home",
            });
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log("could't get booking info: " + err);
          this.$router.push({
            name: "Home",
          });
        });
    },
  },
};
</script>

<style lang="postcss">
.active {
  @apply from-blue-800 to-blue-900 shadow-blue-800/30;
}
</style>
