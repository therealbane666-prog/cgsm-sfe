import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Blueprint, Clipboard, TrendUp, Headphones, User, SignOut, SignIn } from '@phosphor-icons/react'
import { Toaster } from '@/components/ui/sonner'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import PlansView from '@/components/PlansView'
import QuizzesView from '@/components/QuizzesView'
import ScoresView from '@/components/ScoresView'
import AudioCourseView from '@/components/AudioCourseView'
import { useUserAuth } from '@/hooks/use-user-auth'
import { toast } from 'sonner'

function App() {
  const [activeTab, setActiveTab] = useState('audio-course')
  const { user, loading: userLoading, refreshUser } = useUserAuth()

  const handleLogin = async () => {
    toast.info('Connexion en cours...', {
      description: 'Vous allez être redirigé vers GitHub pour vous authentifier.'
    })
    window.location.href = '/.auth/login'
  }

  const handleLogout = async () => {
    try {
      await fetch('/.auth/logout', { method: 'POST' })
      toast.success('Déconnexion réussie', {
        description: 'Vous avez été déconnecté de votre compte.'
      })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      toast.error('Erreur de déconnexion', {
        description: 'Une erreur est survenue lors de la déconnexion.'
      })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-accent">CGSM SFE 2026</h1>
              <p className="text-sm text-muted-foreground">SNA DE GRASSE</p>
            </div>
            
            {userLoading ? (
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 h-auto p-2 hover:bg-accent/10">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{user.login}</p>
                      <Badge variant="secondary" className="text-xs gap-1">
                        <User size={12} weight="fill" />
                        Connecté
                      </Badge>
                    </div>
                    <Avatar className="h-10 w-10 border-2 border-accent">
                      <AvatarImage src={user.avatarUrl} alt={user.login} />
                      <AvatarFallback>{user.login.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>
                    <User className="mr-2 h-4 w-4" />
                    <span>{user.login}</span>
                  </DropdownMenuItem>
                  {user.email && (
                    <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                      {user.email}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
                    <SignOut className="mr-2 h-4 w-4" />
                    <span>Changer de compte</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleLogin} variant="outline" className="gap-2">
                <SignIn size={16} />
                Se connecter
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-1">
        {user && (
          <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
            <p className="text-sm text-foreground">
              <strong>✓ Progression sauvegardée:</strong> Vos scores et paramètres sont synchronisés sur tous vos appareils avec votre compte <strong>{user.login}</strong>
            </p>
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="audio-course" className="flex items-center gap-2">
              <Headphones size={20} />
              <span className="hidden sm:inline">Cours Audio</span>
            </TabsTrigger>
            <TabsTrigger value="plans" className="flex items-center gap-2">
              <Blueprint size={20} />
              <span className="hidden sm:inline">Plans</span>
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center gap-2">
              <Clipboard size={20} />
              <span className="hidden sm:inline">Quiz</span>
            </TabsTrigger>
            <TabsTrigger value="scores" className="flex items-center gap-2">
              <TrendUp size={20} />
              <span className="hidden sm:inline">Scores</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="audio-course">
            <AudioCourseView userId={user?.id} />
          </TabsContent>

          <TabsContent value="plans">
            <PlansView />
          </TabsContent>

          <TabsContent value="quizzes">
            <QuizzesView userId={user?.id} />
          </TabsContent>

          <TabsContent value="scores">
            <ScoresView userId={user?.id} />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border bg-card/30 mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground font-semibold">
              Mentions Légales
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Site web créé, développé, déployé par <strong>Bastien Verdu</strong>, propriétaire intellectuel exclusif. 
              Toute reproduction ou copie strictement interdite.
            </p>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}

export default App
