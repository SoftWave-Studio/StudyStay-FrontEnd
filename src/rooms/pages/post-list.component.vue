<!-- eslint-disable no-unused-vars -->
<script>
export default {
  name: 'post-list',

  data() {
    return {
      posts: [],
      postDialog: false,
      phoneDialog: false,
      deletePostDialog: false,
      phoneNumberToShow: '',
      post: {},
      submitted: false,
      filters: {},
      universities: []
    }
  },
  created() {
    this.initFilters()
    this.$roomsApiService
      .getAllUniversities()
      .then((response) => {
        this.universities = response.data
      })
      .catch((e) => {
        // this.$toast.add({
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: `Error al obtener universidades: ${e.message}`,
        //   life: 3000
        // })
      })
    this.$roomsApiService
      .getAllPosts()
      .then((response) => {
        this.posts = response.data
      })
      .catch((e) => {
        // this.$toast.add({
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: `Error al obtener posts: ${e.message}`,
        //   life: 3000
        // })
      })
  },

  methods: {
    //limpia la variable que tendrá a post y bloqueará los botones al cambiar
    openNew() {
      this.post = {}
      this.submitted = false
      this.postDialog = true
    },
    //esconde el dialog
    hideDialog() {
      this.postDialog = false
      this.submitted = false
    },

    showPhone(post) {
      this.phoneNumberToShow = post.user.phone
      this.phoneDialog = true
    },
    hideDialogphone() {
      this.phoneDialog = false
    },

    //permitirá encontrar los valores a modificar desde el servicio web
    findIndexById(id) {
      console.log(`current id: ${id}`)
      return this.posts.findIndex((post) => post.id === id)
    },

    //guarda el post
    savePost() {
      this.submitted = true
      if (this.post.title) {
        this.$roomsApiService
          .createPost({
            title: this.post.title,
            description: this.post.description,
            address: this.post.address,
            price: Number(this.post.price),
            nearestUniversities: JSON.stringify(this.post.nearestUniversities),
            imageUrl: this.post.imageUrl,
            userId: 1
          })
          .then((response) => {
            this.post = response.data
            this.posts.push(this.post)
            this.$toast.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Post Created',
              life: 3000
            })
          })
          .catch((e) => {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: `Error al crear post: ${e.message}`,
              life: 3000
            })
          })
        this.postDialog = false
        this.post = {}
      }
    },
    deletePost() {
      this.$roomsApiService.deletePost(this.post.id).then((res) => {
        this.posts = this.posts.filter((p) => p.id !== this.post.id)
        this.deletePostDialog = false
        this.post = {}
        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Post eliminado',
          life: 3000
        })
        console.log(res)
      })
    },
    initFilters() {
      this.filters = {
        global: { value: null }
      }
    },
    matchesFilter(name) {
      const filterValue = this.filters.global.value
      if (!filterValue) {
        return true
      }
      return name.toLowerCase().includes(filterValue.toLowerCase())
    },
    confirmDeletePost(post) {
      this.post = post
      this.deletePostDialog = true
    }
  }
}
</script>

