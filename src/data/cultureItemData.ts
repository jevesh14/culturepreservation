
interface CultureItem {
  id: string;
  title: string;
  image: string;
  category: string;
  region?: string;
  era?: string;
  style?: string;
  description: string;
  historicalBackground?: string;
  culturalSignificance?: string;
  modernRelevance?: string;
}

// Heritage Sites data
const heritageSites: CultureItem[] = [
  {
    id: 'amber-fort',
    title: 'Amber Fort: A Fortress of Grandeur',
    image: 'https://images.unsplash.com/photo-1582034984939-690e8c08bf30',
    category: 'Heritage Sites',
    region: 'Jaipur, Rajasthan',
    era: '16th Century',
    style: 'Rajput-Mughal',
    description: 'A majestic blend of Hindu and Mughal architecture, featuring ornate gates, mirrored halls, and sweeping courtyards.',
    historicalBackground: "Built by Raja Man Singh I in 1592 and expanded by successive rulers, Amber Fort's magnificent architecture reflects the prosperity and military prowess of Rajput kings. Perched on a hillside overlooking Maota Lake, it served as the capital of Rajasthan before Jaipur was established.",
    culturalSignificance: "Amber Fort represents the fusion of Hindu and Muslim architectural elements, showcasing the cultural synthesis that characterized the Rajput courts. Its intricate mirror work, detailed paintings, and strategic design illustrate both artistic refinement and military ingenuity.",
    modernRelevance: "As a UNESCO World Heritage Site, Amber Fort draws millions of visitors annually, contributing significantly to Rajasthan's tourism economy. It continues to inspire contemporary architects and designers, while hosting cultural performances and sound-and-light shows that keep traditions alive."
  },
  {
    id: 'jaisalmer-fort',
    title: 'Jaisalmer Fort: The Golden Citadel',
    image: 'https://images.unsplash.com/photo-1477587458883-47160a8ef1d3',
    category: 'Heritage Sites',
    region: 'Jaisalmer, Rajasthan',
    era: '12th Century',
    style: 'Rajput',
    description: "One of the world's few living forts, with honey-colored sandstone walls that house temples, palaces, and havelis.",
    historicalBackground: "Founded in 1156 CE by Rawal Jaisal, Jaisalmer Fort rises from the golden sands of the Thar Desert like a mirage. Built from yellow sandstone that glows golden in the sunset, it became a crucial trading post on ancient caravan routes to Central Asia and the Middle East.",
    culturalSignificance: "Unlike most forts, Jaisalmer remains a living heritage site with approximately 3,000 people still residing within its walls. Its narrow streets house ancient Jain temples with intricate carvings, royal palaces, and merchants' mansions (havelis) that reflect the prosperity of the Silk Road trade.",
    modernRelevance: "As tourism has grown, the fort faces conservation challenges from modern infrastructure and water drainage issues. Yet it continues to be a vibrant cultural center where traditional crafts, music, and cuisine thrive alongside contemporary life."
  },
  {
    id: 'mehrangarh-fort',
    title: 'Mehrangarh Fort: The Citadel of the Sun',
    image: 'https://images.unsplash.com/photo-1584793632154-c10a5a332596',
    category: 'Heritage Sites',
    region: 'Jodhpur, Rajasthan',
    era: '15th Century',
    style: 'Rajput',
    description: 'Perched 400 feet above Jodhpur, this imposing fort features intricate carvings, expansive courtyards, and a museum.',
    historicalBackground: 'Founded around 1459 by Rao Jodha, Mehrangarh Fort stands on a 400-foot rocky hill overlooking the "Blue City" of Jodhpur. Its massive walls, reaching up to 118 feet in height, have witnessed centuries of battles and royal ceremonies.',
    culturalSignificance: "The fort houses several palaces with intricate carvings, expansive courtyards, and historical artifacts. Its museum contains one of India's most important collections of miniature paintings, arms, costumes, and royal palanquins.",
    modernRelevance: "Apart from being a premier tourist destination, Mehrangarh hosts cultural events including the Rajasthan International Folk Festival. It has featured in Hollywood films and music videos, introducing Rajasthan's heritage to global audiences."
  }
  // Additional heritage sites would be here
];

