<template>
  <el-upload
    class="avatar-uploader"
    :action="imagesrc"
    :show-file-list="false"
    :on-success="handleAvatarSuccess1"
    :data="type"
    :headers="headers"
    :before-upload="beforeAvatarUpload1">
    <el-avatar v-if="imageUrl" :src="'http://localhost:8800/'+imageUrl" class="avatar"></el-avatar>
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>

</template>

<script>
    import pro_logo from "@/assets/image/pro_logo.jpg";
    export default {
        data() {
            return {
                headers: {"Authorization": "JWT " + localStorage.getItem('token')},
                imagesrc: this.baseUrl + "/upload/",
                type: {"type": "product"},
                // size: 1024 * 1024,
                imageUrl: '',
            }
        },
      mounted() {

      },
      methods: {
        handleAvatarSuccess1(res, file) {
          // this.imageUrl = URL.createObjectURL(file.raw);
          this.imageUrl = res.url;
          console.log(this.imageUrl);
          console.log(res)
        },
        beforeAvatarUpload1(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      }
    }
</script>

<style scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    border-radius: 1px;
  }
</style>
