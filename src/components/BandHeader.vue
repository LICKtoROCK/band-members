<template>
  <b-container>
    <b-row>
      <b-col>
        <b-navbar>
          <band-modal
            class="ml-auto"
            @add-band="onAddBand"
          >
          </band-modal>
        </b-navbar>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  BCol,
  BContainer,
  BNavbar,
  BRow,
} from 'bootstrap-vue';
import BandModal from '@/components/BandModal.vue';

export default {
  components: {
    BCol,
    BContainer,
    BNavbar,
    BRow,
    BandModal,
  },
  methods: {
    onAddBand(band) {
      this.$emit('add-band', band);
    },
  },
};
</script>
