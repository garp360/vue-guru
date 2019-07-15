<template>
  <div class="hb-header">
    <div class="hb-header-title">
      <slot name="title">
        <span class>{{title}}</span>
      </slot>
    </div>
    <div><slot name="bar"></slot></div>
    <div class="hb-header-deadline">
      <slot name="deadline"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  data: function() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:500');

.hb-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.hb-header-title {
    color:rgb(37, 85, 216);
    font-family: "Roboto Condensed", serif;
  padding: 5px 10px;
  order: 0;
}
.hb-header-title span {
  font-size: 30pt;
}
.hb-header-deadline {
  align-items: center;
  padding: 5px 10px;
  order: 1;
}
.hb-header-deadline > div {
  display: inline;
}
.hb-header-deadline > span {
  padding-top: 8px;
}
.hb-header-index-0 {
  order: 0;
}
</style>

