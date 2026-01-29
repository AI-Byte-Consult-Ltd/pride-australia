export type NewsArticle = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  content: string[]; // paragraphs
};

export const featuredNews: NewsArticle[] = [
  {
    id: 1,
    title: 'Berlinale 2026 Highlights LGBTQ+ Cinema and the TEDDY Award',
    excerpt:
      'The Berlin International Film Festival once again places queer cinema in the spotlight, celebrating diversity, creativity, and freedom of expression.',
    date: 'February 6, 2026',
    category: 'Germany (EU)',
    readTime: '4 min read',
    content: [
      'Made in EU 🇪🇺, for the World 🗺️.',
      'Berlin’s film season brings an annual wave of attention to LGBTQ+ storytelling through international premieres, conversations, and curated screenings. Berlinale remains one of Europe’s most visible cultural moments for cinema, and queer voices regularly sit at its heart through programmes and community-linked events.',
      'The TEDDY Award tradition continues to amplify LGBTQ+ narratives and creators — not as a “side topic”, but as a core part of how contemporary cinema reflects real people and real lives. The spotlight also helps emerging filmmakers gain distribution, press visibility, and international festival pathways.',
      'For Pride Social Network, this is exactly the cultural energy we want to connect to: people finding their community through art, discussion, and shared experiences. If you attend screenings or side events in Berlin, consider listing your business or project in our Community Map to help others discover safe, welcoming spaces.',
      'Tip: create a post with your favourite film moment, tag your city, and invite others to a small meet-up after screenings.',
    ],
  },
  {
    id: 2,
    title: 'Cologne Carnival 2026 Brings LGBTQ+ Friendly Celebrations',
    excerpt:
      'Cologne’s legendary Carnival returns in February with inclusive parties and events beloved by the LGBTQ+ community.',
    date: 'February 14, 2026',
    category: 'Germany (EU)',
    readTime: '3 min read',
    content: [
      'Made in EU 🇪🇺, for the World 🗺️.',
      'Cologne’s Carnival is one of Europe’s biggest street celebrations — a high-energy mix of costume culture, music, and city-wide social life. For LGBTQ+ visitors, Cologne has a long-standing reputation as a welcoming place with a strong community nightlife and plenty of inclusive venues.',
      'Carnival season often includes themed nights, community parties, and public events where visibility and joyful self-expression are part of the tradition. That makes it a natural moment to connect — whether you’re travelling with friends or attending solo.',
      'If you’re a local business, bar, café, artist collective, or community organiser, this is the perfect time to “List your business” so visitors can find LGBTQ+-friendly spaces easily. Pride Social Network is built for exactly this kind of discovery.',
      'Safety note: big events get crowded — plan meeting points, keep your phone charged, and use trusted transport options.',
    ],
  },
  {
    id: 3,
    title: 'WorldPride & EuroPride 2026 in Amsterdam Confirm Key Dates',
    excerpt:
      'Amsterdam prepares to host WorldPride and EuroPride 2026, welcoming visitors from across Europe and the world.',
    date: 'February 10, 2026',
    category: 'Netherlands (EU)',
    readTime: '5 min read',
    content: [
      'Made in EU 🇪🇺, for the World 🗺️.',
      'Amsterdam’s selection for WorldPride and EuroPride creates a clear focal point for community travel, cultural programming, and international collaboration. These events typically combine parades, conferences, community days, arts programming, and nightlife — all anchored in visibility and solidarity.',
      'For many people, Pride isn’t only a parade: it’s how they find community, discover local organisations, and meet new friends. That’s why an EU-based platform with a global reach matters — people need trusted information, safe spaces, and real connections.',
      'If you’re planning to attend, start early: book accommodation, check accessibility needs, and follow official announcements. For creators and businesses, it’s also a chance to showcase inclusive services to visitors.',
      'On Pride Social Network you can share travel tips, create meet-ups, and highlight LGBTQ+-friendly spots — made in Europe, for the world.',
    ],
  },
  {
    id: 4,
    title: 'Brussels Pride 2026 Focuses on Inclusion and Public Safety',
    excerpt:
      'Organisers of Brussels Pride outline the 2026 vision, focusing on safe public spaces and equal rights across Europe.',
    date: 'February 27, 2026',
    category: 'Belgium (EU)',
    readTime: '4 min read',
    content: [
      'Made in EU 🇪🇺, for the World 🗺️.',
      'Brussels Pride sits at the intersection of community and policy — the city is both a cultural capital and a political centre. That makes Pride there uniquely positioned: it’s a celebration, but also a statement about inclusion, safety, and everyday dignity.',
      'Across Europe, community events increasingly talk about practical safety: preventing harassment, supporting vulnerable groups, and ensuring public spaces work for everyone. These conversations matter because Pride should feel welcoming — not stressful.',
      'Pride Social Network supports this by making discovery easier: verified listings, community reporting, and clearer pathways to safe events and spaces. If you’re organising an event or running an inclusive venue, list it so people can find you.',
      'Community tip: coordinate “buddy meetups” for newcomers so no one has to attend alone.',
    ],
  },
  {
    id: 5,
    title: 'Gay Games XII Valencia 2026: Europe Prepares for a Global Event',
    excerpt:
      'Valencia continues preparations for the Gay Games XII, combining sport, culture, and LGBTQ+ visibility.',
    date: 'February 5, 2026',
    category: 'Spain (EU)',
    readTime: '4 min read',
    content: [
      'Made in EU 🇪🇺, for the World 🗺️.',
      'Large inclusive sports festivals are powerful because they build community through participation — not just spectating. Valencia’s preparations for Gay Games XII reflect a broader trend across Europe: LGBTQ+ events that blend sport, culture, and social connection into one global gathering.',
      'For athletes and visitors, these events are often about personal milestones: competing openly, meeting others with similar stories, and feeling welcomed in a new city. For local businesses and organisers, it’s a major opportunity to host inclusive experiences.',
      'Pride Social Network can be a practical layer on top: find LGBTQ+-friendly venues, discover community initiatives, and coordinate meet-ups for teams and supporters.',
      'If you run fitness services, cafés, studios, or cultural spaces in Valencia — list your business so visitors can find you easily.',
    ],
  },
  {
    id: 6,
    title: 'European Snow Pride 2026 Returns to the Alps',
    excerpt:
      'Winter Pride celebrations return to the Alps, bringing together LGBTQ+ travellers for skiing, music, and community.',
    date: 'February 20, 2026',
    category: 'France (EU)',
    readTime: '3 min read',
    content: [
      'Made in EU 🇪🇺, for the World 🗺️.',
      'Winter Pride events have become a consistent part of the European LGBTQ+ calendar — combining mountain travel, social events, and community energy in a compact timeframe. For many, it’s a refreshing alternative to big-city Pride: smaller groups, shared activities, and a strong sense of togetherness.',
      'If you’re travelling, plan for weather, transport, and accommodation early. If you’re a local operator — hotels, rentals, restaurants, guides — inclusive visibility matters a lot during peak weeks.',
      'Pride Social Network helps travellers find welcoming places and helps businesses reach an audience that values safety and respect.',
      'Community idea: create a “EU Winter Pride meet-up” post and coordinate one shared dinner or après-ski gathering.',
    ],
  },
  {
    id: 7,
    title: 'Budapest Mayor Faces Charges After Supporting Pride March',
    excerpt:
      'Legal action against Budapest’s mayor sparks debate across the EU on LGBTQ+ rights and freedom of assembly.',
    date: 'February 28, 2026',
    category: 'Hungary (EU)',
    readTime: '4 min read',
    content: [
      'Made in EU 🇪🇺 for the World 🗺️.',
      'When public officials are challenged for supporting Pride events, it raises wider questions about freedom of assembly and equal rights. These debates matter because they influence how safe people feel — not only at marches, but in everyday life.',
      'Across Europe, LGBTQ+ communities, NGOs, and allies track how policies and enforcement affect real people. Regardless of politics, one consistent need remains: trusted spaces to connect, share information, and build solidarity.',
      'Pride Social Network is designed to support community communication — from local meet-ups to broader conversations. If you’re organising legal aid resources, support groups, or safety networks, list your project so people can find help faster.',
      'If you attend demonstrations or large gatherings: stay aware of local guidance, keep emergency contacts handy, and go with friends when possible.',
    ],
  },
];
