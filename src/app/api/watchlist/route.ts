import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@/lib/better-auth/auth'
import { connectToDatabase } from '@/database/mongoose'
import { Watchlist } from '@/database/models/watchlist.models'

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuth()
    const session = await auth.api.getSession({ headers: req.headers })
    const userId = session?.user?.id
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectToDatabase()
    const { searchParams } = new URL(req.url)
    const symbol = searchParams.get('symbol')

    if (symbol) {
      const exists = await Watchlist.exists({ userId, symbol: String(symbol).toUpperCase().trim() })
      return NextResponse.json({ exists: !!exists })
    }

    const docs = await Watchlist.find({ userId }).sort({ addedAt: -1 }).lean()
    return NextResponse.json(docs)
  } catch (e) {
    console.error('GET /api/watchlist error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuth()
    const session = await auth.api.getSession({ headers: req.headers })
    const userId = session?.user?.id
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { symbol, company } = await req.json().catch(() => ({}))
    if (!symbol || !company) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    await connectToDatabase()
    await Watchlist.updateOne(
      { userId, symbol: String(symbol).toUpperCase().trim() },
      { $setOnInsert: { userId, symbol: String(symbol).toUpperCase().trim(), company: String(company).trim(), addedAt: new Date() } },
      { upsert: true }
    )

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('POST /api/watchlist error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await getAuth()
    const session = await auth.api.getSession({ headers: req.headers })
    const userId = session?.user?.id
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { symbol } = await req.json().catch(() => ({}))
    if (!symbol) return NextResponse.json({ error: 'Missing symbol' }, { status: 400 })

    await connectToDatabase()
    await Watchlist.deleteOne({ userId, symbol: String(symbol).toUpperCase().trim() })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('DELETE /api/watchlist error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


