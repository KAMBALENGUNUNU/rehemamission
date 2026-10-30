export interface Artwork {
  id: string;
  title: string;
  artistIdentifier: string; // "Artist J.K." or chosen pseudonym / approved identifier
  year: number;
  category: 'paintings' | 'drawings' | 'mixed-media' | 'cultural';
  categoryLabel: string;
  medium: string;
  dimensions: string; // e.g. "80 x 100 cm"
  framed: string;
  priceRwf: number;
  priceUsd: number;
  status: 'available' | 'reserved' | 'showroom';
  image: string;
  detailImage?: string;
  emotionalTheme?: string;
  hook: string; // 1. Distinctive vivid sentence
  whatViewerSees: string; // 2. Subject, composition, colors, mood
  artistPerspective: string; // 3. Approved artist quote/words
  whyBuy: string; // 4. Why this artwork belongs in your home / emotional sales reason
  craftDetails: {
    technique: string;
    support: string;
    finish: string;
    signature: string;
    location: string;
  };
}

export const REHEMA_ARTWORKS: Artwork[] = [
  {
    id: 'kaze-01',
    title: 'Kubohorwa (Breaking the Ropes)',
    artistIdentifier: 'KAZE Collection',
    year: 2024,
    category: 'paintings',
    categoryLabel: 'Original Acrylic & Impasto on Canvas',
    medium: 'Artist acrylics, raw pigments, and textured impasto on stretched canvas',
    dimensions: '65 × 130 cm (25.6 × 51.2 in)',
    framed: 'Gallery-wrapped edges painted deep indigo (ready to hang); natural floating frame available',
    priceRwf: 580000,
    priceUsd: 430,
    status: 'available',
    image: '/artworks/kaze-breaking-the-ropes.jpg',
    detailImage: '/artworks/kaze-breaking-the-ropes.jpg',
    emotionalTheme: 'Freedom from Bondage & Courageous Rebirth',
    hook: '“Ropes can squeeze tight, but they cannot stop life from breaking free.”',
    whatViewerSees:
      'In the center of the canvas sits an egg bound tight by thick, coarse black ropes pulling hard from both sides. Where the ropes dig into the shell, small drops of crimson tell the reality of pain and struggle. On the right, the canvas is deep and stormy—a starry expanse of dark indigo and red splatters remembering cold nights and heavy regrets. But on the left, a blazing golden dawn explodes in warm yellow, cream, and turquoise light. Right in the middle, the egg shell cracks open. A brave young chick with bright, clear golden eyes pokes its head out and gazes upward into the light. The ropes tried to hold it back, but new life is breaking every bond.',
    artistPerspective:
      '“I lived in the dark for so many years. Addiction felt like thick ropes wrapped around my chest—every day pulling tighter, stealing my peace and my tomorrow. People told me I was useless and done. But when Rehema opened their doors to me, they treated me like a human being again. They gave me safety, love, and a paintbrush. As I painted this chick breaking through that shell, I cried because I knew that chick was me. The ropes could not kill what God put inside me. I am free.” — KAZE Collection Youth Artist',
    whyBuy:
      '“Kubohorwa” is more than an artwork; it is a monument to the human spirit. Hanging this in your living room or office tells everyone who walks through your doors that hope is never dead, no matter how heavy life gets. Every glance gives you courage. By acquiring this original piece, 100% of the proceeds fund vocational livelihoods for youth artisans at KAZE Collection / Rehema Mission Rwanda.',
    craftDetails: {
      technique: 'High-contrast palette-knife scumbling with detailed micro-brush work on the chick',
      support: 'Triple-primed heavyweight Belgian cotton canvas on kiln-dried timber chassis',
      finish: 'Archival UV-protective satin sealant (glare-free)',
      signature: 'Verified with official KAZE Collection seal; certificate of authenticity included',
      location: 'Kaze Collection Atelier, Kicukiro, Kigali',
    },
  },
  {
    id: 'kaze-02',
    title: 'Umutuzo mu Mwijima (Calm Waters: The Sacred Pass)',
    artistIdentifier: 'KAZE Collection',
    year: 2025,
    category: 'paintings',
    categoryLabel: 'Palette Knife Impasto on Canvas',
    medium: 'High-viscosity acrylic & oil impasto with textured quartz paste on canvas',
    dimensions: '80 × 100 cm (31.5 × 39.4 in)',
    framed: 'Museum-grade dark charcoal floating frame included',
    priceRwf: 650000,
    priceUsd: 480,
    status: 'available',
    image: '/artworks/kaze-mountain-reflection.jpg',
    detailImage: '/artworks/kaze-mountain-reflection.jpg',
    emotionalTheme: 'Finding Peace in the Center of the Storm',
    hook: '“In the middle of the darkest valley, the light still finds you—and the water becomes still.”',
    whatViewerSees:
      'Massive, rugged mountain peaks in midnight lapis lazuli, cobalt, and black loom on both sides like towering giants. The paint is thick and sculpted with heavy palette knives, giving the rock face real physical depth you can see and touch as light moves across your room. Between the dark mountain shoulders, a gentle, golden sanctuary opens in the valley pass. Down below lies deep, glass-like water. Instead of being tossed by waves, the water is calm and mirrors the sacred golden light. The darkness cannot swallow the peace in the center.',
    artistPerspective:
      '“Before Rehema, my head was always screaming. Constant noise, fear, shame, and panic. Those dark cliffs in the painting are the mountains of fear and withdrawal I had to climb. But during morning quiet time at Rehema, I learned to sit still and pray. For the first time in years, the noise stopped. I realized you don’t fight a storm by shouting back at it; you let the light enter, and your heart becomes still like calm water. That still water saved my life.” — KAZE Collection Youth Artist',
    whyBuy:
      'This painting brings an immediate feeling of calm, authority, and quiet strength to any room. In a noisy world, its deep blues and glowing reflection create a tranquil focal point that slows your heartbeat and brings peace to your home. Owning this original masterwork directly sustains youth artisan livelihoods through KAZE Collection.',
    craftDetails: {
      technique: 'Sculptural palette-knife impasto with multi-toned blue glazing and wet-on-dry reflection',
      support: 'Custom-stretched double-primed linen canvas',
      finish: 'Semi-gloss archival protective seal that enhances impasto ridges',
      signature: 'Signed on reverse with KAZE Collection seal and date',
      location: 'Kaze Collection Atelier, Kicukiro, Kigali',
    },
  },
  {
    id: 'kaze-03',
    title: 'Uburabyo bwa Zahabu (Golden Blossom: After the Fire)',
    artistIdentifier: 'KAZE Collection',
    year: 2025,
    category: 'paintings',
    categoryLabel: 'Luminous Impasto & Metallic Leaf',
    medium: 'Acrylic, metallic gold pigment, and mineral paste on wide linen canvas',
    dimensions: '70 × 140 cm (27.6 × 55.1 in)',
    framed: 'Unframed contemporary gallery profile (ready to hang)',
    priceRwf: 620000,
    priceUsd: 460,
    status: 'available',
    image: '/artworks/kaze-golden-blossoms.jpg',
    detailImage: '/artworks/kaze-golden-blossoms.jpg',
    emotionalTheme: 'Abundant New Life & Joy After Hardship',
    hook: '“When your season arrives, even branches that looked burnt and dead burst into pure gold.”',
    whatViewerSees:
      'A wide, generous panoramic view that instantly opens up the room. Strong dark branches, scarred like charred wood, reach across a gentle background of soft ivory, warm cream, and subtle vertical paint drips. Along those weathered branches, thick sculpted clusters of golden blossoms explode in vibrant saffron, deep mustard, and shimmering gold. The petals rise off the canvas in three-dimensional layers that catch the daylight, turning every passing ray of sun into pure warmth.',
    artistPerspective:
      '“On the street, people walk past you like you are already dead wood. They look at you with disgust. But inside me, I knew God had not finished with me. Rehema took me in, gave me food, listened to my tears, and believed in me before I believed in myself. They watered my soul. And just like these branches, the blossoms came back. If God can bring gold out of my broken life, He can do it for anyone.” — KAZE Collection Youth Artist',
    whyBuy:
      'An uplifting, luxurious statement piece that brings sunshine, celebration, and refined beauty into your dining room, living area, or reception space. The bold contrast between dark branches and radiant golden flowers is an unforgettable daily reminder of new beginnings and perseverance. Buying it directly rewards the dedicated youth artisans at KAZE Collection.',
    craftDetails: {
      technique: '3D palette-knife impasto petal modeling with metallic gold leaf luster glaze',
      support: 'Extra-wide heavy linen canvas on reinforced double stretcher chassis',
      finish: 'Archival non-yellowing satin resin finish',
      signature: 'Official KAZE Collection hallmark on lower left; studio seal on reverse',
      location: 'Kaze Collection Atelier, Kicukiro, Kigali',
    },
  },
  {
    id: 'kaze-04',
    title: 'Urugendo rw’Umucyo (Cathedral of Colors: Standing Together)',
    artistIdentifier: 'KAZE Collection',
    year: 2025,
    category: 'paintings',
    categoryLabel: 'Vibrant Multi-Layered Expressionism',
    medium: 'Fine artist acrylics and oil pastels with textured gesso on vertical canvas',
    dimensions: '85 × 135 cm (33.5 × 53.1 in)',
    framed: 'Minimalist satin black aluminum floating frame',
    priceRwf: 590000,
    priceUsd: 440,
    status: 'available',
    image: '/artworks/kaze-cathedral-of-light.jpg',
    detailImage: '/artworks/kaze-cathedral-of-light.jpg',
    emotionalTheme: 'Brotherhood, Loyalty & The Strength of Unity',
    hook: '“We came to Rehema as lonely shadows. Today, we stand side by side in living color.”',
    whatViewerSees:
      'A tall, luminous vertical cascade of colors that looks like light shining through a grand cathedral window or a line of strong brothers standing side by side. Rich royal violet, deep ocean blue, bright saffron, warm amber, and thick strokes of pure white paint rise together from floor to sky. The colors touch and lean into each other with intense energy. In the bottom left, the artist’s hand-painted white cipher marks their signature of victory.',
    artistPerspective:
      '“I spent years fighting alone. When you are on the street and hooked on drugs, you have no real friends—everyone is just trying to survive. When I came to Rehema, I met other young men who had the same scars. We didn’t judge each other. We prayed together, learned together, and built a brotherhood. That is what these tall bands of color are: each one is a brother. Together, we are unbreakable.” — KAZE Collection Youth Artist',
    whyBuy:
      'A breathtaking vertical work that adds color, energy, and soulful warmth to entryways, staircases, and high-ceiling living spaces. It celebrates loyalty, family, and the strength of standing together through life’s challenges. When your friends and guests ask about the story behind it, you share a real story of transformed young lives.',
    craftDetails: {
      technique: 'Vertical squeegee pigment drags, energetic palette knife impasto, and mineral wash',
      support: 'Triple-primed heavyweight cotton canvas on solid pine frame',
      finish: 'UV-protective satin varnish',
      signature: 'Signed with KAZE Collection studio seal on lower left; verified with registry',
      location: 'Kaze Collection Atelier, Kicukiro, Kigali',
    },
  },
  {
    id: 'kaze-05',
    title: 'Umubyeyi (The Mother Who Listened)',
    artistIdentifier: 'KAZE Collection',
    year: 2024,
    category: 'paintings',
    categoryLabel: 'Original Fine Art Portraiture on Canvas',
    medium: 'Classical oil and fine acrylic glazing with warm mineral pigments on Belgian linen',
    dimensions: '75 × 95 cm (29.5 × 37.4 in)',
    framed: 'Handcrafted natural light oak museum floating frame included',
    priceRwf: 750000,
    priceUsd: 560,
    status: 'available',
    image: '/artworks/founder-portrait.jpg',
    detailImage: '/artworks/founder-portrait.jpg',
    emotionalTheme: 'Maternal Grace, Unconditional Listening & Honor',
    hook: '“A true mother doesn’t ask what you broke; she asks where it hurts, and sits with you until you heal.”',
    whatViewerSees:
      'A masterclass in lifelike, soul-stirring portraiture. Look closely at her eyes—crinkled with genuine warmth, gentle wisdom, and deep compassion. She wears an elegant, draped pure white blouse against a calm, misty studio background that allows her radiant smile to become the beating heart of the entire piece. Her hand rests peacefully under her chin in a posture of patient, uninterrupted listening—honoring the Rwandan woman whose open door and listening ear gave hundreds of vulnerable young people their lives back.',
    artistPerspective:
      '“When I lived on the streets, nobody looked into my face with kindness. People looked away in shame or anger. But the first day I arrived at Rehema, Mama Assumpta sat down next to me on the bench, looked directly into my eyes, and asked: ‘My child, what is your dream?’ For two hours, she just listened without judging me. Painting this portrait was our way of saying thank you on behalf of every boy and girl whose life was restored by her patience. Every brushstroke is a prayer of thanksgiving.” — KAZE Collection Youth Atelier',
    whyBuy:
      '“Umubyeyi” brings an extraordinary aura of peace, maternal blessing, and graceful dignity into any family home, boardroom, or personal sanctuary. More than a portrait, it is an emblem of unconditional love and listening. Furthermore, this masterpiece demonstrates the elite portraiture capability of Kaze Collection artisans, giving patrons the rare opportunity to commission bespoke family or commemorative heirloom portraits painted with the same heart.',
    craftDetails: {
      technique: 'Multi-layered classical glazing, lifelike skin tone modeling, and soft-focus brush scumbling',
      support: 'Triple-primed Belgian linen canvas stretched over kiln-dried hardwood eucalyptus chassis',
      finish: 'Archival non-yellowing satin dammar protective varnish',
      signature: 'Signed on reverse with KAZE Collection hallmark and inscribed with commemorative blessing',
      location: 'Founder’s Suite & Kaze Showroom, Kicukiro, Kigali',
    },
  },
  {
    id: 'kaze-06',
    title: 'Urumuri rw’Ebenezer (Light of Ebenezer)',
    artistIdentifier: 'KAZE Collection',
    year: 2024,
    category: 'mixed-media',
    categoryLabel: 'Mixed Media on Wood',
    medium: 'Acrylic, gold foil, and hand-woven sisal threads on cedar panel',
    dimensions: '75 × 100 cm (29.5 × 39.4 in)',
    framed: 'Recessed shadow box frame in matte black',
    priceRwf: 620000,
    priceUsd: 460,
    status: 'showroom',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1200&q=80',
    emotionalTheme: 'Gratitude & Divine Faithfulness (1 Samuel 7:12)',
    hook: 'Inspired directly by 1 Samuel 7:12, this luminous piece radiates morning warmth through tactile woven fibers and radiant gold.',
    whatViewerSees:
      'A delicate rising dawn crests above textured horizontal bands reminiscent of Kigali’s terraced landscapes. Sisal fibers hand-dyed with indigo and eucalyptus bark are stitched through the panel, creating a three-dimensional play of cast shadows across the gold leaf sunrise.',
    artistPerspective:
      '“Ebenezer means ‘thus far the Lord has helped us.’ For me, it’s not an abstract verse — it is the fact that I woke up, picked up my brushes, and found peace after years of turmoil.” — KAZE Collection Youth Artist',
    whyBuy:
      'A centerpiece of spiritual reassurance and Rwandan artisanal heritage, blending traditional sisal weaving with contemporary painting.',
    craftDetails: {
      technique: 'Collaged hand-dyed Rwandan sisal with acrylic wash and metal leaf',
      support: 'Solid cedar hardwood board with reinforced cradled back',
      finish: 'Matte beeswax and archival wax sealant',
      signature: 'Signed and dated with KAZE Collection hallmark and Scripture reference',
      location: 'Showroom viewing by appointment, Kicukiro',
    },
  },
  {
    id: 'kaze-07',
    title: 'Mururanyi (Walking Together)',
    artistIdentifier: 'KAZE Collection',
    year: 2025,
    category: 'paintings',
    categoryLabel: 'Acrylic on Canvas',
    medium: 'Acrylic and Rwandan natural clay pigment on heavy primed cotton canvas',
    dimensions: '90 × 120 cm (35.4 × 47.2 in)',
    framed: 'Natural oak floating frame included',
    priceRwf: 480000,
    priceUsd: 360,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    emotionalTheme: 'Companionship & Unspoken Support',
    hook: '“Mururanyi” commands the room with its warm field of ochre and deep indigo, depicting two figures walking shoulder to shoulder along a ridge line.',
    whatViewerSees:
      'Layered horizontal brushstrokes capture the rhythm of Rwandan hills at twilight. The deliberate restraint in color allows the interplay between the deep midnight blue silhouettes and glowing terracotta sky to create an immediate feeling of companionship and steadfast presence.',
    artistPerspective:
      '“When I painted this, I was thinking about the people who stayed beside me when talking was too difficult. Walking together doesn’t always require words; it just requires not turning away.” — KAZE Collection Youth Artist',
    whyBuy:
      'A warm, grounding tribute to true friendship and presence in times of difficulty.',
    craftDetails: {
      technique: 'Heavy impasto applied with palette knife and broad hog-bristle brushes',
      support: 'Heavy-gauge Belgian linen stretched over kiln-dried eucalyptus wood',
      finish: 'Satin archival UV varnish',
      signature: 'Signed on reverse with KAZE Collection seal and date',
      location: 'Kicukiro Atelier, Kigali',
    },
  },
  {
    id: 'kaze-08',
    title: 'Guhumeka (To Breathe)',
    artistIdentifier: 'KAZE Collection',
    year: 2025,
    category: 'drawings',
    categoryLabel: 'Charcoal & Graphite',
    medium: 'Vine charcoal, compressed graphite, and white chalk on heavyweight French cotton paper',
    dimensions: '60 × 80 cm (23.6 × 31.5 in)',
    framed: 'Museum-glass conservation frame with 5 cm acid-free matting',
    priceRwf: 320000,
    priceUsd: 240,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=1200&q=80',
    emotionalTheme: 'Stillness & Mental Relief',
    hook: '“Guhumeka” draws the viewer into a moment of complete stillness through soft tonal gradations and masterful charcoal control.',
    whatViewerSees:
      'The artwork depicts an introspective portrait of a young man with eyes gently closed, his chin lifted toward an unseen window. The stark velvety blacks of the background dissolve into delicate, feathery strokes of light across the face and shoulders, conveying profound relief and dignity.',
    artistPerspective:
      '“For months my chest felt constantly tight with worry. Learning to draw gave me a way to slow my breathing down, stroke by stroke, until the quiet felt safe again.” — KAZE Collection Youth Artist',
    whyBuy:
      'An intimate, calming drawing that invites quiet reflection and deep breathing into private spaces.',
    craftDetails: {
      technique: 'Graduated shading with tortillon blending and eraser drawing',
      support: '300 gsm Arches 100% cotton rag paper',
      finish: 'Non-yellowing archival fixative',
      signature: 'Signed with KAZE Collection hallmark and archive seal on back',
      location: 'Kicukiro Atelier, Kigali',
    },
  },
  {
    id: 'kaze-09',
    title: 'Imbaraga z’Umutuzo (Inner Strength)',
    artistIdentifier: 'KAZE Collection',
    year: 2025,
    category: 'mixed-media',
    categoryLabel: 'Mixed Media Tapestry',
    medium: 'Bark cloth, acrylic paint, copper wire, and cow horn beads on stretched canvas',
    dimensions: '80 × 100 cm (31.5 × 39.4 in)',
    framed: 'Natural ash floating frame',
    priceRwf: 580000,
    priceUsd: 430,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
    emotionalTheme: 'Cultural Resilience & Healing Heritage',
    hook: 'Drawing on centuries-old Rwandan craft materials, this mixed media work weaves traditional bark cloth with contemporary copper wire and acrylic.',
    whatViewerSees:
      'Rich organic brown and ochre hues from natural Ficus bark cloth form an intricate patchwork held together by delicate hand-stitched copper wires. Geometric Imigongo-inspired triangles ripple across the upper hemisphere in rich cream and ebony.',
    artistPerspective:
      '“Bark cloth gets stronger when it is properly cured and softened with water. I felt like that bark: bruised at first, but with care, turned into something durable and beautiful.” — KAZE Collection Youth Artist',
    whyBuy:
      'A museum-worthy blend of Rwandan historical craft and modern youth revival.',
    craftDetails: {
      technique: 'Traditional bark cloth curing, wire stitching, and mineral pigment application',
      support: 'Heavy-duty wrapped wooden canvas chassis',
      finish: 'Matte botanical wax seal',
      signature: 'Signed on reverse with KAZE Collection artisan tag',
      location: 'Kicukiro Atelier, Kigali',
    },
  },
];

export function getArtworkById(id: string): Artwork | undefined {
  return REHEMA_ARTWORKS.find((art) => art.id === id);
}
