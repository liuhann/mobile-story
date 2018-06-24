<template>
<div class="horizontal-swipper">
    <swiper>
        <swiper-slide v-for="(story, index) in stories" :key="index">
            {{index}}
        </swiper-slide>
    </swiper>
</div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
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
      stories: [1, 2, 3, 4],
      currentIndex: 0
    }
  }
}
</script>

<style scoped>

</style>
