"use client";
import Quote from "@/components/card";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@nextui-org/react";

export default function Home() {
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
  });

  if (isPending) {
    return (
      <span>
        <Spinner size="lg" />
      </span>
    );
  }

  if (isError) {
    return <span color="danger">Error: {error.message}</span>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <ul className="flex flex-col gap-4">
        {data.map((quote: any) => (
          <li key={quote.id}>
            <Quote quote={quote} />
          </li>
        ))}
      </ul>
    </div>
  );
}
