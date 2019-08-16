<template>
  <div class="page">
    <hbSchedule :schedule="schedule"></hbSchedule>
  </div>
</template>

<script>
import hbSchedule from '@/components/hbSchedule'

export default {
  components: {
    hbSchedule,
  },
  data: function() {
    return {
      schedule: [
        {
          index: 1,
          date: '2019-08-12',
          shiftStart: '0800',
          shiftDuration: 480,
          lunchStart: '1100',
          lunchDuration: 30,
          aws: 8,
          shift: 1,
        },
        {
          index: 2,
          date: '2019-08-13',
          shiftStart: '0800',
          shiftDuration: 480,
          lunchStart: '1100',
          lunchDuration: 30,
          aws: 8,
          shift: 1,
        },
        {
          index: 3,
          date: '2019-08-14',
          shiftStart: '0800',
          shiftDuration: 480,
          lunchStart: '1100',
          lunchDuration: 30,
          aws: 8,
          shift: 1,
        },
        {
          index: 4,
          date: '2019-08-15',
          shiftStart: '0800',
          shiftDuration: 480,
          lunchStart: '1100',
          lunchDuration: 30,
          aws: 8,
          shift: 1,
        },
        {
          index: 5,
          date: '2019-08-16',
          shiftStart: '0800',
          shiftDuration: 480,
          lunchStart: '1100',
          lunchDuration: 30,
          aws: 8,
          shift: 1,
        },
        {
          index: 6,
          date: '2019-08-17',
        },
        {
          index: 7,
          date: '2019-08-18',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/custom.scss';

.page {
  background-color: #fff;

  height: 100%;
  width: 100%;
}
</style>
