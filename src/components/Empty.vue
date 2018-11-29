<template>
  <div class="empty" style="text-align: center; font-size: 250px;color: #ddd">?</div>
</template>

<script>
export default {
  name: 'Empty',
}
</script>

<style scoped lang="scss">
.empty {
  animation: empty-shake .6s cubic-bezier(.25, .8, .5, 1);
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
