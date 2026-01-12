import Link from 'next/link'
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/" scroll={false}>
      <div className='flex items-center gap-3 max-w-15 max-h-15'>
        <Image
          src="/logo.svg"
          alt="Nike"
          width={40}
          height={40}
          loading='eager'
          className='w-auto h-auto'
        />
        <p className='font-bold hidden md:flex'>
          Nike
        </p>
      </div>
    </Link>
  );
}

export default Logo;
