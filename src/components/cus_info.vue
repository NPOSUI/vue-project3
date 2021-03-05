<template>
  <el-container>
    <el-main>
        <el-form label-width="80px" :model="updateUser" ref="updateUser" :rules="userRules">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="updateUser.name"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="updateUser.password"/>
          </el-form-item>
          <el-form-item label="确定密码" prop="repassword">
            <el-input v-model="updateUser.repassword"/>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="updateUser.email"/>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="updateUser.tel"/>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="updateUser.address"/>
          </el-form-item>
          <el-form-item label="头像" prop="logo">
            <el-upload
              class="avatar-uploader"
              :action="imagesrc"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :data="type"
              :headers="headers"
              :before-upload="beforeAvatarUpload">
              <el-avatar v-if="userlogo" :src="'http://localhost:8800/'+userlogo" class="avatar"></el-avatar>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item class="el-radio-button">
            <el-button type="primary" @click="changeinfo('updateUser')" round>
              修改
            </el-button>
          </el-form-item>
        </el-form>
    </el-main>
  </el-container>
</template>

<script>
  //导入image路径,也可以不用这种方法，可能还比较难看
  export default {
    data() {
      //导入image路径,也可以不用这种方法，可能还比较难看
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
        } else if (value !== this.updateUser.password) {
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
        updateUser: {
          name: JSON.parse(localStorage.getItem('user')).username,
          password: '',
          repassword: '',
          email: JSON.parse(localStorage.getItem('user')).email,
          tel: JSON.parse(localStorage.getItem('user')).tel,
          address: JSON.parse(localStorage.getItem('user')).address,
          // email: JSON.parse(localStorage.getItem('user')).email,
          // tel: JSON.parse(localStorage.getItem('user')).tel,
          // address: JSON.parse(localStorage.getItem('user')).address,
        },
        userRules: {
          name: [{required: true, validator: validateName, trigger: 'blur'}],
          password: [{required: true, validator: validatePassword, trigger: 'blur'}],
          repassword: [{required: true, validator: validateRepassword, trigger: 'blur'}],
          email: [{required: true, validator: validateEmail, trigger: 'blur'}],
          tel: [{required: true, validator: validateTel, trigger: 'blur'}],
          address: [{required: true, validator: validateAddress, trigger: 'blur'}],
        },
        headers: {"Authorization": "JWT " + localStorage.getItem('token')},
        userlogo: localStorage.getItem('userlogo'),
        type: {"type": "logo"},
        imagesrc: this.baseUrl + "/upload/",
      }
    },
    created() {
      this.getdata()
    },
    mounted() {
    },
    methods: {
      getdata() {
        // console.log(JSON.parse(localStorage.getItem('user')));
        // console.log(this.updateUser);
      },
      handleAvatarSuccess(res, file) {
        this.userlogo = res.url;
        // console.log(this.userlogo)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      changeinfo(updateUser) {
        this.$refs[updateUser].validate((valid) => {
          if (valid) {
            let url = this.baseUrl + '/users/' + JSON.parse(localStorage.getItem('user')).id + '/';
            let username = this.updateUser.name;
            let password = this.updateUser.password;
            let email = this.updateUser.email;
            let address = this.updateUser.address;
            let tel = this.updateUser.tel;
            let logo = this.userlogo;
            this.$http.put(url, {
              username: username,
              password: password,
              email: email,
              address: address,
              tel: tel,
              logo: logo,
            }, this.headers).then((res) => {
              localStorage.setItem("user", JSON.stringify(res.data.data));
              localStorage.setItem("userlogo", JSON.parse(localStorage.getItem('user')).logo);
              this.userlogo = localStorage.getItem('userlogo');
            });
            console.log(this.userlogo)
          } else {
            console.log("VALID验证不通过，登陆失败");
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  el-main {

  }
  .avatar{
    width: 150px;
    height: 150px;
    display: block;
    border-radius: 1px;
    margin-left: 1px;
  }
</style>
