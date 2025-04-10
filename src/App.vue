<script setup>
import TheSchedule from "./components/TheSchedule.vue";
import TheWelcome from "./components/TheWelcome.vue";
import Options from "./components/Options.vue";
import CalendarCarousel from "./components/CalendarCarousel.vue";
import TheHeader from "./components/TheHeader.vue";
import TheTitle from "./components/TheTitle.vue";
import BadgeCarousel from "./components/BadgeCarousel.vue";
import { ref } from "vue";

const showHistory = ref(false);
const todayClicked = ref(false);
const DateSelected = ref(null);
const ClassSelected = ref("all");

const handleClickOnAujourdhuiButton = () => {
  console.log("Button Aujourd'hui clicked!");
  todayClicked.value = !todayClicked.value;
};

const handleToggleClick = (state) => {
  console.log("Toggle a " + state);
  showHistory.value = state;
};

const handleDateChange = (date) => {
  console.log("Date selected: " + date);
  DateSelected.value = date;
};

const handleClassChange = (className) => {
  console.log("Class selected: " + className);
  ClassSelected.value = className;
};
</script>

<template>
  <div class="app-container">
    <header>
      <TheTitle></TheTitle>
      <TheWelcome></TheWelcome>
    </header>
    <main>
      <Options
        @buttonClicked="handleClickOnAujourdhuiButton"
        @toggleClicked="handleToggleClick"
      ></Options>
      <CalendarCarousel
        @dateSelected="handleDateChange"
        :showHistory="showHistory"
        :todayClicked="todayClicked"
      ></CalendarCarousel>
      <BadgeCarousel @classSelected="handleClassChange"></BadgeCarousel>
      <TheSchedule
        :DateSelected="DateSelected"
        :ClassSelected="ClassSelected"
      />
    </main>
  </div>
</template>

<style>
/* Styles globaux pour appliquer le fond bleu à l'ensemble du site */
:root {
  --blue-background: #c2dbfd;
}

html,
body {
  margin: 0;
  padding: 0;
  background-color: var(--blue-background);
  min-height: 100%;
  width: 100%;
}
</style>

<style scoped>
.app-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--blue-background, #c2dbfd);
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

main {
  width: 100%;
  max-width: 800px;
  padding: 32px;
  padding-bottom: 64px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Changé de flex-end à flex-start */
  align-items: center;
  border-radius: 32px 32px 0px 0px;
  background: var(--bg-default, #fff);
  box-sizing: border-box;
  flex-grow: 1; /* Ajout de flex-grow pour prendre l'espace disponible */
  margin-top: auto; /* Pousse le main vers le bas */
  min-height: 70vh; /* Garantit une hauteur minimale */
}

header {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 32px;
  margin-bottom: 32px; /* Modifié pour réduire l'espace avant le main */
  gap: 32px;
  max-width: 800px;
  box-sizing: border-box;
  padding: 0 32px;
}
</style>
