<!-- 第七周案例三：局部自定义指令 v-focus -->
<template>
  <div class="product-list">
    <ProductCard
      v-for="p in list"
      :key="p.id"
      :goods="p"
      :selected="selectedId === p.id"
      @click="$emit('select', p.id)"
    >
      <!-- ✅ 具名插槽cover：覆盖Card里面默认图片，满足验收 -->
      <template #cover>
        <img :src="p.img" :alt="p.name" width="200" height="200"  />
      </template>
    </ProductCard>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  selectedId: {
    type: [Number, null],
    default: null
  }
})

const emit = defineEmits(['select'])
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
</style>