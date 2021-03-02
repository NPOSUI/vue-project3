<template>
    <div>
        1141
    </div>
</template>

<script>
    export default {
        name: "test",
        data() {
            return {}
        },
        mounted() {
            this.showData()
        },
        methods: {
            showData()
            {

                let url = this.baseUrl +'/login/';
                this.$http.post(url,{username:"admin",password:"123456"}).then((res)=>{
                  localStorage.setItem("tokenData", res.data.token)
                  // this.$router.push({path: '/Pro_index'})
                  let tokendata = localStorage.getItem("tokenData");
                  console.log(tokendata)
                })

            }
        },
    }
</script>

<style scoped>

</style>
