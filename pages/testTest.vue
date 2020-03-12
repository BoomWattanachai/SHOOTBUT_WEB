<template>
  <v-container>
    <template>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="searchByOrderNumber"
                label="Search by Order Number"
                outlined
                shaped
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="searchByUserEmail"
                label="Search by User Email"
                outlined
                shaped
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>

    <v-row justify="center">
      <v-expansion-panels popout>
        <v-expansion-panel
          v-for="(message, i) in filteredMessage"
          :key="i"
          hide-actions
        >
          <v-expansion-panel-header>
            <v-row align="center" class="spacer" no-gutters>
              <v-col cols="4" sm="2" md="1">
                <v-avatar size="36px"> </v-avatar>
              </v-col>

              <v-col class="hidden-xs-only" sm="5" md="3">
                <h3 v-html="message.productId"></h3>
              </v-col>

              <v-col class="text-no-wrap" cols="5" sm="2">
                <h3 v-html="message.categoryId"></h3>
              </v-col>

              <v-col class="text-no-wrap" cols="5" sm="2">
                <h3 v-html="message.category.categoryName"></h3>
              </v-col>

              <v-col class="text-no-wrap" cols="5" sm="2">
                <h3 v-html="message.categoryId"></h3>
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
            <h3>abc</h3>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
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
      searchByOrderNumber: '',
      searchByUserEmail: ''
    }
  },
  computed: {
    filteredMessage() {
      return this.messages.filter((message) => {
        return (
          message.productId
            .toLowerCase()
            .match(this.searchByOrderNumber.toLowerCase()) &&
          message.category.categoryName
            .toLowerCase()
            .match(this.searchByUserEmail.toLowerCase())
        )
      })
    }
  },
  async created() {
    await aaa.getPost().then((res: any) => {
      this.messages = res
      console.log(res)
    })
  },
  methods: {}
})
</script>
