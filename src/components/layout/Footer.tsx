import { Logo } from '@/components/svgs';

export default function Footer() {
  return (
    <footer className='bg-theme-black flex flex-col items-center py-7 lg:py-20'>
      <section>
        <Logo className='text-white w-[202px] h-[27px]' />
      </section>
    </footer>
  );
}
