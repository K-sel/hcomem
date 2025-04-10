import { ref, watch } from "vue";
import * as jsonStorage from "@/utils/jsonStorage.js";

export function useJsonStorage(key, defaultValue = null) {
  // Création de la référence avec la valeur par défaut
  const data = ref(defaultValue);
  
  // Tentative de récupération depuis le stockage local
  const storedValue = jsonStorage.getItem(key);
  
  // Si une valeur existe en storage, on l'utilise
  if (storedValue !== null && storedValue !== undefined) {
    data.value = storedValue;
  }
  
  // Surveillance des changements pour mise à jour du stockage
  watch(
    data, 
    (newValue) => {
      if (newValue !== null && newValue !== undefined) {
        jsonStorage.setItem(key, newValue);
      }
    }, 
    { deep: true }
  );

  return { data };
}