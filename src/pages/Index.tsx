import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface TarotCard {
  id: number;
  name: string;
  suit: string;
  meaning: string;
  reversed: boolean;
  description: string;
  keywords: string[];
}

const tarotDeck: TarotCard[] = [
  {
    id: 1,
    name: 'Дурак',
    suit: 'Старшие Арканы',
    meaning: 'Новые начинания, спонтанность, свобода',
    reversed: false,
    description: 'Карта новых возможностей и неожиданных путей. Призывает к принятию решений сердцем.',
    keywords: ['начало', 'свобода', 'риск', 'доверие']
  },
  {
    id: 2,
    name: 'Маг',
    suit: 'Старшие Арканы', 
    meaning: 'Сила воли, концентрация, мастерство',
    reversed: false,
    description: 'Символ личной силы и способности воплощать идеи в реальность.',
    keywords: ['воля', 'действие', 'мастерство', 'фокус']
  },
  {
    id: 3,
    name: 'Верховная Жрица',
    suit: 'Старшие Арканы',
    meaning: 'Интуиция, мудрость, тайные знания',
    reversed: false,
    description: 'Карта глубокой интуиции и скрытой мудрости. Призывает прислушаться к внутреннему голосу.',
    keywords: ['интуиция', 'мудрость', 'тайна', 'подсознание']
  },
  {
    id: 4,
    name: 'Императрица',
    suit: 'Старшие Арканы',
    meaning: 'Творчество, плодородие, материнство',
    reversed: false,
    description: 'Символ творческой энергии и изобилия во всех сферах жизни.',
    keywords: ['творчество', 'изобилие', 'забота', 'рост']
  },
  {
    id: 5,
    name: 'Император',
    suit: 'Старшие Арканы',
    meaning: 'Власть, стабильность, контроль',
    reversed: false,
    description: 'Карта лидерства и структуры. Символизирует порядок и авторитет.',
    keywords: ['власть', 'порядок', 'стабильность', 'контроль']
  }
];

export default function Index() {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [showReading, setShowReading] = useState(false);
  const [dailyCard, setDailyCard] = useState<TarotCard | null>(null);
  const [activeSection, setActiveSection] = useState('main');

  useEffect(() => {
    // Устанавливаем ежедневную карту
    const today = new Date().getDate();
    setDailyCard(tarotDeck[today % tarotDeck.length]);
  }, []);

  const drawThreeCards = () => {
    const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
    const drawn = shuffled.slice(0, 3);
    setSelectedCards(drawn);
    setShowReading(true);
    setActiveSection('reading');
  };

  const drawDailyCard = () => {
    if (dailyCard) {
      setSelectedCards([dailyCard]);
      setShowReading(true);
      setActiveSection('daily');
    }
  };

  const resetReading = () => {
    setSelectedCards([]);
    setShowReading(false);
    setActiveSection('main');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={20} className="text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Таро Мистик</h1>
                <p className="text-sm text-muted-foreground">Откройте тайны своего пути</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={resetReading}>
              <Icon name="Home" size={16} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Main Menu */}
        {activeSection === 'main' && (
          <div className="animate-fade-in">
            <div className="text-center mb-12 mystical-bg py-16 rounded-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                🔮 Добро пожаловать
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Позвольте картам Таро раскрыть тайны вашего прошлого, настоящего и будущего
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Ежедневная карта */}
              <Card className="tarot-card cursor-pointer group" onClick={drawDailyCard}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center group-hover:animate-mystical-glow">
                    <Icon name="Sun" size={24} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Карта дня</h3>
                  <p className="text-muted-foreground mb-4">
                    Получите руководство на сегодняшний день
                  </p>
                  {dailyCard && (
                    <Badge variant="secondary" className="animate-pulse">
                      {dailyCard.name}
                    </Badge>
                  )}
                </CardContent>
              </Card>

              {/* Расклад на 3 карты */}
              <Card className="tarot-card cursor-pointer group" onClick={drawThreeCards}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center group-hover:animate-mystical-glow">
                    <Icon name="Layout" size={24} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Расклад "Три карты"</h3>
                  <p className="text-muted-foreground">
                    Прошлое • Настоящее • Будущее
                  </p>
                </CardContent>
              </Card>

              {/* Колода карт */}
              <Card className="tarot-card cursor-pointer group" onClick={() => setActiveSection('deck')}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center group-hover:animate-mystical-glow">
                    <Icon name="BookOpen" size={24} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Колода Таро</h3>
                  <p className="text-muted-foreground">
                    Изучите значения всех карт
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Философская цитата */}
            <div className="text-center max-w-3xl mx-auto">
              <blockquote className="text-lg italic text-muted-foreground border-l-4 border-accent pl-6">
                "Карты Таро не предсказывают будущее — они освещают путь к нему через понимание настоящего."
              </blockquote>
            </div>
          </div>
        )}

        {/* Reading Section */}
        {showReading && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {activeSection === 'daily' ? '🌟 Ваша карта дня' : '🔮 Ваш расклад'}
              </h2>
              <p className="text-muted-foreground">
                {activeSection === 'daily' 
                  ? 'Послание звёзд на сегодняшний день'
                  : 'Взгляд в прошлое, настоящее и будущее'
                }
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {selectedCards.map((card, index) => (
                <Card key={card.id} className="tarot-card animate-card-flip" style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-20 h-32 mx-auto mb-4 bg-gradient-to-br from-accent/30 to-primary/30 rounded-lg flex items-center justify-center border-2 border-accent/20">
                        <span className="text-4xl">🃏</span>
                      </div>
                      <h3 className="text-xl font-bold text-accent">{card.name}</h3>
                      <Badge variant="outline" className="mt-2">
                        {card.suit}
                      </Badge>
                      {activeSection !== 'daily' && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {index === 0 ? 'Прошлое' : index === 1 ? 'Настоящее' : 'Будущее'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-accent mb-2">
                          Значение
                        </h4>
                        <p className="text-sm">{card.meaning}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-accent mb-2">
                          Толкование
                        </h4>
                        <p className="text-sm text-muted-foreground">{card.description}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-accent mb-2">
                          Ключевые слова
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {card.keywords.map((keyword, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button onClick={resetReading} variant="outline" size="lg">
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Новое гадание
              </Button>
            </div>
          </div>
        )}

        {/* Deck Section */}
        {activeSection === 'deck' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">📚 Колода Таро</h2>
                <p className="text-muted-foreground">Изучите значения всех карт</p>
              </div>
              <Button onClick={() => setActiveSection('main')} variant="outline">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tarotDeck.map((card) => (
                <Card key={card.id} className="tarot-card">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-16 bg-gradient-to-br from-accent/30 to-primary/30 rounded flex items-center justify-center border border-accent/20 flex-shrink-0">
                        <span className="text-sm">🃏</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-accent">{card.name}</h3>
                        <Badge variant="outline" className="text-xs mb-2">
                          {card.suit}
                        </Badge>
                        <p className="text-xs text-muted-foreground mb-2">{card.meaning}</p>
                        <div className="flex flex-wrap gap-1">
                          {card.keywords.slice(0, 2).map((keyword, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              ✨ Таро Мистик • Откройте свою судьбу через древнюю мудрость карт
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}