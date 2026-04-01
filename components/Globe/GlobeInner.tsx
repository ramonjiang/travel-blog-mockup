'use client'

import { useEffect, useRef } from 'react'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'
import type { Trip } from '@/lib/types'
import { format } from 'date-fns'

interface Props {
  trips: Trip[]
  onTripClick: (tripId: string) => void
}

// ISO 3166-1 numeric codes for visited countries
// USA=840, Mexico=484, Indonesia=360
const VISITED_COUNTRY_IDS = new Set([840, 484, 360])

export default function GlobeInner({ trips, onTripClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // WebGL check
    try {
      const canvas = document.createElement('canvas')
      const hasWebGL = !!(
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      )
      if (!hasWebGL) throw new Error('No WebGL')
    } catch {
      container.innerHTML =
        '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#888;font-size:0.9rem;text-align:center;padding:2rem;">Globe requires WebGL.<br>Try opening on desktop.</div>'
      return
    }

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || Math.min(window.innerHeight * 0.5, 500)
    if (!container.clientHeight) container.style.height = height + 'px'

    const isMobile = window.innerWidth < 768

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Globe = require('globe.gl').default

    const globe = Globe()
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
      .backgroundColor('rgba(0,0,0,0)')
      .width(width)
      .height(height)
      .atmosphereColor('#f97316')
      .atmosphereAltitude(isMobile ? 0.12 : 0.15)
      .pointsData(trips)
      .pointLat((d: Trip) => d.lat)
      .pointLng((d: Trip) => d.lng)
      .pointAltitude(isMobile ? 0.08 : 0.06)
      .pointRadius(isMobile ? 1.0 : 0.8)
      .pointColor(() => '#f97316')
      .pointLabel((d: Trip) => `
        <div style="background:rgba(20,20,20,0.9);backdrop-filter:blur(8px);padding:8px 12px;border-radius:8px;border:1px solid rgba(249,115,22,0.3);font-family:var(--font-inter),sans-serif;font-size:13px;">
          <div style="font-weight:600;color:#f0f0f0;">${d.name}</div>
          <div style="color:#888;font-size:11px;margin-top:2px;">${d.location} · ${(() => { const [y,mo] = d.trip_date.split('-').map(Number); return format(new Date(y, mo-1, 1), 'MMM yyyy') })()}</div>
        </div>
      `)
      .onPointClick((d: Trip) => onTripClick(d.id))
      (container)

    globe.controls().autoRotate = false
    globe.controls().enableZoom = false

    // Start facing North America
    globe.pointOfView({ lat: 25, lng: -100, altitude: 2.5 }, 0)

    // Load country polygons and highlight visited countries
    fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
      .then(r => r.json())
      .then((topology: Topology) => {
        const countries = feature(topology, topology.objects.countries as Parameters<typeof feature>[1])
        const visited = (countries as GeoJSON.FeatureCollection).features.filter(
          f => VISITED_COUNTRY_IDS.has(Number(f.id))
        )
        globe
          .polygonsData(visited)
          .polygonCapColor(() => 'rgba(249, 115, 22, 0.25)')
          .polygonSideColor(() => 'transparent')
          .polygonStrokeColor(() => 'rgba(249, 115, 22, 0.5)')
          .polygonAltitude(0.001)
      })

    const handleResize = () => {
      globe.width(container.clientWidth).height(container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      container.innerHTML = ''
    }
  }, [trips, onTripClick])

  return <div id="globe-container" ref={containerRef} />
}
