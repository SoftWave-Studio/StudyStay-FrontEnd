<script>
import moment from 'moment'

export default {
  data() {
    return {
      today: new Date(),
      isOpenReservationDialog: false,
      submitted: false,
      isOpenAddMethodPayDialog: false,
      submitted2: false,
      post: {},
      MethodPay: {},
      reservation: {},
      userData: {},
      cardCredit: [],
      paymentMethods: [
        {
          name: 'VISA',
          logo_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/1200px-Old_Visa_Logo.svg.png'
        },
        {
          name: 'MASTER CARD',
          logo_url:
              'https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg'
        },
        {
          name: 'YAPE',
          logo_url:
            'https://upload.wikimedia.org/wikipedia/commons/0/08/Icono_de_la_aplicaci%C3%B3n_Yape.png'
        },
        {
          name: 'PLIN',
          logo_url:
            'https://marketing-peru.beglobal.biz/wp-content/uploads/2024/09/logo-plin-fondo-transparente.png'
        },
        {
          name: 'PAYPAL',
          logo_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png'
        },
        {
          name: 'EFECTIVO',
          logo_url:
            'https://cdn.worldvectorlogo.com/logos/pago-efectivo-2020.svg'
        }
      ]
    }
  },
  created() {
    const postIdParam = this.$route.params.postId
    this.userData = JSON.parse(localStorage.getItem('user-data')) //obtiene los datos del usuario guardados en el localstorage
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

    this.$creditcardsApiService
        .getAllCardsUser(this.userData.id)
        .then((response) => {
          this.cardCredit = response.data
          this.paymentMethods = this.paymentMethods.concat(this.cardCredit)
        })
        // eslint-disable-next-line no-unused-vars
        .catch((e) => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al obtener datos de las Credit Cards: ${e.message}`,
            life: 3000
          })
        })
  },
  methods: {
    openNew() {
      this.reservation = {}
      this.submitted = false
      this.isOpenReservationDialog = true
    },
    updatedNew(){
      this.MethodPay = {}
      this.submitted2 = false
      this.isOpenAddMethodPayDialog = true
    },
    hideDialog() {
      this.isOpenReservationDialog = false
      this.submitted = false
    },
    hideDialog2() {
      this.isOpenAddMethodPayDialog = false
      this.submitted2 = false
    },
    saveCard(){
      this.submitted2 = true
      if(this.MethodPay.name){
        this.MethodPay.userid = this.userData.id
        this.$creditcardsApiService
            .createCreditcard({
              userid: this.MethodPay.userid,
              name: this.MethodPay.name,
              name_holder: this.MethodPay.name_holder,
              number_card: this.MethodPay.number_card,
              cvv: this.MethodPay.cvv,
              month: this.MethodPay.month,
              year: this.MethodPay.year,
            })
            .then((res) => {
              this.paymentMethods = this.paymentMethods.concat(this.MethodPay)
              this.$toast.add({
                severity: 'success',
                summary: 'Successful',
                detail: `Se agrego correctamente la tarjeta ${res.name}`,
                life: 3000
              })
            })
            .catch((e) => {
              this.$toast.add({
                severity: 'error',
                summary: 'Error',
                detail: `Error al agregar tarjeta: ${e.message}`,
                life: 3000
              })
            })
        this.isOpenAddMethodPayDialog = false
        this.MethodPay = {}
      }
    },
    saveReservation() {
      this.submitted = true
      if (this.reservation.checkInDate) {
        const checkInDateFormatted = moment(this.reservation.checkInDate).format('MM/DD/YYYY hh:mm A');
        const checkOutDateFormatted = moment(this.reservation.checkOutDate).format('MM/DD/YYYY hh:mm A');

        this.$roomsApiService
            .createReservation({
              check_in_date: checkInDateFormatted,  // Usa la fecha formateada
              check_out_date: checkOutDateFormatted, // Usa la fecha formateada
              payment_method: this.reservation.paymentMethod.name,
              post_id: this.post.id,
              user_id: this.userData.id,
              stay_hours: this.reservation.stayhours,
              total_price: this.reservation.total_price,
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
      this.reservation.stayhours = duration.asHours()
      const timeDifference = `${duration.days()} días y ${duration.hours()} horas`

      //obtiene el monto total (precio x horas totales)
      const totalPrice = checkInDate && checkOutDate ? (this.post.price * duration.asHours()).toFixed(2) : 0
      this.reservation.total_price = (this.post.price * duration.asHours()).toFixed(2)

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
                :src="slotProps.value.logo_url"
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
                :src="slotProps.option.logo_url"
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

    <pv-button
        icon="pi pi-plus"
        class="rounded-button-secondary"
        rounded
        outlined
        @click="updatedNew"
    />

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

  <!-- DIALOGO PARA AGREGAR PAY METHOD -->
  <pv-dialog
      v-model:visible="isOpenAddMethodPayDialog"
      :style="{ width: '450px' }"
      header="Agregar nuevo metodo de pago"
      :modal="true"
      class="p-fluid"
  >
    <!-- APODO DE LA TARJETA -->
    <div class="field mt-3 paragraph">
      <span class="p-float-label">
        <pv-input-text
            type="text"
            id="title"
            v-model.trim="MethodPay.name"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted2 && !MethodPay.name }"
        />
        <label for="title">Apodo Metodo de Pago</label>
        <small class="p-error" v-if="submitted2 && !MethodPay.name">Ingresa un apodo para la tarjeta</small>
      </span>
    </div>

    <!-- TITULAR DE LA TARJETA -->
    <div class="field paragraph">
      <span class="p-float-label">
        <pv-textarea
            id="description"
            v-model="MethodPay.name_holder"
            required="true"
            rows="2"
            cols="20"
            :class="{ 'p-invalid': submitted2 && !MethodPay.name_holder }"
        />
        <label for="description">Nombre del titular </label>
        <small class="p-error" v-if="submitted2 && !MethodPay.name_holder">
          Ingresa el nombre del titular
        </small>
      </span>
    </div>

    <!-- NUMERO DE TARJETA -->
    <div class="field paragraph">
      <span class="p-float-label">
        <pv-input-text
            type="text"
            id="address"
            v-model.trim="MethodPay.number_card"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted2 && !MethodPay.number_card }"
        />
        <label for="address">Numero de tarjeta</label>
        <small class="p-error" v-if="submitted2 && !MethodPay.number_card">Ingresa el numero de la tarjeta</small>
      </span>
    </div>

    <!-- CVV -->
    <div class="field paragraph">
      <span class="p-float-label">
        <pv-input-text
            type="text"
            id="address"
            v-model.trim="MethodPay.cvv"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted2 && !MethodPay.cvv }"
        />
        <label for="address">CVV</label>
        <small class="p-error" v-if="submitted2 && !MethodPay.cvv">Ingresa el CVV de la tarjeta</small>
      </span>
    </div>

    <!-- MONTH -->
    <div class="field paragraph">
      <span class="p-float-label">
        <pv-input-text
            type="text"
            id="address"
            v-model.trim="MethodPay.month"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted2 && !MethodPay.month }"
        />
        <label for="address">MES</label>
        <small class="p-error" v-if="submitted2 && !MethodPay.month">Ingresa el mes de vencimiento</small>
      </span>
    </div>

    <!-- YEAR -->
    <div class="field paragraph">
      <span class="p-float-label">
        <pv-input-text
            type="text"
            id="address"
            v-model.trim="MethodPay.year"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted2 && !MethodPay.year }"
        />
        <label for="address">ANIO</label>
        <small class="p-error" v-if="submitted2 && !MethodPay.year">Ingresa el anio de vencimiento</small>
      </span>
    </div>

    <template #footer>
      <pv-button
          :label="'Cancelar'.toUpperCase()"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog2"
      />
      <pv-button
          :label="'Crear'.toUpperCase()"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveCard"
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
