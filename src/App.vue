<template>
  <div id="app">
      <vue-page-transition name="fade-in-up">
          <router-view/>
      </vue-page-transition>

  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    parseDate(date) {
      let day = date.getDate();
      if (day < 10) day = '0' + day;

      let month = date.getMonth() + 1;
      if (month < 10) month = '0' + month;

      let year = date.getFullYear();

      return day + '.' + month + '.' + year;
    }
  }
}
</script>

<style lang="scss">
  @import url('./css/colors.css');
  @import url('./css/buttons.css');

  @import "~vue-material/dist/theme/engine"; // Import the theme engine

  @include md-register-theme("default", (
  primary: #D68956,
  accent: #D68956,
  theme: dark
  ));

  @import "~vue-material/dist/theme/all"; // Apply the theme

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
    -webkit-overflow-scrolling: touch;
}
  .hamburger-menu {
    background-color: #101010;
    min-height: 100vh;
    padding-left: 0;
    padding-right: 0;
    min-width: 20em;
    width: 20em;
    box-shadow: 0 0.2em 1em rgba(0, 0, 0, 0.18);
  }

  .admin-menu-logo {
    width: 6em;
    height: 6em;
    margin: 2em auto 6em;
  }

  .content {
    background-color: #212121;
    padding-top: 5em;
    margin-right: auto;
    margin-left: 20em;
      padding-bottom: 2em;
  }

  .rect {
    background-color: #282828;
    border-radius: 1em;
    padding-top: 2em;
    margin-left: 2em;
    margin-right: 2em;
    box-shadow: 0 0.2em 1em rgba(0, 0, 0, 0.18);
  }

  .rect-header {
    color: rgba(255, 255, 255, 0.38);
    margin-left: 2em;
    font-family: Roboto, serif;
    font-weight: 500;
  }

    .material-icons {
        user-select: none;
    }
</style>
