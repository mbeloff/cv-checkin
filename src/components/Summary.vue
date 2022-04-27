<template>
  <div
    class="mx-auto flex w-full max-w-screen-md flex-col justify-between rounded bg-gray-400"
  >
    <p class="p-2 font-bold">
      Booking: {{ bookinginfo.bookinginfo[0].reservationdocumentno }}
    </p>
    <p>
      {{ trip.vehiclecategory }}
    </p>

    <div class="my-2 grid grid-cols-2 gap-x-2 rounded p-2 text-left">
      <p class="text-right font-bold">Picking up:</p>
      <p>
        {{ trip.pickuplocationname }} <br />
        {{ trip.pickupdate + " - " + timeConvert(trip.pickuptime) }}
      </p>
      <p class="text-right font-bold">Droping off:</p>
      <p>
        {{ trip.dropofflocationname }} <br />
        {{ trip.dropoffdate + " - " + timeConvert(trip.dropofftime) }}
      </p>
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
import Mixins from "@/Mixins.js";
export default {
  name: "Summary",
  props: {
    bookinginfo: {
      type: Object,
      required: true,
    },
  },
  Mixins: [Mixins],
  computed: {
    trip() {
      return this.bookinginfo.bookinginfo[0];
    },
  },
  // mounted() {
  //   let params = {
  //     method: "workflowchecklist",
  //     reservationref: this.trip.reservationref,
  //     workflowcode: "checkin",
  //   };
  //   Mixins.methods.postapiCall(params).then((res) => console.log(res));
  // },
  methods: {
    timeConvert(time) {
      // Check correct time format and split into components
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join(""); // return adjusted time or original string
    },
  },
};
</script>

<style lang="scss"></style>
