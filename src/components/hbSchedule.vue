<template>
    <div class="hb-schedule">
        <template v-for="(day, index) in scheduleData">
            <hbDailySchedule v-bind:key="index" :dailySchedule="day" :span="span"></hbDailySchedule>
        </template>
    </div>
</template>

<script>
import hbDailySchedule from '@/components/hbDailySchedule'

export default {
    components: {
        hbDailySchedule
    },
    props: {
        schedule: {
            type: Array,
            required: function() {
                return true
            }
        }
    },
    data: function() {
        return {
            scheduleData: this.schedule
        }
    },
    computed: {
        span: function() {
            return 10
        }
    },
    watch: {
        schedule: function() {
            this.scheduleData = this.schedule
        }
    }
}
</script>

<style lang="scss" scoped>

</style>