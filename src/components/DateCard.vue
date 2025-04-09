<script setup>
const props = defineProps({
  date: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

// Calculer le jour de la semaine et le jour du mois
const dateObj = new Date(props.date);
const dayNumber = dateObj.getDate();

// Obtenir l'abréviation du jour de la semaine en français
const getDayAbbreviation = (date) => {
  const days = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
  return days[date.getDay()];
};
const dayAbbreviation = getDayAbbreviation(dateObj);

// Vérifier si c'est aujourd'hui
const today = new Date();
today.setHours(0, 0, 0, 0);
const dateObjCopy = new Date(dateObj);
dateObjCopy.setHours(0, 0, 0, 0);
const isToday = today.getTime() === dateObjCopy.getTime();
</script>

<template>
  <div class="date" :class="{ active: isActive }">
    <p class="number">{{ dayNumber }}</p>
    <p class="label">{{ dayAbbreviation }}</p>
    <div class="dot" v-if="isToday"></div>
  </div>
</template>

<style scoped>
.date {
  display: inline-flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 12px 12px 0px 0px;
  cursor: pointer;
  min-width: 50px;
  transition: background-color 0.3s ease;
}

.date.active {
  background-color: #2163f6;
}

.number {
  font-family: Questrial, sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  color: #2163f6;
  transition: color 0.3s ease;
}

.date.active .number {
  color: #fff;
}

.label {
  font-family: Questrial, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
  color: #2163f6;
  transition: color 0.3s ease;
}

.date.active .label {
  color: #fff;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #2163f6;
}

.date.active .dot {
  background-color: white;
}
</style>