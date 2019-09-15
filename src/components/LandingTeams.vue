<template>
    <div>
        <div class="field">
            <b-navbar type="dark">
                <b-navbar-brand>
                    <img class="logo" src="../assets/logo_clear.png" alt="CV Logo">
                </b-navbar-brand>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item class="menu-item" to="/teams">Команды</b-nav-item> 
                    <b-nav-item class="menu-item" href="#">Расписание</b-nav-item>
                    <b-nav-item class="menu-item" href="#">Группы</b-nav-item>
                    <b-nav-item class="menu-item" href="#">Плей-офф</b-nav-item>
                    <b-nav-item class="menu-item" href="#">Прошлые сезоны</b-nav-item>
                    <b-button class="menu-item accent-button shadow-none">Участвовать</b-button>
                </b-navbar-nav>
            </b-navbar>


            <div>
                <b-row class="header">
                    <p class="biggest-text">Команды</p>

                    <md-field id="select-game">
                        <md-select name="status" id="status" v-model="game" md-dense>
                            <md-option value="CSGO">CS:GO</md-option>
                            <md-option value="DOTA2">Dota 2</md-option>                     
                        </md-select>
                        <!-- <span class="md-error" v-if="!validateTitle">Некорректный ввод</span> -->
                    </md-field>
                </b-row>

            </div>

            <div class="prerect">
                <div class="rectangle"></div>
            </div>
        </div>

        <div class="all">
        <div class="info">
            <div class="content">
               
            </div>
        </div>
    </div>

    </div>

</template>

<script>
export default {
  name: 'LandingTeams',
  data: function() {
      return {
          game : 'CSGO'
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    html, body {
        max-width: 100%;
        overflow-x: hidden;
    }

    #select-game{
        margin-left: 2em;
        margin-top: 15.4em;
        padding-top: 3em;
        width: 5em;
        display: inline;
        position: unset;
    }

    .header {
        margin-right: 0;
        margin-left: 0;
    }

    .logos-evo {
        width: 50%;
    }

    .content {
        padding-left: 20%;
        padding-right: 20%;
    }

    .description-text {
        font-size: 1.5em;
        color: #FFFFFF;
        margin-bottom: 3.4em;
    }

    .info {
        background: url("../assets/players_background.jpg") center no-repeat;
        background-size: cover;
        margin-top: -2em;
    }

    .accent-button-big {
        font-size: 1.5em;
    }

    .field {
        background: url("../assets/main_background.png") center no-repeat;
        background-size: cover;
    }

    .prerect {
        max-width: 100%;
        min-width: 100%;
        height: 30em;
        margin-top: -5em;
        overflow-x: hidden;
        overflow-y: hidden; 
    }
    
    .rectangle {
        background-color: #101010;
        min-width: 110%;
        min-height: 20em;
        transform: rotate(-3deg);
        margin-left: -7em;
        transform-origin: 103%;
    }

    .biggest-text {
        color: #FFFFFF;
        margin-top: 4em;
        font-size: 4em;
        font-weight: bold;
        text-align: left;
        margin-left: 3.5em;
    }

    .bigger-text {
        color: #FFFFFF;
        font-size: 1.5em;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 2em;
    }

    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
    }

    .logo {
        width: 4em;
        height: 4em;
        margin-left: 3em;
        margin-top: 1em;
    }

    .menu-item {
        margin-right: 3em;
        color: #FFF !important;
    }

    .menu-item:hover {
        color: #000;
    }

    .accent-button, .accent-button-big {
        background: var(--accent-color);
        box-shadow: 0 0.5em 0.5em rgba(0, 0, 0, 0.25);
        border-radius: 2em;
        padding-left: 1em;
        padding-right: 1em;
        border-color: var(--accent-color);
    }

    .accent-button:hover, .accent-button:active, .accent-button.focus,
    .accent-button-big:hover, .accent-button-big:active, .accent-button-big:focus {
        background: var(--accent-color-dark);
        border-color: var(--accent-color-dark);
        outline: none !important;
        box-shadow: none;
    }

    .navbar-dark .navbar-nav .nav-link{
        color:white !important
    }

    .navbar-dark:hover .navbar-nav:hover .nav-link:hover{
        color: #bcbcbc !important
    }
</style>
