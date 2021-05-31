<template>
  <el-page-header icon="el-icon-arrow-left"
                  content="系别管理"
                  @back="goBack"></el-page-header>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto"
           class="demo-ruleForm">
    <el-form-item label="系号" prop="id">
      <el-input v-model="ruleForm.id"></el-input>
    </el-form-item>
    <el-form-item label="系名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="详细信息" prop="detail">
      <el-input v-model="ruleForm.detail"></el-input>
    </el-form-item>

    <el-form-item style="text-align:right;">
      <el-button type="primary" @click="submitForm('ruleForm')">提交
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
import store from "@/store";

export default {
  name: "DepartmentForm",
  data() {

    return {
      ruleForm: {
        id: "",
        name: "",
        studentNumber:"",
        detail:""

      },
      rules: {
        id: [
          {required: true, message: "请输入课程号", trigger: "blur"},
        ],
        name: [
          {required: true, message: "请输入课程名称", trigger: "blur"},
          // {min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur"},
        ],

      },
    };
  },
  methods: {
    //保存或修改课程
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("/mssqldemoback/department/saveOrUpdate", qs.stringify(this.ruleForm),
          ).then(response => {
            console.log(response);
            if (response.data.code === 200) {
              this.open1(response.data.message);
              router.push("./department");
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
      router.push("./department");
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
    // 混乱的全局变量存储。。
    console.log(store.state.tempData);
    //如果默认值为空，则说明是是save，此时数据为ruleForm原本的值
    if (store.state.tempData !== null) {
      this.ruleForm = store.state.tempData;

    }
  },
};
</script>

<style scoped>
* {
  text-align: left;
}
</style>
