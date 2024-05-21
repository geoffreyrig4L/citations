"use client";
import { FcLikePlaceholder } from "react-icons/fc";
import { IoHeartDislike } from "react-icons/io5";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";

const Quote = () => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

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
              className={
                like ? "bg-transparent text-foreground border-default-200" : ""
              }
              color="danger"
              radius="full"
              size="sm"
              variant={like ? "bordered" : "solid"}
              onPress={() => setLike(!like)}
            >
              <FcLikePlaceholder className="text-xl" />
            </Button>
            <Button
              className={
                dislike
                  ? "bg-transparent text-foreground border-default-200"
                  : ""
              }
              color="danger"
              radius="full"
              size="sm"
              variant={dislike ? "bordered" : "solid"}
              onPress={() => setDislike(!dislike)}
            >
              <IoHeartDislike className="text-xl" />
            </Button>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p>
            Frontend developer and UI/UX enthusiast. Join me on this coding
            adventure!
          </p>
          {/* <span className="pt-2">
            #FrontendWithZoey
            <span className="py-2" aria-label="computer" role="img">
              💻
            </span>
          </span> */}
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">4</p>
            <p className=" text-default-400 text-small">Like</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">97.1K</p>
            <p className="text-default-400 text-small">Dislike</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quote;
