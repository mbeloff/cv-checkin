<template>
  <div
    class="container relative mx-auto grid grid-cols-1 gap-1 rounded bg-white md:grid-cols-3"
  >
    <loading-overlay v-if="loading"></loading-overlay>
    <div v-for="(doc, i) in doclist" :key="i" class="flex h-full flex-col">
      <p class="rounded-t bg-gray-300 px-2 py-1 font-bold text-gray-600">
        {{ docTitle(doc.title) }}
      </p>
      <div
        class="mb-1 flex flex-1 rounded border bg-gray-200 p-1 text-left text-sm md:mb-0"
      >
        <div class="flex flex-grow flex-col justify-between p-2">
          <div>
            <!-- <p class="font-bold">
              {{ doc.customerlastname + ", " + doc.customerfirstname }}
            </p> -->
            <p>{{ replaceDocText(doc.title) }}</p>
          </div>

          <span v-if="doc.isuploaded" class="text-sm font-normal text-green-600"
            ><i class="far fa-check"></i> uploaded</span
          >
        </div>

        <div
          class="grid flex-shrink items-center rounded bg-gray-100 p-2 text-center"
          @click="handleDoc(doc)"
        >
          <span class="fa-stack mx-auto text-lg">
            <i
              :class="iconClass(doc)"
              class="far fa-stack-2x text-gray-500"
            ></i>
            <i
              :class="{ 'opacity-0': doc.isuploaded == 0 }"
              class="fas fa-check fa-stack-1x text-green-500"
            ></i>
          </span>
          <button v-show="doc.isuploaded == 0" class="btn-green mt-1">
            upload
          </button>
          <button v-show="doc.isuploaded" class="btn-red mt-1">delete</button>
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
      doclist: {},
    };
  },
  beforeMount() {
    this.getDocumentList();
  },
  methods: {
    handleDoc(doc) {
      if (doc.isuploaded == 0) {
        this.openCloudinaryWidget(doc);
        return;
      }
      this.deleteUpload(doc.documentlinkid);
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
        console.log("upload result: ", res);
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
        console.log(res);
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
        console.log(res);
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
