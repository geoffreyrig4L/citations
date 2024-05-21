"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { RiDislikeLine } from "react-icons/ri";
import { title } from "./primitives";

const Quote = ({ quote }: any) => {
  enum LikeStatus {
    Liked = "LIKED",
    Disliked = "DISLIKED",
    Default = "NEUTRAL",
  }

  const [like, setLike] = useState<LikeStatus>(LikeStatus.Default);

  console.log(quote);

  return (
    <div>
      <Card className="w-full">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {quote.author}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                posté par {quote.user.name}
              </h5>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              color="danger"
              radius="full"
              size="sm"
              startContent={false}
              variant={like === LikeStatus.Liked ? "solid" : "light"}
              onPress={() =>
                like === LikeStatus.Liked
                  ? setLike(LikeStatus.Default)
                  : setLike(LikeStatus.Liked)
              }
            >
              <FcLikePlaceholder className="text-xl" />
            </Button>
            <Button
              color="default"
              radius="full"
              size="sm"
              startContent={false}
              variant={like === LikeStatus.Disliked ? "solid" : "light"}
              onPress={() =>
                like === LikeStatus.Disliked
                  ? setLike(LikeStatus.Default)
                  : setLike(LikeStatus.Disliked)
              }
            >
              <RiDislikeLine className="text-xl" />
            </Button>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small">
          <h4 className={title({ color: "violet", size: "xs" })}>
            {quote.quote}
          </h4>
        </CardBody>
        <CardFooter className="gap-3 flex justify-between">
          <div className="flex gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-small">
                {quote.like?.length ?? 0}
              </p>
              <p className=" text-small">Like</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-small">
                {quote.dislike?.length ?? 0}
              </p>
              <p className="text-small">Dislike</p>
            </div>
          </div>
          <div className="flex gap-1">
            <p className="text-small tracking-tight text-default-400 ">
              {quote.createdAt}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quote;
