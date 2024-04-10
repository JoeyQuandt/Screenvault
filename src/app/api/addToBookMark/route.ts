import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { userEmail, data } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      bookmarkList: true,
    },
  });
  // @ts-expect-error json object passed is not typed in prisma
  if (!user?.bookmarkList?.some((item) => item?.id === data.id)) {
    await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        bookmarkList: {
          push: data,
        },
      },
    });
    return NextResponse.json({ message: 'Added to BookMark' }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: 'Already added to bookmark' },
      { status: 404 },
    );
  }
}
