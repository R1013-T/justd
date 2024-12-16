"use client"

import React, { Suspense } from "react"

import { useScrollPosition } from "hooks/use-scroll-position"
import { IconChevronLgDown, IconGitBranches } from "justd-icons"
import { usePathname } from "next/navigation"
import { Heading } from "react-aria-components"
import scrollIntoView from "scroll-into-view-if-needed"
import { Button, cn, Link, Menu, Skeleton } from "ui"

interface TableOfContentsProps {
  title: string
  url: string
  items?: TableOfContentsProps[]
}

interface Props {
  className?: string
  items: TableOfContentsProps[]
}

export function TableOfContents({ className, items }: Props) {
  // const [thereIsAnAd, setThereIsAnAd] = React.useState(true)
  const tocRef = React.useRef<HTMLDivElement>(null)
  const scrollPosition = useScrollPosition(tocRef)
  const ids = items.flatMap((item) => [
    item.url.split("#")[1],
    ...(item.items ? item.items.map((subItem) => subItem.url.split("#")[1]) : [])
  ])
  const activeId = useActiveItem(ids)
  const activeIndex = activeId?.length || 0
  React.useEffect(() => {
    if (!activeId || activeIndex < 2) return
    const anchor = tocRef.current?.querySelector(`li > a[href="#${activeId}"]`)

    if (anchor) {
      scrollIntoView(anchor, {
        behavior: "smooth",
        block: "center",
        inline: "center",
        scrollMode: "always",
        boundary: tocRef.current
      })
    }
  }, [activeId, activeIndex])
  // React.useEffect(() => {
  //   emitter.on("thereIsAnAdVisibilityChange", (value) => {
  //     setThereIsAnAd(value === "visible")
  //   })
  //
  //   return () => {
  //     emitter.off("thereIsAnAdVisibilityChange")
  //   }
  // }, [])
  const pathname = usePathname()
  return (
    <aside
      ref={tocRef}
      className={cn(
        "not-prose forced-color-adjust-none",
        "xl:sticky no-scrollbar xl:top-[1.75rem] xl:-mr-6 xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6",
        // thereIsAnAd ? "top-32" : "top-20",
        "top-20",
        className
      )}
      style={{
        WebkitMaskImage: `linear-gradient(to top, transparent 0%, #000 100px, #000 ${
          scrollPosition > 30 ? "90%" : "100%"
        }, transparent 100%)`
      }}
    >
      <nav aria-labelledby="on-this-page-title" className="w-56">
        <Suspense
          fallback={
            <div className="space-y-2">
              <Skeleton className="h-3 w-20 animate-pulse" />
              <Skeleton className="h-3 w-32 animate-pulse" />
              <Skeleton className="h-3 w-12 animate-pulse bg-fg/50" />
              <Skeleton className="h-3 w-16 animate-pulse" />
              <Skeleton className="h-3 w-8 animate-pulse" />
              <Skeleton className="h-3 w-24 animate-pulse" />
            </div>
          }
        >
          <>
            <Menu>
              <Button appearance="outline" className="text-left group justify-between">
                <IconGitBranches /> <span className="mr-2">Version {pathname.split("/")[2]}</span>
                <IconChevronLgDown className="size-3 group-pressed:rotate-180 duration-200" />
              </Button>
              <Menu.Content className="sm:w-full sm:max-w-(--trigger-width)">
                <Menu.Item href={pathname.replace(/\/\d+\.x/, "/1.x")}>Version 1.x</Menu.Item>
                <Menu.Item href={pathname.replace(/\/\d+\.x/, "/2.x")}>Version 2.x</Menu.Item>
              </Menu.Content>
            </Menu>
            <Heading
              level={2}
              className="text-base lg:text-lg font-medium leading-7 mb-6 text-fg mt-6"
            >
              On this page
            </Heading>
            {items.length > 0 && (
              <ul className="flex flex-col gap-y-2.5">
                {items.map((item) => (
                  <React.Fragment key={item.title}>
                    <TocLink item={item} activeId={activeId} />
                    {item.items && item.items.length > 0 && (
                      <ul className="flex pl-3 flex-col gap-y-2.5">
                        {item.items.map((subItem) => (
                          <TocLink key={subItem.title} item={subItem} activeId={activeId} />
                        ))}
                      </ul>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            )}
          </>
        </Suspense>
      </nav>
    </aside>
  )
}

function TocLink({ item, activeId }: { item: TableOfContentsProps; activeId: string | null }) {
  return (
    <li key={item.title}>
      <Link
        className={cn(
          "outline-none block no-underline tracking-tight lg:text-[0.885rem] duration-200 focus-visible:outline-none focus-visible:text-fg",
          item.url.split("#")[1] === activeId
            ? "text-fg forced-colors:text-[Highlight]"
            : "text-muted-fg/90 forced-colors:text-[GrayText]"
        )}
        href={item.url}
      >
        {item.title}
      </Link>
    </li>
  )
}

export function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let bestCandidate: IntersectionObserverEntry | null = null
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            (!bestCandidate || bestCandidate.intersectionRatio < entry.intersectionRatio)
          ) {
            bestCandidate = entry
          }
        })
        if (bestCandidate) {
          // @ts-ignore
          setActiveId(bestCandidate.target.id)
        }
      },
      { rootMargin: "0% 0% -25% 0%", threshold: 0.1 }
    )

    itemIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [itemIds, activeId])

  return activeId
}
