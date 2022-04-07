<template>
  <div class="relative h-full bg-gray-300">
    <loading-overlay v-if="loading"></loading-overlay>
    <div class="container mx-auto max-w-screen-lg py-10 px-0 md:px-5">
      <!-- <modify-drivers
        v-if="tab == 'drivers'"
        :bookingdata="bookingdata"
        :customer="customer"
        :resref="resref"
        :totals="totals"
        :extradrivers="bookingdata.extradrivers"
        @update="bookingInfo()"
      ></modify-drivers>
      <modify-uploads
        v-if="tab == 'uploads'"
        :resref="resref"
        :totals="totals"
        :bookingdata="bookingdata"
        @update="bookingInfo()"
      ></modify-uploads> -->
    </div>
  </div>
</template>

<script>
import Mixins from "@/Mixins.js";
// import ModifyDrivers from '@/components/postbooking/ModifyDrivers.vue'
// import ModifyUploads from '@/components/postbooking/ModifyUploads.vue'
import LoadingOverlay from "@/components/LoadingOverlay.vue";
export default {
  components: {
    // ModifyUploads,
    // ModifyDrivers,
    LoadingOverlay,
  },
  mixins: [Mixins],
  data() {
    return {
      bookingdata: {},
      loading: false,
      ready: false,
    };
  },
  created() {
    this.bookingInfo();
  },
  methods: {
    invalidBooking(resinfo) {
      // check status of reservation
      if (resinfo == ("Cancelled" || "Hired" || "Non Revenue" || "Returned"))
        return true;
      return false;
    },
    bookingInfo() {
      let resref = this.$store.state.pbresref;
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
              this.invalidBooking(
                response.results.bookinginfo[0].reservationstatus
              )
            ) {
              this.$router.push({ name: "Home", query: { valid: false } });
            }
            this.loading = false;
            this.init(response.results);
          } else if (response.status == "ERR") {
            console.log(response.error);
            this.$router.push({
              name: "Checkin",
            });
          }
          if (response.Message) {
            console.log(response.Message);
            this.$router.push({
              name: "Checkin",
            });
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log("could't get booking info: " + err);
          this.$router.push({
            name: "Checkin",
          });
        });
    },
    getIns(data) {
      let id = data.find((el) => el.isinsurancefee);
      if (id) {
        return id.extrafeeid;
      }
      return null;
    },
    init(data) {
      this.bookingdata = data;
      this.customer = data.customerinfo[0];
      this.isQuotation = data.bookinginfo[0].isquotation;
    },
  },
};
</script>

<style lang="postcss">
.active {
  @apply from-blue-800 to-blue-900 shadow-blue-800/30;
}
</style>
