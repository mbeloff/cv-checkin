<template>
  <div>
    <!-- CUSTOMER INFO -->
    <div class="relative flex flex-col rounded bg-white p-2 md:p-5">
      <p class="text-left text-xl font-bold">Customer Details</p>
      <modify-driver
        :key="customer.customerid"
        :customer="customer"
        :is-primary="true"
      ></modify-driver>
    </div>
    <br />
    <p>Additional Drivers</p>
    <br />
  </div>
</template>

<script>
import Mixins from "@/Mixins.js";
import ModifyDriver from "@/components/ModifyDriver.vue";
export default {
  mixins: [Mixins],
  components: { ModifyDriver },
  data() {
    return {
      customer: {},
      extraDrivers: [],
    };
  },
  beforeMount() {
    this.customer = JSON.parse(
      JSON.stringify(this.$store.state.bookinginfo.customerinfo[0])
    );
    this.extraDrivers = this.$store.state.bookinginfo.extradrivers;
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss"></style>
