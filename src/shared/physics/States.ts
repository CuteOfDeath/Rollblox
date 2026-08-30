export type PhysicsState = {
    Part: BasePart;
    hozVelocity: number;
    vertVelocity:number;
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
    input: Array<InputState>;

    side: boolean;
    topSpeed: number;
    acceleration: number;
    target: Vector3;
};

export type CameraState = {
    position: Vector3;
    FOV: number;
}