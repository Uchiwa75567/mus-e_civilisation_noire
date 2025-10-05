"use client"

import { useState, useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

interface CameraControllerProps {
  sensitivity: number
  baseSpeed: number
  floorHeight?: number
}

export function CameraController({ sensitivity, baseSpeed, floorHeight = 0 }: CameraControllerProps) {
  const { camera, gl } = useThree()
  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  
  // Contrôles mobiles
  const [mobileForward, setMobileForward] = useState(0)
  const [mobileRight, setMobileRight] = useState(0)

  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))
  const pointerDown = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })

  // Exposer la fonction de contrôle mobile
  useEffect(() => {
    const handleMobileMove = (e: CustomEvent) => {
      setMobileForward(e.detail.forward)
      setMobileRight(e.detail.right)
    }
    window.addEventListener('mobile-move', handleMobileMove as EventListener)
    return () => window.removeEventListener('mobile-move', handleMobileMove as EventListener)
  }, [])

  // Gestion clavier
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          setMoveForward(true)
          break
        case 'KeyS':
        case 'ArrowDown':
          setMoveBackward(true)
          break
        case 'KeyA':
        case 'ArrowLeft':
          setMoveLeft(true)
          break
        case 'KeyD':
        case 'ArrowRight':
          setMoveRight(true)
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          setIsRunning(true)
          break
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          setMoveForward(false)
          break
        case 'KeyS':
        case 'ArrowDown':
          setMoveBackward(false)
          break
        case 'KeyA':
        case 'ArrowLeft':
          setMoveLeft(false)
          break
        case 'KeyD':
        case 'ArrowRight':
          setMoveRight(false)
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          setIsRunning(false)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Gestion souris et tactile
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      pointerDown.current = true
      lastPointer.current = { x: e.clientX, y: e.clientY }
    }

    const onPointerUp = () => {
      pointerDown.current = false
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!pointerDown.current) return

      const movementX = e.clientX - lastPointer.current.x
      const movementY = e.clientY - lastPointer.current.y
      lastPointer.current = { x: e.clientX, y: e.clientY }

      euler.current.setFromQuaternion(camera.quaternion)
      euler.current.y -= movementX * (0.002 * sensitivity)
      euler.current.x -= movementY * (0.002 * sensitivity)
      euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x))
      camera.quaternion.setFromEuler(euler.current)
    }

    gl.domElement.addEventListener('pointerdown', onPointerDown)
    gl.domElement.addEventListener('pointerup', onPointerUp)
    gl.domElement.addEventListener('pointermove', onPointerMove)

    return () => {
      gl.domElement.removeEventListener('pointerdown', onPointerDown)
      gl.domElement.removeEventListener('pointerup', onPointerUp)
      gl.domElement.removeEventListener('pointermove', onPointerMove)
    }
  }, [camera, gl.domElement, sensitivity])

  // Boucle d'animation
  useFrame((state, delta) => {
    const speed = isRunning ? baseSpeed * 2 : baseSpeed

    // Combiner contrôles clavier et mobile
    const keyboardZ = Number(moveForward) - Number(moveBackward)
    const keyboardX = Number(moveRight) - Number(moveLeft)
    
    direction.current.z = keyboardZ || mobileForward
    direction.current.x = keyboardX || mobileRight
    direction.current.normalize()

    if (direction.current.z !== 0) velocity.current.z -= direction.current.z * speed * delta
    if (direction.current.x !== 0) velocity.current.x -= direction.current.x * speed * delta

    // Friction
    velocity.current.x -= velocity.current.x * 10.0 * delta
    velocity.current.z -= velocity.current.z * 10.0 * delta

    // Déplacement
    camera.translateX(velocity.current.x * delta)
    camera.translateZ(velocity.current.z * delta)

    // Limites de la salle (collision basique)
    camera.position.x = Math.max(-28, Math.min(28, camera.position.x))
    camera.position.z = Math.max(-28, Math.min(28, camera.position.z))
    camera.position.y = 1.6 + floorHeight

    // Mise à jour HUD
    try {
      const fpsEl = document.getElementById('fps')
      if (fpsEl) fpsEl.textContent = String(Math.round(1 / Math.max(0.001, delta)))

      const posEl = document.getElementById('pos')
      if (posEl) {
        posEl.textContent = `X: ${camera.position.x.toFixed(1)} Z: ${camera.position.z.toFixed(1)}`
      }
    } catch (e) {
      // Ignore errors
    }
  })

  // Reset camera and handle floor changes
  useEffect(() => {
    const onReset = () => {
      camera.position.set(0, 1.6 + floorHeight, 10)
      camera.rotation.set(0, 0, 0)
      velocity.current.set(0, 0, 0)
    }

    window.addEventListener('reset-camera', onReset as EventListener)
    return () => window.removeEventListener('reset-camera', onReset as EventListener)
  }, [camera, floorHeight])

  // Adjust camera height when floor changes
  useEffect(() => {
    camera.position.y = 1.6 + floorHeight
  }, [floorHeight, camera])

  return null
}