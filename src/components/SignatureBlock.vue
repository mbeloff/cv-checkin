<template>
  <div class="mb-2 flex flex-col gap-1 p-1">
    <div class="relative" v-if="showSig">
      <VueSignaturePad
        class="aspect-[4/1] max-w-[400px] rounded border border-orange-500"
        :ref="sigid"
        :options="{ onBegin }"
        :scaleToDevicePixelRatio="false"
      />
      <div
        class="absolute bottom-0 flex w-max items-center gap-2 rounded-bl rounded-tr border border-orange-500 bg-white px-1 text-xs text-orange-500"
      >
        <span> signature required</span>
        <i class="fas fa-warning"></i>
      </div>
    </div>

    <div class="relative" v-if="signature.pngsig">
      <div
        :id="sigid"
        src=""
        alt=""
        class="aspect-[4/1] max-w-[400px] rounded border border-green-500 bg-cover bg-no-repeat"
      ></div>
      <div
        class="absolute bottom-0 flex w-max items-center gap-2 rounded-bl rounded-tr border border-green-500 bg-white px-1 text-xs text-green-600"
      >
        <span> signed: {{ signature.signeddatetime }}</span>
        <i class="fas fa-check-circle"></i>
      </div>
    </div>

    <div v-if="started && !saved" class="flex gap-2">
      <button class="btn-green" @click="save">Save</button>
      <button class="btn-red" @click="clear">Clear</button>
    </div>
    <div class="text-xs text-gray-600">
      <p
        v-if="signature.signaturetemplateid == 0"
      >
        I hereby agree to the terms and conditions of
        <a class="text-blue-500" target="_blank" href="/CV-VRA.pdf" download
          >the Vehicle Rental Agreement</a
        >
        and any other terms and conditions that are attached.
      </p>
      <p
        v-else
        v-html="signature.signaturetemplatetext"
      ></p>
    </div>
  </div>
</template>
<script>
import Mixins from "@/Mixins.js";
export default {
  name: "SignatureBlock",
  mixins: [Mixins],
  emits: ["updateSignature"],
  props: {
    signature: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      started: false,
      saved: false,
    };
  },
  watch: {
    showSig: function (value) {
      this.$nextTick(function () {
        this.pad.resizeCanvas();
      });
    },
  },
  computed: {
    sigid() {
      let str =
        "c" +
        this.signature.customerid +
        "s" +
        this.signature.signaturetemplateid;
      return str;
    },
    pad() {
      return this.$refs[this.sigid];
    },
    showSig() {
      return !this.signature.issigned && !this.saved;
    },
  },
  mounted() {
    if (this.signature.issigned && this.signature.pngsig) {
      document.getElementById(this.sigid).style.backgroundImage =
        "url(data:image/png;base64," + this.signature.pngsig + ")";
    }
  },
  updated() {
    if (this.signature.issigned && this.signature.pngsig) {
      document.getElementById(this.sigid).style.backgroundImage =
        "url(data:image/png;base64," + this.signature.pngsig + ")";
    }
  },
  methods: {
    onBegin() {
      console.log("---started---");
      this.pad.resizeCanvas();
      this.started = true;
    },
    clear() {
      this.pad.clearSignature();
    },
    async save() {
      let isExtraDriver =
        this.$store.state.bookinginfo.customerinfo[0].customerid !=
        this.signature.customerid;
      const { isEmpty, data } = this.pad.saveSignature();
      console.log(isEmpty);
      console.log(data);
      let resized = await this.resizedataURL(data, 200, 50);

      let split = resized.split(",");
      let base64 = split[1];
      console.log(resized);
      let params = {
        method: "savesignature",
        reservationref: this.$store.state.resref,
        signaturetemplateid: this.signature.signaturetemplateid,
        signaturepng: base64,
        extradriverid: isExtraDriver ? this.signature.customerid : "",
      };
      if (!isEmpty) {
        Mixins.methods.postapiCall(params).then((res) => {
          console.log(res);
          if (res.results.savesignature == true) {
            console.log("signature saved successfully");
            this.$emit("updateSignature");
            this.saved = true;
          }
        });
      }
    },
    resizedataURL(datas, wantedWidth, wantedHeight) {
      return new Promise(async function (resolve, reject) {
        var img = document.createElement("img");
        img.onload = function () {
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = wantedWidth;
          canvas.height = wantedHeight;
          ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);
          var dataURI = canvas.toDataURL();

          resolve(dataURI);
        };
        img.src = datas;
      });
    },
  },
};
</script>
