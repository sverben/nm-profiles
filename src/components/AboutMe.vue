<script>
import text_parser from "@/tools/text_parser";
import Editor from "@/components/Editor.vue";

export default {
  data() {
    return {
      text: this.content,
      editing: false
    }
  },
  props: [
      'api',
      'content',
      'profile'
  ],
  methods: {
    text_parser,
    setText(text) {
      this.text = text
    },
    setAboutMe() {
      this.editing = false
      this.api.to('about', {
        method: 'post',
        body: {
          content: this.text
        }
      })
    }
  },
  components: {
    Editor
  }
}
</script>

<template>
  <div class="content_view">
    <div class="category">About Me</div>
    <form v-if="editing" @submit.prevent="setAboutMe">
      <Editor v-model="text" @change="setText" :content="text" />
      <input class="btn" type="submit" value="Set">
    </form>
    <div v-else class="about_me">
      <div class="text" v-html="text_parser(text)"></div>
      <button v-if="api.name === profile['gamer']['name']" class="edit btn" @click="editing = true">Edit</button>
    </div>
  </div>
</template>

<style scoped>
.text {
  display: inline-block;
}
.about_me {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  gap: 5px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
