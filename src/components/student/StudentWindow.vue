<template>
  <el-container>
    <el-aside width="14%"
              style="background-color: rgb(238, 241, 246);text-align:left;">
      <el-menu :default-active="activePath" router>
        <el-menu-item index="/student/course">
          <i class="el-icon-message"></i>课程信息
        </el-menu-item>
        <el-menu-item index="/student/myCourse">
          <i class="el-icon-message"></i>我的选课
        </el-menu-item>
        <el-menu-item index="/student/user">
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
import router from "@/router";

export default {
  name: "StudentWindow",
  data() {
    console.log(router.currentRoute.value.path);
    return {
      activePath: router.currentRoute.value.path,
    };
  },
};
</script>

<style scoped>

</style>
