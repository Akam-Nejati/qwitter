<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const userName = ref<string>();
const email = ref<string>();
const password = ref<string>();
const loading = ref<boolean>(false);
const errorMassage = ref<string>();
const data = ref();

const userNameRules: any[] = [
    (value: any) => {
        if (value && value.length >= 4) return true;

        return "Your user name is too short";
    },
];

const emailRules: any[] = [
    (value: any) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            return true;

        return "Your email is not valid";
    },
];

const passwordRules: any[] = [
    (value: any) => {
        if (value && value.length > 6) return true;

        return "Your password is too short";
    },
];

function createUser() {
    if (email.value && userName.value && password.value) {
        loading.value = true
        axios
            .post("https://smiling-tangible-ambert.glitch.me/users", {
                userName: userName.value,
                email: email.value,
                password: password.value,
            })
            .then((res) => {
                errorMassage.value = "";
                data.value = res.data;
                loading.value = false
            })
            .catch((error) => {
                data.value = "";
                loading.value = false
                errorMassage.value = error.response.data;
            });
    }
}
</script>

<template>
    <v-window-item :value="2">
        <v-alert class="mb-4" v-show="errorMassage || data" :type="errorMassage ? 'error' : 'success'"
            :title="errorMassage ? 'Signup failed' : 'Signup success'" :text="errorMassage ? errorMassage : ''"></v-alert>
        <v-sheet class="mx-auto">
            <v-form class="form d-flex justify-space-between flex-column" @submit.prevent="createUser()">
                <div>
                    <v-text-field v-model="userName" label="User name *" :rules="userNameRules" required type="text"
                        color="indigo-lighten-3"></v-text-field>

                    <v-text-field v-model="email" label="Email *" :rules="emailRules" required type="email"
                        color="indigo-lighten-3"></v-text-field>

                    <v-text-field v-model="password" label="Password" :rules="passwordRules" required clearable
                        type="password" color="indigo-lighten-3"></v-text-field>
                </div>

                <v-btn type="submit" color="indigo-lighten-1" class="align-self-start" :disabled="loading">
                    <v-progress-circular indeterminate model-value="20" :size="20" class="mr-2"
                        v-if="loading"></v-progress-circular>
                    Signup
                </v-btn>
            </v-form>
        </v-sheet>
    </v-window-item>
</template>
