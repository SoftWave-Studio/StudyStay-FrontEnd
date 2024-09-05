import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice'

//theme
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/md-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

//components
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toolbar from 'primevue/toolbar'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Row from 'primevue/row'
import Sidebar from 'primevue/sidebar'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import Dropdown from 'primevue/dropdown'
import Menu from 'primevue/menu'
import Tag from 'primevue/tag'
import Card from 'primevue/card'
import SplitButton from 'primevue/splitbutton'
import DataView from 'primevue/dataview'
import MultiSelect from 'primevue/multiselect'
import Calendar from 'primevue/calendar'
import Menubar from 'primevue/menubar'

//services
import { SecurityApiService } from './security/service/security.service'
import { RoomsApiService } from './rooms/service/rooms.service'

//i18n
import i18n from '@/i18n'
import { UniversitiesApiService } from '@/rooms/service/universities.service'

const app = createApp(App)
  .use(i18n)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .use(ToastService)
  .component('pv-data-table', DataTable)
  .component('pv-column', Column)
  .component('pv-toolbar', Toolbar)
  .component('pv-input-text', InputText)
  .component('pv-textarea', Textarea)
  .component('pv-button', Button)
  .component('pv-row', Row)
  .component('pv-sidebar', Sidebar)
  .component('pv-menu', Menu)
  .component('pv-dialog', Dialog)
  .component('pv-toast', Toast)
  .component('pv-dropdown', Dropdown)
  .component('pv-tag', Tag)
  .component('pv-card', Card)
  .component('pv-splitbutton', SplitButton)
  .component('pv-dataview', DataView)
  .component('pv-multiselect', MultiSelect)
  .component('pv-calendar', Calendar)
  .component('pv-menubar', Menubar)

//global services
app.config.globalProperties.$securityApiService = new SecurityApiService()
app.config.globalProperties.$roomsApiService = new RoomsApiService()
app.config.globalProperties.$universitiesApiService = new UniversitiesApiService()

app.mount('#app')
