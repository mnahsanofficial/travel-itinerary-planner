<!-- src/views/Signup.vue -->
<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import { auth } from '../firebase';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async signup() {
      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        this.$router.push('/');
      } catch (error) {
        alert(error.message);
      }
    }
  }
};
</script>
