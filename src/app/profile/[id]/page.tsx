import React from "react";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col mt-66 items-center justify-center gap-3">
      <p className="text-4xl">Profile Page</p>
      <span className="p-2 rounded bg-orange-400 text-black">{params.id}</span>
    </div>
  );
};

export default ProfilePage;
