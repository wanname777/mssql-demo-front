<template>
  <el-container>
    <!--<el-header style="padding: 0">-->
    <!--  <el-menu :default-active="activeIndex" class="el-menu-demo"-->
    <!--           mode="horizontal" @select="handleSelect">-->
    <!--    <el-menu-item index="1">处理中心</el-menu-item>-->
    <!--    <el-submenu index="2">-->
    <!--      <template #title>我的工作台</template>-->
    <!--      <el-menu-item index="2-1">选项1</el-menu-item>-->
    <!--      <el-menu-item index="2-2">选项2</el-menu-item>-->
    <!--      <el-menu-item index="2-3">选项3</el-menu-item>-->
    <!--      <el-submenu index="2-4">-->
    <!--        <template #title>选项4</template>-->
    <!--        <el-menu-item index="2-4-1">选项1</el-menu-item>-->
    <!--        <el-menu-item index="2-4-2">选项2</el-menu-item>-->
    <!--        <el-menu-item index="2-4-3">选项3</el-menu-item>-->
    <!--      </el-submenu>-->
    <!--    </el-submenu>-->
    <!--    <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
    <!--    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a>-->
    <!--    </el-menu-item>-->
    <!--  </el-menu>-->
    <!--</el-header>-->
    <el-main>
      <div style="text-align:right;">
        <el-button type="primary" @click="handleClick(null)">添加新老师</el-button>
      </div>
      <el-table
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            prop="id"
            label="教师号"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
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
            width="auto"
            :formatter="formatRole">
        </el-table-column>
        <el-table-column
            prop="title"
            label="职称"
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
            width="100px">
          <template #default="scope">
            <el-image :src="getImg(scope.row.img)"></el-image>
            <!--<img v-if="imageUrl" :src="imageUrl" class="avatar" alt="请插入图片">-->
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="auto">
          <template #default="scope">
            <el-button type="success" @click="handleClick(scope.row)"
                       size="small">编辑
            </el-button>
            <!--<el-button type="text" size="small">编辑</el-button>-->
            <el-button size="small" type="danger"
                       @click="deleteOne(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
            :page-size="pageSize"
            :total="pages"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange">
        </el-pagination>
      </div>
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
  name: "TeacherTable",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
      img: "",
    };
    return {
      pages: 50,
      pageSize: 10,
      value: false,
      activeIndex: "1",
      tableData: Array(20).fill(item),
      urls: [
        "@/assets/logo.png",

      ],
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val);
      axios
          .get("/mssqldemoback/teacher/selectAll", {
            params: {
              current: val,
              size: this.pageSize,
            },
          })
          .then(response => {
            console.log(response.data.data.data);
            this.tableData = response.data.data.data.data;
            this.pages = response.data.data.data.pages;
          })
          .catch(function (error) { // 请求失败处理
            console.log(error);
          });
    },
    handleClick(row) {
      console.log(row);
      store.state.tempData = row;
      // this.dialogVisible = true;
      // router.push("/manager/courseForm");
      router.push("./teacherForm");
    },
    deleteOne(row) {
      console.log(row);
      axios.get("/mssqldemoback/teacher/deleteOne", {
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
    formatRole: function (row) {
      return row.sex === 0 ? "男" : "女";
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getImg(path) {
      return path === "" ? "" : require("@/assets/" + path);
    },
  },
  mounted() {
    axios
        .get("/mssqldemoback/teacher/selectAll", {
          params: {
            current: 1,
            size: this.pageSize,
          },
        })
        .then(response => {
          console.log(response.data.data.data);
          this.tableData = response.data.data.data.data;
          this.pages = response.data.data.data.pages;
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
  },
};
</script>

<style scoped>

</style>
