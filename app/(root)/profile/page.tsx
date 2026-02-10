import { redirect } from 'next/navigation';
import {prisma} from "@/prisma/client";
import {getUserServerSession} from "@/shared/lib/get-user-server-session";
import {ProfileForm} from "@/shared/components";

export default async function ProfilePage() {
  const session = await getUserServerSession();

  if (!session) {
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({ where: { id: session?.id } });

  if (!user) {
    return redirect('/not-auth');
  }

  return <ProfileForm data={user} />;
}
