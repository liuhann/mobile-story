<template>
    <div class="root">
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
}
</style>
