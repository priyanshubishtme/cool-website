import { RawSoftBodyBuilder, RawSoftBodyMaterial, RawSoftBodySet, RawSoftBodyTearEvent, RawSoftMeshBindingMode, RawSoftRecoverySettings } from "../raw";
import { Rotation, Vector } from "../math";
import { RigidBody, RigidBodyHandle } from "./rigid_body";
import { RigidBodySet } from "./rigid_body_set";
import { Collider, ColliderDesc, ColliderSet } from "../geometry";
/**
 * The integer identifier of a soft body added to a `SoftBodySet`.
 */
export declare type SoftBodyHandle = number;
/**
 * The constitutive model of a soft body's cells (triangles in 2D, tetrahedra in 3D).
 */
export declare enum SoftBodyCellModel {
    /**
     * Per-cell area/volume preservation constraints (the cell's shape is held by its edges).
     */
    Volume = 0,
    /**
     * Corotational linear elasticity: a linear material in the cell's rotated frame.
     */
    Corotational = 1,
    /**
     * Neo-Hookean hyperelasticity, which resists inversion and large compressions.
     */
    NeoHookean = 2
}
/**
 * Which strains make a soft body's edge rest lengths flow plastically.
 */
export declare enum SoftEdgePlasticFlow {
    Both = 0,
    Compression = 1,
    Tension = 2
}
/**
 * Which solver holds the cells of a soft body together.
 */
export declare enum SoftBodySolver {
    /**
     * Every element of the lattice becomes a constraint, solved with the contacts and the
     * joints of the scene.
     */
    Constraints = 0,
    /**
     * The elasticity of the whole body is assembled into one linear system, solved at each
     * substep; the stiffness of the body no longer depends on the iteration count. Needs cells.
     */
    Fem = 1
}
/**
 * What the per-point constraints of the features an intersection-volume constraint acts on do.
 */
export declare enum SoftPatchConstraints {
    /**
     * Keep them as they are (they may fight the volume constraint).
     */
    Keep = 0,
    /**
     * Stand them down: the volume constraint alone acts on those features.
     */
    StandDown = 1,
    /**
     * Keep them, but along the volume constraint's normal, so they push the way it does.
     */
    AlongNormal = 2
}
/**
 * The tangle detection and recovery settings shared by every soft body of a world.
 *
 * A plain JavaScript object; read it from `IntegrationParameters.softBodiesRecovery` and
 * assign it back to apply it. Every mechanism switches off individually.
 */
export declare class SoftRecoverySettings {
    /**
     * Raise the speculative contact margin from velocities authored between steps, so a fast fresh body does not tunnel (default: `true`).
     */
    authoredVelocityMargin: boolean;
    /**
     * Give the edge-vs-edge pass a speculative reach, so bodies crossing corner-first collide; on, those constraints leave pressed 3D piles crossed (default: `false`).
     */
    edgeSpeculation: boolean;
    /**
     * Detect inverted cells (material locally inside out) at each step; feeds the self stand-down (default: `true`).
     */
    invertedCellDetection: boolean;
    /**
     * Detect surface self-crossings at each step; feeds the self stand-down (default: `true`).
     */
    selfCrossingDetection: boolean;
    /**
     * Skip the self-crossing sweep while the surface could not have moved far enough to cross itself (default: `true`).
     */
    detectionMotionGating: boolean;
    /**
     * Detect boundary crossings between pairs of soft surfaces (default: `true`).
     */
    crossBodyDetection: boolean;
    /**
     * Self contacts of tangled features stand down, so the elasticity resolves the tangle instead of freezing it (default: `true`).
     */
    selfStandDown: boolean;
    /**
     * A vertex constraint touching a boundary crossing between two surfaces may only expel, never hold (default: `true`).
     */
    crossBodyExpelGate: boolean;
    /**
     * Edge constraints touching a cross-body boundary crossing stand down (default: `true`).
     */
    edgeStandDown: boolean;
    /**
     * Constraints on crossing-flagged features repel instead of standing down (default: `false`).
     */
    crossingRepulsion: boolean;
    /**
     * Guide the crossing repulsion by the pair's volume normal rather than the pierced element's plane normal; closed pairs only (default: `false`).
     */
    crossingRepulsionGuide: boolean;
    /**
     * Guide the self-crossing repulsion by the fold's volume normal; closed meshes only (default: `false`).
     */
    crossingRepulsionSelfGuide: boolean;
    /**
     * Intersection-volume contact for closed surfaces: one coupled constraint per overlapping pair, corrected by the intersection volume (default: `true`).
     */
    overlapConstraints: boolean;
    /**
     * Overlap constraints against rigid colliders too (default: `true`).
     */
    overlapRigid: boolean;
    /**
     * A self-crossed mesh takes no pair constraint, its volume gradient pointing the wrong way there (default: `true`).
     */
    overlapSkipSelfTangled: boolean;
    /**
     * The 3D closed-closed edge constraints stand down on a pair an overlap constraint owns (default: `true`).
     */
    overlapEdgeStandDown: boolean;
    /**
     * Measure the intersection volume on the contact skins instead of the geometric surfaces (default: `false`).
     */
    overlapSkinVolume: boolean;
    /**
     * Volume constraints on a body's self-overlaps between distinct surface regions; closed meshes only (default: `false`).
     */
    overlapSelfRegions: boolean;
    /**
     * Push along each constraint's normal instead of the volume gradients, so the whole patch separates along one axis (default: `true`).
     */
    overlapNormalPush: boolean;
    /**
     * Split each pair's patch into a grid of cells, each with its own constraint, so the pressure varies across the patch (default: `false`).
     */
    overlapMultiVolume: boolean;
    /**
     * Material recovery pace, in length units per second: the corrective rate allowed to deep recovery, demoted intruders and untangling pulls (default: `0.5`).
     */
    recoveryPace: number;
    /**
     * Bound on the velocity change the coupled constraint may hand any side per step, in multiples of `recoveryPace` (default: `1.0`).
     */
    overlapConstraintPace: number;
    /**
     * The skin overlap kept at rest, as a fraction of the pair's skins (default: `0.0`).
     */
    overlapKeptDepth: number;
    /**
     * Relative drop of the overlap estimate that counts as progress for `overlapPatience` (default: `0.02`).
     */
    overlapProgressMargin: number;
    /**
     * Cells per tangent axis of the multi-volume grid (default: `3`).
     */
    overlapSplit: number;
    /**
     * Steps without progress of a pair's volume estimate before its positional correction stands down (default: `240`).
     */
    overlapPatience: number;
    /**
     * What the per-point constraints of the features inside a volume constraint's patch do
     * (default: `AlongNormal`).
     */
    overlapPatchConstraints: SoftPatchConstraints;
    constructor();
    /** @internal */
    static fromRaw(raw: RawSoftRecoverySettings): SoftRecoverySettings;
    /** @internal */
    private static copyFromRaw;
    /** @internal */
    intoRaw(): RawSoftRecoverySettings;
}
/**
 * How the vertices of a deformable collider follow the particles of its cluster.
 */
