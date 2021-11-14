<template>
  <div class='madeby'>
    Made with <a href="https://vuejs.org" >Vue</a> & 💜
    by Víctor Romero
  </div>
</template>

<script >

</script>

<style lang="scss" scoped>
.madeby {
  display: none;
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 1.3rem;
  padding: 2rem;
  color: rgb(83, 83, 95);
  & > a {
    font-weight: 500;
    font-size: inherit;
    color: inherit;
    text-decoration: none;
    &:hover {
      color: rgb(119, 44, 232);
    }
  }
  @media (min-width: 850px)  {
    display: block
  }
}
</style>
