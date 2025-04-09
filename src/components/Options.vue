<script setup>
import Toggle from "./Toggle.vue";
import { defineEmits } from "vue";

const emit = defineEmits(["buttonClicked", "toggleClicked"]);

const handleToggleClick = (value) => {
  emit("toggleClicked", value);
};



</script>

<template>
  <div class="container">
    <div class="historyToggle">
      <span class="active">Voir l'historique</span>
      <Toggle @toggleClicked="handleToggleClick"></Toggle>
    </div>
    <button @click="emit('buttonClicked')">Aujourd'hui</button>
  </div>
</template>

<style scoped>
div.container {
  width: 100%;
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

div.historyToggle {
  display: flex;
  align-items: center;
  gap: 5px;
}

button {
  height: 44px;
  padding: 8px 16px;
  font-family: Inter;
  font-size: 18px;
  border-radius: 12px;
  background: #2163f6;
  color: white;
  border: none;
  white-space: nowrap;
}

span.active {
  color: #2163f6;
  font-family: Inter;
  font-size: 18px;
  white-space: nowrap;
}
</style>
