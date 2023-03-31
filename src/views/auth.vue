<script setup lang="ts">
import { ref } from 'vue';
import Login from '@/components/auth/login.vue';
import SignUp from '@/components/auth/signUp.vue';

const tabs = ref<null | number>();
</script> 

<template>
    <div class="d-sm-flex justify-sm-center align-sm-center h-screen">
        <v-card class="auth-card pa-4">
            <v-tabs v-model="tabs" color="indigo-lighten-3" grow>
                <v-tab :value="1"> login </v-tab>

                <v-tab :value="2"> signup </v-tab>
            </v-tabs>

            <v-window v-model="tabs" class="mt-4">
                <Login />
                <SignUp />
            </v-window>
        </v-card>
    </div>
</template>

<style>
.auth-card {
    width: 100%;
    height: 100vh;
}

@media only screen and (min-width: 600px) {
    .auth-card {
        width: 30rem !important;
        height: auto;
    }
}

@media screen and (max-width: 600px) {
    .form {
        height: calc(100vh - 6.7rem);
    }
}
</style>