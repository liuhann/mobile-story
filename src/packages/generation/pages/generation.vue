<template>
    <div class="root">
        <swipped-stories></swipped-stories>
        <story-player></story-player>
    </div>
</template>

<script>
import SwippedStories from './swipped-stories'
import StoryPlayer from './story-player'
export default {
  name: 'generation',
  components: {
    SwippedStories,
    StoryPlayer
  }
}
</script>

<style lang="less">
.root {
    position: relative;
}
</style>
