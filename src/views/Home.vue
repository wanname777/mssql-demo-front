<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--<main-window></main-window>-->
    <!--<el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>-->

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <!--<el-dropdown-item @click="dialogVisible = true">-->
              <!--  登录-->
              <!--</el-dropdown-item>-->
              <el-dropdown-item @click="dialogVisible1 = true">退出
              </el-dropdown-item>
              <!--<el-dropdown-item>修改密码-->
              <!--</el-dropdown-item>-->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>{{ username }}</span>
      </el-header>
      <el-container>
        <router-view/>
      </el-container>

    </el-container>
    <el-dialog
        title="登录"
        v-model="dialogVisible"
        width="30%">
      <!--:before-close="handleClose">-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
               label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass"
                    autocomplete="off"></el-input>
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
    <el-dialog
        title="退出"
        v-model="dialogVisible1"
        width="30%">
      <!--:before-close="handleClose">-->
      <span>您确定要退出吗？</span>
      <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取消</el-button>
            <el-button type="primary" @click="logout">确定</el-button>
          </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// import MainWindow from "@/components/ManagerWindow";
import axios from "axios";
import qs from "qs";
import router from "@/router";

export default {
  name: "Home",
  components: {
    // MainWindow,
    // HelloWorld
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      username: JSON.parse(sessionStorage.getItem("user")).name,

      dialogVisible: false,
      dialogVisible1: false,
      ruleForm: {
        username: "",
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        username: [
          {validator: validateUsername, trigger: "blur"},
        ],
        pass: [
          {validator: validatePass, trigger: "blur"},
        ],
        checkPass: [
          {validator: validatePass2, trigger: "blur"},
        ],
        age: [
          {validator: checkAge, trigger: "blur"},
        ],
      },
    };
  },
  methods: {
    handleClick: function (row) {
      console.log(row);

    },

    // handleClose(done) {
    // this.$confirm("确认关闭？")
    //     .then(_ => {
    //       done();
    //       console.log(_);
    //     })
    //     .catch(_ => {
    //       console.log(_);
    //     });
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          axios.post("/login", qs.stringify({
                "username": this.ruleForm["username"],
                "password": this.ruleForm["checkPass"],
              }),
          ).then(response => {
            console.log(response.data);
          }).catch(resonant => {
            console.log(resonant);
          });
          // console.log(this.$refs[formName].data);
          this.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    logout() {
      sessionStorage.setItem("isLogin", "0");
      sessionStorage.removeItem("user");
      // axios.post("/logout", qs.stringify({}))
      //     .then(response => {
      //       console.log(response.data);
      //     }).catch(resonant => {
      //   console.log(resonant);
      // });
      this.dialogVisible1 = false;
      router.push("/login");
    },
    selectStudent(id) {
      axios.get("/student/select", {
        params: {
          "id": id,
        },
      }).then(response => {
        console.log(response.data);
      }).catch(resonant => {
        console.log(resonant);
      });
    },
    insertDepartment() {
      axios.post("/dept/insert/1", qs.stringify({
        "id": "10002",
        "name": "软件工程",
      })).then(response => {
        console.log(response.data);
      }).catch(resonant => {
        console.log(resonant);
      });
    },
  },
};
</script>
