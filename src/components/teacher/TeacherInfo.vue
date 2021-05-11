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
      <el-descriptions class="margin-top" title="个人信息" :column="2" border>
        <template #extra>
          <el-button type="primary" size="small">操作</el-button>
        </template>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-user"></i>
            教师号
          </template>
          {{ userData.id }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-user"></i>
            姓名
          </template>
          {{ userData.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-location-outline"></i>
            年龄
          </template>
          {{ userData.age }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-location-outline"></i>
            性别
          </template>
          {{ userData.sex }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <i class="el-icon-location-outline"></i>
            职称
          </template>
          {{ userData.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-office-building"></i>
            密码
          </template>
          {{ userData.pwd }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-office-building"></i>
            照片
          </template>
          {{ userData.img }}
        </el-descriptions-item>
      </el-descriptions>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "TeacherInfo",
  data: function () {
    return {
      userData: {
        id: "",
        name: "",
        age: "",
        sex: "",
        title:"",
        pwd: "",
        img: "",
      },
      activeIndex: "1",
    };
  },
  mounted() {

    axios
        .get("/mssqldemoback/teacher/selectById", {
          params: {
            "id": JSON.parse(sessionStorage.getItem("user")).id,
          },
        })
        .then(response => {
          this.userData = response.data.data.data;
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

  },
};
</script>

<style scoped>

</style>
