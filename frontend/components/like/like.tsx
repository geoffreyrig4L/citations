"use client";

import { Button } from "@nextui-org/react";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import { BiLike } from "react-icons/bi";
import { LikeStatus } from "../card";

const Like = ({
  likeStatus,
  setLikeStatus,
  quoteId,
  dislikeId,
  setDislikeId,
  likeId,
  setLikeId,
}: any) => {
  const { data: session } = useSession();

  function postOrDeleteLike() {
    if (likeStatus === LikeStatus.Liked) {
      if (dislikeId !== undefined) {
        setDislikeId(undefined);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/dislike/${dislikeId}`, {
          method: "DELETE",
        });
      }
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/like/${quoteId}`, {
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
        .then((data) => setLikeId(data.id))
        .catch((error) => console.error("Error:", error));
    } else {
      setLikeId(undefined);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/like/${likeId}`, {
        method: "DELETE",
      });
    }
  }

  return (
    <Button
      color="danger"
      radius="full"
      size="sm"
      variant={likeStatus === LikeStatus.Liked ? "solid" : "light"}
      onClick={postOrDeleteLike}
      onPress={() =>
        likeStatus === LikeStatus.Liked
          ? setLikeStatus(LikeStatus.Default)
          : setLikeStatus(LikeStatus.Liked)
      }
    >
      <BiLike className="text-xl" />
    </Button>
  );
};
export default Like;
