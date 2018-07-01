<template>
    <div class="root">
        <i class="icon-search"></i>
        <swipped-stories @choose-story="chooseStory"></swipped-stories>
        <story-player :story="story"></story-player>
    </div>
</template>

<script>
import SwippedStories from './swipped-stories'
import StoryPlayer from './story-player'
import GenDAO from '../dao/gen-dao'
export default {
  name: 'generation',
  components: {
    SwippedStories,
    StoryPlayer
  },
  data () {
    return {
      story: null
    }
  },
  created () {
    this.ctx.gendao = new GenDAO(this.ctx)
  },
  methods: {
    chooseStory (story) {
      this.story = story
    }
  }
}
</script>

<style lang="less">
.root {
    position: relative;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    .icon-search {
        color: #fff;
        position: absolute;
        right: 20px;
        top: 10px;
        z-index: 101;
        font-size: 28px;
    }
}
</style>
