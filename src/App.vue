<!-- src/App.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  display: flex;
  gap: 1rem;
  background-color: #f5f5f5;
  padding: 1rem;
}
</style>
