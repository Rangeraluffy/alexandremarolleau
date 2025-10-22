/**
 * Service pour gérer les appels à l'API GitHub
 * Supporte l'authentification optionnelle via token pour augmenter les limites de rate
 */

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Récupère les contributions d'un utilisateur GitHub
 * Pour une utilisation en production avec plus de requêtes, ajoutez un token GitHub
 * dans une variable d'environnement VITE_GITHUB_TOKEN
 */
export const fetchGitHubContributions = async (username) => {
  try {
    // Option 1: Utiliser l'API GraphQL (nécessite un token)
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    
    if (token) {
      return await fetchWithGraphQL(username, token);
    }
    
    // Option 2: Utiliser l'API REST publique (limitée)
    return await fetchWithREST(username);
  } catch (error) {
    console.error('Erreur lors de la récupération des contributions:', error);
    throw error;
  }
};

/**
 * Récupère les données via l'API REST publique
 * Limite: 60 requêtes par heure sans authentification
 */
const fetchWithREST = async (username) => {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}/events/public?per_page=100`);
  
  if (!response.ok) {
    throw new Error(`Erreur GitHub API: ${response.status}`);
  }
  
  const events = await response.json();
  return processEvents(events);
};

/**
 * Récupère les données via l'API GraphQL (recommandé pour production)
 * Nécessite un token mais permet d'obtenir exactement les données du calendrier
 */
const fetchWithGraphQL = async (username, token) => {
  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
              }
            }
          }
        }
      }
    }
  `;

  const today = new Date();
  const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

  const variables = {
    username,
    from: oneYearAgo.toISOString(),
    to: today.toISOString(),
  };

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Erreur GitHub GraphQL API: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`GraphQL Error: ${data.errors[0].message}`);
  }

  return processGraphQLData(data.data.user.contributionsCollection.contributionCalendar);
};

/**
 * Traite les événements de l'API REST pour créer un calendrier de contributions
 */
const processEvents = (events) => {
  const contributionMap = new Map();
  const today = new Date();
  const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

  // Initialiser les 365 derniers jours
  for (let i = 0; i < 365; i++) {
    const date = new Date(oneYearAgo);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    contributionMap.set(dateStr, { count: 0, level: 0, date: dateStr });
  }

  // Compter les contributions par jour
  events.forEach(event => {
    const date = new Date(event.created_at).toISOString().split('T')[0];
    if (contributionMap.has(date)) {
      const current = contributionMap.get(date);
      current.count++;
    }
  });

  // Calculer les niveaux (0-4)
  calculateLevels(contributionMap);

  return {
    contributions: contributionMap,
    stats: calculateStats(contributionMap),
  };
};

/**
 * Traite les données GraphQL
 */
const processGraphQLData = (calendar) => {
  const contributionMap = new Map();

  calendar.weeks.forEach(week => {
    week.contributionDays.forEach(day => {
      contributionMap.set(day.date, {
        count: day.contributionCount,
        level: 0,
        date: day.date,
      });
    });
  });

  calculateLevels(contributionMap);

  return {
    contributions: contributionMap,
    stats: {
      total: calendar.totalContributions,
      ...calculateStreaks(contributionMap),
    },
  };
};

/**
 * Calcule les niveaux de contribution (0-4) basés sur les quartiles
 */
const calculateLevels = (contributionMap) => {
  const counts = Array.from(contributionMap.values())
    .map(d => d.count)
    .filter(c => c > 0)
    .sort((a, b) => a - b);

  if (counts.length === 0) return;

  const q1 = counts[Math.floor(counts.length * 0.25)];
  const q2 = counts[Math.floor(counts.length * 0.5)];
  const q3 = counts[Math.floor(counts.length * 0.75)];

  contributionMap.forEach((value) => {
    if (value.count === 0) value.level = 0;
    else if (value.count <= q1) value.level = 1;
    else if (value.count <= q2) value.level = 2;
    else if (value.count <= q3) value.level = 3;
    else value.level = 4;
  });
};

/**
 * Calcule les statistiques globales
 */
const calculateStats = (contributionMap) => {
  const values = Array.from(contributionMap.values());
  const total = values.reduce((sum, day) => sum + day.count, 0);
  const streaks = calculateStreaks(contributionMap);

  return {
    total,
    ...streaks,
  };
};

/**
 * Calcule les séries de contributions
 */
const calculateStreaks = (contributionMap) => {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const sortedDates = Array.from(contributionMap.keys()).sort().reverse();

  for (const date of sortedDates) {
    if (contributionMap.get(date).count > 0) {
      tempStreak++;
      if (currentStreak === 0 || date === new Date().toISOString().split('T')[0]) {
        currentStreak = tempStreak;
      }
    } else {
      if (tempStreak > longestStreak) longestStreak = tempStreak;
      if (currentStreak > 0 && tempStreak === currentStreak) {
        // La série actuelle est terminée
        currentStreak = 0;
      }
      tempStreak = 0;
    }
  }

  if (tempStreak > longestStreak) longestStreak = tempStreak;

  return { currentStreak, longestStreak };
};

/**
 * Génère des données de démonstration
 */
export const generateMockContributions = () => {
  const contributionMap = new Map();
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseProb = isWeekend ? 0.4 : 0.7;
    
    const count = Math.random() > (1 - baseProb) 
      ? Math.floor(Math.random() * 12) + 1 
      : 0;

    contributionMap.set(dateStr, {
      count,
      level: 0,
      date: dateStr,
    });
  }

  calculateLevels(contributionMap);

  return {
    contributions: contributionMap,
    stats: calculateStats(contributionMap),
  };
};