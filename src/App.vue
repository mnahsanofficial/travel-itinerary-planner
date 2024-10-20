<template>
  <div id="app">
    <ItineraryForm
      v-if="isFormVisible"
      :initialItinerary="editingItinerary"
      :isEditing="isEditing"
      @submit="handleFormSubmit"
    />
    <button @click="toggleForm">{{ isFormVisible ? 'Cancel' : 'Add New Itinerary' }}</button>
    <ItineraryList @edit="startEditingItinerary" />
  </div>
</template>

<script>
import ItineraryForm from './components/ItineraryForm.vue';
import ItineraryList from './components/ItineraryList.vue';
import { store } from './store';

export default {
  components: {
    ItineraryForm,
    ItineraryList
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
<style>
#app {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

form input, form textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  border: 1px solid #ddd;
  padding: 10px;
}

button {
  margin-right: 5px;
}
</style>
