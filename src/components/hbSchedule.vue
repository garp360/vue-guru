<template>
  <div class="hb-schedule">
    <div class="hb-layout-schedule-header">
      <slot name="header">1</slot>
    </div>
    <div class="hb-layout-schedule-left">
      <slot name="left">2</slot>
    </div>
    <div class="hb-schedule-main">
      <template v-for="(day, index) in scheduleData">
        <hbDailySchedule v-bind:key="index" :dailySchedule="day" :span="span"></hbDailySchedule>
      </template>
    </div>
    <div class="hb-layout-schedule-right">
      <slot name="right">3</slot>
    </div>
    <div class="hb-layout-schedule-footer">
      <slot name="footer">4</slot>
    </div>
  </div>
</template>

<script>
import hbDailySchedule from '@/components/hbDailySchedule'

export default {
  components: {
    hbDailySchedule,
  },
  props: {
    schedule: {
      type: Array,
      required: function() {
        return true
      },
    },
  },
  data: function() {
    return {
      scheduleData: this.schedule,
    }
  },
  computed: {
    span: function() {
      return 10
    },
  },
  watch: {
    schedule: function() {
      this.scheduleData = this.schedule
    },
  },
}
</script>

<style lang="scss" scoped>
.hb-schedule {
    display: grid;
    height: 100%;
    grid-template-columns: 150px 1fr 50px;
    grid-template-rows: auto 1fr auto;
  }

  .hb-schedule > .hb-layout-schedule-header {
    grid-column: span 3;
    background-color: green;
  }

  .hb-schedule > .hb-layout-schedule-footer {
    grid-column: span 3;
    background-color: green;
  }
</style>