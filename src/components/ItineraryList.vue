<template>
  <div class="itinerary-container">
    <h2>Itineraries</h2>
    <Toast ref="toast" /> <!-- Add the Toast component -->
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
                  @click="startEditingItinerary(index)"
                />
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-danger"
                  @click="deleteItinerary(index)"
                />
                <Button
                  icon="pi pi-share-alt"
                  class="p-button-rounded p-button-text p-button-info"
                  @click="shareItinerary(itinerary)"
                />
                <Button
                  icon="pi pi-file-pdf"
                  class="p-button-rounded p-button-text p-button-warning"
                  @click="exportToPDF(itinerary)"
                />
              </div>
            </div>
          </template>
          <p>{{ itinerary.description }}</p>
          <div v-if="itinerary.accommodation || itinerary.budget">
            <p v-if="itinerary.accommodation"><strong>Accommodation:</strong> {{ itinerary.accommodation }}</p>
            <p v-if="itinerary.budget"><strong>Budget:</strong> ${{ itinerary.budget }}</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Toast from 'primevue/toast'; // Import Toast component
import { useToast } from 'primevue/usetoast'; // Import Toast hook
import jsPDF from 'jspdf';

export default {
  components: {
    Card,
    Button,
    Toast, // Add Toast component
  },
  data() {
    return {
      itineraries: store.itineraries,
      toast: useToast(), // Initialize the Toast
    };
  },
  methods: {
    deleteItinerary(index) {
      store.removeItinerary(index);
      this.showSuccessMessage('Itinerary deleted successfully.');
    },
    startEditingItinerary(index) {
      this.$emit('edit', index);
    },
    finishEditingItinerary() {
      this.showSuccessMessage('Itinerary updated successfully.');
    },
    // Method to format the date
    formatDate(date) {
      if (!date) return '';
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
    shareItinerary(itinerary) {
      const shareText = `Itinerary: ${itinerary.title}
      Location: ${itinerary.location}
      Date: ${this.formatDate(itinerary.date)}
      Description: ${itinerary.description}
      Accommodation: ${itinerary.accommodation || 'N/A'}
      Budget: ${itinerary.budget || 'N/A'} USD`;

      if (navigator.share) {
        navigator.share({
          title: 'Itinerary Details',
          text: shareText,
        }).catch(error => {
          console.error('Error sharing:', error);
        });
      } else {
        alert('Sharing is not supported in this browser.');
      }
    },
    exportToPDF(itinerary) {
      const doc = new jsPDF();
      const itineraryData = `
        Itinerary: ${itinerary.title}
        Location: ${itinerary.location}
        Date: ${this.formatDate(itinerary.date)}
        Description: ${itinerary.description}
        Accommodation: ${itinerary.accommodation || 'N/A'}
        Budget: ${itinerary.budget || 'N/A'} USD
      `;

      doc.text(itineraryData, 10, 10);
      doc.save(`${itinerary.title}_Itinerary.pdf`);
    },
    showSuccessMessage(message) {
      this.toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
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
