import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import SideBarItem from "./SideBarItem";
import SideBarLogo from "./SideBarLogo";
import SideBarTweetButton from "./SideBarTweetButton";
import useCurrentUser from "../../hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import PostItem from "../PostItem";

const SideBar = () => {
  const { data: currentUser } = useCurrentUser();
  const icons = [
    { label: "Home", href: "/", icon: BsHouseFill },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hashNotifications,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 mb:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SideBarLogo />
          {icons.map((icon) => (
            <SideBarItem
              key={icon.href}
              href={icon.href}
              label={icon.label}
              icon={icon.icon}
              auth={icon.auth}
              alert={icon.alert}
            />
          ))}
          {currentUser && (
            <SideBarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="LogOut"
            />
          )}
          <SideBarTweetButton />
        </div>
      </div>
    </div>
  );
};
export default SideBar;
