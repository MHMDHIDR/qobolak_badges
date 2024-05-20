import { useState } from 'react'
import { Button } from './ui/button'

interface BadgeFormProps {
  onGenerate: (
    names: string[],
    titles: string[],
    leftLogo: string | null,
    rightLogo: string | null
  ) => void
}

const BadgeForm: React.FC<BadgeFormProps> = ({ onGenerate }) => {
  const [inputs, setInputs] = useState<{ name: string; title: string }[]>([
    { name: '', title: '' }
  ])
  const [leftLogo, setLeftLogo] = useState<string | null>(null)
  const [rightLogo, setRightLogo] = useState<string | null>(null)

  const handleInputChange = (index: number, field: 'name' | 'title', value: string) => {
    const newInputs = [...inputs]
    newInputs[index][field] = value
    setInputs(newInputs)
  }

  const handleAddInput = () => {
    setInputs([...inputs, { name: '', title: '' }])
  }

  const handleRemoveInput = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index)
    setInputs(newInputs)
  }

  const handleLogoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setLogo: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = event => {
        if (event.target && typeof event.target.result === 'string') {
          setLogo(event.target.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const names = inputs.map(input => input.name).filter(name => name.trim() !== '')
    const titles = inputs.map(input => input.title).filter(title => title.trim() !== '')
    onGenerate(names, titles, leftLogo, rightLogo)
  }

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <div className='flex flex-wrap justify-center mb-4'>
        <div className='flex flex-col items-center mx-2'>
          <label className='mb-2 cursor-pointer' htmlFor='left-logo'>
            Left Logo
          </label>
          <input
            type='file'
            id='left-logo'
            accept='image/*'
            onChange={e => handleLogoChange(e, setLeftLogo)}
            className='w-32 h-24 cursor-pointer md:w-40'
          />
          {leftLogo && (
            <img src={leftLogo} alt='Left Logo' className='mt-2 w-32 h-24 md:w-40' />
          )}
        </div>
        <div className='flex flex-col items-center mx-2'>
          <label className='mb-2 cursor-pointer' htmlFor='right-logo'>
            Right Logo
          </label>
          <input
            type='file'
            id='right-logo'
            accept='image/*'
            onChange={e => handleLogoChange(e, setRightLogo)}
            className='w-32 h-24 cursor-pointer md:w-40'
          />
          {rightLogo && (
            <img src={rightLogo} alt='Right Logo' className='mt-2 w-32 h-24 md:w-40' />
          )}
        </div>
      </div>
      {inputs.map((input, index) => (
        <div key={index} className='flex flex-wrap items-center mb-2'>
          <input
            type='text'
            value={input.name}
            onChange={e => handleInputChange(index, 'name', e.target.value)}
            className='flex-grow p-2 border rounded mr-2 mb-2 md:mb-0'
            placeholder={`Enter name ${index + 1}`}
          />
          <input
            type='text'
            value={input.title}
            onChange={e => handleInputChange(index, 'title', e.target.value)}
            className='flex-grow p-2 border rounded mr-2 mb-2 md:mb-0'
            placeholder={`Enter title ${index + 1}`}
          />
          <Button
            type='button'
            onClick={() => handleRemoveInput(index)}
            className='px-2 py-1 text-white bg-red-500 rounded'
          >
            Remove
          </Button>
        </div>
      ))}
      <div className='flex justify-between mt-4'>
        <Button
          type='button'
          onClick={handleAddInput}
          className='px-4 py-2 text-white bg-purple-500 rounded'
        >
          Add Name
        </Button>
        <Button type='submit' className='px-4 py-2 text-white bg-blue-500 rounded'>
          Generate Badges
        </Button>
      </div>
    </form>
  )
}

export default BadgeForm
