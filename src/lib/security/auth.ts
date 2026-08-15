import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import { prisma } from '@/lib/db';
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');
export async function signSession(user: { id: string; role: string }) { return new SignJWT({ role: user.role }).setProtectedHeader({ alg: 'HS256' }).setSubject(user.id).setIssuedAt().setExpirationTime('7d').sign(secret); }
export async function setSession(user: { id: string; role: string }) { (await cookies()).set('session', await signSession(user), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60*60*24*7 }); }
export async function clearSession(){ (await cookies()).delete('session'); }
export async function currentUser(){ const token=(await cookies()).get('session')?.value; if(!token) return null; try{ const {payload}=await jwtVerify(token, secret); if(!payload.sub) return null; return prisma.user.findUnique({where:{id:payload.sub}, select:{id:true,email:true,fullName:true,role:true,active:true}}); }catch{return null;} }
export async function requireUser(){ const user=await currentUser(); if(!user || !user.active) throw new Error('UNAUTHENTICATED'); return user; }
export async function requireAdmin(){ const user=await requireUser(); if(user.role!=='ADMIN') throw new Error('FORBIDDEN'); return user; }
export const safeUser = (u:any)=>({id:u.id,email:u.email,fullName:u.fullName,role:u.role});
