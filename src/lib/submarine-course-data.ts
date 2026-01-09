export type CourseSection = {
  id: string
  title: string
  category: string
  content: string
  questions: string[]
  relatedQuizType?: string
}

export const submarineCourseContent: CourseSection[] = [
  {
    id: 'sec-moyens-extinction',
    title: 'Moyens d\'extinction fixes',
    category: 'SÉCURITÉ',
    content: `Les moyens d'extinction fixes comprennent :
- Azote CCN : PCP (pupitre KR) à distance et local NAG en local ; Bouteilles en superstructure.
- Azote Batterie : Pupitre KSSP à distance et AUX II (Batterie Av) + LASCAR (Batterie AR) en local.
- CO2 TPC : Pupitre KSSP à distance et Local Élec 4 (TPC 4) + Coursive PCP (TPC 3) + VE (TPC 1/2) en local.
- Brouillard d'eau : Pupitre KSSP à distance (DAR, GES, MAM, SAT, CUISINE) + LTO/LASCAR pour commande locale.
Autorisation : C'est le Chef du Service Détente/Sécurité (CSD) qui les autorise.`,
    questions: [
      'Quels sont les différents types d\'extinction fixes à bord ?',
      'D\'où peut-on activer l\'extinction par azote pour le CCN ?',
      'Qui autorise l\'utilisation des moyens d\'extinction fixes ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'sec-ria',
    title: 'Robinets d\'Incendie Armés (RIA)',
    category: 'SÉCURITÉ',
    content: `Nous disposons de 4 RIA fixes : MAM Milieu, MAM Sup, Cafétéria (avec station mousse), Cloison 70.
Deux RIA de secours peuvent être mis en place : Coursive Commandant et VE (porte sas Ar CCN).
La particularité du RIA le plus à l'avant (Cloison 70) est qu'il dispose d'une station mousse intégrée.`,
    questions: [
      'Combien de RIA fixes disposons-nous à bord ?',
      'Où se situent les RIA fixes ?',
      'Où peut-on installer des RIA de secours ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'sec-pompes-sf',
    title: 'Pompes Servitudes Feu',
    category: 'SÉCURITÉ',
    content: `Pompes SF RIA : AUX I, 1 pompe par bord, puisent dans le régleur (48t).
Pompes SF Brouillard d'eau : À l'Avant (LTD), puise dans la caisse SF Av (4m³) ; à l'Arrière (LASCAR), puise dans la caisse SF/MG (6,5m³).
Mode automatique : S'il y a une détection au local SAT, le brouillard d'eau s'actionne automatiquement pour ce même local.
Activation : Il est actionné lorsqu'il y a présence d'un Missile De Croisière Naval (MDCN) à bord.
Arrêt : Après 3 minutes de fonctionnement ou sur feu éteint.`,
    questions: [
      'Où se situent les pompes SF RIA ?',
      'Dans quelle caisse puisent les pompes SF brouillard d\'eau avant ?',
      'Qu\'implique la disposition en mode automatique du brouillard d\'eau ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'sec-detecteurs',
    title: 'Détecteurs incendie et centrales',
    category: 'SÉCURITÉ',
    content: `Types de détecteurs : Détecteurs de fumée (partout), Détecteurs de flammes (compartiments à risque/brouillard d'eau), Sonde de température (gaine FH, batteries, caisson à munitions).
Centrales : Nous avons 2 Centrales de Détection Incendie (CDI) : KSSP & PCP.
Le système ISS SECU permet une lutte à distance pour le brouillard d'eau, un renvoi d'informations des CDI vers les voyants en dur, et une redondance des mesures de températures des locaux à risque.`,
    questions: [
      'Quels sont les différents types de détecteurs incendie ?',
      'Combien de centrales de détection disposons-nous ?',
      'Où se trouvent les centrales de détection ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'sec-brouillard-modes',
    title: 'Modes de conduite du brouillard d\'eau',
    category: 'SÉCURITÉ',
    content: `Mode normal : Depuis le KSSP.
Mode secours : Depuis le tableau local LTD + vannes en local (MAM, DAR/GES, CUISINE, B210, D200, Souille, SAT, Caf).
Les vannes de secours sont situées dans chaque local protégé pour permettre une activation locale en cas de défaillance du système centralisé.`,
    questions: [
      'Quels sont les modes de conduite du brouillard d\'eau ?',
      'D\'où active-t-on le mode normal ?',
      'Où se situent les vannes de secours ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'sec-gaz-surveillance',
    title: 'Gaz surveillés dans l\'atmosphère',
    category: 'SÉCURITÉ',
    content: `Les différents gaz surveillés sont :
- H2 : Batterie (danger matériel/humain - risque d'explosion)
- CO2 : Humain (risque d'asphyxie)
- O2 : Fabrication d'Oxygène (FB) (danger matériel/humain)
- H2S : Poulaines (danger humain, neurotoxique/mortel)
- CO : Local DAR/GES (danger humain - intoxication)
- R134A : Froid Vapeur (FV)/Eau Eau (EE)/Froid Central (FC) (danger humain)
- THDCPD : MDCN (danger matériel)
- Hygrométrie : Surveillance de l'humidité`,
    questions: [
      'Quels gaz sont surveillés à bord ?',
      'D\'où provient le H2 et quel est son danger ?',
      'Quel gaz provient des poulaines et pourquoi est-il dangereux ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'sec-iss-secu-als',
    title: 'ISS SECU et Automatismes de Lutte',
    category: 'SÉCURITÉ',
    content: `Rôles de l'ISS Sécu : Permet une lutte à distance pour le brouillard d'eau, un renvoi d'informations des CDI vers les voyants en dur, et une redondance des mesures de températures des locaux à risque.
Deux types d'ALS :
- ALS SMD : pour la lutte incendie
- ALS SVE : pour la lutte voie d'eau
Ces automatismes permettent une réaction rapide et coordonnée en cas d'incident majeur.`,
    questions: [
      'Quels sont les rôles de l\'ISS SECU ?',
      'Quels sont les deux types d\'ALS ?',
      'À quoi sert l\'ALS SMD ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'sec-materiels-mobiles',
    title: 'Matériels mobiles de lutte incendie',
    category: 'SÉCURITÉ',
    content: `Les différents matériels mobiles comprennent :
- Extincteur CO2 (2 kg & 5 kg, avec canule et tromblons)
- Extincteur eau diffusée (9 kg)
Ces équipements sont répartis stratégiquement dans le sous-marin pour permettre une intervention rapide en cas d'incendie.`,
    questions: [
      'Quels types d\'extincteurs disposons-nous ?',
      'Quelle est la capacité des extincteurs CO2 ?',
      'Quel accessoire accompagne les extincteurs CO2 ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'sec-dasacr',
    title: 'Le DASACR',
    category: 'SÉCURITÉ',
    content: `DASACR est l'acronyme pour les actions immédiates de l'intervenant de première intervention (II1) :
D - Donner l'alerte
A - Autoprotection (s'équiper : complétifs, masque SA)
S - Secourir (vérifier l'absence de personnel)
A - Attaquer le sinistre (avec extincteurs)
C - Confiner (si non éteint/gérable)
R - Rendre compte
Cette procédure structure l'intervention en cas d'incendie.`,
    questions: [
      'Que signifie DASACR ?',
      'Quelle est la première action du DASACR ?',
      'Que fait-on si l\'incendie n\'est pas maîtrisé ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'sec-incendie-aux1',
    title: 'Réaction incendie AUX1',
    category: 'SÉCURITÉ',
    content: `Lors de la découverte d'un incendie à l'AUX1 tribord avant :
Réactions personnelles : Donner l'alerte, s'équiper (complétifs, masque SA), vérifier l'absence de personnel, attaquer le sinistre (extincteurs), confiner si non éteint/gérable, rendre compte.
Réactions du Central : Diffuse l'alerte, arrête et isole la ventilation, dispose les masques SA, met en fonction les RIA, contribue au 3 claires, remonte à l'Immersion de Sécurité (IS) avec assiette nulle et se dispose à reprendre la vue pour un assainissement au DAR.`,
    questions: [
      'Quelles sont les réactions de l\'intervenant lors d\'un incendie ?',
      'Que fait le central lors de la détection d\'un incendie ?',
      'À quelle immersion remonte-t-on lors d\'un incendie ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'sec-isolement-ventilation',
    title: 'Isolement général de ventilation',
    category: 'SÉCURITÉ',
    content: `L'isolement général de ventilation peut être effectué depuis :
- Le KSSP (avec le coup de poing "Isolement Ventilation")
- Les Automates Locaux (AL) de ventilation situés en : Coursive vie, D200, Centrale ventil, VE Sup Td
Le coup de poing en cloison 70 sert à l'arrêt des Unités de Climatisation (UCs) du Mainteneur Auxiliaire Machines (MAM).`,
    questions: [
      'D\'où peut-on effectuer un isolement général de ventilation ?',
      'À quoi sert le coup de poing en cloison 70 ?',
      'Où se trouvent les automates locaux de ventilation ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'sec-organisation-mer',
    title: 'Organisation sécurité à la mer',
    category: 'SÉCURITÉ',
    content: `Organisation : Le Mécanicien Chef (MDC) prend le rôle de Directeur de la Lutte (DDL) dans un premier temps, le temps que le CSD rallie le central.
Le CSD prend le rôle de DDL dans un second temps. Si le CSD tombe, c'est le CAN qui prend son relais.
Cette organisation assure une continuité du commandement en cas d'incident majeur.`,
    questions: [
      'Qui est le premier DDL à la mer ?',
      'Qui prend le relais du DDL en second temps ?',
      'Que se passe-t-il si le CSD est incapacité ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'du-de-detection',
    title: 'Détection Dégagement d\'Eau (DE)',
    category: 'DU / CU / DE',
    content: `Détection du Dégagement d'Eau du circuit Eau de Mer (MC) :
Si une rupture franche du collecteur avait lieu, le courant du circuit s'inverserait.
La détection du sens du courant se fait par le Détecteur de Vitesse d'Écoulement (DVE).
Il faut au moins 2 détecteurs sur 3 pour confirmer la détection.
La fermeture du circuit Distribution d'Usage (DU) se fait en 2 étapes :
- 1 seconde pour la détection
- 4 secondes pour la fermeture des sectionnements`,
    questions: [
      'Comment fonctionne la détection de dégagement d\'eau ?',
      'Qu\'est-ce qu\'un DVE ?',
      'Combien de temps prend la fermeture après détection ?'
    ],
    relatedQuizType: 'systemes'
  },
  {
    id: 'refrig-circuits',
    title: 'Circuits de réfrigération',
    category: 'RÉFRIGÉRATION',
    content: `Températures des circuits :
Circuit Eau Vapeur (EV) : 20°C / 41°C
Abonnés EV : Direction Systèmes (DS), Stockage Air (DY)

Circuit Eau Eau (EE) : 8°C
Abonnés EE : Syracuse, Froid Central (FC)

Principe de réfrigération zone avant :
Eau de Mer (EN) → Échangeur Calorifique → EV → Échangeur Calorifique → EE → Échangeur Calorifique → FC → Échangeur Calorifique → UC/UCs`,
    questions: [
      'Quelle est la température du circuit EV ?',
      'Quels sont deux abonnés du circuit EV ?',
      'Comment fonctionne la réfrigération en zone avant ?'
    ],
    relatedQuizType: 'systemes'
  },
  {
    id: 'diesels-utilisation',
    title: 'Diesels : utilisation et modes',
    category: 'DIESELS',
    content: `Diesels utilisables :
DAR (Diesel Alternateur Redresseur) : Motocompressé, utilisable à l'Immersion Périscopique (IP) et en surface.
GES (Groupe Électrogène de Secours) : Turbocompressé, utilisable uniquement en surface.

Rôle principal : Fournir du courant continu pour assurer la charge batterie et l'alimentation des auxiliaires indispensables.

Rôles secondaires : Mise en dépression du bord pour essai, assainissement de l'atmosphère, mise en dépression de la Chaufferie Nucléaire (CCN).`,
    questions: [
      'Quels diesels peut-on utiliser en immersion périscopique ?',
      'Quel est le rôle principal des diesels ?',
      'Quels sont les rôles annexes des diesels ?'
    ],
    relatedQuizType: 'systemes'
  },
  {
    id: 'diesels-bp-alerte',
    title: 'BP Alerte MDC et servitudes diesels',
    category: 'DIESELS',
    content: `L'action du BP "alerte" du MDC provoque :
- Fermeture des Bac Main (BM) / Bac Quartier (BQ)
- Arrêt des diesels
- Fermeture de l'Optique Avant Flancs (OAF) et du Canon de Tête (Cdt)
- Fermeture du Schnorchel

Servitudes des diesels :
- BM : Réfrigération eau de mer
- BX : Réfrigération eau douce, huile, air comprimé
- BQ : Échappement
- EG : Gazole`,
    questions: [
      'Que provoque l\'action du BP alerte du MDC ?',
      'Quelles sont les servitudes des diesels ?',
      'À quoi sert le BM pour les diesels ?'
    ],
    relatedQuizType: 'systemes'
  },
  {
    id: 'diesels-modes-conduite',
    title: 'Modes de conduite des diesels',
    category: 'DIESELS',
    content: `Les différents modes de conduite des diesels sont :
Mode normal : Depuis le Central Opération, vue OGL KSSP
Mode secours : Depuis le Tableau Local de Conduite
Mode grand secours : Depuis le local directement sur platine pneumatique

Cette hiérarchie permet d'assurer la continuité d'exploitation en cas de défaillance des systèmes de commande.`,
    questions: [
      'Quels sont les modes de conduite des diesels ?',
      'D\'où pilote-t-on en mode normal ?',
      'Comment fonctionne le mode grand secours ?'
    ],
    relatedQuizType: 'systemes'
  },
  {
    id: 'chasse-purges-fermeture',
    title: 'Fermeture des purges',
    category: 'CHASSE ET PURGES',
    content: `Le commutateur fermeture des purges permet de fermer toutes les purges simultanément.
Il se trouve au central.

La chasse rapide est définie pour permettre un retour à la surface par la seule action de la chasse rapide en cas de rupture franche du collecteur Eau de Mer (EM).

Cette fonction est critique pour la sécurité du sous-marin en cas d'avarie majeure.`,
    questions: [
      'Comment fermer toutes les purges simultanément ?',
      'Où se trouve le commutateur de fermeture ?',
      'À quoi sert la chasse rapide ?'
    ],
    relatedQuizType: 'systemes'
  },
  {
    id: 'fq-eaux-noires',
    title: 'Gestion des eaux noires',
    category: 'ER / FQ',
    content: `Les eaux noires du bateau sont envoyées dans les poulaines (FQ).
Il y en a deux, et leur volume est de 1500 litres chacune.
Ces caisses doivent être régulièrement vidangées et entretenues pour assurer l'hygiène et le bon fonctionnement du sous-marin.`,
    questions: [
      'Où sont envoyées les eaux noires du bateau ?',
      'Quel est le volume de chaque poulaine ?',
      'Combien de poulaines disposons-nous ?'
    ],
    relatedQuizType: 'systemes'
  },
  {
    id: 'coque-dimensions',
    title: 'Dimensions du Suffren',
    category: 'COQUE',
    content: `Dimensions du Suffren :
- Longueur : 99m
- Hauteur quille/massif : 16m
- Diamètre de coque : 8,8m
- Largeur (DP AV déployées) : 17,75m
- Tirant d'eau moyen à quai : 7,60m

Ces dimensions font du Suffren l'un des plus grands sous-marins nucléaires d'attaque au monde.`,
    questions: [
      'Quelle est la longueur du Suffren ?',
      'Quel est le diamètre de coque ?',
      'Quel est le tirant d\'eau moyen à quai ?'
    ],
    relatedQuizType: 'operations'
  },
  {
    id: 'coque-affalage-prioritaire',
    title: 'Affalage prioritaire des mâts',
    category: 'COQUE',
    content: `Le BP "affalage prioritaire" fait affaler tous les mâts sauf le Télémétrie Avant Flancs (TAF) si les mâts sont en commande automatique.
Elle est effectuée sur le coffret d'alerte.
C'est le MDC qui l'actionne.

Cette fonction est utilisée en cas d'urgence nécessitant une plongée rapide.`,
    questions: [
      'Que provoque le BP affalage prioritaire ?',
      'Quel mât ne s\'affale pas ?',
      'Qui actionne l\'affalage prioritaire ?'
    ],
    relatedQuizType: 'operations'
  },
  {
    id: 'coque-couples-principaux',
    title: 'Couples principaux et porque',
    category: 'COQUE',
    content: `Couples principaux :
- 25 et 120 : Cloisons de coque épaisse
- 70 : Définit la zone refuge Avant (fait partie du cofferdam avant 69-70)
- Porque (96) : Anneau de renforcement longitudinal en coque épaisse

Ces éléments structurels assurent l'intégrité de la coque sous pression.`,
    questions: [
      'Quels sont les couples de coque épaisse ?',
      'Qu\'est-ce que le porque ?',
      'À quoi sert le couple 70 ?'
    ],
    relatedQuizType: 'maintenance'
  },
  {
    id: 'survie-definitions',
    title: 'Voie d\'eau vs fuite d\'eau',
    category: 'SURVIE SAUVETAGE',
    content: `Voie d'eau : Entrée d'eau d'origine inconnue, de débit non quantifiable, mettant en danger la sécurité du porteur, nécessitant des réactions énergiques et immédiates.

Fuite d'eau : Entrée d'eau d'origine connue, de débit quantifiable, ne mettant pas en danger de façon immédiate la sécurité du porteur, nécessitant des réactions proportionnées.

La distinction est cruciale pour adapter la réponse appropriée.`,
    questions: [
      'Qu\'est-ce qu\'une voie d\'eau ?',
      'Quelle est la différence avec une fuite d\'eau ?',
      'Quelle réaction nécessite une voie d\'eau ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'survie-acier-coque',
    title: 'Acier de la coque épaisse',
    category: 'SURVIE SAUVETAGE',
    content: `L'acier utilisé pour la conception de la coque épaisse est le 80 HLES (Haute Limite Élastique Soudable).
Cet acier spécial possède des propriétés exceptionnelles :
- Résistance à la pression extrême
- Soudabilité pour l'assemblage
- Résilience aux chocs thermiques
Il permet au sous-marin de plonger à de grandes profondeurs en toute sécurité.`,
    questions: [
      'Quel type d\'acier est utilisé pour la coque épaisse ?',
      'Que signifie HLES ?',
      'Quelles sont les propriétés de cet acier ?'
    ],
    relatedQuizType: 'maintenance'
  },
  {
    id: 'survie-immersions',
    title: 'Définitions des immersions',
    category: 'SURVIE SAUVETAGE',
    content: `Immersion maximale (P) : La plus grande profondeur accessible volontairement, à tout moment, sans limitation de fréquence et de durée.

Immersion extrême (Ie) : P + 96m (profondeur maximale atteinte en cas d'incidents de barre ou voie d'eau).

Immersion de destruction (ID) : 1,5 x P (l'immersion pour laquelle un mode de défaillance de la coque est prévisible).`,
    questions: [
      'Qu\'est-ce que l\'immersion maximale ?',
      'Comment calcule-t-on l\'immersion extrême ?',
      'Quelle est la formule de l\'immersion de destruction ?'
    ],
    relatedQuizType: 'operations'
  },
  {
    id: 'chaufferie-criteres-surete',
    title: 'Critères de sûreté nucléaire',
    category: 'CHAUFFERIE',
    content: `Les trois critères de sûreté nucléaire sont :
1. Maîtrise et contrôle de la radioactivité
2. Évacuation de la puissance par le circuit primaire
3. Confinement des produits radioactifs (3 barrières de confinement)

Ces critères fondamentaux garantissent la sécurité de l'équipage et du sous-marin.`,
    questions: [
      'Quels sont les trois critères de sûreté nucléaire ?',
      'Pourquoi évacuer la puissance du circuit primaire ?',
      'Combien y a-t-il de barrières de confinement ?'
    ],
    relatedQuizType: 'systemes'
  },
  {
    id: 'chaufferie-zonage',
    title: 'Zonage radiologique',
    category: 'CHAUFFERIE',
    content: `Le zonage radiologique comprend :
- Blanc : pas besoin de dosimétrie, accès non réglementé
- Bleu : dosimétrie passive, zone surveillée
- Vert : dosimétrie passive + active, zone contrôlée
- Jaune : dosimétrie passive + active, accès réglementé, risque irradiation
- Orange : dosimétrie passive + active, accès réglementé, danger irradiation
- Rouge : accès interdit

Ce code couleur permet d'identifier rapidement les risques.`,
    questions: [
      'Que signifie une zone blanche ?',
      'Quelle dosimétrie en zone verte ?',
      'Quelle zone est interdite d\'accès ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'chaufferie-fonctionnement',
    title: 'Principe de fonctionnement de la chaufferie',
    category: 'CHAUFFERIE',
    content: `Principe de fonctionnement :
1. La fission d'atome d'uranium crée de la chaleur
2. Cette chaleur chauffe l'eau d'un premier circuit (circuit primaire)
3. Elle se transmet au circuit secondaire via les épingles du Générateur de Vapeur (GV) et la transforme en vapeur
4. La vapeur sous pression fait tourner les turbines de propulsion et l'alternateur-redresseur

Ce cycle permet de convertir l'énergie nucléaire en énergie mécanique puis électrique.`,
    questions: [
      'Comment la chaleur est-elle produite ?',
      'Quel élément transfère la chaleur au circuit secondaire ?',
      'Que fait la vapeur produite ?'
    ],
    relatedQuizType: 'systemes'
  },
  {
    id: 'sic-ims-atex',
    title: 'Interphones et IMS ATEX',
    category: 'SIC',
    content: `Les interphones sont différents en SAT car c'est un local avec des armes.
Le type d'Interphone Mobile de Sécurité (IMS) à utiliser dans les locaux diesels, batteries et SAT est l'IMS ATEX (atmosphère explosive).

ATEX désigne les zones où une atmosphère explosive peut se former. Ces interphones sont conçus pour ne pas générer d'étincelle.`,
    questions: [
      'Pourquoi les interphones SAT sont-ils spéciaux ?',
      'Qu\'est-ce qu\'un IMS ATEX ?',
      'Dans quels locaux utilise-t-on l\'IMS ATEX ?'
    ],
    relatedQuizType: 'operations'
  },
  {
    id: 'sic-mats-optroniques',
    title: 'Mâts optroniques MOV et MOA',
    category: 'SIC',
    content: `MOA (Mât Optronique d'Attaque) :
- GPS
- Guerre Électronique (GE)
- Infra Rouge
- Interconnexion (IC)

MOV (Mât Optronique de Veille) :
- GE gonio
- Infra Rouge
- IC

Priorité : Le MOA est privilégié car il est plus discret (faible sillage et faible indiscrétion optique).`,
    questions: [
      'Quelles sont les fonctionnalités du MOA ?',
      'Quelle différence entre MOA et MOV ?',
      'Pourquoi privilégier le MOA ?'
    ],
    relatedQuizType: 'operations'
  },
  {
    id: 'sic-cpa-dmp',
    title: 'CPA et DMP',
    category: 'SIC',
    content: `CPA : Point d'Approche le plus Proche - Le point où un contact sera le plus proche de notre trajectoire.

DMP : Distance Minimale de Passage - La distance de sécurité à maintenir avec un contact.

La DMP sur un commerce à l'Immersion Périscopique (IP) est de 2000 mètres.

Ces paramètres sont essentiels pour la sécurité de navigation et l'évitement des collisions.`,
    questions: [
      'Que signifie CPA ?',
      'Qu\'est-ce que la DMP ?',
      'Quelle est la DMP sur un commerce à l\'IP ?'
    ],
    relatedQuizType: 'operations'
  },
  {
    id: 'tactique-div',
    title: 'Domaines d\'Immersion de Veille (DIV)',
    category: 'TACTIQUE',
    content: `6 types de DIV :
- Grands fonds avec butées (fonds supérieurs à 450m)
- Grands fonds sans butées
- Petits fonds avec butées (fonds inférieurs à 450m)
- Petits fonds sans butées
- Très petits fonds avec butées (isobathe des 85m)
- Très petits fonds sans butées

4 Risques principaux :
- Surface/IS : Pas de risque vis-à-vis des bâtiments de surface
- Vitesse et immersion faibles : Difficultés à revenir à IS
- Vitesse faible et immersion importante : Danger de ne pouvoir adopter vitesse élevée
- Vitesse et immersion importantes : Avarie de barre à descendre`,
    questions: [
      'Combien de types de DIV existe-t-il ?',
      'Quelle est la limite des très petits fonds ?',
      'Quels sont les risques en vitesse et immersion importantes ?'
    ],
    relatedQuizType: 'tactique'
  },
  {
    id: 'tactique-petits-fonds',
    title: 'Navigation en petits fonds',
    category: 'TACTIQUE',
    content: `Passage en petits fonds : 2000m de l'isobathe des 450m ou moins 30m du FSQG.

La limite des petits fonds est caractérisée par l'isobathe des 85 mètres. Au-delà, le sous-marin navigue dans le domaine des "très petits fonds" (85m = IS + 30).

Navigation petits fonds nécessite : personnel au sondeur (sonar actif) et un ORSP. Dispositions détaillées dans les instructions pour la mer du commandant.`,
    questions: [
      'À quelle distance commence les petits fonds ?',
      'Quelle est l\'isobathe limite des très petits fonds ?',
      'Quelles dispositions en petits fonds ?'
    ],
    relatedQuizType: 'tactique'
  },
  {
    id: 'tactique-surveillance-atmo',
    title: 'Surveillance de l\'atmosphère',
    category: 'TACTIQUE',
    content: `Pourquoi surveiller l'atmosphère ?
1. Humain : teneur en oxygène (CVO2 / PPO2) - risque d'anoxie-hypoxie, CO2, COV, R134A (risque physiologique)
2. Matériel/machine : hygrométrie (risque de défaut d'isolement), température (risque de précurseur incendie ou trop froid), H2 batterie et THDCPD (risque d'explosion)

La surveillance continue est vitale pour la sécurité de l'équipage et du matériel.`,
    questions: [
      'Pourquoi surveiller l\'atmosphère pour l\'humain ?',
      'Quels risques matériels liés à l\'atmosphère ?',
      'Que surveille-t-on pour éviter l\'explosion ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'armes-types',
    title: 'Armes embarquées',
    category: 'ARMEMENT',
    content: `Les différents types d'armes pouvant être embarquées à bord du Suffren :
- Torpille F21 (nouvelle génération)
- Missile SM39 (surface)
- Missile MdCN (Missile de Croisière Naval - frappe terre)

La seule arme surveillée en SAT est la F21. Elle dispose de capteurs et liaisons permettant un suivi constant pour des raisons de sécurité.`,
    questions: [
      'Quels types d\'armes le Suffren peut-il embarquer ?',
      'Quelle arme est surveillée en SAT ?',
      'Pourquoi surveiller la F21 ?'
    ],
    relatedQuizType: 'tactique'
  },
  {
    id: 'ops-pesee',
    title: 'La pesée du sous-marin',
    category: 'OPÉRATIONS',
    content: `La pesée permet de connaître le poids exact et la répartition des masses à bord.

Pesée de référence : pour anticiper la valeur du régleur et du compensateur lors de la plongée, ou pour donner une valeur de référence au central.

Pesée standard : suivi de la pesée en se comparant à la dernière pesée de référence afin de savoir si on est léger ou lourd.

Paramètres impactant la pesée : Environnement (densité), volume (immersion), vivres, production d'eau, poulaines, CAC.`,
    questions: [
      'À quoi sert la pesée de référence ?',
      'Qu\'est-ce que la pesée standard ?',
      'Quels paramètres impactent la pesée ?'
    ],
    relatedQuizType: 'operations'
  },
  {
    id: 'ops-bathy-types',
    title: 'Types de bathycélérimétrie',
    category: 'OPÉRATIONS',
    content: `Les trois principaux profils bathycélérimétriques :

Bathy Mike (été Méditerranée) :
- Couche de surface chaude
- Thermocline marquée
- Couche profonde froide
- Favorable pour se cacher sous la thermocline

Bathy India : Favorable, gradient de température progressif

Bathy Novembre : Très favorable, température homogène permettant propagation directe du son, mais alourdissement dans la couche.`,
    questions: [
      'Quels sont les trois profils bathycélérimétriques principaux ?',
      'Comment est une bathy d\'été en Méditerranée ?',
      'Quelle bathy est la plus favorable ?'
    ],
    relatedQuizType: 'operations'
  },
  {
    id: 'ops-discretion-acoustique',
    title: 'Discrétion acoustique',
    category: 'OPÉRATIONS',
    content: `But de la discrétion acoustique : Minimiser notre signature sonore pour éviter la détection.

Types de bruits :
1. Bruits mécaniques : auxiliaires tournants, pompes, turbines
2. Bruits hydrodynamiques : écoulement de l'eau sur la coque, hélice
3. Bruits du réseau électrique : fréquences caractéristiques des moteurs alternatifs

Moyens de réduction : plots antivibratoires, berceaux, module pompe-hélice (MPH), gaines acoustiques.`,
    questions: [
      'Quel est le but de la discrétion acoustique ?',
      'Quels sont les trois types de bruits ?',
      'Comment réduire le bruit mécanique ?'
    ],
    relatedQuizType: 'tactique'
  },
  {
    id: 'ops-sonar-actif-passif',
    title: 'Sonar actif vs passif',
    category: 'OPÉRATIONS',
    content: `Sonar passif :
- Écoute les sons sans émettre
- Ne révèle pas notre position
- Portée dépendant des conditions et de la source
- Sonar passif Suffren : antennes flancs, antenne remorquée

Sonar actif :
- Émet des ondes et écoute l'écho
- Révèle notre position
- Portée plus importante en conditions défavorables
- Sonar actif Suffren : sondeur, sonar d'évitement

Le sonar passif est privilégié pour la discrétion.`,
    questions: [
      'Quelle différence entre sonar actif et passif ?',
      'Pourquoi privilégier le sonar passif ?',
      'Quels sonars actifs sur le Suffren ?'
    ],
    relatedQuizType: 'systemes'
  },
  {
    id: 'ops-senseurs-dsm',
    title: 'Senseurs DSM',
    category: 'OPÉRATIONS',
    content: `Senseurs Détection Surveillance Mesures (DSM) du Suffren :

Acoustique :
- Antennes flancs (passif)
- Antenne remorquée UBF (passif ultra basse fréquence)
- Sonar cylindrique (actif/passif)
- Sondeur (actif)

Optronique :
- MOA (Mât Optronique d'Attaque)
- MOV (Mât Optronique de Veille)
- TAF (Télémétrie Avant Flancs)

Électromagnétique :
- Guerre électronique
- GPS`,
    questions: [
      'Quels sont les senseurs acoustiques du Suffren ?',
      'Quels sont les mâts optroniques ?',
      'À quoi sert l\'antenne remorquée UBF ?'
    ],
    relatedQuizType: 'systemes'
  },
  {
    id: 'maintenance-dissp-minerve',
    title: 'DISSP : Minerve 1968',
    category: 'RETEX',
    content: `Minerve (Daphné) : 27 janvier 1968
Implosion au large des côtes de Toulon.

Situation : Navigation à l'IP, marche au schnorchel, lourd 4 tonnes, 7 nœuds.
Avarie barre plongée bloquée à angle fort pendant relève quart, alerte donnée.
Priorité réaction alerte plutôt qu'avarie de barre, l'avarie n'est pas contrée.
Sous-marin plonge sur son erre à 45° d'assiette.
Implosion 2 minutes plus tard.

RETEX :
- Entraînement SEC PLONG plus important
- Relève quart différée
- Vigilance sur traversées de coque
- Bouée largage
- Pesée rigoureuse`,
    questions: [
      'Quand la Minerve a-t-elle été perdue ?',
      'Quelle était la cause de l\'accident ?',
      'Quels enseignements en a-t-on tirés ?'
    ],
    relatedQuizType: 'securite'
  },
  {
    id: 'maintenance-dissp-turbulent',
    title: 'DISSP : HMS Turbulent 1992',
    category: 'RETEX',
    content: `HMS Turbulent : 30 avril 1992
Incendie en verticale électrique.

Situation : Bâtiment à quai à Devonport, réacteur critique.
Incendie en VE suite intervention sur disjoncteur, 6 personnels civils évacuent.
Appel des marpos via SECNUC.

Problème : fumée et chaleur empêchent intervention initiale, pas de caméra thermique au début.
Communication défaillante avec DDL qui n'a pas de moyens de comm.

Enseignements :
- L'atmosphère devient irrespirable quasi instantanément
- Suivi serré de localisation du personnel impératif
- L'entraînement ne peut que s'approcher du chaos réel
- Nécessité de scénarios multiples simultanés`,
    questions: [
      'Quel type d\'incident sur le HMS Turbulent ?',
      'Quels problèmes ont été rencontrés ?',
      'Quels enseignements sur l\'entraînement ?'
    ],
    relatedQuizType: 'securite'
  }
]

export const getCoursesByCategory = (category: string): CourseSection[] => {
  return submarineCourseContent.filter(section => section.category === category)
}

export const getAllCategories = (): string[] => {
  const categories = submarineCourseContent.map(section => section.category)
  return Array.from(new Set(categories))
}
