import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Form, Field, CellGroup, Button, Popup, Picker, Uploader, Radio, RadioGroup ,Stepper,Icon,NoticeBar} from 'vant'
import 'vant/lib/index.css';

createApp(App).use(store).use(router)
  .use(Form).use(Field).use(CellGroup).use(Button).use(Popup).use(Picker)
  .use(Uploader).use(Radio).use(RadioGroup).use(Stepper).use(Icon).use(NoticeBar)
  .mount('#app')
