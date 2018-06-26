<template>
<div class="horizontal-swipper">
    <swiper class="swiper" :options="swiperOption" ref="swiper" @slideChange="slideChange($event)">
        <swiper-slide class="slide" v-for="(story, index) in stories" :key="index">
          <img class="cover" v-if="story.cover" :src="getStoryCover(story.cover)" :style="imageStyle">
          <div class="background" :style="{
            backgroundImage: getStoryCoverBg(story.cover)
          }"></div>
        </swiper-slide>
    </swiper>
</div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'swipped-stories',
  components: {
    swiper,
    swiperSlide
  },
  props: {
  },
  data () {
    return {
      swiperOption: {
        direction: 'vertical'
      },
      stories: [],
      currentIndex: 0
    }
  },
  computed: {
    imageHost () {
      return this.ctx.bootOpts.servers.default.baseURL
    },
    imageStyle () {
      return {
        width: window.clientWidth - 20,
        height: window.clientWidth - 20
      }
    }
  },
  async created () {
    this.fetchMore()
  },
  methods: {
    getStoryCover (cover) {
      return `${this.imageHost}/story/cover/480/480/${cover}.png`
    },
    getStoryCoverBg (cover) {
      return "url('" + this.getStoryCover(cover) + "')"
    },
    slideChange (index) {
      this.currentIndex = this.$refs.swiper.swiper.activeIndex
      if (this.currentIndex + 10 > this.stories.length) {
        this.fetchMore()
      }
    },
    async fetchMore () {
      let more = await this.ctx.gendao.someMoreStories()
      this.stories = [...this.stories, ...more]
    }
  }
}
</script>

<style lang="less">
.horizontal-swipper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    .swiper-container {
        height: 100vh;
    }
    .swiper-slide {
        position: relative;
        img.cover {
            position: absolute;
            width: 90vw;
            height: 90vw;
            left: 5vw;
            top: 16vh;
        }
        .background {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-size: cover;
            -webkit-animation: filter-animation 5s infinite;
            -webkit-filter: blur(8px);
        }
    }
}

@-webkit-keyframes filter-animation {
    0% {
        background-position: top;
    }

    50% {
        background-position: bottom;
    }

    100% {
        background-position: top;
    }
}
</style>
