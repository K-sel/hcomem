<script setup>
// Obtenir la date actuelle formatée
const currentDate = new Date();
const options = { weekday: 'long', day: 'numeric', month: 'long' };
const formattedDate = currentDate.toLocaleDateString('fr-FR', options);
</script>

<template>
  <div class="container">
    <p class="hello">Bonjour, <slot></slot></p>
    <div class="date-line">
      <span class="normalPhrase">Nous sommes le </span>
      <span class="highlight"> {{ `${formattedDate}, ` }}</span>
      <span class="normalPhrase"> passez une bonne journée</span>
    </div>
  </div>
</template>

<style scoped>
p {
  margin: 0px;
}

p.hello {
  align-self: stretch;
  color: rgba(0, 0, 0, 0.5);
  font-family: Questrial;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

span.highlight {
  color: #2163f6;
  font-family: Questrial;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

span.normalPhrase {
  color: #000;
  font-family: Questrial;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

div.container {
  display: flex;

  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

div.date-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
}
</style>