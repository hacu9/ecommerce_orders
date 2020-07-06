<template>
  <v-container>
    <v-tabs fixed-tabs v-model="tab">
      <v-tab>Pendents</v-tab>
      <v-tab>Asignades</v-tab>
      <v-tab>Completades</v-tab>
    </v-tabs>
    <v-skeleton-loader :loading="isViewLoading" transition="scale" group height="420" type="table">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Orders</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            :label="quickSearch"
            single-line
            v-model="search"
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn @click="deleteMultiple" v-on="on" small fab color="error">
                  <v-icon dark>delete_sweep</v-icon>
                </v-btn>
              </template>
              <span>Borrar Multiples</span>
            </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-data-table
            :loading="isViewLoading"
            :headers="headers"
            :items="activeItems"
            :search="search"
            show-select
            v-model="selected"
            ref="content"
          >
            <v-progress-linear slot="progress" color="blue darken-4" indeterminate></v-progress-linear>
            <template v-slot:item.picture="{ item }">
              <v-avatar class="profile">
                <v-img :src="item.picture"></v-img>
              </v-avatar>
            </template>
            <template v-slot:item.action="{ item }">
              <template v-if="$auth.check('crud tasks')">
                <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                <v-icon
                  small
                  class="mr-2"
                  @click="
                                        $router.push({
                                            name: 'tasks_show',
                                            params: { id: item.id }
                                        })
                                    "
                >remove_red_eye</v-icon>
              </template>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tab: 0,
      headers: [
        {
          text: "Pacient",
          value: "patient.full_name"
        },
        {
          text: "Inici",
          value: "start_date"
        },
        {
          text: "Finalització",
          value: "end_date"
        },
        {
          text: "Treballador",
          value: "worker"
        },
        {
          text: "Tipus de visita",
          value: "visit_type"
        },
        {
          text: "Descripció",
          value: "description"
        },
        {
          text: "Creado",
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
      selected:[]
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
    // status() {
    //   if (this.tab == 0) {
    //     return "pendents";
    //   } else if (this.tab == 1) {
    //     return "asignades";
    //   } else if (this.tab == 2) {
    //     return "completades";
    //   }
    // }
  },
  methods: {
    initialize() {
      this.$store.commit("setViewLoading", true);
      this.axios.get("/orders/2").then(resp => {
        this.items = resp.data;
        this.$store.commit("setViewLoading", false);
      });
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      if (
        confirm(
          `Estás seguro de que deseas eliminar este proveidor? ${item.name}`
        )
      ) {
        // xiboapi.delete(`/library/${item.mediaId}`).then(resp => {
        this.axios
          .delete(`/tasks/${item.id}`)
          .then(() => {
            this.items.splice(index, 1);
          })
          .catch(() => {
            alert("No se puede eliminar el proveidor");
          });
        // });
      }
    },
    async deleteMultiple() {
      if (!this.selected.length > 0) {
        this.$store.commit("showSnackbar", {
          text: "Elije al menos uno",
          color: "error"
        });
        return;
      }
      let selected = this.selected;
      for (let item of selected) {
        await this.deleteItem(item);
      }

      this.$store.commit("showSnackbar", {
        text: "Realizado con excito",
        color: "success"
      });
    }
  }
};
</script>

<style></style>
