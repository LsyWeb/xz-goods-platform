<template>
  <div class="result-container">
    <h2>信工院急需物品采购平台</h2>
    <van-icon name="passed" color="#1989fa" :size="80" />
    <h3>提交成功</h3>
    <h4>我们会尽快把所需物品送到您的手上</h4>
    <div class="btn">
      <van-button
        round
        block
        type="primary"
        @click="$router.push('/')"
      >
        返回</van-button
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.result-container {
  padding: 12px;
  width: 100%;
  height: 100vh;
  // background-color: #efefef;
  box-sizing: border-box;
  .btn {
    margin: 16px;
  }
}
</style>