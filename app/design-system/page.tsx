"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Play, Pause, AlertCircle, CheckCircle2, Info, Zap, Trophy, Target, Flame } from "lucide-react"

export default function DesignSystemPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header title="Design System" showNotifications={false} />

        <main className="container max-w-6xl py-8 px-4 space-y-12">
          {/* Introduction */}
          <section>
            <h1 className="font-display font-bold text-4xl mb-4">FocusFlow Design System</h1>
            <p className="text-lg text-muted-foreground">
              Sistema de design completo do FocusFlow com todos os componentes, cores, tipografia e padrões visuais.
            </p>
          </section>

          {/* Colors */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-bold text-3xl mb-2">Paleta de Cores</h2>
              <p className="text-muted-foreground">Cores principais do sistema baseadas em azul tradicional</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Primary</CardTitle>
                  <CardDescription>Cor principal do sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-20 rounded-lg bg-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-mono">#0066CC</p>
                    <p className="text-xs text-muted-foreground">Usado em botões principais, links e destaques</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Secondary</CardTitle>
                  <CardDescription>Cor secundária</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-20 rounded-lg bg-secondary" />
                  <div className="space-y-1">
                    <p className="text-sm font-mono">#F1F5F9</p>
                    <p className="text-xs text-muted-foreground">Backgrounds e elementos secundários</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accent</CardTitle>
                  <CardDescription>Cor de destaque</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-20 rounded-lg bg-accent" />
                  <div className="space-y-1">
                    <p className="text-sm font-mono">#E0F2FE</p>
                    <p className="text-xs text-muted-foreground">Hover states e destaques suaves</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Success</CardTitle>
                  <CardDescription>Feedback positivo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-20 rounded-lg bg-success" />
                  <div className="space-y-1">
                    <p className="text-sm font-mono">#10B981</p>
                    <p className="text-xs text-muted-foreground">Conquistas e ações bem-sucedidas</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Warning</CardTitle>
                  <CardDescription>Alertas e avisos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-20 rounded-lg bg-warning" />
                  <div className="space-y-1">
                    <p className="text-sm font-mono">#F59E0B</p>
                    <p className="text-xs text-muted-foreground">Avisos e atenção necessária</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Destructive</CardTitle>
                  <CardDescription>Ações destrutivas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-20 rounded-lg bg-destructive" />
                  <div className="space-y-1">
                    <p className="text-sm font-mono">#EF4444</p>
                    <p className="text-xs text-muted-foreground">Erros e ações perigosas</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Typography */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-bold text-3xl mb-2">Tipografia</h2>
              <p className="text-muted-foreground">Hierarquia de texto e estilos tipográficos</p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h1 className="font-display font-bold text-4xl mb-2">Heading 1</h1>
                  <p className="text-sm text-muted-foreground font-mono">font-display font-bold text-4xl</p>
                </div>
                <div>
                  <h2 className="font-display font-bold text-3xl mb-2">Heading 2</h2>
                  <p className="text-sm text-muted-foreground font-mono">font-display font-bold text-3xl</p>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-2xl mb-2">Heading 3</h3>
                  <p className="text-sm text-muted-foreground font-mono">font-display font-semibold text-2xl</p>
                </div>
                <div>
                  <p className="text-base mb-2">Body Text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p className="text-sm text-muted-foreground font-mono">text-base</p>
                </div>
                <div>
                  <p className="text-sm mb-2">Small Text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p className="text-sm text-muted-foreground font-mono">text-sm</p>
                </div>
                <div>
                  <p className="text-xs mb-2">Extra Small Text - Lorem ipsum dolor sit amet.</p>
                  <p className="text-sm text-muted-foreground font-mono">text-xs</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Buttons */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-bold text-3xl mb-2">Botões</h2>
              <p className="text-muted-foreground">Variações de botões e seus estados</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Variantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tamanhos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Com Ícones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button>
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar Sessão
                  </Button>
                  <Button variant="outline">
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Zap className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Badges */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-bold text-3xl mb-2">Badges</h2>
              <p className="text-muted-foreground">Indicadores de status e categorias</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge className="bg-success text-white">Success</Badge>
                  <Badge className="bg-warning text-white">Warning</Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Cards */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-bold text-3xl mb-2">Cards</h2>
              <p className="text-muted-foreground">Containers de conteúdo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Card Simples</CardTitle>
                  <CardDescription>Descrição do card</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Conteúdo do card com informações relevantes para o usuário.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    Card com Ícone
                  </CardTitle>
                  <CardDescription>Card destacado com borda colorida</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Card com destaque visual usando borda colorida e ícone.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Forms */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-bold text-3xl mb-2">Formulários</h2>
              <p className="text-muted-foreground">Inputs e elementos de formulário</p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled">Input Desabilitado</Label>
                  <Input id="disabled" disabled placeholder="Campo desabilitado" />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Progress */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-bold text-3xl mb-2">Progress Bars</h2>
              <p className="text-muted-foreground">Indicadores de progresso</p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso 25%</span>
                    <span className="text-muted-foreground">25/100</span>
                  </div>
                  <Progress value={25} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso 50%</span>
                    <span className="text-muted-foreground">50/100</span>
                  </div>
                  <Progress value={50} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso 75%</span>
                    <span className="text-muted-foreground">75/100</span>
                  </div>
                  <Progress value={75} />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Alerts */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-bold text-3xl mb-2">Alertas</h2>
              <p className="text-muted-foreground">Mensagens de feedback e notificações</p>
            </div>

            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Informação</AlertTitle>
                <AlertDescription>Esta é uma mensagem informativa para o usuário.</AlertDescription>
              </Alert>

              <Alert className="border-success text-success">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Sucesso</AlertTitle>
                <AlertDescription>Operação realizada com sucesso!</AlertDescription>
              </Alert>

              <Alert className="border-warning text-warning">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Atenção</AlertTitle>
                <AlertDescription>Você precisa prestar atenção nesta informação.</AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>Ocorreu um erro ao processar sua solicitação.</AlertDescription>
              </Alert>
            </div>
          </section>

          {/* Tabs */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-bold text-3xl mb-2">Tabs</h2>
              <p className="text-muted-foreground">Navegação por abas</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <Tabs defaultValue="tab1">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="mt-4">
                    <p className="text-sm text-muted-foreground">Conteúdo da primeira aba.</p>
                  </TabsContent>
                  <TabsContent value="tab2" className="mt-4">
                    <p className="text-sm text-muted-foreground">Conteúdo da segunda aba.</p>
                  </TabsContent>
                  <TabsContent value="tab3" className="mt-4">
                    <p className="text-sm text-muted-foreground">Conteúdo da terceira aba.</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>

          {/* Icons */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-bold text-3xl mb-2">Ícones</h2>
              <p className="text-muted-foreground">Biblioteca de ícones Lucide</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Play className="w-6 h-6" />
                    <span className="text-xs text-center">Play</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Pause className="w-6 h-6" />
                    <span className="text-xs text-center">Pause</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Trophy className="w-6 h-6" />
                    <span className="text-xs text-center">Trophy</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Target className="w-6 h-6" />
                    <span className="text-xs text-center">Target</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Flame className="w-6 h-6" />
                    <span className="text-xs text-center">Flame</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Zap className="w-6 h-6" />
                    <span className="text-xs text-center">Zap</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="text-xs text-center">Check</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle className="w-6 h-6" />
                    <span className="text-xs text-center">Alert</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Spacing */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-bold text-3xl mb-2">Espaçamento</h2>
              <p className="text-muted-foreground">Sistema de espaçamento baseado em múltiplos de 4px</p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">gap-2 (8px)</p>
                  <div className="flex gap-2">
                    <div className="w-12 h-12 bg-primary rounded" />
                    <div className="w-12 h-12 bg-primary rounded" />
                    <div className="w-12 h-12 bg-primary rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">gap-4 (16px)</p>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded" />
                    <div className="w-12 h-12 bg-primary rounded" />
                    <div className="w-12 h-12 bg-primary rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">gap-6 (24px)</p>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-primary rounded" />
                    <div className="w-12 h-12 bg-primary rounded" />
                    <div className="w-12 h-12 bg-primary rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Border Radius */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display font-bold text-3xl mb-2">Border Radius</h2>
              <p className="text-muted-foreground">Arredondamento de bordas</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-20 bg-primary rounded-sm" />
                    <p className="text-sm text-center">rounded-sm</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-20 bg-primary rounded" />
                    <p className="text-sm text-center">rounded</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-20 bg-primary rounded-lg" />
                    <p className="text-sm text-center">rounded-lg</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-20 bg-primary rounded-full" />
                    <p className="text-sm text-center">rounded-full</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}
