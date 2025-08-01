"""Seed database with Animal Crossing themed data."""
from app import create_app, db
from app.models import User, Place, Amenity, Review

app = create_app()

with app.app_context():
    # 🔄 Reset de la base
    db.drop_all()
    db.create_all()

    # 👤 Création des users (Tom est le seul admin)
    tom = User("Tom", "Nook", "tom@nookinc.com", "raccoonpower", is_admin=True)
    rosie = User("Rosie", "Cat", "rosie@nookmail.com", "rosie123")
    marshal = User("Marshal", "Squirrel", "marshal@nookmail.com", "musiclover")
    isabelle = User("Isabelle", "ShihTzu", "isabelle@townhall.com", "adminbell")
    blathers = User("Blathers", "Owl", "blathers@museum.org", "fossils4life")

    db.session.add_all([tom, rosie, marshal, isabelle, blathers])
    db.session.commit()

    # 🏡 Création des places
    p1 = Place(
        "Cabane au bord du lac", 40, 45.5, -73.2, rosie,
        "Maison fleurie avec vue sur le lac."
    )
    p2 = Place(
        "Studio musical sous les sapins", 10, 10.2, -70.0, marshal,
        "Petit chez-soi cosy avec instruments."
    )
    p3 = Place(
        "Bureau de la mairie", 50, 5.7, 80.0, isabelle,
        "Bureau lumineux et organisé."
    )
    p4 = Place(
        "Musée de l’île", 100, 30.0, 50.3, blathers,
        "Parfait pour les passionnés d’histoire naturelle."
    )
    p5 = Place(
        "Maison de Tom Nook", 1000000000, 50.9, 10.8, tom,
        "Luxe, calme et clochettes."
    )
    p6 = Place(
        "Résidence secondaire de Tom", 1000000000, -70.0, 110.0, tom,
        "Avec vue sur les clochettes."
    )

    db.session.add_all([p1, p2, p3, p4, p5, p6])
    db.session.commit()

    # 🪴 Création des amenities
    wifi = Amenity("Wi-Fi")
    cuisine = Amenity("Cuisine")
    feu = Amenity("Feu de camp")
    hamac = Amenity("Hamac")
    clochettes = Amenity("Clochettes incluses")

    db.session.add_all([wifi, cuisine, feu, hamac, clochettes])
    db.session.commit()

    # 🔗 Associations place_amenity
    p1.amenities.extend([wifi, feu])
    p2.amenities.extend([wifi, cuisine, hamac])
    p3.amenities.extend([wifi, clochettes])
    p4.amenities.append(cuisine)
    p5.amenities.extend([wifi, cuisine, clochettes])
    p6.amenities.append(hamac)

    db.session.commit()

    # 📝 Reviews
    r1 = Review("Vue superbe, parfait pour se relaxer.", 5, p1, marshal)
    r2 = Review("J’ai pu y enregistrer ma nouvelle chanson !", 4, p2, rosie)
    r3 = Review("Bureau très fonctionnel.", 5, p3, blathers)
    r4 = Review("J’y ai pleuré devant un fossile. Parfait.", 5, p4, isabelle)
    r5 = Review("Trop cher mais Tom Nook est sympa.", 3, p5, rosie)

    db.session.add_all([r1, r2, r3, r4, r5])
    db.session.commit()

    print("🌱 La base de données HBnB a été peuplée avec succès avec les données Animal Crossing !")
