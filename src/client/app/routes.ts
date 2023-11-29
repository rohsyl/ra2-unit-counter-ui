// @ts-ignore
import Dashboard from "./views/Dashboard.vue";
// @ts-ignore
import Scoreboard from "./views/Scoreboard.vue";
// @ts-ignore
import Settings from "./views/Settings.vue";
import ConfigProvider from "./providers/ConfigProvider";

export default function getRoutes(): any[] {
    const prefix = ConfigProvider.config.client.base_path;
    return [
        { path: prefix + '/', component: Dashboard },
        { path: prefix + '/scoreboard', component: Scoreboard },
        { path: prefix + '/settings', component: Settings },
        { path: prefix + '/*', redirect: '/' },
    ]
}
