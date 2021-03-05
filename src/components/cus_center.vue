<template>
  <div id="big">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="2">
            <div class="logo">
              <a href="http://localhost:8080">
                <el-avatar class="avatar_logo">
                  <img :src="img_logo"/>
                </el-avatar>
              </a>
            </div>
          </el-col>
          <el-col :span="2" :offset="3">
            <a href="http://localhost:8080/#/all_pro">
              <div class="h1">所有产品</div>
            </a>
          </el-col>
          <el-col :span="12">
            <div class="input_div">
              <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
                <el-select v-model="pro_type" slot="prepend" placeholder="请选择" class="elselect">
                  <el-option
                    v-for="item in pro_type_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchProduct"></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="1" :offset="2">
            <a v-if="token!==''">
              <el-avatar v-if="userlogo" :src="'http://localhost:8800/'+userlogo"
                         class="avatar">
              </el-avatar>
            </a>
          </el-col>
          <el-col :span="2">
            <a v-if="token!==''">
              <div class="user_logo">
                <el-button type="danger" @click="logout">
                  退出登陆
                </el-button>
              </div>
            </a>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-container>
          <el-aside style="width: 200px;background-color: #f5f5f5;height: 1000px">
            <div class="aside_menu">
              <el-menu :default-active="defIndex" router>
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
            </div>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-main>
      <el-footer>
        <span><h2>2020/12/3</h2></span>
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
        token: localStorage.getItem('token'),
        name: JSON.parse(localStorage.getItem('user')).username,
        userlogo: localStorage.getItem('userlogo'),
        pro_type_options: [{
          value: '肉类', label: '肉类'
        }, {
          value: '谷类', label: '谷类'
        }, {
          value: '水果', label: '水果'
        }, {
          value: '水产', label: '水产'
        }, {
          value: '蔬菜', label: '蔬菜'
        }, {
          value: '粮油', label: '粮油'
        }, {
          value: '其他', label: '其他'
        }, {
          value: undefined, label: '无'
        }], pro_type: '',
        keyword: '',
      }
    },
    mounted() {
    },
    methods: {
      searchProduct() {
        this.$router.push({name: 'all_pro', params: {type1: this.pro_type, keyword1: this.keyword}})
      },
      logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userlogo");
        this.$router.push("RL");
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/common.css";
  @import "../assets/css/H_M_F.css";

  .avatar {
    margin-top: 5px;
    margin-left: 10px;
    float: left;
  }

  .avatar_logo {
    width: 70px;
    height: 50px;
    border-radius: 5px;
    margin-left: 1px;
  }

  .user_logo {
    line-height: 50px;
  }

  .logo {
    height: 30px;
    margin-top: -1px;
  }

  .input_div {
    margin-top: 5px;
  }

  .aside_menu {
    margin-top: 40px;
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

  .elselect {
    width: 100px;
  }

</style>
