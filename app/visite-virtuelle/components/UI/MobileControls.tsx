"use client"

import { useEffect, useRef, useState } from "react"

interface MobileControlsProps {
  onMove: (forward: number, right: number) => void
}

export function MobileControls({ onMove }: MobileControlsProps) {
  const [isMobile, setIsMobile] = useState(false)
  const joystickRef = useRef<HTMLDivElement>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    // Détecter si mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile || !joystickRef.current || !knobRef.current) return

    const joystick = joystickRef.current
    const knob = knobRef.current
    const maxDistance = 40

    const handleStart = (e: TouchEvent | MouseEvent) => {
      setIsDragging(true)
      e.preventDefault()
    }

    const handleMove = (e: TouchEvent | MouseEvent) => {
      if (!isDragging) return

      const touch = 'touches' in e ? e.touches[0] : e
      const rect = joystick.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      let deltaX = touch.clientX - centerX
      let deltaY = touch.clientY - centerY

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      
      if (distance > maxDistance) {
        deltaX = (deltaX / distance) * maxDistance
        deltaY = (deltaY / distance) * maxDistance
      }

      knob.style.transform = `translate(${deltaX}px, ${deltaY}px)`

      // Normaliser les valeurs entre -1 et 1
      const forward = -deltaY / maxDistance
      const right = deltaX / maxDistance

      onMove(forward, right)
    }

    const handleEnd = () => {
      setIsDragging(false)
      knob.style.transform = 'translate(0, 0)'
      onMove(0, 0)
    }

    joystick.addEventListener('touchstart', handleStart)
    joystick.addEventListener('mousedown', handleStart)
    document.addEventListener('touchmove', handleMove)
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('touchend', handleEnd)
    document.addEventListener('mouseup', handleEnd)

    return () => {
      joystick.removeEventListener('touchstart', handleStart)
      joystick.removeEventListener('mousedown', handleStart)
      document.removeEventListener('touchmove', handleMove)
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('touchend', handleEnd)
      document.removeEventListener('mouseup', handleEnd)
    }
  }, [isDragging, isMobile, onMove])

  if (!isMobile) return null

  return (
    <div className="absolute bottom-24 left-6 pointer-events-auto z-20">
      {/* Joystick virtuel */}
      <div
        ref={joystickRef}
        className="relative w-32 h-32 bg-black/40 backdrop-blur-sm rounded-full border-2 border-amber-600/50 flex items-center justify-center"
      >
        <div
          ref={knobRef}
          className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full shadow-lg border-2 border-amber-400/50 transition-transform"
        />
        {/* Indicateurs directionnels */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-amber-400 text-xs">▲</div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-amber-400 text-xs">▼</div>
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-amber-400 text-xs">◀</div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-amber-400 text-xs">▶</div>
      </div>
      <p className="text-center text-white text-xs mt-2 opacity-70">Déplacer</p>
    </div>
  )
}