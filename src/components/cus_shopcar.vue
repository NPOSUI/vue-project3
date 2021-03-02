<template>
  <el-container>
    <el-header>
      <h4>购物车</h4>
    </el-header>
    <el-main>
      <div v-if="shoplist.length>0">
        {{seletctPro}}
        <el-row>
          <el-col :span="6">商品名称</el-col>
          <el-col :span="6">类型</el-col>
          <el-col :span="3">价格</el-col>
<!--          <el-col :span="3">数量</el-col>-->
<!--          <el-col :span="3">总价</el-col>-->
          <el-col :span="3">操作</el-col>
        </el-row>
        <el-row v-for="list in shoplist">
          <el-col :span="6">
            <el-checkbox v-model="seletctPro" :label="list.id" @change='list.checked = !list.checked'>
              {{list.name}}
            </el-checkbox>
          </el-col>
          <el-col :span="6">{{list.type}}</el-col>
          <el-col :span="3">{{list.price}}</el-col>
          <el-col :span="3">
            <span @click="loseNum(list)">-</span>
            {{list.num}}
            <span @click="upNum(list)">+</span>
          </el-col>
          <el-col :span="3">{{list.price*list.num}}</el-col>
          <el-col :span="3">
            <span @click="delProduct(list)">删除</span>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <div>
          <a href="http://localhost:8080/#/Pro_index">
            <h3>购物车内没有商品，快去逛逛吧！！！</h3>
          </a>
        </div>
      </div>
      <div id="bott">
        <el-row>
          <el-col :span="2">
            <el-checkbox v-model="allcheck" @change="getAllchecked">全选</el-checkbox>
          </el-col>
          <el-col :span="4">
            已选件数：{{ProCount}}
          </el-col>
          <el-col :span="4">
            合计：{{ProTotal}}
          </el-col>
          <el-col :span="2">
            <el-button type="danger" @click="putOrder">下单</el-button>
          </el-col>
        </el-row>
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
              allcheck: false,
              seletctPro: [],
              ProCount: 0,
              ProTotal: 0,
              shoplist: [],
              headers: {"Authorization": "JWT " + localStorage.getItem('token')},
              userid: JSON.parse(localStorage.getItem('user')).id,
              pro_id: '',
            }
        },
        mounted() {
          this.getShoplist()
        },
        methods: {
            // 获取购物车列表
            getShoplist(){
              let url = this.baseUrl + '/shopcar/' + this.userid + '/';
              this.$http.get(url, this.headers).then((res) => {
                localStorage.setItem('shopproducts', JSON.stringify(res.data.data));
              });
              this.shoplist = JSON.parse(localStorage.getItem('shopproducts'));
              this.shoplist.forEach(ite => {
                ite.checked = false;
                ite.num = 1;
              });
            },
            loseNum(list){
              if(list.num === 0) return ;
              list.num--;
              this.getTotal();
            },
            upNum(list){
              if(list.num === 1000) return ;
              list.num++;
              this.getTotal();
            },
            delProduct(pro){
              let indexid = this.shoplist.findIndex(product =>{
                if (product.id === pro.id){
                  this.pro_id = product.id;
                  return product.id === pro.id
                }
              });
              this.shoplist.splice(indexid,1);
              this.getTotal();
              console.log(this.pro_id);
              let url = this.baseUrl + '/shopcar/' + this.pro_id + '/';
              this.$http.delete(url, this.headers).then((res) => {
                console.log(res.data)
              });
            },
            getTotal(){
              let countPro = 0;  // 总件数
              let totalPro = 0;  // 总价
              this.shoplist.forEach(ite => {
                if (ite.checked){
                  countPro = countPro + parseInt(ite.num);
                  totalPro = totalPro + (parseFloat(ite.price).toFixed(2) * ite.num)
                }
              });
              this.ProCount = countPro;
              this.ProTotal = totalPro;
            },
            getAllchecked(val){
              let selectall = [];
              if(val) {
                this.shoplist.forEach(ite => {
                  ite.checked = true;
                  selectall.push(ite.id)
                });
                this.seletctPro = selectall;
              } else {
                this.shoplist.forEach(ite => {
                  ite.checked = false;
                });
                this.seletctPro = [];
              }
            },
            putOrder(){
                let products = [];
                this.shoplist.forEach(ite => {
                  if (ite.checked === true){
                    products.push(ite)
                  }
                });
                if (products.length === 0){
                  console.log('没有选则产品');
                  return ;
                }
                let url = this.baseUrl + "/orders/";
                this.$http.post(url, {userid: this.userid, total: this.ProTotal, productinfo: products}, this.headers).then((res) => {
                  console.log(res.data);
                })
            }
        },
        watch:{
          seletctPro(){
            this.getTotal();
            if (this.seletctPro.length === this.shoplist.length){
              this.allcheck = true
            }else {
              this.allcheck = false
            }
          },
        }
    }
</script>

<style scoped>

</style>
