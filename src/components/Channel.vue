<template>
  <div class="channel-container">
    <router-link
      :to="`/chat/${channel.id}`"
      class="link"
    >
      <div class="img-container">
        <div class="img-container-bg">
          <img :src="`${VITE_API_URL}${channel.image}`" />
        </div>
      </div>
      <h4 class="channel-name">
        {{ channel.name }}
      </h4>
    </router-link>
    <span class="channel-viewers"> {{ viewers }} </span>
  </div>
</template>

<script >
import { computed } from 'vue'
export default {
  props: {
    channel: Object
  },
  setup (props, _) {
    const {VITE_API_URL} = `${import.meta.env}`
    return {
      viewers: computed(() => props.channel.activeUsers.length === 1
        ? '1 espectador'
        : `${props.channel.activeUsers.length} espectadores`
      ),
      VITE_API_URL
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: rgb(31, 31, 35);
}
.channel-container {
  margin: 1rem;
  margin-bottom: 2.5rem;
}
.channel-name {
  font-weight: 700;
  font-size: 1.4rem;
  margin: 0;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: all 0.1s ease-in;
  &:hover {
    transition: all 0.1s ease-in;
    color: rgb(119, 44, 232);
  }
}
.channel-viewers {
  font-size: 1.3rem;
  color: rgb(83, 83, 95);
  transition: all 0.1s ease-in;
  cursor: pointer;
  &:hover {
    transition: all 0.1s ease-in;
    color: rgb(119, 44, 232);
  }
}
.img-container {
  display: block;
  cursor: pointer;
  width: 240px;
  height: 330px;
  display: flex;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    transition: all 0.3s ease;
    background-color: rgb(119, 44, 232);
  }
  &:hover > div {
    transform: translate3d(0.5rem, -0.5rem, 0);
    transition: all 0.3s ease;
  }
}
.img-container-bg {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  transition: all 0.1s ease-in;
}
</style>