// Architectural Beauties data
const architecturalBeauties: CultureItem[] = [
  {
    id: 'hawa-mahal',
    title: 'Hawa Mahal: The Palace of Winds',
    image: 'https://images.unsplash.com/photo-1586370925911-25d9ebc94dfd',
    category: 'Architectural Beauties',
    region: 'Jaipur, Rajasthan',
    era: '18th Century',
    style: 'Rajput',
    description: 'With its honeycomb façade and 953 small windows, it was designed for royal women to observe street life without being seen.',
    historicalBackground: "Constructed in 1799 by Maharaja Sawai Pratap Singh, Hawa Mahal was designed by architect Lal Chand Ustad as an extension of the City Palace. Its distinctive honeycomb facade with 953 small windows (jharokhas) was built to allow royal ladies to observe street festivities while remaining unseen, adhering to the practice of purdah.",
    culturalSignificance: "The five-story pyramid-shaped structure represents the crown of Krishna with its 953 windows. Its pink sandstone facade with intricate latticework and floral patterns exemplifies Rajput architecture while incorporating elements of Mughal design.",
    modernRelevance: "Today, Hawa Mahal is one of Jaipur's most photographed landmarks and appears on countless travel brochures representing India. It continues to inspire modern architects seeking sustainable cooling solutions, as its original design provided natural air conditioning in Jaipur's desert climate."
  },
  {
    id: 'jal-mahal',
    title: 'Jal Mahal: Water Palace of Jaipur',
    image: 'https://images.unsplash.com/photo-1581276879432-15a67f61f30e',
    category: 'Architectural Beauties',
    region: 'Jaipur, Rajasthan',
    era: '18th Century',
    style: 'Rajput-Mughal',
    description: 'Floating in the middle of Man Sagar Lake, this palace is a tranquil fusion of Rajput and Mughal design.',
    historicalBackground: "Built in the 18th century by Maharaja Jai Singh II, Jal Mahal represents a unique architectural achievement. While appearing as a single-story building, four of its five floors remain underwater when the lake is full, employing sophisticated engineering to protect against water damage.",
    culturalSignificance: "The palace blends Rajput and Mughal architectural styles with red sandstone walls and elegant arches. Originally built as a hunting lodge and pleasure retreat for royalty, it features traditional chattris (domed pavilions) and intricate stone carvings.",
    modernRelevance: "After years of pollution threatened both the lake and palace, recent conservation efforts have revitalized the ecosystem. Evening light illumination of the palace has created a new attraction for tourists and locals alike."
  },
  {
    id: 'patwon-ki-haveli',
    title: 'Patwon Ki Haveli: The Mansion of Brocade Merchants',
    image: 'https://images.unsplash.com/photo-1590080748533-30e7eecb3887',
    category: 'Architectural Beauties',
    region: 'Jaisalmer, Rajasthan',
    era: '19th Century',
    style: 'Rajput',
    description: 'A cluster of five havelis with intricate jharokhas (balconies) and mirror work that showcase the wealth of merchant families.',
    historicalBackground: "Built between 1800 and 1860 by Guman Chand Patwa and his five sons, who were wealthy traders of gold and silver brocade, the Patwon Ki Haveli complex comprises five adjacent mansions. The first and largest haveli took 55 years to complete.",
    culturalSignificance: "These havelis showcase the pinnacle of Jaisalmer's architectural style with intricate yellow sandstone carvings, latticework balconies, and mirror-inlaid chambers. The designs incorporate both traditional motifs and folk influences, reflecting the merchant class's growing prominence.",
    modernRelevance: "Two of the havelis now function as museums highlighting the craftsmanship of the era. Contemporary architects study their passive cooling systems and light-capturing designs as sustainable building practices."
  },
  {
    id: 'umaid-bhawan',
    title: 'Umaid Bhawan: The Art Deco Palace',
    image: 'https://images.unsplash.com/photo-1576487236230-6aa2b15d7d90',
    category: 'Architectural Beauties',
    region: 'Jodhpur, Rajasthan',
    era: '20th Century',
    style: 'Indo-Deco',
    description: 'One of the world\'s largest private residences, part palace, part hotel, and part museum, built with golden-yellow sandstone.',
    historicalBackground: "Construction of Umaid Bhawan began in 1929 during a severe drought as a public relief project, providing employment to thousands of workers. Completed in 1943, this magnificent palace was built by Maharaja Umaid Singh as the world's sixth-largest private residence with 347 rooms.",
    culturalSignificance: "The palace represents a unique blend of traditional Indian and Art Deco styles, designed by renowned British architect Henry Lanchester. Its golden sandstone exterior, massive dome, and ornate interiors with murals by Polish artist Stefan Norblin showcase a distinctive Indo-European aesthetic.",
    modernRelevance: "Today, Umaid Bhawan remains partly a residence of the royal family, while also functioning as a luxury heritage hotel and museum. It stands as a living testament to Rajasthan's royal heritage, drawing visitors from around the world to experience its grandeur."
  }
  // Additional architectural beauties would be here
];

