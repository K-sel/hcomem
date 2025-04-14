<script setup>
import TheWelcome from "./components/TheWelcome.vue";
import Options from "./components/Options.vue";
import CalendarCarousel from "./components/CalendarCarousel.vue";
import BadgeCarousel from "./components/BadgeCarousel.vue";
import { ref } from "vue";
import { useFetchJson } from "./composables/useFetchJson.js";
// Import direct des deux composants d'affichage
import DayScheduleView from "./components/DayScheduleView.vue";

// Référence pour suivre l'onglet actif
const activeTab = ref(0);
const showHistory = ref(false);
const todayClicked = ref(false);
const DateSelected = ref(null);
const ClassSelected = ref("all");
const CourseSelected = ref("all");


const {
  data: schedule,
  loading,
  error,
} = useFetchJson({ url: "/api/schedule/all" });


const handleClickOnAujourdhuiButton = () => {
  todayClicked.value = !todayClicked.value;
};

const handleToggleClick = (state) => {
  showHistory.value = state;
};

const handleDateChange = (date) => {
  DateSelected.value = date;
};

const handleClassChange = (className) => {
  ClassSelected.value = className;
  console.log("Class selected:", className);
};

</script>

<template>
  <div class="app-container">
    <header>
      <TheWelcome></TheWelcome>
    </header>
    <main>

      <!-- Première section : Calendrier -->
      <div v-if="activeTab === 0" class="section-container">
        <Options
          @buttonClicked="handleClickOnAujourdhuiButton"
          @toggleClicked="handleToggleClick"
        ></Options>
        <CalendarCarousel
          @dateSelected="handleDateChange"
          :showHistory="showHistory"
          :todayClicked="todayClicked"
          :schedule="schedule"
        ></CalendarCarousel>
        <BadgeCarousel
          @classSelected="handleClassChange"
          :schedule="schedule"
        ></BadgeCarousel>

        <!-- Vue par jour -->
        <DayScheduleView
          :DateSelected="DateSelected"
          :ClassSelected="ClassSelected"
          :schedule="schedule"
          :CourseSelected="CourseSelected"
        />
      </div>

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
  height: 100%;
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
  position: relative;
}

main {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 32px 32px 0px 0px;
  background: var(--bg-default, #fff);
  box-sizing: border-box;
  flex-grow: 1;
  margin-top: auto;
  min-height: 70vh;
}

.tabs-container {
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  z-index: 10;
  padding: 16px;
  border-radius: 24px 24px 0 0;
}

.section-container {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.echeances-content {
  width: 100%;
}

.sample-echeances {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.echeance-item {
  padding: 16px;
  background-color: #f5f8ff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.echeance-item h3 {
  margin-top: 0;
  color: #2163f6;
}

header {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 32px;
  margin-bottom: 32px;
  gap: 32px;
  max-width: 800px;
  box-sizing: border-box;
  padding: 0 32px;
}
</style>
