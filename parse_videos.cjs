const fs = require('fs');
const html = fs.readFileSync('vollegym_dump.html', 'utf8');
const idRegex = /youtube\.com\/embed\/([^?"]+)/g;
let match;
while ((match = idRegex.exec(html)) !== null) {
  const index = match.index;
  // Get 300 characters before the youtube link to see the name and result.
  const snippet = html.substring(Math.max(0, index - 400), index);
  // strip HTML tags to make it readable
  const text = snippet.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ');
  console.log(`${match[1]} => ${text.trim()}`);
}
