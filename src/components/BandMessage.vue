<template>
  <b-jumbotron
    class="band-message text-center"
    header="バンドメンバー募集掲示板"
    lead="音楽の趣味が合う仲間があなたを待っています！"
    text-variant="white"
  >
  </b-jumbotron>
</template>

<script>
import { BJumbotron } from 'bootstrap-vue';

export default { components: { BJumbotron } };
</script>

<style scoped>
.band-message {
  background-image: url('~@/assets/cover.jpg');
}

.band-message h1 {
  font-family: serif;
}
</style>
