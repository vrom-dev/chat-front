<template>
  <div>
    <router-view class="app-layout"></router-view>
    <MadeBy />
  </div>
</template>

<script setup>
import MadeBy from './components/MadeBy.vue'
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

*,
*::before,
*::after {
  font-size: 10px;
  box-sizing: border-box;
}
body {
  background: #fefefe;
  background-image: radial-gradient(#caf 1px, #fdfdfd 0);
  background-size: 40px 40px;
  background-position: 0 0, 20px 20px;
  color: #0f0f0f;
  font-size: 10px;
  height: 100vh;
  margin: 0 auto;
  width: 100%;
  max-width: 340px;
  overscroll-behavior: none;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  @media (max-width: 450px)  {
    max-width: 100%;
  }
  &::selection {
    color: #fff;
    background-color: rgb(119, 44, 232);
  }
}
#app {
  overflow-x: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  background: #fff;
  height: 100vh;
}
</style>
