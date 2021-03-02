<template>
  <div>
    {{pro_id}}
  </div>

</template>

<script>
  export default {
    data() {
      return {
        pro_id: '',
      }
    },
    mounted() {
      this.pro_id = this.$route.params.id;
      this.getdata()
    },
    methods: {
      getdata() {
        console.log("成功")
      },

    }
  }

</script>

<style scoped>

</style>
