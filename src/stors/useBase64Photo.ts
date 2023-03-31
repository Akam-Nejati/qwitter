import { defineStore } from "pinia";
export const useBase64Photo = defineStore("Base64Photo", () => {
  const useBase64 = (photo: any) => {
    if (!photo.value) {
      return;
    }

    return new Promise<string | ArrayBuffer | null>((resolve) => {
      if (typeof FileReader === "undefined") {
        console.error("not working");
      }

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        resolve(reader.result as string);
      });
      reader.readAsDataURL(photo.value[0]);
    });
  };

  return {
    useBase64,
  };
});
