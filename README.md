
# Comem - Application d'horaires HEIG-VD

Une application web progressive (PWA) pour consulter les horaires des cours d'Ingénierie des Médias à la HEIG-VD.

## 🎯 À propos

Il s'agit de mon premier projet en Vue.js ! J'ai décidé de créer une application d'horaires pour ma faculté afin d'apprendre le framework Vue.js 3 avec la Composition API. L'objectif était de développer une interface moderne et intuitive pour consulter facilement les horaires de cours.

## 🎓 Apprentissages

Ce projet m'a permis d'apprendre :
- Les bases de Vue.js 3 et la Composition API
- La gestion d'état réactif avec `ref` et `computed`
- La communication entre composants avec props et events
- L'utilisation de composables pour la logique réutilisable
- La création d'une PWA
- La gestion des requêtes API avec fetch
- Le responsive design et les animations CSS


## ✨ Fonctionnalités

- 📅 **Vue calendrier interactive** - Navigation fluide entre les dates avec carrousel
- 🏫 **Filtrage par classe** - Sélection rapide des horaires par classe
- 📱 **Design responsive** - Interface optimisée pour mobile et desktop
- 🔄 **Historique des cours** - Possibilité d'afficher les cours passés
- 🎨 **Interface moderne** - Design épuré avec animations fluides
- ⚡ **PWA** - Installation possible sur mobile comme une app native

## 🛠️ Technologies utilisées

- **Vue.js 3** - Framework JavaScript avec Composition API
- **Vite** - Outil de build rapide
- **CSS vanilla** - Styles personnalisés sans framework CSS
- **PWA** - Fonctionnalités d'application web progressive

## ⚠️ Limitations

**Important :** Cette application ne peut pas être déployée publiquement car :
- Le backend utilisé n'est pas de ma création
- L'API des horaires est privée et non accessible publiquement
- Les données sont spécifiques à l'environnement interne de la HEIG-VD

L'application fonctionne uniquement en développement local avec le proxy configuré dans `vite.config.js`.

## 🚀 Installation et développement

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone [url-du-repo]
cd comem

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Build pour la production
```bash
npm run build
```

## 📱 Structure du projet

```
src/
├── components/          # Composants Vue réutilisables
│   ├── CalendarCarousel.vue    # Carrousel de dates
│   ├── BadgeCarousel.vue       # Sélecteur de classes
│   ├── DayScheduleView.vue     # Affichage des cours du jour
│   ├── CourseCard.vue          # Carte individuelle de cours
│   └── ...
├── composables/         # Logique réutilisable
│   ├── useFetchJson.js         # Hook pour les requêtes API
│   └── useJsonStorage.js       # Gestion du localStorage
├── utils/              # Utilitaires
└── assets/             # Images et icons
```