export declare enum SoftMeshBindingMode {
    /**
     * Vertex `i` of the mesh follows the `i`-th particle of the binding's particle list.
     */
    Direct = 0,
    /**
     * Every vertex follows the particle of the cluster closest to it.
     */
    DirectByPosition = 1,
    /**
     * Every vertex is embedded in the cell of the cluster holding it (cage simulation).
     */
    Skinned = 2
}
/**
 * Describes how a deformable collider is bound to the cluster of a soft body.
 */
export declare class SoftMeshBinding {
    mode: SoftMeshBindingMode;
    /**
     * For `SoftMeshBindingMode.Direct`: the particle followed by each vertex of the mesh.
     */
    particles: Uint32Array;
    /**
     * For `SoftMeshBindingMode.DirectByPosition`: the largest distance between a vertex and
     * the particle it follows.
     */
    eps: number;
    /**
     * Whether the mesh collides with itself.
     */
    selfContacts: boolean;
    constructor(mode: SoftMeshBindingMode);
    /**
     * Binds vertex `i` of the mesh to `particles[i]`, which must belong to the cluster.
     */
    static direct(particles: Uint32Array | number[]): SoftMeshBinding;
    /**
     * Binds every vertex to the particle of the cluster closest to it, within `eps`.
     */
    static directByPosition(eps: number): SoftMeshBinding;
    /**
     * Binds every vertex to the cell of the cluster holding it (cage simulation).
     */
    static skinned(): SoftMeshBinding;
    /**
     * Enables collisions of this mesh with itself.
     */
    setSelfContacts(enabled: boolean): SoftMeshBinding;
    /** @internal */
    rawMode(): RawSoftMeshBindingMode;
}
/**
 * Spring coefficients of an elastic constraint: a natural frequency (Hz) and a damping ratio.
 */
export interface SpringCoefficients {
    naturalFrequency: number;
    dampingRatio: number;
}
/**
 * The material of a soft body: the softness of its constraints, its elasticity, plasticity
 * and tearing thresholds.
 *
 * A material is a plain JavaScript object; pass it to `SoftBodyDesc.setMaterial` or
 * `SoftBody.setMaterial` to apply it.
 */
