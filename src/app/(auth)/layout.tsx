import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getAuth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";


const layout = async({ children }: { children: React.ReactNode }) => {
  const auth =await getAuth()
  const session=await auth.api.getSession({headers:await headers()})
  if(session?.user) redirect('/')
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>
      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            JOHN STONKS MADE MY PROFITS GAZILLION PERCENT NOW I CAN PUT IT ALL
            ON RED AND BET ON MONGOLIAN THROAT SINGING COMPETITIONS
          </blockquote>
          <div className="flex items-center justify-between">
            <p className="max-md:text-xs text-gray-500">JOHN INVESTOR</p>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 7 }, (_, i) => (
              <Image
                key={i}
                src={"/assets/icons/star.svg"}
                alt="star"
                width={20}
                height={20}
                className="h-5 w-5"
              />
            ))}
          </div>
        </div>
        <div className="flex-1 relative">
          <Image
            src="/assets/images/dashboard.png"
            alt="dashboard"
            width={1440}
            height={1150}
            className="auth-dashboard-preview absolute top-0"
          ></Image>
        </div>
      </section>
    </main>
  );
};

export default layout;
