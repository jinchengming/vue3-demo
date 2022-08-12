<script setup>
import { getCurrentInstance, ref, toRefs } from "vue";
import { Search } from "@element-plus/icons-vue";
import request from "./utils/api.js"

// 模糊搜索数据
let queryName = ref("");
// 勾选项
let multipleSelection = ref([]);
// 对话框标题
let dialogType = ref(1);
// 对话框状态
let dialogFormVisible = ref(false);
const multipleTableRef = ref([]);

const instance = getCurrentInstance();

const form = ref({
  nickName: "",
  eamil: "",
  phone: "",
  address: "",
});

const tableData = ref([]);

//勾选
const handleSelectionChange = (val) => {
  console.log(val);
  multipleSelection.value = val;
};

// 添加、编辑 打开对话框
const openForm = (type) => {
  console.log("open form", type);
  dialogType.value = type;
  if (type === 1) {
    console.log("add...");
    form.value = {};
  }
  if (type === 2) {
    console.log("edit...");
  }
  dialogFormVisible.value = true;
};

// 对话框确认-添加用户数据
const saveUser = () => {
  dialogFormVisible.value = false;
  if (dialogType.value == 1) {
    console.log("add ...");
  } else {
    console.log("edit ...");
  }
};

// 删除
const handleRemove = (id) => {
  console.log("删除用户", id);
  let ids = [id];
  console.log(ids);
  cancelSelection();
};

// 删除勾选列表
const removeUserList = () => {
  console.log(multipleSelection.value);
  let ids = multipleSelection.value.map((item) => item.id);
  console.log(ids);
  cancelSelection();
};

// 取消勾选
const cancelSelection = () => {
  var ultipleTabInstance = toRefs(instance.refs.multipleTableRef);
  ultipleTabInstance.clearSelection.value();
};

// 姓名搜索（模糊）
const handlerQueryName = (val) => {
  console.log('query by name', val)
};

const pageUserData = async (pageNum = 1) => {
  let res = await request.get('/user', {
    pageNum: pageNum,
    pageSize : 10
  })
  console.log(res)
  tableData.value = res.list
}

pageUserData()

</script>

<template>
  <div class="table_wrap">
    <!-- 标题 -->
    <div class="title">
      <h2>Vue3 DEMO</h2>
    </div>
    <!-- 功能区域 -->
    <div class="fn">
      <el-input v-model="queryName" style="width: 35%" placeholder="Please input name ..." :prefix-icon="Search"
        @input="handlerQueryName" />
      <div class="fn-btn">
        <el-button type="primary" @click="openForm(1)">添加</el-button>
        <el-button v-if="multipleSelection.length > 0" type="danger" @click="removeUserList">删除</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" style="width: 100%"
        :row-style="{ height: '80px' }" border>
        <el-table-column type="selection" width="55" />
        <el-table-column fixed prop="nickName" label="昵称" width="150" />
        <el-table-column prop="email" label="邮箱" width="150" />
        <el-table-column prop="phone" label="联系电话" width="120" />
        <el-table-column prop="address" label="地址" width="600" />
        <el-table-column fixed="right" label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" link size="small" @click="openForm(2)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleRemove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加编辑的form对话框 -->
      <el-dialog v-model="dialogFormVisible" :title="dialogType == 1 ? '添加' : '编辑'">
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
            <el-button type="primary" @click="saveUser()">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped>
.table_wrap {
  width: 1000px;
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
