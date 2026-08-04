import { PhysicsState } from "shared/physics/States"
import { CharacterState } from "shared/physics/States"
import { InputFlags } from "shared/physics/Enums"

export class PhysicsHandler {
    /**
     * Simulates physics and returns a manipulated PhysicsState
     * 
     * @param State The current state
     * @param Force Velocity to be added to the object during simulation [HorizontalV, VerticalV]
     * 
     * @returns The state after manipulation
     */
    SimulatePhysics(State: PhysicsState, Force?: [number, number]): PhysicsState{
        /**
         * First, it calculates the terminal velocity of the object. Then adds any force into velocity, adds the velocity to the position.
         * And finally proceeds to calculate gravity and air drag.
         * Air drag in the X and Z axis simply adds/subtracts the value of State.airDrag from State.velocity, clamping at 0
         * Air drag in the Y axis checks if the velocity in the Y axis is above terminal velocity, then adds the value of State.airDrag, clamping at terminal velocity
         * Gravity subtracts the State.weight value from State.velocity.Y as long as State.isGrounded is True.
         * After all of the calculations it returns the new modified PhysicsState object.
         */
        let SimState = State
        let termVelocity = -(math.sqrt(2 * State.weight / State.airDrag))
        if (Force){
            SimState.hozVelocity = State.hozVelocity + Force[0]
            SimState.vertVelocity = State.vertVelocity + Force[1]
        }else{
            SimState.hozVelocity = State.hozVelocity
            SimState.vertVelocity = State.vertVelocity
        }

        SimState.position.add(State.plane.mul(SimState.hozVelocity))
        SimState.position = new Vector3(SimState.position.X, State.position.Y + SimState.vertVelocity, SimState.position.Z)
        if (State.isGrounded){
            //If grounded, apply friction instead of airdrag
            SimState.hozVelocity < 0? math.min(SimState.hozVelocity + SimState.friction, 0) : math.max(SimState.hozVelocity - SimState.friction, 0)
        }else{
            //If in the air, apply gravity and airdrag
            SimState.hozVelocity = SimState.hozVelocity < 0? math.min(SimState.hozVelocity + SimState.airDrag, 0) : math.max(SimState.hozVelocity - SimState.airDrag, 0)
            SimState.vertVelocity = math.max(SimState.vertVelocity - SimState.weight, termVelocity)
        }
        return SimState
    };

    /**
     * Simulates physics on the character, handling movement from inputs, and returns a manipulated CharacterState
     * 
     * @param State The current character state.
     * 
     * @returns The character state after simulation
     */
    SimulateCharacter(State: CharacterState): CharacterState{
        let SimCharState = {} as CharacterState
        let movX = 0
        let movY = 0
        let movZ = 0
        if (State.input.buttons === InputFlags.Toward){
            movX = math.max(State.physics.hozVelocity + State.acceleration, State.topSpeed)
        }

        return SimCharState
    }

    /**
     * Calculates the plane between the point and the target
     * 
     * @param Point One of the points on the plane (ex. Player Character)
     * @param Target The other point on the plane (ex. Locked on enemy)
     * 
     * @returns The plane created between the `Point` and the `Target`
     */
    GetPlane(Point: Vector3, Target: Vector3): Vector3 {
        let toTarget = Target.sub(Point)
        let Plane = new Vector3(toTarget.X,0,toTarget.Z).Unit
        return Plane
    } 
}