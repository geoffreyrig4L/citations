"use client";

import { Button } from "@nextui-org/react";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { BiDislike } from "react-icons/bi";
import { LikeStatus } from "../card";
import { set } from "react-hook-form";

const Dislike = ({ likeStatus, setLikeStatus, quoteId }: any) => {
  const [dislikeId, setDislikeId] = useState<number | undefined>(undefined);
  const { data: session } = useSession();

  function postOrDeleteDislike() {
    if (likeStatus === LikeStatus.Disliked) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/dislike/${quoteId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.id,
          quoteId: quoteId,
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
