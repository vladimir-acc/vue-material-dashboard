<template>
  <!-- /* eslint-disable-next-line prettier/prettier */ -->
  <transition
    name="fade"
    mode="out-in"
  >
    <login></login>
  </transition>
</template>
<script>
import login from '../../pages/Login.vue';

export default {
  components: { login }

}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
