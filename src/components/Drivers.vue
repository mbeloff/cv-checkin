<template>
  <div class="container mx-auto flex flex-col gap-2">
    <!-- CUSTOMER INFO -->
    <div class="relative flex flex-col rounded bg-white p-2 md:p-5">
      <p
        class="text-left text-xl font-bold"
        @click="showCustomer = !showCustomer"
      >
        Customer Details
      </p>
      <modify-driver
        :class="{ 'h-10 overflow-hidden': !showCustomer }"
        :key="customer.customerid"
        :customer="customer"
        :is-primary="true"
        @update="$emit('update')"
      ></modify-driver>
    </div>
    <!-- ADDTIONAL DRIVERS -->
    <div
      v-show="extradrivers && extradrivers.length"
      class="relative flex flex-col rounded bg-white p-2 md:p-5"
    >
      <p class="mt-2 text-left text-xl font-bold">Additional Drivers</p>
      <p class="text-left text-sm text-gray-500">
        Add up to 4 extra drivers. Please note that all drivers will need to
        provide their driver's licence and sign the rental agreement.
      </p>
      <div class="flex flex-col gap-2">
        <modify-driver
          v-for="driver in extradrivers"
          :key="driver.customerid"
          :customer="driver"
          @update="$emit('update')"
        ></modify-driver>
      </div>
    </div>

    <!-- NEW DRIVER -->
    <div
      v-if="extradrivers && extradrivers.length < 4"
      class="relative flex flex-col rounded bg-white p-2 md:p-5"
    >
      <button
        v-if="extradrivers && extradrivers.length < 4"
        class="btn-green my-2"
        @click="showNewDriver = !showNewDriver"
      >
        <span v-if="showNewDriver"
          ><i class="fas fa-minus-circle"></i> Cancel</span
        >
        <span v-else><i class="fas fa-plus-circle"></i> Add a Driver</span>
      </button>

      <p v-if="showNewDriver" class="text-left text-xl font-bold">
        New Driver Details
      </p>
      <modify-driver
        v-if="showNewDriver && extradrivers.length < 4"
        :new-driver="true"
        @update="$emit('update'), (showNewDriver = false)"
      ></modify-driver>
    </div>
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
      showNewDriver: false,
      showCustomer: true,
    };
  },
  beforeMount() {},
  computed: {
    customer() {
      return JSON.parse(
        JSON.stringify(this.$store.state.bookinginfo.customerinfo[0])
      );
    },
    extradrivers() {
      return this.$store.state.bookinginfo.extradrivers;
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss"></style>
