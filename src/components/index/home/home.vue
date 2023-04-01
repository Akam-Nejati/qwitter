<script setup lang="ts">
import Qwits from './qwits.vue';
import CreatePost from './createPost.vue';
</script>

<template>
    <div class="d-flex">
        <div class="qwits mr-lg-16">
            <Qwits />
        </div>
        <div>
            <CreatePost class="create-post" />
        </div>
    </div>
</template>

<style scoped>
@media screen and (max-width: 800px) {
    .qwits {
        width: 100% !important;
        margin: 0 1rem;
    }
}

.qwits {
    width: 25rem;
    height: calc(100vh - 5rem);
    overflow-y: scroll;
}

.qwits::-webkit-scrollbar-track {
    opacity: 0 !important;
    width: 0;
}

.qwits::-webkit-scrollbar {
    opacity: 0 !important;
    width: 0;
}

.qwits::-webkit-scrollbar-thumb {
    opacity: 0 !important;
    width: 0;
}
</style>