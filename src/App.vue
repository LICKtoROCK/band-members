<template>
  <div id="app">
    <band-header @add-band="onAddBand"></band-header>
    <band-message></band-message>
    <band-posts
      :bands="bands"
      @delete-band="onDeleteBand"
    ></band-posts>
  </div>
</template>

<script>
import BandPosts from '@/components/BandPosts.vue';
import BandHeader from '@/components/BandHeader.vue';
import BandMessage from '@/components/BandMessage.vue';
import { getBands, deleteBand } from '@/services/bandService';

export default {
  components: { BandPosts, BandHeader, BandMessage },

  data() {
    return { bands: [] };
  },

  async created() {
    this.bands = await getBands()
      .catch((err) => {
        console.error(err.message);
        this.makeToast('エラーの発生', '投稿データを取得できませんでした。');
      });
  },

  methods: {
    makeToast(title, msg) {
      this.$bvToast.toast(msg, {
        autoHideDelay: 5000,
        title,
        variant: 'danger',
      });
    },

    onAddBand(band) {
      this.bands.push(band);
    },
    async onDeleteBand(id) {
      const response = await deleteBand(id).catch((err) => console.error(err.message));

      if (!response || response.status !== 200) {
        this.makeToast('エラーの発生', '投稿を削除できませんでした。');
      }

      this.bands = this.bands.filter((band) => band.id !== id);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
