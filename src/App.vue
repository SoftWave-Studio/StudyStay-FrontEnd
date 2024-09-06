<script>
import HeaderSection from './shared/components/header-section.component.vue'

export default {
  name: 'App',
  components: {
    HeaderSection
  }
}
</script>

<template>
  <!-- MENSAJES -->
  <pv-toast />

  <!-- HEADER (TOOLBAR) -->
  <header-section v-if="!['login', 'register'].includes($route.name)"/>

  <!-- PARA QUE FUNCIONE EL ROUTER (RENDERIZAR LAS VISTAS)  -->
  <RouterView />
</template>


<!-- ESTILOS GLOBALES -->
<style lang="scss">
//VARIABLES
:root {
  --color-primary: #34495e;
  --color-secondary: #3498db;
}

//TITULOS
.title-secondary {
  color: var(--color-secondary);
  -webkit-text-fill-color: var(--color-secondary);
  -moz-text-fill-color: var(--color-secondary);
  -ms-text-fill-color: var(--color-secondary);
  font-family: "Poppins", sans-serif;
}
.title-primary {
  color: var(--color-primary);
  -webkit-text-fill-color: var(--color-primary);
  -moz-text-fill-color: var(--color-primary);
  -ms-text-fill-color: var(--color-primary);
  font-family: "Poppins", sans-serif;
}
.title-white {
  color: #fff;
  font-family: "Poppins", sans-serif;
}

//TEXTOS
.paragraph {
  color: var(--color-primary);
  font-family: "Jost", sans-serif;
}

//ICONOS
.icon-secondary {
  color: var(--color-secondary);
}

//BOTONES
.rounded-button-secondary {
  color: var(--color-secondary) !important;
  font-family: "Jost", sans-serif;
}
.button-secondary {
  background-color: var(--color-secondary) !important;
  font-family: "Jost", sans-serif !important;
}
.button-primary {
  background-color: var(--color-primary) !important;
  font-family: "Poppins", sans-serif !important;
}

//BACKGROUND
.background-secondary {
  background-color: var(--color-secondary);
}
.background-primary {
  background-color: var(--color-primary) !important;
}
</style>