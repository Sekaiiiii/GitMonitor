import { RouterView } from "vue-router"

import '@/style/base.less';

export default {
  render() {
    return (
      <div class="layout-container">
        <div class="drag-area"></div>
        <RouterView></RouterView>
      </div>
    )
  }
}