<template>
  <div class='load-box'>
    <div class='loader'>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .load-box {
    position: relative;
    height: 100vh;
    width: 100%;
    font-family: Helvetica;
  }

  .loader {
    height: 20px;
    width: 250px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .loader--dot {
    animation-name: loader;
    animation-timing-function: ease-in-out;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    height: 20px;
    width: 20px;
    border-radius: 100%;
    background-color: black;
    position: absolute;
    border: 2px solid white;
  }

  .loader--dot:first-child {
    background-color: #E02D71;
    animation-delay: 0.5s;
  }

  .loader--dot:nth-child(2) {
    background-color: #150C26;
    animation-delay: 0.4s;
  }

  .loader--dot:nth-child(3) {
    background-color: #E02D71;
    animation-delay: 0.3s;
  }

  .loader--dot:nth-child(4) {
    background-color: #150C26;
    animation-delay: 0.2s;
  }

  .loader--dot:nth-child(5) {
    background-color: #E02D71;
    animation-delay: 0.1s;
  }

  .loader--dot:nth-child(6) {
    background-color: #150C26;
    animation-delay: 0s;
  }

  @keyframes loader {
    15% {
      transform: translateX(0);
    }
    45% {
      transform: translateX(230px);
    }
    65% {
      transform: translateX(230px);
    }
    95% {
      transform: translateX(0);
    }
  }

  @keyframes loading-text {
    0% {
      content: "Loading";
    }
    25% {
      content: "Loading.";
    }
    50% {
      content: "Loading..";
    }
    75% {
      content: "Loading...";
    }
  }
</style>
