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
    keke = User("Kéké", "Laglisse", "keke.laglisse@nookmail.com", "keke123")
    didi = User("Didi", "Reverie", "didi.reverie@ac-island.com", "Licorne123!")
    roscoe = User("Roscoe", "Nightmane", "roscoe.dark@ac-island.com", "ChillHorse42#")
    mathilda = User("Mathilda", "Kangamom", "mathilda.kanga@ac-island.com", "BabyFirst!2025")
    raymond = User("Raymond", "Suitcat", "raymond.cat@ac-island.com", "FancyCat007$")
    monique = User("Monique", "Glamour", "monique.chic@ac-island.com", "DivaMode22#")
    bibi = User("Bibi", "Coolbunny", "bibi.rabbit@ac-island.com", "HopHop2025*")
    miro = User("Miro", "Sleepyhead", "miro.sloth@ac-island.com", "ZzzNapTime!")
    tokkie = User("Tokkie", "Urbano", "tokkie.frog@ac-island.com", "DecoFan45$")
    mirza = User("Mirza", "Bounce", "mirza.dog@ac-island.com", "ZoomZoom!77")
    max = User("Max", "Chilldog", "max.relax@ac-island.com", "SnoozeOn456$")
    frida = User("Frida", "Quirkwool", "frida.sheep@ac-island.com", "EweDoYou99#")
    croque = User("Croque", "Grumps", "croque.toad@ac-island.com", "BitterOld23!")
    matheo = User("Mathéo", "Jumper", "matheo.roo@ac-island.com", "SportyLeap12$")
    nefertiti = User("Neferti", "Regalwhisker", "nefertiti.cat@ac-island.com", "QueenMeow2025#")
    gulliver = User("Gulliver", "Lostwing", "gulliver.sea@ac-island.com", "DriftAway84!")
    rounard = User("Rounard", "Foxydeal", "rounard.fox@ac-island.com", "TradeSecret$2025")
    ketchup = User("Ketchup", "Tomato", "ketchup.canette@ac-island.com", "SweetSauce33!")
    cyrano = User("Cyrano", "Grumbleant", "cyrano.ant@ac-island.com", "SnoutStrong77#")
    layette = User("Layette", "Stitcher", "layette.tailor@ac-island.com", "ThreadWork88$")
    astrid = User("Melle", "Astrid", "astrid.fashion@ac-island.com", "OstrichGlam21#")
    amiral = User("Amiral", "Croaker", "amiral.frog@ac-island.com", "SaltLife007!")


    db.session.add_all([tom, rosie, marshal, isabelle, blathers, keke, didi, roscoe, mathilda, raymond, monique, bibi, miro, tokkie, mirza, max, frida, croque, matheo, nefertiti, gulliver, rounard, ketchup, cyrano, layette, astrid, amiral])
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
    p7 = Place(
        "Cabane de Kéké Laglisse", 9, 25.6, -78.3, keke,
        "Maison au calme pour enregistrer son nouveau tube."
    )


    db.session.add_all([p1, p2, p3, p4, p5, p6, p7])
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
    p7.amenities.extend([cuisine, feu, hamac])

    db.session.commit()

    # 📝 Reviews
    r1 = Review("Vue superbe, parfait pour se relaxer.", 5, p1, marshal)
    r2 = Review("Le cadre est bucolique à souhait. Rosie a un goût prononcé pour les teintes pastel et les bougies parfumées “crème de framboise”. Pas ma vibe habituelle, mais j’ai été agréablement surpris. Elle fait un très bon thé glacé.", 4, p1, raymond)
    r3 = Review("C’est un cocon d’amour, de rose poudré et de licornes. Rosie a redonné un sens au mot 'sororité'. Bonus : elle prête des accessoires pour les selfies.", 5, p1, monique)
    r4 = Review("Très girly, mais je me suis senti accepté. Les canards du lac organisent un défilé à 18h. Inattendu, mais stylé.", 5, p1, bibi)
    r5 = Review("J’ai pu y enregistrer ma nouvelle chanson !", 4, p2, rosie)
    r6 = Review("J’étais venu pour une sieste, j’ai eu un solo de synthé spatial à 3h du mat. C’était... étonnant. Très bon coussin par contre. Et l’odeur de bois humide m’a fait fondre.", 5, p2, miro)
    r7 = Review("Studio minimaliste avec acoustique parfaite. Marshall m’a laissé poser ma voix sur une instru lo-fi. J’ai failli signer avec un label fictif.", 5, p2, tokkie)
    r8 = Review("Endroit classe, mais il m’a demandé de “ne pas bouger les vinyles par couleur”. La vue sur les sapins est incroyable, même si j’ai éternué tout le séjour.", 3, p2, mirza)
    r9 = Review("Bureau très fonctionnel.", 5, p3, blathers)
    r10 = Review("Je suis resté une nuit, j’ai fini adjoint au maire. Accueil impeccable, cookies maison et planning imprimé. Par contre, impossible de faire une grasse mat’ : elle chantonne dès 6h00. ", 4, p3, max)
    r11 = Review("Je suis repartie avec un agenda, un calendrier, un stylo licorne et un plan de carrière. J’étais venue pour 2 nuits. J’ai eu une consultation en développement personnel.", 5, p3, frida)
    r12 = Review("Trop de fleurs, trop de joie, trop de règles. Je suis vieux, j’ai besoin de calme et d’amertume. Elle m’a fait un câlin.", 3, p3, croque)
    r13 = Review("J’y ai pleuré devant un fossile. Parfait.", 5, p4, isabelle)
    r14 = Review("J’étais chaud pour dormir dans une salle d’expo, mais j’ai pas signé pour 48 anecdotes sur les coléoptères. Très propre, très calme, mais faut aimer le son des pages qu’on tourne.", 3, p4, matheo)
    r15 = Review("Ambiance solennelle, odeur de vieux parchemins. Parfait pour méditer. J’aurais aimé un encens à l’ambre et un majordome spectral, mais Thibou compense avec ses anecdotes.", 4, p4, nefertiti)
    r16 = Review("Très belle collection d’objets anciens. J’ai essayé de dormir dans le sarcophage. Apparemment, ce n’est pas autorisé.", 4, p4, gulliver)
    r17 = Review("Trop cher mais Tom Nook est sympa.", 3, p5, rosie)
    r18 = Review("J’ai tenté de troquer une œuvre d’art contre une nuit gratuite. Refus catégorique. Maison très propre, un peu froide. Tout est étiqueté 'remboursable en 15 fois'.", 4, p5, rounard)
    r19 = Review("J’ai été accueillie avec un devis. Et un contrat. Mais aussi un jus de fruit frais. C’est ça, le capitalisme sucré-salé.", 4, p5, ketchup)
    r20 = Review("Trop de tableaux Excel encadrés aux murs. J’ai pas compris si je venais dormir ou investir.", 3, p5, cyrano)
    r21 = Review("Où sont mes clochettes ?!", 1, p6, rosie)
    r22 = Review("Super déco, ambiance minimaliste avec vue sur l’empire immobilier de Tom. Je suis partie avec une idée de robe “capitaliste chic”. Par contre, 10 clochettes le rouleau de PQ, c’est un non.", 2, p6, layette)
    r23 = Review(" Luxe discret, ambiance Forbes. J’ai dormi dans une couette en fibre de clochettes. Et je crois que la lampe m’a dit bonsoir.", 5, p6, astrid)
    r24 = Review("Trop propre, trop lisse. Il manque un peu d’algues et de sueur de marin. Mais le parquet était si luisant que j’ai glissé dedans un rêve.", 3, p6, amiral)
    r25 = Review("Super ambiance chill. J’ai fait un rêve lucide en écoutant KK jouer 'Sur le sable' au ukulélé. Seul bémol : pas de miroir pour vérifier si mes paillettes étaient bien symétriques.", 4, p7, didi)
    r26 = Review("Il m’a joué un morceau que personne ne comprend, même pas lui. J’ai aimé. Trop de moustiques, mais ils vibraient bien avec la basse.", 5, p7, roscoe)
    r27 = Review("Pas de lit bébé. Pas de murs. Pas de plancher. Je suis venue pour me reposer, j’ai eu un concert privé et des marshmallows. Mon bébé danse depuis, c’est déjà ça.", 4, p7, mathilda)

    db.session.add_all([r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27])
    db.session.commit()

    print("🌱 La base de données HBnB a été peuplée avec succès avec les données Animal Crossing !")
