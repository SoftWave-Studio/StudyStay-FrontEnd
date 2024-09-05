<script>
import LanguageComponent from '@/shared/components/language.component.vue';

export default {
  name: 'toolbar-section',
  components: {
    LanguageComponent,
  }
}
</script>

<template>
  <header>
    <pv-toolbar class="background-primary">
      <!-- LOGO -->
      <template #start>
        <img alt="logo" src="../../../../assets/images/logo.jpg" height="40" class="mr-2" />
        <h3 class="title-white">StudiStay</h3>
      </template>

      <!-- BOTONES DEL TOOLBAR -->
      <template #end>
        <div class="flex-column options">
          <router-link to="/login" custom v-slot="{ navigate, href }">
            <pv-button
              :label="$t('login-toolbar.login')"
              class="button-primary"
              icon="pi pi-sign-in"
              :href="href"
              @click="navigate"
            />
          </router-link>

          <router-link to="/register" custom v-slot="{ navigate, href }">
          <pv-button
            :label="$t('login-toolbar.register')"
            class="button-primary"
            icon="pi pi-user-plus"
            :href="href"
            @click="navigate"
          ></pv-button>
          </router-link>
          
          <language-component />
        </div>
      </template>
    </pv-toolbar>
  </header>
</template>

<style scoped lang="scss">
.options {
  margin-left: -31rem;
}
</style>
