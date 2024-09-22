<template>
  <div class="perfil-section">
    <div class="perfil-title">
      <span class="paragraph font-bold" style="text-align: left; font-size: 40px;"> Perfil</span>
    </div>

    <div class="perfil-container">
      <div class="card-profile">
        <div class="perfil-img">
          <div class="imagen-center">
            <img
              :src="userData.image_url || 'https://www.icegif.com/wp-content/uploads/2023/02/icegif-540.gif'"
              alt="Avatar"
              class="avatar"
            />
          </div>
        </div>

        <div class="container-info">
          <div class="perfil-info">
            
            <div class="p-inputgroup flex-1">
              <p class="paragraph">{{$t('profile-view.names')}}</p>
              <div class="container-input">
                <span span class="p-inputgroup-addon">
                  <i class="pi pi-user"></i>
                </span>
                <pv-input-text
                  type="text"
                  v-model.trim="userData.full_name"
                  class="input-text"
                  placeholder="Nombres" 
                />
              </div>
            </div>

            <div class="p-inputgroup flex-1">
              <p class="paragraph">{{$t('profile-view.email')}}</p>
               <div class="container-input">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-envelope"></i>
                </span>
                <pv-input-text
                  type="text"
                  v-model.trim="userData.email"
                  class="input-text"
                  placeholder="Email" 
                />
              </div>
            </div>

            <div class="p-inputgroup flex-1">
              <p class="paragraph">{{$t('profile-view.phone')}}</p>
               <div class="container-input">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-phone"></i>
                </span>
                <pv-input-text
                  type="text"
                  v-model.trim="userData.phone"
                  class="input-text"
                  placeholder="Teléfono" 
                />
              </div>
            </div>

            <div class="p-inputgroup flex-1">
              <p class="paragraph">{{$t('profile-view.password')}}</p>
              <div class="container-input">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-lock"></i>
                </span>
                <pv-input-text
                  type="password"
                  :value="123456789"
                  class="input-text"
                  placeholder="Contraseña" 
                />
              </div>      
            </div>

            <div class="p-inputgroup flex-1">
              <p class="paragraph">{{$t('profile-view.image_url')}}</p>
              <div class="container-input">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-image"></i>
                </span>
                <pv-input-text
                  type="image_url"
                  v-model.trim="userData.image_url"
                  class="input-text"
                  placeholder="URL de imagen"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="perfil-buttons">
          <pv-button
            :label="$t('profile-view.logout')"
            icon="pi pi-sign-out"
            severity="danger"
            outlined 
            @click="logout"
          />

          <pv-button
            :label="$t('profile-view.delete-account')"
            icon="pi pi-trash"
            severity="danger"
            @click="confirmDelete"
          />

          <pv-button
            :label="$t('profile-view.save-changes')"
            icon="pi pi-user-edit"
            severity="primary"
            @click="updateAccount"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- DIALOGO DE CONFIRMACION -->
  <pv-dialog
    v-model:visible="deleteAccountDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"></i>
      <span>
        ¿Estás seguro de eliminar tu cuenta?
      </span>
    </div>
    <template #footer>
      <pv-button
        :label="'No'.toUpperCase()"
        icon="pi pi-times"
        class="p-button-text"
        @click="deleteAccountDialog = false"
      />
      <pv-button
        :label="'Yes'.toUpperCase()"
        icon="pi pi-check"
        class="p-button-text"
        @click="deleteAccount"
      />
    </template>
  </pv-dialog>
</template>

<script>
export default {
  components: {},
  name: "profile-content",
  data() {
    return {
      userData: {},
      loading: false,
      deleteAccountDialog: false
    }
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem('user-data')) //obtiene los datos del usuario guardados en el localstorage
  },
  methods: {
    logout() {
      localStorage.removeItem('user-data') //elimina los datos del usuario guardados en el localstorage
      this.$router.push({ name: 'login' }) //redirecciona a la pagina de login
    },
    deleteAccount() {
      this.loading = true
      this.$securityApiService.deleteAccount(this.userData.id) //elimina la cuenta del usuario
        .then(() => {
          this.$toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Su cuenta ha sido eliminada correctamente',
            life: 3000
          })
          this.logout()
        })
        .catch(() => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar su cuenta, intente nuevamente',
            life: 3000
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateAccount() {
      this.loading = true
      this.$securityApiService.updateAccount(this.userData.id, this.userData) //actualiza los datos del usuario
        .then(() => {
          this.$toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Su datos han sido actualizados correctamente',
            life: 3000
          })
          //actualiza los datos del localstorage
          let userData = JSON.parse(localStorage.getItem('user-data'))
          userData.fullName = this.userData.fullName
          userData.email = this.userData.email
          userData.phone = this.userData.phone
          userData.image_url = this.userData.image_url
          localStorage.setItem('user-data', JSON.stringify(userData))
        })
        .catch(() => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar sus datos, intente nuevamente',
            life: 3000
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    confirmDelete() {
      this.deleteAccountDialog = true
    }
  }
};
</script>

<style>
.perfil-title {
  margin-top: 15px;
  margin-left: 20px;
}

.perfil-container {
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.perfil-img {
  margin-bottom: 25px;
  width: 100%;
  height: 43%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imagen-center {
  width: 26%;
  height: 90%;
  border-radius: 15px;
  overflow: hidden;
}

.imagen-center img {
  width: 100%;
  height: 100%;
}

.container-info {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.perfil-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columnas iguales */
  grid-auto-rows: 95px;
  gap: 45px 100px;
  width: 85%;
  margin-bottom: 50px;
}

.p-inputtext {
  border-radius: 0px;
}

.p-inputgroup {
  width: 100%;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container-input{
  width: 100%;
  height: 100%;
  display: flex;
}

.perfil-buttons {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.perfil-buttons button {
  width: 45%;
  height: 36%;
  font-size: 20px;
  margin-bottom: 20px;
  color: white;
}

</style>