<script setup>
import { ref, watch } from 'vue';
import { RouterView, RouterLink, useRoute } from 'vue-router';
import configList from '@/router/config';

const route = useRoute();
const menuList = ref([...configList]);
const routePath = ref(route.fullPath);

watch(
  () => route.fullPath,
  (newValue) => {
    routePath.value = newValue;
  }
);
</script>

<template>
  <div class="container">
    <aside class="aside">
      <ul class="menu">
        <li
          v-for="item in menuList"
          :key="item.path"
          :class="['item', routePath === item.path ? 'active' : '']"
        >
          <router-link class="link" :to="item.path">
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </aside>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.aside {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 160px;
  height: 100%;
  padding-bottom: 20px;
  border-right: 1px solid #e8e8e8;
  box-sizing: border-box;
  overflow-y: auto;
  user-select: none;
  background: #fff;
}

.menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu .item {
  height: 36px;
  line-height: 36px;
  padding: 0 1em;
  color: #5e6d82;
  font-size: 13px;
  box-sizing: border-box;
  cursor: pointer;
}

.menu .item:hover {
  color: #409eff;
}

.menu .item.active {
  color: #409eff;
}

.menu .link {
  display: block;
  width: 100%;
  height: 100%;
}

.main {
  margin-left: 160px;
  height: 100%;
  background: #b6cdc0;
  overflow: hidden;
}
</style>
