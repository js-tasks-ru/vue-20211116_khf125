import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const RootComponent = defineComponent({
  name: 'Root',

  data() {
    return {
      title: null,
      meetupId: null,
    };
  },

  watch: {
    meetupId() {
      fetchMeetupById(parseInt(this.meetupId)).then((meetup) => (this.title = meetup.title));
    },
  },
});

const app = createApp(RootComponent);

const vm = app.mount('#app');
