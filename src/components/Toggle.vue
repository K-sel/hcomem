<script setup>
import { ref } from 'vue';

const emit = defineEmits(['toggleClicked']);
const isActive = ref(false);

const toggleClicked = () => {
  isActive.value = !isActive.value;
  emit('toggleClicked', isActive.value);
};

</script>

<template>
  <div class="toggle-container" :class="isActive ? 'active' : 'inactive'" @click="toggleClicked">
    <div class="toggle-button"></div>
  </div>
</template>

<style scoped>
.toggle-container {
  position: relative;
  width: 48px;
  height: 24px;
  border-radius: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-container.active {
  background-color: #2163f6;
}

.toggle-container.inactive {
  background-color: #e5e5e5;
}

.toggle-button {
  position: absolute;
  top: 2px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.4);
}

.toggle-container.inactive .toggle-button {
  transform: translateX(2px);
}

.toggle-container.active .toggle-button {
  transform: translateX(26px);
}

/* Animation optionnelle d'échelle au clic */
.toggle-container:active .toggle-button {
  transform: scale(0.9) translateX(26px);
}

.toggle-container.inactive:active .toggle-button {
  transform: scale(0.9) translateX(2px);
}
</style>