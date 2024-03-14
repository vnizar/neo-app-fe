import { use } from "react";
import neoService from "@/lib/neo/neo-service";
import Link from "next/link";

export default function Home() {
  const { feeds } = use(neoService.getFeeds());
  return (
    <div className={"container mx-auto my-8"}>
      <div className={"flex flex-col space-y-8"}>
        <h1 className={"text-xl xl:text-2xl font-bold"}>Top 10 Nearest Asteroids</h1>

        <div className={"grid grid-cols-2 gap-4"}>
          {feeds.map((feed, idx) => (
            <div className={"flex flex-row"} key={feed.id}>
              <div className={"flex text-4xl font-bold p-3"}>
                {idx + 1}
              </div>
              <div className={"flex p-3"}>
                <Link href={`/asteroid/${feed.id}`}>
                  <h2 className="font-bold">{feed.name}</h2>
                  <span>{feed.distance} Km</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
