import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      default: () => [],
    },
  },

  template: `
    <ul class="agenda">
    <li v-for="agendaItem in agenda" class="agenda__item">
      <meetup-agenda-item :agenda-item="agendaItem" />
    </li>
    </ul>`,
});
