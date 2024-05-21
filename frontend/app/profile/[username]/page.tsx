import Profile from "@/components/profile";

const ProfilePage = ({ params }: { params: { username: string } }) => {
  return (
    <div>
      <Profile username={params.username} />
    </div>
  );
};

export default ProfilePage;
