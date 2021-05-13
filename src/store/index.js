import {createStore} from "vuex";

const store = createStore({
    state: {
        user: "1",
        isLogin: 0,
        //奇怪的临时变量，主要用于信息的保存与修改
        tempData: null,
    },
    mutations: {},
    actions: {},
    modules: {},
});

export default store;
