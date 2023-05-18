import router from '@/router';
import { getMenuApi } from '@/api';
const modules = import.meta.glob([
  '../components/*.vue',
  '../components/*/*.vue',
  '../components/*/*/*.vue',
]);

const genRouteName = (name: string, ch: string, path: boolean) => {
  let str = name;
  str = str[0].toUpperCase() + str.substring(1);
  let idx = -1;
  while (str.indexOf(ch) !== -1) {
    idx = str.indexOf(ch);
    str = str.replace(ch, '');
    str = str.substring(0, idx) + str[idx].toUpperCase() + str.substring(idx + 1);
  }
  if (path && idx === -1) str += 'Cmp';
  return str;
};

const genCmpPath = (faRoute: string, name: string) => {
  const path = faRoute + '/' + genRouteName(name, '-', true);
  return path;
};

// item类型有两种：字符串或者对象
// 字符串表示需要展示的子路由
// 对象表示是不需要展示的父路由，还有子路由需要遍历
export const generateRoutes = (faRoute: string, data: any[]) => {
  const arr: any[] = [];
  data.forEach((item) => {
    if (typeof item === 'string') {
      const name = genRouteName(item, '-', false);
      const path =
        faRoute === '' ? '/' + genRouteName(item, '-', false) : genRouteName(item, '-', false);
      const meta = { requireToken: true };
      const cmpPath = genCmpPath(faRoute, item);
      const component = modules[`../components${cmpPath}.vue`]();
      arr.push({ path, name, component, meta });
    } else {
      Object.keys(item).forEach((key) => {
        const meta = { requireToken: true };
        const path =
          faRoute === '' ? '/' + genRouteName(key, '_', false) : genRouteName(key, '_', false);
        const str = genRouteName(key, '_', false);
        const children = generateRoutes(faRoute + '/' + str, item[key]);
        arr.push({ path, name: str, meta, children });
      });
    }
  });
  return arr;
};

export const genRoute = (menu: any[]) => {
  const routes = generateRoutes('', menu);
  routes.forEach((item) => router.addRoute(item));
  return routes;
};

export const getMenu = (token: string) => {
  getMenuApi({ token: token }).then((res) => {
    if (res) {
      return res;
    }
  });
  return [];
};
