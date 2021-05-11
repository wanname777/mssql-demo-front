<template>
  <!--todo:前端动态验证可太难了。。-->
  <!--todo:增删改查没有实现-->

  <el-page-header icon="el-icon-arrow-left"
                  content="课程管理详情页面"
                  @back="goBack"></el-page-header>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
           class="demo-ruleForm">
    <el-form-item label="课程号" prop="id">
      <el-input v-model="ruleForm.id"></el-input>
    </el-form-item>
    <el-form-item label="课程名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <!--<el-form-item label="课程名" prop="region">-->
    <!--  <el-select v-model="ruleForm.region" placeholder="请选择活动区域">-->
    <!--    <el-option label="区域一" value="shanghai"></el-option>-->
    <!--    <el-option label="区域二" value="beijing"></el-option>-->
    <!--  </el-select>-->
    <!--</el-form-item>-->
    <el-form-item label="理论教学时长" prop="teachingTime" required>
      <el-input v-model.number="ruleForm.teachingTime"></el-input>
      <!--<el-col :span="11">-->
      <!--  <el-form-item prop="date1">-->
      <!--    <el-date-picker type="date" placeholder="选择日期"-->
      <!--                    v-model="ruleForm.date1"-->
      <!--                    style="width: 100%;"></el-date-picker>-->
      <!--  </el-form-item>-->
      <!--</el-col>-->
      <!--<el-col class="line" :span="2">-</el-col>-->
      <!--<el-col :span="11">-->
      <!--  <el-form-item prop="date2">-->
      <!--    <el-time-picker placeholder="选择时间" v-model="ruleForm.date2"-->
      <!--                    style="width: 100%;"></el-time-picker>-->
      <!--  </el-form-item>-->
      <!--</el-col>-->
    </el-form-item>
    <el-form-item label="学分" prop="credit">
      <el-input v-model.number="ruleForm.credit"></el-input>
    </el-form-item>
    <el-form-item label="是否开设" prop="type">
      <el-switch v-model="ruleForm.isOpen"></el-switch>
      <!--<el-checkbox-group v-model="ruleForm.type">-->
      <!--  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
      <!--  <el-checkbox label="地推活动" name="type"></el-checkbox>-->
      <!--  <el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
      <!--  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
      <!--</el-checkbox-group>-->
    </el-form-item>
    <el-form-item label="限制人数" prop="limitNumber">
      <el-input v-model.number="ruleForm.limitNumber"></el-input>
      <!--<el-radio-group v-model="ruleForm.resource">-->
      <!--  <el-radio label="线上品牌商赞助"></el-radio>-->
      <!--  <el-radio label="线下场地免费"></el-radio>-->
      <!--</el-radio-group>-->
    </el-form-item>
    <!--<el-form-item label="活动形式" prop="desc">-->
    <!--  <el-input type="textarea" v-model="ruleForm.desc"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="密码" prop="pass">-->
    <!--  <el-input type="password" v-model="ruleForm.pass"-->
    <!--            autocomplete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="确认密码" prop="checkPass">-->
    <!--  <el-input type="password" v-model="ruleForm.checkPass"-->
    <!--            autocomplete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="年龄" prop="age">-->
    <!--  <el-input v-model.number="ruleForm.age"></el-input>-->
    <!--</el-form-item>-->
    <el-form-item style="text-align:right;">
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建
      </el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import router from "@/router";
import store from "@/store";

export default {
  name: "CourseForm",
  data() {
    // let checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("年龄不能为空"));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error("请输入数字值"));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error("必须年满18岁"));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };
    // let validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkPass !== "") {
    //       this.$refs.ruleForm.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    // let validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      ruleForm: {
        id:"",
        name: "",
        teachingTime:"",
        credit:"",
        isOpen:"",
        limitNumber:"",
        chooseNumber:"",
        // region: "",
        // date1: "",
        // date2: "",
        // delivery: false,
        // type: [],
        // resource: "",
        // desc: "",
        // pass: "",
        // checkPass: "",
        // age: "",
      },
      rules: {
        id:[
          {required:true,message:"请输入课程号",trigger:"blur"},
        ],
        name: [
          {required: true, message: "请输入课程名称", trigger: "blur"},
          // {min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur"},
        ],
        teachingTime: [
          {required:true,message:"请输入理论教学时长",trigger:"blur"},
          { type: 'number', message: '理论教学时长必须为数字值',trigger: "blur"},
          // { pattern: /^\+?[1-9]\d*$/, message: '请输入大于0的正整数'}
        ],
        credit: [
          {required:true,message:"请输入学分",trigger:"blur"},
          { type: 'number', message: '学分必须为数字值',trigger: "blur"}
        ],
        limitNumber: [
          {required:true,message:"请输入限制人数",trigger:"blur"},
          { type: 'number', message: '限制人数必须为数字值',trigger: "blur"}
        ],
        // region: [
        //   {required: true, message: "请选择活动区域", trigger: "change"},
        // ],
        // date1: [
        //   {type: "date", required: true, message: "请选择日期", trigger: "change"},
        // ],
        // date2: [
        //   {type: "date", required: true, message: "请选择时间", trigger: "change"},
        // ],
        // type: [
        //   {
        //     type: "array",
        //     required: true,
        //     message: "请至少选择一个活动性质",
        //     trigger: "change",
        //   },
        // ],
        // resource: [
        //   {required: true, message: "请选择活动资源", trigger: "change"},
        // ],
        // desc: [
        //   {required: true, message: "请填写活动形式", trigger: "blur"},
        // ],
        // pass: [
        //   {validator: validatePass, trigger: "blur"},
        // ],
        // checkPass: [
        //   {validator: validatePass2, trigger: "blur"},
        // ],
        // age: [
        //   {validator: checkAge, trigger: "blur"},
        // ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack() {
      console.log("go back");
      router.push("./course");
    },
  },
  mounted() {
    // 混乱的全局变量存储。。
    console.log(store.state.tempData);
    this.ruleForm=store.state.tempData
  }
};
</script>

<style>
* {
  text-align: left;
}

</style>

