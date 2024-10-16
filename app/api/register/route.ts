import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, confirmPassword, role } = await req.json();

  if (password !== confirmPassword) {
    return NextResponse.json({ error: 'Пароли не совпадают' }, { status: 400 });
  }

  // Проверка, существует ли пользователь с таким email
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return NextResponse.json({ error: 'Пользователь с таким email уже существует' }, { status: 400 });
  }

  // Хешируем пароль перед сохранением
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Создание нового пользователя
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role !== 'ADMIN' ? role : 'USER',
      }
    });

    if (role === 'tutor') {
      const newTutor = await prisma.tutor.create({
        data: {
          userId: newUser.id,
        },
      });
      return NextResponse.json(newTutor);
    }
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка при создании пользователя' }, { status: 500 });
  }
}