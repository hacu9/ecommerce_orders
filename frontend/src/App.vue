<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="https://garagroup.com/wp-content/uploads/2019/03/Gara-Group.png"
                    transition="scale-transition"
                    width="40"
                />
            </div>

            <v-spacer></v-spacer>

            <v-btn @click="$router.push({ name: 'orders' })" text>
                <span class="mr-2">Orders</span>
                <v-icon>mdi-text-box-multiple</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>

        <v-snackbar
            bottom
            v-model="snackbar.show"
            :timeout="snackbar.timeout"
            :multi-line="snackbar.multiline === true"
            :color="snackbar.color"
        >
            {{ snackbar.text }}
            <template v-slot:action="{ attrs }">
                <v-btn dark text v-bind="attrs" @click="closeSnackbar">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    name: "App",
    computed: {
        ...mapState(["snackbar", "isLoading", "isDark"])
    },
    created() {},
    methods: {
        ...mapMutations(["closeSnackbar"])
    }
};
</script>
