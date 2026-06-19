export type PhysicsState = {
    position: Vector3;
    velocity: Vector3;
    force: Vector3;

    weight: number;
    airDrag: number;
};

export type InputState = {
    buttons: number;
};

export type CharacterState = {
    physics: PhysicsState;
    input: InputState;
};