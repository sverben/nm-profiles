<script>
import Pills from "@/components/Pills.vue";
import Story from "@/components/Story.vue";
import AboutMe from "@/components/AboutMe.vue";
import Stats from "@/components/Stats.vue";

export default {
  data() {
    return {
      statsOpen: false
    }
  },
  props: [
      'api',
      'profile'
  ],
  computed: {
    banner() {
      if (this.profile['gamer']['has_banner'])
        return `https://nm-games.eu/profile/banners/banner_${this.profile['gamer']['id']}.png`
      else
        return 'https://nm-games.eu/profile/banners/default.png'
    },
    medals() {
      return [
        {
          icon: 'https://nm-games.eu/media/medal_bronze.png',
          amount: this.profile['gamer']['medals']['bronze']
        },
        {
          icon: 'https://nm-games.eu/media/medal_silver.png',
          amount: this.profile['gamer']['medals']['silver']
        },
        {
          icon: 'https://nm-games.eu/media/medal_gold.png',
          amount: this.profile['gamer']['medals']['gold']
        }
      ]
    }
  },
  components: {
    Pills,
    Story,
    AboutMe,
    Stats
  },
  mounted() {
    document.body.addEventListener('click', e => {
      if (e.target !== this.$refs.openStats)
        this.statsOpen = false
    })
  }
}
</script>

<template>
  <div class="profile">
    <div class="banner">
      <img :src="banner" alt="banner">
      <div class="name">{{ profile['gamer']['name'] }}</div>
      <Pills class="medals" :pills="medals"></Pills>
    </div>
    <AboutMe v-if="profile['about_me']?.content || api.name === profile['gamer']['name']" :api="api" :profile="profile" :content="profile['about_me']['content']" />
    <Story :story="profile['gamer']['story']" :cool-stuff="profile['story']" :api="api" :profile="profile" />
    <div class="content_view">
      <button class="btn" @click="statsOpen = !statsOpen" ref="openStats">View statistics</button>
    </div>
  </div>

  <Stats :profile="profile['gamer']" :open="statsOpen"></Stats>
</template>

<style scoped>
.profile {
  background: var(--primary);
  border-radius: 10px;
  width: 400px;
}
.banner {
  position: relative;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 150px;
}
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.name {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  font-size: 1.5em;
}
.medals {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  --color: var(--secondary);
}
</style>
