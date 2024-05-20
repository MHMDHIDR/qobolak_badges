// components/BadgeForm.tsx
import { useState } from 'react'
import { Button } from './ui/button'

interface BadgeFormProps {
  onGenerate: (names: string[]) => void
}

const BadgeForm: React.FC<BadgeFormProps> = ({ onGenerate }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const names = input.split(',').map(name => name.trim())
    onGenerate(names)
  }

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        className='w-full p-2 border rounded'
        placeholder='Enter names separated by commas'
        rows={4}
      />
      <Button type='submit'>Generate Badges</Button>
    </form>
  )
}

export default BadgeForm
