<template>
  <div class="loading">Loading&#8230;</div>
</template>

<script>
export default {

}
</script>

<style>
/* Absolute Center Spinner */
.loading {
  position: absolute;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.loading:before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.loading:not(:required) {
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: '';
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  animation: spinner 150ms infinite linear;
  border-radius: 0.5em;

  box-shadow: rgba(255,255,255, 1) 1.5em 0 0 0, rgba(255,255,255, 1) 1.1em 1.1em 0 0, rgba(255,255,255, 1) 0 1.5em 0 0, rgba(255,255,255, 1) -1.1em 1.1em 0 0, rgba(255,255,255, 1) -1.5em 0 0 0, rgba(255,255,255, 1) -1.1em -1.1em 0 0, rgba(255,255,255, 1) 0 -1.5em 0 0, rgba(255,255,255, 1) 1.1em -1.1em 0 0;
}

/* Animation */

@-webkit-keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-moz-keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-o-keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
