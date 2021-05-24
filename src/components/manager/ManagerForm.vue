<template>
  <el-page-header content="课程管理详情页面"
                  icon="el-icon-arrow-left"
                  @back="goBack"></el-page-header>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules"
           class="demo-ruleForm"
           label-width="auto">
    <el-form-item label="管理员账号" prop="id">
      <el-input v-model="ruleForm.id"></el-input>
    </el-form-item>
    <el-form-item label="管理员姓名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="pwd">
      <el-input v-model="ruleForm.pwd"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item style="text-align:right;">
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建
      </el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
import qs from "qs";
import router from "@/router";
import {ElMessage} from "element-plus";

export default {
  name: "ManagerForm",
  data() {

    return {
      ruleForm: {
        id: "",
        name: "",
        pwd: "",
        email: "",

      },
      rules: {
        id: [
          {required: true, message: "请输入课程号", trigger: "blur"},
        ],
        name: [
          {required: true, message: "请输入课程名称", trigger: "blur"},
          // {min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur"},
        ],
        email: [
          {required: true, message: "请输入邮箱地址", trigger: "blur"},
          {type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"]},
        ],
      },
    };
  },
  methods: {
    //保存或修改课程
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("/mssqldemoback/manager/saveOrUpdate", qs.stringify(this.ruleForm),
          ).then(response => {
            console.log(response);
            if (response.data.code === 200) {
              this.open1(response.data.message);
              router.push("./user");
            } else if (response.data.code === 500) {
              this.open4(response.data.message);
            }
          }).catch(reason => {
            console.log(reason);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //返回course页
    goBack() {
      // console.log("go back");
      router.push("./manager");
    },
    // 展示成功信息
    open1(showMessage) {
      ElMessage({
        showClose: true,
        message: showMessage,
        type: "success",
      });
    },
    //展示失败信息
    open4(showMessage) {
      ElMessage({
        showClose: true,
        message: showMessage,
        type: "error",
      });
    },

  },
  mounted() {
    this.ruleForm = JSON.parse(sessionStorage.getItem("user"));

  },
};
</script>

<style scoped>
* {
  text-align: left;
}
</style>