export declare class SoftBodyMaterial {
    /**
     * Softness of the structural edges.
     */
    edgeSoftness: SpringCoefficients;
    /**
     * Softness of the bending constraints (bend edges and dihedrals).
     */
    bendSoftness: SpringCoefficients;
    /**
     * Softness of the area/volume preservation constraints.
     */
    volumeSoftness: SpringCoefficients;
    /**
     * Softness of the shape-matching constraints.
     */
    shapeMatchingSoftness: SpringCoefficients;
    /**
     * Young's modulus of the elastic cells (Corotational and NeoHookean cell models).
     */
    youngModulus: number;
    /**
     * Poisson's ratio of the elastic cells.
     */
    poissonRatio: number;
    /**
     * Damping ratio of the elastic cells.
     */
    elasticDampingRatio: number;
    /**
     * Strain beyond which the rest shape of an elastic cell flows (`0` disables plasticity).
     */
    plasticYield: number;
    /**
     * Rate (per second) at which an elastic cell's rest shape follows its deformation past the
     * yield.
     */
    plasticCreep: number;
    /**
     * Largest accumulated plastic deformation of an elastic cell.
     */
    plasticMax: number;
    /**
     * Damping of the deformation velocity of the elastic cells.
     */
    deformationDamping: number;
    /**
     * Strain beyond which the rest length of an edge flows (`0` disables edge plasticity).
     */
    edgePlasticYield: number;
    /**
     * Rate (per second) at which an edge's rest length follows its stretch past the yield.
     */
    edgePlasticCreep: number;
    /**
     * Largest relative change of an edge's rest length.
     */
    edgePlasticMax: number;
    /**
     * Which strains make the edge rest lengths flow.
     */
    edgePlasticFlow: SoftEdgePlasticFlow;
    /**
     * Strain beyond which an element tears, or `null` for no strain-based tearing.
     */
    tearStrain: number | null;
    /**
     * Force beyond which an element tears, or `null` for no force-based tearing.
     */
    tearForce: number | null;
    /**
     * Time constant (seconds) of the smoothing applied to the load before comparing it to
     * `tearForce`.
     */
    tearSmoothing: number;
    /**
     * Multiplier of the tear thresholds for the interior elements (relative to the surface).
     */
    interiorStrength: number;
    /**
     * Largest number of elements torn per step.
     */
    maxTearsPerStep: number;
    /**
     * Smallest piece (in elements) a tear may split off, or `null` for the default.
     */
    minPiece: number | null;
    constructor();
    /**
     * A material whose edge, bend, volume and shape-matching softness all take the same value.
     */
    static uniform(naturalFrequency: number, dampingRatio: number): SoftBodyMaterial;
    /** @internal */
    static fromRaw(raw: RawSoftBodyMaterial): SoftBodyMaterial;
    /** @internal */
    private static copyFromRaw;
    /** @internal */
    intoRaw(): RawSoftBodyMaterial;
}
/**
 * A soft body: particles linked by elastic constraints (edges, bending constraints and
 * cells), simulated together with the rigid bodies, contacts and joints of the world.
 *
 * A soft body lives in a `SoftBodySet` and is referenced by its integer `handle`. Its hidden
 * root rigid body (`rootBody()`) stands for the whole body in joints and islands; its clusters
 * add more rigid-body proxies that joints and colliders can attach to.
 */
