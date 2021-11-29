<template>
  <div :class="$style.machine">
    <div :class="$style.title">кофейный автомат</div>
    <div :class="$style.deposit">внесено: {{ getDeposit }}</div>
    <Products />
    <Cash />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Products from "./Products.vue";
import Cash from "./Cash.vue";

export default {
  name: "Machine",

  components: {
    Products,
    Cash,
  },

  computed: {
    ...mapGetters(["getDeposit"]),
  },
};
</script>

<style lang="scss" module>
.machine {
  border: 1px solid black;
  padding: 15px;
}

.title,
.deposit {
  text-align: start;
  margin-bottom: 15px;
}
</style>
