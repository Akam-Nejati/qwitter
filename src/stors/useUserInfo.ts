import axios from "axios";
import { User } from "@/types/user.interface";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserInfo = defineStore("getUserInfo", () => {
  const id = ref();
  const user = ref<User>();

  
  function getUser() {
    id.value = JSON.parse(localStorage.getItem("id") || "0");

    axios
      .get(`https://smiling-tangible-ambert.glitch.me/users/${id.value}`)
      .then((res) => {
        user.value = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return {
    getUser,
    user,
  };
});
