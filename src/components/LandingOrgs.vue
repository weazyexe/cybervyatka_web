<template>
    <div class="parallax">
        <div class="all-content parallax__layer parallax__layer--back"></div>

        <div class="parallax__layer parallax__layer--base">
            <landing-header></landing-header>
            <b-row class="header">
                <p class="biggest-text">Организаторы</p>
            </b-row>

            <div class="prerect">
                <div class="rectangle"></div>
            </div>

            <b-container fluid id="teams-content">
                <b-col>
                    <b-row class="filters ml-auto mr-auto text-center">
                        <staff-entry name="Александр Шихалдин" position="Руководитель"  photo="org_shixa.png" vk="silent43" instagram="alexandr_shikhaldin" telegram="silent43rus"></staff-entry>
                    </b-row>
                    <b-row class="filters ml-auto mr-auto text-center">
                        <staff-entry name="Анна Глушкова" position="Контент-менеджер"  photo="org_anna.png" vk="glushkoova" instagram="glushkoova"></staff-entry>
                        <staff-entry name="Даниил Аверин" position="Менеджер по продвижению"  photo="org_daniil.png" vk="averination" instagram="averination"></staff-entry>
                        <staff-entry name="Тимур Задворнов" position="Разработчик, дизайнер" photo="org_me.jpg" instagram="weazyexe" vk="weazyexe" twitter="weazyexe" telegram="weazyexe"></staff-entry>
                    </b-row>
                    <b-row class="filters ml-auto mr-auto text-center">
                        <staff-entry name="Олег Мартыненко" position="Администратор"  photo="org_oleg.png" instagram="propendocena" vk="id58555244" telegram="propendoz"></staff-entry>
                        <staff-entry name="Александр Вохмянин" position="Администратор"  photo="org_sashav.png" instagram="aleksandr_vokhmyanin" vk="id96993943" telegram="alastorchan"></staff-entry>
                    </b-row>
                    <b-row class="filters ml-auto mr-auto text-center">
                        <staff-entry name="Алексей Широков" position="Стафф"  photo="org_lesha.png" instagram="shirba322" vk="eztome"></staff-entry>
                        <staff-entry name="Иван Митягин" position="Стафф" photo="org_mitya.png" instagram="mad_mitya09" vk="idqwerty007"></staff-entry>
                    </b-row>
                </b-col>
            </b-container>

            <landing-footer></landing-footer>
        </div>
    </div>
</template>

<script>
    import LandingFooter from "@/components/LandingFooter";
    import LandingHeader from "@/components/LandingHeader";
    import StaffEntry from "@/components/StaffEntry";
    
    export default {
        name: "LandingOrgs",
        components: {
            StaffEntry,
            LandingHeader,
            LandingFooter
        },
        created() {
            document.title = this.$route.meta.title;
        }
    }
</script>

<style scoped>
    .prerect {
        max-width: 100%;
        min-width: 100%;
        height: 30em;
        overflow-x: hidden;
        overflow-y: hidden;
        z-index: -1;
        position: relative;
    }

    .rectangle {
        background-color: #101010;
        min-width: 110%;
        min-height: 12em;
        transform: rotate(-3deg);
        margin-left: -7em;
        transform-origin: 103%;
    }

    .all-content {
        background: url("../assets/main_background.png") center no-repeat;
        background-size: cover;
        max-height: 45em;
        z-index: -1;
        margin-top: -4%;
    }

    @media only screen and (min-width: 721px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 4em;
            font-size: 4em;
            font-weight: bold;
            text-align: left;
            margin-left: 10.5%;
        }
    }

    @media only screen and (max-width: 720px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 6.8em;
            font-size: 2.5em;
            font-weight: bold;
            text-align: left;
            margin-left: 10.5%;
        }
    }

    @media only screen and (min-width: 721px) {
        .mlr-auto {

        }
    }

    @media only screen and (max-width: 720px) {
        .mlr-auto {
            margin-left: auto;
            margin-right: auto;
        }
    }

    #teams-content {
        background-color: #101010;
        margin-top: -23em;
        padding: 3% 10% 10% 10%;
        min-height: 30em;
    }

    .parallax {
        perspective: 1px;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .parallax__layer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .parallax__layer--base {
        transform: translateZ(0);
    }

    .parallax__layer--back {
        transform: translateZ(-1px) scale(2.7);
    }

    .filters {
        margin-left: 1em;
        margin-bottom: 3em;
    }

    .header {
        margin-right: 0;
        margin-left: 0;
    }

    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
    }
</style>