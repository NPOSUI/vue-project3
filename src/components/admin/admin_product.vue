<template>
  <el-container>
    <el-main>
      <div>
        <el-row>
          <el-col :span="16">
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
          </el-col>
          <el-col :span="8">
            <el-button icon="el-icon-circle-plus-outline" @click="dialogVisible = true">添加商品</el-button>
            <el-dialog title="产品信息" :visible.sync="dialogVisible">
              <el-form :model="product_form">
                <el-form-item label="产品名称" :label-width="formLabelWidth">
                  <el-input v-model="product_form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="类型" :label-width="formLabelWidth">
                      <el-select v-model="product_form.type" placeholder="请选择产品类型">
                        <el-option
                          v-for="item in pro_type_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="价格" :label-width="formLabelWidth">
                  <el-input type="number" v-model="product_form.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="产地" :label-width="formLabelWidth">
                  <el-input v-model="product_form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="库存" :label-width="formLabelWidth">
                  <el-input type="number" v-model="product_form.repertory" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                  <el-input type="text" v-model="product_form.des" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片" :label-width="formLabelWidth">
                  <el-upload
                    class="avatar-uploader"
                    :action="imagesrc"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :data="type"
                    :headers="headers"
                    :before-upload="beforeAvatarUpload">
                    <el-avatar v-if="product_form.photo" :src="'http://localhost:8800/'+product_form.photo"
                               class="avatar_input"></el-avatar>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addproduct(product_form)">确 定</el-button>
              </div>
            </el-dialog>
          </el-col>
        </el-row>
      </div>
      <div v-if="productlist.length>0" class="aa">
        <el-table
          :data="productlist"
          style="width: 100%">
          <el-table-column
            label="产品ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="类型"
            prop="type">
          </el-table-column>
          <el-table-column
            label="价格"
            prop="price">
          </el-table-column>
          <el-table-column
            label="库存"
            prop="repertory">
          </el-table-column>
          <el-table-column
            label="描述"
            prop="des">
          </el-table-column>
          <el-table-column
            label="图片"
            prop="">
            <template slot-scope="scope">
              <el-image :src="'http://localhost:8800/'+ scope.row.photo" class="avatar"></el-image>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button @click="opendailog(scope.row)" type="primary" size="small">修改</el-button>
              <el-button @click="deleteproduct(scope.row.id)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        <el-dialog title="产品信息" :visible.sync="dialogVisible2" append-to-body>
          <el-form :model="update_product">
            <el-form-item label="产品名称">
              <el-input v-model="update_product.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="8">
                <el-form-item label="类型">
                  <el-select v-model="update_product.type" placeholder="请选择产品类型">
                    <el-option
                      v-for="item in pro_type_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="价格">
              <el-input type="number" v-model="update_product.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="产地">
              <el-input v-model="update_product.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="库存">
              <el-input type="number" v-model="update_product.repertory" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="text" v-model="update_product.des" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="imagesrc"
                :show-file-list="false"
                :on-success="handleAvatarSuccess2"
                :data="type"
                :headers="headers"
                :before-upload="beforeAvatarUpload">
                <el-avatar v-if="update_product.photo" :src="'http://localhost:8800/'+ update_product.photo"
                           class="avatar_input"></el-avatar>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="updateproduct(update_product)">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div v-else>
        <div>
          <a href="http://localhost:8080/#/Pro_index">
            <h3>仓库居然没有产品！！！赶紧进货！！！</h3>
          </a>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        productlist: [],
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
        }], pro_type: '',
        dialogVisible: false,
        dialogVisible2: false,
        product_form: {
          name: '',
          type: '',
          price: 0,
          address: '',
          repertory: 0,
          des: '',
          photo: '',
        },
        product_form2: {
          name: '',
          type: '',
          price: 0,
          address: '',
          repertory: 0,
          des: '',
          photo: '',
        },
        formLabelWidth: '100px',
        imagesrc: this.baseUrl + "/upload/",
        type: {"type": "product"},
        headers: {"Authorization": "JWT " + localStorage.getItem('token')},
        pageCount: 0,
        aSum: 0,
        currentPage: 0,
        pagesize: 0,
        keyword: '',
        size: "small",
        update_product: {},
        update_image: '',
      }
    },
    mounted() {
      this.getAllProduct()
    },
    methods: {
      getAllProduct() {
        let url = this.baseUrl + "/products/";
        this.$http.get(url, this.headers).then((res) => {
          if (res.data.status === 0) {
            this.productlist = res.data.data;
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
      searchProduct() {
        let url = this.baseUrl + "/products/";
        if (this.keyword!==''){
          url = this.baseUrl + "/products/?keyword=" + this.keyword;

        }
        if (this.type!==''){
          url = this.baseUrl + "/products/?keyword=" + this.keyword + '&type=' + this.pro_type;
        }
        this.$http.get(url, this.headers).then((res) => {
          if (res.data.status === 0) {
            this.productlist = res.data.data;
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
      handleAvatarSuccess(res, file) {
        this.product_form.photo = res.url;
      },
      handleAvatarSuccess2(res, file) {
        this.update_image = res.url;
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
      addproduct(form) {
        let url = this.baseUrl + "/adminapi/products/";
        this.$http.post(url, form,
          this.headers).then((res) => {
          this.product_form = this.product_form2;
          this.dialogVisible = false;
          this.$message(res.data.msg);
        })
      },
      opendailog(row) {
        this.dialogVisible2 = true;
        this.update_product = row;
      },
      updateproduct(row) {
        let url = this.baseUrl + "/adminapi/products/" + row.id + '/';
        this.$http.put(url, row,
          this.headers).then((res) => {
          this.dialogVisible2 = false;
          this.$message(res.data.msg);
        })
      },
      deleteproduct(id) {
        let url = this.baseUrl + "/adminapi/products/" + id + '/';
        this.$http.delete(url, this.headers).then((res) => {
          this.$message(res.data.msg);
        })
      },
      handleCurrentChange(val) {
        let url = this.baseUrl + "/products/?page=" + val;
        if (this.keyword!==''){
          url = url + "&keyword=" + this.keyword;
        }
        if (this.type!==''){
          url = url + '&type=' + this.pro_type;
        }
        this.$http.get(url, this.headers).then((res) => {
          if (res.data.status === 0) {
            this.productlist = res.data.data;
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
    }
  }
</script>

<style scoped>

  .avatar {
    width: 60px;
    height: 50px;
    /*display: block;*/
    border-radius: 5px;
    margin-left: 1px;
  }

  .avatar_input {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 5px;
    margin-left: 1px;
  }

  .elselect {
    width: 100px;
  }
</style>
