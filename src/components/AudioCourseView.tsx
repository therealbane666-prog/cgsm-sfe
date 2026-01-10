import { useState, useEffect, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Play, Pause, SpeakerHigh, SpeakerLow, SkipBack, SkipForward, Stop, Repeat } from '@phosphor-icons/react'
import { Slider } from '@/components/ui/slider'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { rawAudioQA, type QAItem } from '@/lib/raw-audio-qa'
import { getUserStorageKey } from '@/hooks/use-user-auth'

interface AudioCourseViewProps {
  userId?: number
  onStartQuiz?: () => void
}

export default function AudioCourseView({ userId, onStartQuiz }: AudioCourseViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isReadingAnswer, setIsReadingAnswer] = useState(false)
  const [volume, setVolume] = useKV<number[]>(getUserStorageKey('audio-volume', userId?.toString()), [80])
  const [speed, setSpeed] = useKV<number[]>(getUserStorageKey('audio-speed', userId?.toString()), [1])
  const [loopEnabled, setLoopEnabled] = useKV<boolean>(getUserStorageKey('audio-loop', userId?.toString()), true)
  const [keepScreenOn, setKeepScreenOn] = useKV<boolean>(getUserStorageKey('keep-screen-on', userId?.toString()), true)
  const [selectedVoice, setSelectedVoice] = useState<string>('')
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const wakeLockRef = useRef<any>(null)

  const currentQA = rawAudioQA[currentIndex]

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices()
      setAvailableVoices(voices)
      
      // Try to find a French female voice
      const frenchVoices = voices.filter(v => v.lang.startsWith('fr'))
      const frenchFemaleVoice = frenchVoices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('femme') ||
        v.name.toLowerCase().includes('amelie') ||
        v.name.toLowerCase().includes('virginie')
      )
      
      if (frenchFemaleVoice) {
        setSelectedVoice(frenchFemaleVoice.name)
      } else if (frenchVoices.length > 0) {
        setSelectedVoice(frenchVoices[0].name)
      }
    }

    loadVoices()
    speechSynthesis.addEventListener('voiceschanged', loadVoices)
    
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices)
    }
  }, [])

  // Wake lock
  useEffect(() => {
    if (keepScreenOn && 'wakeLock' in navigator) {
      requestWakeLock()
    }

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release()
      }
    }
  }, [keepScreenOn])

  const requestWakeLock = async () => {
    try {
      wakeLockRef.current = await (navigator as any).wakeLock.request('screen')
    } catch (err) {
      console.log('Wake Lock error:', err)
    }
  }

  const createUtterance = (text: string, onEndCallback?: () => void) => {
    const utterance = new SpeechSynthesisUtterance(text)
    
    const voice = availableVoices.find(v => v.name === selectedVoice)
    if (voice) {
      utterance.voice = voice
    }
    
    utterance.rate = speed?.[0] || 1
    utterance.volume = (volume?.[0] || 80) / 100
    utterance.lang = 'fr-FR'
    
    utterance.onend = () => {
      if (onEndCallback) {
        onEndCallback()
      }
    }
    
    utterance.onerror = () => {
      setIsPlaying(false)
      setIsPaused(false)
      toast.error('Erreur de lecture audio')
    }

    return utterance
  }

  const speakQuestion = () => {
    if (!currentQA) return
    
    setIsReadingAnswer(false)
    const utterance = createUtterance(currentQA.q, () => {
      // After question, wait 500ms then speak answer
      setTimeout(() => {
        speakAnswer()
      }, 500)
    })
    
    utteranceRef.current = utterance
    speechSynthesis.speak(utterance)
  }

  const speakAnswer = () => {
    if (!currentQA) return
    
    setIsReadingAnswer(true)
    const utterance = createUtterance(currentQA.a, () => {
      // After answer, move to next or loop
      if (currentIndex < rawAudioQA.length - 1) {
        setCurrentIndex(prev => prev + 1)
        setTimeout(() => {
          speakQuestion()
        }, 1000)
      } else {
        // Last item
        if (loopEnabled) {
          setCurrentIndex(0)
          setTimeout(() => {
            speakQuestion()
          }, 1000)
        } else {
          setIsPlaying(false)
          setIsPaused(false)
          setIsReadingAnswer(false)
          toast.info('Lecture terminée')
        }
      }
    })
    
    utteranceRef.current = utterance
    speechSynthesis.speak(utterance)
  }

  const handlePlayPause = () => {
    if (!currentQA) return

    if (isPlaying) {
      if (isPaused) {
        // Resume
        speechSynthesis.resume()
        setIsPaused(false)
        toast.info('Lecture reprise')
      } else {
        // Pause
        speechSynthesis.pause()
        setIsPaused(true)
        toast.info('Lecture en pause')
      }
    } else {
      // Start playing
      setIsPlaying(true)
      setIsPaused(false)
      speakQuestion()
      toast.success('Lecture en cours', {
        description: 'L\'audio continue même avec l\'écran verrouillé'
      })
    }
  }

  const handleStop = () => {
    speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setIsReadingAnswer(false)
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      handleStop()
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < rawAudioQA.length - 1) {
      handleStop()
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handleSpeedChange = (newSpeed: number[]) => {
    setSpeed(() => newSpeed)
    if (isPlaying && !isPaused) {
      const wasReadingAnswer = isReadingAnswer
      const wasAtIndex = currentIndex
      handleStop()
      setTimeout(() => {
        setCurrentIndex(wasAtIndex)
        setIsPlaying(true)
        if (wasReadingAnswer) {
          speakAnswer()
        } else {
          speakQuestion()
        }
      }, 100)
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(() => newVolume)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-accent">Cours Audio Q/A</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {rawAudioQA.length} questions • Formation Sous-Marin
          </p>
        </div>
        <Badge variant="outline" className="gap-2">
          <SpeakerHigh size={16} />
          Voix IA Française
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">
                  Question {currentIndex + 1}/{rawAudioQA.length}
                </Badge>
                {isPlaying && (
                  <Badge variant="secondary" className="gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    {isReadingAnswer ? 'Réponse' : 'Question'}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl leading-tight">
                Audio Course Player
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Q/A Display Tabs */}
          <Tabs defaultValue="question" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="question">Question</TabsTrigger>
              <TabsTrigger value="reponse">Réponse</TabsTrigger>
            </TabsList>

            <TabsContent value="question" className="mt-4">
              <ScrollArea className="h-[200px] w-full rounded-md border border-border p-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-base leading-relaxed">
                    {currentQA?.q}
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="reponse" className="mt-4">
              <ScrollArea className="h-[200px] w-full rounded-md border border-border p-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-base leading-relaxed">
                    {currentQA?.a}
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          {/* Audio Controls */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Lecteur Audio</h3>
              <div className="flex items-center gap-2">
                {isPlaying && (
                  <Badge variant="secondary" className="gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    En lecture
                  </Badge>
                )}
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center justify-center gap-4 w-full">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0 || isPlaying}
                >
                  <SkipBack size={20} weight="fill" />
                </Button>

                <Button
                  size="lg"
                  onClick={handlePlayPause}
                  className="gap-2 h-16 w-16 rounded-full"
                  disabled={!currentQA}
                >
                  {isPlaying && !isPaused ? (
                    <Pause size={32} weight="fill" />
                  ) : (
                    <Play size={32} weight="fill" />
                  )}
                </Button>

                {isPlaying && (
                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={handleStop}
                    className="gap-2"
                  >
                    <Stop size={24} weight="fill" />
                  </Button>
                )}

                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleNext}
                  disabled={currentIndex === rawAudioQA.length - 1 || isPlaying}
                >
                  <SkipForward size={20} weight="fill" />
                </Button>
              </div>

              {/* Voice Selection */}
              <div className="w-full space-y-2">
                <Label htmlFor="voice-select">Sélection de la voix</Label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger id="voice-select">
                    <SelectValue placeholder="Choisir une voix" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVoices
                      .filter(v => v.lang.startsWith('fr'))
                      .map(voice => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </SelectItem>
                      ))}
                    {availableVoices.filter(v => v.lang.startsWith('fr')).length === 0 &&
                      availableVoices.slice(0, 5).map(voice => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>

              {/* Volume Control */}
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Volume</Label>
                  <span className="text-sm text-muted-foreground">
                    {volume?.[0] || 80}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <SpeakerLow size={20} className="text-muted-foreground" />
                  <Slider
                    value={volume}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <SpeakerHigh size={20} className="text-muted-foreground" />
                </div>
              </div>

              {/* Speed Control */}
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Vitesse de lecture</Label>
                  <span className="text-sm text-muted-foreground">
                    {speed?.[0] || 1}x
                  </span>
                </div>
                <Slider
                  value={speed}
                  onValueChange={handleSpeedChange}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="flex-1"
                />
              </div>

              {/* Loop and Wake Lock Controls */}
              <div className="w-full space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="loop-toggle" className="cursor-pointer">
                      Lecture en boucle
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Redémarre automatiquement après la dernière question
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {loopEnabled && <Repeat size={16} className="text-accent" />}
                    <Switch
                      id="loop-toggle"
                      checked={loopEnabled}
                      onCheckedChange={setLoopEnabled}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="wake-lock-toggle" className="cursor-pointer">
                      Maintenir l'écran allumé
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Empêche l'écran de se verrouiller pendant l'écoute
                    </p>
                  </div>
                  <Switch
                    id="wake-lock-toggle"
                    checked={keepScreenOn}
                    onCheckedChange={setKeepScreenOn}
                  />
                </div>
              </div>

              {/* Quiz Button */}
              {onStartQuiz && (
                <Button
                  onClick={onStartQuiz}
                  variant="default"
                  className="w-full mt-4"
                  size="lg"
                >
                  Quiz libre
                </Button>
              )}

              <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground">
                  L'audio continue même avec l'écran verrouillé
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
