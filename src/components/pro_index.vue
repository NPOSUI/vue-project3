<template>
  <div id="big">
    <el-container>
      <div id="he">
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
      </div>
      <div id="ma">
        <el-main>
          <el-row :gutter="20">
            <el-col :span="10">
              <div class="c1">
                <el-card>
                  <el-table
                    :data="commentlist"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                      prop="content"
                      label="公告"
                      width="300">
                      <template slot-scope="scope">
                        <p @click="goProduct(scope.row.id)">{{scope.row.content}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="date"
                      label="时间"
                      width="200">
                    </el-table-column>
                  </el-table>
                </el-card>
              </div>
            </el-col>
            <el-col :span="14">
              <div class="c1">
                <el-card>
                  <div class="carousel">
                    <el-carousel trigger="click" height="350px">
                      <el-carousel-item v-for="item in img_idx_box" :key="item.id">
                        <img :src="item.idView" class="image">
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <div class="skill">
            <el-row :gutter="20">
              <el-col :span="6" v-for="list in typelist">
                <el-card>
                  <div class="c2" @click="type_to_allproduct(list)"><h2>{{list}}</h2></div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <el-row>
              <el-col :span="2">
                <h3 style="color: gold;font-family: 'Agency FB'">生活小妙招</h3>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="18">
                <el-card shadow="hover">
                  <div class="c4">
                        <img style="width: 400px;height: 300px" src="../assets/image/a.jpg"/>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card shadow="hover">
                  <div class="c4" style="padding-top: 25px">
                    <span>
                      <p>
                      西红柿不该饭前吃，西红柿应该在餐后再吃。这样，可使胃酸和食物混合大大降低酸度，
                      避免胃内压力升高引起胃扩张，使宝宝产生腹痛、胃部不适等症状。
                      </p>
                    </span>
                    <span>
                      <p>
                      不要把胡萝卜与萝卜一起磨成泥酱。因为，胡萝卜中含有能够破坏维生素C的酵素，
                      会把萝卜中的维生素C完全破坏掉。
                      </p>
                    </span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-card shadow="hover">
                  <div class="c4" style="padding-top: 50px">
                    <span>
                      <p>
                        虽然胡萝卜素对宝宝很有营养，但也要注意适量食用。宝宝过多饮用以胡萝卜或西红柿做成的蔬菜果汁，
                        都有可能引起胡萝卜血症，使面部和手部皮肤变成橙黄色，出现食欲不振、精神状态不稳定、烦燥不安、甚至睡眠不踏实，
                        还伴有夜惊、啼哭、说梦话等表现。
                      </p>
                    </span>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card shadow="hover">
                  <div class="c4">
                        <img style="width: 400px;height: 300px" src="../assets/image/b.jpg"/>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-card shadow="hover">
                  <div class="c4">
                    <img style="width: 400px;height: 300px" src="../assets/image/c.jpg"/>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card shadow="hover">
                  <div class="c4" style="padding-top: 50px">
                    <span>
                      <p>
                        每天喝适量的蜂蜜是可以起到养生的作用，蜂蜜中含有大量的果糖、葡萄糖，而且是一种天然的营养品，
                        利于身体的吸收而不会产生毒素，可以快速的缓解疲劳，改善血液的状况；蜂蜜还能促进胃酸的正常分泌，
                        具有增强肠道蠕动的作用，可以缩短排便的时间，对于便秘的患者很有好处；蜂蜜还能润肺、消炎，对于咽喉肿痛，
                        咳嗽等症状很有好处，但是喝蜂蜜也要适量而且不适合糖尿病的患者食用。
                      </p>
                    </span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-card shadow="hover">
                  <div class="c4" style="padding-top: 50px">
                    <span>
                      <p>
                        鸡蛋壳，可以帮助你将白衬衫洗的更加白净。止痛功效：将鸡蛋壳给患十二指肠溃疡的病人服用，
                        可以在一定程度上止痛。烹饪高钙米饭：鸡蛋壳中富含一些碳酸钠、碳酸氢，
                        在蒸米饭的时候放进去一些，可以做出高钙米饭。
                        热水瓶除垢：热水瓶永久之后会在瓶内形成水垢，并且非常不容易清理，这个时候，
                        我们可以把一些蛋壳捣碎放入热水瓶内，加上一些清水，然后扣紧瓶口用力摇匀。
                      </p>
                    </span>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card shadow="hover">
                  <div class="c4">
                    <img style="width: 400px;height: 300px" src="../assets/image/d.jpg"/>
                  </div>
                </el-card>
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
  import a from '../assets/image/a.jpg'

  export default {
    data() {
      return {
        img_logo: pro_logo,
        token: localStorage.getItem('token'),
        headers: {"Authorization": "JWT " + localStorage.getItem('token')},
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
        },{
          value: undefined, label: '无'
        }], pro_type: '',
        keyword: '',
        img_idx_box: [
          {id: 0, idView: require("../assets/image/idx_sea.jpg")},
          {id: 1, idView: require("../assets/image/idx_meat.jpeg")},
          {id: 2, idView: require("../assets/image/idx_furits.jpg")},
          {id: 3, idView: require("../assets/image/idx_cereal.jpeg")},
        ],
        commentlist: [],
        typelist: ['肉类', '谷类', '水产', '水果'],
      }
    },
    created() {
      this.GetCommentData()
    },
    mounted() {
    },
    methods: {
      GetCommentData() {
        let url = this.baseUrl + "/notice/";
        this.$http.get(url, this.headers).then((res) => {
          if (res.data.status === 0) {
            this.commentlist = res.data.data;
            console.log(this.commentlist)
          } else {
            this.commentlist = [];
          }
        })
      },
      searchProduct() {
        this.$router.push({name:'all_pro',params:{type1:this.pro_type,keyword1:this.keyword}})
      },
      type_to_allproduct(type){
        this.$router.push({name:'all_pro',params:{type:type}})
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      goProduct(id) {
        console.log(id)
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/common.css";
  @import "../assets/css/H_M_F.css";

  .avatar {
    margin-top: 5px;
    margin-left: 40px;
  }

  .avatar_logo {
    width: 70px;
    height: 50px;
    border-radius: 5px;
    margin-left: 1px;
  }

  .user_logo {
    line-height: 50px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: whitesmoke;
  }

  .logo {
    height: 30px;
    margin-top: -1px;
  }

  .input_div {
    margin-top: 5px;
  }

  .elselect {
    width: 100px;
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

  .c4 {
    height: 200px;
    line-height: 20px;
  }

  .skill {
    margin-top: 100px;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

</style>
