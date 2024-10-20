<template>
    <v-container>
      <h2>Itineraries</h2>
      <v-list dense>
        <v-list-item
          v-for="(itinerary, index) in itineraries"
          :key="index"
          class="mb-4"
        >
          <v-card outlined>
            <v-card-title class="d-flex justify-space-between align-center">
              <div>
                <strong>{{ itinerary.title }}</strong> - {{ itinerary.location }} ({{ itinerary.date }})
              </div>
              <div>
                <v-btn icon @click="editItinerary(index)" color="primary">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteItinerary(index)" color="red">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-card-title>
            <v-card-text>{{ itinerary.description }}</v-card-text>
          </v-card>
        </v-list-item>
      </v-list>
    </v-container>
  </template>
  
  <script>
  import { store } from '../store';
  
  export default {
    data() {
      return {
        itineraries: store.itineraries,
      };
    },
    methods: {
      deleteItinerary(index) {
        store.removeItinerary(index);
      },
      editItinerary(index) {
        this.$emit('edit', index);
      },
    },
  };
  </script>
  
  <style scoped>
  .v-list-item {
    margin-bottom: 16px;
  }
  </style>
  