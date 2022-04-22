<template>
  <div
    class="w-full max-w-screen-md mx-auto flex flex-col justify-between rounded bg-gray-400"
  >
    <p class="p-2 font-bold">
      Booking Reference: {{ bookinginfo.bookinginfo[0].reservationdocumentno }}
    </p>
    <p></p>
    <p>{{ trip.vehiclecategory }}</p>
    <div class="my-2 grid grid-cols-2 p-2 text-left">
      <p>Picking up:</p>
      <p>{{ trip.pickuplocationname }} {{ trip.pickupdate }}</p>
      <p>Droping off:</p>
      <p>{{ trip.dropofflocationname }} {{ trip.dropoffdate }}</p>
    </div>

    <!-- <div class="flex justify-between rounded-b bg-gray-200 py-2 font-bold px-2">
      <span>Balance Due:</span
      ><span
        >{{ trip.currencyname + trip.currencysymbol
        }}{{ trip.balancedue }}</span
      >
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Summary",
  props: {
    bookinginfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    trip() {
      return this.bookinginfo.bookinginfo[0];
    },
  },
};
</script>

<style lang="scss"></style>
