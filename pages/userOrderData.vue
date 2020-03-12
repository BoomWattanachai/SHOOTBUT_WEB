<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="searchA"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <v-spacer></v-spacer>
          <v-text-field
            v-model="searchA"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-sort-alphabetical-variant"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{
                item.name
              }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content>{{ key }}:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item[key.toLowerCase()]
                  }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>

    <template>
      <v-container>
        <v-row justify="center">
          <v-expansion-panels popout>
            <v-expansion-panel
              v-for="(message, i) in messages"
              :key="i"
              hide-actions
            >
              <v-expansion-panel-header>
                <v-row align="center" class="spacer" no-gutters>
                  <v-col cols="4" sm="2" md="1">
                    <v-avatar size="36px"> </v-avatar>
                  </v-col>

                  <v-col class="hidden-xs-only" sm="5" md="3">
                    <strong v-html="message.productId"></strong>
                  </v-col>

                  <v-col class="text-no-wrap" cols="5" sm="2">
                    <strong v-html="message.categoryId"></strong>
                  </v-col>

                  <v-col class="text-no-wrap" cols="5" sm="2">
                    <strong v-html="message.category.categoryName"></strong>
                  </v-col>

                  <v-col class="text-no-wrap" cols="5" sm="2">
                    <strong v-html="message.categoryId"></strong>
                  </v-col>
                  <!--                   
                  <v-col class="text-no-wrap" cols="5" sm="3">
                    <strong v-html="message.testA"></strong>
                  </v-col>

                  <v-col class="text-no-wrap" cols="5" sm="3">
                    <strong v-html="message.testB"></strong>
                  </v-col> -->
                </v-row>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-divider></v-divider>
                <v-card-text v-text="lorem"></v-card-text>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-container>
    </template>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import * as aaa from '@/store/authenModule/apiService'
export default Vue.extend({
  data() {
    return {
      //   itemsPerPageArray: [4, 8, 12],
      messages: [],
      lorem: 'aaaaaaa',
      searchA: '',
      filter: {},
      sortDesc: false,
      //   page: 1,
      itemsPerPage: 12,
      sortBy: 'name',
      keys: [
        'Name',
        'Calories',
        'Fat',
        'Carbs',
        'Protein',
        'Sodium',
        'Calcium',
        'Iron'
      ],
      items: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        }
      ]
    }
  },
  computed: {
    // numberOfPages() {
    //   return Math.ceil(this.items.length / this.itemsPerPage)
    // },

    // sortBy
    filteredKeys() {
      return this.keys.filter((key) => key !== 'Name')
    }
  },
  async created() {
    await aaa.getUserList().then((res: any) => {
      this.messages = res
      console.log(res)
    })
  },
  methods: {
    // async send() {
    //   await aaa
    //     .submit({
    //       orderId: this.orderId,
    //       addressId: this.addressId
    //     })
    //     .then((res: any) => {
    //       console.log(res)
    //     })
    // }
    // nextPage() {
    //   if (this.page + 1 <= this.numberOfPages) this.page += 1
    // },
    // formerPage() {
    //   if (this.page - 1 >= 1) this.page -= 1
    // },
    // updateItemsPerPage(number) {
    //   this.itemsPerPage = number
    // }
  }
})
</script>
