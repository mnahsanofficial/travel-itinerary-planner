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
          field="display_name"
          placeholder="Search Location"
          @complete="fetchLocationSuggestions"
          @select="onLocationSelect"
          required
          class="p-inputtext-lg custom-input"
        />
      </div>

      <!-- Map Display -->
      <div v-if="mapUrl" class="map-container">
        <h4>Map</h4>
        <iframe
          :src="mapUrl"
          width="100%"
          height="300"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <!-- Weather Display -->
      <div v-if="weather" class="weather-container">
        <h4>Weather Information</h4>
        <p>Location: {{ weather.name }}</p>
        <p>Temperature: {{ weather.main.temp }}°C</p>
        <p>Weather: {{ weather.weather[0].description }}</p>
        <p>Humidity: {{ weather.main.humidity }}%</p>
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

      <!-- Accommodation Input Field -->
      <div class="p-field">
        <label for="accommodation">Accommodation</label>
        <InputText
          v-model="itinerary.accommodation"
          id="accommodation"
          placeholder="Enter Accommodation Details"
          class="p-inputtext-lg custom-input"
        />
      </div>

      <!-- Budget Input Field -->
      <div class="p-field">
        <label for="budget">Estimated Budget (USD)</label>
        <InputText
          v-model="itinerary.budget"
          id="budget"
          type="number"
          placeholder="Enter Estimated Budget"
          class="p-inputtext-lg custom-input"
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
          :loading="isSubmitting"
          class="p-button-success p-button-lg submit-button"
          type="submit"
        >
          {{ isEditing ? 'Update' : 'Add' }}
        </Button>
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
import { useToast } from 'primevue/usetoast';
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
      default: () => ({
        title: '',
        location: '',
        date: '',
        description: '',
        accommodation: '',
        budget: null,
      }),
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
      mapUrl: null,
      weather: null,
      toast: useToast(),
    };
  },
  watch: {
    initialItinerary: {
      handler(newVal) {
        this.itinerary = { ...newVal };
        if (newVal.lat && newVal.lon) {
          this.mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.VUE_APP_LocationIQ_API}&center=${newVal.lat},${newVal.lon}&zoom=12&size=600x300&format=png`;
          this.fetchWeather(newVal.lat, newVal.lon);
        }
      },
      deep: true,
      immediate: true,
    },
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
          this.onLocationSelect(suggestion)
          // Extract the relevant parts of the display name
          return suggestion.display_name.split(',').slice(-10).join(', ').trim()
          
        });
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
        this.locationSuggestions = [];
      }
    
    },
    async onLocationSelect(selectedLocation) {
      this.itinerary.location = selectedLocation.display_name;
      const { lat, lon } = selectedLocation;
      this.itinerary.lat = lat;
      this.itinerary.lon = lon;
      this.mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.VUE_APP_LocationIQ_API}&center=${lat},${lon}&zoom=12&size=600x300&format=png`;
      await this.fetchWeather(lat, lon);
    },
    async fetchWeather(lat, lon) {
      const apiKey = process.env.VUE_APP_OpenWeatherMap_API;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&&appid=${apiKey}`;


      try {
        const response = await axios.get(url);
        this.weather = response.data;
      } catch (error) {
        console.error('Error fetching weather information:', error);
        this.weather = null;
      }
    },
    async submitForm() {
      // Prevent multiple submissions
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;
      try {
        await this.$emit('submit', { ...this.itinerary });
        this.showToastMessage('success', this.isEditing ? 'Itinerary updated successfully.' : 'Itinerary added successfully.');
        this.resetForm();
      } catch (error) {
        this.showToastMessage('error', 'An error occurred. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.itinerary = {
        title: '',
        location: '',
        date: '',
        description: '',
        accommodation: '',
        budget: null,
        lat: null,
        lon: null,
      };
      this.mapUrl = null;
      this.weather = null;
      if (this.$refs.formRef) {
        this.$refs.formRef.reset();
      }
    },
    showToastMessage(severity, message) {
      this.toast.add({ severity, summary: severity === 'success' ? 'Success' : 'Error', detail: message, life: 3000 });
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

.map-container {
  margin-top: 1.5rem;
}

.weather-container {
  margin-top: 1.5rem;
  background: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
}
.accommodation-container, .budget-container {
  margin-top: 1.5rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
}

.accommodation-container h4, .budget-container h4 {
  margin-bottom: 0.5rem;
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
