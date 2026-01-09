import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Play, Pause, SpeakerHigh, SpeakerLow, FastForward, Rewind } from '@phosphor-icons/react'
import { Slider } from '@/components/ui/slider'
import { courses } from '@/lib/data'
import { motion, AnimatePresence } from 'framer-motion'

export default function CoursesView() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([80])
  const [speed, setSpeed] = useState([1])

  const course = selectedCourse ? courses.find(c => c.id === selectedCourse) : null

  const handleGenerateAudio = async () => {
    if (!course) return
    
    setIsPlaying(true)
    const prompt = `Read this submarine course content in a soft, feminine voice. Content: ${course.content}`
    
    try {
      await window.spark.llm(prompt, 'gpt-4o-mini')
      setTimeout(() => setIsPlaying(false), 5000)
    } catch (error) {
      console.error('Audio generation failed:', error)
      setIsPlaying(false)
    }
  }

  if (!selectedCourse) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card 
              className="cursor-pointer hover:border-accent transition-all duration-200 h-full"
              onClick={() => setSelectedCourse(course.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    {course.category}
                  </Badge>
                </div>
                <CardDescription>
                  Cliquez pour commencer le cours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {course.content}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedCourse}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Button 
          variant="outline" 
          onClick={() => setSelectedCourse(null)}
          className="mb-4"
        >
          ← Retour aux cours
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-2xl mb-2">{course?.title}</CardTitle>
                <Badge variant="secondary">{course?.category}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ScrollArea className="h-[400px] w-full rounded-md border border-border p-4">
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {course?.content}
              </p>
            </ScrollArea>

            <div className="bg-card/50 rounded-lg border border-border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Lecteur Audio</h3>
                <Badge variant="outline">IA Voix Féminine</Badge>
              </div>

              <div className="flex items-center justify-center gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setSpeed([Math.max(0.5, speed[0] - 0.25)])}
                >
                  <Rewind size={20} />
                </Button>
                
                <Button
                  size="lg"
                  onClick={handleGenerateAudio}
                  className="gap-2"
                  disabled={isPlaying}
                >
                  {isPlaying ? (
                    <>
                      <Pause size={24} weight="fill" />
                      Lecture...
                    </>
                  ) : (
                    <>
                      <Play size={24} weight="fill" />
                      Lire le cours
                    </>
                  )}
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setSpeed([Math.min(2, speed[0] + 0.25)])}
                >
                  <FastForward size={20} />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <SpeakerLow size={20} className="text-muted-foreground" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <SpeakerHigh size={20} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {volume[0]}%
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-20">Vitesse</span>
                  <Slider
                    value={speed}
                    onValueChange={setSpeed}
                    min={0.5}
                    max={2}
                    step={0.25}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {speed[0]}x
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                L'audio continue même avec l'écran verrouillé
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