// Folk Life & Traditions data
const folkLifeTraditions: CultureItem[] = [
  {
    id: 'bishnoi',
    title: 'Bishnoi Traditions: Guardians of Nature',
    image: 'https://images.unsplash.com/photo-1571758441389-6dbb208c3a9f',
    category: 'Folk Life & Traditions',
    region: 'Western Rajasthan',
    era: 'Traditional',
    style: 'Lifestyle',
    description: 'The Bishnoi community lives in harmony with nature—protecting trees, wildlife, and the blackbuck as a model of eco-spiritual living.',
    historicalBackground: 'Founded in 1485 by Guru Jambheshwar, the Bishnoi sect adheres to 29 principles (bishnoi means "twenty-nine") that emphasize environmental protection. They\'re known for the Khejarli Massacre of 1730 when 363 Bishnois sacrificed their lives hugging trees to prevent their felling by the Maharaja\'s men.',
    culturalSignificance: "The Bishnoi way of life represents one of the world's earliest ecological movements. Their villages are havens for blackbucks, gazelles, and birds that have disappeared elsewhere. Their traditional homes use natural materials and they maintain sustainable agricultural practices.",
    modernRelevance: "As climate change concerns grow, the Bishnoi philosophy has gained renewed attention. Conservation NGOs partner with Bishnoi communities, and eco-tourism initiatives allow visitors to experience their sustainable lifestyle."
  },
  {
    id: 'pushkar-fair',
    title: 'Pushkar Camel Fair: Desert Carnival',
    image: 'https://images.unsplash.com/photo-1584451854588-5b6b0dfced09',
    category: 'Folk Life & Traditions',
    region: 'Pushkar, Rajasthan',
    era: 'Annual',
    style: 'Festival',
    description: "One of the world's largest camel fairs, combining livestock trading with religious pilgrimage and vibrant folk festivities.",
    historicalBackground: "While the religious significance of Pushkar's sacred lake dates back thousands of years, the camel fair began as a practical gathering for desert traders and nomads. It coincides with the Kartik Purnima full moon, considered auspicious for bathing in the holy lake.",
    culturalSignificance: "The fair represents a vibrant intersection of commerce, culture, and spirituality. Beyond camel and livestock trading, it features folk performances, traditional craft markets, and competitions like mustache contests and bridal dress-ups that showcase Rajasthan's cultural diversity.",
    modernRelevance: "Now attracting thousands of international tourists, the fair has evolved to include hot air balloon rides and photography tours while maintaining its authentic core. It provides crucial income for rural artisans and performers while keeping traditional crafts viable."
  },
  {
    id: 'rajasthani-puppet',
    title: 'Kathputli: The String Puppets',
    image: 'https://images.unsplash.com/photo-1622482594949-a2791df1546c',
    category: 'Folk Life & Traditions',
    region: 'Rajasthan',
    era: 'Traditional',
    style: 'Performance',
    description: 'Ancient storytelling tradition using colorful wooden puppets to narrate folk tales, epics, and royal adventures.',
    historicalBackground: "The art of Kathputli (wooden puppet) dates back over a thousand years in Rajasthan. Traditionally performed by the Bhat community, these portable puppet shows traveled from village to village, spreading stories and news before modern communication existed.",
    culturalSignificance: "The puppets represent archetypal characters from folklore—the dancing girl, the magician, the king, and the queen. Their exaggerated features and colorful costumes reflect Rajasthani aesthetic sensibilities, while performances blend entertainment with moral education.",
    modernRelevance: "Traditional puppet communities face challenges as entertainment options multiply, but innovation has emerged. Contemporary puppet troupes address modern social issues, and some perform internationally. Additionally, puppet-making workshops for tourists help sustain the art form."
  },
  {
    id: 'phad-painting',
    title: 'Phad: Scroll Painting Tradition',
    image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d',
    category: 'Folk Life & Traditions',
    region: 'Bhilwara, Rajasthan',
    era: 'Medieval',
    style: 'Art',
    description: 'Religious scrolls depicting heroic deities like Pabuji and Devnarayan, used by Bhopa priest-singers for narrative performances.',
    historicalBackground: "Dating back over 700 years, Phad painting is a traditional religious scroll painting from Rajasthan. These magnificent scrolls, often 15-30 feet in length, function as portable temples that narrate the heroic deeds of local deities like Pabuji and Devnarayan through vibrant imagery and dramatic storytelling.",
    culturalSignificance: "Phad paintings serve as both religious artifacts and narrative tools. Traditionally, the Bhopa and Bhopi (husband-wife performers) would unfurl these scrolls at night, using an oil lamp to illuminate different sections while singing ballads that brought the stories to life, preserving oral traditions and cultural identity across generations.",
    modernRelevance: "Though traditional Phad performances are becoming rare, contemporary artists are revitalizing this art form with innovative subjects and techniques. Today, smaller Phad paintings have become popular souvenirs, and workshops help preserve this distinctive tradition while adapting it for modern audiences and collectors."
  }
  // Additional folk life entries would be here
];

