"use client";

import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import Dislike from "./like/dislike";
import Like from "./like/like";
import { title } from "./primitives";
import Link from "next/link";
import UpdateQuote from "./modalUpdateQuote";
import MiniProfile from "./miniProfile";

export enum LikeStatus {
  Liked = "LIKED",
  Disliked = "DISLIKED",
  Default = "NEUTRAL",
}

const Quote = ({ quote, isInProfile, isMyProfile, refetch }: any) => {
  const [likeStatus, setLikeStatus] = useState<LikeStatus>(LikeStatus.Default);
  const [likes, setLikes] = useState<number>(quote.like?.length ?? 0);
  const [dislikes, setDislikes] = useState<number>(quote.dislike?.length ?? 0);

  useEffect(() => {
    setLikes(quote.like?.length ?? 0);
    setDislikes(quote.dislike?.length ?? 0);
    if (likeStatus === LikeStatus.Liked) {
      setLikes(likes + 1);
    }
    if (likeStatus === LikeStatus.Disliked) {
      setDislikes(dislikes + 1);
    }
  }, [likeStatus]);

  return (
    <div>
      <Card className="w-full">
        {!isInProfile ? (
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              {/* <div className="flex gap-3 items-center justify-center">
                <Avatar name={quote?.user?.name || ""} />
                <div className="flex flex-col gap-1">
                  <p className="text-small font-semibold leading-none text-default-600">
                    {quote?.user?.name}
                  </p>
                  <Link
                    className="text-small text-default-500"
                    href={`/profile/@${quote?.user?.username}`}
                  >
                    @{quote?.user?.username}
                  </Link>
                </div>
              </div> */}
              <MiniProfile
                isVerified={quote?.user?.approved?.length}
                name={quote?.user?.name}
                username={quote?.user?.username}
              />
            </div>
            <div className="flex items-center gap-2">
              <Like
                likeStatus={likeStatus}
                setLikeStatus={setLikeStatus}
                quoteId={quote?.id}
              />
              <Dislike
                likeStatus={likeStatus}
                setLikeStatus={setLikeStatus}
                quoteId={quote?.id}
              />
            </div>
          </CardHeader>
        ) : (
          isMyProfile && (
            <CardHeader className="justify-end">
              <UpdateQuote quote={quote} refetch={refetch} />
            </CardHeader>
          )
        )}
        <CardBody className="px-3 py-0 text-small flex flex-row items-center space-x-3">
          <h4 className={title({ color: "violet", size: "xs" })}>
            “{quote?.quote}“
          </h4>
          <span className="text-small tracking-tight text-default-400 italic">
            - {quote?.author}
          </span>
        </CardBody>
        <CardFooter className="gap-3 flex justify-between">
          <div className="flex gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-small">{likes}</p>
              <p className=" text-small">{"j'aime"}</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-small">{dislikes}</p>
              <p className="text-small">{"j'aime pas"}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <p className="text-small tracking-tight text-default-400 ">
              {DateTime.fromISO(quote?.createdAt).toFormat(
                "dd/MM/yyyy à HH:mm"
              )}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quote;
