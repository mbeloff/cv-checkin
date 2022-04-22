<template>
  <div class="relative mt-2 gap-y-5 rounded border bg-white p-2 text-left">
    <loading-overlay v-if="savingChanges"></loading-overlay>
    <p class="my-3 text-xl font-bold">Driver Details</p>
    <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
      <div class="group flex flex-grow flex-col">
        <label :for="'fName' + cid" class="my-label"
          >First Name</label
        >
        <input
          :id="'fName' + cid"
          v-model="customerdata.firstname"
          maxlength="30"
          required
          type="text"
          class="my-input"
          :disabled="isPrimary"
          :class="{ 'text-gray-400': isPrimary }"
          placeholder="required"
        />
      </div>
      <div class="group flex flex-grow flex-col">
        <label :for="'lName' + cid" class="my-label"
          >Last Name</label
        >
        <input
          :id="'lName' + cid"
          v-model="customerdata.lastname"
          maxlength="40"
          required
          type="text"
          class="my-input"
          :disabled="isPrimary"
          :class="{ 'text-gray-400': isPrimary }"
          placeholder="required"
        />
      </div>
      <div class="group flex flex-grow flex-col">
        <label :for="'email' + cid" class="my-label">Email</label>
        <input
          :id="'email' + cid"
          v-model="customerdata.email"
          maxlength="50"
          required
          type="email"
          class="my-input"
          :disabled="isPrimary"
          :class="{ 'text-gray-400': isPrimary }"
          placeholder="required"
        />
      </div>
      <div class="group flex flex-grow flex-col">
        <label :for="'phone' + cid" class="my-label">Phone</label>
        <input
          :id="'phone' + cid"
          v-model="customerdata.mobile"
          maxlength="25"
          required
          type="tel"
          class="my-input"
        />
      </div>

      <date-picker
        v-model="dateofbirth"
        :max-date="new Date()"
        :update-on-input="false"
        class="group flex flex-grow flex-col"
      >
        <template #default="{ inputValue, inputEvents }">
          <label :for="'dob' + cid" class="my-label"
            >Date of Birth</label
          >
          <div class="flex flex-row place-items-center">
            <i class="fal fa-calendar fa-fw mr-2"></i>
            <input
              :id="'dob' + cid"
              class="my-input w-8"
              :value="inputValue"
              v-on="inputEvents"
            />
          </div>
        </template>
      </date-picker>

      <div class="group flex flex-grow flex-col">
        <label :for="'licenseno' + cid" class="my-label"
          >License #</label
        >
        <input
          :id="'licenseno' + cid"
          v-model="customerdata.licenseno"
          maxlength="70"
          type="text"
          class="my-input"
        />
      </div>

      <date-picker
        v-model="licenseexpires"
        :min-date="new Date()"
        :update-on-input="false"
        class="group flex flex-grow flex-col"
      >
        <template #default="{ inputValue, inputEvents }">
          <label :for="'licexp' + cid" class="my-label"
            >License Expiry</label
          >
          <div class="flex flex-row place-items-center">
            <i class="form-i fal fa-calendar fa-fw mr-2"></i>
            <input
              :id="'licexp' + cid"
              class="my-input w-8"
              :value="inputValue"
              v-on="inputEvents"
            />
          </div>
        </template>
      </date-picker>
      <div class="group flex flex-grow flex-col">
        <label :for="'licenseissued' + cid" class="my-label"
          >License Issued In</label
        >
        <select
          :id="'licenseissued' + cid"
          v-model="customerdata.licenseissued"
          class="my-input"
        >
          <option
            v-for="country in countries"
            :key="country.id"
            :value="country.country"
          >
            {{ country.country }}
          </option>
        </select>
      </div>

      <div class="group flex flex-grow flex-col">
        <label :for="'address' + cid" class="my-label"
          >Street Address</label
        >
        <input
          :id="'address' + cid"
          v-model="customerdata.address"
          maxlength="80"
          type="text"
          class="my-input"
        />
      </div>
      <div class="group flex flex-grow flex-col">
        <label :for="'city' + cid" class="my-label">City</label>
        <input
          :id="'city' + cid"
          v-model="customerdata.city"
          maxlength="50"
          type="text"
          class="my-input"
        />
      </div>
      <div class="group flex flex-col">
        <label :for="'state' + cid" class="my-label">State</label>
        <input
          :id="'state' + cid"
          v-model="customerdata.state"
          maxlength="30"
          type="text"
          class="my-input"
        />
      </div>
      <div class="group flex flex-col">
        <label :for="'country' + cid" class="my-label"
          >Country</label
        >
        <select
          :id="'country' + cid"
          v-model="customerdata.countryid"
          class="my-input"
        >
          <option
            v-for="country in countries"
            :key="country.id"
            :value="country.id"
          >
            {{ country.country }}
          </option>
        </select>
      </div>
      <div class="group flex flex-grow flex-col md:mb-0">
        <label :for="'postcode' + cid" class="my-label"
          >Postcode</label
        >
        <input
          :id="'postcode' + cid"
          v-model="customerdata.postcode"
          maxlength="10"
          type="text"
          class="my-input"
        />
      </div>

      <div class="mt-auto grid h-8 grid-cols-2 gap-3">
        <button
          v-if="!newDriver && !isPrimary"
          class="btn-red"
          @click="deleteExtraDriver(-customerdata.customerid)"
        >
          Delete Driver <i class="fas fa-trash-can-xmark"></i>
        </button>
        <button
          v-if="!isPrimary"
          class="btn-green col-start-2"
          @click="addExtraDriver(customerdata.customerid)"
        >
          {{ !newDriver ? "Update" : "Add" }}
          <i class="far fa-cloud-upload"></i>
        </button>
        <button
          v-if="isPrimary"
          class="btn-green col-start-2"
          @click="editBooking()"
        >
          Update <i class="far fa-cloud-upload"></i>
        </button>
      </div>
    </div>
    
    <div class="my-10" v-if="!newDriver">
      <p  class="my-3 text-xl font-bold">Document Uploads</p>
      <modify-uploads
        @update-section-status="uploadMissing = $event"
        :cid="customer.customerid"
      ></modify-uploads>
    </div>
    
    <div class="" v-if="!newDriver">
      <p  class="my-3 text-xl font-bold">E-signature</p>
      <p class="italic text-sm text-gray-600">Please read and sign each required section using your mouse or touch-screen. Click save when you are finished.</p>
      <signature-section
        @update-section-status="signatureMissing = $event"
        :cid="customer.customerid"
      ></signature-section>
    </div>
  </div>
