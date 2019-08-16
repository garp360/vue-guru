<template>
  <div class="hb-dashboard">
    <div class="hb-layout-header">
      <slot name="header"></slot>
    </div>
    <div class="hb-layout-navigation">
      <slot name="nav"></slot>
    </div>
    <div class="hb-main">
      <router-view />
    </div>
    <div class="hb-layout-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
html,
body {
  overflow: hidden;
}

.hb-dashboard {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #2f343b;
}

@media (min-width: 1200px) {
  .hb-dashboard {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr auto;
  }

  .hb-dashboard > .hb-layout-header {
    grid-column: span 3;
  }

  .hb-dashboard > .hb-layout-footer {
    grid-column: span 2;
  }
}

@media (max-width: 1200px) and (min-width: 750px) {
  .hb-dashboard {
    display: grid;
    grid-template-columns: 70px 1fr;
    grid-template-rows: auto 1fr auto;
  }

  .hb-dashboard > .hb-layout-header {
    grid-column: span 3;
  }

  .hb-dashboard > .hb-layout-footer {
    grid-column: span 2;
  }
}

@media (max-width: 750px) {
  .hb-dashboard {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto;
  }

  .hb-dashboard > .hb-layout-header {
    grid-column: span 1;
  }

  .hb-dashboard > .hb-layout-footer {
    grid-column: span 1;
  }

  .hb-layout-navigation .hb-nav-menu {
    text-align: center;
  }

  .hb-layout-navigation .hb-nav-menu li {
    display: inline-block;
  }
}
.hb-dashboard > .hb-layout-header {
  text-align: center;
  font-size: 1.4em;
  background-color: rgb(30, 30, 32);
  overflow: hidden;
}

.hb-dashboard > .hb-main {
  flex: 1;
  padding: 20px;
  overflow: auto;
  background-color: #2f343b;
}

.hb-dashboard > .hb-layout-navigation {
  border-right: 1px solid #111;
  background-color: rgba(32, 32, 39, 0.664);
}

.hb-dashboard > .hb-layout-footer {
  text-align: center;
  font-size: 0.9em;
  border-top: 1px solid #333;
  background-color: #111;
  color: rgb(37, 85, 216);
  text-align: right;
  padding: 6px 10px;
}
</style>