export declare class SoftBody {
    private rawSet;
    private bodies;
    private colliders;
    readonly handle: SoftBodyHandle;
    /**
     * An arbitrary user-defined object associated with this soft body.
     */
    userData?: unknown;
    constructor(rawSet: RawSoftBodySet, bodies: RigidBodySet, colliders: ColliderSet, handle: SoftBodyHandle);
    /** @internal */
    finalizeDeserialization(bodies: RigidBodySet, colliders: ColliderSet): void;
    /**
     * Checks if this soft body is still valid (i.e. that it has not been deleted from the
     * soft-body set yet).
     */
    isValid(): boolean;
    /**
     * A counter incremented by every change of the body's topology (tears, cuts, splits).
     */
    topologyVersion(): number;
    /**
     * The number of particles of this soft body.
     */
    numParticles(): number;
    /**
     * The world-space position of the `i`-th particle.
     */
    particlePosition(i: number, target?: Vector): Vector;
    /**
     * The world-space positions of every particle, flattened (two or three floats per
     * particle).
     */
    particlePositions(): Float32Array;
    /**
     * The velocity of the `i`-th particle.
     */
    particleVelocity(i: number, target?: Vector): Vector;
    /**
     * The velocities of every particle, flattened (two or three floats per particle).
     */
    particleVelocities(): Float32Array;
    /**
     * The rest position of the `i`-th particle (the position its constraints hold it at).
     */
    particleRestPosition(i: number, target?: Vector): Vector;
    /**
     * The mass of the `i`-th particle.
     */
    particleMass(i: number): number;
    /**
     * Is the `i`-th particle pinned (held in place)?
     */
    isParticlePinned(i: number): boolean;
    /**
     * Does the `i`-th particle lie on the body's surface?
     */
    isParticleOnSurface(i: number): boolean;
    /**
     * Has an element of the `i`-th particle torn?
     */
    isParticleDamaged(i: number): boolean;
    /**
     * Sets the world-space position of the `i`-th particle.
     */
    setParticlePosition(i: number, position: Vector): void;
    /**
     * Sets the velocity of the `i`-th particle.
     */
    setParticleVelocity(i: number, velocity: Vector): void;
    /**
     * Moves the pinned `i`-th particle to `position` over the next step, like a
     * position-based kinematic body (it pushes what it meets), then holds it there.
     * Ignored for a free particle.
     */
    setParticleKinematicTarget(i: number, position: Vector): void;
    /**
     * Pins (or releases) the `i`-th particle.
     */
    setParticlePinned(i: number, pinned: boolean): void;
    /**
     * Attaches the `i`-th particle to a rigid body, at the particle's current position.
     */
    attachParticle(i: number, body: RigidBody): void;
    /**
     * Detaches the `i`-th particle from the rigid body it was attached to.
     *
     * Returns `false` if the particle was not attached.
     */
    detachParticle(i: number): boolean;
    /**
     * The number of particles attached to rigid bodies.
     */
    numAttachments(): number;
    /**
     * The particle of the `i`-th attachment.
     */
    attachmentParticle(i: number): number;
    /**
     * The rigid body of the `i`-th attachment.
     */
    attachmentBody(i: number): RigidBody;
    /**
     * The number of edges (structural and bending) of this soft body.
     */
    numEdges(): number;
    /**
     * The particle pairs of every edge, flattened (two indices per edge).
     */
    edges(): Uint32Array;
    /**
     * The rest length of the `i`-th edge.
     */
    edgeRestLength(i: number): number;
    /**
     * Is the `i`-th edge a bending edge (rather than a structural one)?
     */
    isEdgeBend(i: number): boolean;
    /**
     * The impulse applied by the `i`-th edge during the last step.
     */
    edgeImpulse(i: number): number;
    /**
     * The load of the `i`-th edge relative to its tear threshold (`1` tears it).
     */
    edgeStress(i: number): number;
    /**
     * The relative change of the `i`-th edge's rest length due to plastic flow.
     */
    edgePlasticStrain(i: number): number;
    /**
     * The multiplier of the tear thresholds of the `i`-th edge.
     */
    edgeTearResistance(i: number): number;
    /**
     * The number of cells (triangles in 2D, tetrahedra in 3D) of this soft body.
     */
    numCells(): number;
    /**
     * The particles of every cell, flattened (three indices per cell in 2D, four in 3D).
     */
    cells(): Uint32Array;
    /**
     * The rest area/volume of the `i`-th cell.
     */
    cellRestVolume(i: number): number;
    /**
     * The load of the `i`-th cell relative to its tear threshold (`1` tears it).
     */
    cellStress(i: number): number;
    /**
     * The stiffness multiplier of the `i`-th cell.
     */
    cellStiffnessScale(i: number): number;
    /**
     * The multiplier of the tear thresholds of the `i`-th cell.
     */
    cellTearResistance(i: number): number;
    /**
     * The number of dihedral bending constraints of this soft body.
     */
    numDihedrals(): number;
    /**
     * The particles of every dihedral, flattened (four indices per dihedral: the shared edge,
     * then the two opposite vertices).
     */
    dihedrals(): Uint32Array;
    /**
     * The rest angle of the `i`-th dihedral.
     */
    dihedralRestAngle(i: number): number;
    /**
     * The boundary elements of this soft body (segments in 2D, triangles in 3D), flattened
     * (two or three particle indices per element), oriented outward.
     */
    boundary(): Uint32Array;
    /**
     * A copy of this soft body's material.
     */
    material(): SoftBodyMaterial;
    /**
     * Replaces this soft body's material.
     */
    setMaterial(material: SoftBodyMaterial): void;
    /**
     * The constitutive model of this soft body's cells.
     */
    cellModel(): SoftBodyCellModel;
    /**
     * The solver holding the cells of this soft body together.
     */
    solver(): SoftBodySolver;
    /**
     * Sets the solver holding the cells of this soft body together.
     */
    setSolver(solver: SoftBodySolver): void;
    /**
     * Is the global area/volume preservation of this soft body enabled?
     */
    volumePreservationEnabled(): boolean;
    /**
     * Enables or disables the global area/volume preservation of this soft body.
     */
    enableVolumePreservation(enabled: boolean): void;
    /**
     * The rest area/volume enclosed by this soft body's closed surfaces.
     */
    restVolume(): number;
    /**
     * The current area/volume enclosed by this soft body's closed surfaces.
     */
    volume(): number;
    /**
     * The target volume multiplier of the volume preservation (`> 1` inflates the body).
     */
    volumeFactor(): number;
    /**
     * Sets the target volume multiplier of the volume preservation (`> 1` inflates the body).
     */
    setVolumeFactor(factor: number): void;
    /**
     * The thickness of this soft body's particles.
     */
    particleRadius(): number;
    /**
     * Forgets every plastic deformation: the rest shapes return to their initial values.
     */
    resetPlasticity(): void;
    /**
     * The hidden rigid body standing for this soft body in joints and islands.
     */
    rootBody(): RigidBody;
    /**
     * The soft body this one was split off from by a tear, if any.
     */
    origin(): SoftBodyHandle | null;
    /**
     * The handles of the soft bodies that tears split off from this one.
     */
    pieces(): SoftBodyHandle[];
    /**
     * The center of mass of this soft body's particles.
     */
    centerOfMass(target?: Vector): Vector;
    /**
     * The total mass of this soft body's particles.
     */
    mass(): number;
    /**
     * Is this soft body sleeping?
     */
    isSleeping(): boolean;
    /**
     * Wakes this soft body up.
     */
    wakeUp(): void;
    /**
     * Is this soft body enabled (simulated)?
     */
    isEnabled(): boolean;
    /**
     * Enables or disables this soft body.
     */
    setEnabled(enabled: boolean): void;
    /**
     * Sets the extra internal PGS iterations run per substep for this soft body and
     * everything it touches.
     */
    setAdditionalPgsIterations(iterations: number): void;
    /**
     * The linear damping of this soft body's particles.
     */
    linearDamping(): number;
    /**
     * The gravity scale of this soft body's particles.
     */
    gravityScale(): number;
    /**
     * Adds a force to every particle of this soft body (spread by mass).
     */
    addForce(force: Vector, wakeUp: boolean): void;
    /**
     * Adds a force to the `i`-th particle of this soft body.
     */
    addParticleForce(i: number, force: Vector, wakeUp: boolean): void;
    /**
     * Resets the user forces applied to this soft body's particles.
     */
    resetForces(wakeUp: boolean): void;
    /**
     * Applies an impulse to every particle of this soft body (spread by mass).
     */
    applyImpulse(impulse: Vector, wakeUp: boolean): void;
    /**
     * Applies an impulse to the `i`-th particle of this soft body.
     */
    applyParticleImpulse(i: number, impulse: Vector, wakeUp: boolean): void;
    /**
     * Applies an impulse to the particles within `falloffRadius` of `point`, scaled down
     * linearly with their distance to it (`falloffRadius <= 0` applies it to every particle).
     */
    applyImpulseAtPoint(impulse: Vector, point: Vector, falloffRadius: number, wakeUp: boolean): void;
    /**
     * Applies an impulse of the given magnitude pushing the particles away from `center`
     * (a blast), scaled down linearly up to `falloffRadius`.
     */
    applyRadialImpulse(center: Vector, magnitude: number, falloffRadius: number, wakeUp: boolean): void;
    /**
     * Requests the `i`-th edge to tear at the end of the next step.
     */
    tearEdge(i: number): void;
    /**
     * Requests the `i`-th cell to tear at the end of the next step.
     */
    tearCell(i: number): void;
    /**
     * Are there tears requested for the next step?
     */
    hasPendingTears(): boolean;
    /**
     * The number of cluster slots of this soft body (some may have been removed: see
     * `isClusterLive`).
     */
    numClusters(): number;
    /**
     * Does the `i`-th cluster still exist?
     */
    isClusterLive(i: number): boolean;
    /**
     * The rigid body standing for the `i`-th cluster: joints and colliders attach to it.
     */
    clusterProxy(i: number): RigidBody | null;
    /**
     * The particles of the `i`-th cluster.
     */
    clusterParticles(i: number): Uint32Array;
    /**
     * Does the `i`-th cluster hold its shape by shape matching?
     */
    clusterShapeMatchingEnabled(i: number): boolean;
    /**
     * Enables or disables shape matching on the `i`-th cluster.
     */
    enableClusterShapeMatching(i: number, enabled: boolean): void;
    /**
     * Scales the stiffness of the elements of the `i`-th cluster.
     */
    setClusterStiffnessScale(i: number, scale: number): void;
    /**
     * Overrides the softness of the edges of the `i`-th cluster (`null` restores the
     * material's).
     */
    setClusterEdgeSoftness(i: number, softness: SpringCoefficients | null): void;
    /**
     * Scales the tear thresholds of the elements of the `i`-th cluster.
     */
    setClusterTearResistance(i: number, resistance: number): void;
    /**
     * Pins (or releases) every particle of the `i`-th cluster.
     */
    setClusterPinned(i: number, pinned: boolean): void;
    /**
     * Moves the `i`-th cluster rigidly to the given pose over the next step.
     */
    setClusterKinematicTarget(i: number, translation: Vector, rotation: Rotation): void;
    /**
     * The number of collision meshes held by this soft body's clusters (its own deformable
     * surface included).
     */
    numMeshes(): number;
    /**
     * The cluster holding the `i`-th collision mesh.
     */
    meshCluster(i: number): number | null;
    /**
     * The collider holding the `i`-th collision mesh.
     */
    meshCollider(i: number): Collider | null;
    /**
     * Is the `i`-th collision mesh skinned (embedded in the cells) rather than bound
     * vertex-to-particle?
     */
    isMeshSkinned(i: number): boolean;
    /**
     * Does the `i`-th collision mesh collide?
     */
    meshCollisionEnabled(i: number): boolean;
    /**
     * Does the shape of the `i`-th collision mesh carry the `ORIENTED` flag (see
     * `SoftBodyDesc.setOriented`)?
     */
    isMeshOriented(i: number): boolean;
    /**
     * The world-space vertex positions of the `i`-th collision mesh, flattened.
     */
    meshVertices(i: number): Float32Array;
    /**
     * The elements of the `i`-th collision mesh, flattened (two vertex indices per segment in
     * 2D, three per triangle in 3D).
     */
    meshIndices(i: number): Uint32Array;
    /**
     * The index of the collision mesh held by a deformable collider of this soft body.
     */
    meshOfCollider(collider: Collider): number | null;
}
/**
 * The description of a soft body to create.
 *
 * Start from one of the generators (`SoftBodyDesc.rope`, `cloth`, `cuboid`, `sphere`,
 * `trimesh`, `volumetric` in 3D; `rope`, `polygon`, `disk`, `grid`, `polyline`, `volumetric`
 * in 2D) or from raw particle positions, then tune it with the chainable setters. The
 * description holds no WASM memory: it is applied when the soft body is created.
 */
