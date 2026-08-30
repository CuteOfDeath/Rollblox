export interface CollisionResult {
	colliding: boolean;
	axis?: Vector3; // separating axis with least overlap, pointing from Part1 toward Part2
	depth?: number; // penetration depth along that axis
}

export class CollisionHandler {

	private ProjectRadius(halfSize: Vector3, boxAxes: Array<Vector3>, testAxis: Vector3): number {
		return (
			math.abs(halfSize.X * boxAxes[0].Dot(testAxis)) +
			math.abs(halfSize.Y * boxAxes[1].Dot(testAxis)) +
			math.abs(halfSize.Z * boxAxes[2].Dot(testAxis))
		);
	}

	CheckCollision(Part1: BasePart, Part2: BasePart): CollisionResult {
		const aAxes = [Part1.CFrame.RightVector, Part1.CFrame.UpVector, Part1.CFrame.LookVector];
		const bAxes = [Part2.CFrame.RightVector, Part2.CFrame.UpVector, Part2.CFrame.LookVector];

		const SATaxes: Array<Vector3> = [...aAxes, ...bAxes];

		for (const aAxis of aAxes) {
			for (const bAxis of bAxes) {
				const cross = aAxis.Cross(bAxis);
				if (cross.Magnitude > 1e-5) {
					SATaxes.push(cross.Unit); // normalize — overlap values must share a scale to compare
				}
			}
		}

		const delta = Part2.CFrame.Position.sub(Part1.CFrame.Position);

		let minOverlap = math.huge;
		let minAxis: Vector3 | undefined;

		for (const axis of SATaxes) {
			const radiusA = this.ProjectRadius(Part1.Size.div(2), aAxes, axis);
			const radiusB = this.ProjectRadius(Part2.Size.div(2), bAxes, axis);
			const distance = math.abs(delta.Dot(axis));
			const overlap = radiusA + radiusB - distance;

			if (overlap < 0) {
				return { colliding: false }; // separating axis found, bail immediately
			}

			if (overlap < minOverlap) {
				minOverlap = overlap;
				minAxis = axis;
			}
		}

		if (!minAxis) {
			return { colliding: false };
		}

		if (minAxis.Dot(delta) < 0) {
			minAxis = minAxis.mul(-1); // keep axis pointing Part1 -> Part2
		}

		return { colliding: true, axis: minAxis, depth: minOverlap };
	}

	// ratio = how much of the correction Part1 absorbs (0-1). Default splits it evenly.
	// Pass ratio = 0 if Part1 is static/immovable, so Part2 takes the full correction.
	CorrectPosition(Part1: BasePart, Part2: BasePart, result: CollisionResult, ratio = 0.5): boolean {
		if (!result.colliding || !result.axis || result.depth === undefined) {
			return false;
		}

		const correction = result.axis.mul(result.depth);
		Part1.Position = Part1.Position.sub(correction.mul(ratio));
		Part2.Position = Part2.Position.add(correction.mul(1 - ratio));
		return true;
	}
}
