import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')  // Добавили состояние для сообщения

  async function signUp() {
    setLoading(true)
    setError(null)
    setMessage('')  // Сбрасываем предыдущее сообщение
    const { data, error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setMessage('Reģistrācija veiksmīga! Pārbaudi e-pastu, lai apstiprinātu.')
    }
  }

  async function signIn() {
    setLoading(true)
    setError(null)
    setMessage('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else onLogin(data.user)
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Ielogoties vai Reģistrēties</h2>
      <input
        type="email"
        placeholder="E-pasts"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 8 }}
      />
      <input
        type="password"
        placeholder="Parole"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 8 }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>} {/* Показываем сообщение */}
      <button onClick={signIn} disabled={loading} style={{ marginRight: 8 }}>
        Ielogoties
      </button>
      <button onClick={signUp} disabled={loading}>
        Reģistrēties
      </button>
    </div>
  )
}