// Dance Forms data 
const danceItems: CultureItem[] = [
  {
    id: 'ghoomar',
    title: 'Ghoomar',
    image: 'https://images.unsplash.com/photo-1583002083769-0b8b36d612f8',
    category: 'Dance Forms',
    region: 'Rajasthan',
    era: 'Traditional',
    description: 'A graceful dance of swaying ghagras and spinning silhouettes, symbolizing feminine elegance and celebration.',
    historicalBackground: "Originating with the Bhil tribe and later embraced by Rajput royalty, Ghoomar is a graceful dance of swaying ghagras and spinning silhouettes. Initially performed during religious rituals and royal functions, its rhythmic elegance became a symbol of celebration across Rajasthan.",
    culturalSignificance: "Ghoomar is the heartbeat of festive Rajasthan. Often performed by brides and womenfolk during Teej and Gangaur, it signifies auspicious beginnings, feminine strength, and communal joy. Each pirouette and hand gesture is coded in folklore.",
    modernRelevance: "From wedding sangeets in Mumbai to dance academies in New Jersey, Ghoomar now graces global stages and cinema, notably immortalized in Bollywood's period epics."
  },
  {
    id: 'kathak',
    title: 'Kathak: Stories in Motion',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498',
    category: 'Dance Forms',
    region: 'Northern India',
    era: 'Ancient to Modern',
    description: 'An elegant classical dance form that combines intricate footwork with expressive storytelling.',
    historicalBackground: "Kathak evolved from the ancient tradition of storytellers or Kathakars who recited epic tales with music. It developed in Hindu temples and later flourished in Mughal courts, absorbing Persian influences to create a unique synthesis of Hindu and Islamic cultural expressions.",
    culturalSignificance: "The dance is characterized by intricate footwork (tatkar), graceful pirouettes (chakkar), and expressive gestures (mudras). Kathak dancers are known for their ability to narrate complex stories through dance, creating rhythmic patterns with ghungroo (ankle bells) that complement tabla compositions.",
    modernRelevance: "Today, Kathak is performed globally, with renowned dancers creating contemporary interpretations while preserving traditional techniques. Its influence extends to Bollywood choreography, and cultural exchange programs often feature Kathak as a representation of India's classical heritage."
  },
  {
    id: 'bhavai',
    title: 'Bhavai: The Balance of Grace',
    image: 'https://images.unsplash.com/photo-1535515384173-d74166f26820',
    category: 'Dance Forms',
    region: 'Rajasthan',
    era: 'Traditional',
    description: 'A remarkable folk dance where women balance multiple earthen pots on their heads while performing graceful movements.',
    historicalBackground: "Bhavai originated among the nomadic communities of Rajasthan as an expression of the daily hardship of carrying water across desert landscapes. What began as a necessary skill evolved into an art form that showcases the grace, balance, and strength of desert women.",
    culturalSignificance: "Traditionally performed during festivals and celebrations, Bhavai represents the resilience of Rajasthani women. Dancers balance up to eight or nine earthen pots (sometimes with a lit lamp on top) while dancing on the rim of a brass plate or sometimes even on glass bottles.",
    modernRelevance: "While maintaining its traditional roots, Bhavai has become a popular cultural performance at tourism festivals, hotels, and international cultural exchanges, bringing attention to the artistic heritage of Rajasthan."
  }
];

