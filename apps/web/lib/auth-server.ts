import { cookies } from 'next/headers';

import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret'
);

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
  exp?: number;
}

// Create JWT token
export async function createToken(
  payload: Omit<AuthTokenPayload, 'exp'>
): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

  return token;
}

// Verify JWT token
export async function verifyToken(
  token: string
): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AuthTokenPayload;
  } catch (error) {
    return null;
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Get current user from cookies (Server Component only)
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload) return null;

    // In a real app, you'd fetch the full user data from your database
    // For now, we'll return the basic info from the token
    return {
      id: payload.userId,
      email: payload.email,
      name: payload.email.split('@')[0], // Fallback name
      role: payload.role,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    return null;
  }
}

// Set auth cookie (Server Component only)
export function setAuthCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

// Clear auth cookie (Server Component only)
export function clearAuthCookie() {
  const cookieStore = cookies();
  cookieStore.delete('auth-token');
}
