<template>
  <el-dialog
      title="登录"
      v-model="dialogVisible"
      width="30%">
    <!--:before-close="handleClose">-->
    <!--<el-button :plain="true" @click="open4">错误</el-button>-->
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
             label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="identification">
        <el-radio-group v-model="ruleForm.identification">
          <el-radio label="1">学生</el-radio>
          <el-radio label="2">教师</el-radio>
          <el-radio label="3">管理员</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">提交</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
import qs from "qs";
import router from "@/router";
import {ElMessage} from "element-plus";

export default {
  name: "Login",
  data() {

    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };


    return {
      dialogVisible: true,
      resultMessage: "",
      ruleForm: {
        username: "",
        password: "",
        identification: "1",

      },
      rules: {
        username: [
          {validator: validateUsername, trigger: "blur"},
        ],
        password: [
          {validator: validatePass, trigger: "blur"},
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // console.log(this.ruleForm);
          let url = "";
          let commonPath = "/mssqldemoback";

          if (this.ruleForm["identification"] === "1") {
            url = "/student";
          } else if (this.ruleForm["identification"] === "2") {
            url = "/teacher";
          } else if (this.ruleForm["identification"] === "3") {
            url = "/manager";
          }
          axios.post(commonPath + url + "/login", qs.stringify({
                "username": this.ruleForm["username"],
                "password": this.ruleForm["password"],
              }),
          ).then(response => {
            console.log(response.data);
            if (response.data.code === 200) {
              sessionStorage.setItem("isLogin", "1");
              sessionStorage.setItem("user", JSON.stringify(response.data.data.data));
              // this.$store.state.user=response.data.data
              router.push(url + "/user");
            } else if (response.data.code === 406) {
              this.open4(response.data.message);
            }
          }).catch(resonant => {
            console.log(resonant);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    open4(showMessage) {
      ElMessage({
        showClose: true,
        message: showMessage,
        type: "error",
      });
    },
  },
};
</script>

<style scoped>

</style>
