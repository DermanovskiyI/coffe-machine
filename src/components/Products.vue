<template>
  <div :class="$style.products">
    <span :class="$style.title">Продукты</span>
    <ul :class="$style.productsList">
      <li
        v-for="product in productsList"
        :key="product.id"
        :class="$style.productsItem"
      >
        <div :class="$style.productInfo">
          <div :class="$style.productDesc">
            <div :class="$style.productName">{{ product.name }}</div>
            <div :class="$style.productPrice">
              ({{ product.price }} руб. {{ product.rest }}шт.)
            </div>
          </div>
          <div :class="$style.productBtn">
            <button type="button" @click="giveProduct(product)">купить</button>
          </div>
          <div v-if="product.error" :class="$style.error">
            Недостаточно средств
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Products",

  data() {
    return {
      productsList: [
        {
          id: 0,
          name: "Чай",
          price: 13,
          rest: 10,
          error: false,
        },
        {
          id: 1,
          name: "Кофе",
          price: 18,
          rest: 20,
          error: false,
        },
        {
          id: 2,
          name: "Кофе с молоком",
          price: 21,
          rest: 20,
          error: false,
        },
        {
          id: 3,
          name: "Сок",
          price: 35,
          rest: 15,
          error: false,
        },
      ],
    };
  },

  methods: {
    ...mapMutations(["SET_CHANGE"]),
    giveProduct(product) {
      if (this.getDeposit >= product.price) {
        product.error = false;
        this.SET_CHANGE(product.price);
      } else {
        product.error = true;
      }
    },
  },

  computed: {
    ...mapGetters(["getDeposit"]),
  },
};
</script>

<style lang="scss" module>
.products {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid black;
}

.productsList {
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.title {
  align-self: start;
}

.productsItem {
  position: relative;
  margin-bottom: 25px;
}

.productsItem:last-child {
  margin-bottom: 0;
}

.productInfo {
  display: flex;
  justify-content: space-between;
}

.productDesc {
  display: flex;
}

.productName {
  margin-right: 15px;
}

.productBtn {
  display: flex;
  justify-content: flex-end;
  flex: 1;
  margin-left: 20px;
}

.error {
  position: absolute;
  bottom: -15px;
  font-size: 12px;
  color: firebrick;
}
</style>
