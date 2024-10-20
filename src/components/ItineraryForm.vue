<template>
    <v-container>
      <h3>{{ isEditing ? 'Edit Itinerary' : 'Add New Itinerary' }}</h3>
      <v-form @submit.prevent="submitForm" ref="formRef">
        <v-text-field
          v-model="itinerary.title"
          label="Title"
          outlined
          required
        ></v-text-field>
  
        <!-- Location Input Field with Autocomplete -->
        <v-autocomplete
          v-model="itinerary.location"
          :items="locationSuggestions"
          label="Location"
          item-text="description"
          item-value="description"
          outlined
          clearable
          @input="fetchLocationSuggestions"
          required
        ></v-autocomplete>
  
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="itinerary.date"
              label="Date"
              readonly
              v-bind="attrs"
              v-on="on"
              outlined
              required
            ></v-text-field>
          </template>
          <v-date-picker v-model="itinerary.date" no-title @input="menu = false"></v-date-picker>
        </v-menu>
  
        <v-textarea
          v-model="itinerary.description"
          label="Description"
          outlined
          rows="3"
        ></v-textarea>
  
        <v-btn color="primary" type="submit">{{ isEditing ? 'Update' : 'Add' }}</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    props: {
      initialItinerary: {
        type: Object,
        default: () => ({ title: '', location: '', date: '', description: '' }),
      },
      isEditing: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        itinerary: { ...this.initialItinerary },
        locationSuggestions: [],
        menu: false,
      };
    },
    methods: {
      // Fetch location suggestions based on user input
      async fetchLocationSuggestions() {
        if (this.itinerary.location.length < 3) {
          this.locationSuggestions = [];
          return;
        }
  
        const apiKey = process.env.VUE_APP_LocationIQ_API; // Replace with your LocationIQ API key
        const url = `https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${this.itinerary.location}&format=json`;
  
        try {
          const response = await axios.get(url);
          this.locationSuggestions = response.data.map((suggestion) => ({
            description: suggestion.display_name,
          }));
        } catch (error) {
          console.error('Error fetching location suggestions:', error);
          this.locationSuggestions = [];
        }
      },
  
      // Submit the form
      submitForm() {
        this.$emit('submit', { ...this.itinerary });
        this.resetForm();
      },
  
      // Reset the form after submission
      resetForm() {
        this.itinerary = { title: '', location: '', date: '', description: '' };
        this.$refs.formRef.resetValidation();
      },
    },
  };
  </script>
  
  <style scoped>
  .v-autocomplete {
    max-height: 200px;
    overflow-y: auto;
  }
  </style>
  