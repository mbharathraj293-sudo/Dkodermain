import { searchIndex } from '../data/searchIndex';

export function searchEcosystem(query) {
  if (!query || query.trim() === '') {
    return searchIndex.slice(0, 8); // Return top recommendations
  }

  const clean = query.trim().toLowerCase();
  const terms = clean.split(/\s+/);

  const results = searchIndex.map(item => {
    let score = 0;
    const title = item.title.toLowerCase();
    const desc = item.description.toLowerCase();
    const category = item.category.toLowerCase();
    const keywords = (item.keywords || []).map(k => k.toLowerCase());

    for (const term of terms) {
      if (title.includes(term)) score += 10;
      if (category.includes(term)) score += 8;
      if (keywords.some(k => k.includes(term))) score += 7;
      if (desc.includes(term)) score += 4;
    }

    return { item, score };
  })
  .filter(res => res.score > 0)
  .sort((a, b) => b.score - a.score)
  .map(res => res.item);

  return results;
}
