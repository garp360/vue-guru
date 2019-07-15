<template>
  <label class="switch">
    <input type="checkbox" />
    <span class="slider round"></span>
  </label>
</template>

<script>
export default {
  value: false
};
</script>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(212, 22, 22, 0.274);
  border: 1px solid rgba(129, 13, 13, 0.699);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 25px;
  width: 25px;
  left: 4px;
  bottom: 3px;

  background-color: rgba(223, 0, 0, 0.438);
  border: 1px solid rgba(112, 12, 12, 0.623);

  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: rgba(28, 212, 22, 0.185);
  border: 1px solid rgba(8, 143, 8, 0.699);
}

input:checked + .slider:before {
  background-color: rgba(26, 223, 0, 0.288);
  border: 1px solid rgba(12, 112, 25, 0.623);
}

input:focus + .slider {
  box-shadow: 0 0 1px #2c2c2c;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);

  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
