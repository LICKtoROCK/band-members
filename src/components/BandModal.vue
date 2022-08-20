<template>
  <div>
    <b-button
      class="band-registration__show-btn"
      variant="outline-primary"
      v-b-modal.band-registration
    >
      <b-icon-music-note-list></b-icon-music-note-list> メンバーを募集する
    </b-button>
    <b-modal
      id="band-registration"
      hide-footer
      title="メンバーを募集する"
    >
      <b-form
        :validated="validated"
        @submit.prevent="onSubmit"
      >
        <b-form-group class="mb-4">
          <label for="name">名前（ＨＮ）</label>
          <b-form-input
            id="name"
            v-model="name"
            :state="isValidName"
            type="text"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group class="mb-4">
          <label for="prefectures">都道府県</label>
          <b-form-select
            id="prefectures"
            v-model="prefectures"
            :options="pref"
            required
            :state="isValidPrefectures"
          >
          </b-form-select>
        </b-form-group>
        <b-form-group label="募集パート" class="mb-4">
          <b-form-checkbox
            v-for="part in parts"
            v-model="members"
            :key="part.value"
            :value="part.value"
            :state="isValidMembers"
            inline
          >
            {{ part.text }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group class="mb-4">
          <label for="pr">自己ＰＲ</label>
          <b-form-textarea
            id="pr"
            v-model="pr"
            :state="isValidPr"
            rows="6"
            required
          >
          </b-form-textarea>
        </b-form-group>
        <p
          v-if="isFailed"
          class="text-danger"
          role="alert"
        >
          登録に失敗しました。
        </p>
        <b-button
          block
          class="mt-3"
          :disabled="isPosting"
          type="submit"
          variant="outline-primary"
          @click="onClick"
        >
          登録
        </b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormCheckbox,
  BFormTextarea,
  BIconMusicNoteList,
  BModal,
  VBModal,
} from 'bootstrap-vue';
import { postBand } from '@/services/bandService';

const IS_DEFAULT = 'IS_DEFAULT';
const IS_POSTING = 'IS_POSTING';
const IS_FAILED = 'IS_FAILED';

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormCheckbox,
    BFormTextarea,
    BIconMusicNoteList,
    BModal,
  },
  directives: { 'b-modal': VBModal },

  data() {
    return {
      currentState: IS_DEFAULT,
      name: '',
      prefectures: null,
      pref: [
        { value: null, text: '選択してください', disabled: true },
        { value: '北海道', text: '北海道' },
        { value: '青森県', text: '青森県' },
        { value: '岩手県', text: '岩手県' },
        { value: '宮城県', text: '宮城県' },
        { value: '秋田県', text: '秋田県' },
        { value: '山形県', text: '山形県' },
        { value: '福島県', text: '福島県' },
        { value: '茨城県', text: '茨城県' },
        { value: '栃木県', text: '栃木県' },
        { value: '群馬県', text: '群馬県' },
        { value: '埼玉県', text: '埼玉県' },
        { value: '千葉県', text: '千葉県' },
        { value: '東京都', text: '東京都' },
        { value: '神奈川県', text: '神奈川県' },
        { value: '新潟県', text: '新潟県' },
        { value: '富山県', text: '富山県' },
        { value: '石川県', text: '石川県' },
        { value: '福井県', text: '福井県' },
        { value: '山梨県', text: '山梨県' },
        { value: '長野県', text: '長野県' },
        { value: '岐阜県', text: '岐阜県' },
        { value: '静岡県', text: '静岡県' },
        { value: '愛知県', text: '愛知県' },
        { value: '三重県', text: '三重県' },
        { value: '滋賀県', text: '滋賀県' },
        { value: '京都府', text: '京都府' },
        { value: '大阪府', text: '大阪府' },
        { value: '兵庫県', text: '兵庫県' },
        { value: '奈良県', text: '奈良県' },
        { value: '和歌山県', text: '和歌山県' },
        { value: '鳥取県', text: '鳥取県' },
        { value: '島根県', text: '島根県' },
        { value: '岡山県', text: '岡山県' },
        { value: '広島県', text: '広島県' },
        { value: '山口県', text: '山口県' },
        { value: '徳島県', text: '徳島県' },
        { value: '香川県', text: '香川県' },
        { value: '愛媛県', text: '愛媛県' },
        { value: '高知県', text: '高知県' },
        { value: '福岡県', text: '福岡県' },
        { value: '佐賀県', text: '佐賀県' },
        { value: '長崎県', text: '長崎県' },
        { value: '熊本県', text: '熊本県' },
        { value: '大分県', text: '大分県' },
        { value: '宮崎県', text: '宮崎県' },
        { value: '鹿児島県', text: '鹿児島県' },
        { value: '沖縄県', text: '沖縄県' },
      ],
      members: [],
      parts: [
        { text: 'ボーカル', value: 'ボーカル' },
        { text: 'ギターボーカル', value: 'ギターボーカル' },
        { text: 'ギター', value: 'ギター' },
        { text: 'ベース', value: 'ベース' },
        { text: 'ドラム', value: 'ドラム' },
        { text: 'キーボード', value: 'キーボード' },
        { text: '管楽器', value: '管楽器' },
        { text: '弦楽器', value: '弦楽器' },
        { text: 'ＤＪ', value: 'ＤＪ' },
        { text: 'その他', value: 'その他' },
      ],
      pr: '',
      postBandError: null,
      validated: false,
    };
  },

  computed: {
    isValidName() {
      if (!this.validated) return null;
      return this.validated && this.name;
    },
    isValidPrefectures() {
      if (!this.validated) return null;
      return this.validated && this.prefectures;
    },
    isValidMembers() {
      if (!this.validated) return null;
      return this.validated && this.members;
    },
    isValidPr() {
      if (!this.validated) return null;
      return this.validated && this.pr;
    },
    isValidInputs() {
      return this.isValidName && this.isValidPrefectures && this.isValidMembers && this.isValidPr;
    },
    isPosting() {
      return this.currentState === IS_POSTING;
    },
    isFailed() {
      return this.currentState === IS_FAILED;
    },
  },

  methods: {
    toDefault() {
      this.currentState = IS_DEFAULT;
    },
    toPosting() {
      this.currentState = IS_POSTING;
    },
    toFailed() {
      this.currentState = IS_FAILED;
    },

    onClick() {
      this.validated = true;
    },
    async onSubmit() {
      if (!this.isValidInputs) return;

      this.toPosting();

      const response = await postBand(
        this.name, this.prefectures, this.members, this.pr,
      ).catch((err) => {
        this.toFailed();
        console.error(err.message);
      });

      if (!response) return;
      this.toDefault();

      this.hideModal();
      this.name = '';
      this.prefectures = null;
      this.members = null;
      this.pr = '';
      this.validated = false;
    },
    hideModal() {
      this.$bvModal.hide('band-registration');
    },
  },
};
</script>

<style scoped>
.band-registration__show-btn {
  font-size: 1rem;
}
</style>
