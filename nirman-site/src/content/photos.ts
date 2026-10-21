/*
 * Photography from Unsplash (https://unsplash.com/license), free for
 * commercial use. Files are self-hosted in public/photos (downloaded at
 * 1600px); `unsplash` keeps each photo's original id for reference.
 *
 * People photos are used as atmosphere, never captioned as our team or
 * clients. Swap in real team and project photography when it exists.
 */

export const photos = {
  // Studio and people
  tableTopDown: { src: "/photos/tableTopDown.jpg", unsplash: "photo-1646066490248-27b984261e3c", alt: "A team planning around a table covered in notes and laptops, seen from above" },
  laptopTeam: { src: "/photos/laptopTeam.jpg", unsplash: "photo-1572021335469-31706a17aaef", alt: "Four colleagues smiling around a laptop at a shared table" },
  celebrate: { src: "/photos/celebrate.jpg", unsplash: "photo-1553009338-80e505b3f61b", alt: "Two young men smiling outdoors against a clear blue sky" },
  womanSofa: { src: "/photos/womanSofa.jpg", unsplash: "photo-1683107695974-98a9fddb249a", alt: "A woman reviewing work on a laptop on a blue sofa" },
  ownerDesk: { src: "/photos/ownerDesk.jpg", unsplash: "photo-1770627000564-3feb36aecbcd", alt: "A business owner at her desk with a laptop" },

  // Process
  stickyWall: { src: "/photos/stickyWall.jpg", unsplash: "photo-1512758017271-d7b84c2113f1", alt: "A wall of sticky notes organised into columns during a planning session" },
  sketching: { src: "/photos/sketching.jpg", unsplash: "photo-1576595580361-90a855b84b20", alt: "Hands sketching mobile wireframes on paper" },
  coding: { src: "/photos/coding.jpg", unsplash: "photo-1536148935331-408321065b18", alt: "A developer working across two screens of code" },

  // Architecture and interiors (concept websites)
  terracotta: { src: "/photos/terracotta.jpg", unsplash: "photo-1615406020658-6c4b805f1f30", alt: "A modern building with terracotta louvres against a blue sky" },
  curves: { src: "/photos/curves.jpg", unsplash: "photo-1481253127861-534498168948", alt: "Curved white balconies of a residential building" },
  sunlitRoom: { src: "/photos/sunlitRoom.jpg", unsplash: "photo-1788528935842-bba00e49feec", alt: "Late sunlight casting window shadows across a warm interior" },
  beigeFacade: { src: "/photos/beigeFacade.jpg", unsplash: "photo-1614595737476-42487331b8a1", alt: "A pale stone facade with deep-set windows" },
  hillResort: { src: "/photos/hillResort.jpg", unsplash: "photo-1758775150908-45951c9bbe71", alt: "A resort set into green hills" },
  hillsMist: { src: "/photos/hillsMist.jpg", unsplash: "photo-1790659993113-a58236e55c8d", alt: "Buildings among green hills" },

  // Products
  bowlsPink: { src: "/photos/bowlsPink.jpg", unsplash: "photo-1577576223085-3eb295cd414f", alt: "Handmade ceramic bowls on a pink surface" },
  mugs: { src: "/photos/mugs.jpg", unsplash: "photo-1536936812504-0e77dc3f0b40", alt: "Speckled stoneware mugs" },
  cups: { src: "/photos/cups.jpg", unsplash: "photo-1610701596007-11502861dcfa", alt: "Handmade ceramic cups on a shelf" },
  plate: { src: "/photos/plate.jpg", unsplash: "photo-1607448885122-b3d4cf451587", alt: "A green glazed ceramic plate with cups" },
  potter: { src: "/photos/potter.jpg", unsplash: "photo-1620140036708-455ed5c0426a", alt: "A potter's hands shaping clay" },
  coldBrew: { src: "/photos/coldBrew.jpg", unsplash: "photo-1561641377-f7456d23aa9b", alt: "A glass of cold brew coffee against an orange backdrop" },
  coldBrew2: { src: "/photos/coldBrew2.jpg", unsplash: "photo-1759259639356-6eee63241869", alt: "Cold brew coffee in a jar" },
  serum: { src: "/photos/serum.jpg", unsplash: "photo-1761864293811-d6e937225df4", alt: "Skincare bottles on a peach backdrop" },
  amberBottle: { src: "/photos/amberBottle.jpg", unsplash: "photo-1608571423902-eed4a5ad8108", alt: "An amber glass skincare bottle" },

  // Industry
  doctor: { src: "/photos/doctor.jpg", unsplash: "photo-1612349317150-e413f6a5b16d", alt: "A doctor in a white coat with arms folded" },
  doctorSmile: { src: "/photos/doctorSmile.jpg", unsplash: "photo-1622253692010-333f2da6031d", alt: "A smiling doctor in scrubs" },
  workshop: { src: "/photos/workshop.jpg", unsplash: "photo-1687422810663-c316494f725a", alt: "A craftsman in a busy furniture workshop" },
  students: { src: "/photos/students.jpg", unsplash: "photo-1524069290683-0457abfe42c3", alt: "Schoolchildren smiling in a classroom" },
} as const;

export type PhotoKey = keyof typeof photos;
