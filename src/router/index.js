import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';

const routes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/login', name: 'LoginView', component: LoginView },
  { path: '/signup', name: 'SignupView', component: SignupView }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
