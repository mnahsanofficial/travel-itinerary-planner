<template>
  <div class="itinerary-container">
    <h2>Itineraries</h2>
    <div class="p-list p-mt-2">
      <div
        v-for="(itinerary, index) in itineraries"
        :key="index"
        class="p-mb-3"
      >
        <Card class="p-card">
          <template #header>
            <div class="p-card-header">
              <div class="itinerary-info">
                <strong>{{ itinerary.title }}</strong> - 
                {{ itinerary.location }} ({{ formatDate(itinerary.date) }})
              </div>
              <div class="itinerary-actions">
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text p-button-primary"
                  @click="editItinerary(index)"
                />
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-danger"
                  @click="deleteItinerary(index)"
                />
              </div>
            </div>
          </template>
          <p>{{ itinerary.description }}</p>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store';
import Card from 'primevue/card';
import Button from 'primevue/button';

export default {
  components: {
    Card,
    Button,
  },
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
    // Method to format the date
    formatDate(date) {
      if (!date) return '';
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    }
  },
};
</script>

<style scoped>
.itinerary-container {
  max-width: 800px;
  margin: 0 auto;
}

.p-list .p-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.p-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.itinerary-info {
  font-size: 1rem;
}

.itinerary-actions .p-button {
  margin-left: 0.5rem;
}
</style>
