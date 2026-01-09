import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, XCircle, ArrowRight } from '@phosphor-icons/react'
import { quizzes } from '@/lib/data'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import type { QuizAttempt } from '@/lib/data'

export default function QuizzesView() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean }[]>([])
  const [quizComplete, setQuizComplete] = useState(false)
  const [attempts, setAttempts] = useKV<QuizAttempt[]>('quiz-attempts', [])

  const quiz = selectedQuiz ? quizzes[selectedQuiz] : null
  const question = quiz?.questions[currentQuestion]
  const progress = quiz ? ((currentQuestion + 1) / quiz.questions.length) * 100 : 0

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
