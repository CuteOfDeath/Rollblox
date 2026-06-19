// TODO: Split into multiple types

export type CharacterState = {
    Position: Vector3
    Velocity: Vector3
    Inputs?: Array<String>
    Force?: Vector3
    Weight?: number
    AirDrag?: number
}