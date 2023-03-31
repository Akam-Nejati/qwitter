import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGetQwits = defineStore("getQwits", () => {
  const qwits = ref<any>();
  const loading = ref<boolean>(false);

  function getQwits() {
    loading.value = true;

    axios
      .get("http://localhost:3000/qwits")
      .then((res) => {
        qwits.value = res.data;
        loading.value = false;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return {
    qwits,
    loading,
    getQwits,
  };
});
