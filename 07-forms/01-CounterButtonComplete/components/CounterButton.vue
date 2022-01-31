<template>
  <button @click="btnClick">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localCount: this.count,
    };
  },

  watch: {
    count(newValue) {
      this.localCount = newValue;
    },
  },

  methods: {
    btnClick() {
      this.$emit('update:count', ++this.localCount);
    },
  },
};
</script>
