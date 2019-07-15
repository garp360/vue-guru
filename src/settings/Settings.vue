<template>
  <div class="page">
    This is the Settings page
    <div
      style="width:200px;background-color:#FECD57;border:1px solid #FBC43C;border-radius:4px;padding:10px; margin:10px 5px;height:auto;"
    >
      <div style="padding-right:10px;padding-left:10px">
        <a href="#" style="text-decoration:none" target="_blank">
          <span
            style="font-size:12px;font-family:Arial;font-weight:bold;color:#333333;white-space:nowrap;display:block; text-align:center"
          >Amazon Yellow and Black</span>
        </a>
      </div>
    </div>

    <a class="button button-blue">
      <i class="fa fa-globe"></i>
      <strong>Add</strong> Employee
    </a>
    <a class="button button-gray">
      <i class="fa fa-globe"></i>
      <strong>Reset</strong>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.page {
  background-color: #fff;

  height: 100%;
  width: 100%;
}

@function hsb($h-hsb, $s-hsb, $b-hsb, $a: 1) {
  @if $b-hsb == 0 {
    @return hsla(0, 0, 0, $a);
  } @else {
    $l-hsl: ($b-hsb/2) * (2 - ($s-hsb/100));
    $s-hsl: ($b-hsb * $s-hsb) / if($l-hsl < 50, $l-hsl * 2, 200 - $l-hsl * 2);
    @return hsla($h-hsb, $s-hsl, $l-hsl, $a);
  }
}

@function hsb-saturate($s, $a) {
  @if $s == 0 {
    @return 0;
  } @else {
    @return $s + $a;
  }
}

@mixin buttonize($h, $s, $b, $light: 0) {
  $color: hsb($h, $s, $b);
  $color-dark: hsb($h, hsb-saturate($s, 10), $b);
  $inset-top: inset 0 1px 0 hsb($h, $s - 20, $b + 10);
  $inset-bottom: inset 0 -1px 0 hsb($h, hsb-saturate($s, 10), $b - 10);
  $inset: inset 0 0 0 1px hsb($h, hsb-saturate($s, -10), $b);

  background-color: $color;
  background-image: linear-gradient(to bottom, $color, $color-dark);
  border: 1px solid hsb($h, hsb-saturate($s, 20), $b - 20);
  box-shadow: $inset-top, $inset-bottom, $inset, 0 2px 4px rgba(black, 0.2);

  @if $light == 1 {
    color: hsb($h, hsb-saturate($s, 40), $b - 40);
    text-shadow: 0 1px 0 rgba(white, 0.5);
  } @else {
    color: white;
    text-shadow: 0 1px 2px rgba(black, 0.3);
  }

  &:hover,
  &:focus {
    background: $color-dark;
    border-color: hsb($h, hsb-saturate($s, 40), $b - 40);
    box-shadow: $inset-top, $inset-bottom, $inset;
  }

  &:active {
    background: $color-dark;
    box-shadow: inset 0 2px 3px rgba(black, 0.2);
  }

  .fa {
    color: hsb($h, hsb-saturate($s, 20), $b - 20);
    text-shadow: 0 1px 0 rgba(white, 0.3);
  }
}

strong {
  font-weight: bold;
}

.button {
  @include buttonize(0, 0, 95, 1);
  border-radius: 3px;
  cursor: pointer;
  display: inline-block;
  font-family: Verdana, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  padding: 9px 16px 9px;
  margin: 16px 0 0 16px;
  transition: all 20ms ease-out;
  vertical-align: top;
}
.button-blue {
  @include buttonize(199, 71, 89);
}
.button-green {
  @include buttonize(97, 42, 80);
}
.button-purple {
  @include buttonize(249, 34, 73);
}
.button-orange {
  @include buttonize(26, 77, 96);
}
.button-red {
  @include buttonize(4, 58, 93);
}
.button-yellow {
  @include buttonize(49, 54, 99, 1);
}
.button-dark-blue {
  @include buttonize(244, 22, 40, 0);
}
.button-gray {
  @include buttonize(234, 0, 55, 0);
}
.button .fa {
  float: left;
  font-size: 14px;
  line-height: 20px;
  margin: -1px 8px 0 -4px;
  vertical-align: top;
}
</style>