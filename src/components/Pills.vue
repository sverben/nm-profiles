<script>
export default {
  props: [
      'selectable',
      'pills'
  ]
}
</script>

<template>
  <div :class="{ selectable }" class="pills">
    <div v-for="pill in pills" :class="{ selected: pill.selected }" @click="e => $emit('react', pill.event, e)" class="pill">
      <img v-if="pill.icon" :src="pill.icon" alt="icon">
      <div v-else class="emote">{{ pill['emoji'] }}</div>
      <div class="amount">{{ pill.amount }}</div>
    </div>
  </div>
</template>

<style scoped>
.pills {
  display: flex;
  gap: 5px;
  overflow-x: auto;
}
.pills::-webkit-scrollbar{
  display: none;
}
.pill {
  box-sizing: border-box;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  line-height: 0;
  padding: 3px;
  font-size: 12px;
  min-height: 23px;
  min-width: 45px;
  background: var(--color);
  position: relative;
}
.pill img {
  height: 14px;
  width: 14px;
}
.emote {
  font-size: 14px;
  font-family: "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "EmojiOne Color", "Android Emoji";
}
.selectable .pill {
  border: 2px solid #ffffff20;
  cursor: pointer;
}
.selectable .pill.selected {
  background: var(--accent);
}
</style>
