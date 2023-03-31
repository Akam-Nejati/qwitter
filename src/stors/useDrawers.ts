import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDrawers = defineStore("Drawers", () => {
    const menuDrawer = ref<boolean>(false);
    const createPostDrawer = ref<boolean>(false);

    return {
        menuDrawer,
        createPostDrawer
    }
});
