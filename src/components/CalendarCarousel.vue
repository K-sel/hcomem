<script setup>
import { ref, computed, onMounted, watch } from "vue";
import DateCard from "./DateCard.vue";

const props = defineProps({
  schedule: {
    type: Array,
    default: [],
  },
  showHistory: {
    type: Boolean,
    default: false,
  },
  todayClicked: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["dateSelected"]);

const handleDateChange = (date) => {
  emit("dateSelected", date);
};

// Extraire toutes les dates uniques (en format YYYY-MM-DD) et les trier
const uniqueSortedDates = computed(() => {
  if (props.schedule != null) {
    // Filtrer les dates selon le paramètre showHistory
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normaliser à minuit pour comparer les dates correctement

    // Filtrer les rendez-vous selon showHistory
    const filteredSchedule = props.showHistory
      ? props.schedule // Si showHistory est true, on montre toutes les dates
      : props.schedule.filter((entry) => new Date(entry.start) >= today); // Sinon, uniquement celles futures ou d'aujourd'hui

    // Map pour extraire les dates et les convertir en format YYYY-MM-DD
    const allDates = filteredSchedule.map((entry) => {
      const date = new Date(entry.start);
      return date.toISOString().split("T")[0]; // Format YYYY-MM-DD
    });

    // Utiliser un Set pour éliminer les doublons
    const uniqueDates = [...new Set(allDates)];

    // Trier les dates par ordre chronologique
    return uniqueDates.sort();
  }
  return [];
});

// Surveiller les changements de showHistory et rappeler scrollToToday
watch(
  () => props.showHistory,
  () => {
    // Attendre que uniqueSortedDates soit recalculé avant de scroller
    scrollToToday();
  }
);

// Surveiller les changements de showHistory et rappeler scrollToToday
watch(
  () => props.todayClicked,
  () => {
    // Attendre que uniqueSortedDates soit recalculé avant de scroller
    scrollToToday();
  }
);

// Date sélectionnée (par défaut: aujourd'hui ou la première date disponible)
const today = new Date().toISOString().split("T")[0];
const selectedDate = ref(
  uniqueSortedDates.value.includes(today)
    ? today
    : uniqueSortedDates.value[0] || ""
);

// Titre du mois actuel affiché
const currentMonthTitle = ref("");

// Fonction pour formater le titre du mois (ex: "Avril, 2024")
const formatMonthTitle = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "long", year: "numeric" };
  // Formater en français avec première lettre en majuscule
  const formatted = date.toLocaleDateString("fr-FR", options);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

// Fonction pour sélectionner une date
const selectDate = (date) => {
  selectedDate.value = date;
};

// Référence pour le carrousel
const carouselRef = ref(null);

// Fonction pour déterminer le mois visible dans la vue
const updateVisibleMonth = () => {
  const carousel = carouselRef.value;
  if (!carousel) return;

  const dateItems = carousel.querySelectorAll(".date-item");
  const datesDiv = document.getElementById("dates");
  const datesRect = datesDiv.getBoundingClientRect();

  // Déterminer le point de référence (approximativement 1/3 de la largeur visible)
  // Pour mieux détecter les changements de mois dans les deux directions
  const referencePoint = datesRect.left + datesRect.width / 3;

  let visibleMonthDate = null;
  let closestDistance = Infinity;

  // Trouver l'élément de date le plus proche du point de référence
  for (let i = 0; i < dateItems.length; i++) {
    const itemRect = dateItems[i].getBoundingClientRect();

    // Calculer la distance entre le centre de l'élément et le point de référence
    const itemCenter = itemRect.left + itemRect.width / 2;
    const distance = Math.abs(itemCenter - referencePoint);

    // Si cet élément est plus proche que le précédent trouvé
    if (
      distance < closestDistance &&
      itemRect.right > datesRect.left &&
      itemRect.left < datesRect.right
    ) {
      closestDistance = distance;
      visibleMonthDate = uniqueSortedDates.value[i];
    }
  }

  // Mettre à jour le titre du mois si on a trouvé une date visible
  if (visibleMonthDate) {
    const newMonthTitle = formatMonthTitle(visibleMonthDate);

    // Ne mettre à jour que si le titre change, pour éviter les re-rendus inutiles
    if (newMonthTitle !== currentMonthTitle.value) {
      currentMonthTitle.value = newMonthTitle;
    }
  }
};

const scrollToToday = () => {
  selectedDate.value = today;
  const carousel = carouselRef.value;
  if (!carousel) return;

  // Trouver l'index de la date du jour
  const todayIndex = uniqueSortedDates.value.indexOf(today);

  if (todayIndex >= 0) {
    const dateElements = carousel.querySelectorAll(".date-item");
    const todayElement = dateElements[todayIndex];

    if (todayElement) {
      // Obtenir les coordonnées de la div#dates
      const datesDiv = document.getElementById("dates");
      const datesRect = datesDiv.getBoundingClientRect();

      // Obtenir les coordonnées de l'élément du jour
      const todayRect = todayElement.getBoundingClientRect();

      // Calculer la différence entre la position actuelle et la position souhaitée
      const currentPosition = todayRect.left;
      const targetPosition = datesRect.left + 20;

      // Calculer le défilement nécessaire
      const scrollNeeded = currentPosition - targetPosition;

      // Appliquer le défilement
      carousel.scrollLeft += scrollNeeded;

      // Mettre à jour le titre du mois après le défilement
      updateVisibleMonth();
    }
  }
};

// Initialisation au montage du composant
onMounted(() => {
  setTimeout(() => {
    scrollToToday();
    // Initialiser le titre du mois avec la date sélectionnée
    if (selectedDate.value) {
      currentMonthTitle.value = formatMonthTitle(selectedDate.value);
    }
  }, 100); // Petit délai pour s'assurer que le DOM est prêt
});

// Surveiller les changements de date sélectionnée
watch(
  () => selectedDate.value,
  () => {
    handleDateChange(selectedDate.value);
  }
);

// Ajouter un écouteur d'événement de défilement pour mettre à jour le mois
onMounted(() => {
  const carousel = carouselRef.value;
  if (carousel) {
    // Variable pour limiter la fréquence des mises à jour (debounce)
    let scrollTimeout;

    carousel.addEventListener("scroll", () => {
      // Annuler le timeout précédent
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }

      // Programmer une nouvelle mise à jour
      scrollTimeout = requestAnimationFrame(() => {
        updateVisibleMonth();
      });
    });

    // S'assurer que le titre est correct après chaque transition de scroll
    carousel.addEventListener("scrollend", () => {
      updateVisibleMonth();
    });
  }
});
</script>

<template>
  <div id="dates" v-if="schedule != null">
    <h4>{{ currentMonthTitle }}</h4>
    <div id="carousel" ref="carouselRef">
      <DateCard
        v-for="date in uniqueSortedDates"
        :key="date"
        class="date-item"
        :date="date"
        :is-active="date === selectedDate"
        @click="selectDate(date)"
      />
    </div>
  </div>
</template>

<style scoped>
#dates {
  width: 100%;
  border-bottom: 1px solid #eaeaea;
}

#dates h4 {
  font-family: Questrial, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  padding: 16px;
}

#carousel {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Masquer la scrollbar sur Firefox */
  padding: 0 15px;
  scroll-padding: 0 15px;
}

/* Masquer la scrollbar sur Chrome et Safari */
#carousel::-webkit-scrollbar {
  display: none;
}

.date-item {
  flex: 0 0 auto;
}
</style>
