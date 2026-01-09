import { useState, useEffect, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, XCircle, ArrowRight, Timer, Gear } from '@phosphor-icons/react'
import { quizzes } from '@/lib/data'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import type { QuizAttempt } from '@/lib/data'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getUserStorageKey } from '@/hooks/use-user-auth'

interface QuizzesViewProps {
  userId?: number
}

export default function QuizzesView({ userId }: QuizzesViewProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean }[]>([])
  const [quizComplete, setQuizComplete] = useState(false)
  const [attempts, setAttempts] = useKV<QuizAttempt[]>(getUserStorageKey('quiz-attempts', userId?.toString()), [])
  
  const [timedMode, setTimedMode] = useKV<boolean>(getUserStorageKey('quiz-timed-mode', userId?.toString()), false)
  const [timePerQuestion, setTimePerQuestion] = useKV<number>(getUserStorageKey('quiz-time-per-question', userId?.toString()), 30)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const quiz = selectedQuiz ? quizzes[selectedQuiz] : null
  const question = quiz?.questions[currentQuestion]
  const progress = quiz ? ((currentQuestion + 1) / quiz.questions.length) * 100 : 0

  useEffect(() => {
    if (timedMode && selectedQuiz && !showFeedback && !quizComplete && timePerQuestion) {
      setTimeRemaining(timePerQuestion)
      
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            handleTimeExpired()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [currentQuestion, timedMode, selectedQuiz, showFeedback, quizComplete, timePerQuestion])

  const handleTimeExpired = useCallback(() => {
    if (selectedAnswer === null && question) {
      toast.error('Temps écoulé!', {
        description: 'Aucune réponse sélectionnée'
      })
      
      setShowFeedback(true)
      setAnswers(prev => [...prev, {
        questionId: question.id,
        correct: false
      }])
    }
  }, [selectedAnswer, question])

  const getTimerColor = () => {
    const timeLimit = timePerQuestion || 30
    const percentage = (timeRemaining / timeLimit) * 100
    if (percentage > 50) return 'text-success'
    if (percentage > 20) return 'text-accent'
    return 'text-destructive'
  }

  const getTimerProgress = () => {
    const timeLimit = timePerQuestion || 30
    return (timeRemaining / timeLimit) * 100
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !question) return

    const isCorrect = selectedAnswer === question.correctAnswer
    setShowFeedback(true)

    setAnswers(prev => [...prev, {
      questionId: question.id,
      correct: isCorrect
    }])

    if (isCorrect) {
      toast.success('Correct!', {
        description: question.explanation
      })
    } else {
      toast.error('Incorrect', {
        description: question.explanation
      })
    }
  }

  const handleNextQuestion = () => {
    if (!quiz) return

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      const score = answers.filter(a => a.correct).length
      const attempt: QuizAttempt = {
        id: Date.now().toString(),
        quizId: selectedQuiz!,
        quizTitle: quiz.title,
        score,
        totalQuestions: quiz.questions.length,
        date: new Date().toISOString(),
        answers
      }
      
      setAttempts((currentAttempts = []) => [...currentAttempts, attempt])
      setQuizComplete(true)
      
      toast.success('Quiz terminé!', {
        description: `Votre score: ${score}/${quiz.questions.length}`
      })
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setAnswers([])
    setQuizComplete(false)
  }

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null)
    handleRestartQuiz()
  }

  if (!selectedQuiz) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Sélectionnez un Quiz</h2>
          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Gear size={20} />
                Paramètres
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Paramètres du Quiz</DialogTitle>
                <DialogDescription>
                  Configurez le mode chronométré et le temps par question
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="timed-mode">Mode Chronométré</Label>
                    <p className="text-sm text-muted-foreground">
                      Activer le compte à rebours pour chaque question
                    </p>
                  </div>
                  <Switch
                    id="timed-mode"
                    checked={timedMode}
                    onCheckedChange={(checked) => setTimedMode(() => checked)}
                  />
                </div>

                {timedMode && (
                  <div className="space-y-2">
                    <Label htmlFor="time-per-question">Temps par Question</Label>
                    <Select
                      value={String(timePerQuestion || 30)}
                      onValueChange={(value) => setTimePerQuestion(() => Number(value))}
                    >
                      <SelectTrigger id="time-per-question">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 secondes</SelectItem>
                        <SelectItem value="30">30 secondes</SelectItem>
                        <SelectItem value="45">45 secondes</SelectItem>
                        <SelectItem value="60">60 secondes</SelectItem>
                        <SelectItem value="90">90 secondes</SelectItem>
                        <SelectItem value="120">2 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(quizzes).map(([id, quiz]) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className="cursor-pointer hover:border-accent transition-all duration-200 h-full"
                onClick={() => setSelectedQuiz(id)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  <CardDescription>
                    {quiz.questions.length} questions
                    {timedMode && (
                      <Badge variant="secondary" className="ml-2">
                        <Timer size={14} className="mr-1" />
                        {timePerQuestion}s
                      </Badge>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">
                    Cliquez pour commencer
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  if (quizComplete && quiz) {
    const score = answers.filter(a => a.correct).length
    const percentage = (score / quiz.questions.length) * 100

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Quiz Terminé!</CardTitle>
            <CardDescription>{quiz.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-accent">
                {percentage.toFixed(0)}%
              </div>
              <p className="text-xl">
                {score} / {quiz.questions.length} correct
              </p>
              
              {percentage >= 80 && (
                <Badge variant="default" className="bg-success text-success-foreground">
                  Excellent!
                </Badge>
              )}
              {percentage >= 60 && percentage < 80 && (
                <Badge variant="default" className="bg-accent text-accent-foreground">
                  Bien!
                </Badge>
              )}
              {percentage < 60 && (
                <Badge variant="secondary">
                  Continuez à pratiquer
                </Badge>
              )}
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleRestartQuiz}
                className="flex-1"
              >
                Recommencer
              </Button>
              <Button 
                onClick={handleBackToQuizzes}
                variant="outline"
                className="flex-1"
              >
                Autres Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25 }}
      >
        <div className="mb-4 space-y-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handleBackToQuizzes}
            >
              ← Retour
            </Button>
            <Badge variant="secondary">
              {currentQuestion + 1} / {quiz?.questions.length}
            </Badge>
          </div>
          
          <Progress value={progress} className="h-2" />

          {timedMode && !showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Timer size={24} className={getTimerColor()} weight="fill" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Temps restant
                  </span>
                </div>
                <div className={`text-3xl font-bold ${getTimerColor()}`}>
                  {timeRemaining}s
                </div>
              </div>
              <Progress 
                value={getTimerProgress()} 
                className="h-2"
              />
            </motion.div>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {question?.question}
            </CardTitle>
            <CardDescription>
              {quiz?.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {question?.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === question.correctAnswer
                const showCorrect = showFeedback && isCorrect
                const showIncorrect = showFeedback && isSelected && !isCorrect

                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    variant={
                      showCorrect ? 'default' : 
                      showIncorrect ? 'destructive' : 
                      isSelected ? 'secondary' : 
                      'outline'
                    }
                    className={`w-full justify-start text-left h-auto py-4 px-4 ${
                      showCorrect ? 'bg-success hover:bg-success' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <span className="font-semibold shrink-0">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="flex-1">{option}</span>
                      {showCorrect && (
                        <CheckCircle size={24} weight="fill" className="shrink-0" />
                      )}
                      {showIncorrect && (
                        <XCircle size={24} weight="fill" className="shrink-0" />
                      )}
                    </div>
                  </Button>
                )
              })}
            </div>

            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-muted/50 rounded-lg p-4 border border-border"
              >
                <p className="text-sm leading-relaxed">
                  <strong>Explication:</strong> {question?.explanation}
                </p>
              </motion.div>
            )}

            <div className="flex gap-3">
              {!showFeedback ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="w-full gap-2"
                  size="lg"
                >
                  Valider
                  <ArrowRight size={20} />
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  className="w-full gap-2"
                  size="lg"
                >
                  {currentQuestion < (quiz?.questions.length || 0) - 1 ? 'Question suivante' : 'Terminer le quiz'}
                  <ArrowRight size={20} />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
