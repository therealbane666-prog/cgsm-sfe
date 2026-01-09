import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Trophy } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { QuizAttempt } from '@/lib/data'
import { motion } from 'framer-motion'
import { getUserStorageKey } from '@/hooks/use-user-auth'

interface ScoresViewProps {
  userId?: number
}

export default function ScoresView({ userId }: ScoresViewProps) {
  const [attempts] = useKV<QuizAttempt[]>(getUserStorageKey('quiz-attempts', userId?.toString()), [])

  const handleDownloadScore = (attempt: QuizAttempt) => {
    const percentage = (attempt.score / attempt.totalQuestions * 100).toFixed(1)
    const date = new Date(attempt.date).toLocaleString('fr-FR')
    
    const report = `
FORMATION SOUS-MARIN
Rapport de Score
==================

Quiz: ${attempt.quizTitle}
Date: ${date}
Score: ${attempt.score}/${attempt.totalQuestions}
Pourcentage: ${percentage}%

Détails:
${attempt.answers.map((a, i) => `Question ${i + 1}: ${a.correct ? '✓ Correct' : '✗ Incorrect'}`).join('\n')}

Statut: ${parseFloat(percentage) >= 80 ? 'EXCELLENT' : parseFloat(percentage) >= 60 ? 'BIEN' : 'À AMÉLIORER'}
`

    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `score-${attempt.quizTitle.replace(/\s+/g, '-')}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success('Score téléchargé!', {
      description: 'Le fichier a été sauvegardé'
    })
  }

  if (!attempts || attempts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vos Scores</CardTitle>
          <CardDescription>
            Aucun quiz complété pour le moment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-4">
            <Trophy size={64} className="mx-auto text-muted-foreground" />
            <p className="text-muted-foreground">
              Complétez votre premier quiz pour voir vos scores ici
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const sortedAttempts = [...attempts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Vos Scores</CardTitle>
          <CardDescription>
            {attempts.length} quiz complété{attempts.length > 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {sortedAttempts.map((attempt, index) => {
          const percentage = (attempt.score / attempt.totalQuestions * 100).toFixed(0)
          const date = new Date(attempt.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })

          return (
            <motion.div
              key={attempt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{attempt.quizTitle}</CardTitle>
                      <CardDescription>{date}</CardDescription>
                    </div>
                    <Badge 
                      variant={
                        parseFloat(percentage) >= 80 ? 'default' : 
                        parseFloat(percentage) >= 60 ? 'secondary' : 
                        'outline'
                      }
                      className={
                        parseFloat(percentage) >= 80 ? 'bg-success text-success-foreground' : ''
                      }
                    >
                      {percentage}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-accent">
                        {attempt.score} / {attempt.totalQuestions}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Questions correctes
                      </p>
                    </div>
                    
                    <Button
                      onClick={() => handleDownloadScore(attempt)}
                      variant="outline"
                      className="gap-2"
                    >
                      <Download size={20} />
                      Télécharger
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
