<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref<string>();
const password = ref<string>();
const loading = ref<boolean>(false);
const errorMassage = ref<string>();
const data = ref<any>();
const router = useRouter()

const emailRules = [
    (value: any) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            return true;

        return "Your email is not valid";
    },
];

const passwordRules = [
    (value: any) => {
        if (value && value.length > 6) return true;

        return "Your password is too short";
    },
];

function login() {
    if (email.value && password.value) {
        loading.value = true
        axios
            .post("https://smiling-tangible-ambert.glitch.me/login", {
                email: email.value,
                password: password.value,
            })
            .then((res) => {
                errorMassage.value = "";
                data.value = res.data.user
                loading.value = false
                router.push("/home")
                localStorage.setItem("id", JSON.parse(data.value.id))
            })
            .catch((error) => {
                delete data.value;
                errorMassage.value = error.response.data;
                console.log(error);
                loading.value = false
            });
    }
}
</script>

<template>
    <v-window-item :value="1">
        <v-sheet class="mx-auto">
            <v-form class="form d-flex flex-column justify-space-between" @submit.prevent="login()">
                <div>
                    <div>
                        <v-alert class="mb-4" v-show="errorMassage || data" :type="errorMassage ? 'error' : 'success'"
                            :title="errorMassage ? 'Login failed' : 'Login success'"
                            :text="errorMassage ? errorMassage : ''"></v-alert>
                    </div>
                    <div>
                        <v-text-field v-model="email" label="Email *" :rules="emailRules" required type="email"
                            color="indigo-lighten-3"></v-text-field>

                        <v-text-field v-model="password" label="Password *" :rules="passwordRules" required clearable
                            type="password" color="indigo-lighten-3"></v-text-field>
                    </div>
                </div>

                <v-btn type="submit" color="indigo-lighten-1" class="align-self-start" :disabled="loading">
                    <v-progress-circular indeterminate model-value="20" :size="20" class="mr-2"
                        v-if="loading"></v-progress-circular>
                    Login
                </v-btn>
            </v-form>
        </v-sheet>
    </v-window-item>
</template>
