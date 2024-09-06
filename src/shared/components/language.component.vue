<script>
export default {
  name: 'language-component',
  data() {
    return {
      selectedLang: {
        name: 'ES',
        image:
          'https://media.discordapp.net/attachments/1149328486868209678/1177037745219178556/ce858535b77f22068049aca2457e59ad-circulo-de-icono-de-idioma-de-bandera-de-espana.png?ex=65710cd2&is=655e97d2&hm=6f05851a79e8abb8113f5caa09e8685bcd28eeae3751bce3aa7509e084ab69b6&=&format=webp&width=281&height=281'
      },
      languages: [
        {
          name: 'ES',
          image:
            'https://media.discordapp.net/attachments/1149328486868209678/1177037745219178556/ce858535b77f22068049aca2457e59ad-circulo-de-icono-de-idioma-de-bandera-de-espana.png?ex=65710cd2&is=655e97d2&hm=6f05851a79e8abb8113f5caa09e8685bcd28eeae3751bce3aa7509e084ab69b6&=&format=webp&width=281&height=281'
        },
        {
          name: 'EN',
          image:
            'https://media.discordapp.net/attachments/1149328486868209678/1177037744946561034/6ecbb5ec8c121c0699c9b9179d6b24aa-circulo-de-icono-de-idioma-de-bandera-de-inglaterra.png?ex=65710cd2&is=655e97d2&hm=db9f12d8b36abfbbbae5aef081bc5edb8d90dc7fdb70b51e04eb9379acbb5825&=&format=webp&width=281&height=281'
        }
      ]
    }
  },
  watch: {
    selectedLang(newValue) {
      this.updateLocale(newValue);
    }
  },
  methods: {
    updateLocale(lang) {
      if (lang.name === 'EN') {
        this.$i18n.locale = 'en';
      } else if (lang.name === 'ES') {
        this.$i18n.locale = 'es';
      }
    }
  },
  created() {
    this.updateLocale(this.selectedLang);
  }
}
</script>

<template>
  <pv-dropdown v-model="selectedLang" :options="languages" optionLabel="name" placeholder="Lang">
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex align-items-center">
        <img
          :alt="slotProps.value.name"
          :src="slotProps.value.image"
          class="mr-2"
          style="width: 18px"
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
          :alt="slotProps.option.name"
          :src="slotProps.option.image"
          class="mr-2"
          style="width: 18px"
        />
        <div>{{ slotProps.option.name }}</div>
      </div>
    </template>
  </pv-dropdown>
</template>
