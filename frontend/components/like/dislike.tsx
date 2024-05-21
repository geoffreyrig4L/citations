"use client";

import { Button } from "@nextui-org/react";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import { BiDislike } from "react-icons/bi";
import { LikeStatus } from "../card";
import { useState } from "react";

const Dislike = ({ likeStatus, setLikeStatus, quote }: any) => {
  const { data: session } = useSession();
  const [dislikeId, setDislikeId] = useState<number | undefined>(undefined);

  function postOrDeleteDislike() {
    if (likeStatus === LikeStatus.Disliked) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/dislike/${quote.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.id,
          quoteId: quote.id,
          createdAt: DateTime.now(),
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setDislikeId(data.id))
        .catch((error) => console.error("Error:", error));
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/dislike/${dislikeId}`, {
        method: "DELETE",
      });
    }
  }

  const defaultValue = quote?.dislike.some(
    (dislike: any) => dislike.userId === session?.id
  );

  if (defaultValue) {
    setLikeStatus(LikeStatus.Disliked);
  }

  return (
    <Button
      color="danger"
      radius="full"
      size="sm"
      onClick={postOrDeleteDislike}
      variant={likeStatus === LikeStatus.Disliked ? "solid" : "light"}
      onPress={() =>
        likeStatus === LikeStatus.Disliked
          ? setLikeStatus(LikeStatus.Default)
          : setLikeStatus(LikeStatus.Disliked)
      }
    >
      <BiDislike className="text-xl" />
    </Button>
  );
};
export default Dislike;
