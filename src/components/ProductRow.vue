<!-- 第七周案例三：局部自定义指令 v-focus -->
<template>
  <div class="row-list">
    <div
      v-for="p in list"
      :key="p.id"
      class="row-item"
      :class="{active: selectedId === p.id}"
      @click="$emit('select', p.id)"
    >
      <!-- 作用域插槽：把当前行商品p传给父组件 -->
      <slot name="row" :row="p">
        <!-- 默认内容，如果父不传插槽就显示这个 -->
        <img :src="p.img" alt="" width="80" height="80">
        <div>
          <div>{{ p.name }}</div>
          <div>¥{{ p.price }}</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: { type: Array, required: true },
  selectedId: { type: [Number, null], default: null }
})
const emit = defineEmits(['select'])
</script>

<style scoped>
.row-item {
  display: flex;
  gap:12px;
  align-items: center;
  border:1px solid #eee;
  padding:8px;
  margin-bottom:8px;
}
.active {
  background: #eef6ff;
}
</style>