import { RawColliderSet } from "../raw";
import { Collider, ColliderDesc, ColliderHandle } from "./collider";
import { ImpulseJointHandle, IslandManager, RigidBodyHandle, RigidBodySet, SoftBodySet, SoftMeshBinding } from "../dynamics";
/**
 * A set of rigid bodies that can be handled by a physics pipeline.
 *
 * To avoid leaking WASM resources, this MUST be freed manually with `colliderSet.free()`
 * once you are done using it (and all the rigid-bodies it created).
 */
export declare class ColliderSet {
    raw: RawColliderSet;
    private map;
    /**
     * Release the WASM memory occupied by this collider set.
     */
    free(): void;
    constructor(raw?: RawColliderSet);
    /** @internal */
    castClosure<Res>(f?: (collider: Collider) => Res): (handle: ColliderHandle) => Res | undefined;
    /** @internal */
    finalizeDeserialization(bodies: RigidBodySet): void;
    /**
     * Creates a new collider and return its integer handle.
     *
     * @param bodies - The set of bodies where the collider's parent can be found.
     * @param desc - The collider's description.
     * @param parentHandle - The integer handle of the rigid-body this collider is attached to.
     */
    createCollider(bodies: RigidBodySet, desc: ColliderDesc, parentHandle: RigidBodyHandle): Collider;
    /**
     * Creates a collider holding a soft body's deformable collision mesh: a polyline (2D) or a
     * triangle mesh (3D) built with the `DEFORMABLE` flag, whose vertices follow the cluster
     * of the parent proxy through `binding`.
     *
     * Returns `null` when the binding fails: the parent is not a live cluster proxy, the shape
     * is not a deformable mesh, or a vertex could not be bound.
     *
     * @param bodies - The set of bodies where the parent proxy can be found.
     * @param softBodies - The set of soft bodies owning the cluster.
     * @param desc - The collider's description.
     * @param binding - How the mesh follows the cluster.
     * @param parentHandle - The handle of the cluster proxy (see `SoftBody.rootBody`,
     *                       `SoftBody.clusterProxy`).
     */
    createDeformableCollider(bodies: RigidBodySet, softBodies: SoftBodySet, desc: ColliderDesc, binding: SoftMeshBinding, parentHandle: RigidBodyHandle): Collider | null;
    /**
     * Wraps the colliders the engine created on its own (the deformable collision meshes of
     * soft bodies) that have no JavaScript wrapper yet.
     */
    mapNewColliders(bodies: RigidBodySet): void;
    /**
     * Drops the wrappers of the colliders the engine removed on its own (the colliders of
     * removed soft bodies and clusters).
     */
    unmapRemovedColliders(): void;
    /**
     * Remove a collider from this set.
     *
     * @param handle - The integer handle of the collider to remove.
     * @param bodies - The set of rigid-body containing the rigid-body the collider is attached to.
     * @param wakeUp - If `true`, the rigid-body the removed collider is attached to will be woken-up automatically.
     */
    remove(handle: ColliderHandle, islands: IslandManager, bodies: RigidBodySet, softBodies: SoftBodySet, wakeUp: boolean): void;
    /**
     * Internal function, do not call directly.
     * @param handle
     */
    unmap(handle: ImpulseJointHandle): void;
    /**
     * Gets the rigid-body with the given handle.
     *
     * @param handle - The handle of the rigid-body to retrieve.
     */
    get(handle: ColliderHandle): Collider | null;
    /**
     * The number of colliders on this set.
     */
    len(): number;
    /**
     * Does this set contain a collider with the given handle?
     *
     * @param handle - The collider handle to check.
     */
    contains(handle: ColliderHandle): boolean;
    /**
     * Applies the given closure to each collider contained by this set.
     *
     * @param f - The closure to apply.
     */
    forEach(f: (collider: Collider) => void): void;
    /**
     * Gets all colliders in the list.
     *
     * @returns collider list.
     */
    getAll(): Collider[];
}
