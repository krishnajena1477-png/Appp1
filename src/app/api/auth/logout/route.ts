import { ok } from '@/lib/api';import { clearSession } from '@/lib/security/auth';export async function POST(){await clearSession();return ok({loggedOut:true})}
