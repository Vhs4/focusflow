import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Zap, Target, Shield, Sparkles, TrendingUp, Heart, Clock } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/20">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-flow flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-display font-bold text-xl">FocusFlow</span>
          </div>
          <Link href="/login">
            <Button>Entrar</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Revolução em Bem-Estar Digital
          </div>

          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-balance leading-tight">
            Reconquiste seu <span className="text-primary">foco</span> e transforme sua relação com a tecnologia
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            FocusFlow é o primeiro treinador de foco digital com IA que combina neurociência, gamificação e saúde
            integrativa para jovens de 18-25 anos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Começar Gratuitamente
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Já tenho conta
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>IA Integrada</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <span>Saúde em Primeiro Lugar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: "52%", label: "Sentem que o sono afeta o foco" },
            { value: "73%", label: "Sofrem com impaciência digital" },
            { value: "89%", label: "Querem melhorar o foco" },
            { value: "24/7", label: "Suporte com IA" },
          ].map((stat, i) => (
            <Card key={i} className="p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">
            Um ecossistema completo de bem-estar digital
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Não é apenas um timer Pomodoro. É uma revolução tecnológica em saúde mental e produtividade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Brain,
              title: "Micro-Intervenções com IA",
              description:
                "Prompts de reflexão contextuais gerados por IA antes de cada sessão de foco para aumentar a consciência digital.",
            },
            {
              icon: Clock,
              title: "Timer Pomodoro Inteligente",
              description:
                "Sistema de foco com intervalos personalizados e análise de padrões de produtividade em tempo real.",
            },
            {
              icon: TrendingUp,
              title: "Análise de Ritmo de Consumo",
              description:
                "IA analisa seu comportamento de consumo de mídia e sugere um 'Detox de Velocidade' personalizado.",
            },
            {
              icon: Heart,
              title: "Rotinas de Desligamento Dinâmicas",
              description:
                "Rotinas noturnas personalizadas geradas por IA baseadas na qualidade do seu sono e uso de telas.",
            },
            {
              icon: Shield,
              title: "Alertas Preditivos de Distração",
              description:
                "Sistema preventivo que identifica padrões e envia alertas empáticos antes dos picos de distração.",
            },
            {
              icon: Sparkles,
              title: "Chatbot de Apoio Cognitivo",
              description:
                "Assistente 24/7 com técnicas de mindfulness, respiração e apoio emocional para ansiedade e frustração.",
            },
            {
              icon: Target,
              title: "Gamificação Saudável",
              description: "Sistema de pontos, níveis e conquistas que motiva sem criar ansiedade ou dependência.",
            },
            {
              icon: Zap,
              title: "Insights Comportamentais",
              description:
                "Análises profundas sobre seus padrões de foco, distração e uso de telas com recomendações personalizadas.",
            },
          ].map((feature, i) => (
            <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 bg-accent/30 rounded-3xl my-20">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Como funciona</h2>
          <p className="text-lg text-muted-foreground">
            Três passos simples para transformar sua relação com a tecnologia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: "01",
              title: "Cadastre-se gratuitamente",
              description: "Crie sua conta em menos de 1 minuto e comece sua jornada de transformação digital.",
            },
            {
              step: "02",
              title: "Configure seu perfil",
              description: "Responda perguntas sobre seus hábitos e objetivos para personalizar sua experiência.",
            },
            {
              step: "03",
              title: "Comece a treinar seu foco",
              description: "Use o timer inteligente, complete desafios e receba insights personalizados da IA.",
            },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 text-center bg-gradient-flow text-white">
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Pronto para reconquistar seu foco?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a milhares de jovens que estão transformando sua relação com a tecnologia e recuperando o controle
            sobre seu tempo e atenção.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Começar Agora - É Grátis
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-flow flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="font-display font-bold">FocusFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 FocusFlow. Revolucionando o bem-estar digital.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
