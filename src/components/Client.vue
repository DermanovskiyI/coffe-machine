<template>
  <div :class="$style.client">
    <div :class="$style.clientMain">
      <div :class="$style.title">клиент</div>
      <ul :class="$style.cashList">
        <li v-for="item in cash" :key="item.id" :class="$style.cashItem">
          <button
            type="button"
            :class="$style.cashPic"
            @click="depositCash(item)"
          >
            <img :src="item.picture" alt="" />
          </button>
          <div :class="$style.rest">- {{ item.rest }} шт</div>
          <div v-if="item.error" :class="$style.error">Недостаточно монет</div>
        </li>
      </ul>
      <div :class="$style.count">сумма {{ restCount }} руб</div>
    </div>
    <button @click="getChange" :class="$style.change" type="button">
      Забрать сдачу
    </button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "Client",

  computed: {
    ...mapGetters(["getDeposit", "machineCash"]),
    restCount() {
      return this.cash.reduce((acc, item) => {
        return acc + item.val * item.rest;
      }, 0);
    },
  },

  data() {
    return {
      cash: [
        {
          id: 0,
          error: false,
          val: 1,
          rest: 10,
          picture:
            "https://e7.pngegg.com/pngimages/709/889/png-clipart-coin-%D0%9E%D0%B4%D0%B8%D0%BD-%D1%80%D1%83%D0%B1%D0%BB%D1%8C-russian-ruble-moscow-mint-coin-computer-russia-thumbnail.png",
        },
        {
          id: 1,
          error: false,
          val: 2,
          rest: 30,
          picture:
            "https://coinsmoscow.ru/published/publicdata/COINSSR2WEBASYSTT/attachments/SC/products_pictures/21088-IMG_3198.JPG",
        },
        {
          id: 3,
          error: false,
          val: 5,
          rest: 20,
          picture:
            "https://forum.ngs24.ru/preview/forum/upload_files/43d8d075b0ef795189dd6a0679172b49_9ad75a6435efead6478292a24a018542_134000617901_100px.gif",
        },
        {
          id: 4,
          error: false,
          val: 10,
          rest: 15,
          picture:
            "https://moneta116.ru/7265-cart_default/moneta-drevnie-goroda-rossii-borovsk.jpg",
        },
      ],
    };
  },

  methods: {
    ...mapMutations([
      "SET_DEPOSIT",
      "SET_MACHINECASH_AFTER_CHANGE",
      "SET_DEPOSIT_AFTER_CHANGE",
    ]),
    depositCash(cash) {
      if (cash.rest > 0) {
        this.SET_DEPOSIT(cash.val);
        cash.error = false;
        cash.rest -= 1;
      } else {
        cash.error = true;
      }
    },

    getChange() {
      let change = [
        {
          val: 1,
          rest: 0,
        },
        {
          val: 2,
          rest: 0,
        },
        {
          val: 5,
          rest: 0,
        },
        {
          val: 10,
          rest: 0,
        },
      ];
      let deposit = this.getDeposit;
      for (let i = change.length - 1; i >= 0; i--) {
        this.machineCash.forEach((item) => {
          if (item.val === change[i].val && item.rest > 0 && deposit > 0) {
            if (Math.floor(deposit / change[i].val) > item.rest) {
              change[i].rest = Math.floor(deposit / change[i].val) - 1;
              deposit = deposit - change[i].rest * change[i].val;
            } else if (Math.floor(deposit / change[i].val) <= item.rest) {
              change[i].rest = Math.floor(deposit / change[i].val);
              deposit =
                deposit - Math.floor(deposit / change[i].val) * change[i].val;
            }
            this.SET_DEPOSIT_AFTER_CHANGE();
            this.SET_MACHINECASH_AFTER_CHANGE({
              val: change[i].val,
              rest: change[i].rest,
            });
          }
        });
      }
      change.forEach((changeItem) => {
        this.cash.find((cashItem) => {
          if (changeItem.val === cashItem.val) {
            cashItem.rest += changeItem.rest;
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" module>
.client {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.cashPic {
  width: 70px;
  height: 70px;
  margin-right: 30px;
  cursor: pointer;
}

.error {
  position: absolute;
  bottom: -15px;
  font-size: 12px;
  color: firebrick;
}

.count {
  align-self: flex-end;
}
</style>
