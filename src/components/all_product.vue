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
          <el-main>
            <el-row :gutter="40">
              <el-col :span="6" v-for="list in update_new_data" class="col_buttom">
                <el-card :body-style="{ padding: '0px' }" class="product_card" shadow="hover">
                  <div @click="inProduct(list.id)">
<!--                    <el-img-->
<!--                      :v-if="list.photo === ''"-->
<!--                      :src="'http://localhost:8800/static/err/imagerr.png'">-->
<!--                    </el-img>-->
                    <el-img
                      :src="'http://localhost:8800/' + list.photo">
                      <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                      </div>
                    </el-img>
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
        img_logo: pro_logo,
        name: JSON.parse(localStorage.getItem('user')).username,
        userlogo: localStorage.getItem('userlogo'),
        headers: {"Authorization": "JWT " + localStorage.getItem('token')},
        input: '',
        options: [{
          value: 'pro_fruits', label: '水果'
        }, {
          value: 'pro_cereal', label: '粮食'
        }, {
          value: 'pro_sea', label: '海鲜'
        }, {
          value: 'pro_meat', label: '肉类'
        }, {
          value: 'pro_other', label: '其他'
        }], type_value: '',
        update_new_data: [],
        pageCount: 0,
        aSum: 0,
        currentPage: 0,
        pagesize: 0,
        keyword: '',
      }
    },
    components: {
    },
    mounted() {
      this.getdata()
    },
    methods: {
      getdata() {
        let url = this.baseUrl + "/products/";
        this.$http.get(url, this.headers).then((res) => {
          if (res.data.status === 0) {
            this.update_new_data = res.data.data;
            console.log(res.data)
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
      inProduct(pro_id){
        this.$router.push(`/pro_info/${pro_id}`);
      },
      addshopcar(pro_id) {
        if (localStorage.getItem('token') === ''){
          this.$message('请先登陆');
          return ;
        }
        let url = this.baseUrl + "/shopcar/";
        let userid = JSON.parse(localStorage.getItem('user')).id;
        this.$http.post(url,{'user': userid, 'product': pro_id},this.headers).then((res) => {
          let status = res.data['status'];
          let msg = res.data['msg'];
          console.log(status);
          this.$message(msg);
        })
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
