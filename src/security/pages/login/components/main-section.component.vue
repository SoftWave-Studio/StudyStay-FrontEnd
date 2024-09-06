<script>

import LoginCard from "./login-card.component.vue";
import ToolbarSection from "./toolbar-section.component.vue";
export default {
  name: "login-section",
  components: {LoginCard, ToolbarSection}
}
</script>

<template>

  <div>
    <toolbar-section></toolbar-section>
  </div>
  <div>
    <login-card></login-card>
  </div>
</template>

<style scoped>

</style>