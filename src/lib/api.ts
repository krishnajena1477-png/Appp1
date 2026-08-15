import { NextResponse } from 'next/server';
export function ok(data: unknown, status=200){ return NextResponse.json({success:true,data,error:null,requestId:crypto.randomUUID()},{status}); }
export function fail(message='Request failed', status=400){ return NextResponse.json({success:false,data:null,error:{message},requestId:crypto.randomUUID()},{status}); }
export function handlerError(e: unknown){ const msg=e instanceof Error?e.message:'Unexpected error'; return fail(msg==='UNAUTHENTICATED'?'Please login':msg, msg==='UNAUTHENTICATED'?401:msg==='FORBIDDEN'?403:400); }
