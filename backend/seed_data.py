IMG = {
    "poha1": "https://images.pexels.com/photos/30769669/pexels-photo-30769669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "poha2": "https://images.pexels.com/photos/13041628/pexels-photo-13041628.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "poha3": "https://images.pexels.com/photos/13063292/pexels-photo-13063292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "poha4": "https://images.pexels.com/photos/36971466/pexels-photo-36971466.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "poha5": "https://images.pexels.com/photos/38860522/pexels-photo-38860522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "barfi": "https://images.unsplash.com/photo-1758910536889-43ce7b3199fd?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
    "barfiClassic": "https://images.unsplash.com/photo-1543773495-2cd9248a5bda?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
    "barfiPista": "https://images.pexels.com/photos/7182054/pexels-photo-7182054.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "barfiCoconut": "https://images.pexels.com/photos/18488320/pexels-photo-18488320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "barfiDryfruit": "https://images.pexels.com/photos/18488299/pexels-photo-18488299.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "samosa1": "https://images.unsplash.com/photo-1601050690597-df0568f70950?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
    "samosa2": "https://images.pexels.com/photos/36170557/pexels-photo-36170557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "chaat": "https://images.unsplash.com/photo-1591031107640-45556bbac5f1?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
    "puff1": "https://images.unsplash.com/photo-1682263167429-0dbcf2c1e127?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
    "puff2": "https://images.unsplash.com/photo-1742362010549-7e2df94614be?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
    "alootikki": "https://images.unsplash.com/photo-1708782340351-25feb5640076?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
}

_RAW = [
    ("tarri-poha", "Classic Tarri Poha", 90, "poha2", "Bestseller", "Traditional poha topped with spicy tarri, sev & coriander."),
    ("tarri-poha", "Spicy Jhal Tarri Poha", 100, "poha3", "Spicy", "Extra spicy poha with lemon, onions & green chillies."),
    ("tarri-poha", "Cheese Tarri Poha", 120, "poha5", None, "Melty cheese over our classic tarri poha."),
    ("tarri-poha", "Kanda Tarri Poha with Sev", 95, "poha1", None, "Loaded with caramelized onions & crunchy sev."),
    ("snacks", "Saoji Patty Puff", 60, "puff1", None, "Spicy Nagpur-style patty in flaky puff pastry."),
    ("snacks", "Nagpur Sev Puri", 70, "chaat", "Bestseller", "Crunchy, tangy, topped with sev & chutneys."),
    ("snacks", "Aloo Patties", 65, "alootikki", None, "Golden fried potato patties with house chutney."),
    ("snacks", "Mirchi Bhaji", 80, "puff2", None, "Crispy green chillies, besan-battered & fried."),
    ("snacks", "Sev Usal", 90, "poha4", "New", "Spicy gravy topped with crunchy sev & coriander."),
    ("snacks", "Samosa Chaat", 100, "samosa1", None, "Crushed samosa with tarri drizzle, yogurt & sev."),
    ("barfi", "Classic Santra Burfi", 50, "barfiClassic", "Bestseller", "Traditional orange burfi, melt-in-mouth sweet. Per piece."),
    ("barfi", "Santra Pistachio Burfi", 60, "barfiPista", None, "Orange burfi topped with crushed pistachio. Per piece."),
    ("barfi", "Santra Coconut Burfi", 55, "barfiCoconut", None, "Coconut & orange zest infused burfi. Per piece."),
    ("barfi", "Santra Dryfruit Burfi", 70, "barfiDryfruit", "Gift", "Loaded with almonds, cashews & orange peel. Per piece."),
]


def get_seed_products():
    products = []
    for i, (cat, name, price, img_key, tag, desc) in enumerate(_RAW, start=1):
        products.append({
            "id": f"p{i}",
            "name": name,
            "category": cat,
            "price": price,
            "img": IMG[img_key],
            "tag": tag,
            "desc": desc,
            "rating": 4.7,
            "reviews": 40 + (i * 7) % 120,
            "order": i,
        })
    return products
