<script setup lang="ts">
// import { useBase64 } from '@/composables/base64';
import { useBase64Photo } from '@/stors/useBase64Photo';
import { useUserInfo } from '@/stors/useUserInfo';
import { computed, ref, toRefs } from 'vue';
import { useDisplay } from 'vuetify';
import axios from 'axios';
import { useDrawers } from '@/stors/useDrawers';
import { useGetQwits } from '@/stors/useGetQwits';

const base64Store = useBase64Photo()
const { useBase64 } = toRefs(base64Store)
const DrawersStore = useDrawers()
const { createPostDrawer } = toRefs(DrawersStore)
const qwitsStore = useGetQwits()
const { getQwits } = toRefs(qwitsStore)
const userStore = useUserInfo()
const { user } = toRefs(userStore)
const text = ref<string>()
const photo = ref<any>(() => null)
const loading = ref<boolean>()
const { name } = useDisplay()

async function postQwit(event: any) {
    if (text.value) {
        loading.value = true
        axios.post("https://smiling-tangible-ambert.glitch.me/qwits", {
            idPerson: user.value?.id,
            userNamePerson: user.value?.userName,
            emailPerson: user.value?.email,
            text: text.value,
            photo: await useBase64.value(photo),
            postTime: Date.now(),
            likes: [],
        })
            .then(res => {
                getQwits.value()
                event.target.reset()
                createPostDrawer.value = false
                loading.value = false
            })
            .catch(error => {
                loading.value = false
                console.log(error.data)
            })
    }
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
    <div class="main">
        <v-layout class="bg-grey-darken-4">
            <v-navigation-drawer class="drawer" v-model="createPostDrawer" location="right" :width="width">
                <template v-slot:prepend>
                    <div class="d-flex justify-space-between align-center ma-4 mb-0">
                        <img width="50" class="" src="../../../assets/chat.svg">
                        <v-icon @click="createPostDrawer = false" icon="mdi-close" color="indigo-lighten-3"
                            class="close"></v-icon>
                    </div>
                </template>
                <v-form @submit.prevent="postQwit($event)" class="d-flex flex-column h-100">
                    <div>
                        <v-container fluid>
                            <v-textarea :rules="[value => !!value || 'Required.']" clear-icon="mdi-close-circle"
                                label="Text" v-model="text"></v-textarea>
                        </v-container>
                        <v-file-input v-model="photo" accept="image/*" label="Add photo" class="mx-4"></v-file-input>
                    </div>

                    <div class="pa-2 mt-auto pb-3">
                        <v-btn type="submit" block color="indigo-lighten-1" rounded="xl" :disabled="loading">
                            <v-progress-circular indeterminate model-value="20" :size="20" class="mr-2"
                                v-if="loading"></v-progress-circular> Post </v-btn>
                    </div>
                </v-form>
            </v-navigation-drawer>
        </v-layout>
    </div>
</template>

<style scoped>
@media screen and (min-width: 1264px) {
    .main ::v-deep(.v-layout) {
        position: inherit !important;
        transform: inherit !important;
        width: 20rem;
        border-radius: 24px;
    }

    .main ::v-deep(.drawer) {
        position: inherit !important;
        transform: inherit !important;
        height: calc(100vh - 5rem);
        width: 20rem !important;
        border-radius: 24px;
    }

    .close {
        display: none !important;
    }
}
</style>