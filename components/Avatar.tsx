import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useUser from "../hooks/useUser";

interface AvatarProps {
  userid: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userid, isLarge, hasBorder }) => {
  const { data: user } = useUser(userid);
  const router = useRouter();
  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation();

      const url = `/users/${userid}`;
      router.push(url);
    },
    [router, userid]
  );

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full 
        hover:opacity-90 
        transistion 
        cursor-pointer 
        relative 
    `}
    >
      <Image
        fill
        style={{ objectFit: "cover", borderRadius: "50%" }}
        src={user?.profileImage || "/images/placeholder.png"}
        alt="Avatar"
        onClick={onClick}
      />
    </div>
  );
};

export default Avatar;
