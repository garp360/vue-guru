<template>
  <div class="divTable hb-deadline-wrapper">
    <div class="divTableBody">
      <div class="divTableRow">
        <div class="divTableCell digit hb-cell-center hb-cell-middle deadline-outline">Pick Deadline</div>
        <div class="divTableCell countdown-outline">
          <div class="divTable">
            <div class="divTableBody">
              <div class="divTableRow">
                <div class="divTableCell digit hb-cell-center">{{ days | two_digits }}</div>
                <div class="divTableCell digit hb-cell-center">{{ hours | two_digits }}</div>
                <div class="divTableCell digit hb-cell-center">{{ minutes | two_digits }}</div>
                <div class="divTableCell digit hb-cell-center">{{ seconds | two_digits }}</div>
              </div>
              <div class="divTableRow">
                <div class="divTableCell text hb-cell-center">Days</div>
                <div class="divTableCell text hb-cell-center">Hours</div>
                <div class="divTableCell text hb-cell-center">Minutes</div>
                <div class="divTableCell text hb-cell-center">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      target: moment(this.date, 'YYYY-MM-DD hh:mm:ss'),
      now: moment(),
    }
  },
  computed: {
    countdown() {
      // return moment().to(this.target).duration.as()
      return this.target.fromNow()
    },
    seconds() {
      return this.target.diff(this.now, 'seconds') % 60
    },

    minutes() {
      return this.target.diff(this.now, 'minutes') % 60
    },

    hours() {
      return this.target.diff(this.now, 'hours') % 24
    },

    days() {
      return this.target.diff(this.now, 'days')
    },
  },
  created() {
    window.setInterval(() => {
      this.now = moment()
    }, 1000)
  },
  filters: {
    two_digits: function(value) {
      if (value.toString().length <= 1) {
        return '0' + value.toString()
      }
      return value.toString()
    },
  },
}
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:500);

.hb-deadline-wrapper {
  margin-bottom: 5px;
}
.text {
  //   color: #dbdf1e;
  color: #9499a1;
  font-size: 0.8em;
  font-family: 'Roboto Condensed', serif;
  font-weight: 40;
  text-align: center;
}

.digit {
  //   color: #ecf0f1;
  color: rgb(37, 85, 216);
  font-size: 0.9em;
  font-weight: 500;
  font-family: 'Roboto', serif;
  text-align: center;
}

.divTable {
  display: table;
}
.divTableRow {
  display: table-row;
}
.divTableCell {
  display: table-cell;
  padding: 0px 10px;
}
.hb-cell-center {
  text-align: center;
}
.hb-cell-middle {
  vertical-align: middle;
}
.divTableBody {
  display: table-row-group;
}
.deadline-outline,
.countdown-outline {
  //  border: 1px solid rgb(49, 73, 54);
  //   background-color: #000;
  //   background-color: rgb(62, 87, 67);
  //   background-color: rgba(56, 56, 56, 0.596);
  //   opacity: 0.6;
  padding: 5px 0px;
}
.deadline-outline {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  padding-right: 16px;
  padding-left: 16px;
}
.countdown-outline {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
</style>
