<template>
  <hbDashboard>
    <hbHeader title="hbGURU" slot="header">
      <span slot="title">
        <font>hb</font>
        <font style="font-family: Roboto;font-weight: 100;">-GURU</font>
        <font style="font-size:.4em;vertical-align:top;">^{{currentSeason}}</font>
      </span>
      <hbDeadline slot="deadline" date="2019-09-08 11:45:00" />
    </hbHeader>
    <div slot="nav">
      <hbMenu></hbMenu>
    </div>
    <div slot="footer">
      <font class="text-small">powered by:</font>
      <font>Halobyte</font>
    </div>
  </hbDashboard>
</template>

<script>
import hbDeadline from "@/components/hbDeadline";
import hbDashboard from "@/components/hbDashboard";
import hbHeader from "@/components/hbHeader";
import hbMenu from "@/components/hbMenu";
import hbClock from "@/components/hbClock";

export default {
  components: {
    hbDashboard,
    hbDeadline,
    hbHeader,
    hbMenu,
    hbClock
  },
  data: function() {
    return {
      currentSeason: new Date().getFullYear()
    };
  }
};
</script>


<style lang="scss" scoped>
</style>
