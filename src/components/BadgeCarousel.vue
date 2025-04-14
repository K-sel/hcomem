<!-- BadgeCarousel.vue -->
<script setup>
import { ref, computed } from "vue";

// Récupérer le schedule via props
const props = defineProps({
  schedule: {
    type: Array,
    default: () => []
  }
});

// État pour la classe sélectionnée
const selectedClassId = ref("all");

// Extraire les classes uniques à partir du schedule
const classes = computed(() => {
  // Valeur par défaut avec "Tous"
  const defaultClasses = [{ id: "all", label: "Tous" }];
  
  if (!props.schedule || props.schedule.length === 0) {
    return defaultClasses;
  }

  // Extraire les classes uniques
  const uniqueClassesSet = new Set();
  props.schedule.forEach(event => {
    if (event.class) {
      uniqueClassesSet.add(event.class);
    }
  });

  // Convertir en tableau d'objets
  const classesArray = Array.from(uniqueClassesSet).map(className => ({
    id: className,
    label: className
  }));

  // Ajouter "Tous" en première position
  return [{ id: "all", label: "Tous" }, ...classesArray];
});

// Fonction pour gérer la sélection d'un badge
const selectBadge = (id) => {
  selectedClassId.value = id;
  
  // Émettre l'événement
  emit("classSelected", id);
};

// Émetteur d'événements pour la sélection
const emit = defineEmits(["classSelected"]);
</script>

<template>
  <div class="badge-carousel-container">
    <!-- Conteneur des badges avec défilement horizontal simple -->
    <div class="badge-carousel">
      <div
        v-for="badge in classes"
        :key="badge.id"
        :class="['badge', { active: selectedClassId === badge.id }]"
        @click="selectBadge(badge.id)"
      >
        {{ badge.label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge-carousel-container {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  font-family: Inter;
  font-size: 14px;
  box-sizing: border-box;
  padding-top: 16px;
  padding-bottom: 16px;
}

.badge-carousel {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Pour Firefox */
  -ms-overflow-style: none; /* Pour IE et Edge */
  gap: 12px;
  padding: 10px 0;
}

/* Masquer la scrollbar pour Chrome, Safari et Opera */
.badge-carousel::-webkit-scrollbar {
  display: none;
}

.badge {
  flex: 0 0 auto;
  padding: 10px 20px;
  background-color: #ddeafd;
  color: #2163f6;
  font-weight: 500;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  user-select: none;
}

.badge.active {
  background-color: #4361ee;
  color: white;
}
</style>