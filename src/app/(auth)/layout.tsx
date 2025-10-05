import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getAuth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";


const layout = async ({ children }: { children: React.ReactNode }) => {
  const auth = await getAuth()
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/')
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
            <span className="cursor-pointer select-none font-extrabold tracking-wide text-yellow-400 text-3xl">
              STONKS!
            </span>
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>
      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            STONKS MADE MY PROFITS GAZILLION PERCENT NOW I CAN USE IT TO MAKE 
            BAJILLION PERCENT PROFITS
          </blockquote>
          <div className="flex items-center justify-between">
            <p className="max-md:text-xs text-gray-500">JOHN GREEDY INVESTOR</p>
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
