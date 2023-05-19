<script lang="ts" setup>
import Menu from './components/MenuCmp.vue';
import Header from './components/HeaderCmp.vue';
</script>

<template>
  <div class="wrapper">
    <Header></Header>
    <div class="content">
      <div class="menu">
        <Menu></Menu>
      </div>
      <div class="main-view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  display: flex;
  flex-direction: column;
  .content {
    display: flex;
  }
}
</style>
