<!--From https://github.com/zeknoss/vue-magnifier-->
<!--Original Author: Burak Mehmet Gurbuz alias zeknoss-->

<template>
  <div>
    <div class="vue-magnifier-container">
      <slot></slot>
      <!--<span ref="magnificationElement" class="preview" v-bind:style="{backgroundImage:'url(' + src + ')'}"></span>-->
      <img ref="magnificationElement" class="preview" :src="src"/>
      <span ref="glass" class="magnifying-glass" v-bind:style="{backgroundImage: 'url(' + srcLarge + ')', backgroundPosition: backgroundPos, left: cursorX + 'px', top: cursorY + 'px'}"></span>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MwVueMagnifier',
  props: {
    src: String,
    srcLarge: String
  },
  methods: {
    getCursorPos: function (e) {
      const x = window.Event
        ? e.pageX
        : e.clientX +
          (document.documentElement.scrollLeft
            ? document.documentElement.scrollLeft
            : document.body.scrollLeft);
      const y = window.Event
        ? e.pageY
        : e.clientY +
          (document.documentElement.scrollTop
            ? document.documentElement.scrollTop
            : document.body.scrollTop);
      this.cursorX = x - this.thumbPos.x;
      this.cursorY = y - this.thumbPos.y;
    },
    getBounds: function () {
      let el = this.$refs.magnificationElement;
      this.bounds = el.getBoundingClientRect();
      let xPos = 0;
      let yPos = 0;
      while (el) {
        const transform = this.getTransform(el);
        if (el.tagName === 'BODY') {
          // deal with browser quirks with body/window/document and page scroll
          const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
          const yScroll = el.scrollTop || document.documentElement.scrollTop;
          xPos +=
                el.offsetLeft - xScroll + el.clientLeft + parseInt(transform[0]);
          yPos +=
                el.offsetTop - yScroll + el.clientTop + parseInt(transform[1]);
        } else {
          // for all other non-BODY elements
          xPos +=
                el.offsetLeft -
                el.scrollLeft +
                el.clientLeft +
                parseInt(transform[0]);
          yPos +=
                el.offsetTop - el.scrollTop + el.clientTop + parseInt(transform[1]);
        }
        el = el.offsetParent;
      }
      this.thumbPos = {
        x: xPos,
        y: yPos
      };
    },
    moveMagnifier: function (e) {
      e.preventDefault();
      this.getBounds();
      this.getCursorPos(e);
      this.backgroundPos =
            (this.cursorX * 100) / this.bounds.width +
            '% ' +
            (this.cursorY * 100) / this.bounds.height +
            '%';
    },
    getTransform: function (el) {
      const transform = window
        .getComputedStyle(el, null)
        .getPropertyValue('-webkit-transform');

      function rotateDegree(matrix) {
        let angle;
        if (matrix !== 'none') {
          const values = matrix
            .split('(')[1]
            .split(')')[0]
            .split(',');
          const a = values[0];
          const b = values[1];
          angle = Math.round(Math.atan2(Number(b), Number(a)) * (180 / Math.PI));
        } else {
          angle = 0;
        }
        return angle < 0 ? (angle + 360) : angle;
      }

      const results = transform.match(
        /matrix(?:(3d)\(-?\d+\.?\d*(?:, -?\d+\.?\d*)*(?:, (-?\d+\.?\d*))(?:, (-?\d+\.?\d*))(?:, (-?\d+\.?\d*)), -?\d+\.?\d*\)|\(-?\d+\.?\d*(?:, -?\d+\.?\d*)*(?:, (-?\d+\.?\d*))(?:, (-?\d+\.?\d*))\))/
      );
      let output = [0, 0, 0];
      if (results) {
        if (results[1] === '3d') {
          output = results.slice(2, 5);
        } else {
          results.push('0');
          output = results.slice(5, 9); // returns the [X,Y,Z,1] value;
        }
        output.push(rotateDegree(transform));
      }
      return output;
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.$refs.magnificationElement.addEventListener(
        'mousemove',
        this.moveMagnifier
      );
    });
  },
  data: function () {
    return {
      img: null,
      width: null,
      height: null,
      bounds: null,
      cursorX: 0,
      cursorY: 0,
      thumbPos: { x: 0, y: 0 },
      backgroundPos: '0 0'
    };
  }
};
</script>

<style>
  .vue-magnifier-container {
    position: relative;
  }
  .vue-magnifier-container .preview {
    /*position: relative;*/
    /*background-size: contain !important;*/
    /*background: no-repeat 50% 50%;*/
    /*display: block;*/
    /*clear: both;*/
    /*margin: 0 auto;*/
    cursor: none;
  }
  .vue-magnifier-container .preview + .magnifying-glass {
    position: absolute;
    border: 5px solid #666;
    border-radius: 50%;
    cursor: none;
    width: 300px;
    height: 300px;
    transform: translate(0px, -150px);
    background: #fff no-repeat;
    display: none;
    pointer-events: none;
  }
  .vue-magnifier-container .preview:hover + .magnifying-glass {
    display: block;
  }
  @media only screen and (max-width: 320px) {
    .vue-magnifier-container .preview {
      width: auto;
      height: 250px;
    }
  }
  @media only screen and (max-width: 480px) {
    .vue-magnifier-container .preview {
      width: auto;
      height: 350px;
    }
  }
  @media only screen and (min-width: 481px) {
    .vue-magnifier-container .preview {
      width: auto;
      height: 450px;
    }
  }
  @media only screen and (min-width: 1024px) {
    .vue-magnifier-container .preview {
      width: auto;
      height: 550px;
    }
  }
  @media only screen and (min-width: 1280px) {
    .vue-magnifier-container .preview {
      width: auto;
      height: 600px;
      /*width: 600px;*/
      /*height: 600px;*/
    }
  }

</style>
