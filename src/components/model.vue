<template>
    <div id="big">
        <el-container>
            <div id="he">
                <el-header>
                    <el-row :gutter="20">
                        <el-col :span="3">
                            <a href="http://localhost:8080">
                                <div class="h1">
                                    <img class="auto-img ab" :src="img_logo"/>
                                </div>
                            </a>
                        </el-col>
                        <el-col :span="3">
                            <div class="h1">
                                <el-select v-model="type_value" placeholder="产品类型">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <a href="http://localhost:8080/#/intro">
                                <div class="h1">关于</div>
                            </a>
                        </el-col>
                        <el-col :span="12">
                            <div class="h2">
                                <el-row :gutter="0">
                                    <el-col :span="20">
                                        <el-input v-model="input" placeholder="请输入搜索内容">
                                        </el-input>
                                    </el-col>
                                    <el-col :span="4">
                                        <a href="http://localhost:8080/#/search">
                                            <el-button icon="el-icon-search" circle></el-button>
                                        </a>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <a href="http://localhost:8080/#/RL" v-if="token ==='' ">
                                <div class="h1" >
                                    <i class="el-icon-user-solid">登录或注册</i>
                                </div>
                            </a>
                            <a href="http://localhost:8080/#/cus_center" v-if="token !=='' ">
                                <div class="h1">
                                    <i class="el-icon-user-solid">{name}</i>
                                </div>
                            </a>
                        </el-col>
                    </el-row>
                </el-header>
            </div>
            <div id="ma">
                <el-main>

                </el-main>
            </div>
            <el-footer>
                <span><h2>开始时间-2021/2/18</h2></span>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import axios from 'axios';

    //导入image路径,也可以不用这种方法，可能还比较难看
    import pro_logo from '../assets/image/pro_logo.jpg'
    export default {
        data() {
            return {
                img_logo: pro_logo,
                token: localStorage.getItem('token'),
                input: '',
                options: [{
                    value: 'pro_fruits', label: '水果'
                }, {
                    value: 'pro_cereal', label: '粮食'
                }, {
                    value: 'pro_sea', label: '海鲜'
                }, {
                    value: 'pro_meat', label: '生肉'
                }, {
                    value: 'pro_other', label: '其他'
                }], type_value: '',
            }
        },
        methods: {
            test() {
                let url = "http://localhost:8800/";
                this.$http.get(url).then((res)=>{
                    console.log(res.data);
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/common.css";
    @import "../assets/css/H_M_F.css";

    .el-row {
        margin-top: 5px;
    }

    .el-col {
    }

    .el-icon-user-solid {
        margin-top: 10px;
        font-size: 10px;
    }

    .c1, .c2, .c3, .c4 {
        border: 1px dodgerblue solid;
        border-radius: 10px;
        color: #333;
        text-align: center;
    }

    .c1 {
        height: 50*7px;
    }

    .carousel {
        margin-top: 25px;
    }

    .c2 {
        height: 50*1px;
    }

    .c3 {
        height: 50*2px;
    }

    .c4 {
        height: 50*4px;
    }

    img {
        width: 100%;
        height: 100%;
    }

</style>