// Scripture items data
const scriptureItems: CultureItem[] = [
  {
    id: 'vedas-upanishads',
    title: 'Vedas and Upanishads',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    category: 'Scriptures',
    region: 'Ancient India',
    era: 'Vedic Period (1500 - 500 BCE)',
    description: 'The fountainhead of Indian spiritual and philosophical thought, preserved through oral tradition and written manuscripts.',
    historicalBackground: "These ancient Sanskrit texts—composed over 3,000 years ago—are the fountainhead of Indian spiritual and philosophical thought. In Rajasthan, they have been preserved not just in books, but in sound—chanted with precision by Brahmin families across centuries. Their oral recitation, passed like sacred flame, is an art of breath, rhythm, and memory.",
    culturalSignificance: "They are not just read—they are lived. The Vedas guide temple architecture, fire rituals, and seasonal celebrations. The Upanishads' probing metaphysics have shaped local storytelling, folklore, and moral codes. Even in rural shrines, their echo lingers.",
    modernRelevance: "From gurukuls in the Aravallis to iPads in classrooms, these texts are being digitized and taught to new generations. Meditation apps quote them. Podcasts break them down. Rajasthan's desert wisdom now travels the globe."
  },
  {
    id: 'bhagavad-gita',
    title: 'Bhagavad Gita: Song of the Divine',
    image: 'https://images.unsplash.com/photo-1558345035-a51b42f3e6a0',
    category: 'Scriptures',
    region: 'India',
    era: 'Ancient (part of Mahabharata)',
    description: 'A 700-verse Sanskrit scripture that presents a synthesis of Hindu ideas about dharma, theistic bhakti, and the yogic ideals of moksha.',
    historicalBackground: "Composed approximately between the 5th and 2nd centuries BCE, the Bhagavad Gita forms a part of the epic Mahabharata. It records the conversation between Prince Arjuna and Lord Krishna before the Kurukshetra War, addressing moral and philosophical dilemmas about duty, righteousness, and spiritual fulfillment.",
    culturalSignificance: "The Gita presents multiple paths to spiritual realization—karma yoga (selfless action), bhakti yoga (devotion), and jnana yoga (knowledge)—unifying diverse spiritual traditions. Its teachings have influenced leaders from Gandhi to Thoreau, offering guidance on ethical decision-making and inner peace.",
    modernRelevance: "Today, the Gita remains a source of inspiration across cultural and religious boundaries. Its principles are applied in leadership seminars, mindfulness practices, and environmental ethics. Modern commentaries continue to find relevant applications of its ancient wisdom to contemporary challenges."
  },
  {
    id: 'ramayana',
    title: 'Ramayana: The Journey of Virtue',
    image: 'https://images.unsplash.com/photo-1598726668148-99946ef1cb42',
    category: 'Scriptures',
    region: 'India',
    era: 'Ancient (5th century BCE)',
    description: 'An ancient Indian epic that narrates the journey of Rama to rescue his wife Sita from the demon king Ravana.',
    historicalBackground: "Attributed to the sage Valmiki, the Ramayana was composed around the 5th century BCE, though its oral tradition may be much older. In Rajasthan, it has been preserved through various regional adaptations, including the vibrant Mewari style of manuscript painting that depicts scenes from the epic.",
    culturalSignificance: "The Ramayana serves as a moral and cultural compass, highlighting ideals of righteousness (dharma), loyalty, brotherhood, and the triumph of good over evil. Rajasthan's folk traditions include Ramlila performances, puppet shows, and phad paintings that bring the epic to life.",
    modernRelevance: "Beyond religious significance, the Ramayana continues to influence literature, art, and media. Its themes are reinterpreted in contemporary novels, television series, and films, while its ethical dilemmas provide material for discussions on governance, gender relations, and environmental ethics."
  }
];

