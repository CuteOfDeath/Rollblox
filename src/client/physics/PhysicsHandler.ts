import { CharacterState } from "./CharacterState"

export class PhysicsHandler {
    /**
     * Simulates physics on the part from given State
     * 
     * @param Object The part to be manipulated
     * @param State The current state of the part
     * @param Inputs A table of inputs which affect the part 
     * @param Weight Optional. Determines how much the part gets weight down by gravity.
     * @param AirDrag Optional. Determines how much the part gets slowed down by air drag.
     * @param Force Optional. If set, the vector will be added to the velocity of the part.
     */
    SimulatePhysics(Object: Part, State: CharacterState, Inputs?: Array<String>, Force?: Vector3, Weight = 10, AirDrag = 20): void{
        
    }
}