import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const MiniProfile = ({
  name,
  username,
  isVerified,
}: {
  name: string;
  username: string;
  isVerified: number;
}) => {
  return (
    <div className="flex gap-4 items-center justify-center">
      <Avatar name={name || ""} />
      <div className="flex flex-col gap-1">
        <p className="text-small font-semibold leading-none text-default-600">
          {name}
        </p>
        <div className="flex gap-2 items-center">
          <Link
            className="text-small text-default-500"
            href={`/profile/@${username}`}
          >
            @{username}
          </Link>
          {isVerified >= 5 && <RiVerifiedBadgeFill />}
        </div>
      </div>
    </div>
  );
};

export default MiniProfile;
