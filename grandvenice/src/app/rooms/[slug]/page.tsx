import { notFound } from "next/navigation"
import { client } from "@/lib/sanity/client"
import { ROOM_BY_SLUG_QUERY, ALL_ROOM_SLUGS_QUERY } from "@/lib/sanity/queries"
import { RoomDetail } from "@/components/rooms/RoomDetail"
import type { Room } from "@/types"
import type { Metadata } from "next"

export const revalidate = 3600

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    const slugs = await client.fetch(ALL_ROOM_SLUGS_QUERY)
    return (slugs || []).map((s: { slug: string }) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return { title: "Room Details" }
  try {
    const { slug } = await params
    const room = await client.fetch(ROOM_BY_SLUG_QUERY, { slug })
    if (!room) return { title: "Room Not Found" }
    return { title: room.name, description: room.shortDescription }
  } catch {
    return { title: "Room Details" }
  }
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) notFound()
  let room: Room | null = null
  try {
    room = await client.fetch(ROOM_BY_SLUG_QUERY, { slug }, { next: { revalidate: 3600 } })
  } catch {
    notFound()
  }
  if (!room) notFound()
  return <RoomDetail room={room} />
}
