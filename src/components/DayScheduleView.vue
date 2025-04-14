<script setup>
import { computed } from "vue";
import CourseCard from "./CourseCard.vue";

const props = defineProps({
  schedule: {
    type: Array,
    default: () => [],
  },
  DateSelected: {
    type: String,
  },
  ClassSelected: {
    type: String,
    default: "all",
  },
  CourseSelected: {
    type: String,
    default: "all",
  },
});

// Propriété calculée qui retourne soit les cours du jour, soit un message par défaut
const scheduleOfTheDay = computed(() => {
  if (props.schedule != null) {
    const selectedDate =
      props.DateSelected || new Date().toISOString().split("T")[0]; // Si aucune date n'est sélectionnée, utiliser la date actuelle
    const filteredSchedule = props.schedule.filter((entry) => {
      const entryDate = new Date(entry.end).toISOString().split("T")[0];
      return entryDate === selectedDate;
    });

    // Filtre par classe sélectionnée
    let result = filteredSchedule;
    if (props.ClassSelected !== "all") {
      result = result.filter((entry) => entry.class === props.ClassSelected);
    }

    // Filtre supplémentaire par cours sélectionné
    if (props.CourseSelected && props.CourseSelected !== "all") {
      result = result.filter((entry) => entry.label === props.CourseSelected);
    }

    // Si aucun cours n'est prévu, retourner un tableau avec un message par défaut
    if (result.length === 0) {
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
    return result.sort((a, b) => new Date(a.start) - new Date(b.start));
  }
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
});
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
  gap: 16px;
}
</style>
