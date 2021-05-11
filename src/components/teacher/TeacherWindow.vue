<template>
  <el-container>
    <el-aside width="14%"
              style="background-color: rgb(238, 241, 246);text-align:left;">
      <el-menu :default-active="activeIndex" router>
        <el-menu-item index="/teacher/course">
          <i class="el-icon-message"></i>课程信息
        </el-menu-item>
        <el-menu-item index="/teacher/myCourse">
          <i class="el-icon-message"></i>我的任课
        </el-menu-item>
        <el-menu-item index="/teacher/user">
          <i class="el-icon-message"></i>个人信息
        </el-menu-item>
      </el-menu>

    </el-aside>

    <el-container>

      <el-main style="padding: 0">

        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "TeacherWindow",
  data: function () {
    return {
      userData: {
        id: "",
        name: "",
        dept: "",
        age: "",
        sex: "",
        credit: "",
        pwd: "",
        img: "",
      },
      activeIndex: "1",
      activePath: router.currentRoute.value.path,
    };
  },
  mounted() {

    axios
        .get("/mssqldemoback/student/selectById", {
          params: {
            "id": sessionStorage.getItem("id"),
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
