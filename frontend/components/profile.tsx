"use client";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Quote from "./card";
import MiniProfile from "./miniProfile";

const Profile = ({ username }: { username: string }) => {
  const usernameFiltered = username.replace("%40", "");
  const { data: session } = useSession();

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["profile", usernameFiltered],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${usernameFiltered}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    retry: 0,
  });

  const approve = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/approvement/${data?.id}/${session?.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      refetch();
    });
  };

  const unApprove = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/approvement/${data?.id}/${session?.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      refetch();
    });
  };

  const quotesCounts = data?.quotes?.reduce(
    (acc: { totalLikes: number; totalDislikes: number }, quote: any) => {
      acc.totalLikes += quote.like.length;
      acc.totalDislikes += quote.dislike.length;

      return acc;
    },
    { totalLikes: 0, totalDislikes: 0 }
  );

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div className="flex flex-col items-center gap-4">
          {/* <div className="flex gap-4 items-center">
            <Avatar name={data?.name || ""} />
            <div className="flex flex-col">
              <p className="text-md font-bold">{data?.name}</p>
              <p className="text-small text-default-500">@{data?.username}</p>
            </div>
          </div> */}
          <MiniProfile
            isVerified={data?.approved?.length}
            name={data?.name}
            username={data?.username}
          />
          {session?.id != data?.id && session ? (
            !data?.approved?.find(
              (elm: { approvedById: any }) => elm.approvedById == session?.id
            ) ? (
              <Button
                color="secondary"
                size="sm"
                variant="bordered"
                onClick={approve}
              >
                Approuvé cet utilisateur
              </Button>
            ) : (
              <Button
                color="secondary"
                size="sm"
                variant="bordered"
                onClick={unApprove}
              >
                Désapprouvé cet utilisateur
              </Button>
            )
          ) : null}
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-4">
            <p className="text-danger">{`${quotesCounts?.totalLikes} j'aime`}</p>
            <Divider orientation="vertical" />
            <p>{`${quotesCounts?.totalDislikes} j'aime pas`}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>{`Approuvé par ${data?.approved?.length} utilisateur`}</p>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4">
        <h4 className="text-md font-bold">Dernière citations posté :</h4>
        <ul className="flex flex-col gap-4">
          {data?.quotes?.map((quote: any) => (
            <li key={quote.id}>
              <Quote
                isInProfile
                quote={quote}
                isMyProfile={session?.id == data?.id}
                refetch={refetch}
              />
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default Profile;
