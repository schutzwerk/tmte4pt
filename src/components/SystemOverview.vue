<template>
  <b-container id="systemOverview">
    <br/>
    <b-button @click="openImage" variant="primary">Click to open the image in new Tab</b-button>
    <br/>
    <br/>
    <vue-magnifier :src="state.reportImage" :srcLarge="state.reportImage" alt="Image from Report"></vue-magnifier>
  </b-container>
</template>

<script>
import VueMagnifier from './VueMagnifier';

export default {
  name: 'MwSystemOverview',
  components: {VueMagnifier},
  data() {
    return {
      state: window.State
    };
  },
  methods: {
    openImage() {
      let w = window.open('about:blank');
      let img = w.document.createElement('img');
      img.setAttribute('class', 'shrinkToFit transparent');
      img.setAttribute('src', this.state.reportImage);

      setTimeout(() => { // FireFox seems to require a setTimeout for this to work.
        w.document.body.appendChild(img)
      }, 0);
    }
  }
};
</script>

<style>

</style>
