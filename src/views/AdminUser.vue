<template>
  <div>
    <el-card shadow="never">
      <template #header>用户管理</template>

      <!-- 用户表格：和商品页 el-table 用法一样，只是列换成用户字段 -->
      <el-table :data="userList" border stripe>
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="username" label="用户名" min-width="140" />
        <el-table-column prop="role" label="角色" width="110" />
        <el-table-column prop="registerTime" label="注册时间" min-width="160" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userList = ref([
  { id: 1, username: 'zhangsan', role: '普通用户', registerTime: '2026-11-01 10:20' },
  { id: 2, username: 'lisi', role: '管理员', registerTime: '2026-11-05 14:30' },
  { id: 3, username: 'wangwu', role: '普通用户', registerTime: '2026-11-12 09:15' },
])
</script>