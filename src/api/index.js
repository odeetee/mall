
// MOCK 数据，和 ProductList.vue 里的 products 一一对应
const MOCK = {
  1: { id: 1, name: '机械 Key', price: 199, stock: 5, category: 'keyboard', img: '/img/keyboard.png' },
  2: { id: 2, name: '无线 Mouse', price: 99, stock: 12, category: 'mouse', img: '/img/mouse.png' },
  3: { id: 3, name: 'USB-C 扩展坞', price: 159, stock: 0, category: 'hub', img: '/img/hub.png' },
  4: { id: 4, name: '罗技 mouse', price: 159, stock: 20, category: 'mouse', img: '/img/hub.jpg' },
  5: { id: 5, name: '微软 key', price: 159, stock: 0, category: 'keyboard', img: '/img/hub.jpg' },
  6: { id: 6, name: 'Type C Mouse', price: 159, stock: 30, category: 'mouse', img: '/img/type-c mouse.jpg' },
}

// 模拟网络延迟，让 loading 状态看得见
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const api = {
  async getProduct(id) {
    await delay(300)
    // 路由里的 id 是字符串，不转数字取不到
    const product = MOCK[Number(id)]
    if (!product) {
      // 抛错，给页面里的 catch 处理，演示 fail 状态
      throw new Error('商品不存在：' + id)
    }
    return product
  }
}