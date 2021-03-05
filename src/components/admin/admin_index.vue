<template>
  <div id="big">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="3">
            <div class="logo">
              <a href="http://localhost:8080">
                <el-avatar class="avatar_logo">
                  <img :src="img_logo"/>
                </el-avatar>
              </a>
            </div>
          </el-col>
          <el-col :span="6" :offset="6">
            <h3>后台管理</h3>
          </el-col>
          <el-col :span="3" :offset="6">
            <div class="h2">
              <el-button icon="el-icon-user">admin:{{name}}</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div id="header_menu">
          <el-card>
            <el-container>
              <el-aside style="width: 200px;background-color: #f5f5f5;height: 1000px; margin-top: 20px">
                <el-card>
                  <el-menu router>
                    <el-menu-item index="admin_product">
                      <h3>产品</h3>
                    </el-menu-item>
                    <el-menu-item index="admin_notice">
                      <h3>公告</h3>
                    </el-menu-item>
                    <el-menu-item index="admin_comment">
                      <h3>评论</h3>
                    </el-menu-item>
                    <el-menu-item index="admin_statistics">
                      <h3>统计分析</h3>
                    </el-menu-item>
                  </el-menu>
                </el-card>
              </el-aside>
              <el-main>
                <el-card>
                  <router-view></router-view>
                </el-card>
              </el-main>
            </el-container>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import pro_logo from '../../assets/image/pro_logo.jpg';

  export default {
    data() {
      return {
        img_logo: pro_logo,
        token: localStorage.getItem('token'),
        input: '',
        name: 'baobo',
      }
    },
    methods: {
      test() {
        let url = "http://localhost:8800/";
        this.$http.get(url).then((res) => {
          console.log(res.data);
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/admin_common.css";
  @import "../../assets/css/H_M_F.css";

  #header_menu {
    width: 90%;
    border: 1px solid royalblue;
    margin-left: 5%;
  }

  .logo {
    height: 30px;
    margin-top: -7px;
  }

  .avatar_logo {
    width: 70px;
    height: 50px;
    border-radius: 5px;
    margin-left: 1px;
  }

  img {
    width: 100%;
    height: 100%;
  }

</style>
