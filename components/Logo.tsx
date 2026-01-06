import Link from 'next/link'
import { RiSeedlingFill } from '@remixicon/react';

const Logo = () => {
  return (
    <Link href="/" scroll={false}>
      <div className='flex items-center gap-1'>
        <RiSeedlingFill size={20} />
        <p className='font-bold'>
          Kaung Myat Kyaw
        </p>
      </div>
    </Link>
  );
}

export default Logo;
