<template>
  <div class="w-full max-w-screen-md mx-auto flex flex-col gap-5">
    <!-- CUSTOMER INFO -->
    <div class="rounded bg-gray-900 ">
      <button
        class="flex h-16 w-full items-center justify-between text-white px-2 md:px-5"
        @click="showCustomer = !showCustomer"
      >
        <p class="text-center text-xl font-bold">
          Main Hirer
          <span
            v-if="actionRequiredMain"
            class="text-sm font-normal text-orange-300"
            ><i class="far fa-warning"></i> action required</span
          >
        </p>
        <i
          class="far fa-chevron-down"
          :class="{ 'rotate-180': showCustomer }"
        ></i>
      </button>
      <div class="px-2 md:px-5">
        <modify-driver
        class="mb-5 "
        v-show="showCustomer"
        :key="customer.customerid"
        :customer="customer"
        :is-primary="true"
        @update="$emit('update')"
        @action-required="actionRequiredMain = $event"
      ></modify-driver>
      </div>
      
    </div>

    <!-- ADDTIONAL DRIVERS -->
    <div class="rounded bg-gray-900" v-if="extradrivers.length">
      <button
        class="flex h-16 w-full items-center justify-between text-white px-2 md:px-5"
        @click="showExtraDrivers = !showExtraDrivers"
      >
        <p class="text-center text-xl font-bold">
          Additional Drivers
          <span
            v-if="driversRequireAction > 0"
            class="text-sm font-normal text-orange-300"
            ><i class="far fa-warning"></i> action required</span
          >
        </p>
        <i
          class="far fa-chevron-down"
          :class="{ 'rotate-180': showExtraDrivers }"
        ></i>
      </button>
<div class="px-2 md:px-5">
  <modify-driver
        v-show="extradrivers && extradrivers.length && showExtraDrivers"
        v-for="driver in extradrivers"
        class="mb-5"
        :key="driver.customerid"
        :customer="driver"
        @update="$emit('update')"
        @action-required="actionRequiredAdditional[driver.customerid] = $event"
      ></modify-driver>
</div>
      
    </div>

    <!-- NEW DRIVER -->
    <div
      v-if="extradrivers && extradrivers.length < 4"
      class="relative flex flex-col rounded bg-gray-900 p-2 md:p-5"
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

      <modify-driver
        v-if="showNewDriver && extradrivers.length < 4"
        :new-driver="true"
        @update="$emit('update'), (showNewDriver = false)"
      ></modify-driver>
    </div>
  </div>
</template>

<script>
import smoothReflow from 'vue-smooth-reflow'
import Mixins from "@/Mixins.js";
import ModifyDriver from "@/components/ModifyDriver.vue";
export default {
  mixins: [Mixins, smoothReflow],
  components: { ModifyDriver },
  data() {
    return {
      showNewDriver: false,
      showCustomer: false,
      showExtraDrivers: false,
      actionRequiredMain: undefined,
      actionRequiredAdditional: {},
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
    driversRequireAction() {
      let count = 0;
      Object.values(this.actionRequiredAdditional).forEach((el) => {
        if (el == true) count++;
      });
      return count;
    },
  },
  created() {},
  methods: {},
  mounted() {
    this.$smoothReflow()
  }
};
</script>

<style lang="scss"></style>
