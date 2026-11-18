<template>
  <div class="page">
    <!-- 搜索与筛选 -->
    <div class="toolbar">
      <el-input v-model="keyword" placeholder="搜索商品名称" clearable style="width:220px" />
      <el-select v-model="category" placeholder="全部分类" clearable style="width:160px; margin-left:12px">
        <el-option label="键盘" value="keyboard" />
        <el-option label="鼠标" value="mouse" />
        <el-option label="扩展坞" value="hub" />
      </el-select>
      <!-- 新增按钮（PPT里没写，加上才能点出新增弹窗） -->
      <el-button type="primary" @click="openAdd" style="margin-left:12px">新增商品</el-button>
    </div>

    <!-- 数据表格 -->
    <el-table :data="paged" border stripe v-loading="loading">
      <el-table-column prop="id" label="ID" width="70" />
      <el-table-column prop="name" label="商品名称" min-width="140" />
      <el-table-column prop="category" label="分类" width="110" />

      <el-table-column label="价格" width="120">
        <template #default="{ row }">
          <span class="price">{{ row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="库存" width="100">
        <template #default="{ row }">
          <el-tag v-if="row.stock === 0" type="danger" size="small">缺货</el-tag>
          <span v-else>{{ row.stock }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <el-button size="small" @click="openEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="askDelete(row)">删除</el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="还没有商品，去添加一个吧" />
      </template>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="pageSize"
      :total="filtered.length"
      layout="total, sizes, prev, pager, next"
      class="pager"
      @current-change="onPageChange"
      @size-change="onPageChange"
    />

    <!-- 新增 / 编辑 共用弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑商品' : '新增商品'" width="480px" @closed="onDialogClosed">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option label="键盘" value="keyboard" />
            <el-option label="鼠标" value="mouse" />
            <el-option label="扩展坞" value="hub" />
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="form.price" :min="0" :precision="2" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>


<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)
const list = ref([
  { id: 1, name: '机械Key', price: 199, stock: 5, category: 'keyboard' },
  { id: 2, name: '无线Mouse', price: 99, stock: 12, category: 'mouse' },
  { id: 3, name: 'USB-C扩展坞', price: 159, stock: 0, category: 'hub' },
  { id: 4, name: '罗技mouse', price: 159, stock: 20, category: 'mouse' },
  { id: 5, name: '微软key', price: 159, stock: 0, category: 'keyboard' },
  { id: 6, name: '机械Key', price: 199, stock: 8, category: 'keyboard' },
  { id: 7, name: '无线Mouse', price: 99, stock: 12, category: 'mouse' },
  { id: 8, name: 'USB-C扩展坞', price: 159, stock: 30, category: 'hub' },
  { id: 9, name: '罗技mouse', price: 159, stock: 0, category: 'mouse' },
  { id: 10, name: '微软key', price: 159, stock: 3, category: 'keyboard' },
  { id: 11, name: '机械Key', price: 199, stock: 5, category: 'keyboard' },
  { id: 12, name: '无线Mouse', price: 99, stock: 0, category: 'mouse' },
  { id: 13, name: 'USB-C扩展坞', price: 159, stock: 40, category: 'hub' },
  { id: 14, name: '罗技mouse', price: 159, stock: 20, category: 'mouse' },
  { id: 15, name: '微软key', price: 159, stock: 9, category: 'keyboard' },
])

const keyword = ref('')
const category = ref('')
const page = ref(1)
const pageSize = ref(5)

// 筛选
const filtered = computed(() =>
  list.value.filter(p =>
    p.name.includes(keyword.value) &&
    (!category.value || p.category === category.value)
  )
)

// 分页截取
const paged = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

// 弹窗表单
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const form = reactive({ id: null, name: '', category: '', price: 0 })

// 表单校验规则
const rules = {
  name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
    { min: 2, max: 30, message: '长度 2 到 30 个字符', trigger: 'blur' },
  ],
  price: [
    { required: true, message: '请输入价格', trigger: 'blur' },
    {
      validator: (rule, value, cb) => {
        if (value <= 0) cb(new Error('价格必须大于0'))
        else cb()
      },
      trigger: 'blur',
    },
  ],
}

function onPageChange() {
}

function openAdd() {
  isEdit.value = false
  form.id = null
  form.name = ''
  form.category = ''
  form.price = 0
  dialogVisible.value = true
}

function openEdit(row) {
  isEdit.value = true
  Object.assign(form, row)
  dialogVisible.value = true
}

function onDialogClosed() {
  formRef.value?.resetFields()
}

async function onSubmit() {
  try {
    await formRef.value.validate()
  } catch {
    ElMessage.warning('请先修正表单中的错误')
    return
  }

  if (isEdit.value) {
    const target = list.value.find(p => p.id === form.id)
    Object.assign(target, form)
    ElMessage.success('保存成功')
  } else {
    list.value.unshift({ ...form, id: list.value.length + 1 })
    ElMessage.success('新增成功')
  }
  dialogVisible.value = false
  load()
}

async function askDelete(row) {
  try {
    await ElMessageBox.confirm(
      `确定删除 ${row.name} 吗？此操作不可恢复。`,
      '删除确认',
      {
        type: 'warning',
        confirmButtonText: '确定删除',
        cancelButtonText: '再想想',
      }
    )
    list.value = list.value.filter(p => p.id !== row.id)
    ElMessage.success('删除成功')
    load()
  } catch {
    return
  }
}

function load() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 300)
}
</script>

<style scoped>
.page {
  padding: 8px;
}
.toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.pager {
  margin-top: 16px;
  justify-content: flex-end;
}
.price {
  color: #c8442b;
  font-weight: 700;
}
</style>