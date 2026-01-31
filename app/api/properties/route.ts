import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs' // allow fs

const DATA_PATH = path.join(process.cwd(), 'data', 'properties.json')

async function readData() {
  try {
    const txt = await fs.readFile(DATA_PATH, 'utf-8')
    return JSON.parse(txt)
  } catch (e) {
    return []
  }
}

export async function GET() {
  const data = await readData()
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const token = req.headers.get('x-admin-token') || ''
  const ADMIN = process.env.ADMIN_TOKEN || 'changeme'
  if (token !== ADMIN) {
    return new NextResponse('Unauthorized - token inválido', { status: 401 })
  }

  const body = await req.json()
  if (!body || !body.id) {
    return new NextResponse('Bad Request', { status: 400 })
  }

  const data = await readData()
  data.unshift(body) // newest first
  await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true })
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8')
  return NextResponse.json({ ok: true })
}
