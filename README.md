# Travel Itinerary Planner

A Vue.js-based travel itinerary planner app that allows users to plan their trips by creating itineraries with features like location suggestions, map integration, weather information, accommodation details, budget estimation, and more. The app is built using PrimeVue components for the UI and integrates several APIs to provide a rich, interactive user experience.

## Features

- **Add and Edit Itineraries:** Easily create and modify itineraries with details like title, location, date, and description.
- **Location Autocomplete:** Location suggestions are powered by LocationIQ API for ease of search and selection.
- **Map Integration:** Shows a map for the selected location in each itinerary using LocationIQ Maps API.
- **Weather Information:** Fetches and displays real-time weather details for the chosen location via OpenWeather API.
- **Accommodation and Budget:** Includes fields to specify accommodation details and estimate budget for each itinerary.
- **UI Enhancements:** Includes responsive design, loader animations during submission, and toast notifications for success messages.
- **PDF Export & Sharing:** Share your itineraries or export them as PDF for offline access (Future Plan in Phase 5).

## Tech Stack

- **Vue.js:** Frontend framework.
- **PrimeVue:** UI components.
- **LocationIQ API:** For location search and map integration.
- **OpenWeather API:** For fetching real-time weather information.
- **PrimeVue Toast & Loader:** For showing notifications and loading states.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mnahsanofficial/travel-itinerary-planner.git
2. **Install dependencies:** Navigate to the project directory and install required dependencies.

    cd travel-itinerary-planner
    npm install
3. **Configure API Keys:**

    Rename .env.example to .env.
    Add your API keys for LocationIQ and OpenWeather:
    VUE_APP_LocationIQ_API=<YOUR_LOCATIONIQ_API_KEY>
    VUE_APP_OpenWeather_API=<YOUR_OPENWEATHER_API_KEY>
4. **Run the app:** Start the development server.

    npm run serve
5. **Usage:**
    Click Add New Itinerary to create a new itinerary.
    Fill in the details such as title, location (autocomplete enabled), date, accommodation, and budget.
    The map and weather information will automatically appear based on the selected location.
    After adding or editing an itinerary, success messages will appear via toast notifications.
    View the list of itineraries and click the edit or delete icons to modify or remove an itinerary.
6. **Project Structure**
    src/components/ItineraryForm.vue: Form component to add/edit itineraries.
    src/components/ItineraryList.vue: Displays the list of itineraries with edit/delete options.
    src/store/index.js: Vuex store for managing the state of the app.
    src/App.vue: Main app structure, routing, and component integration.
7. **APIs Used:**
    LocationIQ API: For providing location suggestions and generating maps based on latitude and longitude.
    OpenWeather API: For fetching weather data for the selected location.