<template>
  <el-container>
    <!--<el-header style="padding: 0">-->
    <!--  <el-menu :default-active="activeIndex" class="el-menu-demo"-->
    <!--           mode="horizontal" @select="handleSelect">-->
    <!--    <el-menu-item index="1">处理中心</el-menu-item>-->
    <!--    <el-submenu index="2">-->
    <!--      <template #title>我的工作台</template>-->
    <!--      <el-menu-item index="2-1">选项1</el-menu-item>-->
    <!--      <el-menu-item index="2-2">选项2</el-menu-item>-->
    <!--      <el-menu-item index="2-3">选项3</el-menu-item>-->
    <!--      <el-submenu index="2-4">-->
    <!--        <template #title>选项4</template>-->
    <!--        <el-menu-item index="2-4-1">选项1</el-menu-item>-->
    <!--        <el-menu-item index="2-4-2">选项2</el-menu-item>-->
    <!--        <el-menu-item index="2-4-3">选项3</el-menu-item>-->
    <!--      </el-submenu>-->
    <!--    </el-submenu>-->
    <!--    <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
    <!--    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a>-->
    <!--    </el-menu-item>-->
    <!--  </el-menu>-->
    <!--</el-header>-->
    <el-main>
      <div style="text-align:right;">
        <el-button type="primary" @click="handleClick(null)">添加新系</el-button>
      </div>
      <el-table
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            prop="id"
            label="系号"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="name"
            label="系名"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="studentNumber"
            label="学生人数"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="detail"
            label="详细信息"
            width="auto">
        </el-table-column>
        <!--<el-table-column-->
        <!--    prop="city"-->
        <!--    label="性别"-->
        <!--    width="auto">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--    prop="address"-->
        <!--    label="总学分"-->
        <!--    width="auto">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--    prop="address"-->
        <!--    label="密码"-->
        <!--    width="auto">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--    prop="zip"-->
        <!--    label="图片"-->
        <!--    width="auto">-->
        <!--</el-table-column>-->
        <el-table-column
            fixed="right"
            label="操作"
            width="auto">
          <template #default="scope">
            <el-button type="success" @click="handleClick(scope.row)"
                       size="small">编辑
            </el-button>
            <!--<el-button type="text" size="small">编辑</el-button>-->
            <el-button size="small" type="danger"
                       @click="deleteOne(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
            :page-size="pageSize"
            :total="pages"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
  <!--<el-main>-->


  <!--</el-main>-->
</template>

<script>
import axios from "axios";
import store from "@/store";
import router from "@/router";

export default {
  name: "DepartmentTable",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      pages: 50,
      pageSize: 10,
      value: false,
      activeIndex: "1",
      tableData: Array(20).fill(item),
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val);
      axios
          .get("/mssqldemoback/department/selectAll", {
            params: {
              current: val,
              size: this.pageSize,
            },
          })
          .then(response => {
            console.log(response.data.data.data);
            this.tableData = response.data.data.data.data;
            this.pages = response.data.data.data.pages;
          })
          .catch(function (error) { // 请求失败处理
            console.log(error);
          });
    },
    handleClick(row) {
      console.log(row);
      store.state.tempData = row;
      // this.dialogVisible = true;
      // router.push("/manager/courseForm");
      router.push("./departmentForm");
    },
    deleteOne(row) {
      console.log(row);
      axios.get("/mssqldemoback/department/deleteOne", {
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
    axios
        .get("/mssqldemoback/department/selectAll", {
          params: {
            current: 1,
            size: this.pageSize,
          },
        })
        .then(response => {
          console.log(response.data.data.data);
          this.tableData = response.data.data.data.data;
          this.pages = response.data.data.data.pages;
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
  },
};
</script>

<style scoped>

</style>
