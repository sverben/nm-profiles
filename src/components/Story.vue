<script>
import { createPopup } from "@picmo/popup-picker";
import { darkTheme } from "picmo";
import Pills from "@/components/Pills.vue";
import text_parser from "@/tools/text_parser";

export default {
  props: [
      'api',
      'profile',
      'story',
      'coolStuff'
  ],
  computed: {
    emojis() {
      const emojis = []
      if (this.api.token)
        emojis.push({
          icon: '/src/assets/react.svg',
          amount: '+',
          event: 'react'
        })
      emojis.push(...Object.keys(this.coolStuff['emotes']).map(e => ({
        emoji: e,
        amount: this.coolStuff['emotes'][e].length,
        selected: this.coolStuff['emotes'][e].includes(this.api.name),
        event: e
      })))

      return emojis
    }
  },
  methods: {
    async react(e, ev) {
      if (!this.api.token) return
      if (e === 'react') {
        const picker = createPopup({
          rootElement: this.$refs.picker,
          theme: darkTheme
        }, {
          referenceElement: ev.target,
          triggerElement: ev.target
        })
        await picker.open()

        picker.picker.addEventListener('emoji:select', async ({ emoji }) => {
          const coolStuff = await this.api.to('react', {
            method: 'post',
            body: {
              emoji,
              gamer: this.profile['gamer']['id']
            }
          })
          this.coolStuff['emotes'] = coolStuff['emotes']
        })

        return
      }
      const coolStuff = await this.api.to('react', {
        method: 'post',
        body: {
          emoji: e,
          gamer: this.profile['gamer']['id']
        }
      })
      this.coolStuff['emotes'] = coolStuff['emotes']
    },
    parseStory() {
      return text_parser(this.story['text'])
    }
  },
  components: {
    Pills
  }
}
</script>

<template>
  <div class="content_view">
    <div class="category">Story</div>
    <div v-if="story['has_story']" class="story">
      <div class="text" v-html="parseStory()"></div>
      <Pills class="emotes" :pills="emojis" :selectable="true" @react="react" />
    </div>
    <div v-else class="story noStory">
      This player doesn't seem to have a story right now...
    </div>
    <div class="picker" ref="picker"></div>
  </div>
</template>

<style scoped>
.emotes {
  --color: var(--secondary);
}
.story {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  gap: 5px;
}
.noStory {
  font-family: monospace;
}
.text {
  display: inline-block;
}
</style>
