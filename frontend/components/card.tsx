"use client";
import { FcLikePlaceholder } from "react-icons/fc";
import { IoHeartDislike } from "react-icons/io5";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useState } from "react";

const Quote = () => {
  enum LikeStatus {
    Liked = "LIKED",
    Disliked = "DISLIKED",
    Default = "NEUTRAL",
  }

  const [like, setLike] = useState<LikeStatus>(LikeStatus.Default);

  return (
    <div>
      <Card className="w-full">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://nextui.org/avatars/avatar-1.png"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                Zoey Lang
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @zoeylang
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
              <IoHeartDislike className="text-xl" />
            </Button>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small">
          <p>
            Frontend developer and UI/UX enthusiast. Join me on this coding
            adventure!
          </p>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-small">4</p>
            <p className=" text-small">Like</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-small">97.1K</p>
            <p className="text-small">Dislike</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quote;
