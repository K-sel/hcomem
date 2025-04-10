<!-- BadgeCarousel.vue -->
<script setup>
import { ref } from "vue";

// Liste des classes disponibles
const classes = ref([
  { id: "all", label: "Tous", isActive: true },
  { id: "IM51-1", label: "IM51-1", isActive: false },
  { id: "IM51-2", label: "IM51-2", isActive: false },
  { id: "IM52-1", label: "IM52-1", isActive: false },
  { id: "IM52-2", label: "IM52-2", isActive: false },
  { id: "IM53-1", label: "IM53-1", isActive: false },
  { id: "IM53-2", label: "IM53-2", isActive: false },
  { id: "IM53-3", label: "IM53-3", isActive: false },
]);

// État pour la classe sélectionnée
const selectedClass = ref("tous");

// Fonction pour gérer la sélection d'un badge
const selectBadge = (id) => {
  selectedClass.value = id;
  classes.value = classes.value.map((badge) => ({
    ...badge,
    isActive: badge.id === id,
  }));

  // Ici vous pouvez émettre un événement pour le filtrage
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
        :class="['badge', { active: badge.isActive }]"
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
  font-family: Questrial;
  font-size: 18px;
  box-sizing: border-box;
  padding: 16px;
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
