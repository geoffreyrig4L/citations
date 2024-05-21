"use client";
import Quote from "@/components/card";
import { useQuery } from "@tanstack/react-query";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import { FaPen } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["quotes"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quote/all`
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
      <span>
        <Spinner size="lg" />
      </span>
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
          <Select className="w-[9rem]" defaultSelectedKeys={"all"} size="sm">
            <SelectItem key={"date"} value={"date"}>
              date
            </SelectItem>
            <SelectItem key={"like"} value={"like"}>
              les plus liké
            </SelectItem>
            <SelectItem key={"disLike"} value={"disLike"}>
              les moins liké
            </SelectItem>
          </Select>
        </div>
        <div>
          <Button
            color="secondary"
            isDisabled={status != "authenticated"}
            startContent={<FaPen />}
            variant="bordered"
          >
            Créer un citation
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ul className="flex flex-col gap-4">
          {data.map((quote: any) => (
            <li key={quote.id}>
              <Quote quote={quote} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
