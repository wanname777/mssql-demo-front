import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";
import ManagerWindow from "@/components/manager/ManagerWindow";
import CourseTable from "@/components/manager/CourseTable";
import TeacherTable from "@/components/manager/TeacherTable";
import StudentTable from "@/components/manager/StudentTable";
import DepartmentTable from "@/components/manager/DepartmentTable";
import ManagerInfo from "@/components/manager/ManagerInfo";
import StudentWindow from "@/components/student/StudentWindow";
import StudentCourseTable from "@/components/student/StudentCourseTable";
import StudentMyCourseTable from "@/components/student/StudentMyCourseTable";
import StudentInfo from "@/components/student/StudentInfo";
import TeacherWindow from "@/components/teacher/TeacherWindow";
import TeacherCourseTable from "@/components/teacher/TeacherCourseTable";
import TeacherMyCourseTable from "@/components/teacher/TeacherMyCourseTable";
import TeacherInfo from "@/components/teacher/TeacherInfo";
import Login from "@/views/Login";
import CourseForm from "@/components/manager/CourseForm";
import DepartmentForm from "@/components/manager/DepartmentForm";
import StudentForm from "@/components/manager/StudentForm";
import TeacherForm from "@/components/manager/TeacherForm";
import ManagerForm from "@/components/manager/ManagerForm";
import StudentForm1 from "@/components/student/StudentForm1";
import TeacherForm1 from "@/components/teacher/TeacherForm1";

const routes = [
    {
        path: "/",
        name: "Home",
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Home,
        children: [
            {
                path: "manager",
                name: "ManagerWindow",
                component: ManagerWindow,
                children: [
                    {
                        path: "course",
                        name: "CourseTable",
                        component: CourseTable,
                    },
                    {
                        path: "courseForm",
                        name: "CourseForm",
                        component: CourseForm
                    },
                    {
                        path: "teacher",
                        name: "TeacherTable",
                        component: TeacherTable,
                    },
                    {
                        path: "teacherForm",
                        name: "TeacherForm",
                        component: TeacherForm,
                    },
                    {
                        path: "student",
                        name: "StudentTable",
                        component: StudentTable,
                    },
                    {
                      path: "studentForm",
                      name: "StudentForm",
                      component: StudentForm,
                    },
                    {
                        path: "department",
                        name: "DepartmentTable",
                        component: DepartmentTable,
                    },
                    {
                        path: "departmentForm",
                        name: "DepartmentForm",
                        component: DepartmentForm,
                    },
                    {
                        path: "user",
                        name: "ManagerInfo",
                        component: ManagerInfo,
                    },
                    {
                        path: "userForm",
                        name: "ManagerForm",
                        component: ManagerForm,
                    },
                ],
            },
            {
                path: "student",
                name: "StudentWindow",
                component: StudentWindow,
                children: [
                    {
                        path: "course",
                        name: "StudentCourseTable",
                        component: StudentCourseTable,
                    },
                    {
                        path: "myCourse",
                        name: "StudentMyCourseTable",
                        component: StudentMyCourseTable,
                    },
                    {
                        path: "user",
                        name: "StudentInfo",
                        component: StudentInfo,
                    },
                    {
                        path: "userForm",
                        name: "StudentForm1",
                        component: StudentForm1,
                    },
                ],
            }, {
                path: "teacher",
                name: "TeacherWindow",
                component: TeacherWindow,
                children: [
                    {
                        path: "course",
                        name: "TeacherCourseTable",
                        component: TeacherCourseTable,
                    }, {
                        path: "myCourse",
                        name: "TeacherMyCourseTable",
                        component: TeacherMyCourseTable,
                    }, {
                        path: "user",
                        name: "TeacherInfo",
                        component: TeacherInfo,
                    },
                    {
                        path: "userForm",
                        name: "TeacherForm1",
                        component: TeacherForm1,
                    },
                ],
            },

        ],
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Login,

    },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (sessionStorage.getItem("isLogin") == null) {
            sessionStorage.setItem("isLogin", "0");
            next({path: "/login"});
        } else if (sessionStorage.getItem("isLogin") === "0") {
            next({path: "/login"});
        } else if (sessionStorage.getItem("isLogin") === "1") {
            next();
        }
    } else {
        next();
    }
});
export default router;