<template>
  <!-- BOTONES DE ACCION -->
  <pv-toolbar class="mb-4">
    <!-- BOTON AGREGAR -->
    <template #start>
      <pv-button
        :label="$t('posts-view.create-post')"
        icon="pi pi-plus"
        class="p-button-success mr-2"
        @click="openNew"
      />
    </template>
    <!-- BUSCADOR -->
    <template #end>
      <span class="p-input-icon-left">
        <i class="pi pi-search"></i>
        <pv-input-text
          style="border-radius: 15px; width: 320px"
          v-model="filters['global'].value"
          :placeholder="$t('posts-view.search-post')"
        ></pv-input-text>
      </span>
    </template>
  </pv-toolbar>

  <!-- LISTA DE POSTS -->
  <pv-dataview :value="posts">
    <template #list="slotProps">
      <div v-if="matchesFilter(slotProps.data.title)" class="col-12">
        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img
            class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            :src="slotProps.data.imageUrl"
            :alt="slotProps.data.title"
          />
          <div
            class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
          >
            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
              <!-- TITULO -->
              <div class="text-2xl font-bold text-900 title-secondary">
                {{ slotProps.data.title }}
              </div>

              <!-- ICONOS -->
              <div class="flex align-items-center gap-3">
                <span class="flex align-items-center gap-2">
                  <i class="pi pi-map-marker icon-secondary"></i>
                  <span class="paragraph">{{ slotProps.data.address }}</span>
                </span>
              </div>

              <div class="flex align-items-center gap-3">
                <span class="flex align-items-center gap-2">
                  <i class="pi pi-star icon-secondary"></i>
                  <span class="paragraph">{{ slotProps.data.rating }}</span>
                </span>
              </div>

              <div class="flex align-items-center gap-3">
                <span class="flex align-items-center gap-2">
                  <i class="pi pi-building icon-secondary"></i>
                  <span class="paragraph">  {{ $t('posts-view.near-to') }}
                    {{
                      JSON.parse(slotProps.data.nearestUniversities)
                        .map((u) => u.initials)
                        .join(', ')
                    }}</span
                  >
                </span>
              </div>

              <!-- DESCRIPCION -->
              <p class="text-limit paragraph">
                {{ slotProps.data.description }}
              </p>
            </div>

            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <!-- PRECIO -->
              <span class="text-2xl font-semibold title-primary"
                >S/. {{ slotProps.data.price }}</span
              >

              <!-- BOTONES -->
              <div class="flex align-items-center gap-2 p-mt-2">
                <pv-button
                  icon="pi pi-trash"
                  class="rounded-button-secondary"
                  rounded
                  outlined
                  @click="confirmDeletePost(slotProps.data)"
                />
                <pv-button
                  icon="pi pi-phone"
                  class="rounded-button-secondary"
                  rounded
                  outlined
                  @click="showPhone(slotProps.data)"
                />
                <!-- <pv-button icon="pi pi-heart" class="rounded-button-secondary" rounded outlined /> -->
                <router-link
                  :to="{ name: 'postDetails', params: { postId: slotProps.data.id } }"
                  custom
                  v-slot="{ navigate, href }"
                >
                  <pv-button
                    label="Saber más"
                    class="button-secondary"
                    icon="pi pi-angle-right"
                    :href="href"
                    @click="navigate"
                  />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </pv-dataview>

  <!-- DIALOGO PARA AGREGAR POST -->
  <pv-dialog
    v-model:visible="postDialog"
    :style="{ width: '450px' }"
    header="Agregar nuevo post"
    :modal="true"
    class="p-fluid"
  >
    <!-- TITLE -->
    <div class="field mt-3 paragraph">
      <span class="p-float-label">
        <pv-input-text
          type="text"
          id="title"
          v-model.trim="post.title"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !post.title }"
        />
        <label for="title">Título</label>
        <small class="p-error" v-if="submitted && !post.title">Ingresa un título</small>
      </span>
    </div>

    <!-- DESCRIPTION -->
    <div class="field paragraph">
      <span class="p-float-label">
        <pv-textarea
          id="description"
          v-model="post.description"
          required="true"
          rows="2"
          cols="20"
          :class="{ 'p-invalid': submitted && !post.description }"
        />
        <label for="description">Descripción </label>
        <small class="p-error" v-if="submitted && !post.description">
          Ingresa una descripción
        </small>
      </span>
    </div>

    <!-- ADDRESS -->
    <div class="field paragraph">
      <span class="p-float-label">
        <pv-input-text
          type="text"
          id="address"
          v-model.trim="post.address"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !post.address }"
        />
        <label for="address">Dirección</label>
        <small class="p-error" v-if="submitted && !post.address">Ingresa la dirección</small>
      </span>
    </div>

    <!-- PRICE -->
    <div class="field paragraph">
      <span class="p-float-label">
        <pv-input-text
          id="price"
          v-model="post.price"
          required="true"
          type="number"
          autofocus
          :class="{ 'p-invalid': submitted && !post.price }"
        />
        <label for="price">Precio x hora</label>
        <small class="p-error" v-if="submitted && !post.price">Ingresa el precio</small>
      </span>
    </div>

    <!-- NEAREST UNIVERSITIES -->
    <div class="field paragraph">
      <span class="p-float-label">
        <pv-multiselect
          id="nearestUniversities"
          v-model="post.nearestUniversities"
          display="chip"
          :options="universities"
          optionLabel="initials"
          :class="{ 'p-invalid': submitted && !post.nearestUniversities }"
        >
          <template #option="slotProps">
            <div class="flex align-items-center">
              <img
                :src="slotProps.option.logoUrl"
                :alt="slotProps.option.initials"
                style="width: 18px; margin-right: 10px"
              />
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </pv-multiselect>
        <label for="nearestUniversities">Universidades cercanas</label>
        <small class="p-error" v-if="submitted && !post.nearestUniversities">
          Selecciona las universidades cercanas
        </small>
      </span>
    </div>

    <!-- IMAGE URL -->
    <div class="field paragraph">
      <span class="p-float-label">
        <pv-input-text
          type="text"
          id="imageUrl"
          v-model.trim="post.imageUrl"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !post.imageUrl }"
        />
        <label for="imageUrl">URL de la foto</label>
        <small class="p-error" v-if="submitted && !post.imageUrl">Ingresa una imagen</small>
      </span>
    </div>

    <template #footer>
      <pv-button
        :label="'Cancelar'.toUpperCase()"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialog"
      />
      <pv-button
        :label="'Crear'.toUpperCase()"
        icon="pi pi-check"
        class="p-button-text"
        @click="savePost"
      />
    </template>
  </pv-dialog>

  <!-- DIALOG PARA MOSTRAR EL NUMERO DE TELEFONO -->
  <pv-dialog
    v-model:visible="phoneDialog"
    :style="{ width: '450px' }"
    header="Número de teléfono"
    :modal="true"
    class="p-fluid title-secondary"
  >
    <span class="flex align-items-center gap-2" style="font-size: 20px">
      <i class="pi pi-phone icon-secondary" style="font-size: 20px"></i>
      <span class="paragraph">{{ phoneNumberToShow }}</span>
    </span>
  </pv-dialog>

  <!-- DIALOGO DE CONFIRMACION -->
  <pv-dialog
    v-model:visible="deletePostDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"></i>
      <span v-if="post">
        ¿Estás seguro de eliminar el post <b>{{ post.title }}</b
        >?
      </span>
    </div>
    <template #footer>
      <pv-button
        :label="'No'.toUpperCase()"
        icon="pi pi-times"
        class="p-button-text"
        @click="deletePostDialog = false"
      />
      <pv-button
        :label="'Yes'.toUpperCase()"
        icon="pi pi-check"
        class="p-button-text"
        @click="deletePost"
      />
    </template>
  </pv-dialog>
</template>

<style>
.p-mt-2 {
  margin-top: 7rem;
}

.text-limit {
  width: 600px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Media query para estilos en vista móvil */
@media screen and (max-width: 768px) {
  .text-limit {
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .p-mt-2 {
    margin-top: 0;
  }
}
</style>
