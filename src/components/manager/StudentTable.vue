<template>
  <el-container>
    <el-header style="padding: 0">
      <el-menu :default-active="activeIndex" class="el-menu-demo"
               mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template #title>我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template #title>选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <!--todo:缺少新增按钮-->
      <div style="text-align:right;">
        <el-button type="primary" @click="handleClick(null)">添加新学生</el-button>
      </div>
      <el-table
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            prop="id"
            label="学号"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="dept"
            label="系别"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="credit"
            label="总学分"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="pwd"
            label="密码"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="img"
            label="图片"
            width="auto">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="auto">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text"
                       size="small">编辑
            </el-button>
            <!--<el-button type="text" size="small">编辑</el-button>-->
            <el-button type="text" size="small" @click="deleteOne(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
  <!--<el-main>-->


  <!--</el-main>-->
</template>

<script>
import axios from "axios";
import store from "@/store";
import router from "@/router";

export default {
  name: "StudentTable",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      activeIndex: "1",
      tableData: Array(20).fill(item),
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
      store.state.tempData = row;
      // this.dialogVisible = true;
      // router.push("/manager/courseForm");
      router.push("./studentForm");
    },
    deleteOne(row) {
      console.log(row);
      axios.get("/mssqldemoback/student/deleteOne", {
        params: {
          id: row.id,
        },
      }).then(response => {
        console.log(response);
        if (response.data.code === 200) {
          let i = this.tableData.indexOf(row);
          this.tableData.splice(i, 1);
        }
      }).catch(reason => {
        console.log(reason);
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {
    axios
        .get("/mssqldemoback/student/selectAll")
        .then(response => {
          console.log(response.data.data.data);
          this.tableData = response.data.data.data;
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
  },
};
</script>

<style scoped>

</style>
