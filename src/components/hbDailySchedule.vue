<template>
    <div>{{date}}</div>
</template>

<script>
import moment from 'moment'

export default {

    props: {
        dailySchedule: {
            type: Object,
            required: function() {
                return true
            }
        },
        span: {
            type: Number,
            required: function() {
                return true
            }
        }
    },
    computed: {
        date: function() {
            return moment(this.dailySchedule.date, "YYYY-MM-DD").format("dddd, MMM DD, YYYY")
        }
    }
}
</script>

<style lang="scss" scoped>

</style>