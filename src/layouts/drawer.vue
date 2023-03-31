<script setup lang="ts">
import { List } from "../types/list.interface";
import { useDisplay } from "vuetify";
import { computed, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useUserInfo } from "@/stors/useUserInfo";
import { useDrawers } from "@/stors/useDrawers";
import AccountSkeleton from "@/components/skeleton/accountSkeleton.vue";

const DrawersStore = useDrawers()
const { menuDrawer } = toRefs(DrawersStore)
const userStore = useUserInfo()
const { user } = toRefs(userStore)
const selected_item = ref<string>("home");
const { name } = useDisplay()
const router = useRouter()
const list = ref<List[]>([
    {
        title: "Home",
        icon: "mdi-home-city",
        value: "home",
        link: "/home",
        active: true,
    },
    {
        title: "About Us",
        icon: "mdi-account-alert",
        value: "aboutUs",
        link: "/aboutUs",
        active: false,
    },
]);

function logOut() {
    localStorage.removeItem("id")
    router.push("/auth")
}

const width = computed(() => {
    switch (name.value) {
        case 'xs': return 500
        case 'sm': return 400
    }

    return undefined
})

</script>

<template>
    <div class="main ml-4">
        <v-layout class="layout h-100 bg-grey-darken-4">
            <v-navigation-drawer class="drawer bg-grey-darken-4" v-model="menuDrawer" temporary :width="width">
                <template v-slot:prepend>
                    <div class="d-flex justify-space-between align-center ma-4 mb-0">
                        <img width="50" class="" src="../assets/chat.svg">
                        <v-icon @click="menuDrawer = false" icon="mdi-close" color="indigo-lighten-3"
                            class="close"></v-icon>
                    </div>
                    <AccountSkeleton class="pa-4" v-if="!user" />
                    <div v-else class="d-flex align-center pa-4">
                        <v-avatar color="green mr-4">
                            <span class="text-h6">{{ user?.userName.slice(0, 1) }}</span>
                        </v-avatar>
                        <div class="d-flex flex-column">
                            <span>{{ user?.userName }}</span>
                            <small>{{ user?.email }}</small>
                        </div>
                    </div>
                </template>
                <v-divider></v-divider>

                <v-list density="compact" class="px-4" nav>
                    <RouterLink class="item" v-for="(item, index) in list" :key="index" :to="item.link">
                        <v-list-item class="text-h6 py-4" :prepend-icon="item.icon" :title="item.title" :value="item.value"
                            @click="selected_item = item.value" :active="item.value === selected_item"
                            active-color="indigo-lighten-1" rounded="xl" active-class="pl-5"></v-list-item>
                    </RouterLink>
                </v-list>

                <template v-slot:append>
                    <div class="pa-2">
                        <v-btn @click="logOut()" block color="indigo-lighten-1" rounded="xl"> Logout </v-btn>
                    </div>
                </template>
            </v-navigation-drawer>
        </v-layout>
    </div>
</template>

<style scoped>
@media screen and (min-width: 800px) {
    .main ::v-deep(.layout) {
        position: inherit !important;
        transform: inherit !important;
        margin-left: 0 !important;
        border-radius: 24px !important;
    }

    .main ::v-deep(.drawer) {
        position: inherit !important;
        transform: inherit !important;
        height: calc(100vh - 5rem) !important;
        width: 20rem !important;
        border-radius: 24px !important;
    }

    .close {
        display: none !important;
    }
}

.item {
    transition: all .2s ease-in-out !important;
    color: inherit;
    text-decoration: none;
}
</style>