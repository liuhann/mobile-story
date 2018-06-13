<style lang="less">
  @header-height: 50px;
  .page-home {
    .home-title {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 10;
      display: flex;
      height: @header-height;
      padding: 8px;
      .logo {
        img {
          margin: .5vh;
          width: 30px;
          height: 30px;
        }
      }
      .search-form-input {
        width: 60%;
        margin-left: 20px;
        margin-right: 20px;
        border-bottom: 1px solid #fff;
        span {
          font-size: 14px;
          padding-left: 10px;
          color: #fff;
          display: inline-block;
          width: 60%;
          line-height: @header-height*2/3;
          /* padding: 5px; */

          //background-color: #eee;
        }
      }
      .history {
        font-size: 20px;
        color: #fff;
        text-align: right;
        position: absolute;
        top: 9px;
        right: 15px;
      }
    }
  }

  .scroll-container {
    position: absolute;
    overflow: hidden;
    top: 0px;
    bottom: 60px;
    left: 0;
    right: 0;
  }

  .quick-entry {
    .entry {
      float: left;
      width: 20vw;
      height: 25vw;
      padding: 4vw 3vw;
      .name {
        font-size: 3vw;
        text-align: center;
      }
    }
  }

  .titled-block {
    border-top: 1px solid #e4e4e4;
    background-color: #fff;
    margin-top: 20px;
    .title {
      font-size: 18px;
      padding: 1vw 3vw;
      border-left: 3px solid #ddd;
      color: #666;
    }

    .clearfix {
      padding: 2vw 2vw;
      .home-story-item {
        float: left;
        width: 32vw;
        height: 35vw;
        img {
          margin: 2vw 2vw 0vw 2vw;
          width: 28vw;
        }
        span.story-name {
          display: block;
          text-align: center;
        }
      }
    }
  }
</style>

<template>
  <div class="page-home">
    <div class="home-title">
      <div class="logo">
      </div>
      <div class="search-form-input">
        <span @click="searchStory">搜索故事</span>
      </div>
      <div class="history">
        <router-link to="/history">
          <i class="icon-history" style="color: #fff"></i>
        </router-link>
      </div>
    </div>

    <div class="scroll-container" ref="scroll">
      <div class="scroll-content">
        <div class="slide-container">
          <swipe :autoplay="3000">
            <swipe-item>1</swipe-item>
            <swipe-item>2</swipe-item>
            <swipe-item>3</swipe-item>
            <swipe-item>4</swipe-item>
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
              <img :src="getImageUrl(story.cover, 90)">
              <span class="story-name">{{story.title}}</span>
            </div>
          </div>
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

export default {
  components: {
    Swipe,
    SwipeItem
  },

  data: function () {
    return {
      recommendLabels: [],
      slides: [],
      homeList: []
    }
  },

  created: async function () {
    await this.loadHomeData()
  },
  updated: async function () {

  },

  methods: {
    async loadHomeData () {
      debugger
      const homeData = await this.ctx.appDao.listHome()
      this.recommendLabels = homeData.recommendLabels
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
