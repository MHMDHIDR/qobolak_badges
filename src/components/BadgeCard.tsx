import Image from 'next/image'

interface BadgeCardProps {
  name: string
  title: string
  leftLogo: string | null
  rightLogo: string | null
}

const BadgeCard: React.FC<BadgeCardProps> = ({ name, title, leftLogo, rightLogo }) => {
  return (
    <div className='relative w-full h-56 p-4 border rounded-lg shadow-md'>
      {leftLogo && (
        <Image
          src={leftLogo}
          alt='Left Logo'
          width={150}
          height={100}
          className='absolute top-0 left-0 max-w-36 h-24 p-3'
        />
      )}
      {rightLogo && (
        <Image
          src={rightLogo}
          alt='Right Logo'
          width={150}
          height={100}
          className='absolute top-0 right-0 max-w-36 h-24 p-3'
        />
      )}
      <div className='mt-32 text-center text-2xl font-bold'>{name}</div>
      <div className='mt-1 text-center'>{title}</div>
    </div>
  )
}

export default BadgeCard
