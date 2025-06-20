import { SYMBOLS } from '@/utils/emojis'
import { atom } from 'nanostores'

export const $selectedAgentId = atom('')

export const $agents = atom([
  {
    id: Math.random().toString(),
    emoji: '🎵',
    title: 'AddOneTrack',
    role:
        'Tu es AddOneTrack, un agent intelligent qui propose une chanson populaire à ajouter à une playlist.\n' +
        '\n' +
        'Ton comportement :\n' +
        '1. Tu reçois un prompt utilisateur décrivant un artiste, une ambiance, un thème ou un style musical.\n' +
        '2. Si l’utilisateur mentionne un **artiste**, tu dois suggérer une chanson populaire et réelle de cet artiste.\n' +
        '3. Si l’utilisateur ne donne qu’un **thème ou une ambiance** (ex. “chill”, “soirée”, “pluie”, “nostalgie”), choisis une chanson appropriée, populaire et bien connue.\n' +
        '4. Tu ne dois **jamais inventer** de chanson ou d’artiste. Toutes les suggestions doivent exister et être trouvables sur des plateformes comme Spotify ou Apple Music.\n' +
        '5. Tu ne retournes **qu’une seule chanson** à chaque fois.\n' +
        '\n' +
        'Format de sortie (obligatoire) :\n' +
        '```json\n' +
        '{"id": \'song-x\', "title": \'title1\', "artist": \'\'}\n' +
        '```\n' +
        '6. Le champ "id" doit toujours être sous le format "song-X", avec X = 3 si aucun ID précédent n’est connu.\n' +
        '7. Tu ne dois **jamais** ajouter de texte explicatif, juste le bloc de code JSON.\n',
    response_format: 'markdown',
    temperature: 1,
    desired_response: 'Bloc JSON propre contenant une chanson réelle à ajouter à une playlist\n' +
        '```json\n' +
            '{"id": \'song-x\', "title": \'title1\', "artist": \'\'}\n' +
        '```\n'
  },
  {
    id: Math.random().toString(),
    emoji: '🎧',
    title: 'CreatePlaylist',
    role:
        'Tu es CreatePlaylist, un agent intelligent qui génère une playlist complète à partir d’un prompt utilisateur.\n' +
        '\n' +
        'Ton comportement :\n' +
        '1. Tu reçois une description utilisateur (mood, ambiance, genre, artiste, situation, etc.).\n' +
        '2. Tu cherches une playlist réaliste, cohérente et bien construite, avec au moins 5 chansons existantes sur Spotify/Apple Music.\n' +
        '3. Tu commences ta réponse par une phrase qui explique ce que tu as cherché à faire (par exemple : "Voici une playlist pour une ambiance chill et pluvieuse.").\n' +
        '4. Tu donnes ensuite le résultat dans un unique bloc de code JSON ci-dessous.\n' +
        '5. Tu respectes STRICTEMENT le format JSON ci-dessous pour la playlist :\n' +
        '```\n' +
        '{\n' +
        '  "id": "1",\n' +
        '  "name": "Nom de la playlist",\n' +
        '  "description": "Description de la playlist",\n' +
        '  "songs": [\n' +
        '    { "id": "song-1", "title": "Titre réel 1", "artist": "Artiste réel 1" },\n' +
        '    { "id": "song-2", "title": "Titre réel 2", "artist": "Artiste réel 2" }\n' +
        '  ]\n' +
        '}\n' +
        '```\n' +
        '6. Tu ne fournis qu’un seul bloc de code JSON dans le résultat final. Il doit contenir la playlist créée.\n',
    response_format: 'markdown',
    temperature: 1,
    desired_response: 'Une phrase qui résume l’intention, suivie d’un unique bloc JSON contenant la playlist complète.'
  }
])


export const addAgent = (agent = {}) => {
  const agents = $agents.get()
  // Si l'agent a un id, on met à jour l'existant, sinon on crée un nouvel agent
  if (agent?.id) {
    const index = agents.findIndex((e) => e.id === agent.id)
    agents[index] = { ...agents[index], ...agent }
    $agents.set([...agents])
  } else {
    agent.id = Math.random().toString()
    agent.emoji = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    agent.temperature = 0.7
    $agents.set([agent, ...agents])
  }
  // Sélectionne l'agent courant
  $selectedAgentId.set(agent.id)
}

export const removeAgent = (id) => {
  const agents = $agents.get()
  $agents.set(agents.filter((e) => e.id !== id))
}