// Music items data
const musicItems: CultureItem[] = [
  {
    id: 'manganiyar',
    title: 'Manganiyar: Desert Music Maestros',
    image: 'https://images.unsplash.com/photo-1541689221361-ad95003448dc',
    category: 'Music',
    region: 'Western Rajasthan',
    era: 'Traditional',
    description: 'A Muslim community of hereditary professional musicians whose performances are an integral part of Rajasthani folk traditions.',
    historicalBackground: "The Manganiyars have been court musicians for Rajput patrons for centuries, despite being Muslim by faith. Their tradition dates back to the 12th century, and they have maintained a unique patron-client relationship with specific Hindu families across generations.",
    culturalSignificance: "Their music represents a stunning synthesis of Sufi influences and Hindu devotional themes. They are known for their complex rhythms, haunting melodies played on the kamaycha (stringed instrument), and powerful vocals that can shift from gentle whispers to soaring projections that carry across desert dunes.",
    modernRelevance: "In recent decades, Manganiyars have gained international recognition through projects like 'Manganiyar Seduction' and collaborations with global musicians. Their performances at world music festivals have brought this ancient desert tradition to global audiences while creating new economic opportunities for the community."
  },
  {
    id: 'kalbelia',
    title: 'Kalbelia: Songs of the Serpent Dancers',
    image: 'https://images.unsplash.com/photo-1552306062-29a5560e1c31',
    category: 'Music',
    region: 'Rajasthan',
    era: 'Traditional',
    description: 'The distinctive music tradition of the Kalbelia community, featuring the haunting sounds of the pungi and percussion instruments.',
    historicalBackground: "Associated with the snake-charmer community, Kalbelia music evolved from the nomadic lifestyle of this tribe. Originally performed as part of their snake-handling traditions, the music gained independence as a cultural expression when the community had to find alternative livelihoods after wildlife protection laws banned snake charming.",
    culturalSignificance: "The music is characterized by the distinctive sound of the pungi (wind instrument), complemented by the dholak (drum) and khanjari (percussion). The hypnotic rhythms are closely connected to the swirling dance movements that mimic snake movements, creating an integrated artistic expression.",
    modernRelevance: "UNESCO recognized Kalbelia song and dance as an Intangible Cultural Heritage in 2010. This has led to increased preservation efforts and opportunities for Kalbelia musicians to perform nationally and internationally, revitalizing a tradition that was at risk of disappearing."
  }
];

// Art Forms data
const artItems: CultureItem[] = [
  {
    id: 'miniature-painting',
    title: 'Miniature Painting: Tiny Treasures',
    image: 'https://images.unsplash.com/photo-1579762593175-20226054cad0',
    category: 'Art Forms',
    region: 'Rajasthan',
    era: '16th-19th Century',
    description: 'Exquisite small-format paintings created with delicate brushwork and natural pigments, depicting court scenes, legends, and daily life.',
    historicalBackground: "Rajasthan's miniature painting tradition flourished under royal patronage, developing distinct schools including Mewar, Bundi, Kishangarh, and Marwar styles. These paintings emerged when the Mughal empire began to decline, as court artists sought new patrons in Rajput kingdoms.",
    culturalSignificance: "These paintings provide invaluable insights into historical fashion, architecture, and social customs. The Kishangarh school is famous for its idealized portrayal of beauty with elongated features, while the Bundi style is known for lush landscapes and vibrant colors that capture Rajasthan's aesthetic sensibilities.",
    modernRelevance: "Contemporary artists continue the tradition, though often with modern themes and materials. Miniature painting workshops attract tourists and art enthusiasts, while collectors worldwide seek these pieces as investment art, ensuring the economic viability of the tradition."
  },
  {
    id: 'blue-pottery',
    title: 'Blue Pottery: Azure Artistry',
    image: 'https://images.unsplash.com/photo-1608020932658-0754430696a8',
    category: 'Art Forms',
    region: 'Jaipur, Rajasthan',
    era: '14th Century onwards',
    description: 'A distinctive turquoise blue pottery made from quartz, not clay, with Persian and Chinese influences.',
    historicalBackground: "Introduced to India via Persia and Afghanistan, blue pottery found patronage in Jaipur during the reign of Maharaja Ram Singh II (1835-1880). The technique almost disappeared in the early 20th century but was revived through dedicated efforts by individuals like Kripal Singh Shekhawat.",
    culturalSignificance: "Unlike traditional pottery, Jaipur blue pottery uses quartz stone powder instead of clay, creating a distinctive semi-transparent finish. The vivid cobalt blue designs against white backgrounds reflect Persian aesthetics, while the glazing technique shows Chinese influences, embodying Rajasthan's history as a cultural crossroads.",
    modernRelevance: "Blue pottery has found new markets globally as decorative art and functional items. Innovations include contemporary design patterns and new product categories like bathroom accessories and lighting fixtures, while maintaining traditional production techniques."
  }
];

