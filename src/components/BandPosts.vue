<template>
  <b-container
    class="band-posts"
    role="main"
  >
    <b-row>
      <b-col v-if="bands.length === 0">
        <p class="text-center">まだ投稿はありません。同志を募りましょう！</p>
      </b-col>
      <b-col>
        <b-card no-body header="メンバー募集一覧">
          <b-list-group
            flush
            v-for="{ id, name, prefectures, members, pr } in bands"
            :key="id"
            class="band-posts__item"
          >
            <b-list-group-item>
              <div class="text-left">
                名前（ＨＮ）： {{ name }}
              </div>
              <div class="text-left">
                都道府県： {{ prefectures }}
              </div>
              <div class="text-left">
                募集パート： {{ members }}
              </div>
              <div class="text-left">
                {{ pr }}
              </div>
              <div class="text-right">
                <b-button
                  variant="outline-danger"
                  @click="$emit('delete-band', id)"
                >
                  <b-icon-trash></b-icon-trash>
                  削除
                </b-button>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  BContainer,
  BRow,
  BCol,
  BCard,
  BListGroup,
  BListGroupItem,
  BButton,
  BIconTrash,
} from 'bootstrap-vue';

export default {
  components: {
    BContainer,
    BRow,
    BCol,
    BCard,
    BListGroup,
    BListGroupItem,
    BButton,
    BIconTrash,
  },
  props: {
    bands: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.band-posts__item {
  background-color: #fafafa;
}
</style>
