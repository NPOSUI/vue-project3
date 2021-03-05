<template>
  <el-container>
    <el-main>
      <div>
        <el-row>
          <el-col :span="16">
            <el-input type="number" placeholder="请输入用户名" v-model="id" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="searchcomment"></el-button>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-button icon="el-icon-circle-plus-outline" @click="dialogVisible = true">添加评价</el-button>
            <el-dialog title="评价" :visible.sync="dialogVisible">
              <el-form :model="commentinfo">
                <el-form-item label="关联的用户ID">
                  <el-input v-model="commentinfo.user" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="关联的用户名">
                  <el-input v-model="commentinfo.user_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="关联的产品ID">
                  <el-input v-model="commentinfo.product" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="评价">
                  <el-input v-model="commentinfo.co_type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                  <el-input v-model="commentinfo.content" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addcomment(commentinfo)">确 定</el-button>
              </div>
            </el-dialog>
          </el-col>
        </el-row>
      </div>
      <div v-if="commentlist.length>0" class="aa">
        <el-table
          :data="commentlist"
          style="width: 100%">
          <el-table-column
            label="评论ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="用户ID"
            prop="user">
          </el-table-column>
          <el-table-column
            label="用户名"
            prop="user_name">
          </el-table-column>
          <el-table-column
            label="产品ID"
            prop="product">
          </el-table-column>
          <el-table-column
            label="评价"
            prop="">
            <template slot-scope="scope">
              <el-select v-model="scope.row.co_type">
                <el-option label="好评" value="好评"></el-option>
                <el-option label="差评" value="差评"></el-option>
              </el-select>
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
              <el-button @click="updatecomment(scope.row)" type="primary" size="small">修改</el-button>
              <el-button @click="deletecomment(scope.row.id)" type="danger" size="small">删除</el-button>
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
        id: '',
        dialogVisible: false,
        commentlist: [],
        commentinfo: {
          user: '',
          user_name: '',
          product: '',
          co_type: '',
          content: '',
        },
        commentinfo2: {
          user: '',
          user_name: '',
          product: '',
          co_type: '',
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
        let url = this.baseUrl + "/adminapi/comment/";
        this.$http.get(url, this.headers).then((res) => {
          if (res.data.status === 0) {
            this.commentlist = res.data.data;
            // 总页数
            this.pageCount = res.data.total_page;
            //总条目数
            this.aSum = res.data.total;
            // 当前页数
            this.currentPage = res.data.currenr_page;
            // 每页显示条目数
            this.pagesize = res.data.page_size;
            console.log(this.commentlist)
          } else {
            this.commentlist = [];
          }
        })
      },
      searchcomment() {
        let url = this.baseUrl + "/adminapi/comment/";
        if (this.id !== 0) {
          url = url + "?id=" + this.id;
        }
        this.$http.get(url, this.headers).then((res) => {
          if (res.data.status === 0) {
            this.commentlist = res.data.data;
            // 总页数
            this.pageCount = res.data.total_page;
            //总条目数
            this.aSum = res.data.total;
            // 当前页数
            this.currentPage = res.data.currenr_page;
            // 每页显示条目数
            this.pagesize = res.data.page_size;
          } else {
            this.commentlist = [];
          }
        })
      },
      addcomment(form) {
        let url = this.baseUrl + "/adminapi/comment/";
        this.$http.post(url, form,
          this.headers).then((res) => {
          this.commentinfo = this.commentinfo2;
          this.dialogVisible = false;
          this.$message(res.data.msg);
        })
      },
      updatecomment(row) {
        console.log(row.id)
        let url = this.baseUrl + "/adminapi/comment/" + row.id + '/';
        this.$http.put(url, row,
          this.headers).then((res) => {
          this.dialogVisible = false;
          this.$message(res.data.msg);
        })
      },
      deletecomment(id) {
        let url = this.baseUrl + "/adminapi/comment/" + id + '/';
        this.$http.delete(url, this.headers).then((res) => {
          this.$message(res.data.msg);
        })
      },
      handleCurrentChange(val) {
        let url = this.baseUrl + "/adminapi/comment/?page=" + val;
        if (this.pro_id !== 0) {
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
