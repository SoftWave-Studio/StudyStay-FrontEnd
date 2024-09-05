<script>
export default {
  name: "register-card",
  data() {
    return {
      user: {},
      submitted: false,
    }
  },
  methods: {
    register() {
      this.submitted = true;
      if (this.user.full_name && this.user.email && this.user.phone && this.user.password) {
        this.$securityApiService.signUp(this.user)
          .then((response) => {
            console.log(response)
            this.$toast.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'User Created',
              life: 3000
            });
            this.user = {};
            this.$router.push({ name: 'login' });
          })
          .catch((e) => {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: `Error al crear usuario: ${e.message}`,
              life: 3000
            });
          }).finally(() => {
            this.submitted = false;
          })
      }
    },
  }
}

</script>

<template>
  <br><br>
  <div class="centered-container">
    <pv-card class="p-fluid" style="max-width: 90%;">
      <template #title> 
        <span class="paragraph font-bold"> {{$t('register-view.register')}}</span>   
      </template>
      <template #content>
        <div class="field paragraph mt-3">
          <span class="p-input-icon-left p-float-label">
            <i class="pi pi-user"></i>
            <pv-input-text 
              type="text"
              id="fullName"
              v-model.trim="user.full_name"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.full_name }"
              :placeholder="$t('register-view.enter-names')" 
            />
            <label for="fullName">{{$t('register-view.names')}}</label>
            <small class="p-error" v-if="submitted && !user.full_name">Ingrese su nombre completo</small>
          </span>
        </div>

        <div class="field paragraph">
          <span class="p-input-icon-left p-float-label">
            <i class="pi pi-envelope"></i>
            <pv-input-text 
              type="text"
              id="email"
              v-model.trim="user.email"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.email }"
              :placeholder="$t('register-view.enter-email')" 
            />
            <label for="email">{{$t('register-view.email')}}</label>
            <small class="p-error" v-if="submitted && !user.email">Ingrese su email</small>
          </span>
        </div>

        <div class="field paragraph">
          <span class="p-input-icon-left p-float-label">
            <i class="pi pi-phone"></i>
            <pv-input-text 
              type="text"
              id="phone"
              v-model.trim="user.phone"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.phone }"
              :placeholder="$t('register-view.enter-phone')" 
            />
            <label for="phone">{{$t('register-view.phone')}}</label>
            <small class="p-error" v-if="submitted && !user.phone">Ingrese su teléfono</small>
          </span>
        </div>

        <div class="field paragraph">
          <span class="p-input-icon-left p-float-label">
            <i class="pi pi-lock"></i>
            <pv-input-text 
              type="password"
              id="password"
              v-model.trim="user.password"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.password }"
              :placeholder="$t('register-view.enter-password')" 
            />
            <label for="password">{{$t('register-view.password')}}</label>
            <small class="p-error" v-if="submitted && !user.password">Ingrese su conraseña</small>
          </span>
        </div>

        <br>

        <div class="card flex justify-content-center">
          <pv-button
            :label="$t('register-view.register-btn')"
            class="button-secondary"
            @click="register"
            icon="pi pi-user-plus"
          />
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