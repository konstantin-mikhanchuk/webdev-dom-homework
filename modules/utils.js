export function escapeHtml(text) {
    return text.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
