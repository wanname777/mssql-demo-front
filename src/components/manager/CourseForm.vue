<template>

  <el-page-header icon="el-icon-arrow-left"
                  content="课程管理"
                  @back="goBack"></el-page-header>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto"
           class="demo-ruleForm">
    <el-form-item label="课程号" prop="id">
      <el-input v-model="ruleForm.id"></el-input>
    </el-form-item>
    <el-form-item label="课程名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="理论教学时长" prop="teachingTime" required>
      <el-input type="number"
                v-model.number="ruleForm.teachingTime"></el-input>

    </el-form-item>
    <el-form-item label="学分" prop="credit">
      <el-input type="number" v-model.number="ruleForm.credit"></el-input>
    </el-form-item>
    <el-form-item label="是否开设" prop="type">
      <el-switch v-model="ruleForm.isOpen" :active-value="1"
                 :inactive-value="0"></el-switch>

    </el-form-item>
    <el-form-item label="限制人数" prop="limitNumber">
      <el-input type="number" v-model.number="ruleForm.limitNumber"></el-input>

    </el-form-item>

    <el-form-item style="text-align:right;">
      <el-button type="primary" @click="submitForm('ruleForm')">提交
      </el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import router from "@/router";
import store from "@/store";
import axios from "axios";
import qs from "qs";
import {ElMessage} from "element-plus";

export default {
  name: "CourseForm",
  data() {

    return {
      ruleForm: {
        id: "",
        name: "",
        teachingTime: "",
        credit: "",
        isOpen: 0,
        limitNumber: "",
        chooseNumber: "",

      },
      rules: {
        id: [
          {required: true, message: "请输入课程号", trigger: "blur"},
        ],
        name: [
          {required: true, message: "请输入课程名称", trigger: "blur"},
          // {min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur"},
        ],
        teachingTime: [
          {required: true, message: "请输入理论教学时长", trigger: "blur"},
          {type: "number", message: "理论教学时长必须为数字值", trigger: "blur"},
          // { pattern: /^\+?[1-9]\d*$/, message: '请输入大于0的正整数'}
        ],
        credit: [
          {required: true, message: "请输入学分", trigger: "blur"},
          {type: "number", message: "学分必须为数字值", trigger: "blur"},
        ],
        limitNumber: [
          {required: true, message: "请输入限制人数", trigger: "blur"},
          {type: "number", message: "限制人数必须为数字值", trigger: "blur"},
        ],

      },
    };
  },
  methods: {
    //保存或修改课程
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("/mssqldemoback/course/saveOrUpdate", qs.stringify(this.ruleForm),
          ).then(response => {
            console.log(response);
            if (response.data.code === 200) {
              this.open1(response.data.message);
              router.push("./course");
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
      router.push("./course");
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

<style>
* {
  text-align: left;
}

</style>

