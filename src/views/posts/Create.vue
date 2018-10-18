<template>
  <page-layout page-desc="来篇博客">

    <post-form/>

  </page-layout>
</template>

<script>
import PostForm from '@/components/PostForm'

export default {
  name: 'Create',
  components: { PostForm },
}
</script>
