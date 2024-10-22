import { createApp } from 'vue';
import App from './App.vue';
//import vuetify from './plugins/vuetify';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

// Import PrimeVue styles
// import 'primevue/resources/themes/saga-blue/theme.css'; // Choose your theme
// import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Aura from '@primevue/themes/aura';


// Import any PrimeVue components used in your app
import AutoComplete from 'primevue/autocomplete';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(ToastService)

// Register PrimeVue components globally if needed
app.component('AutoComplete', AutoComplete);
app.component('InputText', InputText);
app.component('CalendarArea', Calendar);
app.component('TextArea', Textarea);
app.component('ButtonCheck', Button);

app.mount('#app');
