import { database } from "@/db/database";
import { bids as bidSchema } from "@/db/schema";

export default async function Home() {
  const bids = await database.query.bids.findMany();

  return (
    <main className="container mx-auto py-12">
      <form
        action={async (formData: FormData) => {
          "use server";
          await database.insert(bidSchema).values({});
        }}
      >
        <input name="bid" placeholder="Bid" />
        <button type="submit">Place Bid</button>
      </form>
      {bids.map((bid) => (
        <div key={bid.id}>{bid.id}</div>
      ))}
    </main>
  );
}
