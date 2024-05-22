"use client";
import Quote from "@/components/card";
import CreateQuote from "@/components/modalCreateQuote";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { status, data: session } = useSession();
  const [filter, setFilter] = useState("date");

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["quotes", filter],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quote/all?sortBy=${filter}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    retry: 0,
  });

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <span>
          <Spinner size="lg" />
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        Pas de citations
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h4 className="font-bold">Trier par : </h4>
          <Select
            className="w-[14rem]"
            defaultSelectedKeys={"all"}
            size="sm"
            onChange={(e) => setFilter(e.target.value)}
          >
            <SelectItem key={"date"} value={"date"}>
              Les plus récentes
            </SelectItem>
            <SelectItem key={"like"} value={"like"}>
              les plus aimées
            </SelectItem>
            <SelectItem key={"disLike"} value={"disLike"}>
              les plus controversées
            </SelectItem>
          </Select>
        </div>
        <div>
          <CreateQuote refetch={refetch} session={session} status={status} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ul className="flex flex-col gap-4">
          {data.map((quote: any) => (
            <li key={quote.id}>
              <Quote quote={quote} session={session} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
