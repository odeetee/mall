import { ref, computed } from 'vue'
export function useProductFilter(products) {
  // query：草稿，绑定输入框；search：正式提交关键词（回车生效）
  const query = ref('')
  const search = ref('')

  // 分类
  const category = ref('all')
  // 价格上限
  const priceMax = ref(Infinity)
  // 是否价格降序
  const desc = ref(false)

  // 关键词 + 分类过滤，【这里改成使用 search 而不是 query】
  const filtered = computed(() => {
    const k = search.value.trim().toLowerCase()
    return products.value.filter(p =>
      p.name.toLowerCase().includes(k)
      && (category.value === 'all' || p.category === category.value)
    )
  })

  // 价格过滤
  const priced = computed(() => {
    return filtered.value.filter(p => p.price <= priceMax.value)
  })

  // 排序：先拷贝再sort，避免原地修改原数组
  const sorted = computed(() => {
    return [...priced.value].sort((a, b) => {
      return desc.value ? b.price - a.price : a.price - b.price
    })
  })

  // 下拉框选项：自动从商品提取分类、去重
  const categories = computed(() => {
    return ['all', ...new Set(products.value.map(p => p.category))]
  })

  // 新增：回车提交函数，把草稿query赋值给search，触发检索
  function doSearch() {
    search.value = query.value
  }

  // 返回：把 keyword 换成 query，导出 doSearch
  return { query, search, category, priceMax, desc, categories, filtered, priced, sorted, doSearch }
}