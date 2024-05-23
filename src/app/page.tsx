import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { bids as bidSchema, items } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

export default async function Home() {
  const session = await auth();
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold ">Post an Item to Sell</h1>

      <form
        className="flex flex-col border p-8 rounded-xl space-y-2 max-w-lg"
        action={async (formData: FormData) => {
          "use server";
          await database.insert(items).values({
            name: formData.get("name") as string,
            userId: session?.user?.id!,
          });
          revalidatePath("/");
          // this tells nextjs to reload our component & associated data
        }}
      >
        <Input className="max-w-lg" name="name" placeholder="Name your item" />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>

      <h2 className="text-2xl font-bold">Items for Sale</h2>

      <div className="grid grid-cols-4">
        {allItems.map((item) => (
          <div className="border p-8 rounded-xl" key={item.id}>
            {item.id}
          </div>
        ))}
      </div>
    </main>
  );
}

// with session, we tell the page to conditionally render something out depending on if session is true or not
