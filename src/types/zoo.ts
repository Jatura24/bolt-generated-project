export interface ZooItem {
  id: string
  name: string
  image: string
  cost: number
  category: 'moodeng' | 'decoration' | 'animal'
}

export interface PlacedItem extends ZooItem {
  x: number
  y: number
  rotation: number
}

export interface ZooOwner {
  id: string
  username: string
  avatar: string
}

export interface ZooData {
  id: string
  name: string
  owner: ZooOwner
  items: PlacedItem[]
}

// Store items data
export const storeItems: ZooItem[] = [
  {
    id: 'basic-moodeng',
    name: 'Basic Moodeng',
    image: '/assets/moodeng.png',
    cost: 100,
    category: 'moodeng'
  },
  {
    id: 'golden-moodeng',
    name: 'Golden Moodeng',
    image: '/assets/golden-moodeng.png',
    cost: 500,
    category: 'moodeng'
  },
  {
    id: 'hippo',
    name: 'Happy Hippo',
    image: '/assets/hippo-closed.png',
    cost: 300,
    category: 'animal'
  },
  {
    id: 'crocodile',
    name: 'Friendly Croc',
    image: '/assets/croc-exercise.png',
    cost: 250,
    category: 'animal'
  },
  {
    id: 'rabbit',
    name: 'Bouncy Rabbit',
    image: '/assets/rabbit-exercise.png',
    cost: 200,
    category: 'animal'
  },
  {
    id: 'tree',
    name: 'Shady Tree',
    image: '/assets/tree.png',
    cost: 75,
    category: 'decoration'
  },
  {
    id: 'pond',
    name: 'Duck Pond',
    image: '/assets/pond.png',
    cost: 200,
    category: 'decoration'
  }
]
