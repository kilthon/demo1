<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { config } from '@/config/settings.ts';
import router from '@/router';
import { useUserStore, pinia } from '@/store';
export default defineComponent({
  setup() {
    const userStore = useUserStore(pinia);
    const title = config.title;
    const isMenuCollapse = ref(false);
    const menuList: string[] = reactive([]);
    const setMenu = () => {
      userStore.menu.forEach((item) => {
        if (typeof item === 'string') menuList.push(item);
        else menuList.push(Object.keys(item)[0]);
      });
      console.log(menuList);
    };
    const clickLogo = () => {
      router.push('/WorkSpace');
    };
    setMenu();
    return {
      title,
      clickLogo,
      isMenuCollapse,
      menuList,
    };
  },
});
</script>

<template>
  <div class="header">
    <div class="wp-logo" :class="[{ 'menu-collapse': isMenuCollapse }]" @click="clickLogo">
      <img class="logo-img" src="@/assets/logo.png" />
      <span v-if="!isMenuCollapse" class="logo-title">{{ title }}</span>
    </div>
    <div class="wp-nav">
      <div>工作台</div>
    </div>
    <div class="wp-ctrl"></div>
  </div>
</template>

<style scoped lang="less">
.header {
  height: 65px;
  display: flex;
  .wp-logo {
    height: 100%;
    width: 256px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #002140;
    color: #fff;
    box-shadow: 0 0 10px #ccc;
    cursor: pointer;
    .logo-img {
      height: 30px;
    }
    .logo-title {
      margin-left: 6px;
      font-size: 26px;
    }
  }
}
</style>
