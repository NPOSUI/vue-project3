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
          </el-row>
        </el-header>
      </div>
      <div id="ma">
        <el-main>
          <div class="leftLR">
            <!--                        莺莺燕燕翠翠红红处处融融洽洽-->
          </div>
          <div class="sp_border">
            <div id="lr_ma">
              <div class="LR">
                <div class="LoRe" @click="popLo">
                  登录
                </div>
                <div class="LoRe" @click="popRe">
                  注册
                </div>
              </div>
              <div class="bigLR">
                <div class="lr_lo">
                  <el-form label-width="80px" :model="formLogin" ref="formLogin" :rules="loginRules"
                           :hidden="isActive_lo">
                    <el-form-item label="名称" prop="name">
                      <el-input v-model="formLogin.name"/>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                      <el-input v-model="formLogin.password"/>
                    </el-form-item>
                    <el-form-item class="el-radio-button">
                      <el-button type="primary" @click="vLogin('formLogin')" round>登录</el-button>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="lr_re">
                  <el-form label-width="80px" :model="formRegister" ref="formRegister" :rules="registerRules"
                           :hidden="isActive_re">
                    <el-form-item label="用户名" prop="name">
                      <el-input v-model="formRegister.name"/>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                      <el-input v-model="formRegister.password"/>
                    </el-form-item>
                    <el-form-item label="确定密码" prop="repassword">
                      <el-input v-model="formRegister.repassword"/>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model="formRegister.email"/>
                    </el-form-item>
                    <el-form-item label="电话" prop="tel">
                      <el-input v-model="formRegister.tel"/>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                      <el-input v-model="formRegister.address"/>
                    </el-form-item>
                    <el-form-item class="el-radio-button">
                      <el-button type="primary" @click="vRegister('formRegister')" round>
                        注册
                      </el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
          <div class="rightLR">
            <!--                        雨雨风风花花叶叶年年暮暮朝朝-->
          </div>
        </el-main>
      </div>
      <el-footer>
        <h2>
          开始时间-2020/12/4
        </h2>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import pro_logo from '../assets/image/pro_logo.jpg';
  import * as axios from "axios";

  export default {
    data() {
      const validateName_lo = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名！'))
        } else {
          return callback()
        }
      };
      const validatePassword_lo = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码！'))
        } else {
          return callback()
        }
      };
      const validateName = (rule, value, callback) => {
        if (value.length < 3 || value.length > 20) {
          return callback(new Error('用户名太短或太长！'))
        } else {
          return callback()
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6 || value.length > 20) {
          return callback(new Error('密码太短或太长！'))
        } else {
          return callback()
        }
      };
      const validateRepassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请再次输入密码！'))
        } else if (value !== this.formRegister.password) {
          return callback(new Error('两次输入的密码不一致！'))
        } else {
          return callback()
        }
      };
      const validateEmail = (rule, value, callback) => {
        let reg = /^.*@.*\.com[.cn]*$/;
        if (!value) {
          return callback(new Error('请输入email！'))
        } else if (!reg.test(value)) {
          return callback(new Error('无效的email！'))
        } else {
          return callback()
        }
      };
      const validateTel = (rule, value, callback) => {
        let reg = /^[0-9]{11}$/;
        if (!value) {
          return callback(new Error('请输入电话！'))
        } else if (!reg.test(value)) {
          return callback(new Error('无效的电话号码！'))
        } else {
          return callback()
        }
      };
      const validateAddress = (rule, value, callback) => {
        if (value.length < 5 || value.length > 50) {
          return callback(new Error('地址太短或者太长！'))
        } else {
          return callback()
        }
      };

      return {
        img_logo: pro_logo,
        token: localStorage.getItem('token'),
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
        isActive_lo: true,
        isActive_re: false,
        formLogin: {
          name: 'lisi',
          password: 'abc123456',
        },
        formRegister: {
          name: 'zhangsan',
          password: 'abc123456',
          rpassword: 'abc123456',
          email: '123@qq.com',
          tel: '12345678910',
          address: 'afasfdasf',
        },
        loginRules: {
          name: [{required: true, validator: validateName_lo, trigger: 'blur'}],
          password: [{required: true, validator: validatePassword_lo, trigger: 'blur'}],
        },
        registerRules: {
          name: [{required: true, validator: validateName, trigger: 'blur'}],
          password: [{required: true, validator: validatePassword, trigger: 'blur'}],
          repassword: [{required: true, validator: validateRepassword, trigger: 'blur'}],
          email: [{required: true, validator: validateEmail, trigger: 'blur'}],
          tel: [{required: true, validator: validateTel, trigger: 'blur'}],
          address: [{required: true, validator: validateAddress, trigger: 'blur'}],
        },
      }
    },
    methods: {
      // 下面两个沙雕方法，改tm进
      popLo() {
        if (this.isActive_lo === true) {
          this.isActive_lo = !this.isActive_lo;
          if (this.isActive_re === false) {
            this.isActive_re = !this.isActive_re;
          }
        }
      },
      popRe() {
        if (this.isActive_re === true) {
          this.isActive_re = !this.isActive_re;
          if (this.isActive_lo === false) {
            this.isActive_lo = !this.isActive_lo;
          }
        }
      },
      vLogin(formLogin) {
        let username = this.formLogin.name;
        let password = this.formLogin.password;
        this.$refs[formLogin].validate((valid) => {
          if (valid) {
            let url = this.baseUrl + '/login/';
            this.$http.post(url, {username: username, password: password}).then((res) => {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("user", JSON.stringify(res.data.user));
              localStorage.setItem("userlogo", JSON.parse(localStorage.getItem('user')).logo);
              if (JSON.parse(localStorage.getItem('user')).is_superuser === 0){
                this.$router.push("Pro_index");
              }else {
                this.$router.push("admin_index");
              }
            })
          }
        })
      },
      vRegister(formRegister) {
        this.$refs[formRegister].validate((valid) => {
          if (valid) {
            let url = this.baseUrl + '/users/';
            let username = this.formRegister.name;
            let password = this.formRegister.password;
            let email = this.formRegister.email;
            let address = this.formRegister.address;
            let tel = this.formRegister.tel;
            this.$http.post(url, {
              username: username,
              password: password,
              email: email,
              address: address,
              tel: tel
            }).then((res) => {
              console.log(res.data);
              // this.$router.push("");
            });
          } else {
            console.log("VALID验证不通过，登陆失败");
            return false
          }
        })
      },
      searchProduct() {
        this.$router.push({name:'all_pro',params:{type1:this.pro_type,keyword1:this.keyword}})
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/H_M_F.css";
  @import "../assets/css/common.css";

  .el-row {
    margin-top: 5px;
  }

  .el-col {

  }

  .el-form {

  }

  .el-icon-user-solid {
    margin-top: 10px;
    font-size: 10px;
  }

  .bigLR {
    margin-top: 5px;
    margin-left: 100px;
  }

  #lr_ma, #lr_ma::before, #lr_ma::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  #lr_ma {
    width: 550px;
    height: 680px;
    margin-top: 105px;
    margin-left: 33%;
    border-radius: 10px;
    border: yellow 5px double;
    box-sizing: border-box;
    text-align: center;
    float: left;
  }

  #lr_ma::before, #lr_ma::after {
    content: '';
    z-index: 0;
    margin: -2%;
    /*box-shadow: inset 0 0 0 2px;*/
    border: deepskyblue 3px solid;
    border-radius: 10px;
    box-sizing: border-box;
    animation: clipMe 4s linear infinite;
  }

  #lr_ma::before {
    animation-delay: -2s;
  }

  @keyframes clipMe {
    0%, 100% {
      clip: rect(0px, 650.0px, 50px, 0px);
    }
    25% {
      clip: rect(0px, 650.0px, 800.0px, 648.0px);
    }
    50% {
      clip: rect(798.0px, 650.0px, 800.0px, 0px);
    }
    75% {
      clip: rect(0px, 50px, 800.0px, 0px);
    }
  }

  .leftLR, .rightLR {
    width: 20%;
    height: 700px;
    margin-top: 10px;
    border-radius: 20px;
    border: orangered 5px double;
    box-sizing: border-box;
    background-size: 300px;
    background-repeat: no-repeat;
    /*实现字体垂直效果*/
    /*color: crimson;*/
    /*font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;*/
    /*font-size: 45px;*/
    /*text-align: center;*/
    /*writing-mode: vertical-lr;*/
    /*line-height: 210px;*/
    /*font-weight: 900;*/
  }

  .leftLR {
    background-image: url("../assets/image/22bg.jpg");
    background-position-x: 40%;
    float: left;
  }

  .rightLR {
    background-image: url("../assets/image/33bg.jpg");
    background-position-x: 20%;
    float: right;
  }

  .LR {
    width: 40%;
    height: 30px;
    margin-top: 20px;
    margin-left: 30%;
  }

  .LoRe {
    width: 50%;
    height: 30px;
    border: lightskyblue 5px solid;
    border-radius: 5px;
    box-sizing: border-box;
    float: left;
  }

  .lr_lo, .lr_re {
    width: 60%;
    height: auto;
  }

  .lr_lo {

    margin-top: 50px;

  }

  .lr_re {
    margin-top: 0;
  }

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

</style>
