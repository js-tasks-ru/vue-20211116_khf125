<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
      :style="localPreview && { '--bg-url': `url(${localPreview})` }"
      @click="imageClick"
    >
      <span class="image-uploader__text">{{ uploaderText }}</span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @change="imageChange"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },

  emits: ['select', 'upload', 'remove', 'error'],

  data() {
    return {
      localPreview: this.preview,
      previewToRevoke: false,
      loading: false,
    };
  },

  computed: {
    state() {
      if (this.loading) return 'loading';
      if (this.localPreview) return 'preview';
      return 'empty';
    },

    uploaderText() {
      const uploaderStateTexts = {
        loading: 'Загрузка...',
        preview: 'Удалить изображение',
        empty: 'Загрузить изображение',
      };

      return uploaderStateTexts[this.state];
    },
  },

  unmounted() {
    this.previewRevoke();
  },

  methods: {
    imageChange($event) {
      this.previewRevoke();
      const file = $event.target.files[0];
      this.$emit('select', file);
      if (this.uploader) {
        this.upload(file);
      } else {
        this.createPreview(file);
      }
    },

    imageClick($event) {
      if (this.state === 'preview') {
        $event.preventDefault();
        this.remove();
        this.$emit('remove');
      }
    },

    upload(file) {
      this.loading = true;
      this.uploader(file)
        .then((response) => {
          this.loading = false;
          this.localPreview = response.image;
          this.$emit('upload', response);
        })
        .catch((error) => {
          this.remove();
          this.loading = false;
          this.$emit('error', error);
        });
    },

    remove() {
      this.localPreview = null;
      this.$refs.input.value = null;
    },

    createPreview(file) {
      this.localPreview = URL.createObjectURL(file);
      this.previewToRevoke = true;
    },

    previewRevoke() {
      if (this.previewToRevoke) URL.revokeObjectURL(this.localPreview);
      this.previewToRevoke = false;
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
