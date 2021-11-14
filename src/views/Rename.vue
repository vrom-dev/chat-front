<template>
  <div class='auth-container'>
    <app-header titleText='Twitch chat'/>
    <div class='container-item'>
      <RenameForm />
    </div>
  </div>
</template>

<script>
import RenameForm from '../components/RenameForm.vue'
import AppHeader from '../components/AppHeader.vue'

export default {
  components: {
    RenameForm,
    AppHeader
  }
}
</script>

<style lang="scss" scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
.container-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.svg-container {
  display: flex;
  justify-content: center;
  & > svg {
    width: 200px;
  }
}
.paragraph{
  font-size: 1.3rem;
}
</style>
