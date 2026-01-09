export type QuizQuestion = {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

export type Course = {
  id: string
  title: string
  category: string
  content: string
  relatedQuiz: string
}

export type QuizAttempt = {
  id: string
  quizId: string
  quizTitle: string
  score: number
  totalQuestions: number
  date: string
  answers: { questionId: string; correct: boolean }[]
}

export const courses: Course[] = [
  {
    id: 'nav-basics',
    title: 'Navigation de Base',
    category: 'Navigation',
    content: `La navigation sous-marine repose sur des systèmes de positionnement précis. Les sous-marins utilisent principalement la navigation inertielle, qui calcule la position en mesurant l'accélération et la rotation du navire. Le système de navigation inertielle doit être calibré régulièrement pour maintenir sa précision. En surface, le GPS peut être utilisé pour corriger les erreurs accumulées. Sous l'eau, la navigation acoustique et le sonar permettent d'éviter les obstacles et de maintenir le cap.`,
    relatedQuiz: 'navigation'
  },
  {
    id: 'propulsion',
    title: 'Systèmes de Propulsion',
    category: 'Systèmes',
    content: `Les sous-marins modernes utilisent principalement deux types de propulsion : nucléaire et diesel-électrique. La propulsion nucléaire offre une autonomie quasi-illimitée et permet de rester immergé pendant des mois. Les réacteurs nucléaires chauffent l'eau pour créer de la vapeur qui entraîne les turbines. Les sous-marins diesel-électriques sont plus silencieux mais doivent faire surface régulièrement pour recharger leurs batteries. Les systèmes de propulsion anaérobie permettent de prolonger l'immersion.`,
    relatedQuiz: 'systemes'
  },
  {
    id: 'safety-protocols',
    title: 'Protocoles de Sécurité',
    category: 'Sécurité',
    content: `La sécurité à bord d'un sous-marin est primordiale. Les procédures d'urgence incluent la gestion des incendies, des voies d'eau et des contaminations. Chaque membre d'équipage doit connaître l'emplacement des équipements de sécurité : masques respiratoires, extincteurs, sas de secours. Les exercices d'évacuation sont pratiqués régulièrement. La surveillance constante de l'atmosphère interne détecte les niveaux dangereux de CO2, CO et autres gaz. Les systèmes de régénération d'air et de purification de l'eau sont critiques pour la survie.`,
    relatedQuiz: 'securite'
  },
  {
    id: 'sonar-systems',
    title: 'Systèmes Sonar',
    category: 'Systèmes',
    content: `Le sonar est l'œil du sous-marin. Il existe deux types principaux : le sonar actif qui émet des ondes sonores et écoute leurs échos, et le sonar passif qui écoute simplement les sons environnants. Le sonar passif est privilégié car il ne révèle pas la position du sous-marin. Les opérateurs sonar analysent les signatures acoustiques pour identifier les navires, la topographie marine et les dangers. La portée du sonar dépend de nombreux facteurs : température de l'eau, salinité, profondeur et conditions météorologiques en surface.`,
    relatedQuiz: 'systemes'
  },
  {
    id: 'communications',
    title: 'Communications Sous-Marines',
    category: 'Opérations',
    content: `Les communications sous-marines présentent des défis uniques. Les ondes radio ne pénètrent pas l'eau, donc les sous-marins utilisent des fréquences très basses (VLF et ELF) pour recevoir des messages en immersion. Pour transmettre, le sous-marin doit déployer une antenne flottante ou faire surface. Les communications acoustiques sous-marines utilisent le son pour transmettre des données entre sous-marins ou vers des bouées. Les systèmes modernes incluent aussi des communications par satellite lorsque le périscope ou le schnorchel est déployé.`,
    relatedQuiz: 'operations'
  },
  {
    id: 'tactical-ops',
    title: 'Opérations Tactiques',
    category: 'Tactique',
    content: `Les opérations tactiques sous-marines requièrent discrétion absolue et planification méticuleuse. La thermocline, couche d'eau où la température change rapidement, offre un camouflage acoustique naturel. Les sous-marins utilisent des tactiques comme le "sprint and drift" - courtes accélérations suivies d'arrêts pour écouter passivement. Les contre-mesures acoustiques incluent des leurres pour tromper les torpilles ennemies. La signature magnétique, thermique et acoustique du sous-marin doit être minimisée. En zone hostile, changer fréquemment de profondeur et éviter les routes prévisibles complique le pistage ennemi.`,
    relatedQuiz: 'tactique'
  },
  {
    id: 'maintenance-tech',
    title: 'Maintenance Technique',
    category: 'Maintenance',
    content: `La maintenance d'un sous-marin est critique pour la sécurité et l'efficacité opérationnelle. Les batteries nécessitent inspection quotidienne pour détecter fuites ou défaillances. La coque doit être régulièrement nettoyée du biofouling - organismes marins qui augmentent traînée et bruit. Les joints et valves, soumis à pression constante, s'usent rapidement et requièrent remplacement préventif. La corrosion peut affaiblir l'intégrité structurelle. Les sea trials testent tous systèmes après construction ou refit majeur. Le pressure hull, coque interne résistante, maintient la pression atmosphérique jusqu'à la profondeur de test, généralement 80% de la profondeur de rupture.`,
    relatedQuiz: 'maintenance'
  }
]

export const quizzes: { [key: string]: { title: string; questions: QuizQuestion[] } } = {
  navigation: {
    title: 'Navigation Sous-Marine',
    questions: [
      {
        id: 'nav-1',
        question: 'Quel système de navigation est principalement utilisé par les sous-marins en immersion?',
        options: ['GPS', 'Navigation inertielle', 'Compas magnétique', 'Navigation stellaire'],
        correctAnswer: 1,
        explanation: 'La navigation inertielle calcule la position en mesurant l\'accélération et la rotation, fonctionnant sans signal externe.',
        category: 'Navigation'
      },
      {
        id: 'nav-2',
        question: 'Pourquoi le GPS ne fonctionne-t-il pas sous l\'eau?',
        options: ['Il est trop lent', 'Les signaux radio ne pénètrent pas l\'eau', 'Il consomme trop d\'énergie', 'Il n\'est pas assez précis'],
        correctAnswer: 1,
        explanation: 'Les ondes radio GPS sont absorbées par l\'eau de mer et ne peuvent pas atteindre un sous-marin immergé.',
        category: 'Navigation'
      },
      {
        id: 'nav-3',
        question: 'À quelle fréquence doit-on calibrer le système de navigation inertielle?',
        options: ['Jamais', 'Une fois par an', 'Régulièrement', 'Seulement en cas de panne'],
        correctAnswer: 2,
        explanation: 'La calibration régulière est nécessaire pour corriger les erreurs accumulées au fil du temps.',
        category: 'Navigation'
      },
      {
        id: 'nav-4',
        question: 'Quel système aide à éviter les obstacles en immersion?',
        options: ['Radar', 'Sonar', 'GPS', 'Caméra infrarouge'],
        correctAnswer: 1,
        explanation: 'Le sonar détecte les obstacles en émettant et recevant des ondes sonores sous l\'eau.',
        category: 'Navigation'
      },
      {
        id: 'nav-5',
        question: 'Quelle est la principale limitation de la navigation inertielle?',
        options: ['Coût élevé', 'Accumulation d\'erreurs dans le temps', 'Besoin de signaux externes', 'Consommation énergétique'],
        correctAnswer: 1,
        explanation: 'Les petites erreurs de mesure s\'accumulent progressivement, nécessitant une correction périodique.',
        category: 'Navigation'
      },
      {
        id: 'nav-6',
        question: 'Comment un sous-marin corrige-t-il sa position en surface?',
        options: ['Sonar actif', 'GPS', 'Observation visuelle', 'Boussole'],
        correctAnswer: 1,
        explanation: 'Le GPS est utilisé en surface pour corriger les erreurs accumulées par le système inertiel.',
        category: 'Navigation'
      },
      {
        id: 'nav-7',
        question: 'Qu\'est-ce que la navigation acoustique?',
        options: ['Navigation par la musique', 'Navigation utilisant le son sous l\'eau', 'Navigation par radio', 'Navigation stellaire'],
        correctAnswer: 1,
        explanation: 'La navigation acoustique utilise des signaux sonores pour déterminer la position et éviter les obstacles.',
        category: 'Navigation'
      },
      {
        id: 'nav-8',
        question: 'Quel instrument mesure la profondeur du sous-marin?',
        options: ['Altimètre', 'Bathymètre', 'Manomètre', 'Gyroscope'],
        correctAnswer: 2,
        explanation: 'Le manomètre mesure la pression de l\'eau, permettant de calculer la profondeur.',
        category: 'Navigation'
      },
      {
        id: 'nav-9',
        question: 'Quelle information le gyroscope fournit-il?',
        options: ['La vitesse', 'L\'orientation et la rotation', 'La profondeur', 'La température'],
        correctAnswer: 1,
        explanation: 'Le gyroscope maintient une référence d\'orientation stable et détecte les rotations du sous-marin.',
        category: 'Navigation'
      },
      {
        id: 'nav-10',
        question: 'Pourquoi les sous-marins maintiennent-ils un cap constant?',
        options: ['Pour économiser l\'énergie', 'Pour faciliter la navigation et réduire les erreurs', 'Pour éviter la détection', 'Pour le confort de l\'équipage'],
        correctAnswer: 1,
        explanation: 'Un cap stable facilite les calculs de navigation et réduit l\'accumulation d\'erreurs.',
        category: 'Navigation'
      }
    ]
  },
  systemes: {
    title: 'Systèmes du Sous-Marin',
    questions: [
      {
        id: 'sys-1',
        question: 'Quels sont les deux principaux types de propulsion sous-marine?',
        options: ['Vapeur et diesel', 'Nucléaire et diesel-électrique', 'Solaire et éolien', 'Électrique et hydraulique'],
        correctAnswer: 1,
        explanation: 'Les sous-marins modernes utilisent soit des réacteurs nucléaires, soit des moteurs diesel couplés à des batteries électriques.',
        category: 'Systèmes'
      },
      {
        id: 'sys-2',
        question: 'Quel est l\'avantage principal de la propulsion nucléaire?',
        options: ['Plus silencieuse', 'Moins chère', 'Autonomie quasi-illimitée', 'Plus rapide'],
        correctAnswer: 2,
        explanation: 'La propulsion nucléaire permet de rester immergé pendant des mois sans refaire le plein.',
        category: 'Systèmes'
      },
      {
        id: 'sys-3',
        question: 'Quel type de sonar est privilégié pour éviter la détection?',
        options: ['Sonar actif', 'Sonar passif', 'Radar', 'Lidar'],
        correctAnswer: 1,
        explanation: 'Le sonar passif écoute sans émettre, évitant ainsi de révéler la position du sous-marin.',
        category: 'Systèmes'
      },
      {
        id: 'sys-4',
        question: 'Que fait le système de régénération d\'air?',
        options: ['Refroidit l\'air', 'Produit de l\'oxygène et élimine le CO2', 'Filtre les odeurs', 'Humidifie l\'air'],
        correctAnswer: 1,
        explanation: 'Le système de régénération produit de l\'oxygène respirable et élimine le dioxyde de carbone.',
        category: 'Systèmes'
      },
      {
        id: 'sys-5',
        question: 'Comment fonctionne le réacteur nucléaire d\'un sous-marin?',
        options: ['Combustion de carburant', 'Fission nucléaire chauffant l\'eau', 'Fusion nucléaire', 'Énergie solaire concentrée'],
        correctAnswer: 1,
        explanation: 'La fission nucléaire génère de la chaleur qui transforme l\'eau en vapeur pour entraîner les turbines.',
        category: 'Systèmes'
      },
      {
        id: 'sys-6',
        question: 'Qu\'est-ce que la propulsion anaérobie?',
        options: ['Propulsion sans équipage', 'Propulsion sans oxygène externe', 'Propulsion silencieuse', 'Propulsion nucléaire'],
        correctAnswer: 1,
        explanation: 'La propulsion anaérobie permet aux sous-marins diesel de fonctionner sous l\'eau sans air extérieur.',
        category: 'Systèmes'
      },
      {
        id: 'sys-7',
        question: 'Quel facteur affecte la portée du sonar?',
        options: ['La couleur de l\'eau', 'La température et la salinité', 'La phase lunaire', 'Le champ magnétique'],
        correctAnswer: 1,
        explanation: 'La température, la salinité et d\'autres propriétés de l\'eau influencent la propagation du son.',
        category: 'Systèmes'
      },
      {
        id: 'sys-8',
        question: 'À quoi servent les ballasts?',
        options: ['Propulsion', 'Contrôler la flottabilité', 'Communication', 'Navigation'],
        correctAnswer: 1,
        explanation: 'Les ballasts se remplissent ou se vident d\'eau pour faire plonger ou émerger le sous-marin.',
        category: 'Systèmes'
      },
      {
        id: 'sys-9',
        question: 'Que détecte le sonar passif?',
        options: ['Les ondes radio', 'Les sons émis par d\'autres navires', 'Les champs magnétiques', 'Les variations de pression'],
        correctAnswer: 1,
        explanation: 'Le sonar passif écoute les bruits des hélices, des machines et autres sources sonores.',
        category: 'Systèmes'
      },
      {
        id: 'sys-10',
        question: 'Pourquoi les sous-marins diesel doivent-ils faire surface?',
        options: ['Pour naviguer', 'Pour recharger les batteries', 'Pour communiquer', 'Pour la maintenance'],
        correctAnswer: 1,
        explanation: 'Les moteurs diesel nécessitent de l\'air pour fonctionner et recharger les batteries.',
        category: 'Systèmes'
      },
      {
        id: 'sys-11',
        question: 'Qu\'analyse l\'opérateur sonar?',
        options: ['Les couleurs', 'Les signatures acoustiques', 'Les odeurs', 'Les températures'],
        correctAnswer: 1,
        explanation: 'Chaque navire produit une signature acoustique unique que l\'opérateur peut identifier.',
        category: 'Systèmes'
      },
      {
        id: 'sys-12',
        question: 'Quel système contrôle l\'assiette du sous-marin?',
        options: ['Les gouvernes de plongée', 'Le sonar', 'Le périscope', 'Le schnorchel'],
        correctAnswer: 0,
        explanation: 'Les gouvernes de plongée contrôlent l\'angle de plongée et l\'assiette du sous-marin.',
        category: 'Systèmes'
      },
      {
        id: 'sys-13',
        question: 'Quelle est la fonction du schnorchel?',
        options: ['Communication', 'Observation', 'Aspirer l\'air en immersion périscopique', 'Propulsion'],
        correctAnswer: 2,
        explanation: 'Le schnorchel permet aux sous-marins diesel d\'aspirer de l\'air tout en restant presque immergés.',
        category: 'Systèmes'
      },
      {
        id: 'sys-14',
        question: 'Comment est produit l\'oxygène à bord?',
        options: ['Réservoirs d\'air comprimé uniquement', 'Électrolyse de l\'eau', 'Photosynthèse', 'Importé de la surface'],
        correctAnswer: 1,
        explanation: 'L\'électrolyse sépare l\'eau en hydrogène et oxygène, fournissant de l\'air respirable.',
        category: 'Systèmes'
      },
      {
        id: 'sys-15',
        question: 'Quel système purrifie l\'eau de mer?',
        options: ['Distillation', 'Filtration simple', 'Osmose inverse', 'Évaporation solaire'],
        correctAnswer: 0,
        explanation: 'La distillation utilise la chaleur du réacteur pour évaporer et purifier l\'eau de mer.',
        category: 'Systèmes'
      }
    ]
  },
  securite: {
    title: 'Sécurité et Protocoles',
    questions: [
      {
        id: 'sec-1',
        question: 'Quelle est la première action en cas d\'incendie à bord?',
        options: ['Évacuer immédiatement', 'Alerter et localiser le feu', 'Faire surface', 'Couper l\'électricité'],
        correctAnswer: 1,
        explanation: 'Il faut d\'abord alerter l\'équipage et localiser précisément le foyer avant d\'agir.',
        category: 'Sécurité'
      },
      {
        id: 'sec-2',
        question: 'Où sont situés les masques respiratoires d\'urgence?',
        options: ['Uniquement au poste de commandement', 'Dans chaque compartiment', 'Seulement en salle des machines', 'Dans un local dédié'],
        correctAnswer: 1,
        explanation: 'Des masques sont disponibles dans chaque compartiment pour un accès immédiat en cas d\'urgence.',
        category: 'Sécurité'
      },
      {
        id: 'sec-3',
        question: 'Quel gaz est particulièrement dangereux dans un espace confiné?',
        options: ['Oxygène', 'Azote', 'Dioxyde de carbone (CO2)', 'Hélium'],
        correctAnswer: 2,
        explanation: 'L\'accumulation de CO2 peut causer asphyxie et troubles neurologiques dans un espace confiné.',
        category: 'Sécurité'
      },
      {
        id: 'sec-4',
        question: 'À quelle fréquence sont pratiqués les exercices d\'évacuation?',
        options: ['Annuellement', 'Mensuellement', 'Régulièrement', 'Jamais'],
        correctAnswer: 2,
        explanation: 'Les exercices réguliers maintiennent la préparation de l\'équipage face aux urgences.',
        category: 'Sécurité'
      },
      {
        id: 'sec-5',
        question: 'Que surveille le système de contrôle atmosphérique?',
        options: ['La température uniquement', 'Les niveaux de gaz dangereux', 'L\'humidité uniquement', 'La pression uniquement'],
        correctAnswer: 1,
        explanation: 'Le système surveille CO2, CO, oxygène et autres gaz pour maintenir une atmosphère saine.',
        category: 'Sécurité'
      },
      {
        id: 'sec-6',
        question: 'Qu\'est-ce qu\'une voie d\'eau?',
        options: ['Un couloir', 'Une fuite d\'eau dans la coque', 'Un système de plomberie', 'Un réservoir d\'eau'],
        correctAnswer: 1,
        explanation: 'Une voie d\'eau est une brèche dans la coque permettant à l\'eau de pénétrer.',
        category: 'Sécurité'
      },
      {
        id: 'sec-7',
        question: 'Quelle est la procédure en cas de contamination radioactive?',
        options: ['Ignorer', 'Isoler la zone et alerter', 'Faire surface immédiatement', 'Continuer normalement'],
        correctAnswer: 1,
        explanation: 'Il faut immédiatement isoler la zone contaminée et alerter les responsables sécurité.',
        category: 'Sécurité'
      },
      {
        id: 'sec-8',
        question: 'Quel équipement protège contre les fumées toxiques?',
        options: ['Lunettes', 'Masque respiratoire avec filtres', 'Casque', 'Gants'],
        correctAnswer: 1,
        explanation: 'Les masques respiratoires avec filtres appropriés protègent contre l\'inhalation de fumées.',
        category: 'Sécurité'
      },
      {
        id: 'sec-9',
        question: 'Combien de voies d\'évacuation doivent être connues de chaque membre d\'équipage?',
        options: ['Une', 'Deux minimum', 'Aucune obligation', 'Trois'],
        correctAnswer: 1,
        explanation: 'Chaque membre doit connaître au moins deux voies d\'évacuation en cas de blocage.',
        category: 'Sécurité'
      },
      {
        id: 'sec-10',
        question: 'Quelle est la profondeur maximale sûre pour une évacuation d\'urgence?',
        options: ['Aucune limite', 'Dépend du type de sous-marin', '100 mètres pour tous', '500 mètres'],
        correctAnswer: 1,
        explanation: 'La profondeur d\'évacuation dépend de l\'équipement et de la conception du sous-marin.',
        category: 'Sécurité'
      },
      {
        id: 'sec-11',
        question: 'Que contient la trousse de premiers secours sous-marine?',
        options: ['Seulement des bandages', 'Médicaments, bandages et équipement d\'urgence', 'Rien de spécial', 'Uniquement des médicaments'],
        correctAnswer: 1,
        explanation: 'Les trousses sont complètes avec médicaments, matériel de suture, bandages et équipement spécialisé.',
        category: 'Sécurité'
      },
      {
        id: 'sec-12',
        question: 'Qu\'est-ce qu\'un sas de secours?',
        options: ['Une porte blindée', 'Un compartiment pour évacuation sous pression', 'Un système de ventilation', 'Un local de stockage'],
        correctAnswer: 1,
        explanation: 'Le sas de secours permet aux membres d\'équipage d\'évacuer même en immersion.',
        category: 'Sécurité'
      },
      {
        id: 'sec-13',
        question: 'Pourquoi les extincteurs à eau sont-ils rarement utilisés à bord?',
        options: ['Trop lourds', 'Risque de court-circuit électrique', 'Inefficaces', 'Trop chers'],
        correctAnswer: 1,
        explanation: 'L\'eau peut causer des courts-circuits dangereux dans les équipements électriques du sous-marin.',
        category: 'Sécurité'
      },
      {
        id: 'sec-14',
        question: 'Quel signal indique une urgence de plongée?',
        options: ['Sirène continue', 'Alarme spécifique et messages', 'Lumières clignotantes', 'Aucun signal'],
        correctAnswer: 1,
        explanation: 'Une alarme distinctive et des messages vocaux alertent l\'équipage des urgences de plongée.',
        category: 'Sécurité'
      },
      {
        id: 'sec-15',
        question: 'Quelle formation est obligatoire pour tout l\'équipage?',
        options: ['Plongée sous-marine', 'Lutte contre les incendies et secourisme', 'Cuisine', 'Navigation stellaire'],
        correctAnswer: 1,
        explanation: 'Tous les membres doivent être formés à la lutte contre les incendies et aux premiers secours.',
        category: 'Sécurité'
      }
    ]
  },
  operations: {
    title: 'Opérations et Communications',
    questions: [
      {
        id: 'ops-1',
        question: 'Pourquoi les ondes radio ne fonctionnent-elles pas sous l\'eau?',
        options: ['Trop faibles', 'Absorbées par l\'eau salée', 'Trop rapides', 'Bloquées par la pression'],
        correctAnswer: 1,
        explanation: 'L\'eau salée absorbe les ondes radio, les empêchant de se propager sur de longues distances.',
        category: 'Opérations'
      },
      {
        id: 'ops-2',
        question: 'Quel type de fréquence permet de recevoir des messages en immersion?',
        options: ['FM', 'Très basse fréquence (VLF/ELF)', 'Micro-ondes', 'Ultrason'],
        correctAnswer: 1,
        explanation: 'Les fréquences très basses peuvent pénétrer l\'eau et atteindre les sous-marins immergés.',
        category: 'Opérations'
      },
      {
        id: 'ops-3',
        question: 'Comment un sous-marin transmet-il des messages en immersion?',
        options: ['Il ne peut pas', 'Antenne flottante ou faire surface', 'Sonar', 'Télépathie'],
        correctAnswer: 1,
        explanation: 'Pour transmettre, le sous-marin doit déployer une antenne vers la surface ou émerger.',
        category: 'Opérations'
      },
      {
        id: 'ops-4',
        question: 'Qu\'est-ce qu\'une communication acoustique sous-marine?',
        options: ['Parler fort', 'Transmission de données par ondes sonores', 'Communication radio', 'Signaux lumineux'],
        correctAnswer: 1,
        explanation: 'Les communications acoustiques utilisent le son pour transmettre des données sous l\'eau.',
        category: 'Opérations'
      },
      {
        id: 'ops-5',
        question: 'Quel équipement permet de voir en surface sans émerger complètement?',
        options: ['Hublot', 'Périscope', 'Caméra externe', 'Radar'],
        correctAnswer: 1,
        explanation: 'Le périscope permet l\'observation visuelle en restant en immersion périscopique.',
        category: 'Opérations'
      },
      {
        id: 'ops-6',
        question: 'Que fait une bouée de communication?',
        options: ['Marque la position', 'Relaye les communications', 'Détecte les navires', 'Mesure la profondeur'],
        correctAnswer: 1,
        explanation: 'Les bouées permettent de communiquer en restant à distance de sécurité.',
        category: 'Opérations'
      },
      {
        id: 'ops-7',
        question: 'Quelle est la principale limitation des communications VLF?',
        options: ['Trop chères', 'Très lent et unidirectionnel', 'Trop rapides', 'Impossible de nuit'],
        correctAnswer: 1,
        explanation: 'Les communications VLF ont un débit très faible et ne permettent que la réception.',
        category: 'Opérations'
      },
      {
        id: 'ops-8',
        question: 'Qu\'est-ce qu\'une patrouille silencieuse?',
        options: ['Équipage endormi', 'Mission minimisant tout bruit', 'Communication radio éteinte', 'Navigation de nuit'],
        correctAnswer: 1,
        explanation: 'En patrouille silencieuse, toute activité bruyante est minimisée pour éviter la détection.',
        category: 'Opérations'
      },
      {
        id: 'ops-9',
        question: 'Combien de temps peut durer une patrouille de sous-marin nucléaire?',
        options: ['Une semaine', 'Un mois', 'Plusieurs mois', 'Un an'],
        correctAnswer: 2,
        explanation: 'Les sous-marins nucléaires peuvent rester en mer pendant plusieurs mois d\'affilée.',
        category: 'Opérations'
      },
      {
        id: 'ops-10',
        question: 'Quel est le rôle du quart?',
        options: ['Nettoyer', 'Surveiller et contrôler le sous-marin', 'Cuisiner', 'Dormir'],
        correctAnswer: 1,
        explanation: 'L\'équipe de quart assure la surveillance continue des systèmes et la navigation.',
        category: 'Opérations'
      },
      {
        id: 'ops-11',
        question: 'Pourquoi les sous-marins opèrent-ils souvent de nuit en surface?',
        options: ['Plus frais', 'Moins de détection visuelle', 'Meilleure navigation', 'Économie d\'énergie'],
        correctAnswer: 1,
        explanation: 'La nuit réduit les risques de détection visuelle par avions ou navires.',
        category: 'Opérations'
      },
      {
        id: 'ops-12',
        question: 'Qu\'est-ce qu\'un rendez-vous sous-marin?',
        options: ['Réunion d\'équipage', 'Rencontre planifiée entre sous-marins', 'Point de navigation', 'Zone interdite'],
        correctAnswer: 1,
        explanation: 'Les sous-marins peuvent se rencontrer à des coordonnées et heures prédéterminées.',
        category: 'Opérations'
      },
      {
        id: 'ops-13',
        question: 'Quel système permet les communications par satellite?',
        options: ['Sonar', 'Antenne déployée avec périscope', 'Radio VHF', 'Câble sous-marin'],
        correctAnswer: 1,
        explanation: 'Une antenne satellite peut être déployée avec le périscope pour les communications.',
        category: 'Opérations'
      },
      {
        id: 'ops-14',
        question: 'Que signifie "faire le point"?',
        options: ['Prendre une pause', 'Déterminer la position exacte', 'Faire le plein', 'Inspecter la coque'],
        correctAnswer: 1,
        explanation: '"Faire le point" signifie calculer et vérifier la position géographique du sous-marin.',
        category: 'Opérations'
      },
      {
        id: 'ops-15',
        question: 'Quelle profondeur est appelée "profondeur périscopique"?',
        options: ['10 mètres', 'Environ 15-20 mètres', '50 mètres', '100 mètres'],
        correctAnswer: 1,
        explanation: 'La profondeur périscopique permet au périscope d\'atteindre la surface tout en gardant le sous-marin immergé.',
        category: 'Opérations'
      },
      {
        id: 'ops-16',
        question: 'Qu\'est-ce qu\'un "transit"?',
        options: ['Changement d\'équipage', 'Déplacement vers une zone d\'opération', 'Changement de profondeur', 'Ravitaillement'],
        correctAnswer: 1,
        explanation: 'Un transit est le voyage du sous-marin entre son port et sa zone de mission.',
        category: 'Opérations'
      },
      {
        id: 'ops-17',
        question: 'Pourquoi limiter l\'utilisation du sonar actif?',
        options: ['Consomme trop d\'énergie', 'Révèle la position du sous-marin', 'Endommage la faune', 'Trop imprécis'],
        correctAnswer: 1,
        explanation: 'Le sonar actif émet des signaux détectables qui peuvent révéler la présence du sous-marin.',
        category: 'Opérations'
      },
      {
        id: 'ops-18',
        question: 'Qu\'est-ce qu\'un "signal discret"?',
        options: ['Message secret', 'Communication acoustique codée', 'Lumière faible', 'Radio silencieuse'],
        correctAnswer: 1,
        explanation: 'Les signaux discrets sont des communications acoustiques codées entre sous-marins.',
        category: 'Opérations'
      },
      {
        id: 'ops-19',
        question: 'Quelle est la durée typique d\'un quart?',
        options: ['2 heures', '4 heures', '6 heures', '8 heures'],
        correctAnswer: 2,
        explanation: 'Les quarts durent généralement 6 heures, permettant une rotation de l\'équipage.',
        category: 'Opérations'
      },
      {
        id: 'ops-20',
        question: 'Que signifie "stations de combat"?',
        options: ['Exercice physique', 'Tous aux postes de combat', 'Repos', 'Repas'],
        correctAnswer: 1,
        explanation: 'Aux stations de combat, tout l\'équipage rejoint ses postes assignés en situation d\'urgence.',
        category: 'Opérations'
      }
    ]
  },
  tactique: {
    title: 'Tactique et Stratégie',
    questions: [
      {
        id: 'tac-1',
        question: 'Qu\'est-ce qu\'une "zone d\'exclusion"?',
        options: ['Zone interdite à l\'équipage', 'Zone où tout navire inconnu est menace', 'Zone de repos', 'Zone de plongée'],
        correctAnswer: 1,
        explanation: 'Dans une zone d\'exclusion, tout contact non identifié est considéré comme hostile.',
        category: 'Tactique'
      },
      {
        id: 'tac-2',
        question: 'Quelle est la meilleure défense d\'un sous-marin?',
        options: ['Ses missiles', 'Le silence et la discrétion', 'Sa vitesse', 'Son blindage'],
        correctAnswer: 1,
        explanation: 'Le silence permet d\'éviter la détection, qui est la meilleure défense.',
        category: 'Tactique'
      },
      {
        id: 'tac-3',
        question: 'Qu\'est-ce qu\'une "fuite thermique"?',
        options: ['Fuite d\'eau chaude', 'Trace de chaleur détectable dans l\'eau', 'Problème de climatisation', 'Surchauffe du réacteur'],
        correctAnswer: 1,
        explanation: 'Les sous-marins laissent une trace thermique dans l\'eau qui peut être détectée.',
        category: 'Tactique'
      },
      {
        id: 'tac-4',
        question: 'Quelle profondeur offre le meilleur camouflage acoustique?',
        options: ['Surface', 'Thermocline', 'Fond marin', 'Mi-profondeur'],
        correctAnswer: 1,
        explanation: 'La thermocline réfracte les ondes sonores, créant une zone d\'ombre acoustique.',
        category: 'Tactique'
      },
      {
        id: 'tac-5',
        question: 'Qu\'est-ce qu\'une "contre-mesure acoustique"?',
        options: ['Silence radio', 'Leurre sonore ou dispositif anti-torpille', 'Changement de cap', 'Plongée profonde'],
        correctAnswer: 1,
        explanation: 'Les contre-mesures acoustiques trompent les torpilles guidées par sonar.',
        category: 'Tactique'
      },
      {
        id: 'tac-6',
        question: 'Pourquoi éviter les eaux peu profondes?',
        options: ['Plus chaud', 'Moins de manœuvrabilité et plus détectable', 'Interdit', 'Pas de poissons'],
        correctAnswer: 1,
        explanation: 'En eau peu profonde, le sous-marin a moins d\'options de fuite et est plus facilement détecté.',
        category: 'Tactique'
      },
      {
        id: 'tac-7',
        question: 'Qu\'est-ce qu\'un "baffles"?',
        options: ['Équipement de plongée', 'Zone morte sonar à l\'arrière du sous-marin', 'Type de torpille', 'Compartiment'],
        correctAnswer: 1,
        explanation: 'Les baffles sont une zone où le sonar du sous-marin ne peut pas détecter à cause des bruits de sa propre hélice.',
        category: 'Tactique'
      },
      {
        id: 'tac-8',
        question: 'Quelle manœuvre révèle le moins un sous-marin?',
        options: ['Virage rapide', 'Changement de profondeur lent', 'Faire surface', 'Marche arrière'],
        correctAnswer: 1,
        explanation: 'Les changements lents minimisent le bruit et les perturbations détectables.',
        category: 'Tactique'
      },
      {
        id: 'tac-9',
        question: 'Qu\'est-ce qu\'une "approche furtive"?',
        options: ['Approche de nuit', 'Approche silencieuse minimisant détection', 'Approche rapide', 'Approche en surface'],
        correctAnswer: 1,
        explanation: 'L\'approche furtive combine vitesse minimale, profondeur optimale et silence pour éviter la détection.',
        category: 'Tactique'
      },
      {
        id: 'tac-10',
        question: 'Pourquoi changer fréquemment de profondeur en zone hostile?',
        options: ['Économie d\'énergie', 'Compliquer le pistage ennemi', 'Confort', 'Réglementation'],
        correctAnswer: 1,
        explanation: 'Les changements de profondeur compliquent le travail des sonaristes ennemis.',
        category: 'Tactique'
      },
      {
        id: 'tac-11',
        question: 'Qu\'est-ce qu\'un "sprint and drift"?',
        options: ['Exercice physique', 'Tactique: courte accélération puis écoute passive', 'Type de plongée', 'Manœuvre d\'urgence'],
        correctAnswer: 1,
        explanation: 'Sprint and drift alterne vitesse pour couvrir distance et arrêts pour écouter sans bruit propre.',
        category: 'Tactique'
      },
      {
        id: 'tac-12',
        question: 'Quelle est la portée typique d\'une torpille moderne?',
        options: ['500 mètres', '5 kilomètres', '20-50 kilomètres', '200 kilomètres'],
        correctAnswer: 2,
        explanation: 'Les torpilles modernes ont une portée de plusieurs dizaines de kilomètres.',
        category: 'Tactique'
      },
      {
        id: 'tac-13',
        question: 'Qu\'est-ce que la "signature magnétique"?',
        options: ['Code d\'identification', 'Champ magnétique créé par la coque métallique', 'Signal radio', 'Marque sur la coque'],
        correctAnswer: 1,
        explanation: 'La coque métallique perturbe le champ magnétique terrestre, créant une signature détectable.',
        category: 'Tactique'
      },
      {
        id: 'tac-14',
        question: 'Comment un sous-marin échappe-t-il à une torpille?',
        options: ['Faire surface', 'Leurres, changement cap/profondeur, vitesse max', 'S\'arrêter', 'Tirer dessus'],
        correctAnswer: 1,
        explanation: 'La combinaison de leurres acoustiques et de manœuvres évasives offre les meilleures chances.',
        category: 'Tactique'
      },
      {
        id: 'tac-15',
        question: 'Qu\'est-ce qu\'un "choke point"?',
        options: ['Compartiment étanche', 'Passage maritime étroit stratégique', 'Système d\'air', 'Point de contrôle'],
        correctAnswer: 1,
        explanation: 'Les choke points sont des passages étroits faciles à surveiller et contrôler.',
        category: 'Tactique'
      },
      {
        id: 'tac-16',
        question: 'Pourquoi les sous-marins opèrent-ils souvent seuls?',
        options: ['Économie', 'Éviter détection mutuelle et maximiser discrétion', 'Plus rapide', 'Manque d\'équipage'],
        correctAnswer: 1,
        explanation: 'Plusieurs sous-marins ensemble augmentent les risques de détection mutuelle.',
        category: 'Tactique'
      },
      {
        id: 'tac-17',
        question: 'Qu\'est-ce qu\'un "periscope depth attack"?',
        options: ['Attaque avec périscope levé', 'Attaque depuis profondeur périscopique', 'Attaque du périscope', 'Pas d\'attaque'],
        correctAnswer: 1,
        explanation: 'L\'attaque depuis profondeur périscopique permet observation visuelle avant le tir.',
        category: 'Tactique'
      },
      {
        id: 'tac-18',
        question: 'Quelle est l\'utilité d\'un "torpedo decoy"?',
        options: ['Entrainement', 'Leurrer les torpilles ennemies', 'Communication', 'Navigation'],
        correctAnswer: 1,
        explanation: 'Les leurres imitent la signature acoustique du sous-marin pour tromper les torpilles.',
        category: 'Tactique'
      },
      {
        id: 'tac-19',
        question: 'Qu\'est-ce que le "cavitation noise"?',
        options: ['Bruit d\'équipage', 'Bruit des bulles créées par l\'hélice rapide', 'Bruit de sonar', 'Écho'],
        correctAnswer: 1,
        explanation: 'À haute vitesse, l\'hélice crée des bulles dont l\'implosion produit un bruit caractéristique très détectable.',
        category: 'Tactique'
      },
      {
        id: 'tac-20',
        question: 'Pourquoi éviter de suivre une route prévisible?',
        options: ['Ennuyeux', 'Facilite l\'embuscade ennemie', 'Plus long', 'Interdit'],
        correctAnswer: 1,
        explanation: 'Les routes prévisibles permettent à l\'ennemi de tendre des embuscades.',
        category: 'Tactique'
      }
    ]
  },
  maintenance: {
    title: 'Maintenance et Technique',
    questions: [
      {
        id: 'maint-1',
        question: 'Quelle est la fréquence d\'inspection des batteries?',
        options: ['Annuelle', 'Mensuelle', 'Quotidienne', 'Jamais'],
        correctAnswer: 2,
        explanation: 'Les batteries doivent être inspectées quotidiennement pour détecter fuites ou défaillances.',
        category: 'Maintenance'
      },
      {
        id: 'maint-2',
        question: 'Quel système nécessite le plus de maintenance?',
        options: ['Sonar', 'Systèmes de propulsion et réacteur', 'Radio', 'Cuisine'],
        correctAnswer: 1,
        explanation: 'Les systèmes de propulsion sont complexes et critiques, nécessitant maintenance constante.',
        category: 'Maintenance'
      },
      {
        id: 'maint-3',
        question: 'Qu\'est-ce qu\'un "dry dock"?',
        options: ['Réserve d\'eau', 'Bassin de réparation hors d\'eau', 'Compartiment sec', 'Document'],
        correctAnswer: 1,
        explanation: 'Le dry dock est un bassin vidé pour permettre maintenance de la coque et réparations majeures.',
        category: 'Maintenance'
      },
      {
        id: 'maint-4',
        question: 'Pourquoi la coque doit-elle être régulièrement nettoyée?',
        options: ['Esthétique', 'Biofouling réduit vitesse et augmente bruit', 'Réglementation', 'Tradition'],
        correctAnswer: 1,
        explanation: 'Les organismes marins augmentent la traînée et créent du bruit détectable.',
        category: 'Maintenance'
      },
      {
        id: 'maint-5',
        question: 'Qu\'est-ce qu\'un "hot run"?',
        options: ['Exercice physique', 'Torpille qui s\'active dans son tube', 'Course rapide', 'Test moteur'],
        correctAnswer: 1,
        explanation: 'Un hot run est une torpille qui s\'arme accidentellement avant lancement, situation très dangereuse.',
        category: 'Maintenance'
      },
      {
        id: 'maint-6',
        question: 'Quelle est la durée de vie d\'un réacteur nucléaire?',
        options: ['5 ans', '10 ans', '20-30 ans', '50 ans'],
        correctAnswer: 2,
        explanation: 'Les cœurs de réacteur modernes durent 20-30 ans sans rechargement.',
        category: 'Maintenance'
      },
      {
        id: 'maint-7',
        question: 'Qu\'est-ce que la "maintenance préventive"?',
        options: ['Réparations d\'urgence', 'Entretien programmé avant panne', 'Nettoyage', 'Inspection visuelle'],
        correctAnswer: 1,
        explanation: 'La maintenance préventive évite les pannes en remplaçant composants avant défaillance.',
        category: 'Maintenance'
      },
      {
        id: 'maint-8',
        question: 'Pourquoi tester régulièrement les ballasts?',
        options: ['Règlement', 'Assurer capacité plongée/émersion d\'urgence', 'Entrainement', 'Aucune raison'],
        correctAnswer: 1,
        explanation: 'Les ballasts doivent fonctionner parfaitement pour plonger ou émerger en urgence.',
        category: 'Maintenance'
      },
      {
        id: 'maint-9',
        question: 'Quel composant s\'use le plus rapidement?',
        options: ['Coque', 'Joints et valves', 'Sonar', 'Périscope'],
        correctAnswer: 1,
        explanation: 'Les joints et valves sont soumis à pression constante et s\'usent rapidement.',
        category: 'Maintenance'
      },
      {
        id: 'maint-10',
        question: 'Qu\'est-ce qu\'un "refit"?',
        options: ['Changement d\'équipage', 'Rénovation majeure du sous-marin', 'Exercice', 'Nouveau uniforme'],
        correctAnswer: 1,
        explanation: 'Un refit est une période de maintenance majeure avec modernisation des systèmes.',
        category: 'Maintenance'
      },
      {
        id: 'maint-11',
        question: 'Pourquoi surveiller la corrosion?',
        options: ['Esthétique', 'Peut affaiblir coque et créer fuites', 'Réglementation', 'Aucune raison'],
        correctAnswer: 1,
        explanation: 'La corrosion affaiblit l\'intégrité structurelle et peut mener à des défaillances catastrophiques.',
        category: 'Maintenance'
      },
      {
        id: 'maint-12',
        question: 'Quelle est la profondeur de test d\'un sous-marin?',
        options: ['Profondeur maximale opérationnelle', '80% de la profondeur de rupture', 'Profondeur de croisière', 'N\'importe quelle profondeur'],
        correctAnswer: 1,
        explanation: 'La profondeur de test est la limite opérationnelle sûre, généralement 80% de la rupture.',
        category: 'Maintenance'
      },
      {
        id: 'maint-13',
        question: 'Qu\'est-ce qu\'un "pressure hull"?',
        options: ['Coque extérieure', 'Coque interne résistant à la pression', 'Type de torpille', 'Compartiment'],
        correctAnswer: 1,
        explanation: 'Le pressure hull est la coque interne résistante qui maintient la pression atmosphérique intérieure.',
        category: 'Maintenance'
      },
      {
        id: 'maint-14',
        question: 'Pourquoi les sous-marins ont-ils une double coque?',
        options: ['Beauté', 'Ballasts entre coques et protection supplémentaire', 'Isolation', 'Tradition'],
        correctAnswer: 1,
        explanation: 'L\'espace entre coques contient les ballasts et offre protection contre torpilles.',
        category: 'Maintenance'
      },
      {
        id: 'maint-15',
        question: 'Qu\'est-ce que le "sea trial"?',
        options: ['Procès maritime', 'Test en mer après construction/refit', 'Exercice d\'équipage', 'Navigation standard'],
        correctAnswer: 1,
        explanation: 'Les sea trials testent tous les systèmes après construction ou maintenance majeure.',
        category: 'Maintenance'
      }
    ]
  }
}

export function getAllQuestions(): QuizQuestion[] {
  return Object.values(quizzes).flatMap(quiz => quiz.questions)
}

export function getQuestionsByCategory(category: string): QuizQuestion[] {
  return getAllQuestions().filter(q => q.category === category)
}
