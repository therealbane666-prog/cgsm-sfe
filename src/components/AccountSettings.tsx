import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Trash, Warning, CheckCircle, FileText } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { QuizAttempt } from '@/lib/data'
import { getUserStorageKey } from '@/hooks/use-user-auth'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'

interface AccountSettingsProps {
  userId?: number
  userLogin?: string
}

export default function AccountSettings({ userId, userLogin }: AccountSettingsProps) {
  const [attempts] = useKV<QuizAttempt[]>(getUserStorageKey('quiz-attempts', userId?.toString()), [])
  const [audioVolume] = useKV<number[]>(getUserStorageKey('audio-volume', userId?.toString()), [80])
  const [audioSpeed] = useKV<number[]>(getUserStorageKey('audio-speed', userId?.toString()), [1])
  const [timedMode] = useKV<boolean>(getUserStorageKey('quiz-timed-mode', userId?.toString()), false)
  const [timePerQuestion] = useKV<number>(getUserStorageKey('quiz-time-per-question', userId?.toString()), 30)
  
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [confirmationText, setConfirmationText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  if (!userId || !userLogin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Paramètres du Compte</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder aux paramètres
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-4">
            <Warning size={64} className="mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Connexion requise</p>
              <p className="text-muted-foreground max-w-md mx-auto">
                Vous devez être connecté pour exporter vos données ou gérer votre compte. 
                Cliquez sur "Se connecter" en haut à droite.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleExportData = async () => {
    try {
      const userData = {
        account: {
          userId: userId,
          userLogin: userLogin,
          exportDate: new Date().toISOString(),
        },
        quizAttempts: attempts || [],
        settings: {
          audioVolume: audioVolume?.[0] || 80,
          audioSpeed: audioSpeed?.[0] || 1,
          timedMode: timedMode || false,
          timePerQuestion: timePerQuestion || 30,
        },
        statistics: {
          totalQuizzesCompleted: attempts?.length || 0,
          totalQuestionsAnswered: attempts?.reduce((sum, a) => sum + a.totalQuestions, 0) || 0,
          totalCorrectAnswers: attempts?.reduce((sum, a) => sum + a.score, 0) || 0,
          averageScore: attempts?.length 
            ? ((attempts.reduce((sum, a) => sum + (a.score / a.totalQuestions * 100), 0) / attempts.length).toFixed(1)) + '%'
            : '0%',
        }
      }

      const jsonData = JSON.stringify(userData, null, 2)
      
      const detailedReport = `
╔═══════════════════════════════════════════════════════════════════╗
║                    CGSM SFE 2026 - SNA DE GRASSE                  ║
║                    EXPORT DE DONNÉES UTILISATEUR                  ║
╚═══════════════════════════════════════════════════════════════════╝

INFORMATIONS DE COMPTE
═══════════════════════════════════════════════════════════════════
  Utilisateur: ${userLogin}
  ID Utilisateur: ${userId}
  Date d'export: ${new Date().toLocaleString('fr-FR')}

STATISTIQUES GLOBALES
═══════════════════════════════════════════════════════════════════
  Quiz complétés: ${attempts?.length || 0}
  Questions répondues: ${attempts?.reduce((sum, a) => sum + a.totalQuestions, 0) || 0}
  Réponses correctes: ${attempts?.reduce((sum, a) => sum + a.score, 0) || 0}
  Score moyen: ${attempts?.length 
    ? ((attempts.reduce((sum, a) => sum + (a.score / a.totalQuestions * 100), 0) / attempts.length).toFixed(1)) + '%'
    : '0%'}

PARAMÈTRES AUDIO
═══════════════════════════════════════════════════════════════════
  Volume: ${audioVolume?.[0] || 80}%
  Vitesse: ${audioSpeed?.[0] || 1}x

PARAMÈTRES QUIZ
═══════════════════════════════════════════════════════════════════
  Mode chronométré: ${timedMode ? 'Activé' : 'Désactivé'}
  Temps par question: ${timePerQuestion || 30} secondes

HISTORIQUE DES QUIZ
═══════════════════════════════════════════════════════════════════
${attempts && attempts.length > 0 ? attempts.map((attempt, index) => {
  const percentage = ((attempt.score / attempt.totalQuestions) * 100).toFixed(1)
  const date = new Date(attempt.date).toLocaleString('fr-FR')
  return `
${index + 1}. ${attempt.quizTitle}
   Date: ${date}
   Score: ${attempt.score}/${attempt.totalQuestions} (${percentage}%)
   Statut: ${parseFloat(percentage) >= 80 ? 'EXCELLENT ✓' : parseFloat(percentage) >= 60 ? 'BIEN' : 'À AMÉLIORER'}
   
   Détails des réponses:
${attempt.answers.map((a, i) => `      Q${i + 1}: ${a.correct ? '✓ Correct' : '✗ Incorrect'}`).join('\n')}
`
}).join('\n-------------------------------------------------------------------\n') : '  Aucun quiz complété'}

═══════════════════════════════════════════════════════════════════

DONNÉES JSON COMPLÈTES (pour import/backup)
═══════════════════════════════════════════════════════════════════

${jsonData}

═══════════════════════════════════════════════════════════════════
        Site créé par Bastien Verdu - Tous droits réservés
═══════════════════════════════════════════════════════════════════
`

      const blob = new Blob([detailedReport], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `CGSM-SFE-2026-export-${userLogin}-${Date.now()}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success('Données exportées!', {
        description: 'Vos données ont été téléchargées avec succès'
      })
      
      setExportDialogOpen(false)
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Erreur d\'export', {
        description: 'Impossible d\'exporter vos données'
      })
    }
  }

  const handleDeleteAccount = async () => {
    if (confirmationText !== userLogin) {
      toast.error('Confirmation incorrecte', {
        description: 'Veuillez saisir votre nom d\'utilisateur correctement'
      })
      return
    }

    setIsDeleting(true)

    try {
      const allKeys = await window.spark.kv.keys()
      const userPrefix = `user-${userId}-`
      const userKeys = allKeys.filter(key => key.startsWith(userPrefix))

      for (const key of userKeys) {
        await window.spark.kv.delete(key)
      }

      toast.success('Compte supprimé', {
        description: 'Toutes vos données ont été effacées. Vous allez être déconnecté.'
      })

      setTimeout(async () => {
        try {
          await fetch('/.auth/logout', { method: 'POST' })
          window.location.reload()
        } catch (error) {
          window.location.reload()
        }
      }, 2000)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Erreur de suppression', {
        description: 'Impossible de supprimer votre compte'
      })
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Paramètres du Compte</CardTitle>
          <CardDescription>
            Gérez vos données et votre compte
          </CardDescription>
        </CardHeader>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-accent/50">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Download size={24} className="text-accent" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">Exporter mes données</CardTitle>
                <CardDescription>
                  Téléchargez une copie complète de vos scores, paramètres et statistiques
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2 text-sm">
              <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">Quiz complétés</span>
                <Badge variant="secondary">{attempts?.length || 0}</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">Questions répondues</span>
                <Badge variant="secondary">
                  {attempts?.reduce((sum, a) => sum + a.totalQuestions, 0) || 0}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">Paramètres sauvegardés</span>
                <Badge variant="secondary">4</Badge>
              </div>
            </div>

            <Button 
              onClick={() => setExportDialogOpen(true)}
              className="w-full gap-2"
              variant="outline"
            >
              <Download size={20} />
              Exporter mes données
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border-destructive/50">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <Warning size={24} className="text-destructive" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg text-destructive">Zone dangereuse</CardTitle>
                <CardDescription>
                  La suppression de votre compte est irréversible
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>Attention:</strong> La suppression de votre compte effacera définitivement:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Tous vos scores de quiz</li>
                <li>• Votre historique complet</li>
                <li>• Tous vos paramètres personnalisés</li>
                <li>• Vos statistiques et progression</li>
              </ul>
              <p className="mt-3 text-sm text-foreground">
                <strong>Recommandation:</strong> Exportez vos données avant de supprimer votre compte.
              </p>
            </div>

            <Button 
              onClick={() => setDeleteDialogOpen(true)}
              variant="destructive"
              className="w-full gap-2"
            >
              <Trash size={20} />
              Supprimer mon compte et mes données
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText size={24} className="text-accent" />
              Exporter vos données
            </DialogTitle>
            <DialogDescription>
              Un fichier texte détaillé contenant toutes vos données sera téléchargé
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-accent/10 border border-accent/30 p-4">
              <h4 className="font-medium mb-2 text-sm">Le fichier inclura:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-accent" weight="fill" />
                  Informations de compte
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-accent" weight="fill" />
                  Historique complet des quiz
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-accent" weight="fill" />
                  Statistiques détaillées
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-accent" weight="fill" />
                  Paramètres personnalisés
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-accent" weight="fill" />
                  Données JSON pour backup
                </li>
              </ul>
            </div>

            <div className="text-xs text-muted-foreground bg-muted/50 rounded p-3">
              Format: TXT • Encodage: UTF-8 • Lisible par tout éditeur de texte
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleExportData} className="gap-2">
              <Download size={16} />
              Télécharger
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <Warning size={24} />
              Confirmer la suppression du compte
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p>
                Cette action est <strong>irréversible</strong>. Toutes vos données seront 
                définitivement supprimées de nos serveurs.
              </p>
              
              <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4">
                <p className="text-sm font-medium text-foreground mb-2">
                  Seront supprimés:
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• {attempts?.length || 0} tentative(s) de quiz</li>
                  <li>• {attempts?.reduce((sum, a) => sum + a.totalQuestions, 0) || 0} réponse(s) enregistrée(s)</li>
                  <li>• Tous vos paramètres personnalisés</li>
                  <li>• Votre progression et statistiques</li>
                </ul>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmation" className="text-foreground">
                  Pour confirmer, tapez votre nom d'utilisateur: <strong>{userLogin}</strong>
                </Label>
                <Input
                  id="confirmation"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  placeholder={userLogin}
                  className="font-mono"
                  disabled={isDeleting}
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={confirmationText !== userLogin || isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Suppression...
                </>
              ) : (
                <>
                  <Trash size={16} className="mr-2" />
                  Supprimer définitivement
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