</template>

<script>
import SignatureSection from "@/components/SignatureSection.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import ModifyUploads from "@/components/ModifyUploads.vue";
import "v-calendar/dist/style.css";
import Mixins from "@/Mixins";
export default {
  components: {
    LoadingOverlay,
    ModifyUploads,
    SignatureSection,
  },

  mixins: [Mixins],

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    newDriver: {
      type: Boolean,
      default: false,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    customer: {
      type: Object,
      default() {
        return {
          customerid: 0,
          firstname: "",
          lastname: "",
          dateofbirth: "",
          email: "",
          phone: "",
          mobile: "",
          address: "",
          city: "",
          state: "",
          postcode: "",
          countryid: 7,
          country: "Australia",
          licenseno: "",
          licenseexpires: "",
          licenseissued: "Australia",
        };
      },
    },
  },
  emits: ["update", "actionRequired"],

  data() {
    return {
      signatureMissing: "",
      uploadMissing: "",
      savingChanges: false,
      customerdata: {},
      dateofbirth: new Date(),
      licenseexpires: new Date(),
      months: [
        ["Jan", "01"],
        ["Feb", "02"],
        ["Mar", "03"],
        ["Apr", "04"],
        ["May", "05"],
        ["Jun", "06"],
        ["Jul", "07"],
        ["Aug", "08"],
        ["Sep", "09"],
        ["Oct", "10"],
        ["Nov", "11"],
        ["Dec", "12"],
      ],
    };
  },

  computed: {
    cid() {
      return this.$.vnode.key;
    },
    countries() {
      return this.$store.state.countries;
    },
    bookinginfo() {
      return this.$store.state.bookinginfo;
    },
    actionRequired() {
      return this.signatureMissing || this.uploadMissing;
    },
  },

  watch: {
    dateofbirth: function () {
      this.customerdata.dateofbirth =
        this.dateofbirth.toLocaleDateString("en-AU");
    },
    licenseexpires: function () {
      this.customerdata.licenseexpires =
        this.licenseexpires.toLocaleDateString("en-AU");
    },
    actionRequired: function (val) {
      this.$emit("actionRequired", val);
    },
  },
  mounted() {
    this.customerdata = JSON.parse(JSON.stringify(this.customer));
    if (this.newDriver == false) {
      if (this.customer.dateofbirth) {
        let dob = this.replaceMonth(this.customer.dateofbirth);
        dob = dob.split(" ");
        dob = new Date(dob[2], dob[1] - 1, dob[0]);
        this.dateofbirth = dob;
      } else {
        this.dateofbirth = new Date(2000, 0, 1);
      }
      if (this.customer.licenseexpires) {
        let exp = this.replaceMonth(this.customer.licenseexpires);
        exp = exp.split(" ");
        exp = new Date(exp[2], exp[1] - 1, exp[0]);
        this.licenseexpires = exp;
      } else {
        this.licenseexpires = new Date();
      }
    } else {
      this.dateofbirth = new Date(2000, 0, 1);
      this.licenseexpires = new Date();
    }
  },

  methods: {
    replaceMonth(str) {
      let newStr = str.replaceAll("/", " ");
      let list = this.months;
      list.forEach((el) => {
        newStr = newStr.replaceAll(el[0], el[1]);
      });
      return newStr;
    },

    addExtraDriver(id) {
      this.savingChanges = true;
      let params = {
        method: "extradriver",
        reservationref: this.$store.state.resref,
        customerid: id,
        customer: {
          ...this.customerdata,
        },
      };
      if (
        !this.customerdata.firstname ||
        !this.customerdata.lastname ||
        !this.customerdata.email
      ) {
        alert("please fill all required fields");
        this.savingChanges = false
        return;
      }
      Mixins.methods
        .postapiCall(params)
        .then((res) => {
          this.$emit("update");
          this.savingChanges = false;
        })
        .catch((err) => console.log(err));
    },
    deleteExtraDriver(id) {
      this.savingChanges = true;
      let params = {
        method: "extradriver",
        reservationref: this.$store.state.resref,
        customerid: id,
      };
      Mixins.methods
        .postapiCall(params)
        .then((res) => {
          this.$emit("update");
          this.savingChanges = false;
        })
        .catch((err) => console.log(err));
    },
    editBooking() {
      this.savingChanges = true;
      let ins = this.bookinginfo.extrafees.find(
        (el) => el.isinsurancefee == true
      ).extrafeeid;

      let params = {
        method: "editbooking",
        reservationref: this.bookinginfo.bookinginfo[0].reservationref,
        bookingtype: 2,
        insuranceid: ins,
        extrakmsid: this.bookinginfo.bookinginfo[0].kmcharges_id,
        numbertravelling: this.bookinginfo.bookinginfo[0].numbertravelling,
        customer: {
          ...this.customerdata,
        },
      };
      Mixins.methods.postapiCall(params).then((res) => {
        this.savingChanges = false;
        this.$emit("update");
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.my-input {
  padding: 0.35rem;
}
.my-label {
  @apply text-xs
}
</style>
