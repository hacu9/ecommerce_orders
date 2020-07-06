<template>
  <v-container>
    <v-tabs v-model="tab">
      <v-tab>Delivered</v-tab>
      <v-tab>In Progress</v-tab>
    </v-tabs>
    <v-skeleton-loader :loading="isViewLoading" transition="scale" group height="420" type="table">
      <v-card>
        <v-row style="background-color: #272727;" align="center">
          <v-col cols="12" xs="12" md="4">Orders</v-col>
          <v-col cols="12" xs="12" md="4">
            <v-text-field
              append-icon="mdi-magnify"
              label="Search"
              single-line
              v-model="search"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col class="text-right" cols="12" md="2" offset-md="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn @click="deleteMultiple" v-on="on" small fab color="error">
                  <v-icon dark>mdi-delete-sweep</v-icon>
                </v-btn>
              </template>
              <span>Delete multiple</span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-card-text>
          <v-data-table
            :loading="isViewLoading"
            :headers="headers"
            :items="activeItems"
            :search="search"
            :single-expand="true"
            show-expand
            :expanded.sync="expanded"
            show-select
            v-model="selected"
            ref="content"
          >
            <v-progress-linear slot="progress" color="blue darken-4" indeterminate></v-progress-linear>

            <template v-slot:item.status="{ item }">
              <v-chip
                :color="item.status ? 'success' : 'secondary'"
              >{{item.status ? 'Delivered' : 'Pending' }}</v-chip>
            </template>

            <template v-slot:item.total="{ item }">{{item.total.symbol}}{{item.total.amount}}</template>
            <template v-slot:item.created_at="{ item }">{{item.created_at|formatDate}}</template>

            <template v-slot:item.action="{ item }">
              <template>
                <v-icon
                  class="mr-2"
                  @click="
                                        $router.push({
                                            name: 'orders_show',
                                            params: { id: item.order_number }
                                        })
                                    "
                >mdi-text-box-search</v-icon>
              </template>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-row align="stretch">
                  <v-col
                    :key="product.id"
                    v-for="(product, index) in item.products"
                    cols="12"
                    md="4"
                  >
                    <v-card
                      class="mx-auto elevation-20"
                      color="primary"
                      dark
                      style="max-width: 400px;"
                    >
                      <v-row justify="space-between">
                        <v-col cols="12" md="7">
                          <v-card-title primary-title>
                            <div>
                              <div class="text-h6">{{product.name}}</div>
                              <div class="text-body-1">
                                Sold by<v-chip color="secondary">{{product.sold_by}}</v-chip>
                              </div>
                              {{product.price.symbol}}{{product.price.amount}}
                            </div>
                          </v-card-title>
                        </v-col>
                        <v-col cols="12" md="5">
                          <v-img
                            class="shrink ma-2"
                            contain
                            :src="`https://picsum.photos/300/300?image=${index}`"
                          ></v-img>
                        </v-col>
                      </v-row>
                      <v-divider dark></v-divider>
                      <v-card-actions class="pa-4">
                        Rate this product
                        <v-spacer></v-spacer>
                        <span class="grey--text text--lighten-2 caption mr-2">({{ product.rating }})</span>
                        <v-rating
                          v-model="product.rating"
                          background-color="white"
                          color="yellow accent-4"
                          dense
                          half-increments
                          hover
                          size="18"
                        ></v-rating>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-skeleton-loader>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import filterMixin from "@/mixins/filters";
export default {
  mixins: [filterMixin],
  components: {},
  data() {
    return {
      tab: 0,
      headers: [
        {
          text: "Order Number",
          value: "order_number"
        },
        {
          text: "Status",
          value: "status"
        },
        {
          text: "Total",
          value: "total"
        },
        {
          text: "Ordered",
          value: "created_at"
        },
        {
          text: "Acciones",
          value: "action",
          sortable: false,
          filtrable: false
        }
      ],
      search: null,
      items: [],
      selected: [],
      expanded: []
    };
  },
  created() {
    this.initialize();
  },
  computed: {
    activeItems() {
      return this.items.filter(x => x.status == this.status).length > 0
        ? this.items.filter(x => x.status == this.status)
        : [];
    },
    ...mapState(["isViewLoading"]),
    status() {
      return this.tab == 0 ? 1 : 0; //delivered or pending
    }
  },
  methods: {
    initialize() {
      this.$store.commit("setViewLoading", true);
      this.axios.get("/orders").then(resp => {
        this.items = resp.data;
        this.$store.commit("setViewLoading", false);
      });
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      this.items.splice(index, 1);
    },
    async deleteMultiple() {
      if (!this.selected.length > 0) {
        this.$store.commit("showSnackbar", {
          text: "Select at least one item",
          color: "error"
        });
        return;
      }
      let selected = this.selected;
      for (let item of selected) {
        await this.deleteItem(item);
      }

      this.$store.commit("showSnackbar", {
        text: "Deleted Orders",
        color: "success"
      });
    }
  }
};
</script>

<style></style>
