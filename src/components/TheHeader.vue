<script setup>
const getMonthName = (month) => {
  switch (month) {
    case 1:
      return "Janvier";
    case 2:
      return "Février";
    case 3:
      return "Mars";
    case 4:
      return "Avril";
    case 5:
      return "Mai";
    case 6:
      return "Juin";
    case 7:
      return "Juillet";
    case 8:
      return "Août";
    case 9:
      return "Septembre";
    case 10:
      return "Octobre";
    case 11:
      return "Novembre";
    case 12:
      return "Décembre";
  }
};
const month = getMonthName(new Date().getMonth() + 1);
const year = new Date().getFullYear();
</script>

<template>
  <div class="container">
    <div class="left">
      <p>{{ `${month}, ${year}` }}</p>
      <img src="../assets/Chevron.svg" alt="" />
    </div>
    <div class="right">
      <img src="../assets/Search.svg" alt="" />
      <!--  <img id="profile" src="../assets/profile.png" alt="" />  -->
    </div>
  </div>
</template>

<style scoped>
div.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

div.left {
  display: flex;
  align-items: center;
  gap: 10px;
}
div.right {
  display: flex;
  align-items: center;
  gap: 10px;
}

img#profile {
  border-radius: 1000px;
  width: 40px;
  height: 40px;
  object-fit: cover;
}

p {
  color: #000;
  font-family: Questrial;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
</style>
