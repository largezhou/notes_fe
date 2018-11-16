<template>
  <div class="hidden-mark">HIDDEN</div>
</template>

<script>
export default {
  name: 'HiddenMark',
}
</script>

<style scoped>
.hidden-mark {
  width: 157px;
  display: inline-block;
  position: absolute;
  right: -36px;
  top: 24px;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
  color: white;
  background-color: rgba(25, 118, 210, .5);
  transform: rotate(45deg);
}
</style>
