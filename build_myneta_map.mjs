import fs from 'fs';
import * as cheerio from 'cheerio';

// Build a map of constituency name -> myneta ID from the index page
async function buildMyNetaMap() {
  const response = await fetch('https://myneta.info/TamilNadu2026/', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const html = await response.text();
  const $ = cheerio.load(html);

  const map = {}; // UPPER NAME -> { id, name }
  $('a[href*="show_candidates&constituency_id="]').each((_, el) => {
    const href = $(el).attr('href');
    const name = $(el).text().trim();
    const match = href.match(/constituency_id=(\d+)/);
    if (match && name && name !== 'ALL CONSTITUENCIES') {
      map[name.toUpperCase()] = { id: match[1], name };
    }
  });

  fs.writeFileSync('myneta_map.json', JSON.stringify(map, null, 2));
  console.log(`Built map with ${Object.keys(map).length} constituencies`);
}

buildMyNetaMap();
