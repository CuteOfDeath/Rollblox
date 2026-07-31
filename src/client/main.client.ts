import { PhysicsHandler } from "./physics/PhysicsHandler";
import { PhysicsState } from "shared/physics/States";

let PhysicsHandle = new PhysicsHandler

let test_state = {} as PhysicsState

PhysicsHandle.SimulatePhysics(test_state,[1,2])