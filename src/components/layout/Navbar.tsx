import UnderlineLink from '@/components/links/UnderlineLink';
import { Close, Hamburger, Logo } from '@/components/svgs';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Navbar() {
  const navbarItems = [
    {
      link: 'Our company',
      href: 'our-company',
    },
    {
      link: 'Locations',
      href: 'locations',
    },
    {
      link: 'Contact',
      href: 'contact',
    },
  ];

  const navbarContent = navbarItems.map((item, index) => {
    return (
      <li key={index} className='list-none'>
        <UnderlineLink
          href={item.href}
          className='uppercase text-2xl font-normal'
        >
          {item.link}
        </UnderlineLink>
      </li>
    );
  });
  return (
    <nav className='flex px-6 py-7 justify-between items-center layout'>
      <Sheet>
        <Logo className='w-[202px] h-[27px]' />
        <ul className='flex justify-between gap-10 max-sm:hidden'>
          {navbarContent}
        </ul>
        <SheetTrigger className='max-sm:block hidden text-2xl'>
          <Hamburger />
        </SheetTrigger>
        <SheetContent
          side='top'
          className='max-h-[350px] flex-col  max-sm:flex hidden bg-theme-black border-none text-white px-6 py-0'
        >
          <SheetHeader className='w-full flex flex-row items-center  py-7 justify-between'>
            <Logo className='w-[202px] h-[27px] text-white' />
            <SheetClose asChild>
              <Close className='cursor-pointer my-auto' />
            </SheetClose>
          </SheetHeader>
          <div className='pb-12 flex flex-col gap-8'>{navbarContent}</div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
