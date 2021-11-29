<template>
  <div :class="$style.cash">
    <div :class="$style.title">Остаток монет</div>
    <ul :class="$style.cashList">
      <li v-for="item in machineCash" :key="item.id" :class="$style.cashItem">
        <div :class="$style.rest">{{ item.val }} руб - {{ item.rest }} шт</div>
      </li>
    </ul>
    <div :class="$style.count">сумма {{ restCount }} руб</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Cash",

  computed: {
    ...mapGetters(["getDeposit", "machineCash"]),
    restCount() {
      return this.machineCash.reduce((acc, item) => {
        return acc + item.val * item.rest;
      }, 0);
    },
  },

  watch: {
    getDeposit(newVal, prev) {
      // получаем номинал новой монеты
      let res = newVal - prev;
      this.machineCash.forEach((item) => {
        if (item.val === res) {
          item.rest += 1;
        }
      });
    },
  },
};
</script>

<style lang="scss" module>
.cash {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 1px solid black;
}

.title {
  align-self: flex-start;
}

.cashList {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
}

.cashItem {
  margin-bottom: 15px;
}

.count {
  align-self: flex-end;
}
</style>
