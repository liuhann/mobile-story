<template>
    <div class="root">
        <i class="icon-search"></i>
        <swipped-stories></swipped-stories>
        <story-player></story-player>
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
  created () {
    this.ctx.gendao = new GenDAO(this.ctx)
  }
}
</script>

<style lang="less">
.root {
    position: relative;
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
