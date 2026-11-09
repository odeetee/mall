<template>
  <div class="product-list">
    <!-- 外层div，循环在这里，绑定跳转 -->
    <div
      v-for="p in list"
      :key="p.id"
      @click="goDetail(p)"
    >
      <!-- ========== 下面这一大段，就是你原来的ProductCard，原样保留 ========== -->
      <ProductCard
        :goods="p"
        :selected="selectedId === p.id"
        @click="$emit('select', p.id)"
      >
        <template #cover>
          <img :src="p.img" alt="p.name" width="200" height="200" />
        </template>
      </ProductCard>

      <!-- 新增：写法2 声明式路由链接 -->
      <router-link :to="{ name: 'detail-props', params: { id: p.id } }">
        props版详情
      </router-link>

      <!-- 新增：写法3 按钮跳转，@click.stop 一定要带上 -->
      <button @click.stop="goDetailProps(p)">
        push跳props版
      </button>
    </div>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  selectedId: {
    type: [Number, null],
    default: null
  },
  goDetail: {
    type: Function,
    required: true
  },
  goDetailProps: {
    type: Function,
    required: true
  }
})

const emit = defineEmits(['select'])

const goDetailProps = (p) => {
  router.push({
    name: 'detail-props',
    params: { id: p.id }
  })
}
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
</style>