<template>
  <ul>
    <li v-for="menuitem in menuitems" v-bind:key="menuitem.id">
      <input @click="go(menuitem)" type="button" :value="menuitem.text" />
    </li>
  </ul>
</template>

<script>
export default {
  data: function() {
    return {
      menuitems: [
        {
          id: 10,
          path: "/matchups",
          text: "Matchups",
          images: {
              "small": "", 
              "large": ""
          }
        },
        {
          id: 20,
          path: "/settings",
          text: "Settings",
          images: {
              "small": "", 
              "large": ""
          }
        },
        {
          id: 30,
          path: "/predictions",
          text: "Predictions",
          images: {
              "small": "", 
              "large": ""
          }
        }
      ]
    };
  },
  methods: {
      go: function(menuitem) {
          let path = '/dashboard' + menuitem.path
          this.$router.push({ path: path })
      }
  }
};
</script>
