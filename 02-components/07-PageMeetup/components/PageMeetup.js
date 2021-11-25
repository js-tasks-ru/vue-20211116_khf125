import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: undefined,
      error: undefined,
    };
  },

  watch: {
    meetupId() {
      this.fetchMeetup();
    },
  },

  mounted() {
    this.fetchMeetup();
  },

  methods: {
    fetchMeetup() {
      this.meetup = this.error = undefined;
      fetchMeetupById(this.meetupId)
        .then((meetup) => (this.meetup = meetup))
        .catch((error) => (this.error = error));
    },
  },

  template: `
    <div class="page-meetup">

    <meetup-view v-if="meetup" :meetup="meetup" />

    <ui-container v-else-if="!error">
      <ui-alert>Загрузка...</ui-alert>
    </ui-container>

    <ui-container v-else>
      <ui-alert>{{ error.message }}</ui-alert>
    </ui-container>
    </div>`,
});
