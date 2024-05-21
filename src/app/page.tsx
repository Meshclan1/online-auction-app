import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { bids as bidSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

export default async function Home() {
  const session = await auth();
  const bids = await database.query.bids.findMany();

  return (
    <main className="container mx-auto py-12">
      {session ? <SignIn /> : <SignOut />}
      {session?.user?.name}

      <form
        action={async (formData: FormData) => {
          "use server";
          await database.insert(bidSchema).values({});
          revalidatePath("/");
          // this tells nextjs to reload our component & associated data
        }}
      >
        <Input name="bid" placeholder="Bid" />
        <Button type="submit">Place Bid</Button>
      </form>

      {bids.map((bid) => (
        <div key={bid.id}>{bid.id}</div>
      ))}
    </main>
  );
}

// with session, we tell the page to conditionally render something out depending on if session is true or not
