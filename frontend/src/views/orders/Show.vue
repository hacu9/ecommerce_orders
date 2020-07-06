<template>
  <v-container>
    <v-row>
           <v-col cols="12" md="4">
        <v-card class="mx-auto elevation-20" color="primary">
          <v-card-title>
            <h3>Order {{$route.params.id}} Details</h3>
            <v-chip
            class="ml-2"
              :color="item.status ? 'success' : 'secondary'"
            >{{item.status ? 'Delivered' : 'Pending' }}</v-chip>
          </v-card-title>
          <v-card-text>
            <v-row align="center" justify="space-between">
              <v-col cols="12" md="6">
                <h3>Shipping Address</h3>
                {{item.shipping_address.street_address}}
                {{item.shipping_address.locality}}
                {{item.shipping_address.region}}
                {{item.shipping_address.postal_code}}
              </v-col>
              <v-col cols="12" md="6">
                <h3>Payment Method</h3>
                {{item.payment_method}}
              </v-col>
              <v-col cols="12" md="6">
                <h3>Paid on</h3>
                {{item.paid_at|formatDate}}
              </v-col>
              <v-col cols="12" md="6">
                <h3>Local Pickup</h3>
                {{item.local_pickup ? 'Yes' : 'No'}}
              </v-col>
              <v-col cols="12" md="12">
                <h3>Summary</h3>
                <v-row>
                  <v-col cols="12" md="6" class>Sub total</v-col>
                  <v-col cols="12" md="6" class>{{item.sub_total.symbol}}{{item.sub_total.amount}}</v-col>
                  <v-col cols="12" md="6" class>Shipping</v-col>
                  <v-col cols="12" md="6" class>{{item.shipping.symbol}}{{item.shipping.amount}}</v-col>
                  <v-col cols="12" md="6" class="text-h6">Total</v-col>
                  <v-col cols="12" md="6" class="text-h6">{{item.total.symbol}}{{item.total.amount}}</v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="order-md-first" cols="12" md="8">
        <v-card class="mx-auto" color="transparent">
          <v-card-text>
            <v-data-iterator
              :items="item.products"
              :items-per-page.sync="itemsPerPage"
              :page="page"
              :search="search"
            >
              <template v-slot:header>
                <v-toolbar color="primary" class="mb-1">
                  <v-text-field
                    v-model="search"
                    clearable
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    label="Search"
                  ></v-text-field>
                  <template v-if="$vuetify.breakpoint.mdAndUp">
                    <!-- <v-spacer></v-spacer>
                    <v-select
                      v-model="sortBy"
                      flat
                      solo-inverted
                      hide-details
                      :items="keys"
                      prepend-inner-icon="mdi-magnify"
                      label="Sort by"
                    ></v-select>
                    <v-spacer></v-spacer> -->
                    <!-- <v-btn-toggle v-model="sortDesc" mandatory>
                      <v-btn large depressed color="blue" :value="false">
                        <v-icon>mdi-arrow-up</v-icon>
                      </v-btn>
                      <v-btn large depressed color="blue" :value="true">
                        <v-icon>mdi-arrow-down</v-icon>
                      </v-btn>
                    </v-btn-toggle> -->
                  </template>
                </v-toolbar>
              </template>

              <template v-slot:default="props">
                <v-row>
                  <v-col v-for="(item,index) in props.items" :key="item.name" cols="12" sm="12">
                    <v-card class="elevation-20" color="primary">
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" md="4">
                            <v-img
                              class="shrink ma-2"
                              contain
                              :src="`https://picsum.photos/300/300?image=${index}`"
                            ></v-img>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-card-title class="subheading font-weight-bold pa-0">{{ item.name }}</v-card-title>
                            Sold by <v-chip class="secondary">{{ item.sold_by }}</v-chip>
                            <br><br>
                            <div class="text-h5">{{item.quantity}} *  {{item.price.symbol}}{{item.price.amount}}  =  {{item.price.symbol}}{{item.price.amount * item.quantity}}</div>
                            <v-btn color="secondary" class="mt-5 text-center">Buy again</v-btn>
                          </v-col>
                        </v-row>
                      </v-card-text>
                       <v-divider dark></v-divider>
                      <v-card-actions class="pa-4">
                        Rate this product
                        <v-spacer></v-spacer>
                        <span class="grey--text text--lighten-2 caption mr-2">({{ item.rating }})</span>
                        <v-rating
                          v-model="item.rating"
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
              </template>


            </v-data-iterator>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      item: {},
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: [
        "Name",
        "Calories",
        "Fat",
        "Carbs",
        "Protein",
        "Sodium",
        "Calcium",
        "Iron"
      ]
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.axios.get(`orders/${this.$route.params.id}`).then(resp => {
        this.item = resp.data;
      });
    }
  }
};
</script>

<style scoped>
.v-data-footer{
    background:#2196f3 !important;
}
</style>
