import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { bids as bidSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const bids = await database.query.bids.findMany();

  return (
    <main className="container mx-auto py-12">
      <form
        action={async (formData: FormData) => {
          "use server";
          await database.insert(bidSchema).values({});
          revalidatePath("/");
          // this tells nextjs to reload our component & associated dataß
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
