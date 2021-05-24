<template>
  <el-page-header content="课程管理详情页面"
                  icon="el-icon-arrow-left"
                  @back="goBack"></el-page-header>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules"
           class="demo-ruleForm"
           label-width="auto">
    <el-form-item label="学号" prop="id">
      <el-input v-model="ruleForm.id"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="系别" prop="dept">
      <el-input v-model="ruleForm.dept"></el-input>
    </el-form-item>


    <el-form-item label="年龄" prop="age" required>
      <el-input v-model.number="ruleForm.age"
                type="number"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-input v-model="ruleForm.sex"></el-input>
    </el-form-item>

    <el-form-item label="总学分" prop="credit">
      <el-input v-model.number="ruleForm.credit" type="number"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input v-model="ruleForm.pwd"></el-input>
    </el-form-item>
    <el-form-item hidden label="图片" prop="img">
      <el-input v-model="ruleForm.img"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="img">
      <el-upload
          :on-error="handleAvatarSuccess"
          :show-file-list="false"
          action=""
          class="avatar-uploader"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="请插入图片" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
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
  name: "StudentForm1",
  data() {

    return {
      imageUrl: "",
      ruleForm: {
        id: "",
        name: "",
        dept: "",
        age: "",
        sex: 0,
        // teachingTime: "",
        credit: "",
        pwd: "",
        img: "",

      },
      rules: {
        id: [
          {required: true, message: "请输入课程号", trigger: "blur"},
        ],
        name: [
          {required: true, message: "请输入课程名称", trigger: "blur"},
          // {min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur"},
        ],
        dept: [
          {required: true, message: "请输入系名", trigger: "blur"},
        ],
        age: [
          {required: true, message: "请输入年龄", trigger: "blur"},
          {type: "number", message: "年龄必须为数字值", trigger: "blur"},
        ],
        sex: [
          {required: true, message: "请输入性别", trigger: "blur"},
        ],

        credit: [
          {required: true, message: "请输入学分", trigger: "blur"},
          {type: "number", message: "学分必须为数字值", trigger: "blur"},
        ],
        pwd: [
          {required: true, message: "请输入密码", trigger: "blur"},
        ],

      },
    };
  },
  methods: {
    //保存或修改课程
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("/mssqldemoback/student/saveOrUpdate", qs.stringify(this.ruleForm),
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
      router.push("./user");
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
      console.log(file);
      this.ruleForm.img = file.name;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
