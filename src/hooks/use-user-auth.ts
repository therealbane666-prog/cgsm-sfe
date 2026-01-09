import { useState, useEffect } from 'react'

export interface UserInfo {
  avatarUrl: string
  email: string
  id: number
  isOwner: boolean
  login: string
}

export function useUserAuth() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = async () => {
    try {
      setLoading(true)
      const userInfo = await window.spark.user()
      setUser(userInfo)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch user:', err)
      setError('Impossible de charger les informations utilisateur')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return { user, loading, error, refreshUser: fetchUser }
}

export function getUserStorageKey(baseKey: string, userId: string | undefined): string {
  if (!userId) {
    return `guest-${baseKey}`
  }
  return `user-${userId}-${baseKey}`
}
