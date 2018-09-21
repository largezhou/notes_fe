<template>
  <!--<el-card class="note-item">
    <div slot="header">
      <div class="time">
        <human-time :time="item.created_at" prefix="发布于："/>
      </div>
      <div>
        <div class="belong">
          <div v-if="!item.book && !disableBook">书不见啦~</div>
          <div v-else-if="disableBook">
            <router-link :to="`/pages/${item.page.id}`">第{{ item.page.page }}页</router-link>
          </div>
          <div v-else>
            <router-link :to="`/books/${item.book.id}`">{{ item.book.title }}</router-link>
            <span> • </span>
            <router-link :to="`/pages/${item.page.id}`">第{{ item.page.page }}页</router-link>
          </div>
        </div>
        <div v-if="item.title" class="title">
          <router-link :to="`/notes/${item.id}`">{{ item.title }}</router-link>
        </div>
      </div>
    </div>
    <div>
      <router-link :to="`/notes/${item.id}`">{{ item.desc }}</router-link>
    </div>
    <div class="card-footer">
      <el-tag
        v-for="tag of item.tags"
        :key="tag.id"
        size="small"
        disable-transitions
      >
        <router-link :to="`/tags/${tag.id}`">{{ tag.name }}</router-link>
      </el-tag>
    </div>
  </el-card>-->
  <v-card class="note-item">
    <v-card-title>
      <div class="belong">
        <div v-if="!item.book && !disableBook">书不见啦~</div>
        <div v-else-if="disableBook">
          <router-link :to="`/pages/${item.page.id}`">第{{ item.page.page }}页</router-link>
        </div>
        <div v-else>
          <router-link :to="`/books/${item.book.id}`">{{ item.book.title }}</router-link>
          <span> • </span>
          <router-link :to="`/pages/${item.page.id}`">第{{ item.page.page }}页</router-link>
        </div>
      </div>
      <div class="desc">
        <router-link :to="`/notes/${item.id}`">{{ item.desc }}</router-link>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn
        flat
        color="primary"
        v-for="tag of item.tags"
        :key="tag.id"
        :to="`/tags/${tag.id}`"
      >{{ tag.name }}
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import HumanTime from '@/components/HumanTime'

export default {
  name: 'BookNoteItem',
  components: { HumanTime },
  props: {
    item: Object,
    disableBook: Boolean,
    book: Object,
  },
}
</script>

<style lang="scss">
.note-item {
  margin-bottom: 10px;

  .v-card__actions {
    flex-wrap: wrap;

    .v-btn {
      height: 30px;
      padding: 0 10px;
      min-width: initial;
    }

    .v-btn {
      margin-right: 8px;
      margin-left: 0;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .v-card__title {
    padding-bottom: 10px;
    display: block;
  }

  .belong {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .desc {
    font-size: 14px;
  }
}
</style>
