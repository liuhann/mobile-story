<style lang="less" scoped>

</style>

<template>
    <div class="fs">
        <div class="header">
            <router-link to="/home" replace tag="i" class="icon-left-open" style="flex:1;">
            </router-link>
            <div class="title">{{label}}</div>
        </div>
        <story-list :filter="filter" @clicked="playStory"></story-list>
    </div>
</template>

<script>

import StoryList from './components/story-list.vue';
import commonMixins from '../js/common';

export default {
    components: {
        StoryList
    },
    mixins: [commonMixins],
    
    props: {

    },

    data: function() {
        return {
            label: '故事分类：' + this.$route.params.label,
            filter: {
                label: this.$route.params.label
            }
        }
    },

    created: function() {
        
    },


}
</script>
