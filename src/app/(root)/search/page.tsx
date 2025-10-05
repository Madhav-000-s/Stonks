"use client"
import React, { useEffect, useState } from 'react'
import SearchCommand from '@/components/searchCommand'
import { searchStocks } from '@/lib/actions/finnhub.actions'
import { useRouter } from 'next/navigation'

const SearchPage = () => {
  const router = useRouter()
  const [initialStocks, setInitialStocks] = useState<StockWithWatchlistStatus[]>([])

  useEffect(() => {
    // Preload initial stocks for popular list
    searchStocks().then(setInitialStocks).catch(() => setInitialStocks([]))
  }, [])

  const handleOpenChange = (open: boolean) => {
    if (!open) router.back()
  }

  return (
    <SearchCommand
      renderAs="text"
      label=""
      hideTrigger
      forceOpenOnMount
      open={true}
      onOpenChange={handleOpenChange}
      initialStocks={initialStocks}
    />
  )
}

export default SearchPage


