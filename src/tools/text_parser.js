const escapeHtml = text => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }

    return text.replace(/[&<>"']/g, function(m) { return map[m] })
}
export default (text, keepChars = false) => {
    text = escapeHtml(text);

    // make text between * bold
    text = text.replace(/\*(.*?)\*/g, keepChars ? '*<b>$1</b>*' : '<b>$1</b>')
    // make text between _ italic
    text = text.replace(/\_(.*?)\_/g, keepChars ? '_<i>$1</i>_' : '<i>$1</i>')
    // make text between ~ strikethrough
    text = text.replace(/\~(.*?)\~/g, keepChars ? '~<s>$1</s>~' : '<s>$1</s>')
    // make text between ` code
    text = text.replace(/\`(.*?)\`/g, keepChars ? '`<code>$1</code>`' : '<code>$1</code>')

    // make @ mentions clickable
    text = text.replace(/@([a-zA-Z0-9_]+)/g, '<a href="/player/$1" class="tag">@$1</a>')

    return text
}
