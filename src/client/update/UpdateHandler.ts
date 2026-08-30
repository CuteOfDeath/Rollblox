import { Workspace } from "@rbxts/services"
import { PhysicsHandler } from "client/physics/PhysicsHandler"
import { PhysicsState } from "shared/physics/States"

export class UpdateHandler {
    
    InitUpdates(){
        print("bomboclat")
        let physHandler = new PhysicsHandler
        let testPart1 = new Instance("Part", Workspace)
        let testPart2 = new Instance("Part", Workspace)
        testPart1.Size = new Vector3(3,3,3)
        testPart1.CFrame = new CFrame(10,50,10)
        testPart1.Color = new Color3(1,0,0)
        testPart2.Size = new Vector3(1,1,1)
        testPart2.CFrame = new CFrame(4,0.5,4)
        testPart1.Anchored = true
        testPart2.Anchored = true
        let state: PhysicsState = {
            Part : testPart1,
            hozVelocity : 0,
            vertVelocity: 0,
            plane: physHandler.GetPlane(testPart1.Position,testPart2.Position),
            weight: 3,
            airDrag: 0.5,
            isGrounded: false,
            friction: 0.5
        }
        while (true) {
            wait(0.1)
            print(state)
            state = physHandler.SimulatePhysics(state)
            testPart1.CFrame = state.Part.CFrame
        }
    }


}