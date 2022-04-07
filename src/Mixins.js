import store from "./store.js";
export default {
  methods: {
    getToken() {
      let Host = import.meta.env.VITE_HOST;
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };
      fetch(Host + "/.netlify/functions/getToken", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          const res = JSON.parse(result);
          store.dispatch("token", res.access_token);
          store.dispatch("tokenExp", res[".expires"]);
        })
        .catch((error) => console.log("error", error));
    },

    async postapiCall(method) {
      let token = store.state.token;
      let expires = new Date(store.state.tokenExp).getTime();
      let now = new Date().getTime();
      if (expires < now) {
        console.log("refreshing token");
        this.getToken();
      }
      var requestOptions = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(method),
      };
      return await fetch(
        "https://api.rentalcarmanager.com/v32/api",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          return JSON.parse(result);
        });
    },
  },
};
