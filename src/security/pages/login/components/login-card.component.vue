<script>
export default {
  name: 'login-card',
  data() {
    return {
      email: '',
      password: '',
      submitted: false,
      loading: false
    }
  },
  methods: {
    login() {
      this.submitted = true;
      this.loading = true;
      if (this.email && this.password) {
        this.$securityApiService
          .signIn(this.email, this.password)
          .then((res) => {
            // Agregar un token falso al objeto que vas a guardar en localStorage
            const userData = {
              ...res.data, // Mantienes los datos originales
              token: 'fake-token' // Agregas un token falso
            };
            localStorage.setItem('user-data', JSON.stringify(userData)) // guarda los datos del usuario
            this.$router.push('/posts') // redirige a /posts
          })
          .catch((err) => {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: err.response.data.message || 'Error al iniciar sesión, intente nuevamente.',
              life: 3000
            })
          })
          .finally(() => {
            this.loading = false;
            // Verifica si la redirección debería ocurrir aquí
            if (this.email && this.password) {
              this.$router.push('/posts');
            }
          })
      }
    }
  }
}
</script>

<template>
  <br /><br />
  <div class="centered-container">
    <pv-card class="p-fluid" style="max-width: 90%;">
      <template #title>
        <span class="paragraph font-bold"> {{ $t('login-view.login') }}</span>
      </template>
      <template #content>
        <div class="field paragraph mt-3">
          <span class="p-input-icon-left p-float-label">
            <i class="pi pi-envelope"></i>
            <pv-input-text
              type="text"
              id="email"
              v-model.trim="email"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !email }"
              :placeholder="$t('login-view.enter-email')"
            />
            <label for="email">{{ $t('login-view.email') }}</label>
            <small class="p-error" v-if="submitted && !email">Ingrese su email</small>
          </span>
        </div>

        <div class="field paragraph mt-3">
          <span class="p-input-icon-left p-float-label">
            <i class="pi pi-lock"></i>
            <pv-input-text
              type="password"
              id="password"
              v-model.trim="password"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !password }"
              :placeholder="$t('login-view.enter-password')"
            />
            <label for="password">{{ $t('login-view.password') }}</label>
            <small class="p-error" v-if="submitted && !password">Ingrese su contraseña</small>
          </span>
        </div>
        <br />

        <div class="card flex justify-content-center">
          <pv-button :label="$t('login-view.enter-btn')" class="button-secondary" @click="login"  icon="pi pi-sign-in" :disabled="loading" />
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style>
  .centered-container {
    text-align: center;
    display: flex; /* Usa Flexbox */
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
  }
</style>