export declare class SoftBodyDesc {
    private generator;
    private setters;
    /**
     * The material of the soft body, or `null` to keep the default one (with `softness`
     * applied on top when set).
     */
    material: SoftBodyMaterial | null;
    /**
     * A uniform softness applied to every constraint of the material, or `null`.
     */
    softness: SpringCoefficients | null;
    /**
     * The uniform mass of the particles (ignored when `masses` is set).
     */
    particleMass: number;
    /**
     * The total mass of the body, spread over its particles, or `null` to use `particleMass`.
     */
    mass: number | null;
    /**
     * Per-particle masses, or `null` for uniform masses.
     */
    masses: Float32Array | null;
    /**
     * The indices of the pinned particles.
     */
    pinnedParticles: Uint32Array;
    /**
     * The constitutive model of the cells.
     */
    cellModel: SoftBodyCellModel;
    /**
     * The solver holding the cells together.
     */
    solver: SoftBodySolver;
    /**
     * Whether the area/volume enclosed by the body's closed surfaces is preserved (`null`:
     * what the generator chose, off for raw positions).
     */
    volumePreservation: boolean | null;
    /**
     * The target volume multiplier of the volume preservation (`> 1` inflates the body).
     */
    volumeFactor: number;
    /**
     * Whether shape matching holds the body's shape (`null`: what the generator chose, off for
     * raw positions).
     */
    shapeMatching: boolean | null;
    /**
     * Whether the body's surface collides with itself.
     */
    selfContacts: boolean;
    /**
     * Whether the shape of the body's collision surface is built with the `ORIENTED` flag
     * (`null`: whenever the surface is closed).
     */
    oriented: boolean | null;
    /**
     * The thickness of the particles (`null`: what the generator chose).
     */
    particleRadius: number | null;
    /**
     * The template of the body's colliders (their shape is replaced by the body's deformable
     * surface), or `null` for a body without collisions.
     */
    surfaceCollider: ColliderDesc | null;
    /**
     * Whether the body collides through its skin rather than through its cells' boundary.
     */
    skinCollision: boolean;
    /**
     * A translation applied to every particle.
     */
    translation: Vector | null;
    /**
     * Linear damping of the particles.
     */
    linearDamping: number;
    /**
     * Gravity scale of the particles.
     */
    gravityScale: number;
    /**
     * Extra solver substeps requested for the body and everything it touches.
     */
    additionalSolverIterations: number;
    /**
     * Extra internal PGS iterations per substep for the body and everything it touches.
     */
    additionalPgsIterations: number;
    /**
     * Whether the body may fall asleep.
     */
    canSleep: boolean;
    /**
     * The dominance group of the body.
     */
    dominanceGroup: number;
    /**
     * An arbitrary user-defined object associated with the soft body.
     */
    userData?: unknown;
    /**
     * A description over raw world-space particle positions (flattened), with no element:
     * add edges, cells and a surface with the setters.
     */
    constructor(positions?: Float32Array | number[]);
    private static withGenerator;
    /**
     * A rope of `numParticles` particles from `start` to `end`.
     */
    static rope(start: Vector, end: Vector, numParticles: number): SoftBodyDesc;
    /**
     * A body filling the closed surface (segments in 2D, triangles in 3D) with cells of the
     * given size; `skinned` keeps the surface as a skin embedded in the cells. Returns
     * `null` if the surface cannot be meshed.
     *
     * @param vertices - The flattened world-space vertices of the surface.
     * @param indices - The flattened elements of the surface.
     */
    static volumetric(vertices: Float32Array, indices: Uint32Array, cellSize: number, skinned?: boolean): SoftBodyDesc | null;
    /**
     * A triangle-mesh body without cells: the vertices are particles, the triangles the
     * surface, held by dihedral bending and shape matching. Returns `null` if the mesh is
     * empty.
     */
    static trimesh(vertices: Float32Array, indices: Uint32Array): SoftBodyDesc | null;
    /**
     * A cloth of `nu` by `nv` particles: particle `(i, j)` is at `origin + i * du + j * dv`.
     */
    static cloth(origin: Vector, du: Vector, dv: Vector, nu: number, nv: number): SoftBodyDesc;
    /**
     * A tube of cloth around `axis`, from `radiusStart` at `origin` to `radiusEnd` at its
     * other end, with `numAround` particles per ring and `numAlong` rings.
     */
    static clothTube(origin: Vector, axis: Vector, radiusStart: number, radiusEnd: number, numAround: number, numAlong: number): SoftBodyDesc;
    /**
     * A cloth with different softness along `du` (warp), along `dv` (weft) and across the
     * diagonals (shear).
     */
    static clothAnisotropic(origin: Vector, du: Vector, dv: Vector, nu: number, nv: number, warp: SpringCoefficients, weft: SpringCoefficients, shear: SpringCoefficients): SoftBodyDesc;
    /**
     * A box of `nx` by `ny` by `nz` particles filled with tetrahedral cells.
     */
    static cuboid(center: Vector, halfExtents: Vector, nx: number, ny: number, nz: number): SoftBodyDesc;
    /**
     * A hollow sphere: an icosphere surface with `subdivisions` refinement levels, holding
     * its volume (a balloon).
     */
    static sphere(center: Vector, radius: number, subdivisions: number): SoftBodyDesc;
    /**
     * Sets the material of the soft body.
     */
    setMaterial(material: SoftBodyMaterial): SoftBodyDesc;
    /**
     * Sets a uniform softness for every constraint of the material.
     */
    setSoftness(naturalFrequency: number, dampingRatio: number): SoftBodyDesc;
    /**
     * Sets the uniform mass of the particles.
     */
    setParticleMass(mass: number): SoftBodyDesc;
    /**
     * Sets the total mass of the body, spread over its particles.
     */
    setMass(mass: number): SoftBodyDesc;
    /**
     * Sets per-particle masses.
     */
    setMasses(masses: Float32Array | number[]): SoftBodyDesc;
    /**
     * Pins the given particles in place.
     */
    setPinnedParticles(pinned: Uint32Array | number[]): SoftBodyDesc;
    /**
     * Replaces the structural edges (flattened particle pairs).
     */
    setEdges(edges: Uint32Array | number[]): SoftBodyDesc;
    /**
     * Adds structural edges (flattened particle pairs).
     */
    addEdges(edges: Uint32Array | number[]): SoftBodyDesc;
    /**
     * Replaces the bending edges (flattened particle pairs).
     */
    setBendEdges(edges: Uint32Array | number[]): SoftBodyDesc;
    /**
     * Makes every edge resist stretching only (a rope or a net that folds freely).
     */
    setTensionOnly(): SoftBodyDesc;
    /**
     * Replaces the dihedral bending constraints (flattened quadruplets: the shared edge, then
     * the two opposite vertices).
     */
    setDihedrals(dihedrals: Uint32Array | number[]): SoftBodyDesc;
    /**
     * Sets the segments a body without surface collides through (a wire).
     */
    setWire(segments: Uint32Array | number[]): SoftBodyDesc;
    /**
     * Replaces the cells (flattened triangles in 2D, tetrahedra in 3D).
     */
    setCells(cells: Uint32Array | number[]): SoftBodyDesc;
    /**
     * Replaces the boundary elements (flattened segments in 2D, triangles in 3D), oriented
     * outward.
     */
    setSurface(surface: Uint32Array | number[]): SoftBodyDesc;
    /**
     * Sets a skin: a finer mesh (flattened world-space vertices and elements) embedded in the
     * cells, which follows them.
     */
    setSkin(vertices: Float32Array | number[], indices: Uint32Array | number[]): SoftBodyDesc;
    /**
     * Makes the body collide through its skin rather than through its cells' boundary.
     */
    setSkinCollision(enabled: boolean): SoftBodyDesc;
    /**
     * Overrides the softness of the given edges.
     */
    setEdgeSoftness(edges: Uint32Array | number[], softness: SpringCoefficients[]): SoftBodyDesc;
    /**
     * Multiplies the tear thresholds of the given edges.
     */
    setEdgeTearResistance(edges: Uint32Array | number[], resistances: Float32Array | number[]): SoftBodyDesc;
    /**
     * Sets the constitutive model of the cells.
     */
    setCellModel(model: SoftBodyCellModel): SoftBodyDesc;
    /**
     * Sets the solver holding the cells together (`SoftBodySolver.Fem` needs cells).
     */
    setSolver(solver: SoftBodySolver): SoftBodyDesc;
    /**
     * Enables the preservation of the area/volume enclosed by the body's closed surfaces.
     */
    setVolumePreservation(enabled: boolean): SoftBodyDesc;
    /**
     * Sets the target volume multiplier (`> 1` inflates the body); this also enables the
     * volume preservation.
     */
    setVolumeFactor(factor: number): SoftBodyDesc;
    /**
     * Holds the body's shape by shape matching.
     */
    setShapeMatching(enabled: boolean): SoftBodyDesc;
    /**
     * Makes the body's surface collide with itself.
     */
    setSelfContacts(enabled: boolean): SoftBodyDesc;
    /**
     * Sets whether the shape of the body's collision surface is built with the `ORIENTED`
     * flag, like a polyline or mesh. Left unset, it is whenever the surface is closed, which
     * is what a solid body wants: an oriented closed surface encloses matter, so nothing is
     * held inside it. Set it to `false` for a shell, whose inner side holds the bodies inside
     * it.
     */
    setOriented(oriented: boolean): SoftBodyDesc;
    /**
     * Sets the thickness of the particles.
     */
    setParticleRadius(radius: number): SoftBodyDesc;
    /**
     * Sets the template of the body's colliders: its friction, restitution, groups, events
     * and other settings are kept, its shape is replaced by the body's deformable surface.
     */
    setSurfaceCollider(collider: ColliderDesc): SoftBodyDesc;
    /**
     * Removes the body's colliders: it will not collide with anything.
     */
    setNoSurfaceCollider(): SoftBodyDesc;
    /**
     * Translates every particle.
     */
    setTranslation(translation: Vector): SoftBodyDesc;
    /**
     * Sets the linear damping of the particles.
     */
    setLinearDamping(damping: number): SoftBodyDesc;
    /**
     * Sets the gravity scale of the particles.
     */
    setGravityScale(scale: number): SoftBodyDesc;
    /**
     * Sets the extra solver substeps requested for the body and everything it touches.
     */
    setAdditionalSolverIterations(iterations: number): SoftBodyDesc;
    /**
     * Sets the extra internal PGS iterations per substep for the body and everything it
     * touches (default: `3`).
     */
    setAdditionalPgsIterations(iterations: number): SoftBodyDesc;
    /**
     * Sets whether the body may fall asleep.
     */
    setCanSleep(canSleep: boolean): SoftBodyDesc;
    /**
     * Sets the dominance group of the body.
     */
    setDominanceGroup(group: number): SoftBodyDesc;
    /**
     * Sets the user data associated with the soft body.
     */
    setUserData(data: unknown): SoftBodyDesc;
    /**
     * Appends the particles and elements of another description to this one.
     */
    append(other: SoftBodyDesc): SoftBodyDesc;
    /**
     * Builds the WASM-side builder this description stands for. The result must be freed.
     * @internal
     */
    intoRaw(): RawSoftBodyBuilder;
    /**
     * The number of particles the description currently generates.
     */
    numParticles(): number;
    /**
     * The flattened world-space positions of the particles the description generates.
     */
    particlePositions(): Float32Array;
}
/**
 * The record of a soft body tearing: the elements it lost, the particles the tear split,
 * the pieces the tear separated into soft bodies of their own, and the clusters and joints
 * that moved with them.
 *
 * Events drained from an `EventQueue` are only valid inside the draining closure; events
 * returned by `World.tearSoftBody` and `World.cutSoftBody` must be freed with `.free()`.
 */
export declare class SoftBodyTearEvent {
    raw: RawSoftBodyTearEvent;
    constructor(raw?: RawSoftBodyTearEvent);
    free(): void;
    /**
     * The soft body that tore.
     */
    softBody(): SoftBodyHandle;
    /**
     * The particle pairs of the edges that tore, flattened.
     */
    tornEdges(): Uint32Array;
    /**
     * The particles of the cells that tore, flattened.
     */
    tornCells(): Uint32Array;
    /**
     * The particle pairs of the edges the tear removed, flattened.
     */
    removedEdges(): Uint32Array;
    /**
     * The particles the tear split, flattened as `(original, copy)` pairs.
     */
    splitParticles(): Uint32Array;
    /**
     * The particles the tear inserted.
     */
    insertedParticles(): Uint32Array;
    /**
     * The particle pairs (flattened) the tear started from.
     */
    seeds(): Uint32Array;
    /**
     * The number of pieces the tear split off into soft bodies of their own.
     */
    numPieces(): number;
    /**
     * The soft body the `i`-th piece became.
     */
    pieceSoftBody(i: number): SoftBodyHandle;
    /**
     * The particles (indices in the torn body) that went into the `i`-th piece.
     */
    pieceParticles(i: number): Uint32Array;
    /**
     * The clusters that moved into the `i`-th piece, flattened as `(source, destination)`
     * index pairs.
     */
    pieceClusters(i: number): Uint32Array;
    /**
     * The number of clusters the tear split.
     */
    numClusterSplits(): number;
    /**
     * The cluster of the torn body the `i`-th split came from.
     */
    clusterSplitSource(i: number): number;
    /**
     * The soft body holding the cluster the `i`-th split created.
     */
    clusterSplitSoftBody(i: number): SoftBodyHandle;
    /**
     * The index of the cluster the `i`-th split created.
     */
    clusterSplitCluster(i: number): number;
    /**
     * The proxy rigid body of the cluster the `i`-th split created.
     */
    clusterSplitProxy(i: number): RigidBodyHandle;
    /**
     * Does the cluster the `i`-th split created keep the source cluster's proxy?
     */
    clusterSplitKeepsProxy(i: number): boolean;
    /**
     * The number of impulse joints the tear moved to another proxy.
     */
    numMovedJoints(): number;
    /**
     * The `i`-th moved impulse joint.
     */
    movedJoint(i: number): number;
    /**
     * The proxy the `i`-th moved joint was attached to before the tear.
     */
    movedJointFrom(i: number): RigidBodyHandle;
    /**
     * The proxy the `i`-th moved joint is attached to after the tear.
     */
    movedJointTo(i: number): RigidBodyHandle;
    /**
     * Where a particle of the torn body is after the tear: its soft body and index there, or
     * `null` if the particle was removed.
     */
    particleDestination(particle: number): {
        softBody: SoftBodyHandle;
        particle: number;
    } | null;
}
