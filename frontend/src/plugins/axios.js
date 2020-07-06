import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = "/api";
Vue.axios.defaults.headers.common = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json"
};

axios.interceptors.response.use(
    function(res) {
        // Do something with response data

        if (
            res.status === 401 &&
            ["UnauthorizedAccess", "InvalidToken"].indexOf(res.data.code) > -1
        ) {
            Vue.auth.logout({
                redirect: { name: "auth-login" }
            });
        }

        // System Error
        else if (res.status === 500) {
            Vue.router.push({ name: "error-500" });
        }

        return res;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);
