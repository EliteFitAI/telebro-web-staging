import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import 'vue3-carousel/dist/carousel.css';

import { register } from './registerServiceWorker'

import Maska from 'maska';

//i18
import { createI18n } from 'vue-i18n';
import messages from '@/utils/locales/messages';

//ScrollTop
import VueScrollTo from 'vue-scrollto';

//LightBox
import VueEasyLightbox from 'vue-easy-lightbox';

// Vue tel input
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

// Youtube player
import YouTube from 'vue3-youtube';


const i18n = createI18n({
    locale: 'en',
    messages: messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    legacy: false,
    globalInjection: true
});

const app = createApp(App);
// fakeBackend();
app.use(router);
app.use(PerfectScrollbar);
app.use(createPinia());

app.use(VueTablerIcons);
app.use(i18n);
app.use(Maska);
app.use(VueApexCharts);
app.use(VueTelInput);
app.component('YouTube', YouTube)
app.use(vuetify).mount('#app');
//Lightbox
app.use(VueEasyLightbox);

//ScrollTop Use
app.use(VueScrollTo, {
    duration: 1000,
    easing: "ease",
})


window.addEventListener('load', register);