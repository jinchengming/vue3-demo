<script setup>
import { getCurrentInstance, ref, toRefs } from 'vue';
import { Search } from '@element-plus/icons-vue'

// 模糊搜索数据
let queryName = ref('')
// 勾选项
let multipleSelection = ref([])
// 对话框标题
let dialogTitle = ref('添加')
// 对话框状态
let dialogFormVisible = ref(false)
const multipleTableRef = ref([])

const instance = getCurrentInstance()

const form = ref({
  nickName: '',
  eamil: '',
  phone: '',
  address: ''
})

const tableData = ref([
  {
    id: 1,
    nickName: 'Tom',
    email: 'tom@163.com',
    phone: '18147474545',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 2,
    nickName: 'Jerry',
    email: 'jerry@qq.com',
    phone: '15123235656',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 3,
    nickName: 'Lucy',
    email: 'lucy@gmail.com',
    phone: '13589897474',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    nickName: 'Jet',
    email: 'imjet@gmail.com',
    phone: '13145458989',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    nickName: 'Kobe',
    email: 'kobe@126.com',
    phone: '13356569898',
    address: 'No. 189, Grove St, Los Angeles'
  },
])

//勾选
const handleSelectionChange = (val) => {
  console.log(val)
  multipleSelection.value = val
}

// 添加、编辑 打开对话框
const openForm = (type) => {
  console.log('open form', type)
  if (type === 1) {
    console.log('add')
    form.value = {}
  }
  if (type === 2) {
    dialogTitle.value = '编辑'
  }
  dialogFormVisible.value = true
}

// 对话框确认-添加用户数据
const addUser = () => {
  dialogFormVisible.value = false
  console.log('调用接口-添加数据', form.value)
}

// 删除
const handleRemove = (id) => {
  console.log('删除用户', id)
  let ids = [id]
  console.log(ids)
  cancelSelection()
}

// 删除勾选列表
const removeUserList = () => {
  console.log(multipleSelection.value)
  let ids = multipleSelection.value.map(item => item.id)
  console.log(ids)
  cancelSelection()
}

// 取消勾选
const cancelSelection = () => {
  var ultipleTabInstance = toRefs(instance.refs.multipleTableRef)
  ultipleTabInstance.clearSelection.value()
}

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
      <div class="fn-btn">
        <el-button type="primary" @click="openForm(1)">添加</el-button>
        <el-button v-if="multipleSelection.length > 0" type="danger" @click="removeUserList">删除</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" style="width: 100%"
        height="250" border>
        <el-table-column type="selection" width="55" />
        <el-table-column fixed prop="nickName" label="昵称" width="150" />
        <el-table-column prop="email" label="邮箱" width="120" />
        <el-table-column prop="phone" label="联系电话" width="120" />
        <el-table-column prop="address" label="地址" width="600" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button type="primary" link size="small" @click="openForm(2)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleRemove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加编辑的form对话框 -->
      <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
        <el-form :model="form">
          <el-form-item label="昵称" :label-width="100">
            <el-input v-model="form.nickName" autocomplete="off" />
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="邮箱" :label-width="100">
            <el-input v-model="form.email" autocomplete="off" />
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="联系电话" :label-width="100">
            <el-input v-model="form.phone" autocomplete="off" />
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="地址" :label-width="100">
            <el-input v-model="form.location" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="addUser">确认</el-button>
          </span>
        </template>
      </el-dialog>

    </div>
  </div>


</template>

<style scoped>
.table_wrap {
  width: 800px;
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  margin: 200px auto;
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
