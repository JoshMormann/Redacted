import { CardData, CharacterCardData, LocationCardData, EventCardData, EvidenceCardData, PhenomenonCardData, ConspiracyCardData } from '../types/CardTypes';

// Initial card set based on our design
export const initialCardSet: CardData[] = [
  // UFO Researchers
  {
    id: 'char-1',
    name: 'Dr. Steven Disclosure',
    cost: 4,
    power: 3,
    type: 'Character',
    faction: 'UFO Researcher',
    abilityText: 'Once per turn, reveal the top card of your deck. If it\'s an Evidence card, add it to your hand.',
    flavorText: 'The truth isn\'t just out there—it\'s in my PowerPoint presentation.'
  },
  {
    id: 'char-2',
    name: 'Stan Freeman',
    cost: 5,
    power: 3, // Adjusted per balance document
    type: 'Character',
    faction: 'UFO Researcher',
    abilityText: 'Your Evidence cards cannot be debunked on the turn they are played.',
    flavorText: 'I don\'t need a physics degree to know that\'s not swamp gas—but I have one anyway.'
  },
  {
    id: 'char-3',
    name: 'Jacques Valley',
    cost: 5, // Adjusted per balance document
    power: 3,
    type: 'Character',
    faction: 'UFO Researcher',
    abilityText: 'You may play Phenomenon cards as if they were from any faction.',
    flavorText: 'They\'re not aliens—they\'re interdimensional tourists with terrible manners.'
  },
  {
    id: 'char-4',
    name: 'Giorgio "Hair Theory" Tsoukalakis',
    cost: 3,
    power: 2,
    type: 'Character',
    faction: 'UFO Researcher',
    abilityText: 'Whenever you play an Ancient Aliens card, gain 2 Credibility.',
    flavorText: 'I\'m not saying it was aliens... but it was definitely aliens.'
  },
  {
    id: 'char-5',
    name: 'Ross Investigator',
    cost: 5,
    power: 4,
    type: 'Character',
    faction: 'UFO Researcher',
    abilityText: 'Once per turn, you may look at the top 3 cards of any player\'s deck and rearrange them.',
    flavorText: 'I\'ve got sources. Unnamed sources. The best unnamed sources.'
  },

  // Government Officials
  {
    id: 'char-6',
    name: 'Director of Special Projects',
    cost: 6,
    power: 4, // Adjusted per balance document
    type: 'Character',
    faction: 'Government',
    abilityText: 'Once per turn, you may "classify" an opponent\'s Evidence card (it cannot be used until declassified).',
    flavorText: 'That information is classified. So is my coffee order.'
  },
  {
    id: 'char-7',
    name: 'Project Blue Book Supervisor',
    cost: 4,
    power: 3,
    type: 'Character',
    faction: 'Government',
    abilityText: 'You may play one additional Event card during your turn.',
    flavorText: 'Swamp gas reflecting off Venus should explain everything nicely.'
  },
  {
    id: 'char-8',
    name: 'Former Defense Secretary',
    cost: 7,
    power: 6,
    type: 'Character',
    faction: 'Government',
    abilityText: 'When played, reveal the top 5 cards of your deck. Add any Government cards to your hand.',
    flavorText: 'Now that I\'m retired, let me tell you what REALLY happened...'
  },
  {
    id: 'char-9',
    name: 'Majestic-12 Member',
    cost: 7, // Adjusted per balance document
    power: 5, // Adjusted per balance document
    type: 'Character',
    faction: 'Government',
    abilityText: 'Once per turn, you may take control of an opponent\'s Location card.',
    flavorText: 'We don\'t exist. And we definitely don\'t have a secret handshake.'
  },
  {
    id: 'char-10',
    name: 'Pentagon UAP Task Force',
    cost: 5,
    power: 4,
    type: 'Character',
    faction: 'Government',
    abilityText: 'When an opponent plays a Phenomenon card, you may draw a card.',
    flavorText: 'We\'re not saying they\'re alien spacecraft, but we\'ve ruled out everything else.'
  },

  // Whistleblowers
  {
    id: 'char-11',
    name: 'David G., Intelligence Officer',
    cost: 5, // Adjusted per balance document
    power: 3, // Adjusted per balance document
    type: 'Character',
    faction: 'Whistleblower',
    abilityText: 'When played, advance the Disclosure Meter by 2.',
    flavorText: 'I can\'t tell you what I know, but I can tell you that I know things I can\'t tell you.'
  },
  {
    id: 'char-12',
    name: 'Bob L., Area 51 Engineer',
    cost: 5,
    power: 3,
    type: 'Character',
    faction: 'Whistleblower',
    abilityText: 'Once per turn, you may reveal an "Alien Technology" card from your hand to gain 3 Credibility.',
    flavorText: 'Element 115? I practically used it as a paperweight.'
  },
  {
    id: 'char-13',
    name: 'Luis E., Program Director',
    cost: 6, // Adjusted per balance document
    power: 4, // Adjusted per balance document
    type: 'Character',
    faction: 'Whistleblower',
    abilityText: 'Your Phenomenon cards cost 2 less Credibility to play.',
    flavorText: 'I resigned in protest. The paperwork is classified.'
  },
  {
    id: 'char-14',
    name: 'Anonymous Pentagon Source',
    cost: 3,
    power: 2,
    type: 'Character',
    faction: 'Whistleblower',
    abilityText: 'Cannot be targeted by opponent\'s cards or abilities.',
    flavorText: 'I\'d tell you my name, but then I\'d have to... find a new job.'
  },
  {
    id: 'char-15',
    name: 'Philip C., Military Intelligence',
    cost: 6,
    power: 4,
    type: 'Character',
    faction: 'Whistleblower',
    abilityText: 'When you play an "Alien Technology" card, draw a card.',
    flavorText: 'Microchips? Fiber optics? Night vision? You\'re welcome, humanity.'
  },

  // Cryptid Hunters
  {
    id: 'char-16',
    name: 'Bigfoot Expedition Leader',
    cost: 4,
    power: 3,
    type: 'Character',
    faction: 'Cryptid Hunter',
    abilityText: 'Your Cryptid cards cost 1 less Credibility to play.',
    flavorText: 'The trick is to bring plenty of beef jerky. They love beef jerky.'
  },
  {
    id: 'char-17',
    name: 'Loch Ness Photographer',
    cost: 3,
    power: 2,
    type: 'Character',
    faction: 'Cryptid Hunter',
    abilityText: 'Your "Blurry Photograph" Evidence cards cannot be debunked.',
    flavorText: 'Sure it\'s blurry—you try holding a camera steady while seeing a monster!'
  },
  {
    id: 'char-18',
    name: 'Mothman Witness',
    cost: 5,
    power: 4,
    type: 'Character',
    faction: 'Cryptid Hunter',
    abilityText: 'When a Disaster Event card is played, gain 3 Credibility.',
    flavorText: 'Those glowing red eyes still haunt my dreams... and my Instagram filters.'
  },
  {
    id: 'char-19',
    name: 'Chupacabra Tracker',
    cost: 4,
    power: 3,
    type: 'Character',
    faction: 'Cryptid Hunter',
    abilityText: 'When you play a Cryptid card, you may deal 1 damage to an opponent\'s Character.',
    flavorText: 'I follow the trail of mysteriously drained livestock and empty hot sauce bottles.'
  },
  {
    id: 'char-20',
    name: 'Jersey Devil Hunter',
    cost: 5,
    power: 4,
    type: 'Character',
    faction: 'Cryptid Hunter',
    abilityText: 'Once per turn, you may search the top 5 cards of your deck for a Cryptid card and add it to your hand.',
    flavorText: 'The Pine Barrens have everything: mosquitoes, poison ivy, and flying horse-demons.'
  },

  // Location Cards
  {
    id: 'loc-1',
    name: 'Area 51',
    cost: 5,
    type: 'Location',
    abilityText: 'Your Government cards cost 1 less Credibility to play. Once per turn, you may look at the top 3 cards of your opponent\'s deck.',
    flavorText: 'Nothing to see here. Especially not the thing we\'re hiding under that tarp.'
  },
  {
    id: 'loc-2',
    name: 'Roswell, New Mexico',
    cost: 4,
    type: 'Location',
    abilityText: 'When you play an Alien card, draw a card.',
    flavorText: 'Home of the world\'s most famous weather balloon incident.'
  },
  {
    id: 'loc-3',
    name: 'Skinwalker Ranch',
    cost: 6,
    type: 'Location',
    abilityText: 'Once per turn, you may swap a card in your hand with the top card of your deck.',
    flavorText: 'Where the paranormal goes to party. BYOB (Bring Your Own Bigelow).'
  },
  {
    id: 'loc-4',
    name: 'Point Pleasant, WV',
    cost: 5,
    type: 'Location',
    abilityText: 'Your Cryptid cards get +1 Power. If the Mothman is in play, advance the Disclosure Meter by 1 each turn.',
    flavorText: 'Come for the bridge disaster prophecies, stay for the annual Mothman Festival.'
  },
  {
    id: 'loc-5',
    name: 'Pine Barrens, NJ',
    cost: 4,
    type: 'Location',
    abilityText: 'Your Jersey Devil cards get +2 Power. Once per turn, you may "hide" one of your Characters (it cannot be targeted until your next turn).',
    flavorText: '1,700 square miles of trees, perfect for concealing flying horse-demons since 1735.'
  },

  // Event Cards
  {
    id: 'evt-1',
    name: 'Roswell Incident',
    cost: 6,
    type: 'Event',
    abilityText: 'Search your deck for an Alien or Evidence card and add it to your hand. Shuffle your deck.',
    flavorText: 'It was just a weather balloon. And those alien bodies? Weather balloon pilots.'
  },
  {
    id: 'evt-2',
    name: 'Phoenix Lights',
    cost: 5,
    type: 'Event',
    abilityText: 'All players must reveal their hands. You may take one Phenomenon card from an opponent\'s hand.',
    flavorText: 'Flares don\'t usually fly in perfect formation, Governor.'
  },
  {
    id: 'evt-3',
    name: 'Rendlesham Forest Incident',
    cost: 4,
    type: 'Event',
    abilityText: 'Advance the Disclosure Meter by 2. Draw a card for each Government Character you control.',
    flavorText: 'The British version of Roswell, but with more polite aliens and tea.'
  },
  {
    id: 'evt-4',
    name: 'Betty and Barney Hill Abduction',
    cost: 6, // Adjusted per balance document
    type: 'Event',
    abilityText: 'Take control of an opponent\'s Character with cost 5 or less until your next turn.', // Adjusted per balance document
    flavorText: 'The aliens were thorough, but they did honor their dental insurance.'
  },
  {
    id: 'evt-5',
    name: 'Nimitz Encounter',
    cost: 6, // Adjusted per balance document
    type: 'Event',
    abilityText: 'Reveal the top 7 cards of your deck. Add all Phenomenon and Evidence cards to your hand.', // Adjusted per balance document
    flavorText: 'Fast-moving tic-tacs with no visible propulsion? Must be mint-flavored weather balloons.'
  },

  // Evidence Cards
  {
    id: 'evd-1',
    name: 'Blurry Photograph',
    cost: 2,
    type: 'Evidence',
    abilityText: 'Attach to a Character. That Character gets +2 Power. If challenged, flip a coin. If tails, discard this card.',
    flavorText: 'It\'s clearly a [something] captured on [some kind of] film!'
  },
  {
    id: 'evd-2',
    name: 'Recovered Material',
    cost: 4,
    type: 'Evidence',
    abilityText: 'Attach to a Character. That Character gets +2 Power and cannot be targeted by opponent\'s Event cards. Draw a card when attached.', // Adjusted per balance document
    flavorText: 'It\'s either alien technology or something from the clearance bin at RadioShack.'
  },
  {
    id: 'evd-3',
    name: 'Classified Document',
    cost: 3,
    type: 'Evidence',
    abilityText: 'Attach to a Character. Once per turn, you may look at an opponent\'s hand.',
    flavorText: 'Most of it is redacted, but the coffee stains are quite revealing.'
  },
  {
    id: 'evd-4',
    name: 'Eyewitness Testimony',
    cost: 2,
    type: 'Evidence',
    abilityText: 'Attach to a Character. That Character gets +1 Power for each other Evidence card you control.',
    flavorText: 'I know what I saw! Unless you have a more reasonable explanation, then maybe that\'s what I saw.'
  },
  {
    id: 'evd-5',
    name: 'Radar Data',
    cost: 4, // Adjusted per balance document
    type: 'Evidence',
    abilityText: 'Attach to a Character. That Character gets +3 Power. Cannot be debunked by opponents with less than 10 Credibility.', // Adjusted per balance document
    flavorText: 'The object was moving at impossible speeds. So was the radar technician\'s career after reporting it.'
  },

  // Phenomenon Cards
  {
    id: 'phen-1',
    name: 'The Grays',
    cost: 7, // Adjusted per balance document
    power: 5,
    type: 'Phenomenon',
    abilityText: 'Once per turn, you may take control of an opponent\'s Evidence card.',
    flavorText: 'Big heads, small bodies, huge eyes, and absolutely no fashion sense.'
  },
  {
    id: 'phen-2',
    name: 'Bigfoot',
    cost: 7,
    power: 6,
    type: 'Phenomenon',
    abilityText: 'Cannot be targeted by opponent\'s cards or abilities unless they control a "Blurry Photograph" Evidence.',
    flavorText: 'Elusive, majestic, and surprisingly good at avoiding trail cameras.'
  },
  {
    id: 'phen-3',
    name: 'Mothman',
    cost: 8,
    power: 5,
    type: 'Phenomenon',
    abilityText: 'At the beginning of your turn, you may predict the top card of your deck. If correct, draw 3 cards.',
    flavorText: 'Half moth, half man, all doom prophecy.'
  },
  {
    id: 'phen-4',
    name: 'Men in Black',
    cost: 6,
    power: 4,
    type: 'Phenomenon',
    abilityText: 'When played, you may remove all Evidence cards from an opponent\'s Character.',
    flavorText: 'They\'ll make you forget everything you saw. Including where you parked your car.'
  },
  {
    id: 'phen-5',
    name: 'Reptilians',
    cost: 8, // Adjusted per balance document
    power: 6, // Adjusted per balance document
    type: 'Phenomenon',
    abilityText: 'You may play this card as if it were a copy of any Character card in play.',
    flavorText: 'They\'re just like us, except for the occasional molting.'
  },

  // Conspiracy Cards
  {
    id: 'cons-1',
    name: 'Global Coverup',
    cost: 7,
    type: 'Conspiracy',
    abilityText: 'All players must pay 1 extra Credibility to play Evidence cards.',
    flavorText: 'The truth isn\'t out there because we\'ve hidden it really, really well.'
  },
  {
    id: 'cons-2',
    name: 'Project Blue Book',
    cost: 5,
    type: 'Conspiracy',
    abilityText: 'Government Characters get +2 Power. Once per turn, you may "debunk" an opponent\'s Evidence card.',
    flavorText: 'Our conclusion before investigation: nothing to see here, folks.'
  },
  {
    id: 'cons-3',
    name: 'Ancient Aliens Theory',
    cost: 6,
    type: 'Conspiracy',
    abilityText: 'Once per turn, you may search your deck for a Phenomenon card and add it to your hand.',
    flavorText: 'How did they build the pyramids? Aliens. How did they build Stonehenge? Aliens. How did they build my IKEA furniture? Definitely aliens.'
  },
  {
    id: 'cons-4',
    name: 'Majestic-12 Documents',
    cost: 8,
    type: 'Conspiracy',
    abilityText: 'When played, each opponent must discard a random card from their hand.',
    flavorText: 'Totally authentic and not at all created on a 1980s typewriter.'
  },
  {
    id: 'cons-5',
    name: 'The Disclosure Movement',
    cost: 6,
    type: 'Conspiracy',
    abilityText: 'Advance the Disclosure Meter by 1 at the beginning of each of your turns.',
    flavorText: 'The truth will set you free! Also, please buy my book and attend my $500 workshop.'
  },
  
  // Special Win Condition Card
  {
    id: 'win-1',
    name: 'The Truth Is Out There',
    cost: 5,
    type: 'Event',
    abilityText: 'If the Disclosure Meter is at 10 or higher and you control at least 2 Phenomenon cards, you win the game.',
    flavorText: 'The truth was out there all along. And now everyone knows it.'
  }
];

// Helper function to get cards by type
export const getCardsByType = (type: string): CardData[] => {
  return initialCardSet.filter(card => card.type === type);
};

// Helper function to get cards by faction
export const getCardsByFaction = (faction: string): CardData[] => {
  return initialCardSet.filter(card => 'faction' in card && card.faction === faction);
};
