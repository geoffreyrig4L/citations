"use client";

import { Button } from "@nextui-org/react";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { BiLike } from "react-icons/bi";
import { LikeStatus } from "../card";

const Like = ({ likeStatus, setLikeStatus, quote }: any) => {
  const { data: session } = useSession();
  const [likeId, setLikeId] = useState<number | undefined>(undefined);

  function postOrDeleteLike() {
    if (likeStatus === LikeStatus.Liked) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/like/${quote.id}`, {
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
        .then((data) => setLikeId(data.id))
        .catch((error) => console.error("Error:", error));
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/like/${likeId}`, {
        method: "DELETE",
      });
    }
  }

  const defaultValue = quote.like.some(
    (like: any) => like.userId === session?.id
  );

  if (defaultValue) {
    setLikeStatus(LikeStatus.Liked);
  }

  return (
    <Button
      color="danger"
      radius="full"
      size="sm"
      variant={likeStatus === LikeStatus.Liked ? "solid" : "light"}
      onClick={postOrDeleteLike}
      onPress={() => {
        likeStatus === LikeStatus.Liked
          ? setLikeStatus(LikeStatus.Default)
          : setLikeStatus(LikeStatus.Liked);
      }}
    >
      <BiLike className="text-xl" />
    </Button>
  );
};
export default Like;
