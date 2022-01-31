<template>
  <ui-input ref="input-date" v-model="customModel" :type="type">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';
import moment from 'moment';

const DATE_TYPES = {
  date: () => 'YYYY-MM-DD',
  time: (step) => {
    if (step && +step % 60 !== 0) {
      return 'HH:mm:ss';
    }
    return 'HH:mm';
  },
  'datetime-local': () => 'YYYY-MM-DDTHH:mm',
};

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (value) => Object.keys(DATE_TYPES).includes(value),
    },
    modelValue: {
      type: Number,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    customModel: {
      get() {
        return moment(this.modelValue).utc().format(DATE_TYPES[this.type](this.$attrs.step));
      },

      set(value) {
        const newModelValue = this.$refs['input-date'].$refs.input.valueAsNumber;
        this.$emit('update:modelValue', newModelValue);
      },
    },
  },
};
</script>
