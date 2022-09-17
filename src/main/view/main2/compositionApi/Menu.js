import { computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";

export default function () {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    const store = useStore();

    console.log(store);

    const defaultMenu = {
        id: "9999",
        text: "概括",
        checked: false,
        attributes: {
            icon: null,
            url: "./main22.html#/home"
        },
        children: []
    };

    // 初始化菜单
    const init = async () => {
        let menuList = [defaultMenu];
        menuList = menuList.concat(await getMenuList());
        store.commit("SET_MENU_LIST", menuList);
        store.commit("IS_INIT", true);
        openTab(defaultMenu, 0);
    };

    // 获取菜单
    const getMenuList = async () => {
        const menuList = (await _this.$apis.getMenuList()) || [];
        if (menuList.length === 0) {
            // menuList []为空  暂定认为登陆过期 ，提示重新登陆
            _this.$logout({ showTip: true });
        }
        return menuList;
    };

    // 默认打开tab
    const openTab = (target, pid) => {
        let tabObj = {
            pid: pid,
            id: target.id,
            href: target.attributes.url,
            icon: target.attributes.icon,
            title: target.text
        };
        store.dispatch("addTab", tabObj);
    };

    return {
        init
    };
}
