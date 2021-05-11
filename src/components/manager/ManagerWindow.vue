<template>

  <el-container>
    <el-aside width="14%"
              style="background-color: rgb(238, 241, 246);text-align:left;">
      <el-menu :default-active="activePath" router>
        <el-menu-item index="/manager/course">
          <i class="el-icon-message"></i>课程信息
        </el-menu-item>
        <el-menu-item index="/manager/department">
          <i class="el-icon-message"></i>系别信息
        </el-menu-item>
        <el-menu-item index="/manager/student">
          <i class="el-icon-message"></i>学生信息
        </el-menu-item>
        <el-menu-item index="/manager/teacher">
          <i class="el-icon-message"></i>教师信息
        </el-menu-item>
        <el-menu-item index="/manager/user">
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
  name: "ManagerWindow",
  data(){
    return{
      activePath: router.currentRoute.value.path,
    }
  }
};
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

/*a {*/
/*  text-decoration: none;*/
/*}*/
</style>
