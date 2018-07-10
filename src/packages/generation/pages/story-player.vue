<template>
    <div class="story-player">
        <transition name="van-slide-bottom">
        <div class="player-panel" v-if="story">
            <img class="cover" :src="cover">
            <div class="slider">
                <div class="title" v-if="loading">正在加载{{story.title}}</div>
                <div class="title" v-else>正在播放{{story.title}}</div>
                <vue-slider v-model="percent" bar-height="5px"></vue-slider>
                <div class="dura">{{formatDura(timestamp)}}/{{formatDura(story)}}</div>
            </div>
            <div class="control" @click="togglePlay">
                <van-loading v-if="loading"></van-loading>
                <van-icon name="pause" v-if="playing && !loading"></van-icon>
                <van-icon name="play" v-if="!playing && !loading"></van-icon>
            </div>
        </div>
        </transition>
        <div class='media-player'>
            <audio id='media-video' controls="false" :src="storyUrl">
            </audio>
        </div>
    </div>
</template>

<script>
import Slider from 'vant/lib/slider'
import Loading from 'vant/lib/loading'
import Icon from 'vant/lib/icon'
import 'vant/lib/vant-css/icon.css'

import 'vant/lib/vant-css/badge.css'
import 'vant/lib/vant-css/slider.css'
import 'vant/lib/vant-css/loading.css'
import storyMixins from './story-mixins'
export default {
  name: 'story-player',
  components: {
    'vue-slider': Slider,
    'van-loading': Loading,
	  'van-icon': Icon
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
      loading: true,
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
        this.loading = true
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

    togglePlay () {
      this.playing = !this.playing
      if (this.playing) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },
    timeUpdate: function (event) {
      this.timestamp = Math.floor(event.target.currentTime)
      this.percent = Math.floor(100 * this.timestamp / parseInt(this.story.duration))
    },
    canplay: function () {
      setTimeout(() => {
        this.loading = false
        this.playing = true
        this.audio.play()
      }, 20)
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
    height: 14vh;
    bottom: 0;
    left: 0;
    width: 100%;
    img.cover {
        width: 14vh;
        height: 14vh;
    }
    .slider {
        margin: 0 1vw 0 7vw;
        width: 50vw;
        .title, .dura {
            line-height: 7vh;
            height: 7vh;
            overflow: hidden;
            color: #c0c0c0;
            font-size: 4vw;
        }
    }
    .van-icon-play, .van-icon-pause {
        flex: 1;
        text-align: center;
        color: #fff;
        line-height: 14vh;
        font-size: 8.5vw;
    }
}

.van-loading {
    margin: 5vh 3vw;
}

.slide-fade-enter-active {
    transition: all .3s ease;
}
.slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
}

</style>
