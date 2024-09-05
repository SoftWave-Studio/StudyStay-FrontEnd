<script>

import ToolbarSection from "@/security/pages/register/components/toolbar-section.component.vue";
import RegisterCard from "@/security/pages/register/components/register-card.component.vue";

export default {
  name: "register-section",
  components: {ToolbarSection, RegisterCard}
}
</script>

<template>
  <div>
    <toolbar-section></toolbar-section>
  </div>

  <div>
    <register-card></register-card>
  </div>
</template>

<style scoped>

</style>