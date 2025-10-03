"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React from "react";
import { LogOut } from "lucide-react";
import NavItems from "./NavItems";
import { signOut } from "@/lib/actions/auth.actions";

const UserDropdown = ({user}:{user:User}) => {
  const router = useRouter();
  const handleSignout = async() => {
    await signOut()
    router.push("/sign-in");
  };

  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center gap-3 text-gray-4 hover:text-yellow-500"
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="font-medium text-base text-gray-400">
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-gray-400">
        <DropdownMenuLabel>
          <div className="flex relative items-center gap-3 py-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="font-medium text-base text-gray-400">
                {user.name}
              </span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem
          onClick={handleSignout}
          className="text-gray-100 text-md font-medium focus:text-yellow-500  focus:bg-transparent transition-colors cursor-pointer"
        >
          Logout <LogOut className="ml-auto h-4 w-4  hidden sm:block" />
        </DropdownMenuItem>
         <DropdownMenuSeparator className="bg-gray-600" />
         <nav className="sm:hidden">
          <NavItems></NavItems>
         </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
