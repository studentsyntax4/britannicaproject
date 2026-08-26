// Mock data for Crackers and Checkers webstore
// NOTE: All data below is MOCKED (frontend-only). Cart persists in localStorage.

export const BRAND = {
  name: 'Crackers and Checkers',
  tagline: 'CRUNCH IT. LOVE IT. REPEAT.',
  subtag: 'Sweet moments, made for you',
  instagram: '@crackersandcheckers',
};

export const CATEGORIES = [
  { id: 'chocolate-crackers', name: 'Chocolate Crackers', blurb: 'Our signature crunch, 10 dreamy flavours.' },
  { id: 'sweet-crackers', name: 'Sweet Crackers', blurb: 'Signature joy in every bite.' },
  { id: 'cakes', name: 'Cakes', blurb: 'Little slices of happiness.' },
  { id: 'shakes', name: 'Shakes', blurb: 'Chill. Sip. Smile.' },
  { id: 'chocolates', name: 'Chocolates', blurb: 'Sweet moments, anytime.' },
  { id: 'packs', name: 'Packs & Boxes', blurb: 'Share the crunch happiness.' },
];

const IMG = {
  c1: 'https://images.unsplash.com/photo-1678303054612-a1410c71ec21?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjcmFja2Vyc3xlbnwwfHx8fDE3ODc3NDc1MDV8MA&ixlib=rb-4.1.0&q=85',
  c2: 'https://images.unsplash.com/photo-1679143121473-c7052ef7a1bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwzfHxjaG9jb2xhdGUlMjBjcmFja2Vyc3xlbnwwfHx8fDE3ODc3NDc1MDV8MA&ixlib=rb-4.1.0&q=85',
  c3: 'https://images.unsplash.com/photo-1633997455043-434ee7ca3e1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHw0fHxjaG9jb2xhdGUlMjBjcmFja2Vyc3xlbnwwfHx8fDE3ODc3NDc1MDV8MA&ixlib=rb-4.1.0&q=85',
  c4: 'https://images.unsplash.com/photo-1619201238590-4d45d078fec5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwzfHxjaG9jb2xhdGUlMjBiaXNjdWl0c3xlbnwwfHx8fDE3ODc3NDc1MDV8MA&ixlib=rb-4.1.0&q=85',
  c5: 'https://images.pexels.com/photos/35695621/pexels-photo-35695621.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  c6: 'https://images.unsplash.com/photo-1598839950984-034f6dc7b495?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHw0fHxjaG9jb2xhdGUlMjBjb29raWVzfGVufDB8fHx8MTc4Nzc0NzUwNXww&ixlib=rb-4.1.0&q=85',
  c7: 'https://images.unsplash.com/photo-1634188023615-7e08901193b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwzfHxjaG9jb2xhdGUlMjBjb29raWVzfGVufDB8fHx8MTc4Nzc0NzUwNXww&ixlib=rb-4.1.0&q=85',
  cake1: 'https://images.unsplash.com/photo-1700448293876-07dca826c161?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwyfHxjaG9jb2xhdGUlMjBjYWtlJTIwc2xpY2V8ZW58MHx8fHwxNzg3NzQ3NTM2fDA&ixlib=rb-4.1.0&q=85',
  cake2: 'https://images.unsplash.com/photo-1602663491496-73f07481dbea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwyfHxzdHJhd2JlcnJ5JTIwY2FrZXxlbnwwfHx8fDE3ODc3NDc1MzZ8MA&ixlib=rb-4.1.0&q=85',
  cake3: 'https://images.unsplash.com/photo-1685957652870-d56b0e5bea52?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxyZWQlMjB2ZWx2ZXQlMjBjaGVlc2VjYWtlfGVufDB8fHx8MTc4Nzc0NzUzN3ww&ixlib=rb-4.1.0&q=85',
  cake4: 'https://images.unsplash.com/photo-1702925614886-50ad13c88d3f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwyfHxibHVlYmVycnklMjBjaGVlc2VjYWtlfGVufDB8fHx8MTc4Nzc0NzU0M3ww&ixlib=rb-4.1.0&q=85',
  cake5: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwzfHxibHVlYmVycnklMjBjaGVlc2VjYWtlfGVufDB8fHx8MTc4Nzc0NzU0M3ww&ixlib=rb-4.1.0&q=85',
  shakeStr: 'https://images.unsplash.com/photo-1686638745403-d21193f16b2f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHw0fHxzdHJhd2JlcnJ5JTIwbWlsa3NoYWtlfGVufDB8fHx8MTc4Nzc0NzU3Nnww&ixlib=rb-4.1.0&q=85',
  shakeStr2: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwbWlsa3NoYWtlfGVufDB8fHx8MTc4Nzc0NzU3Nnww&ixlib=rb-4.1.0&q=85',
  shakeChoc: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBzaGFrZXxlbnwwfHx8fDE3ODc3NDc1NzZ8MA&ixlib=rb-4.1.0&q=85',
  coffee1: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxjb2xkJTIwY29mZmVlfGVufDB8fHx8MTc4Nzc0NzU3Nnww&ixlib=rb-4.1.0&q=85',
  bar1: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  bar2: 'https://images.pexels.com/photos/32402905/pexels-photo-32402905.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  giftbox: 'https://images.pexels.com/photos/36663543/pexels-photo-36663543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  sprinkle1: 'https://images.unsplash.com/photo-1634188023593-ea1de05034c7?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
  sprinkle2: 'https://images.unsplash.com/photo-1621236378699-8597faf6a176?crop=entropy&cs=srgb&fm=jpg&q=85&w=940',
};

