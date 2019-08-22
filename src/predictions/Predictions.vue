<template>
  <div class="predictions">
    <div class="title">
      <span @click="getOffensiveStats()">Predictions - Week{{ currentWeek }}</span>
    </div>
    <div class="divTable">
      <div class="divTableHeading">
        <div class="divTableRow">
          <div class="divTableHead hb-cell-center">Week</div>
          <div class="divTableHead">Game Day</div>
          <div class="divTableHead">Day</div>
          <div class="divTableHead">Time</div>
          <div class="divTableHead">Visitor</div>
          <div class="divTableHead">Home</div>
          <div class="divTableHead hb-cell-center">Head 2 Head</div>
          <div class="divTableHead">Spread</div>
          <div class="divTableHead">P-Spread</div>
          <div class="divTableHead">Strength</div>
        </div>
      </div>
      <div class="divTableBody">
        <div
          class="divTableRow"
          v-for="matchup in matchups"
          v-bind:key="matchup.eid"
        >
          <div class="divTableCell hb-cell-center">{{ matchup.week }}</div>
          <div class="divTableCell">{{ gametime(matchup) }}</div>
          <div class="divTableCell">{{ matchup.d.toUpperCase() }}</div>
          <div class="divTableCell">{{ matchup.t }}</div>
          <div class="divTableCell">{{ matchup.v }}</div>
          <div class="divTableCell">{{ matchup.h }}</div>
          <div class="divTableCell hb-cell-center">
            {{ matchup.v }} [{{ matchup.pvs }}]
            <font>@</font>
            {{ matchup.h }} [{{ matchup.phs }}]
          </div>
          <div class="divTableCell">{{matchup.spread}}</div>
          <div class="divTableCell">{{calcPSpread(matchup)}}</div>
          <div class="divTableCell">{{calcPSpread(matchup) - matchup.spread}}</div>
        </div>
      </div>
    </div>
    <font style="color:#eeeeee;">{{ target }}</font>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'
import GuruService from '@/services/GuruService.js'
import StatService from '@/services/StatService.js'


export default {
  data: function() {
    return {
      focused: {},
      target: '',
    }
  },
  methods: {
    gametime: function(game) {
      let gametime =
        game.eid.substring(0, game.eid.length - 2) +
        ' ' +
        game.t.padStart(5, '0') +
        ' PM'
      return moment(gametime, 'YYYYMMDD hh:mm a')
        .format('MMM DD, YYYY')
        .toUpperCase()
    },
    calcPSpread: function(matchup) {
        let favorite = matchup.phs > matchup.pvs ? 1 : matchup.phs < matchup.pvs ? -1 : 0
        return matchup.pvs - matchup.phs
    },
    getOffensiveStats: async function() {
        StatService.getOffensiveStatsBySeason(2018)
    }
  },
  computed: {
    ...mapState([
      'currentWeek',
      'currentSeason',
      'matchups'
    ]),
    ...mapGetters([
      'currentSpreadStatus',
      'currentPredictionStatus',
    ]),
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/custom.scss';
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:500);


.predictions {
  padding: 20px;
}

.predictions .divTable,
.predictions .divTableCell,
.predictions .divTableHead,
.predictions .title,
.predictions input {
  border-color: rgb(25, 25, 31);
  color: #4f9761;
  font-weight: 500;
  font-size: 1.1em;
  font-family: 'Roboto', serif;
}
.predictions .title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #5e83c4;
  font-weight: 500;
  font-size: 2em;
  font-family: 'Roboto', serif;
  margin-bottom: 5px;
}
.predictions .divTableHeading .divTableHead {
  color: #5e83c4;
  font-size: 1.2em;
}
.divTable {
  border-left: 1px solid #999999;
  border-top: 1px solid #999999;
  display: table;
  width: 100%;
}
.divTableRow {
  display: table-row;
}
.divTableCell,
.divTableHead {
  border-right: 1px solid #999999;
  border-bottom: 1px solid #999999;
  display: table-cell;
  padding: 3px 10px;
}

.hb-cell-center {
  text-align: center;
}

.divTableHead {
  padding: 3px 7px;
}

.divTableHeading {
  background-color: rgba(39, 39, 48, 0.664);
  display: table-header-group;
  font-weight: bold;
}
.divTableFoot {
  background-color: #eee;
  display: table-footer-group;
  font-weight: bold;
}
.divTableBody {
  display: table-row-group;
}

.predictions .divTableRow.isFocused {
  background-color: #5e83c4;
  outline: none;
}
.divTableCell.hb-cell-center > font {
  padding: 0px 5px;
}

.predictions .divTableRow.isFocused .divTableCell,
.predictions .divTableRow.isFocused .divTableCell input,
input:focus,
input::selection {
  color: rgb(25, 25, 31);
  user-select: all;
}

input,
input:focus {
  border: none;
  background-color: transparent;
  outline: none;
  width: 100%;
}
input::selection {
  background-color: transparent;
}
</style>
