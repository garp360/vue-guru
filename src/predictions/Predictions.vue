<template>
  <div class="predictions">
    <div class="title">
      <span>Predictions - Week{{currentWeek}}</span>
    </div>
    <div
      v-bind:class="{ isFocused: isFocused(matchup) }"
      class="divTableRow"
      v-for="matchup in matchups"
      v-bind:key="matchup.eid"
      @click="focus(matchup, 'spread-' + matchup.id)"
    >
      {{matchup.v}}
      <font>@</font>
      {{matchup.h}}
      [{{matchup.spread}}]
    </div>
  </div>
</template>


<script>
import moment from "moment";
import GuruService from "@/services/GuruService.js";
import hbToggle from "@/components/hbToggle.vue";

export default {
  components: {
    hbToggle
  },
  data: function() {
    return {
      currentWeek: 0,
      currentSeason: new Date().getFullYear(),
      focused: {},
      target: "",
      matchups: []
    };
  },
  methods: {
    gametime: function(game) {
      let gametime =
        game.eid.substring(0, game.eid.length - 2) +
        " " +
        game.t.padStart(5, "0") +
        " PM";
      return moment(gametime, "YYYYMMDD hh:mm a")
        .format("MMM DD, YYYY")
        .toUpperCase();
    },
    focus(matchup, target) {
      if (target != null && target.trim().length > 0) {
        this.focused = matchup;
        this.$refs[target][0].focus();
      }

      if (matchup != null) {
        this.focused = matchup;
      } else {
        this.focused = null;
      }
    },
    isFocused: function(matchup) {
      return this.focused != null && this.focused.eid === matchup.eid;
    },
    update: async function(matchup) {
      console.log("=====MATCHUP - update:" + JSON.stringify(matchup));
      await GuruService.updatepredictions(matchup);
    }
  },
  mounted() {
    let currentWeek = this.$store.getters.currentWeek;
    this.currentWeek = currentWeek;
    this.matchups = this.$store.getters.matchups(currentWeek);

    this.$store.subscribe(mutation => {
      switch (mutation.type) {
        case "SET_MATCHUPS":
          this.matchups = this.$store.state.matchups;
          break;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
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
  font-family: "Roboto", serif;
}
.predictions .title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #5e83c4;
  font-weight: 500;
  font-size: 2em;
  font-family: "Roboto", serif;
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