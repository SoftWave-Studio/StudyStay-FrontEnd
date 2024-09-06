<script>
import LanguageComponent from '@/shared/components/language.component.vue';

export default {
  name: 'header-section',
  components: {
    LanguageComponent,
  },
  data() {
    return {
      items: [
        {
          label: 'Cerrar sesión',
          icon: 'pi pi-fw pi-power-off'
        }
      ]
    }
  }
}
</script>

<template>
  <header>
    <pv-toolbar class="background-primary">
      <!-- LOGO -->
      <template #start>
        <img alt="logo" src="../../assets/images/logo.jpg" height="40" class="mr-2" />
        <h3 class="title-white">StudiStay</h3>
      </template>

      <!-- BOTONES DEL TOOLBAR -->
      <template #end>
        <div class="flex-column">
          <router-link to="/posts" custom v-slot="{ navigate, href }">
            <pv-button
              :label="$t('home-toolbar.post')"
              class="button-primary"
              icon="pi pi-list"
              :href="href"
              @click="navigate"
            />
          </router-link>

          <router-link to="/universities" custom v-slot="{ navigate, href }">
            <pv-button
              :label="$t('home-toolbar.universities')"
              class="button-primary"
              icon="pi pi-building"
              :href="href"
              @click="navigate"
            />
          </router-link>

          <router-link to="/profile" custom v-slot="{ navigate, href }">
            <pv-button
              :label="$t('home-toolbar.profile')"
              class="button-primary"
              icon="pi pi-user"
              :href="href"
              @click="navigate"
            />
          </router-link>

          <language-component />
        </div>
      </template>
    </pv-toolbar>
  </header>
</template>
