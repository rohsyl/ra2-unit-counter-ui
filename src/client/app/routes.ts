import Dashboard from "./views/Dashboard.vue";
import Scoreboard from "./views/Scoreboard.vue";
import Settings from "./views/Settings.vue";

export default [
    { path: '/', component: Dashboard },
    { path: '/scoreboard', component: Scoreboard },
    { path: '/settings', component: Settings },
    { path: '/*', redirect: '/' },
]
