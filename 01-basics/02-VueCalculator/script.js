import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const RootComponent = defineComponent({
  name: 'Root',

  data() {
    return {
      firstValue: 0,
      secondValue: 0,
      operation: 'sum',
    };
  },
  computed: {
    resultValue() {
      if (this.operation === 'sum') return this.firstValue + this.secondValue;
      else if (this.operation === 'subtract') return this.firstValue - this.secondValue;
      else if (this.operation === 'multiply') return this.firstValue * this.secondValue;
      else if (this.operation === 'divide') return this.firstValue / this.secondValue;
      else return 'Неизвестная операция';
    },
  },
});

const app = createApp(RootComponent);

const vm = app.mount('#app');
