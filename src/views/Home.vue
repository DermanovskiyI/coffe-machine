<template>
  <div :class="$style.interface">
    <div :class="$style.container">
      <Machine />
      <Client />
    </div>
  </div>
</template>

<script>
import Machine from "../components/Machine.vue";
import Client from "../components/Client.vue";
export default {
  name: "Home",

  components: {
    Machine,
    Client,
  },
};
</script>

<style lang="scss" module>
.interface {
  border: 1px solid black;
}

.container {
  display: flex;
  justify-content: space-between;
  padding: 50px;
}
</style>
