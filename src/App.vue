<template>
  <div id="app">
    <div class="wrapper">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

img {
  max-width: 100%;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.wrapper {
  overflow: hidden;
  min-width: 0;
  height: 100%;
  width: 100%;
}

.container {
  width: auto;
  max-width: 850px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
