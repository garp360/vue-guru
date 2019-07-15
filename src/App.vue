<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import SimplePredictor from '@/utils/SimplePredictor.js'

export default {
    props: {

    },
    data: function() {
        return {

        }
    },
    methods: {
        
    },
    created() {
        let now = new Date()
        let month = now.getMonth()
        let season = now.getFullYear()
        if(month < 2) {
            season -= season
        } 
        this.$store.dispatch("loadSeasonData", { season: season }).then(() => {
            SimplePredictor.getPredictions()
        });
    }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400,700&display=swap&subset=latin-ext');
/* @import url('https://fonts.googleapis.com/css?family=Anonymous+Pro:400,400i,700,700i&display=swap&subset=latin-ext'); */
/* @import url('https://fonts.googleapis.com/css?family=Anonymous+Pro:400,400i,700,700i|Roboto+Mono:100,400,500,700&display=swap&subset=latin-ext'); */
html, body {
    /* font-family: 'Source Code Pro', monospace; */
    /* font-family: 'Anonymous Pro', monospace; */
    font-family:  Verdana;
}
</style>


<style lang="scss">
#app {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
</style>