let _id = 0;
const p = (o) => ({ id: `p${++_id}`, rating: 4.7, reviews: 40 + ((_id * 7) % 120), ...o });

export const PRODUCTS = [
  // Chocolate Crackers (signature)
  p({ category: 'chocolate-crackers', name: 'Classic Chocolate', price: 120, img: IMG.c1, tag: 'Bestseller', desc: 'Timeless chocolate crackers with a rich, creamy filling.' }),
  p({ category: 'chocolate-crackers', name: 'Hazelnut Crème', price: 130, img: IMG.c4, desc: 'Smooth hazelnut crème sandwiched between crunchy chocolate crackers.' }),
  p({ category: 'chocolate-crackers', name: 'Mint Delight', price: 130, img: IMG.c6, desc: 'Cool mint crème for a refreshing chocolatey bite.' }),
  p({ category: 'chocolate-crackers', name: 'Strawberry Blush', price: 130, img: IMG.c2, tag: 'New', desc: 'Sweet strawberry crème for a fruity twist you\'ll love.' }),
  p({ category: 'chocolate-crackers', name: 'Salted Caramel', price: 130, img: IMG.c3, desc: 'Decadent caramel with a hint of sea salt — simply irresistible.' }),
  p({ category: 'chocolate-crackers', name: 'Dark Indulgence', price: 120, img: IMG.c5, desc: 'Deep, rich dark chocolate for true chocolate lovers.' }),
  p({ category: 'chocolate-crackers', name: 'Cookies & Cream', price: 130, img: IMG.c7, desc: 'Crushed cookies blended with crème for the perfect crunch.' }),
  p({ category: 'chocolate-crackers', name: 'Matcha Crunch', price: 130, img: IMG.c6, desc: 'Earthy matcha crème with a mild sweetness you\'ll crave.' }),
  p({ category: 'chocolate-crackers', name: 'Double Chocolate', price: 130, img: IMG.c1, desc: 'Double the chocolate, double the crunch, double the joy!' }),
  p({ category: 'chocolate-crackers', name: 'Peanut Butter Blast', price: 130, img: IMG.c4, desc: 'Creamy peanut butter filling for a bold and nutty experience.' }),

  // Sweet Crackers
  p({ category: 'sweet-crackers', name: 'Chocolate Crackers', price: 80, img: IMG.c3, tag: 'Bestseller', desc: 'Crispy crackers coated in rich milk chocolate.' }),
  p({ category: 'sweet-crackers', name: 'Strawberry Crackers', price: 80, img: IMG.c2, desc: 'Crispy crackers drizzled with strawberry glaze.' }),
  p({ category: 'sweet-crackers', name: 'Cookies & Cream Crackers', price: 90, img: IMG.c7, desc: 'Loaded with cookies, creamy white chocolate.' }),
  p({ category: 'sweet-crackers', name: 'Salted Caramel Crackers', price: 90, img: IMG.c5, desc: 'Sweet & salty perfection with caramel drizzle.' }),
  p({ category: 'sweet-crackers', name: 'Hazelnut Crackers', price: 100, img: IMG.c4, desc: 'Crunchy, nutty & chocolatey bliss.' }),
  p({ category: 'sweet-crackers', name: 'Rainbow Crackers', price: 80, img: IMG.sprinkle1, desc: 'White chocolate with colourful sprinkles.' }),

  // Cakes
  p({ category: 'cakes', name: 'Chocolate Fudge Cake', price: 120, img: IMG.cake1, tag: 'Bestseller', desc: 'Rich, moist & oh-so-chocolatey.' }),
  p({ category: 'cakes', name: 'Strawberry Shortcake', price: 120, img: IMG.cake2, desc: 'Light sponge with fresh strawberry layers.' }),
  p({ category: 'cakes', name: 'Red Velvet Cake', price: 130, img: IMG.cake3, desc: 'Classic red velvet with cream cheese frosting.' }),
  p({ category: 'cakes', name: 'Blueberry Cheesecake', price: 140, img: IMG.cake4, desc: 'Creamy cheesecake topped with blueberry compote.' }),
  p({ category: 'cakes', name: 'Butterscotch Cake', price: 120, img: IMG.cake5, desc: 'Buttery, sweet & absolutely dreamy.' }),

  // Shakes
  p({ category: 'shakes', name: 'Chocolate Shake', price: 120, img: IMG.shakeChoc, desc: 'Creamy chocolate goodness.' }),
  p({ category: 'shakes', name: 'Strawberry Shake', price: 120, img: IMG.shakeStr, tag: 'New', desc: 'Sweet strawberry delight.' }),
  p({ category: 'shakes', name: 'Oreo Shake', price: 130, img: IMG.shakeStr2, desc: 'Cookies, cream & happiness.' }),
  p({ category: 'shakes', name: 'KitKat Shake', price: 130, img: IMG.shakeChoc, desc: 'Your favourite chocolate bar in a shake!' }),
  p({ category: 'shakes', name: 'Cold Coffee', price: 110, img: IMG.coffee1, desc: 'Smooth, creamy & perfectly chilled.' }),

  // Chocolates
  p({ category: 'chocolates', name: 'Milk Chocolate Bar', price: 60, img: IMG.bar1, desc: 'Smooth & creamy classic.' }),
  p({ category: 'chocolates', name: 'Dark Chocolate Bar', price: 70, img: IMG.bar2, desc: 'Rich, intense & satisfying.' }),
  p({ category: 'chocolates', name: 'Hazelnut Chocolate Bar', price: 80, img: IMG.bar1, desc: 'Milk chocolate with crunchy hazelnuts.' }),
  p({ category: 'chocolates', name: 'Chocolate Bites (Box)', price: 120, img: IMG.giftbox, tag: 'Gift', desc: 'A box full of tiny happiness!' }),

  // Packs & Boxes
  p({ category: 'packs', name: 'Single Pack (6 pcs)', price: 35, img: IMG.c1, desc: 'A little crunch to brighten your day.' }),
  p({ category: 'packs', name: 'Twin Pack (12 pcs)', price: 60, img: IMG.c3, desc: 'Double the crunch, share or keep.' }),
  p({ category: 'packs', name: 'Family Pack (24 pcs)', price: 110, img: IMG.c4, tag: 'Popular', desc: 'Crunchy happiness for the whole family.' }),
  p({ category: 'packs', name: 'Delight Box (48 pcs)', price: 199, img: IMG.c7, desc: 'A big box of sweet moments.' }),
  p({ category: 'packs', name: 'Premium Gift Box (72 pcs)', price: 299, img: IMG.giftbox, tag: 'Gift', desc: 'The ultimate gift of crunch happiness.' }),
];

export const ADDONS = [
  { id: 'a1', name: 'Extra Chocolate Drizzle', price: 20 },
  { id: 'a2', name: 'Extra Topping (Sprinkles / Nuts)', price: 20 },
  { id: 'a3', name: 'Ice Cream Scoop', price: 30 },
  { id: 'a4', name: 'Gift Wrap', price: 30 },
];

export const VALUES = [
  { title: 'Made with Finest Cocoa', icon: 'cocoa' },
  { title: 'No Artificial Colours', icon: 'leaf' },
  { title: 'Made Fresh', icon: 'sparkles' },
  { title: 'Made with Love', icon: 'heart' },
];

export const getProduct = (id) => PRODUCTS.find((x) => x.id === id);
export const byCategory = (cat) => PRODUCTS.filter((x) => x.category === cat);
export const bestsellers = () => PRODUCTS.filter((x) => x.tag === 'Bestseller' || x.tag === 'New').slice(0, 8);
