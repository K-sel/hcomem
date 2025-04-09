<script setup>
import { ref, computed } from "vue";
import mock from "../data/mock.json";
import CourseCard from "./CourseCard.vue";

const props = defineProps({
  DateSelected: {
    type: String,
  },
  ClassSelected: {
    type: String,
    default: "all",
  },
});

const schedule = ref(mock);

// Propriété calculée qui retourne soit les cours du jour, soit un message par défaut
const scheduleOfTheDay = computed(() => {
  const selectedDate = props.DateSelected || new Date().toISOString().split("T")[0]; // Si aucune date n'est sélectionnée, utiliser la date actuelle
  const filteredSchedule = schedule.value.filter((entry) => {
    const entryDate = new Date(entry.end).toISOString().split("T")[0];
    return entryDate === selectedDate;
  });

  if (props.ClassSelected !== "all") {
    console.log('Filtrage par classe:', props.ClassSelected);
    // Si une classe spécifique est sélectionnée, filtrer par classe
    return filteredSchedule.filter((entry) => entry.class === props.ClassSelected);
  }

  // Si aucun cours n'est prévu, retourner un tableau avec un message par défaut
  if (filteredSchedule.length === 0) {
    return [
      {
        class: "all",
        label: "Aucun cours prévu",
        room: "-",
        start: new Date(),
        end: new Date(),
        id: -1,
      },
    ];
  }

  // Sinon, retourner les cours filtrés
  return filteredSchedule;
});

console.log(scheduleOfTheDay.value);
</script>

<template>
  <section>
    <CourseCard
      v-for="entry in scheduleOfTheDay"
      :key="entry.id"
      :entry="entry"
    />
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}
</style>
