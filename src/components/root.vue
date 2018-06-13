<style lang="less">
  .main-app {
    overflow: hidden;
    width: 100%;
    height: 100%
  }
  .main-screen {
    transition: transform .3s linear;
    width: 100vw;
    height: 100vh;
    &.slipped-left {
      transform: translateX(-100%);
    }
  }
  .media-player {
    display: none;
  }
</style>

<template>
  <div class="main-app">
    <div class="main-screen">
      <router-view></router-view>
    </div>
    <transition name="slide">
      <player v-if="playerFront" :story="story" :playing="playing" :percent="percent" @hide="hidePlayer" @toggle="togglePlay"></player>
    </transition>

    <player-ball v-if="story!==null && playing && (!playerFront)" :playing="playing" :cover="coverImage" @clicked="ballClicked"></player-ball>

    <div class='media-player'>
      <audio id='media-video' controls="false" :src="audioUrl">
      </audio>
    </div>
  </div>
</template>

<script>
import {Player, PlayerBall} from '../packages/player/index'
import {commonMixins} from '../packages/common/index'
import playerMixin from './player'

export default {
  components: {
    Player,
    PlayerBall
  },

  mixins: [commonMixins, playerMixin],
  data: function () {
    return {
      playerFront: false,
      loading: true
    }
  },

  created: function () {

  },

  computed: {
    coverImage () {
      return this.getImageUrl(this.story.cover, 360)
    },
    audioUrl () {
      if (this.story && this.story.path) {
        return this.imageHost + '/' + this.story.path
      } else {
        return ''
      }
    }
  },

  methods: {

  }
}

</script>
