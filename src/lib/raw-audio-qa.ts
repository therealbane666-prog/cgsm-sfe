export type QAItem = {
  q: string
  a: string
}

export const rawAudioQA: QAItem[] = [
  {
    q: "Quels sont les différents types d'extinction fixes à bord ?",
    a: "Les moyens d'extinction fixes comprennent : Azote CCN, Azote Batterie, CO2 TPC, et Brouillard d'eau."
  },
  {
    q: "D'où peut-on activer l'extinction par azote pour le CCN ?",
    a: "On peut activer l'extinction par azote pour le CCN depuis le pupitre KR au PCP à distance, ou depuis le local NAG en local. Les bouteilles sont situées en superstructure."
  },
  {
    q: "Qui autorise l'utilisation des moyens d'extinction fixes ?",
    a: "C'est le Chef du Service Détente/Sécurité, le CSD, qui autorise l'utilisation des moyens d'extinction fixes."
  },
  {
    q: "Combien de RIA fixes disposons-nous à bord ?",
    a: "Nous disposons de 4 RIA fixes à bord : MAM Milieu, MAM Sup, Cafétéria avec station mousse, et Cloison 70."
  },
  {
    q: "Où se situent les RIA fixes ?",
    a: "Les RIA fixes se situent à MAM Milieu, MAM Sup, à la Cafétéria, et à la Cloison 70."
  },
  {
    q: "Où peut-on installer des RIA de secours ?",
    a: "Deux RIA de secours peuvent être mis en place : dans la Coursive Commandant et dans la VE, à la porte sas arrière CCN."
  },
  {
    q: "Où se situent les pompes SF RIA ?",
    a: "Les pompes SF RIA se situent à l'AUX I, avec une pompe par bord. Elles puisent dans le régleur qui contient 48 tonnes."
  },
  {
    q: "Dans quelle caisse puisent les pompes SF brouillard d'eau avant ?",
    a: "Les pompes SF brouillard d'eau avant, situées au LTD, puisent dans la caisse SF Avant qui contient 4 mètres cubes."
  },
  {
    q: "Qu'implique la disposition en mode automatique du brouillard d'eau ?",
    a: "En mode automatique, s'il y a une détection au local SAT, le brouillard d'eau s'actionne automatiquement pour ce même local."
  },
  {
    q: "Quels sont les différents types de détecteurs incendie ?",
    a: "Il y a trois types de détecteurs : les détecteurs de fumée partout, les détecteurs de flammes dans les compartiments à risque avec brouillard d'eau, et les sondes de température dans les gaines FH, batteries et caisson à munitions."
  },
  {
    q: "Combien de centrales de détection disposons-nous ?",
    a: "Nous avons 2 Centrales de Détection Incendie, les CDI."
  },
  {
    q: "Où se trouvent les centrales de détection ?",
    a: "Les centrales de détection se trouvent au KSSP et au PCP."
  },
  {
    q: "Quels sont les modes de conduite du brouillard d'eau ?",
    a: "Il y a deux modes de conduite : le mode normal depuis le KSSP, et le mode secours depuis le tableau local LTD plus vannes en local."
  },
  {
    q: "D'où active-t-on le mode normal ?",
    a: "Le mode normal s'active depuis le KSSP."
  },
  {
    q: "Où se situent les vannes de secours ?",
    a: "Les vannes de secours sont situées dans chaque local protégé : MAM, DAR/GES, CUISINE, B210, D200, Souille, SAT, et Cafétéria."
  },
  {
    q: "Quels gaz sont surveillés à bord ?",
    a: "Les gaz surveillés sont : H2 dans les batteries, CO2 pour l'humain, O2 pour la fabrication d'oxygène, H2S dans les poulaines, CO dans le local DAR/GES, R134A pour le froid, THDCPD pour les MDCN, et l'hygrométrie."
  },
  {
    q: "D'où provient le H2 et quel est son danger ?",
    a: "Le H2 provient des batteries. Il présente un danger matériel et humain avec un risque d'explosion."
  },
  {
    q: "Quel gaz provient des poulaines et pourquoi est-il dangereux ?",
    a: "Le H2S provient des poulaines. Il est dangereux car il est neurotoxique et mortel pour l'humain."
  },
  {
    q: "Quels sont les rôles de l'ISS SECU ?",
    a: "L'ISS SECU permet une lutte à distance pour le brouillard d'eau, un renvoi d'informations des CDI vers les voyants en dur, et une redondance des mesures de températures des locaux à risque."
  },
  {
    q: "Quels sont les deux types d'ALS ?",
    a: "Il y a deux types d'ALS : l'ALS SMD pour la lutte incendie, et l'ALS SVE pour la lutte voie d'eau."
  },
  {
    q: "À quoi sert l'ALS SMD ?",
    a: "L'ALS SMD sert à la lutte incendie."
  },
  {
    q: "Quels types d'extincteurs disposons-nous ?",
    a: "Nous disposons d'extincteurs CO2 de 2 kg et 5 kg avec canule et tromblons, et d'extincteurs eau diffusée de 9 kg."
  },
  {
    q: "Quelle est la capacité des extincteurs CO2 ?",
    a: "Les extincteurs CO2 ont une capacité de 2 kg ou 5 kg."
  },
  {
    q: "Quel accessoire accompagne les extincteurs CO2 ?",
    a: "Les extincteurs CO2 sont accompagnés d'une canule et de tromblons."
  },
  {
    q: "Que signifie DASACR ?",
    a: "DASACR signifie : Donner l'alerte, Autoprotection, Secourir, Attaquer le sinistre, Confiner, et Rendre compte. C'est la procédure de l'intervenant de première intervention."
  },
  {
    q: "Quelle est la première action du DASACR ?",
    a: "La première action du DASACR est de Donner l'alerte."
  },
  {
    q: "Que fait-on si l'incendie n'est pas maîtrisé ?",
    a: "Si l'incendie n'est pas maîtrisé ou gérable, on Confine la zone, puis on Rend compte."
  },
  {
    q: "Quelles sont les réactions de l'intervenant lors d'un incendie ?",
    a: "L'intervenant doit donner l'alerte, s'équiper avec complétifs et masque SA, vérifier l'absence de personnel, attaquer le sinistre avec extincteurs, confiner si non éteint, et rendre compte."
  },
  {
    q: "Que fait le central lors de la détection d'un incendie ?",
    a: "Le central diffuse l'alerte, arrête et isole la ventilation, dispose les masques SA, met en fonction les RIA, contribue au 3 claires, remonte à l'Immersion de Sécurité avec assiette nulle et se dispose à reprendre la vue pour un assainissement au DAR."
  },
  {
    q: "À quelle immersion remonte-t-on lors d'un incendie ?",
    a: "On remonte à l'Immersion de Sécurité, l'IS."
  },
  {
    q: "D'où peut-on effectuer un isolement général de ventilation ?",
    a: "On peut effectuer un isolement général de ventilation depuis le KSSP avec le coup de poing Isolement Ventilation, ou depuis les Automates Locaux de ventilation."
  },
  {
    q: "À quoi sert le coup de poing en cloison 70 ?",
    a: "Le coup de poing en cloison 70 sert à l'arrêt des Unités de Climatisation du Mainteneur Auxiliaire Machines, les UCs du MAM."
  },
  {
    q: "Où se trouvent les automates locaux de ventilation ?",
    a: "Les automates locaux de ventilation se trouvent en Coursive vie, D200, Centrale ventil, et VE Sup Td."
  },
  {
    q: "Qui est le premier DDL à la mer ?",
    a: "Le Mécanicien Chef, le MDC, est le premier Directeur de la Lutte à la mer, dans un premier temps."
  },
  {
    q: "Qui prend le relais du DDL en second temps ?",
    a: "Le CSD, Chef du Service Détente/Sécurité, prend le relais du DDL dans un second temps."
  },
  {
    q: "Que se passe-t-il si le CSD est incapacité ?",
    a: "Si le CSD tombe ou est incapacité, c'est le CAN qui prend son relais."
  },
  {
    q: "Comment fonctionne la détection de dégagement d'eau ?",
    a: "Si une rupture franche du collecteur eau de mer avait lieu, le courant du circuit s'inverserait. Le Détecteur de Vitesse d'Écoulement détecte le sens du courant. Il faut au moins 2 détecteurs sur 3 pour confirmer."
  },
  {
    q: "Qu'est-ce qu'un DVE ?",
    a: "Un DVE est un Détecteur de Vitesse d'Écoulement qui détecte le sens du courant dans le circuit."
  },
  {
    q: "Combien de temps prend la fermeture après détection ?",
    a: "La fermeture se fait en 2 étapes : 1 seconde pour la détection, puis 4 secondes pour la fermeture des sectionnements. Total : 5 secondes."
  },
  {
    q: "Quelle est la température du circuit EV ?",
    a: "Le circuit Eau Vapeur, EV, fonctionne à 20°C en retour et 41°C en aller."
  },
  {
    q: "Quels sont deux abonnés du circuit EV ?",
    a: "Deux abonnés du circuit EV sont la Direction Systèmes, DS, et le Stockage Air, DY."
  },
  {
    q: "Comment fonctionne la réfrigération en zone avant ?",
    a: "En zone avant, l'Eau de Mer passe par un Échangeur Calorifique, puis EV passe par un autre Échangeur, puis EE passe par un Échangeur, puis FC passe par un Échangeur, et enfin vers les UC et UCs."
  },
  {
    q: "Quels diesels peut-on utiliser en immersion périscopique ?",
    a: "On peut utiliser le DAR, Diesel Alternateur Redresseur, en immersion périscopique. Le DAR est motocompressé et utilisable à l'IP et en surface."
  },
  {
    q: "Quel est le rôle principal des diesels ?",
    a: "Le rôle principal des diesels est de fournir du courant continu pour assurer la charge batterie et l'alimentation des auxiliaires indispensables."
  },
  {
    q: "Quels sont les rôles annexes des diesels ?",
    a: "Les rôles annexes des diesels sont la mise en dépression du bord pour essai, l'assainissement de l'atmosphère, et la mise en dépression de la Chaufferie Nucléaire."
  },
  {
    q: "Que provoque l'action du BP alerte du MDC ?",
    a: "L'action du BP alerte du MDC provoque la fermeture des Bac Main et Bac Quartier, l'arrêt des diesels, la fermeture de l'OAF et du Canon de Tête, et la fermeture du Schnorchel."
  },
  {
    q: "Quelles sont les servitudes des diesels ?",
    a: "Les servitudes des diesels sont : BM pour réfrigération eau de mer, BX pour réfrigération eau douce, huile et air comprimé, BQ pour échappement, et EG pour gazole."
  },
  {
    q: "À quoi sert le BM pour les diesels ?",
    a: "Le BM, Bac Main, sert à la réfrigération par eau de mer pour les diesels."
  },
  {
    q: "Quels sont les modes de conduite des diesels ?",
    a: "Les modes de conduite des diesels sont : mode normal depuis le Central Opération vue OGL KSSP, mode secours depuis le Tableau Local de Conduite, et mode grand secours depuis le local directement sur platine pneumatique."
  },
  {
    q: "D'où pilote-t-on en mode normal ?",
    a: "En mode normal, on pilote depuis le Central Opération, vue OGL au KSSP."
  },
  {
    q: "Comment fonctionne le mode grand secours ?",
    a: "Le mode grand secours fonctionne depuis le local directement sur la platine pneumatique."
  },
  {
    q: "Comment fermer toutes les purges simultanément ?",
    a: "On peut fermer toutes les purges simultanément avec le commutateur fermeture des purges qui se trouve au central."
  },
  {
    q: "Où se trouve le commutateur de fermeture ?",
    a: "Le commutateur de fermeture des purges se trouve au central."
  },
  {
    q: "À quoi sert la chasse rapide ?",
    a: "La chasse rapide permet un retour à la surface par la seule action de la chasse rapide en cas de rupture franche du collecteur Eau de Mer."
  },
  {
    q: "Où sont envoyées les eaux noires du bateau ?",
    a: "Les eaux noires du bateau sont envoyées dans les poulaines, FQ."
  },
  {
    q: "Quel est le volume de chaque poulaine ?",
    a: "Chaque poulaine a un volume de 1500 litres."
  },
  {
    q: "Combien de poulaines disposons-nous ?",
    a: "Nous disposons de deux poulaines."
  },
  {
    q: "Quelle est la longueur du Suffren ?",
    a: "Le Suffren mesure 99 mètres de long."
  },
  {
    q: "Quel est le diamètre de coque ?",
    a: "Le diamètre de coque est de 8,8 mètres."
  },
  {
    q: "Quel est le tirant d'eau moyen à quai ?",
    a: "Le tirant d'eau moyen à quai est de 7,60 mètres."
  },
  {
    q: "Que provoque le BP affalage prioritaire ?",
    a: "Le BP affalage prioritaire fait affaler tous les mâts sauf le TAF, Télémétrie Avant Flancs, si les mâts sont en commande automatique."
  },
  {
    q: "Quel mât ne s'affale pas ?",
    a: "Le TAF, Télémétrie Avant Flancs, ne s'affale pas lors de l'affalage prioritaire."
  },
  {
    q: "Qui actionne l'affalage prioritaire ?",
    a: "C'est le MDC, Mécanicien Chef, qui actionne l'affalage prioritaire."
  },
  {
    q: "Quels sont les couples de coque épaisse ?",
    a: "Les couples de coque épaisse sont les couples 25 et 120, qui sont des cloisons de coque épaisse."
  },
  {
    q: "Qu'est-ce que le porque ?",
    a: "Le porque, au couple 96, est un anneau de renforcement longitudinal en coque épaisse."
  },
  {
    q: "À quoi sert le couple 70 ?",
    a: "Le couple 70 définit la zone refuge Avant et fait partie du cofferdam avant entre les couples 69 et 70."
  },
  {
    q: "Qu'est-ce qu'une voie d'eau ?",
    a: "Une voie d'eau est une entrée d'eau d'origine inconnue, de débit non quantifiable, mettant en danger la sécurité du porteur, nécessitant des réactions énergiques et immédiates."
  },
  {
    q: "Quelle est la différence avec une fuite d'eau ?",
    a: "Une fuite d'eau est une entrée d'eau d'origine connue, de débit quantifiable, ne mettant pas en danger immédiat la sécurité, nécessitant des réactions proportionnées."
  },
  {
    q: "Quelle réaction nécessite une voie d'eau ?",
    a: "Une voie d'eau nécessite des réactions énergiques et immédiates."
  },
  {
    q: "Quel type d'acier est utilisé pour la coque épaisse ?",
    a: "L'acier utilisé pour la coque épaisse est le 80 HLES."
  },
  {
    q: "Que signifie HLES ?",
    a: "HLES signifie Haute Limite Élastique Soudable."
  },
  {
    q: "Quelles sont les propriétés de cet acier ?",
    a: "Cet acier possède une résistance à la pression extrême, une soudabilité pour l'assemblage, et une résilience aux chocs thermiques."
  },
  {
    q: "Qu'est-ce que l'immersion maximale ?",
    a: "L'immersion maximale, P, est la plus grande profondeur accessible volontairement, à tout moment, sans limitation de fréquence et de durée."
  },
  {
    q: "Comment calcule-t-on l'immersion extrême ?",
    a: "L'immersion extrême, Ie, se calcule comme P plus 96 mètres. C'est la profondeur maximale atteinte en cas d'incidents de barre ou voie d'eau."
  },
  {
    q: "Quelle est la formule de l'immersion de destruction ?",
    a: "L'immersion de destruction, ID, est égale à 1,5 fois P. C'est l'immersion pour laquelle un mode de défaillance de la coque est prévisible."
  },
  {
    q: "Quels sont les trois critères de sûreté nucléaire ?",
    a: "Les trois critères de sûreté nucléaire sont : maîtrise et contrôle de la radioactivité, évacuation de la puissance par le circuit primaire, et confinement des produits radioactifs avec 3 barrières."
  },
  {
    q: "Pourquoi évacuer la puissance du circuit primaire ?",
    a: "Il faut évacuer la puissance du circuit primaire pour éviter la surchauffe et maintenir la sûreté du réacteur."
  },
  {
    q: "Combien y a-t-il de barrières de confinement ?",
    a: "Il y a 3 barrières de confinement pour les produits radioactifs."
  },
  {
    q: "Que signifie une zone blanche ?",
    a: "Une zone blanche ne nécessite pas de dosimétrie et l'accès est non réglementé."
  },
  {
    q: "Quelle dosimétrie en zone verte ?",
    a: "En zone verte, zone contrôlée, on utilise une dosimétrie passive plus une dosimétrie active."
  },
  {
    q: "Quelle zone est interdite d'accès ?",
    a: "La zone rouge est interdite d'accès."
  },
  {
    q: "Comment la chaleur est-elle produite ?",
    a: "La chaleur est produite par la fission d'atomes d'uranium dans le réacteur nucléaire."
  },
  {
    q: "Quel élément transfère la chaleur au circuit secondaire ?",
    a: "Ce sont les épingles du Générateur de Vapeur, le GV, qui transfèrent la chaleur au circuit secondaire."
  },
  {
    q: "Que fait la vapeur produite ?",
    a: "La vapeur sous pression fait tourner les turbines de propulsion et l'alternateur-redresseur."
  },
  {
    q: "Pourquoi les interphones SAT sont-ils spéciaux ?",
    a: "Les interphones SAT sont spéciaux car le SAT est un local avec des armes, nécessitant des équipements ATEX pour atmosphère explosive."
  },
  {
    q: "Qu'est-ce qu'un IMS ATEX ?",
    a: "Un IMS ATEX est un Interphone Mobile de Sécurité conçu pour les atmosphères explosives, ne générant pas d'étincelle."
  },
  {
    q: "Dans quels locaux utilise-t-on l'IMS ATEX ?",
    a: "On utilise l'IMS ATEX dans les locaux diesels, batteries et SAT."
  },
  {
    q: "Quelles sont les fonctionnalités du MOA ?",
    a: "Le MOA, Mât Optronique d'Attaque, dispose de GPS, Guerre Électronique, Infra Rouge, et Interconnexion."
  },
  {
    q: "Quelle différence entre MOA et MOV ?",
    a: "Le MOA dispose de GPS et est plus discret. Le MOV, Mât Optronique de Veille, dispose de GE gonio, Infra Rouge et IC."
  },
  {
    q: "Pourquoi privilégier le MOA ?",
    a: "On privilégie le MOA car il est plus discret avec un faible sillage et une faible indiscrétion optique."
  },
  {
    q: "Que signifie CPA ?",
    a: "CPA signifie Point d'Approche le plus Proche, le Closest Point of Approach. C'est le point où un contact sera le plus proche de notre trajectoire."
  },
  {
    q: "Qu'est-ce que la DMP ?",
    a: "La DMP est la Distance Minimale de Passage, la distance de sécurité à maintenir avec un contact."
  },
  {
    q: "Quelle est la DMP sur un commerce à l'IP ?",
    a: "La DMP sur un commerce à l'Immersion Périscopique est de 2000 mètres."
  },
  {
    q: "Combien de types de DIV existe-t-il ?",
    a: "Il existe 6 types de Domaines d'Immersion de Veille : grands fonds avec ou sans butées, petits fonds avec ou sans butées, très petits fonds avec ou sans butées."
  },
  {
    q: "Quelle est la limite des très petits fonds ?",
    a: "La limite des très petits fonds est l'isobathe des 85 mètres."
  },
  {
    q: "Quels sont les risques en vitesse et immersion importantes ?",
    a: "En vitesse et immersion importantes, il y a danger d'avarie de barre à descendre."
  },
  {
    q: "À quelle distance commence les petits fonds ?",
    a: "Le passage en petits fonds commence à 2000 mètres de l'isobathe des 450 mètres, ou moins 30 mètres du FSQG."
  },
  {
    q: "Quelle est l'isobathe limite des très petits fonds ?",
    a: "L'isobathe limite des très petits fonds est 85 mètres, qui correspond à l'IS plus 30."
  },
  {
    q: "Quelles dispositions en petits fonds ?",
    a: "La navigation en petits fonds nécessite du personnel au sondeur avec sonar actif et un ORSP. Les dispositions détaillées sont dans les instructions pour la mer du commandant."
  },
  {
    q: "Pourquoi surveiller l'atmosphère pour l'humain ?",
    a: "Pour l'humain, on surveille la teneur en oxygène avec CVO2 et PPO2 contre l'anoxie-hypoxie, le CO2, les COV, et le R134A pour éviter les risques physiologiques."
  },
  {
    q: "Quels risques matériels liés à l'atmosphère ?",
    a: "Pour le matériel, on surveille l'hygrométrie contre les défauts d'isolement, la température contre les précurseurs d'incendie ou le froid excessif."
  },
  {
    q: "Que surveille-t-on pour éviter l'explosion ?",
    a: "Pour éviter l'explosion, on surveille le H2 dans les batteries et le THDCPD pour les MDCN."
  },
  {
    q: "Quels types d'armes le Suffren peut-il embarquer ?",
    a: "Le Suffren peut embarquer des torpilles F21, des missiles SM39 pour la surface, et des missiles MdCN pour la frappe terre."
  },
  {
    q: "Quelle arme est surveillée en SAT ?",
    a: "La seule arme surveillée en SAT est la F21."
  },
  {
    q: "Pourquoi surveiller la F21 ?",
    a: "On surveille la F21 car elle dispose de capteurs et liaisons permettant un suivi constant pour des raisons de sécurité."
  },
  {
    q: "À quoi sert la pesée de référence ?",
    a: "La pesée de référence permet d'anticiper la valeur du régleur et du compensateur lors de la plongée, ou de donner une valeur de référence au central."
  },
  {
    q: "Qu'est-ce que la pesée standard ?",
    a: "La pesée standard est un suivi de la pesée en se comparant à la dernière pesée de référence afin de savoir si on est léger ou lourd."
  },
  {
    q: "Quels paramètres impactent la pesée ?",
    a: "Les paramètres qui impactent la pesée sont l'environnement avec la densité, le volume lié à l'immersion, les vivres, la production d'eau, les poulaines, et le CAC."
  },
  {
    q: "Quels sont les trois profils bathycélérimétriques principaux ?",
    a: "Les trois profils principaux sont la Bathy Mike d'été en Méditerranée, la Bathy India, et la Bathy Novembre."
  },
  {
    q: "Comment est une bathy d'été en Méditerranée ?",
    a: "Une bathy Mike d'été en Méditerranée présente une couche de surface chaude, une thermocline marquée, et une couche profonde froide. Elle est favorable pour se cacher sous la thermocline."
  },
  {
    q: "Quelle bathy est la plus favorable ?",
    a: "La Bathy Novembre est très favorable avec une température homogène permettant propagation directe du son, mais avec alourdissement dans la couche."
  },
  {
    q: "Quel est le but de la discrétion acoustique ?",
    a: "Le but de la discrétion acoustique est de minimiser notre signature sonore pour éviter la détection."
  },
  {
    q: "Quels sont les trois types de bruits ?",
    a: "Les trois types de bruits sont : les bruits mécaniques des auxiliaires tournants, pompes et turbines ; les bruits hydrodynamiques de l'écoulement et de l'hélice ; et les bruits du réseau électrique."
  },
  {
    q: "Comment réduire le bruit mécanique ?",
    a: "On réduit le bruit mécanique avec des plots antivibratoires, des berceaux, le module pompe-hélice MPH, et des gaines acoustiques."
  },
  {
    q: "Quelle différence entre sonar actif et passif ?",
    a: "Le sonar passif écoute les sons sans émettre et ne révèle pas notre position. Le sonar actif émet des ondes et écoute l'écho, mais révèle notre position."
  },
  {
    q: "Pourquoi privilégier le sonar passif ?",
    a: "On privilégie le sonar passif pour la discrétion car il ne révèle pas notre position."
  },
  {
    q: "Quels sonars actifs sur le Suffren ?",
    a: "Les sonars actifs sur le Suffren sont le sondeur et le sonar d'évitement."
  },
  {
    q: "Quels sont les senseurs acoustiques du Suffren ?",
    a: "Les senseurs acoustiques sont les antennes flancs en passif, l'antenne remorquée UBF en passif ultra basse fréquence, le sonar cylindrique en actif et passif, et le sondeur en actif."
  },
  {
    q: "Quels sont les mâts optroniques ?",
    a: "Les mâts optroniques sont le MOA, Mât Optronique d'Attaque, le MOV, Mât Optronique de Veille, et le TAF, Télémétrie Avant Flancs."
  },
  {
    q: "À quoi sert l'antenne remorquée UBF ?",
    a: "L'antenne remorquée UBF, Ultra Basse Fréquence, sert à l'écoute passive à très longue portée."
  },
  {
    q: "Quand la Minerve a-t-elle été perdue ?",
    a: "La Minerve a été perdue le 27 janvier 1968 au large des côtes de Toulon."
  },
  {
    q: "Quelle était la cause de l'accident ?",
    a: "L'accident a été causé par une avarie de barre de plongée bloquée à angle fort pendant la relève de quart. La priorité donnée à la réaction alerte plutôt qu'à l'avarie de barre n'a pas permis de contrer l'avarie, menant à l'implosion."
  },
  {
    q: "Quels enseignements en a-t-on tirés ?",
    a: "Les enseignements tirés sont : entraînement SEC PLONG plus important, relève de quart différée, vigilance sur les traversées de coque, bouée largage, et pesée rigoureuse."
  },
  {
    q: "Quel type d'incident sur le HMS Turbulent ?",
    a: "Le HMS Turbulent a subi un incendie en verticale électrique le 30 avril 1992 à quai à Devonport, réacteur critique."
  },
  {
    q: "Quels problèmes ont été rencontrés ?",
    a: "Les problèmes rencontrés étaient que la fumée et la chaleur empêchaient l'intervention initiale, il n'y avait pas de caméra thermique au début, et la communication était défaillante avec le DDL qui n'avait pas de moyens de communication."
  },
  {
    q: "Quels enseignements sur l'entraînement ?",
    a: "Les enseignements sont que l'atmosphère devient irrespirable quasi instantanément, le suivi de localisation du personnel est impératif, l'entraînement ne peut que s'approcher du chaos réel, et il faut des scénarios multiples simultanés."
  }
]
