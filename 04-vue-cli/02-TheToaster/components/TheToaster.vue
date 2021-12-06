<template>
  <ui-toast-list :toasts="toasts" />
</template>

<script>
import UiToastList from './UiToastList';

const TOAST_TIMEOUT = 5000;

export default {
  name: 'TheToaster',

  components: { UiToastList },

  data() {
    return {
      toasts: new Set(),
    };
  },

  methods: {
    add(message, type, timeout) {
      const toast = {
        message: message,
        type: type,
      };
      this.toasts.add(toast);
      setTimeout(() => {
        this.remove(toast);
      }, timeout || TOAST_TIMEOUT);
    },
    remove(toast) {
      this.toasts.delete(toast);
    },
    success(message, timeout) {
      this.add(message, 'success', timeout);
    },
    error(message, timeout) {
      this.add(message, 'error', timeout);
    },
  },
};
</script>

<style scoped></style>
