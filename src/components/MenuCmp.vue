<script lang="ts">
import { reactive, defineComponent } from 'vue';
import { useUserStore, pinia } from '@/store';
export default defineComponent({
  setup() {
    const userStore = useUserStore(pinia);
    const menuList = reactive(userStore.menu);
    return { menuList };
  },
});
</script>

<template>
  <el-menu class="el-menu-vertical-demo">
    <el-menu-item>hello</el-menu-item>
    <template v-for="item of menuList" :key="item.name">
      {{ item.path }}
    </template>
  </el-menu>
</template>
