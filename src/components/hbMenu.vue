<template>
  <div class="hb-menu">
    <template v-for="menuitem in menuitems">
      <input
        v-bind:key="menuitem.id"
        class="button button-hb-blue"
        @click="go(menuitem)"
        type="button"
        :value="menuitem.text"
      />
    </template>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      menuitems: [
        {
          id: 10,
          path: '/matchups',
          text: 'Matchups',
          images: {
            small: '',
            large: '',
          },
        },
        {
          id: 20,
          path: '/settings',
          text: 'Settings',
          images: {
            small: '',
            large: '',
          },
        },
        {
          id: 30,
          path: '/predictions',
          text: 'Predictions',
          images: {
            small: '',
            large: '',
          },
        },
      ],
    }
  },
  methods: {
    go: function(menuitem) {
      let path = '/dashboard' + menuitem.path
      this.$router.push({ path: path })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/custom.scss';

.hb-menu {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: stretch;
  padding: 10px 20px 10px 5px;
}
</style>
