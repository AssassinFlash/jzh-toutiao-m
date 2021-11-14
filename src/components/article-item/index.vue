<template>
  <!--很多地方都会用到文章项，所以将它封装成一个组件，使用时传数据到这里-->
  <van-cell class="article-item" clickable>
    <template #title>
      <div class="title">{{ article.title }}</div>
    </template>
    <template #label>
      <div class="cover-wrap" v-if="article.cover.type===3">
        <div class="cover-wrap-item" v-for="(img,index) in article.cover.images" :key="index">
          <van-image
            class="cover-item"
            fit="cover"
            :src="img"
          ></van-image>
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }} 评论</span>
        <span>{{ handleTime(article.pubdate) }}</span>
      </div>
    </template>
    <!--    默认插槽，可以省略-->
    <template #default v-if="article.cover.type===1">
      <van-image
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
      >
      </van-image>
    </template>
  </van-cell>
</template>

<script>
import { dayjs } from '@/utils/dayjs'

export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleTime (time) {
      // 获得相对时间
      return dayjs(time).from(dayjs())
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break: break-all;
  }

  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }

  .right-cover {
    width: 116px;
    height: 73px;
  }

  .cover-wrap {
    display: flex;
    align-items: center;
    margin: 15px 0;

    .cover-wrap-item {
      flex: 1;
      height: 73px;
      padding: 0 5px;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }

      .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }

  .label-wrap {
    display: flex;
    align-items: center;

    span {
      margin-right: 12px;
    }
  }

  /deep/ .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
