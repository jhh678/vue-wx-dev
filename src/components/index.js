import Vue from 'vue'

import Group from './basic/group'
import Cell from './basic/cell'
import Input from './basic/input'
import Button from './basic/button'
import Radio from './basic/radio'

import Loading from './basic/loading'
import Toast from './basic/toast'

import { Popup, PopupRadio } from './basic/popup'
import Dialog from './basic/dialog'
import Alert from './basic/alert'
import Confirm from './basic/confirm'
import Scroller from './basic/scroller'

import Panel from './basic/panel'
import QRCode from './basic/qrcode'
import ScreenCapture from './basic/screen-capture'

import Divider from './basic/divider'
import { Flexbox, FlexboxItem } from './basic/flexbox'
import { Grid, GridItem } from './basic/grid'

import TransferDom from '@/utils/directives/transfer-dom'
import VueTouch from '@/utils/plugins/vue-touch'

Vue.component('VGroup', Group)
Vue.component('VCell', Cell)
Vue.component('VInput', Input)
Vue.component('VButton', Button)
Vue.component('VRadio', Radio)

Vue.component('VPopup', Popup)
Vue.component('VPopupRadio', PopupRadio)
Vue.component('VDialog', Dialog)
Vue.component('VAlert', Alert)
Vue.component('VConfirm', Confirm)
Vue.component('VScroller', Scroller)

Vue.component('VPanel', Panel)
Vue.component('VQrcode', QRCode)
Vue.component('VScreenCapture', ScreenCapture)

Vue.component('VDivider', Divider)
Vue.component('VFlexbox', Flexbox)
Vue.component('VFlexboxItem', FlexboxItem)
Vue.component('VGrid', Grid)
Vue.component('VGridItem', GridItem)

Vue.directive('transfer-dom', TransferDom)
Vue.use(VueTouch)

export {
  Group,
  Cell,
  Input,
  Button,
  Radio,
  Loading,
  Toast,
  Popup,
  PopupRadio,
  Dialog,
  Alert,
  Confirm,
  Scroller,
  Panel,
  QRCode,
  ScreenCapture,
  Divider,
  Flexbox,
  FlexboxItem,
  Grid,
  GridItem
}
