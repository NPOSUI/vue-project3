<template>
  <el-container>
    <el-main>
      <div>
        <el-row>
          <el-col :span="16">
            <el-input type="number" placeholder="请输入产品ID" v-model="pro_id" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="searchnotice"></el-button>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-button icon="el-icon-circle-plus-outline" @click="dialogVisible = true">添加公告</el-button>
            <el-dialog title="公告信息" :visible.sync="dialogVisible">
              <el-form :model="noticeinfo">
                <el-form-item label="关联的产品ID">
                  <el-input type="number" v-model="noticeinfo.product" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                  <el-input v-model="noticeinfo.content" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addnotice(noticeinfo)">确 定</el-button>
              </div>
            </el-dialog>
          </el-col>
        </el-row>
      </div>
      <div v-if="noticelist.length>0" class="aa">
        <el-table
          :data="noticelist"
          style="width: 100%">
          <el-table-column
            label="公告ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="关联的产品id"
            prop="product">
            <template slot-scope="scope">
              <el-input v-model="scope.row.product" autocomplete="off"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="内容"
            prop="content">
            <template slot-scope="scope">
              <el-input v-model="scope.row.content" autocomplete="off"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="时间"
            prop="date">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button @click="updatenotice(scope.row)" type="primary" size="small">修改</el-button>
              <el-button @click="deletenotice(scope.row.id)" type="danger" size="small">删除</el-button>
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
      </div>
      <div v-else>
        <div>
          <h3>没有公告...</h3>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        token: localStorage.getItem('token'),
        pro_id: '',
        dialogVisible: false,
        noticelist: [],
        noticeinfo: {
          product: '',
          content: '',
        },
        noticeinfo2: {
          product: '',
          content: '',
        },
        headers: {"Authorization": "JWT " + localStorage.getItem('token')},
        pageCount: 0,
        aSum: 0,
        currentPage: 0,
        pagesize: 0,
      }
    },
    mounted() {
      this.getAlldata()
    },
    methods: {
      getAlldata() {
        let url = this.baseUrl + "/adminapi/notice/";
        this.$http.get(url, this.headers).then((res) => {
          if (res.data.status === 0) {
            this.noticelist = res.data.data;
            // 总页数
            this.pageCount = res.data.total_page;
            //总条目数
            this.aSum = res.data.total;
            // 当前页数
            this.currentPage = res.data.currenr_page;
            // 每页显示条目数
            this.pagesize = res.data.page_size;
          }
          else {
            this.noticelist = [];
          }
        })
      },
      searchnotice() {
        let url = this.baseUrl + "/adminapi/notice/";
        if (this.pro_id!==0){
          url = url + "?product=" + this.pro_id;
        }
        this.$http.get(url, this.headers).then((res) => {
          if (res.data.status === 0) {
            this.noticelist = res.data.data;
            // 总页数
            this.pageCount = res.data.total_page;
            //总条目数
            this.aSum = res.data.total;
            // 当前页数
            this.currentPage = res.data.currenr_page;
            // 每页显示条目数
            this.pagesize = res.data.page_size;
          }
          else {
            this.noticelist = [];
          }
        })
      },
      addnotice(form) {
        let url = this.baseUrl + "/adminapi/notice/";
        this.$http.post(url, form,
          this.headers).then((res) => {
          this.noticeinfo = this.noticeinfo2;
          this.dialogVisible = false;
          this.$message(res.data.msg);
        })
      },
      updatenotice(row) {
        let url = this.baseUrl + "/adminapi/notice/" + row.id + '/';
        this.$http.put(url, row,
          this.headers).then((res) => {
          this.dialogVisible = false;
          this.$message(res.data.msg);
        })
      },
      deletenotice(id) {
        let url = this.baseUrl + "/adminapi/notice/" + id + '/';
        this.$http.delete(url, this.headers).then((res) => {
          this.$message(res.data.msg);
        })
      },
      handleCurrentChange(val) {
        let url = this.baseUrl + "/products/?page=" + val;
        if (this.pro_id!==0){
          url = url + "&product=" + this.pro_id;
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

</style>
