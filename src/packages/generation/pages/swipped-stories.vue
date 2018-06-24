<template>
<div class="horizontal-swipper">
    <swiper class="swiper" :options="swiperOption" ref="swiper">
        <swiper-slide class="slide" v-for="(story, index) in stories" :key="index">
          {{index}}
          {{story.cover}}
          <img v-if="story.cover" :src="getStoryCover(story.cover)">
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
    }
  },
  async created () {
    this.stories = await this.ctx.gendao.someMoreStories()
    debugger
  },
  methods: {
    getStoryCover (cover) {
      return `${this.imageHost}/story/cover/${window.outerWidth-40}/${window.outerWidth-40}/${cover}.png`
    },
  }
}
</script>

<style lang="less" scoped>
.horizontal-swipper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    .swiper-container {
        height: 100vh;
    }
}
</style>
