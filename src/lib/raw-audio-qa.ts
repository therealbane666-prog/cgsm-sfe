export type RawQA = {
  id: number
  question: string
  answer: string
  category: string
}

// Raw Q&A pairs for audio playback mode
// Extracted from quiz data and formatted for sequential audio narration
export const rawAudioQA: RawQA[] = [
  {
    id: 1,
    question: "Quel système de navigation est principalement utilisé par les sous-marins en immersion?",
    answer: "Navigation inertielle. La navigation inertielle calcule la position en mesurant l'accélération et la rotation, fonctionnant sans signal externe.",
    category: "Navigation"
  },
  {
    id: 2,
    question: "Pourquoi le GPS ne fonctionne-t-il pas sous l'eau?",
    answer: "Les signaux radio ne pénètrent pas l'eau. Les ondes radio GPS sont absorbées par l'eau de mer et ne peuvent pas atteindre un sous-marin immergé.",
    category: "Navigation"
  },
  {
    id: 3,
    question: "À quelle fréquence doit-on calibrer le système de navigation inertielle?",
    answer: "Régulièrement. La calibration régulière est nécessaire pour corriger les erreurs accumulées au fil du temps.",
    category: "Navigation"
  },
  {
    id: 4,
    question: "Quel système aide à éviter les obstacles en immersion?",
    answer: "Sonar. Le sonar détecte les obstacles en émettant et recevant des ondes sonores sous l'eau.",
    category: "Navigation"
  },
  {
    id: 5,
    question: "Quelle est la principale limitation de la navigation inertielle?",
    answer: "Accumulation d'erreurs dans le temps. Les petites erreurs de mesure s'accumulent progressivement, nécessitant une correction périodique.",
    category: "Navigation"
  },
  {
    id: 6,
    question: "Comment un sous-marin corrige-t-il sa position en surface?",
    answer: "GPS. Le GPS est utilisé en surface pour corriger les erreurs accumulées par le système inertiel.",
    category: "Navigation"
  },
  {
    id: 7,
    question: "Qu'est-ce que la navigation acoustique?",
    answer: "Navigation utilisant le son sous l'eau. La navigation acoustique utilise des signaux sonores pour déterminer la position et éviter les obstacles.",
    category: "Navigation"
  },
  {
    id: 8,
    question: "Quel instrument mesure la profondeur du sous-marin?",
    answer: "Manomètre. Le manomètre mesure la pression de l'eau, permettant de calculer la profondeur.",
    category: "Navigation"
  },
  {
    id: 9,
    question: "Quelle information le gyroscope fournit-il?",
    answer: "L'orientation et la rotation. Le gyroscope maintient une référence d'orientation stable et détecte les rotations du sous-marin.",
    category: "Navigation"
  },
  {
    id: 10,
    question: "Pourquoi les sous-marins maintiennent-ils un cap constant?",
    answer: "Pour faciliter la navigation et réduire les erreurs. Un cap stable facilite les calculs de navigation et réduit l'accumulation d'erreurs.",
    category: "Navigation"
  },
  {
    id: 11,
    question: "Quels sont les deux principaux types de propulsion sous-marine?",
    answer: "Nucléaire et diesel-électrique. Les sous-marins modernes utilisent soit des réacteurs nucléaires, soit des moteurs diesel couplés à des batteries électriques.",
    category: "Systèmes"
  },
  {
    id: 12,
    question: "Quel est l'avantage principal de la propulsion nucléaire?",
    answer: "Autonomie quasi-illimitée. La propulsion nucléaire permet de rester immergé pendant des mois sans refaire le plein.",
    category: "Systèmes"
  },
  {
    id: 13,
    question: "Quel type de sonar est privilégié pour éviter la détection?",
    answer: "Sonar passif. Le sonar passif écoute sans émettre, évitant ainsi de révéler la position du sous-marin.",
    category: "Systèmes"
  },
  {
    id: 14,
    question: "Que fait le système de régénération d'air?",
    answer: "Produit de l'oxygène et élimine le CO2. Le système de régénération produit de l'oxygène respirable et élimine le dioxyde de carbone.",
    category: "Systèmes"
  },
  {
    id: 15,
    question: "Comment fonctionne un réacteur nucléaire de sous-marin?",
    answer: "Chauffe l'eau pour créer de la vapeur. Le réacteur nucléaire chauffe l'eau pour créer de la vapeur qui entraîne les turbines.",
    category: "Systèmes"
  },
  {
    id: 16,
    question: "Quelle est la différence entre sonar actif et passif?",
    answer: "Le sonar actif émet des ondes et écoute leurs échos, tandis que le sonar passif écoute simplement les sons environnants sans émettre.",
    category: "Systèmes"
  },
  {
    id: 17,
    question: "Pourquoi les sous-marins diesel-électriques doivent-ils faire surface?",
    answer: "Pour recharger leurs batteries. Les moteurs diesel nécessitent de l'air pour fonctionner et recharger les batteries.",
    category: "Systèmes"
  },
  {
    id: 18,
    question: "Qu'est-ce qu'un système de propulsion anaérobie?",
    answer: "Système permettant de prolonger l'immersion. Il permet au sous-marin diesel-électrique de rester immergé plus longtemps sans faire surface.",
    category: "Systèmes"
  },
  {
    id: 19,
    question: "Que détecte le sonar passif?",
    answer: "Les signatures acoustiques. Le sonar passif analyse les sons pour identifier les navires, la topographie marine et les dangers.",
    category: "Systèmes"
  },
  {
    id: 20,
    question: "Quels facteurs affectent la portée du sonar?",
    answer: "Température de l'eau, salinité, profondeur et conditions météorologiques en surface.",
    category: "Systèmes"
  },
  {
    id: 21,
    question: "Quelles sont les trois principales urgences à bord?",
    answer: "Incendies, voies d'eau et contaminations. Ce sont les trois types d'urgences critiques nécessitant des procédures spécifiques.",
    category: "Sécurité"
  },
  {
    id: 22,
    question: "Où se trouvent les masques respiratoires?",
    answer: "À des emplacements stratégiques dans tout le sous-marin. Chaque membre d'équipage doit connaître leur emplacement exact.",
    category: "Sécurité"
  },
  {
    id: 23,
    question: "Pourquoi surveiller l'atmosphère interne?",
    answer: "Pour détecter les niveaux dangereux de CO2, CO et autres gaz. La surveillance constante est critique pour la survie de l'équipage.",
    category: "Sécurité"
  },
  {
    id: 24,
    question: "À quelle fréquence pratique-t-on les exercices d'évacuation?",
    answer: "Régulièrement. Les exercices fréquents assurent que chaque membre d'équipage connaît les procédures d'urgence.",
    category: "Sécurité"
  },
  {
    id: 25,
    question: "Quel est le rôle du système de purification d'eau?",
    answer: "Produire de l'eau potable. Il est critique pour la survie en immersion prolongée.",
    category: "Sécurité"
  },
  {
    id: 26,
    question: "Que faire en cas d'incendie à bord?",
    answer: "Activer les procédures d'extinction appropriées, isoler la zone, et utiliser les équipements de protection respiratoire.",
    category: "Sécurité"
  },
  {
    id: 27,
    question: "Qu'est-ce qu'une voie d'eau?",
    answer: "Une entrée d'eau non contrôlée dans le sous-marin, représentant un danger critique pour la flottabilité et la sécurité.",
    category: "Sécurité"
  },
  {
    id: 28,
    question: "Pourquoi les sas de secours sont-ils importants?",
    answer: "Ils permettent l'évacuation d'urgence de l'équipage en cas de situation critique.",
    category: "Sécurité"
  },
  {
    id: 29,
    question: "Quel équipement protège contre les gaz toxiques?",
    answer: "Masques respiratoires avec filtres appropriés. Ils sont essentiels en cas d'incendie ou de contamination chimique.",
    category: "Sécurité"
  },
  {
    id: 30,
    question: "Comment détecte-t-on un niveau dangereux de CO2?",
    answer: "Par des capteurs de surveillance atmosphérique qui alertent automatiquement l'équipage.",
    category: "Sécurité"
  },
  {
    id: 31,
    question: "Quelles fréquences les sous-marins utilisent-ils pour recevoir des messages en immersion?",
    answer: "Fréquences très basses VLF et ELF. Ces fréquences peuvent pénétrer l'eau de mer sur une profondeur limitée.",
    category: "Opérations"
  },
  {
    id: 32,
    question: "Comment un sous-marin peut-il transmettre des messages?",
    answer: "En déployant une antenne flottante ou en faisant surface. Les ondes radio ne traversent pas l'eau efficacement.",
    category: "Opérations"
  },
  {
    id: 33,
    question: "Qu'est-ce que la communication acoustique sous-marine?",
    answer: "Utilisation du son pour transmettre des données entre sous-marins ou vers des bouées.",
    category: "Opérations"
  },
  {
    id: 34,
    question: "Quand peut-on utiliser les communications par satellite?",
    answer: "Lorsque le périscope ou le schnorchel est déployé, permettant l'accès aux antennes en surface.",
    category: "Opérations"
  },
  {
    id: 35,
    question: "Pourquoi les communications sous-marines sont-elles difficiles?",
    answer: "Les ondes radio ne pénètrent pas l'eau, nécessitant des fréquences spéciales ou des méthodes acoustiques.",
    category: "Opérations"
  },
  {
    id: 36,
    question: "Qu'est-ce qu'une antenne flottante?",
    answer: "Une antenne déployée vers la surface pendant que le sous-marin reste immergé, permettant les communications radio.",
    category: "Opérations"
  },
  {
    id: 37,
    question: "Quel est l'inconvénient des communications VLF?",
    answer: "Débit très faible et portée limitée en profondeur, ne permettant que des messages courts.",
    category: "Opérations"
  },
  {
    id: 38,
    question: "Pourquoi minimiser les transmissions?",
    answer: "Pour éviter la détection par l'ennemi. Les transmissions peuvent révéler la position du sous-marin.",
    category: "Opérations"
  },
  {
    id: 39,
    question: "Comment recevoir des ordres en immersion profonde?",
    answer: "Via des signaux ELF extrêmement basse fréquence qui peuvent pénétrer à grande profondeur.",
    category: "Opérations"
  },
  {
    id: 40,
    question: "Qu'est-ce qu'un schnorchel?",
    answer: "Un tube rétractable permettant au sous-marin de faire fonctionner ses moteurs diesel près de la surface.",
    category: "Opérations"
  },
  {
    id: 41,
    question: "Qu'est-ce que la thermocline?",
    answer: "Couche d'eau où la température change rapidement, offrant un camouflage acoustique naturel.",
    category: "Tactique"
  },
  {
    id: 42,
    question: "Qu'est-ce que la tactique 'sprint and drift'?",
    answer: "Courtes accélérations suivies d'arrêts pour écouter passivement l'environnement acoustique.",
    category: "Tactique"
  },
  {
    id: 43,
    question: "Que sont les contre-mesures acoustiques?",
    answer: "Leurres pour tromper les torpilles ennemies en simulant la signature acoustique du sous-marin.",
    category: "Tactique"
  },
  {
    id: 44,
    question: "Quelles signatures doit-on minimiser?",
    answer: "Signatures magnétique, thermique et acoustique pour éviter la détection par l'ennemi.",
    category: "Tactique"
  },
  {
    id: 45,
    question: "Pourquoi changer fréquemment de profondeur en zone hostile?",
    answer: "Pour éviter les routes prévisibles et compliquer le pistage ennemi.",
    category: "Tactique"
  },
  {
    id: 46,
    question: "Comment la thermocline aide-t-elle le sous-marin?",
    answer: "Elle réfracte les ondes sonores, créant une zone d'ombre acoustique où le sous-marin peut se cacher.",
    category: "Tactique"
  },
  {
    id: 47,
    question: "Pourquoi la discrétion est-elle primordiale?",
    answer: "La détection compromet la mission et la sécurité du sous-marin. Le silence est la meilleure protection.",
    category: "Tactique"
  },
  {
    id: 48,
    question: "Qu'est-ce qu'une signature acoustique?",
    answer: "Le profil sonore unique d'un sous-marin, incluant bruits de moteur, d'hélice et d'équipements.",
    category: "Tactique"
  },
  {
    id: 49,
    question: "Comment éviter le pistage magnétique?",
    answer: "Minimiser la signature magnétique par démagnétisation et choix de routes éloignées des détecteurs.",
    category: "Tactique"
  },
  {
    id: 50,
    question: "Pourquoi éviter les routes prévisibles?",
    answer: "Les routes prévisibles facilitent l'embuscade et le pistage par l'ennemi.",
    category: "Tactique"
  },
  {
    id: 51,
    question: "Pourquoi inspecter quotidiennement les batteries?",
    answer: "Pour détecter fuites ou défaillances. Les batteries sont critiques pour la propulsion et peuvent être dangereuses.",
    category: "Maintenance"
  },
  {
    id: 52,
    question: "Qu'est-ce que le biofouling?",
    answer: "Organismes marins qui s'attachent à la coque, augmentant traînée et bruit.",
    category: "Maintenance"
  },
  {
    id: 53,
    question: "Pourquoi remplacer préventivement les joints et valves?",
    answer: "Ils sont soumis à pression constante et s'usent rapidement. Le remplacement préventif évite les défaillances critiques.",
    category: "Maintenance"
  },
  {
    id: 54,
    question: "Quel danger représente la corrosion?",
    answer: "Elle peut affaiblir l'intégrité structurelle de la coque et créer des points de défaillance.",
    category: "Maintenance"
  },
  {
    id: 55,
    question: "Qu'est-ce qu'un sea trial?",
    answer: "Test en mer après construction ou refit. Les sea trials testent tous les systèmes dans des conditions réelles.",
    category: "Maintenance"
  },
  {
    id: 56,
    question: "Qu'est-ce que le pressure hull?",
    answer: "Coque interne résistante qui maintient la pression atmosphérique jusqu'à la profondeur de test.",
    category: "Maintenance"
  },
  {
    id: 57,
    question: "Quelle est la profondeur de test d'un sous-marin?",
    answer: "Généralement 80% de la profondeur de rupture. C'est la limite opérationnelle sûre.",
    category: "Maintenance"
  },
  {
    id: 58,
    question: "Qu'est-ce qu'un refit?",
    answer: "Rénovation majeure du sous-marin. Période de maintenance avec modernisation des systèmes.",
    category: "Maintenance"
  },
  {
    id: 59,
    question: "Pourquoi nettoyer régulièrement la coque?",
    answer: "Pour éliminer le biofouling qui augmente la traînée, la consommation d'énergie et le bruit.",
    category: "Maintenance"
  },
  {
    id: 60,
    question: "Qu'est-ce que la maintenance préventive?",
    answer: "Entretien programmé avant panne. Elle évite les défaillances en remplaçant les composants avant leur fin de vie.",
    category: "Maintenance"
  },
  {
    id: 61,
    question: "Pourquoi les sous-marins ont-ils une double coque?",
    answer: "L'espace entre coques contient les ballasts et offre protection contre torpilles.",
    category: "Maintenance"
  },
  {
    id: 62,
    question: "Quel composant s'use le plus rapidement?",
    answer: "Joints et valves. Ils sont soumis à pression constante et nécessitent remplacement fréquent.",
    category: "Maintenance"
  },
  {
    id: 63,
    question: "Pourquoi tester régulièrement les ballasts?",
    answer: "Pour assurer capacité de plongée et émersion d'urgence. Les ballasts doivent fonctionner parfaitement.",
    category: "Maintenance"
  },
  {
    id: 64,
    question: "Comment fonctionne le système de ballast?",
    answer: "En remplissant ou vidant d'eau des réservoirs pour contrôler la flottabilité du sous-marin.",
    category: "Systèmes"
  },
  {
    id: 65,
    question: "Qu'est-ce que la profondeur périscopique?",
    answer: "Profondeur permettant d'utiliser le périscope tout en restant immergé, typiquement quelques mètres sous la surface.",
    category: "Navigation"
  },
  {
    id: 66,
    question: "Pourquoi un sous-marin doit-il maintenir l'assiette?",
    answer: "Pour rester à profondeur constante et maintenir la stabilité. L'assiette est l'équilibre horizontal du sous-marin.",
    category: "Navigation"
  },
  {
    id: 67,
    question: "Qu'est-ce qu'une plongée d'urgence?",
    answer: "Manœuvre rapide pour atteindre une profondeur de sécurité, utilisée en cas de menace immédiate.",
    category: "Opérations"
  },
  {
    id: 68,
    question: "Comment éviter la détection radar en surface?",
    answer: "Minimiser le profil émergé, utiliser des revêtements absorbants et limiter le temps en surface.",
    category: "Tactique"
  },
  {
    id: 69,
    question: "Qu'est-ce que la signature thermique?",
    answer: "Chaleur émise par le sous-marin, détectable par des capteurs infrarouges ou thermiques.",
    category: "Tactique"
  },
  {
    id: 70,
    question: "Pourquoi contrôler les émissions sonores?",
    answer: "Le bruit révèle la présence et la position du sous-marin aux systèmes sonar ennemis.",
    category: "Tactique"
  },
  {
    id: 71,
    question: "Qu'est-ce qu'un torpille à tête chercheuse?",
    answer: "Torpille guidée qui détecte et suit sa cible de manière autonome en utilisant des capteurs acoustiques.",
    category: "Tactique"
  },
  {
    id: 72,
    question: "Comment fonctionne un leurre acoustique?",
    answer: "Il émet des sons similaires au sous-marin pour tromper les torpilles et les éloigner de la cible réelle.",
    category: "Tactique"
  },
  {
    id: 73,
    question: "Qu'est-ce que le silence radio?",
    answer: "Période où toutes les communications sont interdites pour éviter la détection électronique.",
    category: "Opérations"
  },
  {
    id: 74,
    question: "Pourquoi limiter l'utilisation du sonar actif?",
    answer: "Le sonar actif révèle la position du sous-marin à tous ceux qui peuvent l'entendre.",
    category: "Tactique"
  },
  {
    id: 75,
    question: "Qu'est-ce qu'une zone d'exclusion?",
    answer: "Zone où tout navire non identifié peut être considéré comme hostile et engagé.",
    category: "Opérations"
  },
  {
    id: 76,
    question: "Comment identifier un navire au sonar?",
    answer: "Par sa signature acoustique unique : bruit d'hélice, de moteur et caractéristiques de coque.",
    category: "Systèmes"
  },
  {
    id: 77,
    question: "Qu'est-ce que l'effet Doppler acoustique?",
    answer: "Changement de fréquence du son en fonction du mouvement relatif, utilisé pour déterminer vitesse et direction.",
    category: "Systèmes"
  },
  {
    id: 78,
    question: "Pourquoi les sous-marins ont-ils des coques arrondies?",
    answer: "Pour résister uniformément à la pression et minimiser les turbulences et le bruit.",
    category: "Maintenance"
  },
  {
    id: 79,
    question: "Qu'est-ce qu'une torpille filoguidée?",
    answer: "Torpille contrôlée par câble optique depuis le sous-marin, offrant guidage précis.",
    category: "Tactique"
  },
  {
    id: 80,
    question: "Comment fonctionne le schnorchel en mer agitée?",
    answer: "Valve automatique ferme l'admission d'air quand une vague submerge le schnorchel.",
    category: "Systèmes"
  },
  {
    id: 81,
    question: "Qu'est-ce que la profondeur de sécurité?",
    answer: "Profondeur minimale permettant d'éviter détection en surface tout en restant opérationnel.",
    category: "Navigation"
  },
  {
    id: 82,
    question: "Pourquoi surveiller la température de l'eau?",
    answer: "Elle affecte la propagation du son et permet d'identifier les thermoclines pour se cacher.",
    category: "Navigation"
  },
  {
    id: 83,
    question: "Qu'est-ce qu'un périscope d'attaque?",
    answer: "Périscope avec optique haute résolution pour identification précise des cibles.",
    category: "Systèmes"
  },
  {
    id: 84,
    question: "Qu'est-ce qu'un périscope de veille?",
    answer: "Périscope avec champ de vision large pour surveillance générale de la surface.",
    category: "Systèmes"
  },
  {
    id: 85,
    question: "Comment renouveler l'air sans faire surface?",
    answer: "Via le schnorchel qui permet d'aspirer l'air en restant près de la surface.",
    category: "Systèmes"
  },
  {
    id: 86,
    question: "Qu'est-ce que l'oxygène électrolytique?",
    answer: "Oxygène produit par électrolyse de l'eau, utilisé pour régénérer l'atmosphère à bord.",
    category: "Systèmes"
  },
  {
    id: 87,
    question: "Pourquoi neutraliser le CO2?",
    answer: "Le CO2 accumulé devient toxique et peut causer asphyxie de l'équipage.",
    category: "Sécurité"
  },
  {
    id: 88,
    question: "Comment éliminer le CO2 à bord?",
    answer: "Par des absorbeurs chimiques qui capturent le CO2 de l'air recyclé.",
    category: "Systèmes"
  },
  {
    id: 89,
    question: "Qu'est-ce qu'une alarme plongée?",
    answer: "Signal sonore annonçant une manœuvre de plongée imminente, tous doivent sécuriser leur poste.",
    category: "Opérations"
  },
  {
    id: 90,
    question: "Pourquoi fermer les panneaux avant plongée?",
    answer: "Pour assurer l'étanchéité de la coque et éviter les voies d'eau lors de l'immersion.",
    category: "Sécurité"
  },
  {
    id: 91,
    question: "Qu'est-ce que le trim du sous-marin?",
    answer: "Équilibre et assiette du sous-marin, ajusté par redistribution d'eau dans les ballasts.",
    category: "Navigation"
  },
  {
    id: 92,
    question: "Comment contrôler la profondeur?",
    answer: "Par les barres de plongée et ajustement du ballast pour maintenir la profondeur désirée.",
    category: "Navigation"
  },
  {
    id: 93,
    question: "Qu'est-ce qu'une chambre de compensation?",
    answer: "Sas permettant d'égaliser la pression avant ouverture vers l'extérieur.",
    category: "Systèmes"
  },
  {
    id: 94,
    question: "Pourquoi les sous-mariniers portent-ils des chaussures à semelles souples?",
    answer: "Pour minimiser le bruit de pas qui pourrait être détecté par les sonars ennemis.",
    category: "Tactique"
  },
  {
    id: 95,
    question: "Qu'est-ce que le central opérations?",
    answer: "Poste de commandement principal d'où sont contrôlés navigation, combat et systèmes vitaux.",
    category: "Opérations"
  },
  {
    id: 96,
    question: "Pourquoi diviser le sous-marin en compartiments étanches?",
    answer: "Pour isoler les voies d'eau ou incendies et préserver le reste du navire.",
    category: "Sécurité"
  },
  {
    id: 97,
    question: "Qu'est-ce qu'un compartiment torpedo?",
    answer: "Section contenant tubes lance-torpilles et stockage des torpilles.",
    category: "Systèmes"
  },
  {
    id: 98,
    question: "Comment fonctionne un tube lance-torpilles?",
    answer: "Chambre pressurisée qui expulse la torpille par différence de pression.",
    category: "Systèmes"
  },
  {
    id: 99,
    question: "Qu'est-ce qu'une torpille d'exercice?",
    answer: "Torpille sans charge explosive, utilisée pour entraînement et récupérable après tir.",
    category: "Opérations"
  },
  {
    id: 100,
    question: "Pourquoi tester régulièrement les systèmes d'urgence?",
    answer: "Pour s'assurer qu'ils fonctionneront correctement en situation critique réelle.",
    category: "Sécurité"
  },
  {
    id: 101,
    question: "Qu'est-ce qu'une bouée de communication?",
    answer: "Bouée larguée remontant en surface pour transmettre messages sans révéler position du sous-marin.",
    category: "Opérations"
  },
  {
    id: 102,
    question: "Comment un sous-marin produit-il son électricité?",
    answer: "Par générateurs entraînés par le réacteur nucléaire ou moteurs diesel.",
    category: "Systèmes"
  },
  {
    id: 103,
    question: "Qu'est-ce que la propulsion turbo-électrique?",
    answer: "Système où turbines génèrent électricité pour moteurs électriques entraînant l'hélice.",
    category: "Systèmes"
  },
  {
    id: 104,
    question: "Pourquoi les sous-marins nucléaires sont-ils plus grands?",
    answer: "Pour accommoder le réacteur nucléaire, son blindage et systèmes de refroidissement.",
    category: "Systèmes"
  },
  {
    id: 105,
    question: "Qu'est-ce qu'un réacteur à eau pressurisée?",
    answer: "Type de réacteur nucléaire maintenant l'eau sous haute pression pour éviter ébullition.",
    category: "Systèmes"
  },
  {
    id: 106,
    question: "Comment refroidir le réacteur nucléaire?",
    answer: "Circuit primaire transporte chaleur vers échangeurs refroidis par eau de mer.",
    category: "Systèmes"
  },
  {
    id: 107,
    question: "Qu'est-ce que la radioprotection à bord?",
    answer: "Mesures et équipements protégeant l'équipage des radiations du réacteur.",
    category: "Sécurité"
  },
  {
    id: 108,
    question: "Pourquoi blinder le compartiment réacteur?",
    answer: "Pour contenir les radiations et protéger l'équipage des expositions dangereuses.",
    category: "Sécurité"
  },
  {
    id: 109,
    question: "Qu'est-ce qu'une turbine à vapeur?",
    answer: "Machine convertissant énergie de vapeur haute pression en rotation mécanique.",
    category: "Systèmes"
  },
  {
    id: 110,
    question: "Comment gérer les déchets à bord?",
    answer: "Compactage et stockage pour élimination au port, ou éjection autorisée en haute mer.",
    category: "Opérations"
  },
  {
    id: 111,
    question: "Qu'est-ce que l'eau douce à bord?",
    answer: "Eau potable produite par distillation de l'eau de mer, ressource précieuse à économiser.",
    category: "Systèmes"
  },
  {
    id: 112,
    question: "Comment produire eau douce en mer?",
    answer: "Par évaporateurs utilisant chaleur du réacteur pour distiller l'eau de mer.",
    category: "Systèmes"
  },
  {
    id: 113,
    question: "Qu'est-ce que le poste de sécurité?",
    answer: "État d'alerte accrue où l'équipage est aux postes de combat et systèmes en alerte maximale.",
    category: "Opérations"
  },
  {
    id: 114,
    question: "Pourquoi effectuer des quarts?",
    answer: "Rotation de l'équipage assurant surveillance continue des systèmes 24h/24.",
    category: "Opérations"
  },
  {
    id: 115,
    question: "Qu'est-ce qu'un homme de barre?",
    answer: "Membre d'équipage contrôlant gouvernail et barres de plongée pour diriger le sous-marin.",
    category: "Opérations"
  },
  {
    id: 116,
    question: "Qu'est-ce que le chef de quart?",
    answer: "Officier responsable de la surveillance et conduite du sous-marin pendant son quart.",
    category: "Opérations"
  },
  {
    id: 117,
    question: "Pourquoi maintenir silence à bord?",
    answer: "Réduire émissions sonores détectables et maintenir discipline opérationnelle.",
    category: "Tactique"
  },
  {
    id: 118,
    question: "Qu'est-ce qu'une patrouille opérationnelle?",
    answer: "Mission de durée prolongée en zone opérationnelle, maintenant discrétion absolue.",
    category: "Opérations"
  },
  {
    id: 119,
    question: "Comment un sous-marin évite-t-il collision?",
    answer: "Par surveillance sonar constante, calculs trajectoires et respect distances sécurité.",
    category: "Navigation"
  },
  {
    id: 120,
    question: "Qu'est-ce que la distance de sécurité?",
    answer: "Distance minimale à maintenir d'autres navires pour éviter collision et détection.",
    category: "Navigation"
  },
  {
    id: 121,
    question: "Pourquoi connaître bathymétrie?",
    answer: "Carte des fonds marins essentielle pour navigation sûre et éviter échouement.",
    category: "Navigation"
  },
  {
    id: 122,
    question: "Qu'est-ce qu'un canyon sous-marin?",
    answer: "Vallée profonde sous-marine pouvant masquer sous-marin ou créer effets acoustiques.",
    category: "Navigation"
  },
  {
    id: 123,
    question: "Comment utiliser la topographie pour se cacher?",
    answer: "Se positionner derrière reliefs sous-marins bloquant ondes sonar ennemies.",
    category: "Tactique"
  },
  {
    id: 124,
    question: "Qu'est-ce que le courant marin?",
    answer: "Déplacement d'eau affectant navigation et consommation d'énergie du sous-marin.",
    category: "Navigation"
  },
  {
    id: 125,
    question: "Pourquoi éviter routes maritimes commerciales?",
    answer: "Réduire risques collision et éviter zones surveillance accrue.",
    category: "Tactique"
  },
  {
    id: 126,
    question: "Qu'est-ce qu'une zone de patrouille?",
    answer: "Secteur géographique assigné pour surveillance ou interception.",
    category: "Opérations"
  },
  {
    id: 127,
    question: "Comment maintenir position fixe sous l'eau?",
    answer: "Par ajustements constants propulsion et barres pour compenser courants.",
    category: "Navigation"
  },
  {
    id: 128,
    question: "Qu'est-ce que le pilote automatique?",
    answer: "Système maintenant cap et profondeur automatiquement, réduisant charge travail équipage.",
    category: "Systèmes"
  },
  {
    id: 129,
    question: "Pourquoi limiter accès certains compartiments?",
    answer: "Sécurité, radioprotection et discipline opérationnelle nécessitent contrôle accès.",
    category: "Sécurité"
  },
  {
    id: 130,
    question: "Qu'est-ce que la qualification sous-marinier?",
    answer: "Certification obtenue après formation prouvant maîtrise systèmes et procédures.",
    category: "Opérations"
  },
  {
    id: 131,
    question: "Pourquoi l'entraînement continu est-il important?",
    answer: "Maintenir compétences et préparer réactions automatiques en situations d'urgence.",
    category: "Opérations"
  },
  {
    id: 132,
    question: "Qu'est-ce que l'esprit d'équipage?",
    answer: "Cohésion et solidarité essentielles à survie et succès mission dans environnement confiné.",
    category: "Opérations"
  }
]

export function getRawQAById(id: number): RawQA | undefined {
  return rawAudioQA.find(qa => qa.id === id)
}

export function getRawQAByCategory(category: string): RawQA[] {
  return rawAudioQA.filter(qa => qa.category === category)
}
