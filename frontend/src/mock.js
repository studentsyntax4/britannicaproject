// Mock data / static config for Tarri and Treacle webstore
// Products & orders come from the backend. CATEGORIES, ADDONS, VALUES, BRAND are static config.

export const BRAND = {
  name: 'Tarri and Treacle',
  tagline: 'DESI FLAVOURS, SWEET MOMENTS',
  subtag: 'Fresh Poha, Zesty Tarri, Sweet Memories!',
  est: 'Nagpur • Authentic Flavours • Est. 2018',
  phone: '+91 98765 43210',
  location: 'Sitabuldi, Nagpur',
  hours: 'Open Daily 8 AM – 10 PM',
  instagram: '@tarriandtreacle',
};

export const CATEGORIES = [
  { id: 'tarri-poha', name: 'Tarri Poha', blurb: 'Fresh poha, zesty spicy tarri.' },
  { id: 'snacks', name: 'Nagpur Snacks', blurb: 'Crispy, crunchy Nagpur classics.' },
  { id: 'barfi', name: 'Santra Barfi', blurb: 'Melt-in-mouth orange sweets.' },
];

const IMG = {
  poha1: 'https://images.pexels.com/photos/30769669/pexels-photo-30769669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  poha2: 'https://images.pexels.com/photos/13041628/pexels-photo-13041628.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  poha3: 'https://images.pexels.com/photos/13063292/pexels-photo-13063292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  poha4: 'https://images.pexels.com/photos/36971466/pexels-photo-36971466.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  poha5: 'https://images.pexels.com/photos/38860522/pexels-photo-38860522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  barfi: 'https://images.unsplash.com/photo-1758910536889-43ce7b3199fd?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  barfiClassic: 'https://images.unsplash.com/photo-1543773495-2cd9248a5bda?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  barfiPista: 'https://images.pexels.com/photos/7182054/pexels-photo-7182054.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  barfiCoconut: 'https://images.pexels.com/photos/18488320/pexels-photo-18488320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  barfiDryfruit: 'https://images.pexels.com/photos/18488299/pexels-photo-18488299.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  samosa1: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  samosa2: 'https://images.pexels.com/photos/36170557/pexels-photo-36170557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  chaat: 'https://images.unsplash.com/photo-1591031107640-45556bbac5f1?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  puff1: 'https://images.unsplash.com/photo-1682263167429-0dbcf2c1e127?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  puff2: 'https://images.unsplash.com/photo-1742362010549-7e2df94614be?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  alootikki: 'https://images.unsplash.com/photo-1708782340351-25feb5640076?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
};

let _id = 0;
const p = (o) => ({ id: `p${++_id}`, rating: 4.7, reviews: 40 + ((_id * 7) % 120), ...o });

export const PRODUCTS = [
  // Tarri Poha Specials
  p({ category: 'tarri-poha', name: 'Classic Tarri Poha', price: 90, img: IMG.poha2, tag: 'Bestseller', desc: 'Traditional poha topped with spicy tarri, sev & coriander.' }),
  p({ category: 'tarri-poha', name: 'Spicy Jhal Tarri Poha', price: 100, img: IMG.poha3, tag: 'Spicy', desc: 'Extra spicy poha with lemon, onions & green chillies.' }),
  p({ category: 'tarri-poha', name: 'Cheese Tarri Poha', price: 120, img: IMG.poha5, desc: 'Melty cheese over our classic tarri poha.' }),
  p({ category: 'tarri-poha', name: 'Kanda Tarri Poha with Sev', price: 95, img: IMG.poha1, desc: 'Loaded with caramelized onions & crunchy sev.' }),

  // Nagpur Snacks
  p({ category: 'snacks', name: 'Saoji Patty Puff', price: 60, img: IMG.puff1, desc: 'Spicy Nagpur-style patty in flaky puff pastry.' }),
  p({ category: 'snacks', name: 'Nagpur Sev Puri', price: 70, img: IMG.chaat, tag: 'Bestseller', desc: 'Crunchy, tangy, topped with sev & chutneys.' }),
  p({ category: 'snacks', name: 'Aloo Patties', price: 65, img: IMG.alootikki, desc: 'Golden fried potato patties with house chutney.' }),
  p({ category: 'snacks', name: 'Mirchi Bhaji', price: 80, img: IMG.puff2, desc: 'Crispy green chillies, besan-battered & fried.' }),
  p({ category: 'snacks', name: 'Sev Usal', price: 90, img: IMG.poha4, tag: 'New', desc: 'Spicy gravy topped with crunchy sev & coriander.' }),
  p({ category: 'snacks', name: 'Samosa Chaat', price: 100, img: IMG.samosa1, desc: 'Crushed samosa with tarri drizzle, yogurt & sev.' }),

  // Santra Specials (Orange Barfi)
  p({ category: 'barfi', name: 'Classic Santra Burfi', price: 50, img: IMG.barfiClassic, tag: 'Bestseller', desc: 'Traditional orange burfi, melt-in-mouth sweet. Per piece.' }),
  p({ category: 'barfi', name: 'Santra Pistachio Burfi', price: 60, img: IMG.barfiPista, desc: 'Orange burfi topped with crushed pistachio. Per piece.' }),
  p({ category: 'barfi', name: 'Santra Coconut Burfi', price: 55, img: IMG.barfiCoconut, desc: 'Coconut & orange zest infused burfi. Per piece.' }),
  p({ category: 'barfi', name: 'Santra Dryfruit Burfi', price: 70, img: IMG.barfiDryfruit, tag: 'Gift', desc: 'Loaded with almonds, cashews & orange peel. Per piece.' }),
];

export const ADDONS = [
  { id: 'a1', name: 'Extra Tarri (spicy gravy)', price: 20 },
  { id: 'a2', name: 'Extra Crunchy Sev', price: 15 },
  { id: 'a3', name: 'Extra Cheese', price: 30 },
  { id: 'a4', name: 'Lemon & Onion', price: 10 },
];

export const VALUES = [
  { title: '100% Vegetarian' },
  { title: 'Made Fresh Daily' },
  { title: 'Nagpur Street Food' },
  { title: 'Made with Love' },
];

export const getProduct = (id) => PRODUCTS.find((x) => x.id === id);
export const byCategory = (cat) => PRODUCTS.filter((x) => x.category === cat);
export const bestsellers = () => PRODUCTS.filter((x) => x.tag === 'Bestseller' || x.tag === 'New').slice(0, 8);
