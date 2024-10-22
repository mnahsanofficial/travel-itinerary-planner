<template>
  <div id="app">
    <div class="form-container" v-if="isFormVisible">
      <ItineraryForm
        :initialItinerary="editingItinerary"
        :isEditing="isEditing"
        @submit="handleFormSubmit"
      />
      <Button
        label="Cancel"
        class="p-button-secondary p-ml-2"
        @click="cancelEdit"
      />
    </div>
    <div class="actions">
      <Button
        label="Add New Itinerary"
        icon="pi pi-plus"
        class="p-button-primary"
        @click="startAddingNewItinerary"
        v-if="!isFormVisible"
      />
    </div>
    <ItineraryList @edit="startEditingItinerary" />
  </div>
</template>

<script>
import ItineraryForm from './components/ItineraryForm.vue';
import ItineraryList from './components/ItineraryList.vue';
import { store } from './store';
import Button from 'primevue/button';

export default {
  components: {
    ItineraryForm,
    ItineraryList,
    Button
  },
  data() {
    return {
      isFormVisible: false,
      isEditing: false,
      editingIndex: null
    };
  },
  computed: {
    editingItinerary() {
      // When editing, return a copy of the selected itinerary
      // Otherwise, return an empty object for adding a new itinerary
      return this.isEditing && this.editingIndex !== null
        ? { ...store.itineraries[this.editingIndex] }
        : {};
    }
  },
  methods: {
    startAddingNewItinerary() {
      // Set form state for adding a new itinerary
      this.isEditing = false;
      this.editingIndex = null;
      this.isFormVisible = true;
    },
    cancelEdit() {
      // Reset form state when canceling
      this.isFormVisible = false;
      this.isEditing = false;
      this.editingIndex = null;
    },
    handleFormSubmit(itinerary) {
      // Handle form submission for adding or editing an itinerary
      if (this.isEditing && this.editingIndex !== null) {
        store.updateItinerary(this.editingIndex, itinerary);
      } else {
        store.addItinerary(itinerary);
      }
      // Reset form state after submission
      this.isFormVisible = false;
      this.isEditing = false;
      this.editingIndex = null;
    },
    startEditingItinerary(index) {
      // Set form state for editing the selected itinerary
      this.isEditing = true;
      this.editingIndex = index;
      this.isFormVisible = true;
    }
  }
};
</script>

<style scoped>
#app {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.form-container {
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.p-button {
  margin: 0 5px;
}
</style>
