<template>
    <div class="story-player">
        <div class="player-panel" v-if="story">
            <img class="cover" :src="cover">
            <div class="slider">
                <div class="title">正在播放{{story.title}}</div>
                <vue-slider v-model="percent" bar-height="5px"></vue-slider>
                <div class="dura">{{formatDura(timestamp)}}/{{formatDura(story)}}</div>
            </div>
            <div class="control">
                <i class="icon-pause" v-if="playing"></i>
                <i class="icon-play" v-if="!playing"></i>
            </div>
        </div>
        <div class='media-player'>
            <audio id='media-video' controls="false" :src="storyUrl">
            </audio>
        </div>
    </div>
</template>

<script>
import Slider from 'vant/lib/slider'
import 'vant/lib/vant-css/badge.css'
import 'vant/lib/vant-css/slider.css'
import storyMixins from './story-mixins'
export default {
  name: 'story-player',
  components: {
    'vue-slider': Slider
  },
  mixins: [
    storyMixins
  ],
  props: {
    story: {
      type: Object
    }
  },
  data () {
    return {
      playing: false,
	    timestamp: 0,
      percent: 0
    }
  },
  computed: {
    imageHost () {
      return this.ctx.bootOpts.servers.default.baseURL
    },
    storyUrl () {
      if (this.story) {
        return this.ctx.bootOpts.servers.file.baseURL + '/story/mp3/' + this.story._id
      } else {
        return null
      }
    },

    cover () {
      return this.getStoryCover(this.story.cover)
    }
  },

  watch: {
    url () {

    }
  },
  mounted () {
    this.audio = document.querySelector('#media-video')
    if (this.audio) {
      this.audio.addEventListener('timeupdate', this.timeUpdate)
      this.audio.addEventListener('canplay', this.canplay.bind(this))
    }
  },

  methods: {
    getStoryUrl (storyId) {

    },
    getStoryCover (cover) {
      return `${this.imageHost}/story/cover/480/480/${cover}.png`
    },
    timeUpdate: function (event) {
      this.timestamp = Math.floor(event.target.currentTime)
      this.percent = Math.floor(100 * this.timestamp / parseInt(this.story.duration))


    },

    canplay: function () {
      setTimeout(() => {
        this.audio.play()
      }, 1000)
    }
  }
}
</script>

<style lang="less">
.media-player {
  display: none;
}
.player-panel {
    display: flex;
    background: rgba(0,0,0, .6);
    z-index: 101;
    position: absolute;
    height: 10vh;
    bottom: 0;
    left: 0;
    width: 100%;
    img.cover {
        width: 10vh;
        height: 10vh;
    }
    .slider {
        margin: 0 5vw;
        width: 55vw;
        .title, .dura {
            line-height: 5vh;
            height: 5vh;
            overflow: hidden;
            color: #c0c0c0;
            font-size: 3vw;
        }
    }
    .control {
        flex: 1;
        text-align: center;
        color: #fff;
        line-height: 10vh;
        font-size: 3vh;
    }
}
</style>
