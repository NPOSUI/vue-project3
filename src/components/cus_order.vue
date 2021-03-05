<template>
  <el-container>
    <el-main>
      <div v-if="orderlist.length>0" class="aa">
        <el-table
          :data="orderlist"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props" >
              <el-form label-position="left" inline class="demo-table-expand">
                <!--                <el-form-item label="购买商品">-->
                <!--                  <span>{{ props.row.product.}}</span>-->
                <!--                </el-form-item>-->
                <el-table
                  :data="props.row.product" class="cc">
                  <el-table-column
                    label="产品ID"
                    prop="id">
                  </el-table-column>
                  <el-table-column
                    label="产品名称"
                    prop="name">
                  </el-table-column>
                  <el-table-column
                    label="数量"
                    prop="count">
                  </el-table-column>
                </el-table>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="订单ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="总金额"
            prop="total">
          </el-table-column>
          <el-table-column
            label="下单时间"
            prop="date">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">取消订单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <div>
          <a href="http://localhost:8080/#/Pro_index">
            <h3>没有订单，快去逛逛吧！！！</h3>
          </a>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
    import axios from 'axios';

    //导入image路径,也可以不用这种方法，可能还比较难看
    import pro_logo from '../assets/image/pro_logo.jpg'
    export default {
      data() {
        return {
          orderlist: [],
          index: '',
        }
      },
      created() {
        this.getAllOrder()
      },
      mounted() {

      },
      methods: {
        getAllOrder() {
          let url = this.baseUrl + '/orders/' + JSON.parse(localStorage.getItem('user')).id + '/';
          this.$http.get(url, this.headers).then((res) => {
            localStorage.setItem('orders', JSON.stringify(res.data.data))
          });
          this.orderlist = JSON.parse(localStorage.getItem('orders'))
        },
        handleClick(row) {
          this.orderlist.forEach(ite => {
            if (ite.id === row.id){
              this.index = ite.id
            }
          });
          let url = this.baseUrl + '/orders/' + this.index + '/';
          this.$http.delete(url, this.headers).then((res) => {
            console.log(res.data)
            localStorage.removeItem('orders')
          });

          this.orderlist.splice(this.index,1);
        },

        test() {
          // let url = "http://localhost:8000/";
          // this.$http.get(url).then((res) => {
          //   console.log(res.data);
          // })
        }
      }
    }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: black;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .aa /deep/ .el-table thead {
    color: #42b983;
  }

</style>
