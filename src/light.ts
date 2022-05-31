import { DirectionalLight } from "three"

export function directionLight(opacity: number, x: number, y: number, z: number, color = 0xFFFFFF) {
    let light = new DirectionalLight(color, opacity)
    light.position.set(x, y, z)
    light.castShadow = true
  
    let d = 4000
    light.shadow.camera.left = -d
    light.shadow.camera.right = d
    light.shadow.camera.top = d * .25
    light.shadow.camera.bottom = -d
  
    light.shadow.mapSize.width = 1024
    light.shadow.mapSize.height = 1024
  
    return light
  }