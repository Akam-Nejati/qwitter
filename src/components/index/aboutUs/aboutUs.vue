<script setup lang="ts">import { useDrawers } from '@/stors/useDrawers';
import { toRefs } from 'vue';

const DrawersStore = useDrawers()
const { menuDrawer } = toRefs(DrawersStore) 
</script>

<template>
    <v-card class="main rounded-xl bg-grey-lighten-9 d-flex justify-center align-center">
        <div class="inside-box d-flex flex-column justify-space-between">
            <div class="mb-10 d-flex flex-column">
                <div class="menu d-none">
                    <v-icon @click="menuDrawer = true" icon="mdi-menu"></v-icon>
                </div>
                <span class="header text-grey-lighten-2 mt-4">This project created by: <span
                        class="text-indigo-lighten-3">@kam</span></span>
            </div>
            <div class="ml-6">
                <div class="d-flex flex-column justify-space-between">
                    <span class="title ">contact us 📞:</span>
                    <div class=" mt-6">
                        <a class="link text-indigo-lighten-3" href="https://t.me/Akam_320">https://t.me/Akam_320</a>
                    </div>
                </div>
                <div class="mt-10 d-flex flex-column justify-space-between">
                    <span class="title mr-6">Project repository in github 📑:</span>
                    <div class=" mt-6">
                        <a class="link text-indigo-lighten-3" href="">../../assets/img/telegram.svg </a>
                    </div>
                </div>
                <div class="mt-10 d-flex flex-column justify-space-between">
                    <span class="title mr-6">My github 😎:</span>
                    <div class=" mt-6">
                        <a class="link text-indigo-lighten-3"
                            href="https://github.com/Akam-Nejati">https://github.com/Akam-Nejati</a>
                    </div>
                </div>
            </div>
            <div class="mt-10 d-flex">
                <span class="header text-grey-lighten-2"> Thank you, if you see a problem in the project or have a
                    suggestion, send a message to my address in Telegram 🙏</span>
            </div>
        </div>
    </v-card>
</template>

<style scoped>
.inside-box {
    width: 75%;
    height: 75%;
}

.header {
    font-size: 2rem;
}

.title {
    font-size: 1.5rem;
}

.link {
    font-size: 1rem;
    text-decoration: none;
}

.icon {
    width: 3rem !important;
    height: 3rem !important;
    cursor: pointer;
    transition: all .1s ease-in-out;
}

.icon:hover {
    filter: drop-shadow(0 0 2rem #b2b1ff);
}

.main {
    width: 49rem;
    padding: 2rem;
    height: calc(100vh - 5rem);
}

@media screen and (max-width: 1264px) {
    .main {
        width: 25rem;
    }

    .inside-box {
        width: 100%;
        height: 100%;
    }

    .header {
        font-size: 1.5rem;
    }

    .title {
        font-size: 1.5rem;
    }

    .link {
        font-size: 1rem !important;
    }
}

@media screen and (max-width: 800px) {
    .main {
        width: 100%;
        background-color: transparent;
        box-shadow: none;
        overflow: scroll;
        padding: 0 1rem;
    }

    .menu {
        display: inline-block !important;
    }
}
</style>