"use client";
import React from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className,
  ...props
}) => {
  const pathname = usePathname();

  const isActive =
    href === pathname || (href !== "/" && pathname.startsWith(href as string));

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500",
        className,
        isActive && "text-rose-500"
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
