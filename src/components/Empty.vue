<template>
  <div class="empty" style="font-size: 250px;">
    <mdi-icon icon="flask-empty-outline"/>
  </div>
</template>

<script>
export default {
  name: 'Empty',
}
</script>

<style scoped lang="scss">
.empty {
  animation: empty-shake .6s cubic-bezier(.25, .8, .5, 1);
  text-align: center;
  font-size: 250px;

  .v-icon {
    font-size: 250px;
    color: #ddd;
  }
}

@keyframes empty-shake {
  59% {
    margin-left: 0;
  }
  60%, 80% {
    margin-left: 40px;
  }
  70%, 90% {
    margin-left: -40px;
  }
}
</style>
