<script setup lang="ts">
import Drawer from '@/layouts/drawer.vue';
</script>
<template>
    <div class="d-flex justify-center items-center py-10 h-100">
        <div class="main">
            <div class="drawer mr-lg-16 mr-4">
                <Drawer />
            </div>
            <div class="pages">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 800px) and (min-width: 500px) {

    .pages,
    .main {
        width: 90% !important
    }

    .main {
        justify-content: center !important;
    }

    .drawer {
        margin-right: 0 !important;
        width: 0 !important;
    }
}

@media screen and (max-width: 500px) {

    .pages,
    .main {
        width: 100% !important
    }

    .drawer {
        margin-right: 0 !important;
        width: 0 !important;
    }
}

.main {
    display: flex;
    justify-content: space-around;
}

.pages {
    height: 100%;
    width: calc(100% - 19.9rem);
}
</style>