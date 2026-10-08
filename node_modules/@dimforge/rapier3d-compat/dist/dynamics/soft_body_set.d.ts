import { RawSoftBodySet } from "../raw";
import { Vector } from "../math";
import { SoftBody, SoftBodyDesc, SoftBodyHandle, SoftBodyTearEvent } from "./soft_body";
import { RigidBodySet } from "./rigid_body_set";
import { ColliderSet } from "../geometry";
import { ImpulseJointSet } from "./impulse_joint_set";
import { MultibodyJointSet } from "./multibody_joint_set";
import { IslandManager } from "./island_manager";
/**
 * A set of soft bodies that can be handled by a physics pipeline.
 *
 * To avoid leaking WASM resources, this MUST be freed manually with `softBodySet.free()`
 * once you are done using it (and all the soft bodies it created).
 */
export declare class SoftBodySet {
    raw: RawSoftBodySet;
    private map;
    /**
     * Release the WASM memory occupied by this soft-body set.
     */
    free(): void;
    constructor(raw?: RawSoftBodySet);
    /**
     * Internal method, do not call this explicitly.
     */
    finalizeDeserialization(bodies: RigidBodySet, colliders: ColliderSet): void;
    /**
     * Creates a new soft body, its hidden root rigid body and its colliders, and returns it.
     *
     * @param bodies - The set of rigid bodies receiving the body's proxies.
     * @param colliders - The set of colliders receiving the body's colliders.
     * @param desc - The description of the soft body to create.
     */
    createSoftBody(bodies: RigidBodySet, colliders: ColliderSet, desc: SoftBodyDesc): SoftBody;
    /**
     * Removes a soft body from this set, with its proxies, colliders and attached joints.
     */
    remove(handle: SoftBodyHandle, islands: IslandManager, bodies: RigidBodySet, colliders: ColliderSet, impulseJoints: ImpulseJointSet, multibodyJoints: MultibodyJointSet): void;
    /**
     * Adds a cluster over the given particles: a rigid proxy that joints and colliders can
     * attach to. Returns the cluster's index, or `null` if no particle was valid.
     */
    addCluster(handle: SoftBodyHandle, particles: Uint32Array | number[], bodies: RigidBodySet, colliders: ColliderSet): number | null;
    /**
     * Removes a cluster with its proxy, colliders and joints. Returns `false` if the cluster
     * did not exist.
     */
    removeCluster(handle: SoftBodyHandle, cluster: number, islands: IslandManager, bodies: RigidBodySet, colliders: ColliderSet, impulseJoints: ImpulseJointSet, multibodyJoints: MultibodyJointSet): boolean;
    /**
     * Tears a soft body at once along the given edges and through the given cells, without
     * removing material. Pieces disconnected by the tear become soft bodies of their own.
     *
     * Returns the tear event (which must be freed), or `null` when nothing changed.
     */
    tear(handle: SoftBodyHandle, edges: Uint32Array | number[], cells: Uint32Array | number[], islands: IslandManager, bodies: RigidBodySet, colliders: ColliderSet, impulseJoints: ImpulseJointSet, multibodyJoints: MultibodyJointSet): SoftBodyTearEvent | null;
    /**
     * Cuts a soft body along a blade: a segment (two points) in 2D, a triangle (three points)
     * in 3D. Pieces disconnected by the cut become soft bodies of their own.
     *
     * Returns the tear event (which must be freed), or `null` when nothing changed.
     */
    cut(handle: SoftBodyHandle, blade: Vector[], islands: IslandManager, bodies: RigidBodySet, colliders: ColliderSet, impulseJoints: ImpulseJointSet, multibodyJoints: MultibodyJointSet): SoftBodyTearEvent | null;
    /**
     * Maps the soft bodies, proxies and colliders a topology change created, and unmaps what
     * it removed.
     */
    private finishTopologyChange;
    /**
     * Wraps the soft bodies the engine created (the pieces a tear split off) that have no
     * JavaScript wrapper yet; the pieces of a tear event are only reachable after this.
     */
    mapNewSoftBodies(bodies: RigidBodySet, colliders: ColliderSet): void;
    /**
     * Wakes a soft body and everything it touches up.
     *
     * @param strong - If `true` the bodies stay awake for a while even if they are at rest.
     */
    wakeUp(handle: SoftBodyHandle, bodies: RigidBodySet, strong: boolean): void;
    /**
     * The number of soft bodies on this set.
     */
    len(): number;
    /**
     * Does this set contain a soft body with the given handle?
     */
    contains(handle: SoftBodyHandle): boolean;
    /**
     * Gets the soft body with the given handle.
     */
    get(handle: SoftBodyHandle): SoftBody | null;
    /**
     * Applies the given closure to each soft body contained by this set.
     */
    forEach(f: (body: SoftBody) => void): void;
    /**
     * Gets all soft bodies in the list.
     */
    getAll(): SoftBody[];
}
