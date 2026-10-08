import { Collider } from "./collider";
import { Vector } from "../math";
/**
 * The result of a shape-cast between two shapes, returned by the pairwise casts
 * `Shape.castShape` and `Collider.castShape`.
 *
 * The first shape is the one the cast is called on (the shape or collider `this`), and the
 * second shape is the `shape2` argument. Each witness point and normal is expressed in the
 * local-space of its own shape, i.e., relative to that shape's pose (it does not depend on
 * the shape's translation along the cast).
 */
export declare class ShapeCastHit {
    /**
     * The time of impact of the two shapes.
     */
    time_of_impact: number;
    /**
     * The contact point on the first shape at the time of impact, expressed in the
     * local-space of the first shape.
     */
    witness1: Vector;
    /**
     * The contact point on the second shape at the time of impact, expressed in the
     * local-space of the second shape.
     */
    witness2: Vector;
    /**
     * The outward normal on the first shape at the time of impact, expressed in the
     * local-space of the first shape.
     */
    normal1: Vector;
    /**
     * The outward normal on the second shape at the time of impact, expressed in the
     * local-space of the second shape.
     */
    normal2: Vector;
    constructor(time_of_impact: number, witness1: Vector, witness2: Vector, normal1: Vector, normal2: Vector);
    static fromBuffer(collider: Collider, buffer: Float32Array, target?: ShapeCastHit): ShapeCastHit;
}
/**
 * The result of a shape-cast that hit a collider.
 *
 * The frames of the witness points and normals depend on the query that returned it:
 * - `World.castShape` (and `BroadPhase.castShape`): `witness1` and `normal1` lie on the hit
 *   `collider` and are expressed in world-space; `witness2` and `normal2` lie on the cast
 *   shape and are expressed in its local-space (relative to its pose, so they do not depend
 *   on its translation along the cast).
 * - `Collider.castCollider`: `witness1` and `normal1` lie on the collider the cast is called
 *   on and are expressed in its local-space; `witness2` and `normal2` lie on the hit
 *   `collider` (the `collider2` argument) and are expressed in its local-space.
 */
export declare class ColliderShapeCastHit extends ShapeCastHit {
    /**
     * The collider hit by the shape-cast.
     */
    collider: Collider;
    constructor(collider: Collider, time_of_impact: number, witness1: Vector, witness2: Vector, normal1: Vector, normal2: Vector);
    static fromBuffer(collider: Collider, buffer: Float32Array, target?: ColliderShapeCastHit): ColliderShapeCastHit;
}
