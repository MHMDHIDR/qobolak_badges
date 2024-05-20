// src/app/page.tsx (Home)
'use client'

import { useState, useRef } from 'react'
import BadgeForm from '../components/BadgeForm'
import BadgeCard from '../components/BadgeCard'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [names, setNames] = useState<string[]>([])
  const [titles, setTitles] = useState<string[]>([])
  const [leftLogo, setLeftLogo] = useState<string | null>(null)
  const [rightLogo, setRightLogo] = useState<string | null>(null)
  const [selectedCards, setSelectedCards] = useState<boolean[]>([])

  const handleGenerate = (
    names: string[],
    titles: string[],
    leftLogo: string | null,
    rightLogo: string | null
  ) => {
    setNames(names)
    setTitles(titles)
    setLeftLogo(leftLogo)
    setRightLogo(rightLogo)
    setSelectedCards(new Array(names.length).fill(false))
  }

  const handleSelectCard = (index: number) => {
    const newSelectedCards = [...selectedCards]
    newSelectedCards[index] = !newSelectedCards[index]
    setSelectedCards(newSelectedCards)
  }

  const handlePrint = async () => {
    const doc = new jsPDF('p', 'mm', 'a4')
    const selectedElements = document.querySelectorAll('.badge-card.selected')

    const cardWidth = 90 // Adjust based on desired card size
    const cardHeight = 50 // Adjust based on desired card size
    const margin = 10

    let x = margin
    let y = margin

    for (let i = 0; i < selectedElements.length; i++) {
      const element = selectedElements[i] as HTMLElement
      const canvas = await html2canvas(element)
      const imgData = canvas.toDataURL('image/png')

      if (x + cardWidth > doc.internal.pageSize.getWidth() - margin) {
        x = margin
        y += cardHeight + margin
      }

      if (y + cardHeight > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage()
        x = margin
        y = margin
      }

      doc.addImage(imgData, 'PNG', x, y, cardWidth, cardHeight)
      x += cardWidth + margin
    }

    // Remove the class after printing
    selectedElements.forEach(element => {
      element.classList.remove('hide-on-print')
    })

    doc.save('badges.pdf')
  }

  return (
    <main className='flex flex-col items-center justify-between min-h-screen p-24'>
      <div className='container p-4 mx-auto'>
        <h1 className='mb-4 text-2xl font-bold'>Staff Badge Generator</h1>
        <BadgeForm onGenerate={handleGenerate} />
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {names.map((name, index) => (
            <div
              key={index}
              id={`card-${index}`}
              className={`relative border rounded-lg badge-card ${
                selectedCards[index] ? 'border-slate-500 selected' : 'border-gray-300'
              }`}
              onClick={() => handleSelectCard(index)}
            >
              <BadgeCard
                name={name}
                title={titles[index]}
                leftLogo={leftLogo}
                rightLogo={rightLogo}
              />
            </div>
          ))}
        </div>
        <Button
          type='button'
          onClick={handlePrint}
          className='px-4 py-2 mt-4 text-white bg-green-500 rounded'
        >
          Print Selected
        </Button>
      </div>
    </main>
  )
}
