<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
let queryName = ref('')
const addUser = () => {
  console.log('添加用户')
}
const editUser = () => {
  console.log('编辑用户')
}
const deleteUser = () => {
  console.log('删除用户')
}

let multipleSelection = ref([])

const handleSelectionChange = (val)=> {
  multipleSelection.value = val
}

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
])

</script>

<template>
  <div class="table_wrap">
    <!-- 标题 -->
    <div class="title">
      <h2>Vue3 DEMO</h2>
    </div>
    <!-- 功能区域 -->
    <div class="fn">
      <el-input v-model="queryName" style="width:35%" placeholder="Please input name ..." :prefix-icon="Search" />
      <el-button type="primary" @click="addUser">添加</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        ref="multipleTableRef"
        @selection-change="handleSelectionChange"
       :data="tableData" 
       style="width: 100%" 
       height="250" 
       border>
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="320" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default>
            <el-button type="primary" link size="small" @click="editUser">Edit</el-button>
            <el-button type="danger" link size="small" @click="deleteUser">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<style scoped>
.table_wrap {
  width: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title {
  text-align: center;
}

.fn {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
