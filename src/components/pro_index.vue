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
                            <a href="http://localhost:8080/#/all_pro">
                                <div class="h1">所有产品</div>
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
                                <div>
                                  <el-avatar v-if="userlogo" :src="'http://localhost:8800/'+userlogo"
                                             class="avatar"></el-avatar>
                                </div>
                                <div>
                                  {{name}}
                                </div>
                              </div>
                            </a>
                        </el-col>
                    </el-row>
                </el-header>
            </div>
            <div id="ma">
                <el-main>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <div class="c1"><h2>today's special</h2></div>
                        </el-col>
                        <el-col :span="16">
                            <div class="c1">
                                <div class="carousel">
                                    <el-carousel trigger="click" height="50*7px">
                                        <el-carousel-item v-for="item in img_idx_box" :key="item.id">
                                            <img :src="item.idView" class="image">
                                        </el-carousel-item>
                                    </el-carousel>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="c2"><h2>香鲍勃去表情仓沙发发射点发射点发</h2></div>
                        </el-col>
                        <el-col :span="6">
                            <div class="c2"><h2>type</h2></div>
                        </el-col>
                        <el-col :span="6">
                            <div class="c2"><h2>type</h2></div>
                        </el-col>
                        <el-col :span="6">
                            <div class="c2"><h2>type</h2></div>
                        </el-col>
                    </el-row>
                    <div>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div class="c3"><h2>featured products</h2></div>
                            </el-col>
                            <el-col :span="8">
                                <div class="c3"><h2>featured products</h2></div>
                            </el-col>
                            <el-col :span="8">
                                <div class="c3"><h2>featured products</h2></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div class="c3"><h2>featured products</h2></div>
                            </el-col>
                            <el-col :span="8">
                                <div class="c3"><h2>featured products</h2></div>
                            </el-col>
                            <el-col :span="8">
                                <div class="c3"><h2>featured products</h2></div>
                            </el-col>
                        </el-row>
                    </div>
                    <div>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <div class="c4"><h2>skill</h2></div>
                            </el-col>
                            <el-col :span="12">
                                <div class="c4"><h2>skill</h2></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <div class="c4"><h2>skill</h2></div>
                            </el-col>
                            <el-col :span="12">
                                <div class="c4"><h2>skill</h2></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <div class="c4"><h2>skill</h2></div>
                            </el-col>
                            <el-col :span="12">
                                <div class="c4"><h2>skill</h2></div>
                            </el-col>
                        </el-row>
                    </div>
                </el-main>
            </div>
            <el-footer>
              <el-row>
                <el-col :span="4">
                  <a href="http://localhost:8080/#/admin_index">
                    <el-button icon="el-icon-user" circle>进入后台</el-button>
                  </a>
                </el-col>
                <el-col :span="20">
                  <span @click="djtest()"><h2>开始时间-2020/12/3</h2></span>
                </el-col>
              </el-row>
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
                name: JSON.parse(localStorage.getItem('user')).username,
                userlogo: localStorage.getItem('userlogo'),
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
                img_idx_box: [
                    {id: 0, idView: require("../assets/image/idx_sea.jpg")},
                    {id: 1, idView: require("../assets/image/idx_meat.jpeg")},
                    {id: 2, idView: require("../assets/image/idx_furits.jpg")},
                    {id: 3, idView: require("../assets/image/idx_cereal.jpeg")},
                ],
            }
        },
        mounted() {
            this.GetBaseData()
        },
        methods: {
            GetBaseData(){
              this.token = localStorage.getItem('token');
            },

        }
    }
</script>

<style scoped>
    @import "../assets/css/common.css";
    @import "../assets/css/H_M_F.css";

    .avatar {
      margin-top: 12px;
      margin-left: 10px;
      float: left;
    }

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
