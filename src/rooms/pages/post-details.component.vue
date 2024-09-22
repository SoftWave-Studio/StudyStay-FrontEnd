<script>
import moment from 'moment'

export default {
  data() {
    return {
      today: new Date(),
      isOpenReservationDialog: false,
      submitted: false,
      post: {},
      reservation: {},
      paymentMethods: [
        {
          name: 'VISA',
          logoUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/1200px-Old_Visa_Logo.svg.png'
        },
        {
          name: 'YAPE',
          logoUrl:
            'https://media.discordapp.net/attachments/1146490170917535764/1166986674320973844/l048nvZUXxmhjaDjxdJntZWSj03oOAK0ETKCQZup-Ea-aM_h8M94Jz87cw8JiwCHSEbv8llHs900-c-k-c0x00ffffff-no-rj.png?ex=654c7c08&is=653a0708&hm=454875ae848f7e6e742168e46ba1e6c0909fcc151c7d3da696d2b54bf23bbd48&=&width=671&height=671'
        },
        {
          name: 'PLIN',
          logoUrl:
            'https://media.discordapp.net/attachments/1146490170917535764/1166986783234457630/plin-logo-967A4AF583-seeklogo.png?ex=654c7c22&is=653a0722&hm=8eaa3c9c58d6ddc2adbdb95a15c20e6ae58d704ce31297ffbc432e9db0a845e7&=&width=330&height=330'
        },
        {
          name: 'PAYPAL',
          logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png'
        },
        {
          name: 'EFECTIVO',
          logoUrl:
            'https://media.discordapp.net/attachments/1146490170917535764/1166986970866655243/diseno-icono-dinero-efectivo_1692-61.png?ex=654c7c4f&is=653a074f&hm=858584d34d4fa7847422528d056fdb0564b7b9a9c4399f789446a573d4213c18&=&width=671&height=671'
        }
      ]
    }
  },
  created() {
    const postIdParam = this.$route.params.postId
    this.$roomsApiService
      .getPostById(postIdParam)
      .then((response) => {
        this.post = response.data
      })
      .catch((e) => {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al obtener datos del post: ${e.message}`,
          life: 3000
        })
      })
    this.$roomsApiService
      .getAllPosts()
      .then((response) => {
        this.posts = response.data
      })
      // eslint-disable-next-line no-unused-vars
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
    openNew() {
      this.reservation = {}
      this.submitted = false
      this.isOpenReservationDialog = true
    },
    hideDialog() {
      this.isOpenReservationDialog = false
      this.submitted = false
    },
    saveReservation() {
      this.submitted = true
      if (this.reservation.checkInDate) {
        this.$roomsApiService
          .createReservation({
            checkInDate: this.reservation.checkInDate,
            checkOutDate: this.reservation.checkOutDate,
            paymentMethod: this.reservation.paymentMethod.name,
            postId: this.post.id,
            userId: 1
          })
          .then((res) => {
            this.$toast.add({
              severity: 'success',
              summary: 'Successful',
              detail: `Se reservó correctamente una habitación para el ${new Date(
                res.data.checkInDate
              )}`,
              life: 3000
            })
          })
          .catch((e) => {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: `Error reservar esta habitación: ${e.message}`,
              life: 3000
            })
          })
        this.isOpenReservationDialog = false
        this.reservation = {}
      }
    },
    getReservationData() {
      const { checkInDate, checkOutDate } = this.reservation
      const checkIn = moment(checkInDate)
      const checkOut = moment(checkOutDate)

      const duration = moment.duration(checkOut?.diff(checkIn))
      const timeDifference = `${duration.days()} días y ${duration.hours()} horas`

      //obtiene el monto total (precio x horas totales)
      const totalPrice = checkInDate && checkOutDate ? (this.post.price * duration.asHours()).toFixed(2) : 0

      return {
        timeDifference,
        totalPrice
      }
    },
    checkOutIsBeforeCheckIn() {
      if (this.reservation.checkInDate && this.reservation.checkOutDate) {
        const checkIn = moment(this.reservation.checkInDate)
        const checkOut = moment(this.reservation.checkOutDate)
        return checkOut.isSameOrBefore(checkIn)
      }
      return false
    }
  }
}
</script>

<template>
  <div class="details-container border-1 paragraph">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-900 title-secondary">{{ post.title }}</h1>
    </div>
    <div class="contenedor">
      <!-- IMAGEN -->
      <div>
        <img
          :src="post.image_url"
          :alt="post.title"
          class="habitacion"
        />
      </div>

      <!-- DATOS -->
      <div class="mt-3">
        <b>Detalles:</b>
        <!-- DIRECCION -->
        <div class="flex align-items-center gap-3">
          <span class="flex align-items-center gap-2">
            <i class="pi pi-map-marker icon-secondary"></i>
            <span class="paragraph">{{ post.address }}</span>
          </span>
        </div>
        <!-- RATING -->
        <div class="flex align-items-center gap-3">
          <span class="flex align-items-center gap-2">
            <i class="pi pi-star icon-secondary"></i>
            <span class="paragraph">{{ post.rating }}</span>
          </span>
        </div>
        <!-- UNIVERSIDADES CERCANAS -->
        <div class="flex align-items-center gap-3">
          <span class="flex align-items-center gap-2">
            <i class="pi pi-building icon-secondary"></i>

                  <span class="paragraph">
                    {{ $t('posts-view.near-to') }}
                    <span
                      v-for="(university, index) in JSON.parse(post.nearest_universities)"
                      :key="index"
                    >
                      {{ university
                      }}<span
                      v-if="index < JSON.parse(post.nearest_universities).length - 1"
                    >,
                      </span>
                    </span>
                  </span>
          </span>
        </div>
        <br />

        <!-- DESCRIPCIÓN -->
        <b>Descripción:</b>
        {{ post.description }}
        <br /><br />

        <!-- PRECIO -->
        <b>Tarifa: </b>
        <span>S/.{{ post.price }} x hora</span>

        <div class="button-container mt-3">
          <pv-button
            label="Reservar"
            class="button-secondary"
            icon="pi pi-calendar-plus"
            @click="openNew"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- DIALOGO PARA LA RESERVA -->
  <pv-dialog
    v-model:visible="isOpenReservationDialog"
    :style="{ width: '450px' }"
    header="Realizar reserva"
    :modal="true"
    class="p-fluid"
  >
    <!-- CHECKIN -->
    <div class="field mt-3 paragraph">
      <span class="p-float-label">
        <pv-calendar
          id="checkInDate"
          v-model="reservation.checkInDate"
          showTime
          showIcon
          hourFormat="12"
          :minDate="today"
          :class="{ 'p-invalid': submitted && !reservation.checkInDate }"
        />
        <label for="checkInDate">Check in</label>
        <small class="p-error" v-if="submitted && !reservation.checkInDate">
          La fecha del check-in es necesaria
        </small>
      </span>
    </div>

    <!-- CHECKOUT -->
    <div class="field paragraph">
      <span class="p-float-label">
        <pv-calendar
          id="checkOutDate"
          v-model="reservation.checkOutDate"
          showTime
          showIcon
          hourFormat="12"
          :minDate="today"
          :class="{ 'p-invalid': submitted && !reservation.checkOutDate }"
        />
        <label for="checkOutDate">Check out</label>
        <small class="p-error" v-if="submitted && !reservation.checkOutDate">
          La fecha del check-out es necesaria
        </small>
        <small class="p-error" v-if="checkOutIsBeforeCheckIn()">
          La fecha de check-out no puede ser igual o anterior a la fecha de check-in
        </small>
      </span>
    </div>

    <!-- PAYMENT METHOD -->
    <div class="field paragraph">
      <span class="p-float-label">
        <pv-dropdown
          id="paymentMethod"
          v-model="reservation.paymentMethod"
          :options="paymentMethods"
          optionLabel="name"
          placeholder="Selecciona un método de pago"
          :class="{ 'p-invalid': submitted && !reservation.paymentMethod }"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
              <img
                :src="slotProps.value.logoUrl"
                :alt="slotProps.value.name"
                style="width: 18px; margin-right: 10px"
              />
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex align-items-center">
              <img
                :src="slotProps.option.logoUrl"
                :alt="slotProps.option.name"
                style="width: 18px; margin-right: 10px"
              />
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </pv-dropdown>
        <label for="paymentMethod">Método de pago</label>
        <small class="p-error" v-if="submitted && !reservation.paymentMethod">
          Seleccione un método de pago
        </small>
      </span>
    </div>

    <div class="field paragraph">
      <b>Tiempo de estadía:</b> {{ getReservationData().timeDifference }}
    </div>

    <div class="field paragraph"><b>Monto total:</b> S/.{{ getReservationData().totalPrice }}</div>

    <template #footer>
      <pv-button
        :label="'Cancelar'.toUpperCase()"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialog"
      />
      <pv-button
        :label="'Reservar'.toUpperCase()"
        icon="pi pi-check"
        class="p-button-text"
        @click="saveReservation"
      />
    </template>
  </pv-dialog>
</template>

<style>
.details-container {
  border-radius: 20px;
  position: relative;
  padding: 2%;
  margin: 5%;
  display: grid;
  grid-template-columns: 1fr 2fr; /* Divide en dos columnas, la imagen ocupa 1/3 y el contenido 2/3 */
  gap: 2rem;
  align-items: center; /* Centra verticalmente los elementos */
}

.habitacion {
  width: 50%; /* Ajusta el ancho al contenedor */
  height: auto; /* Ajusta la altura automáticamente */
  margin-right: 20px; /* Agrega un margen derecho a la imagen */
}

.text-center {
  text-align: center; /* Centra el texto del título */
}

.button-container {
  text-align: center; /* Centra el botón en horizontal */
  margin-top: auto; /* Empuja el botón hacia la parte inferior del contenedor */
}
</style>