// Cuisine items data
const cuisineItems: CultureItem[] = [
  {
    id: 'dal-bati-churma',
    title: 'Dal Bati Churma: Desert Delicacy',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107aa7f964',
    category: 'Cuisine',
    region: 'Rajasthan',
    era: 'Traditional',
    description: 'A traditional Rajasthani meal featuring baked wheat balls, lentil curry, and sweetened crushed wheat.',
    historicalBackground: "Dal Bati emerged from necessity in Rajasthan's water-scarce desert region. The batis (wheat balls) were traditionally buried in the sand and cooked by the heat of the sun or in dying wood fires while men were away in battles, creating a dish that could stay fresh for several days.",
    culturalSignificance: "Each component of this three-part meal has symbolic significance: dal (lentils) represents sustenance, bati (wheat balls) represents strength and resilience, while churma (sweetened crushed wheat) represents celebration and sweetness in life. It's served at every significant ceremony from weddings to harvest festivals.",
    modernRelevance: "While maintaining its traditional preparation in rural areas, dal-bati-churma has evolved in urban settings with gourmet variations. It has become a signature dish in Indian restaurants worldwide and featured in international food festivals as representing authentic Rajasthani cuisine."
  },
  {
    id: 'ghevar',
    title: 'Ghevar: Festival Sweet Disc',
    image: 'https://images.unsplash.com/photo-1616148540189-4e2d2006e2c8',
    category: 'Cuisine',
    region: 'Rajasthan',
    era: 'Traditional',
    description: 'A disc-shaped sweet made from flour and sugar syrup, associated with the Teej and Raksha Bandhan festivals.',
    historicalBackground: "Ghevar originated in Jaipur centuries ago and became closely associated with monsoon festivals, particularly Teej, which celebrates the arrival of rain. Its disc shape is said to represent the sun or moon, while its honeycomb structure symbolizes prosperity and abundance.",
    culturalSignificance: "The preparation of ghevar is considered an art form, requiring considerable skill to achieve the perfect texture and honeycomb structure. It plays a central role in festival gift-giving, with elaborately decorated versions exchanged between families to strengthen social bonds.",
    modernRelevance: "Modern variations include chocolate ghevar, fruit-topped versions, and fusion desserts that combine ghevar with international flavors. Specialty sweet shops now ship ghevar globally, allowing the diaspora to maintain cultural connections during festival seasons."
  }
];

// Function to get item data based on itemId
export const getCultureItemData = (itemId: string): CultureItem | null => {
  // Check all data arrays for matching item
  const arrays = [
    heritageSites, 
    architecturalBeauties, 
    folkLifeTraditions, 
    danceItems, 
    scriptureItems,
    musicItems,
    artItems,
    cuisineItems
  ];
  
  for (const array of arrays) {
    const item = array.find(item => item.id === itemId);
    if (item) return item;
  }
  
  // Log better debugging info
  console.log(`Searched for item with ID: ${itemId}, but found no matches`);
  console.log("Available IDs:", arrays.flat().map(item => item.id));
  
  // If no match found in any array
  return null;
};

export type { CultureItem };
