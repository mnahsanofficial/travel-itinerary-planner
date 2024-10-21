<template>
  <div class="p-fluid">
    <h3>{{ isEditing ? 'Edit Itinerary' : 'Add New Itinerary' }}</h3>
    <form @submit.prevent="submitForm" ref="formRef">
      <div class="p-field">
        <label for="title">Title</label>
        <InputText
          v-model="itinerary.title"
          id="title"
          placeholder="Enter Title"
          required
        />
      </div>

      <!-- Location Input Field with Autocomplete -->
      <div class="p-field">
        <label for="location">Location</label>
        <AutoComplete
          v-model="itinerary.location"
          id="location"
          :suggestions="locationSuggestions"
          field="description"
          placeholder="Enter Location"
          @complete="fetchLocationSuggestions"
          required
        />
      </div>

      <!-- Date Picker -->
      <div class="p-field">
        <label for="date">Date</label>
        <Calendar
          v-model="itinerary.date"
          id="date"
          dateFormat="yy-mm-dd"
          showIcon
          required
        />
      </div>

      <!-- Description -->
      <div class="p-field">
        <label for="description">Description</label>
        <Textarea
          v-model="itinerary.description"
          id="description"
          
          rows="5" cols="30"
         
        />
      </div>

      <Button label="Submit" class="p-button-success" type="submit">
        {{ isEditing ? 'Update' : 'Add' }}
      </Button>
    </form>
  </div>
</template>

<script>
import AutoComplete  from 'primevue/autocomplete';
import  InputText  from 'primevue/inputtext';
import  Calendar  from 'primevue/calendar';

import Textarea from 'primevue/textarea';

import  Button  from 'primevue/button';
import axios from 'axios';

export default {
  components: {
    AutoComplete,
    InputText,
    Calendar,
    Textarea,
    Button,
  },
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
    };
  },
  methods: {
    // Fetch location suggestions based on user input
    async fetchLocationSuggestions(event) {
      const query = event.query;
      if (query.length < 3) {
        this.locationSuggestions = [];
        return;
      }

      const apiKey = process.env.VUE_APP_LocationIQ_API; // Replace with your LocationIQ API key
      const url = `https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${query}&format=json`;

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
.p-fluid .p-field {
  margin-bottom: 1rem;
}
</style>
