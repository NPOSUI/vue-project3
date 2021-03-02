<template>
  <div id="big">
    <el-container>
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
              <a href="">
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
        <el-main>
          <el-container>
            <el-aside style="width: 200px;background-color: #f5f5f5;height: 1000px">
              <el-menu :default-active="defIndex" router >
                <el-menu-item index="cus_info">
                  <h3>个人信息</h3>
                </el-menu-item>
                <el-menu-item index="cus_shopcar">
                  <h3>购物车</h3>
                </el-menu-item>
                <el-menu-item index="cus_order">
                  <h3>订单</h3>
                </el-menu-item>
              </el-menu>
            </el-aside>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-main>
      <el-footer>
        <span @click="djtest()"><h2>开始时间-2020/12/3</h2></span>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
    //导入image路径,也可以不用这种方法，可能还比较难看
    import pro_logo from '../assets/image/pro_logo.jpg'
    export default {
        data() {
            return {
                img_logo: pro_logo,
                defIndex: 'cus_info',
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
            }
        },
      mounted() {
          this.getdata()
      },
      methods: {
            getdata(){
              // console.log(JSON.parse(localStorage.getItem('user')));
              // console.log(JSON.parse(localStorage.getItem('user')).username)
            },
            djtest() {
                let url = "http://localhost:8000/";
                this.$http.get(url).then((res)=>{
                    console.log(res.data);
                })
            }
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
        height: 350px;
    }

    .carousel {
        margin-top: 25px;
    }

    .c2 {
        height: 50px;
    }

    .c3 {
        height: 100px;
    }

    .c4 {
        height: 200px;
    }

    img {
        width: 100%;
        height: 100%;
    }

</style>
