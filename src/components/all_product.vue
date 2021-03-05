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
            <a href="http://localhost:8080/#/cus_center" v-if="token!==undefined">
              <el-avatar v-if="userlogo" :src="'http://localhost:8800/'+userlogo"
                         class="avatar">
              </el-avatar>
            </a>
          </el-col>
          <el-col :span="2">
            <a href="http://localhost:8080/#/cus_center" v-if="token!==undefined">
              <div class="user_logo">
                {{name}}
              </div>
            </a>
          </el-col>
          <el-col :span="2" :offset="2">
            <a href="http://localhost:8080/#/RL" v-if="token===undefined">
              <div class="user_logo">
                <el-button icon="el-icon-user">登陆或注册</el-button>
              </div>
            </a>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-container>
          <el-main>
            <el-row :gutter="40">
              <el-col :span="6" v-for="list in update_new_data" class="col_buttom">
                <el-card :body-style="{ padding: '0px' }" class="product_card" shadow="hover">
                  <div @click="inProduct(list.id)">
                    <!--                    <el-img-->
                    <!--                      :v-if="list.photo === ''"-->
                    <!--                      :src="'http://localhost:8800/static/err/imagerr.png'">-->
                    <!--                    </el-img>-->
                    <el-image
                      :src="'http://localhost:8800/' + list.photo" style="width:300px;height: 300px">
                      <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                      </div>
                    </el-image>
                    <div style="padding: 10px;">
                      <span>{{list.name}}</span>
                      <div class="bottom clearfix">
                        <el-row>
                          <el-col :span="8">
                            <time class="time">{{list.price}}元</time>
                          </el-col>
                          <el-col :span="16">
                            <el-button type="text" class="button" @click.stop="addshopcar(list.id)">加入购物车</el-button>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :page-size="pagesize"
              :total="aSum"
              :page-count="pageCount"
              :current-page.sync="currentPage"
              style="margin-top: 20px"
            >
            </el-pagination>
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
        keyword: '',
        pro_type: '',
        type2: '',
        img_logo: pro_logo,
        token: localStorage.getItem('token'),
        name: JSON.parse(localStorage.getItem('user')).username,
        userlogo: localStorage.getItem('userlogo'),
        headers: {"Authorization": "JWT " + localStorage.getItem('token')},
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
        }],
        update_new_data: [],
        pageCount: 0,
        aSum: 0,
        currentPage: 0,
        pagesize: 0,
      }
    },
    components: {},
    created() {
      this.pro_type = this.$route.params.type;
      this.keyword = this.$route.params.keyword1;
      if (this.$route.params.type1 !== undefined) {
        this.pro_type = this.$route.params.type1;
      }
      if (this.keyword !== undefined || this.pro_type !== undefined) {
        this.searchProduct()
      } else {
        this.getdata();
      }
    },
    mounted() {
    },
    methods: {
      getdata() {
        let url = this.baseUrl + "/products/";
        this.$http.get(url, this.headers).then((res) => {
          if (res.data.status === 0) {
            this.update_new_data = res.data.data;
            // 总页数
            this.pageCount = res.data.total_page;
            //总条目数
            this.aSum = res.data.total;
            // 当前页数
            this.currentPage = res.data.currenr_page;
            // 每页显示条目数
            this.pagesize = res.data.page_size;
          }
        })
      },
      handleCurrentChange(val) {
        if (this.keyword === '') {
          let url = this.baseUrl + "/products/?page=" + val;
          this.$http.get(url, this.headers).then((res) => {
            if (res.data.status === 0) {
              this.update_new_data = res.data.data;
              // 总页数
              this.pageCount = res.data.total_page;
              //总条目数
              this.aSum = res.data.total;
              // 当前页数
              this.currentPage = res.data.currenr_page;
              // 每页显示条目数
              this.pagesize = res.data.page_size;
            }
          })
        }
      },
      inProduct(pro_id) {
        this.$router.push(`/pro_info/${pro_id}`);
      },
      addshopcar(pro_id) {
        if (localStorage.getItem('token') === '') {
          this.$message('请先登陆');
          return;
        }
        let url = this.baseUrl + "/shopcar/";
        let userid = JSON.parse(localStorage.getItem('user')).id;
        this.$http.post(url, {'user': userid, 'product': pro_id}, this.headers).then((res) => {
          let msg = res.data['msg'];
          this.$message(msg);
        })
      },
      searchProduct() {
        let url = this.baseUrl + "/products/";
        if (this.keyword !== undefined) {
          url = url + "?keyword=" + this.keyword;
          if (this.pro_type !== undefined) {
            url = url + '&type=' + this.pro_type;
          }
        } else if (this.pro_type !== undefined) {
          url = url + '?type=' + this.pro_type;
        }
        this.$http.get(url, this.headers).then((res) => {
          if (res.data.status === 0) {
            this.update_new_data = res.data.data;
            console.log(res.data);
            // 总页数
            this.pageCount = res.data.total_page;
            console.log(res.data.total_page);
            //总条目数
            this.aSum = res.data.total;
            // 当前页数
            this.currentPage = res.data.currenr_page;
            // 每页显示条目数
            this.pagesize = res.data.page_size;
          }
        })
      },
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
    margin-right: 5px;
  }

  .user_logo {
    line-height: 50px;
    color: whitesmoke;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    margin-top: 5px;
  }

  .logo {
    height: 30px;
    margin-top: 5px;
  }

  .input_div {
    margin-top: 8px;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .elselect {
    width: 100px;
  }

  .product_card img {
    width: 100%;
    height: 300px;
  }

  .el-row {

  }

  .el-col {
  }

  .el-icon-user-solid {
    margin-top: 10px;
    font-size: 10px;
  }

  .image-slot {
    margin-top: 100px;
    margin-bottom: 80px;
    color: gold;
  }

  .col_buttom {
    margin-bottom: 20px;
  }

  .time {
    font-size: 20px;
    color: #409EFF;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>
