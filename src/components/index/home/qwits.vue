<script setup lang="ts">
import { formatDistance } from 'date-fns';
import axios from 'axios';
import { computed, onMounted, ref, toRefs } from 'vue';
import { DeleteQwitLoading } from "../../../types/deleteQwitLoading.interface"
import { useGetQwits } from '@/stors/useGetQwits';
import { useDrawers } from '@/stors/useDrawers';
import QwitsSkeleton from '@/components/skeleton/qwitsSkeleton.vue';
import { LikeQwitLoading } from '@/types/likeQwitLoading.interface';

const DrawersStore = useDrawers()
const { createPostDrawer, menuDrawer } = toRefs(DrawersStore)
const qwitsStore = useGetQwits()
const { getQwits, qwits, loading: getQwitLoading } = toRefs(qwitsStore)
const deleteQwitLoading = ref<DeleteQwitLoading>({
    loading: false,
    qwitId: null
})
const likeQwitLoading = ref<LikeQwitLoading>({
    loading: false,
    qwitId: null
})
const dialog = ref<boolean>()
const photoDisplayed = ref<string>()
const userId = ref<number>()

userId.value = JSON.parse(localStorage.getItem("id") || "0");

onMounted(() => {
    loadOrReload()
})

function loadOrReload() {
    getQwits.value()
}

const postTime = computed<any>(() => (time: number) => formatDistance(time, new Date(), { addSuffix: true }))
function showPhoto(qwit: any) {
    dialog.value = true
    photoDisplayed.value = qwit.photo
}


function likedPost(qwitId: number, likesArray: number[]) {
    likeQwitLoading.value = {
        loading: true,
        qwitId: qwitId
    }

    function addLike(): number[] {
        likesArray.push(userId.value || 0)
        return likesArray
    }
    function deleteLike(): number[] {
        return likesArray.filter(item => item !== userId.value)
    }

    const doseUserLikePost = likesArray.includes(userId.value || 0)
    const likes = doseUserLikePost ? deleteLike() : addLike()

    axios.patch(`https://smiling-tangible-ambert.glitch.me/qwits/${qwitId}`, {
        likes: likes
    }).then(res => {
        loadOrReload()
        likeQwitLoading.value = {
            loading: false,
            qwitId: null
        }
    }).catch(error => {
        console.log(error);
        likeQwitLoading.value = {
            loading: false,
            qwitId: null
        }
    })
}

function deletePost(qwitId: number) {
    deleteQwitLoading.value = {
        loading: true,
        qwitId: qwitId
    }
    axios.delete(`https://smiling-tangible-ambert.glitch.me/qwits/${qwitId}`)
        .then(res => {
            loadOrReload()
            deleteQwitLoading.value = {
                loading: false,
                qwitId: null
            }
        }).catch(error => {
            console.log(error);
            deleteQwitLoading.value = {
                loading: false,
                qwitId: null
            }
        })
}

</script>

<template>
    <div class="icons d-flex justify-end mb-4">
        <div class="menu d-none">
            <v-icon @click="menuDrawer = true" icon="mdi-menu"></v-icon>
        </div>
        <div class="add-and-reload">
            <v-icon @click="loadOrReload()" icon="mdi-reload"></v-icon>
            <v-icon @click="createPostDrawer = true" icon="mdi-plus" class="add ml-2 d-none"></v-icon>
        </div>
    </div>
    <v-alert class="error-alert mb-4" v-show="qwits?.length === 0" type="warning" title="warning"
        text="we dont have any qwit"></v-alert>
    <template v-if="getQwitLoading">
        <QwitsSkeleton class="skeleton mb-4" v-for="(item, index) in 3" :key="index" />
    </template>
    <div v-else class="d-flex flex-column-reverse">
        <v-lazy :options="{ 'threshold': 0.5 }" transition="fade-transition" v-for="qwit in qwits">
            <v-card class="qwit mb-4 pa-4">
                <div class="d-flex align-center">
                    <v-avatar color="green mr-4">
                        <span class="text-h6">{{ qwit?.userNamePerson.slice(0, 1) }}</span>
                    </v-avatar>
                    <div class="d-flex flex-column w-100">
                        <div class="d-flex justify-space-between">
                            <span>{{ qwit?.userNamePerson }}</span>
                            <small>{{ postTime(qwit.postTime) }}</small>
                        </div>
                        <small>{{ qwit?.emailPerson }}</small>
                    </div>
                </div>
                <div class="my-4">
                    <p class="text-h6">
                        {{ qwit?.text }}
                    </p>
                </div>
                <div>
                    <v-img max-height="125" cover v-if="qwit.photo" @click="showPhoto(qwit)"
                        class="bg-white rounded-lg photo" width="100%" aspect-ratio="16/9" :src="qwit.photo"></v-img>
                </div>
                <div class="mt-4 d-flex">
                    <div  class="d-flex">
                        <div>
                            <v-progress-circular indeterminate model-value="20" :size="20" class="mr-2"
                                v-if="likeQwitLoading.loading && qwit.id === likeQwitLoading.qwitId"></v-progress-circular>
                            <v-icon v-else @click="likedPost(qwit.id, qwit.likes)" icon="mdi-heart" class="like"
                                :class="{ 'text-red-darken-1': qwit.likes.includes(userId) }"></v-icon>
                        </div>
                        <span class="ml-2"> {{ qwit.likes.length }} </span>
                    </div>
                    <div class="ml-4" v-if="qwit.idPerson === userId">
                        <v-progress-circular indeterminate model-value="20" :size="20" class="mr-2"
                            v-if="deleteQwitLoading.loading && qwit.id === deleteQwitLoading.qwitId"></v-progress-circular>
                        <v-icon v-else class="bin" icon="mdi-delete" @click="deletePost(qwit.id)"></v-icon>
                    </div>
                </div>
            </v-card>
        </v-lazy>
        <v-dialog v-model="dialog" width="auto">
            <v-card>
                <img :src="photoDisplayed">
            </v-card>
        </v-dialog>
    </div>
</template>

<style>
@media screen and (max-width: 800px) {
    .menu {
        display: inline-block !important;
    }

    .add-and-reload .add {
        display: inline-block !important;
    }

    .icons {
        justify-content: space-between !important;
    }

    .qwit,
    .error-alert,
    .skeleton {
        width: 100% !important;
    }

}

@media screen and (max-width: 1264px) {
    .add-and-reload .add {
        display: inline-block !important;
    }
}

.qwit,
.error-alert,
.skeleton {
    width: 25rem;
}

.like,
.bin {
    cursor: pointer;
}

.photo {
    cursor: pointer;
}
</style>