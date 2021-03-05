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
        <div id="pro_info">
          <el-card>
            <el-container>
              <el-aside>
                <div class="proinfo_aside">
                  <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <el-row>
                      <el-col :span="8">
                        <p>名称：</p>
                      </el-col>
                      <el-col :span="16">
                        <p>{{productinfo.name}}</p>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <p>类型：</p>
                      </el-col>
                      <el-col :span="16">
                        <p>{{productinfo.type}}</p>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <p>出产区：</p>
                      </el-col>
                      <el-col :span="16">
                        <p>{{productinfo.address}}</p>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <p>价格：</p>
                      </el-col>
                      <el-col :span="16">
                        <p>{{productinfo.price}}</p>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <p>库存：</p>
                      </el-col>
                      <el-col :span="16">
                        <p>{{productinfo.repertory}}</p>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <p>描述：</p>
                      </el-col>
                      <el-col :span="16">
                        <p>{{productinfo.des}}</p>
                      </el-col>
                    </el-row>
                  </el-card>
                </div>
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <el-row>
                    <el-col :span="8">
                      <p>选择数量：</p>
                    </el-col>
                    <el-col :span="16">
                      <p>
                        <span @click="loseNum(num)">-</span>
                        {{num}}
                        <span @click="upNum(num)">+</span>
                      </p>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <p>合计：</p>
                    </el-col>
                    <el-col :span="16">
                      <p>
                        {{total}}
                      </p>
                    </el-col>
                  </el-row>
                </el-card>
                <el-card :body-style="{ padding: '2px' }" shadow="hover">
                  <el-row>
                    <el-col :span="12">
                      <el-button type="primary" @click="addshopcar">&nbsp;&nbsp;&nbsp;&nbsp;加入购物车&nbsp;&nbsp;&nbsp;&nbsp;
                      </el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-button type="danger" @click="putOrder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                    </el-col>
                  </el-row>
                </el-card>
              </el-aside>
              <el-main :style="{margin: '20px'}">
                <el-row>
                  <el-col :span="24">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                      <img
                        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                        class="image">
                    </el-card>
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
          </el-card>
        </div>
        <div id="pro_comment">
          <el-card :body-style="{ padding: '0px' }">
            <el-row>
              <el-col :span="4">
                <h3>评论&nbsp;({{aSum}})</h3>
              </el-col>
            </el-row>
          </el-card>
          <el-card>
            <el-row :gutter="40">
              <el-col :span="24" v-for="list in pro_comments" class="col_buttom">
                <el-card :body-style="{ padding: '0px' }" class="product_card" shadow="hover">
                  <el-row>
                    <el-col :span="4">
                      <p>{{list.user_name}}:</p>
                    </el-col>
                    <el-col :span="18">
                      <p>{{list.content}}</p>
                    </el-col>
                    <el-col :span="2">
                      <!--                      <p>{{list.co_type}}</p>-->
                      <p v-if="list.co_type===false">好评</p>
                      <p v-if="list.co_type===true">差评</p>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <div style="margin-top: 15px;">
                <el-input placeholder="请输入内容" v-model="comment_text" class="input-with-select">
                  <el-select v-model="comment_type" slot="prepend" placeholder="请选择" class="elselect">
                    <el-option label="好评" value="0"></el-option>
                    <el-option label="差评" value="1"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-success" @click="addcomment"></el-button>
                </el-input>
              </div>
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
          </el-card>
        </div>
      </el-main>
      <el-footer>
        <span @click="djtest()"><h2>开始时间-2020/12/3</h2></span>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import pro_logo from "@/assets/image/pro_logo.jpg";

  export default {
    data() {
      return {
        pro_id: 0,
        img_logo: pro_logo,
        name: JSON.parse(localStorage.getItem('user')).username,
        token: localStorage.getItem('token'),
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
        },{
          value: undefined, label: '无'
        }], pro_type: '',
        keyword: '',
        productinfo: '',
        num: 0,
        total: 0,
        pro_comments: [],
        pageCount: 0,
        aSum: 0,
        currentPage: 0,
        pagesize: 0,
        comment_text: '',
        comment_type: '',
      }
    },
    created() {
      this.pro_id = this.$route.params.id;
      this.getdata();
      this.getProComments();
    },
    mounted() {
    },
    methods: {
      getdata() {
        let url = this.baseUrl + "/productinfo/" + this.pro_id + '/';
        this.$http.get(url, this.headers).then((res) => {
          this.productinfo = res.data.data;
        })
      },
      getProComments() {
        let url = this.baseUrl + "/comment/" + this.pro_id + '/';
        this.$http.get(url, this.headers).then((res) => {
          if (res.data.status === 0) {
            this.pro_comments = res.data.data;
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
      handleCurrentChange(val) {
        let url = this.baseUrl + '/comment/' + this.pro_id + '/?page=' + val;
        this.$http.get(url, this.headers).then((res) => {
          if (res.data.status === 0) {
            this.pro_comments = res.data.data;
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
      loseNum(num) {
        if (num === 0) return;
        this.num--;
        this.getTotal();
      },
      upNum(num) {
        if (num === this.productinfo.repertory) return;
        this.num++;
        this.getTotal();
      },
      getTotal() {
        this.total = (parseFloat(this.productinfo.price).toFixed(2) * this.num)
      },
      addshopcar() {
        if (localStorage.getItem('token') === '') {
          this.$message('请先登陆');
          return;
        }
        let url = this.baseUrl + "/shopcar/";
        let userid = JSON.parse(localStorage.getItem('user')).id;
        this.$http.post(url, {'user': userid, 'product': this.pro_id}, this.headers).then((res) => {
          let status = res.data['status'];
          let msg = res.data['msg'];
          console.log(status);
          this.$message(msg);
        })
      },
      putOrder() {
        let url = this.baseUrl + "/orders/";
        let userid = JSON.parse(localStorage.getItem('user')).id;
        let products = [];
        let product = {};
        product['id'] = this.pro_id;
        product['num'] = this.num;
        products.push(product);
        this.$http.post(url, {
          userid: userid,
          total: this.total,
          productinfo: products
        }, this.headers).then((res) => {
          console.log(res.data);
        })
      },
      addcomment() {
        if (localStorage.getItem('token') === '') {
          this.$message('请先登陆');
          return;
        }
        let url = this.baseUrl + "/comment/";
        let userid = JSON.parse(localStorage.getItem('user')).id;
        let username = JSON.parse(localStorage.getItem('user')).username;
        this.$http.post(url, {
          'user': userid, 'user_name': username, 'product': this.pro_id,
          'content': this.comment_text, 'co_type': this.comment_type
        }, this.headers).then((res) => {
          this.$message(res.data.msg);
        })
      },
      searchProduct() {
        this.$router.push({name:'all_pro',params:{type1:this.pro_type,keyword1:this.keyword}})
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


  #pro_info {
    width: 70%;
    margin-left: 15%;
    border: 1px solid blanchedalmond;
  }

  #pro_comment {
    width: 70%;
    margin-top: 20px;
    margin-left: 15%;

    border: 1px solid blanchedalmond;
  }

  el-aside {
    width: 600px;
  }

  .proinfo_aside {
    margin-top: 20px;
  }

  .image {
    width: 99%;
    height: 550px;
    border-radius: 5px;
  }

  .elselect {
    width: 100px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
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
