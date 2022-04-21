<template>
  <div
    class="w-full md:w-max grid grid-cols-1 gap-1 rounded bg-white md:grid-cols-3"
  >
    <loading-overlay v-if="loading"></loading-overlay>
    <div
      v-for="(doc, i) in doclist"
      :key="i"
      :class="{
        'border-green-500': doc.isuploaded,
        'border-orange-500': !doc.isuploaded,
      }"
      class="relative mx-auto flex h-full w-full max-w-full cursor-pointer flex-col rounded border bg-gray-200 md:w-56 hover:ring-2"
      @click="handleDoc(doc)"
    >
      <div class="flex items-center justify-between pr-2">
        <p class="rounded-t px-2 py-1 font-bold">
          {{ docTitle(doc.title) }}
        </p>
        <div
          v-show="doc.isuploaded == 0"
          class="absolute top-1 right-1 rounded border border-green-500 bg-white px-2 text-sm text-green-500"
        >
          upload
        </div>
        <div
          v-show="doc.isuploaded"
          class="absolute top-1 right-1 rounded border border-green-500 bg-white px-2 text-sm"
        >
          <i class="fas fa-trash-can-xmark"></i>
        </div>
      </div>

      <div class="mb-1 flex flex-1 rounded border text-left text-sm md:mb-0">
        <div class="flex flex-grow flex-col justify-between pb-5">
          <p class="px-2">{{ replaceDocText(doc.title) }}</p>

          <div
            v-if="doc.isuploaded"
            class="absolute -bottom-px -left-px flex w-max items-center gap-2 rounded-bl rounded-tr border border-green-500 bg-white px-1 text-xs text-green-500"
          >
            <span>uploaded</span>
            <i class="fas fa-check-circle"></i>
          </div>
          <div
            v-else
            class="absolute -bottom-px -left-px flex w-max items-center gap-2 rounded-bl rounded-tr border border-orange-500 bg-white px-1 text-xs text-orange-500"
          >
            <span>required</span>
            <i class="fas fa-warning"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mixins from "@/Mixins";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
export default {
  mixins: [Mixins],
  components: { LoadingOverlay },
  props: {
    cid: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      doclist: [],
    };
  },
  beforeMount() {
    this.getDocumentList();
  },
  watch: {
    doclist: function (val) {
      let missing = false;
      val.forEach((el) => {
        if (!el.isuploaded) {
          missing = true;
        }
      });
      this.$emit("update-section-status", missing);
    },
  },
  methods: {
    handleDoc(doc) {
      if (doc.isuploaded == 0) {
        this.openCloudinaryWidget(doc);
        return;
      }
      if (confirm("You are about to delete this document. Are you sure?")) {
        this.deleteUpload(doc.documentlinkid);
      }
    },
    openCloudinaryWidget(doc) {
      let res;
      window.cloudinary.openUploadWidget(
        {
          cloud_name: "allridey",
          api_key: import.meta.env.CLOUD_KEY,
          upload_preset: "kdmxe571",
          sources: ["camera", "local"],
          default_source: "local",
          multiple: doc.allowmultiple,
          max_image_width: doc.maximagewidth,
          folder: "rcm_uploads/" + this.$store.state.resref,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            res = result.info;
            this.processUploadResult(doc, res);
          }
        }
      );
    },
    processUploadResult(doc, res) {
      this.loading = true;
      let params = {
        method: "storeupload",
        documentlinksetupid: doc.documentlinksetupid,
        url: res.url,
        doctype: res.resource_type,
        source: "post-booking",
        reservationref: this.$store.state.resref,
        vehicleid: doc.vehicleid,
        customerid: doc.customerid,
        storageprovider: "cloudinary",
        sequencenumber: doc.seqno,
      };
      Mixins.methods.postapiCall(params).then((res) => {
        this.getDocumentList();
      });
    },
    getDocumentList() {
      this.loading = true;
      let method = {
        method: "documentlist",
        workflowcode: "checkin",
        reservationref: this.$store.state.resref,
      };
      Mixins.methods.postapiCall(method).then((res) => {
        let newdoclist = res.results.filter((el) => el.customerid == this.cid);

        this.doclist = newdoclist;
        this.loading = false;
      });
    },
    deleteUpload(id) {
      this.loading = true;
      let method = {
        method: "editupload",
        reservationref: this.$store.state.resref,
        documentlinkid: -id,
      };
      Mixins.methods.postapiCall(method).then((res) => {
        this.getDocumentList();
      });
    },
    iconClass(doc) {
      return {
        "opacity-20": doc.isuploaded == 1,
        "fa-id-card":
          doc.title == "Take a photo of the front of your driving license",
        "fa-image-user": doc.title == "Take a Selfie",
        "fa-credit-card-blank fa-flip-vertical":
          doc.title == "Take a photo of the back of your driving license",
      };
    },
    replaceDocText(text) {
      if (text == "Take a photo of the front of your driving license") {
        return "Take a photo of the front of your driver's license";
      }
      if (text == "Take a Selfie") {
        return "Take a selfie while holding your driver's license";
      }
      if (text == "Take a photo of the back of your driving license") {
        return "Take a photo of the back of your driver's license";
      }
    },
    docTitle(text) {
      if (text == "Take a photo of the front of your driving license") {
        return "License Front";
      }
      if (text == "Take a Selfie") {
        return "Selfie";
      }
      if (text == "Take a photo of the back of your driving license") {
        return "License Back";
      }
    },
  },
};
</script>
<style lang="postcss"></style>
