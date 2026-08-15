import { ok } from '@/lib/api';import { currentUser } from '@/lib/security/auth';export async function GET(){return ok(await currentUser())}
