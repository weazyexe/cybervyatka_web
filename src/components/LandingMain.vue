<template>
    <div>
        <Header/>
        <LandingInfo/>
    </div>
</template>

<script>
    import Header from './Header'
    import LandingInfo from "./LandingInfo";

    export default {
        name: 'LandingMain',
        components: {
            LandingInfo,
            Header
        }
    }
</script>

<style scoped>

</style>