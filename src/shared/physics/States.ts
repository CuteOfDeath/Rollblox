export type PhysicsState = {
    position: Vector3;
    hozVelocity: number;
    vertVelocity:number
    plane: Vector3;

    weight: number;
    airDrag: number;
    isGrounded: boolean;
    friction: number;
};

export type InputState = {
    buttons: number;
};

export type CharacterState = {
    physics: PhysicsState;
    input: InputState;

    side: boolean;
    topSpeed: number;
    acceleration: number;
    target: Vector3
};