// src/app/page.tsx (Home)
'use client'

import { useState, useRef } from 'react'
import BadgeForm from '../components/BadgeForm'
import BadgeCard from '../components/BadgeCard'

export default function Home() {
  const [names, setNames] = useState<string[]>([])
  const [titles, setTitles] = useState<string[]>([])
  const [leftLogo, setLeftLogo] = useState<string | null>(null)
  const [rightLogo, setRightLogo] = useState<string | null>(null)
  const [selectedCards, setSelectedCards] = useState<boolean[]>([])
  const printRef = useRef<HTMLDivElement>(null)

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

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open('', '', 'width=800,height=600')
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print Badges</title>')
        printWindow.document.write(
          '<style>@media print { body { -webkit-print-color-adjust: exact; } .badge-card { page-break-inside: avoid; } }</style></head><body>'
        )
        selectedCards.forEach((selected, index) => {
          if (selected) {
            const card = document.querySelector(`#card-${index}`)
            if (card) {
              printWindow.document.write(card.outerHTML)
            }
          }
        })
        printWindow.document.write('</body></html>')
        printWindow.document.close()
        printWindow.print()
      }
    }
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
                selectedCards[index] ? 'border-blue-500' : 'border-gray-300'
              }`}
              onClick={() => handleSelectCard(index)}
            >
              <BadgeCard
                name={name}
                title={titles[index]}
                leftLogo={leftLogo}
                rightLogo={rightLogo}
              />
              {selectedCards[index] && (
                <div className='absolute top-0 right-0 p-2 text-white bg-blue-500'>
                  Selected
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          type='button'
          onClick={handlePrint}
          className='px-4 py-2 mt-4 text-white bg-green-500 rounded'
        >
          Print Selected
        </button>
      </div>
      <div ref={printRef} className='hidden'></div>
    </main>
  )
}
