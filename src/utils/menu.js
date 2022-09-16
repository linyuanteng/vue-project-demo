import router from "@/router";
import { v4 as uuidv4 } from "uuid";

/**
 * 根据路由列表获取菜单列表
 * @returns 菜单列表
 */
export function getMenuFromRouter() {
  const fn = (array) => {
    return array
      .filter((item) => !item.meta.hidden)
      .map((item) => {
        return {
          id: uuidv4(),
          name: item.meta.title || item.name || "",
          type: item.children && item.children.length > 0 ? 0 : 1,
          url: item.path || "",
          icon: item.meta.icon || "",
          children: fn(item.children || []),
        };
      });
  };
  return fn(router.options.routes);
}
