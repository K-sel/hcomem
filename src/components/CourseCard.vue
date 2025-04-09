<script setup>
const props = defineProps({
  entry: Object,
});

// Fonction pour formater correctement les minutes
const formatTime = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  return `${hours}:${minutes === 0 ? "00" : minutes}`;
};
</script>

<template>
  <div class="container">
    <div class="left">
      <p class="courseTitle">{{ props.entry.label }}</p>
      <div class="details">
        <div class="room-class">
          <img src="../assets/persons.svg" alt="" />
          <p>{{ props.entry.class }}</p>
        </div>
        <div class="room-class">
          <img src="../assets/location.svg" alt="" />
          <p>{{ props.entry.room }}</p>
        </div>
      </div>
    </div>
    <div class="right">
      <p class="start">{{ formatTime(props.entry.start) }}</p>
      <p>{{ formatTime(props.entry.end) }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  background: #f0f6fe;
  width: 100%;
  flex-wrap: nowrap;
  box-sizing: border-box;
}

.left {
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  max-width: fit-content; /* S'ajuste au contenu */
}

.right {
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  max-width: fit-content; /* S'ajuste au contenu */
}

.room-class {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
}

div.details {
  display: flex;
  gap: 10px;
  flex-wrap: wrap; /* Permet de passer à la ligne si nécessaire */
  width: fit-content;
}

p.courseTitle {
  color: #182654;
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

p.start {
  color: #182654;
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
}

p {
  color: #182654;
  margin: 0;
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
