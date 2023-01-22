<script>
import text_parser from "@/tools/text_parser"

function getCursorPosition(parent, node, offset, stat) {
  if (stat.done) return stat;

  let currentNode = null;
  if (parent.childNodes.length === 0) {
    stat.pos += parent.textContent.length;
  } else {
    for (let i = 0; i < parent.childNodes.length && !stat.done; i++) {
      currentNode = parent.childNodes[i];
      if (currentNode === node) {
        stat.pos += offset;
        stat.done = true;
        return stat;
      } else getCursorPosition(currentNode, node, offset, stat);
    }
  }
  return stat;
}

//find the child node and relative position and set it on range
function setCursorPosition(parent, range, stat) {
  if (stat.done) return range;

  if (parent.childNodes.length === 0) {
    if (parent.textContent.length >= stat.pos) {
      range.setStart(parent, stat.pos);
      stat.done = true;
    } else {
      stat.pos = stat.pos - parent.textContent.length;
    }
  } else {
    for (let i = 0; i < parent.childNodes.length && !stat.done; i++) {
      const currentNode = parent.childNodes[i];
      setCursorPosition(currentNode, range, stat);
    }
  }
  return range;
}

export default {
  methods: {
    parse() {
      const { editor } = this.$refs

      const sel = window.getSelection()
      const node = sel.focusNode
      const offset = sel.focusOffset
      const pos = getCursorPosition(editor, node, offset, { pos: 0, done: false })

      editor.innerHTML = text_parser(editor.innerText, true)

      sel.removeAllRanges()
      const range = setCursorPosition(editor, document.createRange(), {
        pos: pos.pos,
        done: false
      })
      range.collapse()
      sel.addRange(range)

      this.$emit('change', editor.innerText)
    }
  },
  props: [
      'content'
  ]
}
</script>

<template>
  <div class="editor" contenteditable="true" @input="parse" ref="editor"></div>
</template>

<style scoped>
.editor {
  border: 2px solid #ffffff20;
  outline: 0;
  padding: 5px;
  border-radius: 5px;
  background: var(--secondary);
}
</style>
