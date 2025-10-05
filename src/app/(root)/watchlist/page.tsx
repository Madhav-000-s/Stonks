import React from 'react'
import Link from 'next/link'
import { headers } from 'next/headers'
import { getAuth } from '@/lib/better-auth/auth'
import { connectToDatabase } from '@/database/mongoose'
import { Watchlist } from '@/database/models/watchlist.models'
import { WATCHLIST_TABLE_HEADER } from '@/lib/constants'

const WatchlistPage = async () => {
  // Ensure DB connection for model usage
  await connectToDatabase()

  // Get current user session
  const auth = await getAuth()
  const session = await auth.api.getSession({ headers: await headers() })

  const userId = session?.user?.id

  let items: { symbol: string; company: string; addedAt: string }[] = []
  if (userId) {
    const docs = await Watchlist.find({ userId }).sort({ addedAt: -1 }).lean()
    items = docs.map((d: any) => ({
      symbol: d.symbol,
      company: d.company,
      addedAt: d.addedAt?.toISOString?.() ?? '',
    }))
  }

  const isEmpty = items.length === 0

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-100">Watchlist</h1>
          <p className="text-sm text-gray-500">Your saved stocks at a glance</p>
        </div>
        <Link href="/search" className="search-btn">Add stock</Link>
      </div>

      {isEmpty ? (
        <div className="rounded-lg border border-gray-800 bg-[#0F0F0F] p-8 text-center">
          <div className="text-gray-300 font-medium mb-2">No items in your watchlist</div>
          <p className="text-gray-500 mb-6">Start by adding stocks you want to track.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-800 bg-[#0F0F0F]">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-gray-400">
                {WATCHLIST_TABLE_HEADER.map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {items.map((item) => (
                <tr key={`${item.symbol}`} className="hover:bg-[#141414]">
                  <td className="px-4 py-4">
                    <div className="text-gray-200">{item.company}</div>
                    <div className="text-xs text-gray-500">Added {item.addedAt?.slice(0, 10) || '—'}</div>
                  </td>
                  <td className="px-4 py-4">{item.symbol}</td>
                  <td className="px-4 py-4 text-gray-500">—</td>
                  <td className="px-4 py-4 text-gray-500">—</td>
                  <td className="px-4 py-4 text-gray-500">—</td>
                  <td className="px-4 py-4 text-gray-500">—</td>
                  <td className="px-4 py-4">
                    <Link href={`/stocks/${item.symbol}`} className="hover:text-yellow-500 transition-colors">
                      View
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <Link href={`/stocks/${item.symbol}`} className="hover:text-yellow-500 transition-colors">
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default WatchlistPage


