import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchGitHubContributions, generateMockContributions } from '../services/githubService';

gsap.registerPlugin(ScrollTrigger);

const GitHubContributions = ({ username = 'Rangeraluffy' }) => {
  const [contributions, setContributions] = useState(new Map());
  const [stats, setStats] = useState({ total: 0, currentStreak: 0, longestStreak: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gridRef = useRef(null);
  const containerRef = useRef(null);

  // Injecter le CSS pour les couleurs
  useEffect(() => {
    // Créer une balise style si elle n'existe pas déjà
    let styleTag = document.getElementById('github-contribution-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'github-contribution-styles';
      styleTag.innerHTML = `
        /* Mode clair */
        .contribution-level-0 { background-color: #ebedf0; }
        .contribution-level-1 { background-color: #9be9a8; }
        .contribution-level-2 { background-color: #40c463; }
        .contribution-level-3 { background-color: #30a14e; }
        .contribution-level-4 { background-color: #216e39; }

        /* Mode sombre */
        .dark .contribution-level-0 { background-color: #2d333b; }
        .dark .contribution-level-1 { background-color: #0e4429; }
        .dark .contribution-level-2 { background-color: #006d32; }
        .dark .contribution-level-3 { background-color: #26a641; }
        .dark .contribution-level-4 { background-color: #39d353; }

        /* Légende - mode clair */
        .legend-level-0 { background-color: #ebedf0; }
        .legend-level-1 { background-color: #9be9a8; }
        .legend-level-2 { background-color: #40c463; }
        .legend-level-3 { background-color: #30a14e; }
        .legend-level-4 { background-color: #216e39; }

        /* Légende - mode sombre */
        .dark .legend-level-0 { background-color: #2d333b; }
        .dark .legend-level-1 { background-color: #0e4429; }
        .dark .legend-level-2 { background-color: #006d32; }
        .dark .legend-level-3 { background-color: #26a641; }
        .dark .legend-level-4 { background-color: #39d353; }
      `;
      document.head.appendChild(styleTag);
    }

    return () => {

    };
  }, []);

  useEffect(() => {
    const loadContributions = async () => {
      try {
        setLoading(true);
        const data = await fetchGitHubContributions(username);
        setContributions(data.contributions);
        setStats(data.stats);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des contributions:', err);
        setError(err.message);
        
        const mockData = generateMockContributions();
        setContributions(mockData.contributions);
        setStats(mockData.stats);
      } finally {
        setLoading(false);
      }
    };

    loadContributions();
  }, [username]);

  useEffect(() => {
    if (!containerRef.current || loading) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, [loading]);

  const getLevelColor = (level) => {
    // Couleurs officielles GitHub (mode clair et sombre)
    const colors = {
      light: {
        0: '#ebedf0', // Aucune contribution - gris clair
        1: '#9be9a8', // 1-3 contributions
        2: '#40c463', // 4-6 contributions
        3: '#30a14e', // 7-9 contributions
        4: '#216e39', // 10+ contributions
      },
      dark: {
        0: '#2d333b', // Aucune contribution - gris foncé (au lieu de noir)
        1: '#0e4429', // 1-3 contributions
        2: '#006d32', // 4-6 contributions
        3: '#26a641', // 7-9 contributions
        4: '#39d353', // 10+ contributions
      }
    };
    
    return {
      light: colors.light[level],
      dark: colors.dark[level],
    };
  };

  const getWeeksData = () => {
    const weeks = [];
    const dates = Array.from(contributions.keys()).sort();

    for (let i = 0; i < dates.length; i += 7) {
      const week = dates.slice(i, i + 7);
      if (i === 0 && week.length < 7) {
        const firstDay = new Date(week[0]);
        const dayOfWeek = firstDay.getDay();
        for (let j = 0; j < dayOfWeek; j++) {
          week.unshift(null);
        }
      }
      weeks.push(week);
    }
    
    return weeks;
  };

  const getMonthLabels = () => {
    const months = [];
    const dates = Array.from(contributions.keys()).sort();
    let currentMonth = '';
    let weekIndex = 0;

    dates.forEach((date, index) => {
      const monthName = new Date(date).toLocaleDateString('en-US', { month: 'short' });
      
      if (monthName !== currentMonth && index % 7 === 0) {
        months.push({ name: monthName, weekIndex });
        currentMonth = monthName;
      }
      
      if (index % 7 === 0) weekIndex++;
    });

    return months;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
          <span className="text-gray-600 dark:text-gray-400">Chargement des contributions...</span>
        </div>
      </div>
    );
  }

  const weeks = getWeeksData();
  const monthLabels = getMonthLabels();

  return (
    <div ref={containerRef} className="w-full">
      {/* Header - Style GitHub */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {stats.total} contributions in the last year
          </h3>
          <a 
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline dark:text-white flex items-center gap-1"
          >
            View on GitHub
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
        </div>

        {error && (
          <div className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded border border-yellow-200 dark:border-yellow-800">
            ⚠️ Mode démo activé - {error}
          </div>
        )}
      </div>

      {/* Contribution Graph - Style GitHub */}
      <div className="bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-gray-700 rounded-md p-4">
        <div 
          ref={gridRef}
          className="w-full"
        >
          <div className="flex gap-1 w-full">
            {/* Labels des jours de la semaine */}
            <div className="flex flex-col justify-between pr-2 text-xs text-gray-600 dark:text-gray-400 flex-shrink-0">
              <span style={{ height: '11px', lineHeight: '11px' }}>Mon</span>
              <span style={{ height: '11px', lineHeight: '11px' }} className="invisible">Wed</span>
              <span style={{ height: '11px', lineHeight: '11px' }}>Wed</span>
              <span style={{ height: '11px', lineHeight: '11px' }} className="invisible">Fri</span>
              <span style={{ height: '11px', lineHeight: '11px' }}>Fri</span>
              <span style={{ height: '11px', lineHeight: '11px' }} className="invisible">Sun</span>
              <span style={{ height: '11px', lineHeight: '11px' }} className="invisible">Sun</span>
            </div>

            {/* Grille de contributions */}
            <div className="flex flex-col flex-1 min-w-0">
              {/* Labels des mois */}
              <div className="flex mb-1 h-4">
                {monthLabels.map((month, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-gray-600 dark:text-gray-400"
                    style={{ 
                      marginLeft: idx === 0 ? 0 : '0px',
                      width: '65px'
                    }}
                  >
                    {month.name}
                  </span>
                ))}
              </div>

              {/* Grille des contributions */}
              <div className="flex gap-1 flex-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1 flex-1">
                    {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                      const date = week[dayIndex];
                      const data = date ? contributions.get(date) : null;
                      const colors = data ? getLevelColor(data.level) : getLevelColor(0);
                      
                      if (!date) {
                        return (
                          <div
                            key={dayIndex}
                            className="w-full aspect-square"
                            style={{ minWidth: '11px', minHeight: '11px' }}
                          />
                        );
                      }

                      return (
                        <div
                          key={date}
                          className={`contribution-cell w-full aspect-square rounded-sm transition-all duration-200 hover:ring-2 hover:ring-gray-400 dark:hover:ring-gray-500 cursor-pointer group relative contribution-level-${data.level}`}
                          style={{
                            minWidth: '11px',
                            minHeight: '11px'
                          }}
                          title={`${data?.count || 0} contributions on ${new Date(date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}`}
                        >
                          {/* Tooltip personnalisé au hover */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity">
                            {data?.count || 0} contributions
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Légende - Style GitHub */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-600 dark:text-gray-400">
          <a 
            href="https://docs.github.com/articles/viewing-contributions-on-your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
          >
            Learn how we count contributions
          </a>
          
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-[11px] h-[11px] rounded-sm legend-level-${level}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubContributions;