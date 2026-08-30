import { Workspace } from "@rbxts/services";
import { PhysicsHandler } from "./physics/PhysicsHandler";
import { PhysicsState } from "shared/physics/States";
import { UpdateHandler } from "./update/UpdateHandler";


wait(4)
let UpHandler = new UpdateHandler
UpHandler.InitUpdates()