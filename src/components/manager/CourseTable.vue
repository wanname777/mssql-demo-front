<template>
  <el-container>
    <el-header style="padding: 0">
      <el-menu :default-active="activeIndex" class="el-menu-demo"
               mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template #title>我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template #title>选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <!--todo:缺少搜索按钮-->
      <div style="text-align:right;">
        <el-button type="primary" @click="handleClick(null)">添加新课程</el-button>
      </div>
      <el-table
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            prop="id"
            label="课程号"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="name"
            label="课程名"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="teachingTime"
            label="理论教学时长"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="credit"
            label="学分"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="isOpen"
            label="是否开设"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="limitNumber"
            label="限制人数"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="chooseNumber"
            label="已选人数"
            width="auto">
        </el-table-column>
        <!--<el-table-column-->
        <!--    prop="zip"-->
        <!--    label="邮编"-->
        <!--    width="auto">-->
        <!--</el-table-column>-->
        <el-table-column
            fixed="right"
            label="操作"
            width="auto">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text"
                       size="small">编辑
            </el-button>
            <!--<el-button type="text" size="small">编辑</el-button>-->
            <el-button type="text" size="small" @click="deleteOne(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
  <!--<el-main>-->
  <!--<el-dialog title="课程编辑" v-model="dialogVisible" width="30%">-->
  <!--  <course-form style="text-align:left;"></course-form>-->
  <!--</el-dialog>-->
  <!--</el-main>-->
</template>

<script>
import axios from "axios";
import router from "@/router";
import store from "@/store";
// import CourseForm from "@/components/manager/CourseForm";

export default {
  name: "CourseTable",
  // components: {CourseForm},
  data() {

    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      // dialogVisible: false,
      activeIndex: "1",
      tableData: Array(20).fill(item),

    };
  },
  methods: {
    //通过store全局变量传递修改课程时的参数，并跳转到修改页面
    handleClick(row) {
      console.log(row);
      store.state.tempData = row;
      // this.dialogVisible = true;
      // router.push("/manager/courseForm");
      router.push("./courseForm");
    },
    //从数据库和列表中删除当前课程
    deleteOne(row) {
      console.log(row);
      axios.get("/mssqldemoback/course/deleteOne", {
        params: {
          id: row.id,
        },
      }).then(response => {
        console.log(response);
        if (response.data.code === 200) {
          let i = this.tableData.indexOf(row);
          this.tableData.splice(i, 1);
        }
      }).catch(reason => {
        console.log(reason);
      });

    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

  },
  mounted() {
    //挂载时获取所有课程信息
    axios
        .get("/mssqldemoback/course/selectAll")
        .then(response => {
          console.log(response.data.data.data);
          this.tableData = response.data.data.data;
          // for (let tableDataKey in this.tableData) {
          // console.log(tableDataKey);
          // this.tableData[tableDataKey].isOpen = (this.tableData[tableDataKey].isOpen === 1);
          // }
          // console.log(this.tableData);
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
  },
};
</script>

<style scoped>

</style>
