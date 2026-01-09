import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Clipboard, TrendUp } from '@phosphor-icons/react'
import { Toaster } from '@/components/ui/sonner'
import CoursesView from '@/components/CoursesView'
import QuizzesView from '@/components/QuizzesView'
import ScoresView from '@/components/ScoresView'

function App() {
  const [activeTab, setActiveTab] = useState('courses')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-accent">Formation Sous-Marin</h1>
          <p className="text-sm text-muted-foreground">Cours et Quiz de Formation</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen size={20} />
              <span className="hidden sm:inline">Cours</span>
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

          <TabsContent value="courses">
            <CoursesView />
          </TabsContent>

          <TabsContent value="quizzes">
            <QuizzesView />
          </TabsContent>

          <TabsContent value="scores">
            <ScoresView />
          </TabsContent>
        </Tabs>
      </main>

      <Toaster />
    </div>
  )
}

export default App
