<template>
  <div class="hbClock">
    <span>{{formattedTime}}</span>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      now: moment()
    };
  },
  computed: {
    formattedTime() {
        return this.now.format('HH:mm:ss')
    },
  },
  created() {
    window.setInterval(() => {
      this.now = moment();
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
</style>


