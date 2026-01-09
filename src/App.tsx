import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Blueprint, Clipboard, TrendUp, Headphones } from '@phosphor-icons/react'
import { Toaster } from '@/components/ui/sonner'
import PlansView from '@/components/PlansView'
import QuizzesView from '@/components/QuizzesView'
import ScoresView from '@/components/ScoresView'
import AudioCourseView from '@/components/AudioCourseView'

function App() {
  const [activeTab, setActiveTab] = useState('audio-course')

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-accent">CGSM SFE 2026</h1>
          <p className="text-sm text-muted-foreground">SNA DE GRASSE</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-1">
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
            <AudioCourseView />
          </TabsContent>

          <TabsContent value="plans">
            <PlansView />
          </TabsContent>

          <TabsContent value="quizzes">
            <QuizzesView />
          </TabsContent>

          <TabsContent value="scores">
            <ScoresView />
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
