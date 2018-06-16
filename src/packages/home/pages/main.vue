<style lang="less">
  @header-height: 50px;
  .page-home {
    background: #00C1F3;

    .slide-container {
      padding: 16px;
      .van-swipe {
        border: 3px solid #f8f8f6;
        box-shadow: 0 8px 6px -6px black;
        border-radius: 20px;
        box-sizing: content-box;
        height: 179px;
      }
    }
  }
  .quick-entry {
    display: flex;
    margin-bottom: 10px;
    .entry {
      flex: 1;
      box-sizing: border-box;
      color: #fff;
      span {
        text-align: center;
        width: 100%;
        display: block;
        svg {
          width: 70%;
        }
      }
      .name {
        font-size: 18px;
        text-align: center;
      }
    }
  }

  .titled-block {
    .title {
      font-size: 20px;
      color: #fff;
      font-weight: bold;
      text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
      padding: 10px 20px;
    }

    .clearfix {
      padding: 2vw 2vw;
      display: flex;
      flex-wrap: wrap;
      .home-story-item {
        float: left;
        width: 32vw;
        height: 35vw;
        img {
          margin: 2vw 2vw 0vw 2vw;
          width: 28vw;
          border: 3px solid #fff;
          border-radius: 20px;
          box-shadow: 0 8px 6px -6px black;
        }
        span.story-name {
          display: none;
          text-align: center;
        }
      }
    }
  }
</style>

<template>
  <div class="page-home">
    <div class="slide-container">
      <swipe :autoplay="3000">
        <swipe-item v-for="album in homeAlbums">
          <img :src="getStoryCover(album.cover, 480, 180)">
        </swipe-item>
      </swipe>
    </div>

    <div class="quick-entry clearfix">
      <div class="entry" v-for="recommendLabel of recommendLabels" @tap="routeToUrl(recommendLabel.path)">
        <span v-html="recommendLabel.svg"></span>
        <div class="name">{{recommendLabel.label}}</div>
      </div>
    </div>

    <div class="picture-picked titled-block" v-for="list in homeList" :key="list.label">
      <div class="title">
        {{list.label}}
      </div>
      <div class="clearfix">
        <div v-for="story in list.list" :key="story.img" class="home-story-item" @tap="playStory(story)">
          <img :src="getStoryCover(story.cover, 120, 120)">
          <span class="story-name">{{story.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swipe from 'vant/lib/swipe'
import SwipeItem from 'vant/lib/swipe-item'
import 'vant/lib/vant-css/swipe.css'
import 'vant/lib/vant-css/cell-swipe.css'

import {commonMixins} from '../../common/index'

export default {
  components: {
    Swipe,
    SwipeItem
  },
  mixins: [commonMixins],

  data: function () {
    return {
      recommendLabels: [],
      slides: [],
      homeList: [],
      homeAlbums: []
    }
  },

  created: async function () {
    await this.loadHomeData()
  },
  updated: async function () {

  },

  methods: {
    async loadHomeData () {
      const homeData = await this.ctx.appDao.listHome()
      this.recommendLabels = homeData.recommendLabels
      this.homeAlbums = homeData.homesAlbum
      this.homeList = homeData.list

      /* const slides = [];
      for (let album of homeData.homesAlbum) {
        slides.push({
          img: this.getImageUrl(album.cover, window.innerWidth),
          name: album.name,
        });
      } */
    },

    routeToUrl: function (path) {
      this.$router.push({
        path
      })
    },

    openAlbum: function (data) {
      this.$router.push('/album/' + data.name)
    },
    searchStory: function () {
      this.$router.push('/search')
    }
  }
}
</script>
