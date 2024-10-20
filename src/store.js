import { reactive } from 'vue';

export const store = reactive({
  itineraries: [],

  addItinerary(itinerary) {
    this.itineraries.push(itinerary);
  },

  removeItinerary(index) {
    this.itineraries.splice(index, 1);
  },

  updateItinerary(index, updatedItinerary) {
    this.itineraries[index] = updatedItinerary;
  }
});
