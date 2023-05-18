<script setup lang="ts">
import HeaderCmp from '../components/HeaderCmp.vue';
import MenuCmp from '../components/MenuCmp.vue';
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <HeaderCmp></HeaderCmp>
    </div>
    <div class="container">
      <div class="menu">
        <MenuCmp></MenuCmp>
      </div>
      <div class="content">this is home</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  .menu {
    width: 200px;
  }
}
</style>
