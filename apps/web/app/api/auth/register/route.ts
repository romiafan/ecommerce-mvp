import { NextRequest, NextResponse } from 'next/server';

import { ConvexHttpClient } from 'convex/browser';

import { api } from '@/convex/_generated/api';
import { createToken, hashPassword } from '@/lib/auth-server';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await convex.query(api.users.getUserByEmail, {
      email,
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user in Convex
    const userId = await convex.mutation(api.users.createUser, {
      email,
      name,
      hashedPassword,
    });

    // Create JWT token
    const token = await createToken({
      userId: userId.toString(),
      email,
      role: 'user',
    });

    // Create response with token in cookie
    const response = NextResponse.json(
      {
        message: 'User created successfully',
        user: { id: userId, email, name, role: 'user' },
      },
      { status: 201 }
    );

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
