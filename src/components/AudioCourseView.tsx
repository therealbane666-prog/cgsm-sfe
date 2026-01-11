import { useState, useEffect, useRef, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, Pause, SpeakerHigh, SpeakerLow, FastForward, Rewind, SkipBack, SkipForward, BookOpen, Clipboard, Stop, Repeat, MoonStars } from '@phosphor-icons/react'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { submarineCourseContent, type CourseSection } from '@/lib/submarine-course-data'
import { rawAudioQA, type RawQA } from '@/lib/raw-audio-qa'
import { getUserStorageKey } from '@/hooks/use-user-auth'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AudioCourseViewProps {
  userId?: number
  onStartQuiz?: () => void
}

export default function AudioCourseView({ userId, onStartQuiz }: AudioCourseViewProps) {
  // Mode selection: 'qa' for Q&A playback, 'course' for old course content
  const [mode, setMode] = useState<'qa' | 'course'>('qa')
  
  // Q&A mode state
  const [currentQAIndex, setCurrentQAIndex] = useState<number>(0)
  const [isPlayingQA, setIsPlayingQA] = useState(false)
  const [qaPhase, setQAPhase] = useState<'question' | 'pause' | 'answer' | 'next-pause'>('question')
  const [loopAll, setLoopAll] = useKV<boolean>(getUserStorageKey('audio-loop-all', userId?.toString()), true)
  
  // Old course mode state
  const [selectedSection, setSelectedSection] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Shared state
  const [volume, setVolume] = useKV<number[]>(getUserStorageKey('audio-volume', userId?.toString()), [80])
  const [speed, setSpeed] = useKV<number[]>(getUserStorageKey('audio-speed', userId?.toString()), [1])
  const [activeView, setActiveView] = useState<'list' | 'player'>('list')
  const [keepScreenOn, setKeepScreenOn] = useKV<boolean>(getUserStorageKey('keep-screen-on', userId?.toString()), true)
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  
  const wakeLockRef = useRef<any>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const currentQA = rawAudioQA[currentQAIndex]
  const currentSection = submarineCourseContent[selectedSection]

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices()
      setAvailableVoices(voices)
      
      // Find French feminine voice
      const frenchFemaleVoice = voices.find(v => 
        v.lang.startsWith('fr') && (
          v.name.toLowerCase().includes('female') ||
          v.name.toLowerCase().includes('femme') ||
          v.name.toLowerCase().includes('amelie') ||
          v.name.toLowerCase().includes('audrey') ||
          v.name.toLowerCase().includes('virginie')
        )
      )
      
      const anyFrenchVoice = voices.find(v => v.lang.startsWith('fr'))
      setSelectedVoice(frenchFemaleVoice || anyFrenchVoice || null)
    }
    
    loadVoices()
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  // Wake lock management
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

  // Q&A Playback Logic
  const speakText = useCallback((text: string, onEnd: () => void) => {
    const utterance = new SpeechSynthesisUtterance(text)
    
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }
    
    utterance.rate = speed?.[0] || 1
    utterance.volume = (volume?.[0] || 80) / 100
    utterance.lang = 'fr-FR'
    
    utterance.onend = onEnd
    utterance.onerror = () => {
      setIsPlayingQA(false)
      toast.error('Erreur de lecture audio')
    }
    
    utteranceRef.current = utterance
    speechSynthesis.speak(utterance)
  }, [selectedVoice, speed, volume])

  const playQAPair = useCallback(() => {
    if (!currentQA) return
    
    setQAPhase('question')
    
    // Speak question
    speakText(`Question ${currentQA.id}. ${currentQA.question}`, () => {
      // Short pause after question
      setQAPhase('pause')
      setTimeout(() => {
        if (!isPlayingQA) return // Check if still playing
        
        setQAPhase('answer')
        // Speak answer
        speakText(currentQA.answer, () => {
          // Short pause before next
          setQAPhase('next-pause')
          setTimeout(() => {
            if (!isPlayingQA) return // Check if still playing
            
            // Move to next Q&A
            if (currentQAIndex < rawAudioQA.length - 1) {
              setCurrentQAIndex(prev => prev + 1)
            } else if (loopAll) {
              // Loop back to start
              setCurrentQAIndex(0)
            } else {
              // End of playlist
              setIsPlayingQA(false)
              toast.success('Lecture terminée', {
                description: 'Toutes les questions ont été lues'
              })
            }
          }, 1000) // 1 second pause between Q&A pairs
        })
      }, 800) // 0.8 second pause between question and answer
    })
  }, [currentQA, currentQAIndex, isPlayingQA, loopAll, speakText])

  // Trigger playback when index changes and playing
  useEffect(() => {
    if (isPlayingQA && mode === 'qa') {
      playQAPair()
    }
  }, [currentQAIndex, isPlayingQA, mode])

  const handleQAPlayPause = () => {
    if (isPlayingQA) {
      speechSynthesis.cancel()
      setIsPlayingQA(false)
      setQAPhase('question')
    } else {
      setIsPlayingQA(true)
      playQAPair()
      toast.success('Lecture en cours', {
        description: `Mode Q&A: ${rawAudioQA.length} questions • ${loopAll ? 'Lecture en boucle' : 'Une fois'}`
      })
    }
  }

  const handleQAStop = () => {
    speechSynthesis.cancel()
    setIsPlayingQA(false)
    setQAPhase('question')
    setCurrentQAIndex(0)
  }

  const handleQAPrevious = () => {
    if (currentQAIndex > 0) {
      speechSynthesis.cancel()
      setCurrentQAIndex(prev => prev - 1)
      if (isPlayingQA) {
        setTimeout(() => playQAPair(), 100)
      }
    }
  }

  const handleQANext = () => {
    if (currentQAIndex < rawAudioQA.length - 1) {
      speechSynthesis.cancel()
      setCurrentQAIndex(prev => prev + 1)
      if (isPlayingQA) {
        setTimeout(() => playQAPair(), 100)
      }
    }
  }

  // Old Course Mode Playback (keep for backwards compatibility)
  const handlePlayPause = () => {
    if (!currentSection) return

    if (isPlaying) {
      speechSynthesis.cancel()
      setIsPlaying(false)
    } else {
      const fullText = `${currentSection.title}. ${currentSection.content}`
      const utterance = new SpeechSynthesisUtterance(fullText)
      
      if (selectedVoice) {
        utterance.voice = selectedVoice
      }
      
      utterance.rate = speed?.[0] || 1
      utterance.volume = (volume?.[0] || 80) / 100
      utterance.lang = 'fr-FR'
      
      utterance.onend = () => {
        setIsPlaying(false)
        if (selectedSection < submarineCourseContent.length - 1) {
          setTimeout(() => {
            setSelectedSection(prev => prev + 1)
            setActiveView('player')
          }, 1000)
        }
      }
      
      utterance.onerror = () => {
        setIsPlaying(false)
        toast.error('Erreur de lecture audio')
      }

      speechSynthesis.speak(utterance)
      setIsPlaying(true)
      toast.success('Lecture en cours', {
        description: 'L\'audio continue même avec l\'écran verrouillé'
      })
    }
  }

  const handleStop = () => {
    speechSynthesis.cancel()
    setIsPlaying(false)
  }

  const handlePrevious = () => {
    if (selectedSection > 0) {
      handleStop()
      setSelectedSection(prev => prev - 1)
    }
  }

  const handleNext = () => {
    if (selectedSection < submarineCourseContent.length - 1) {
      handleStop()
      setSelectedSection(prev => prev + 1)
    }
  }

  const handleSpeedChange = (newSpeed: number[]) => {
    setSpeed(() => newSpeed)
    if (isPlaying || isPlayingQA) {
      speechSynthesis.cancel()
      setTimeout(() => {
        if (mode === 'qa' && isPlayingQA) {
          playQAPair()
        } else if (mode === 'course' && isPlaying) {
          handlePlayPause()
        }
      }, 100)
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(() => newVolume)
  }

  // Render Q&A Mode Player
  if (mode === 'qa' && activeView === 'player') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <Button
            variant="outline"
            onClick={() => {
              handleQAStop()
              setActiveView('list')
            }}
            className="gap-2"
          >
            ← Retour à la liste
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="secondary">{currentQA?.category}</Badge>
                    <Badge variant="outline">
                      Q&A {currentQAIndex + 1}/{rawAudioQA.length}
                    </Badge>
                    {loopAll && (
                      <Badge variant="outline" className="gap-1">
                        <Repeat size={14} weight="bold" />
                        Boucle
                      </Badge>
                    )}
                    {keepScreenOn && (
                      <Badge variant="outline" className="gap-1">
                        <MoonStars size={14} weight="fill" />
                        Écran actif
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl leading-tight mb-2">
                    Question {currentQA?.id}
                  </CardTitle>
                  {qaPhase === 'question' || qaPhase === 'pause' ? (
                    <p className="text-lg font-medium text-foreground">
                      {currentQA?.question}
                    </p>
                  ) : (
                    <>
                      <p className="text-lg font-medium text-muted-foreground mb-2">
                        {currentQA?.question}
                      </p>
                      <p className="text-lg text-accent font-medium">
                        {currentQA?.answer}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-semibold text-lg">Lecteur Audio Q&A</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-2">
                      <SpeakerHigh size={16} />
                      Voix Française
                    </Badge>
                    {isPlayingQA && (
                      <Badge variant="secondary" className="gap-2">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        En lecture
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                  <div className="flex items-center justify-center gap-4 w-full flex-wrap">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleQAPrevious}
                      disabled={currentQAIndex === 0}
                    >
                      <SkipBack size={20} weight="fill" />
                    </Button>

                    <Button
                      size="lg"
                      onClick={handleQAPlayPause}
                      className="gap-2 h-16 w-16 rounded-full"
                    >
                      {isPlayingQA ? (
                        <Pause size={32} weight="fill" />
                      ) : (
                        <Play size={32} weight="fill" />
                      )}
                    </Button>

                    {isPlayingQA && (
                      <Button
                        size="lg"
                        variant="destructive"
                        onClick={handleQAStop}
                        className="gap-2"
                      >
                        <Stop size={24} weight="fill" />
                      </Button>
                    )}

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleQANext}
                      disabled={currentQAIndex === rawAudioQA.length - 1}
                    >
                      <SkipForward size={20} weight="fill" />
                    </Button>
                  </div>

                  <div className="w-full space-y-4">
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
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {volume?.[0] || 80}%
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-20">Vitesse</span>
                      <Slider
                        value={speed}
                        onValueChange={handleSpeedChange}
                        min={0.5}
                        max={2}
                        step={0.25}
                        className="flex-1"
                      />
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {speed?.[0] || 1}x
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Switch
                          id="loop-all"
                          checked={loopAll}
                          onCheckedChange={(checked) => setLoopAll(() => checked)}
                        />
                        <Label htmlFor="loop-all" className="cursor-pointer">
                          Lecture en boucle
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Switch
                          id="wake-lock"
                          checked={keepScreenOn}
                          onCheckedChange={(checked) => setKeepScreenOn(() => checked)}
                        />
                        <Label htmlFor="wake-lock" className="cursor-pointer">
                          Écran actif
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="w-full pt-4 border-t border-border">
                    <Button
                      variant="default"
                      size="lg"
                      onClick={onStartQuiz}
                      className="w-full gap-2"
                    >
                      <Clipboard size={24} weight="fill" />
                      Aller au Quiz pour tester mes connaissances
                    </Button>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-xs text-muted-foreground">
                      L'audio continue même avec l'écran verrouillé • {qaPhase === 'question' ? '📝 Question' : qaPhase === 'answer' ? '✅ Réponse' : '⏸️ Pause'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    )
  }

  // Render list view (Q&A mode by default)
  if (activeView === 'list') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-accent">Cours Audio Q&A</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {rawAudioQA.length} questions • Formation Sous-Marin SFE
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="gap-2">
              <SpeakerHigh size={16} />
              Voix Française
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMode(mode === 'qa' ? 'course' : 'qa')
                handleQAStop()
                handleStop()
              }}
            >
              {mode === 'qa' ? 'Ancien cours' : 'Mode Q&A'}
            </Button>
          </div>
        </div>

        {mode === 'qa' ? (
          <>
            <div className="flex items-center gap-4 p-4 bg-accent/10 border border-accent/30 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Mode Questions & Réponses • Écoute séquentielle avec pauses
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Chaque question est suivie d'une courte pause, puis de sa réponse
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => {
                  setActiveView('player')
                  setCurrentQAIndex(0)
                }}
                className="gap-2"
              >
                <Play size={24} weight="fill" />
                Démarrer
              </Button>
            </div>

            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-3">
                {rawAudioQA.map((qa, index) => (
                  <motion.div
                    key={qa.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.01 }}
                  >
                    <Card
                      className={`cursor-pointer hover:border-accent transition-all duration-200 ${
                        currentQAIndex === index && mode === 'qa' ? 'border-accent bg-accent/5' : ''
                      }`}
                      onClick={() => {
                        setCurrentQAIndex(index)
                        setActiveView('player')
                      }}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary" className="text-xs">
                                {qa.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Q&A {qa.id}
                              </span>
                            </div>
                            <CardTitle className="text-base leading-tight mb-1">
                              {qa.question}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {qa.answer}
                            </p>
                          </div>
                          <Play size={24} className="shrink-0 text-accent" weight="fill" />
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </>
        ) : (
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-3">
              {submarineCourseContent.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <Card
                    className={`cursor-pointer hover:border-accent transition-all duration-200 ${
                      selectedSection === index && mode === 'course' ? 'border-accent bg-accent/5' : ''
                    }`}
                    onClick={() => {
                      setMode('course')
                      setSelectedSection(index)
                      setActiveView('player')
                    }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-xs">
                              {section.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Section {index + 1}
                            </span>
                          </div>
                          <CardTitle className="text-base leading-tight">
                            {section.title}
                          </CardTitle>
                        </div>
                        <Play size={24} className="shrink-0 text-accent" weight="fill" />
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    )
  }

  // Old course mode player (for backwards compatibility)
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <Button
          variant="outline"
          onClick={() => {
            handleStop()
            setActiveView('list')
          }}
          className="gap-2"
        >
          ← Retour à la liste
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{currentSection?.category}</Badge>
                  <Badge variant="outline">
                    Section {selectedSection + 1}/{submarineCourseContent.length}
                  </Badge>
                </div>
                <CardTitle className="text-2xl leading-tight mb-2">
                  {currentSection?.title}
                </CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content" className="gap-2">
                  <BookOpen size={18} />
                  Contenu
                </TabsTrigger>
                <TabsTrigger value="questions" className="gap-2">
                  <Clipboard size={18} />
                  Questions ({currentSection?.questions.length || 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-4">
                <ScrollArea className="h-[300px] w-full rounded-md border border-border p-4">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-base leading-relaxed whitespace-pre-wrap">
                      {currentSection?.content}
                    </p>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="questions" className="mt-4">
                <ScrollArea className="h-[300px] w-full rounded-md border border-border p-4">
                  <div className="space-y-3">
                    {currentSection?.questions.map((q, idx) => (
                      <div key={idx} className="text-sm">
                        <p className="font-medium text-foreground mb-1">
                          {idx + 1}. {q}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>

            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Lecteur Audio</h3>
                <Badge variant="outline" className="gap-2">
                  <SpeakerHigh size={16} />
                  Voix IA Féminine
                </Badge>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center justify-center gap-4 w-full">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={selectedSection === 0}
                  >
                    <SkipBack size={20} weight="fill" />
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleSpeedChange([Math.max(0.5, (speed?.[0] || 1) - 0.25)])}
                  >
                    <Rewind size={20} />
                  </Button>

                  <Button
                    size="lg"
                    onClick={handlePlayPause}
                    className="gap-2 h-16 w-16 rounded-full"
                  >
                    {isPlaying ? (
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
                    onClick={() => handleSpeedChange([Math.min(2, (speed?.[0] || 1) + 0.25)])}
                  >
                    <FastForward size={20} />
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleNext}
                    disabled={selectedSection === submarineCourseContent.length - 1}
                  >
                    <SkipForward size={20} weight="fill" />
                  </Button>
                </div>

                <div className="w-full space-y-4">
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
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {volume?.[0] || 80}%
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-20">Vitesse</span>
                    <Slider
                      value={speed}
                      onValueChange={handleSpeedChange}
                      min={0.5}
                      max={2}
                      step={0.25}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {speed?.[0] || 1}x
                    </span>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-xs text-muted-foreground">
                    L'audio continue même avec l'écran verrouillé
                  </p>
                  {isPlaying && (
                    <Badge variant="secondary" className="gap-2">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      En lecture
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
