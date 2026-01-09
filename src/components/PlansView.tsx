import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MagnifyingGlassPlus, MagnifyingGlassMinus, DownloadSimple, ArrowsOut } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export default function PlansView() {
  const [zoom, setZoom] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const planUrl = 'https://drive.google.com/file/d/1cEEX4CXgRzSqPoK1oRpJNF5kB3ctI9WZ/view?usp=drivesdk'
  const embedUrl = 'https://drive.google.com/file/d/1cEEX4CXgRzSqPoK1oRpJNF5kB3ctI9WZ/preview'

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50))
  }

  const handleDownload = () => {
    window.open(planUrl, '_blank')
    toast.success('Ouverture du fichier...', {
      description: 'Le plan sera disponible au téléchargement'
    })
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl mb-2">Plans du Suffren</CardTitle>
              <CardDescription>
                Plans détaillés du SNA Suffren
              </CardDescription>
            </div>
            <Button
              onClick={handleDownload}
              variant="default"
              className="gap-2 shrink-0"
            >
              <DownloadSimple size={20} />
              Télécharger
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              onClick={handleZoomOut}
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={zoom <= 50}
            >
              <MagnifyingGlassMinus size={18} />
              Zoom -
            </Button>
            <Button
              onClick={handleZoomIn}
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={zoom >= 200}
            >
              <MagnifyingGlassPlus size={18} />
              Zoom +
            </Button>
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <ArrowsOut size={18} />
              {isFullscreen ? 'Réduire' : 'Plein écran'}
            </Button>
            <span className="text-sm text-muted-foreground ml-auto">
              {zoom}%
            </span>
          </div>

          <div 
            className={`relative bg-muted rounded-lg overflow-hidden border border-border transition-all duration-300 ${
              isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[600px]'
            }`}
          >
            <div className="w-full h-full overflow-auto">
              <div 
                className="min-h-full flex items-center justify-center p-4"
                style={{ 
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.2s ease-out'
                }}
              >
                <iframe
                  src={embedUrl}
                  className="w-full h-[800px] bg-white rounded-lg"
                  allow="autoplay"
                  title="Plans du Suffren"
                />
              </div>
            </div>

            {isFullscreen && (
              <Button
                onClick={toggleFullscreen}
                variant="secondary"
                size="sm"
                className="absolute top-4 right-4 z-10"
              >
                Fermer
              </Button>
            )}
          </div>

          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Note:</strong> Utilisez les contrôles ci-dessus pour ajuster la vue.
            </p>
            <p>
              Pour une meilleure qualité, téléchargez le fichier en utilisant le bouton "Télécharger".
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
