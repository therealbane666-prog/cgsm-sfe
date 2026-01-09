import { useState, useEffect, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, Pause, SpeakerHigh, SpeakerLow, FastForward, Rewind, SkipBack, SkipForward, BookOpen, Clipboard, Stop } from '@phosphor-icons/react'
import { Slider } from '@/components/ui/slider'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { submarineCourseContent, type CourseSection } from '@/lib/submarine-course-data'

export default function AudioCourseView() {
  const [selectedSection, setSelectedSection] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useKV<number[]>('audio-volume', [80])
  const [speed, setSpeed] = useKV<number[]>('audio-speed', [1])
  const [currentPosition, setCurrentPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeView, setActiveView] = useState<'list' | 'player'>('list')
  const [keepScreenOn, setKeepScreenOn] = useKV<boolean>('keep-screen-on', true)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const wakeLockRef = useRef<any>(null)

  const currentSection = submarineCourseContent[selectedSection]

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

  const generateAudioUrl = (text: string): string => {
    const utterance = new SpeechSynthesisUtterance(text)
    const voices = speechSynthesis.getVoices()
    const femaleVoice = voices.find(v => v.lang.startsWith('fr') && v.name.toLowerCase().includes('female')) 
      || voices.find(v => v.lang.startsWith('fr'))
    
    if (femaleVoice) {
      utterance.voice = femaleVoice
    }
    
    utterance.rate = speed?.[0] || 1
    utterance.volume = (volume?.[0] || 80) / 100
    utterance.lang = 'fr-FR'
    
    return ''
  }

  const handlePlayPause = () => {
    if (!currentSection) return

    if (isPlaying) {
      speechSynthesis.cancel()
      setIsPlaying(false)
    } else {
      const fullText = `${currentSection.title}. ${currentSection.content}`
      const utterance = new SpeechSynthesisUtterance(fullText)
      
      const voices = speechSynthesis.getVoices()
      const femaleVoice = voices.find(v => v.lang.startsWith('fr') && v.name.toLowerCase().includes('female'))
        || voices.find(v => v.lang.startsWith('fr'))
      
      if (femaleVoice) {
        utterance.voice = femaleVoice
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
    if (isPlaying) {
      speechSynthesis.cancel()
      setTimeout(() => handlePlayPause(), 100)
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(() => newVolume)
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (activeView === 'list') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-accent">Cours Audio Complet</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {submarineCourseContent.length} sections • Formation Sous-Marin
            </p>
          </div>
          <Badge variant="outline" className="gap-2">
            <SpeakerHigh size={16} />
            Voix IA Féminine
          </Badge>
        </div>

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
                    selectedSection === index ? 'border-accent bg-accent/5' : ''
                  }`}
                  onClick={() => {
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
      </div>
    )
  }

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
