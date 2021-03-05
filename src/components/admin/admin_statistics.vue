<template>
  <p>statistics</p>
</template>

<script>
  import pro_logo from "@/assets/image/pro_logo.jpg";
  import echarts from "echarts";

  export default {
    data() {
      return {
        img_logo: pro_logo,
        token: localStorage.getItem('token'),
        input: '',
        option: {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        },
      }
    },
    mounted() {
      myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(option);
    },
    methods: {

      test() {
        let url = "http://localhost:8800/";
        this.$http.get(url).then((res) => {
          console.log(res.data);
        })
      }
    }

  }
</script>

<style scoped>

</style>
