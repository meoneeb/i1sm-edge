import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Link href={"/inventory"}>Go to InventoryPage</Link>
      {/* <InventoryPage /> */}
    </div>
  );
}
