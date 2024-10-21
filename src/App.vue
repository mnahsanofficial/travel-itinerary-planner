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
        class="p-button-text p-button-secondary p-ml-2"
        @click="toggleForm"
      />
    </div>
    <div class="actions">
      <Button
        label="Add New Itinerary"
        icon="pi pi-plus"
        class="p-button-primary"
        @click="toggleForm"
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
      return this.isEditing ? { ...store.itineraries[this.editingIndex] } : {};
    }
  },
  methods: {
    toggleForm() {
      this.isFormVisible = !this.isFormVisible;
      if (!this.isFormVisible) {
        this.isEditing = false;
        this.editingIndex = null;
      }
    },
    handleFormSubmit(itinerary) {
      if (this.isEditing) {
        store.updateItinerary(this.editingIndex, itinerary);
      } else {
        store.addItinerary(itinerary);
      }
      this.toggleForm();
    },
    startEditingItinerary(index) {
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
