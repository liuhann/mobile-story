<template>
<div class="horizontal-swipper">
    <swiper class="swiper" :options="swiperOption" ref="swiper" @slideChange="slideChange($event)">
        <swiper-slide class="slide" v-for="(story, index) in stories" :key="index">
          <img @click="chooseStory(story)" class="cover" v-if="story.cover" :src="getStoryCover(story.cover)" :style="imageStyle">
          <div class="story-intro">
              <div class="title">
                  {{story.title}}
              </div>
              <div class="short">
                  {{story.short}}
              </div>
          </div>
          <div class="bg-mask"></div>
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
    },
    chooseStory (story) {
    	this.$emit('choose-story', story)
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
            top: 75px;
            z-index: 11;
        }
        .background {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
            background-size: cover;
            -webkit-filter: blur(5px);
        }
        .bg-mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: .5;
            z-index: 4;
            background-color: #000;
        }
        .story-intro {
            position: absolute;
            z-index: 11;
            font-size: 26px;
            padding: 10px;
            color: #fff;
            bottom: 15vh;
            height: 20vh;
            overflow: hidden;
            .short {
                font-size: 20px;
            }
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
