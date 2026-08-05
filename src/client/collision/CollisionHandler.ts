export class CollisionHandler {

    ProjectRadius(halfSize: Vector3, boxAxes: Array<Vector3>, testAxis: Vector3){
        return math.abs(halfSize.X * boxAxes[1].Dot(testAxis)) +
        math.abs(halfSize.Y * boxAxes[2].Dot(testAxis)) +
        math.abs(halfSize.Z * boxAxes[3].Dot(testAxis))
    }

    CheckCollision(Part1: Part, Part2: Part): boolean {
        //Get SAT axis
        let aAxes = [Part1.CFrame.RightVector, Part1.CFrame.UpVector, Part1.CFrame.LookVector]
        let bAxes = [Part2.CFrame.RightVector, Part2.CFrame.UpVector, Part2.CFrame.LookVector]

        let SATaxes = [...aAxes, ...bAxes] as Array<Vector3>

        aAxes.forEach((aAxis) => {
            bAxes.forEach((bAxis) => {
                let cross = aAxis.Cross(bAxis)
                if (cross.Magnitude > 1e-5) {
                    SATaxes.push(cross)
                }
            })
        })
        
        let delta = Part2.CFrame.Position.sub(Part1.CFrame.Position) 
        SATaxes.forEach((axis) => {
            let radiusA = this.ProjectRadius(Part1.Size.div(2), aAxes, axis)
            let radiusB = this.ProjectRadius(Part2.Size.div(2), bAxes, axis)
            let distance = math.abs(delta.Dot(axis))
            if ((radiusA + radiusB) - distance < 0){
                return false
            }
        })
        return true 
    }
}