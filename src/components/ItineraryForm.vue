<template>
  <div class="form-container">
    <h3>{{ isEditing ? 'Edit Itinerary' : 'Add New Itinerary' }}</h3>
    <form @submit.prevent="submitForm" ref="formRef">
      <div class="p-field">
        <label for="title">Title</label>
        <InputText
          v-model="itinerary.title"
          id="title"
          placeholder="Enter Title"
          required
          class="p-inputtext-lg custom-input"
        />
      </div>

      <!-- Location Input Field with Autocomplete -->
      <div class="p-field">
        <label for="location">Location</label>
        <AutoComplete
          v-model="itinerary.location"
          id="location"
          :suggestions="locationSuggestions"
          placeholder="Search Location"
          @complete="fetchLocationSuggestions"
          required
          class="p-inputtext-lg custom-input"
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
          class="p-inputtext-lg custom-input"
          placeholder="Select a date"
          required
        />
      </div>

      <!-- Description -->
      <div class="p-field">
        <label for="description">Description</label>
        <Textarea
          v-model="itinerary.description"
          id="description"
          rows="5"
          cols="30"
          placeholder="Enter Description"
          autoResize
          class="p-inputtext-lg custom-input"
        />
      </div>

      <div class="p-field p-mt-3">
        <Button
          label=""
          class="p-button-success p-button-lg submit-button"
          type="submit"
        > {{ isEditing ? 'Update' : 'Add' }}</Button>
      </div>
    </form>
  </div>
</template>

<script>
import AutoComplete from 'primevue/autocomplete';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
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
      isSubmitting: false,
    };
  },
  methods: {
    async fetchLocationSuggestions(event) {
      const query = event.query;
      if (query.length < 3) {
        this.locationSuggestions = [];
        return;
      }

      const apiKey = process.env.VUE_APP_LocationIQ_API;
      const url = `https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${query}&format=json`;

      try {
        const response = await axios.get(url);
        this.locationSuggestions = response.data.map((suggestion) => {
          // Extract the last two components from the display_name
          const parts = suggestion.display_name.split(',').map(part => part.trim());
          const lastTwoParts = parts.slice(-10).join(', ');
          return lastTwoParts;
        });
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
        this.locationSuggestions = [];
      }
    },
    submitForm() {
      this.$emit('submit', { ...this.itinerary });
      this.resetForm();
    },
    resetForm() {
      this.itinerary = { title: '', location: '', date: '', description: '' };
      if (this.$refs.formRef) {
    this.$refs.formRef.reset(); // Reset the form fields using Vue's native form reset method
  }
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 700px;
  margin: 0 auto;
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
}

.form-container:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

h3 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
}

.p-field {
  margin-bottom: 1.5rem;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
  color: #666;
}

.custom-input {
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 0.75rem;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.custom-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.p-button-lg {
  width: 100%;
  font-weight: 600;
}

.submit-button {
  background-color: #28a745;
  border-color: #28a745;
}

.submit-button:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.p-fluid .p-field {
  margin-bottom: 1.5rem;
}

textarea.custom-input {
  resize: vertical;
}

@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
  }
}
</style>

