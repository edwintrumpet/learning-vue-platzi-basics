Vue.component('CoinDetail', {
  props: ['coin'],

  template: `
    <div>
      <img
        v-bind:src="coin.img"
        v-bind:alt="coin.name"
        v-on:mouseover="toggleShowPrices"
        v-on:mouseout="toggleShowPrices"
      >
      <h1 v-bind:class="coin.changePercent > 0 ? 'green' : 'red'">
        {{ title }}
        <span v-if="coin.changePercent > 0">👍</span>
        <span v-else-if="coin.changePercent < 0">👎</span>
        <span v-else>🤞</span>

        <span v-show="coin.changePercent > 0">👍</span>
        <span v-show="coin.changePercent < 0">👎</span>
        <span v-show="coin.changePercent === 0">🤞</span>
        <span v-on:click="toggleShowPrices">{{ showPrices ? '🙈' : '🐵' }}</span>
      </h1>
      <input type="number" v-model="value">
      <span>{{ convertedValue }}</span>

      <ul v-show="showPrices">
        <li
          v-for="(p, i) in coin.pricesWithDays"
          v-bind:key="p.day"
          class="uppercase"
          v-bind:class="{ orange: p.value === coin.price, red: p.value < coin.price, green: p.value > coin.price }"
        >
          {{ i }} - {{ p.day }} - {{ p.value }}
        </li>
      </ul>
    </div>
  `,

  data () {
    return {
      showPrices: false,
      value: 0
    }
  },

  computed: {
    title () {
      return `${this.coin.name} - ${this.coin.symbol}`
    },
    convertedValue () {
      if(!this.value) return 0

      return this.value / this.coin.price
    }
  },

  methods: {
    toggleShowPrices () {
      this.showPrices = !this.showPrices
    }
  }
})

new Vue({
  el: '#app',
  data () {
    return  {
      btc: {
        name: 'Bitcoin',
        symbol: 'BTC',
        img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        changePercent: 10,
        price: 8400,
        pricesWithDays: [
          { day: 'Lunes', value: 8400 },
          { day: 'Martes', value: 7900 },
          { day: 'Miércoles', value: 8200 },
          { day: 'Jueves', value: 9000 },
          { day: 'Viernes', value: 9400 },
          { day: 'Sábado', value: 10000 },
          { day: 'Domingo', value: 10200 },
        ],
      },
      color: 'f4f4f4'
    }
  }
})
