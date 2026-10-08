/* @ts-self-types="./rapier_wasm3d.d.ts" */

export class RawBroadPhase {
    static __wrap(ptr) {
        const obj = Object.create(RawBroadPhase.prototype);
        obj.__wbg_ptr = ptr;
        RawBroadPhaseFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawBroadPhaseFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawbroadphase_free(ptr, 0);
    }
    /**
     * @param {RawNarrowPhase} narrow_phase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawVector} rayOrig
     * @param {RawVector} rayDir
     * @param {number} maxToi
     * @param {boolean} solid
     * @param {number} filter_flags
     * @param {number | null | undefined} filter_groups
     * @param {number | null | undefined} filter_exclude_collider
     * @param {number | null | undefined} filter_exclude_rigid_body
     * @param {Function} filter_predicate
     * @returns {RawRayColliderIntersection | undefined}
     */
    castRayAndGetNormal(narrow_phase, bodies, colliders, rayOrig, rayDir, maxToi, solid, filter_flags, filter_groups, filter_exclude_collider, filter_exclude_rigid_body, filter_predicate) {
        try {
            _assertClass(narrow_phase, RawNarrowPhase);
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(colliders, RawColliderSet);
            _assertClass(rayOrig, RawVector);
            _assertClass(rayDir, RawVector);
            const ret = wasm.rawbroadphase_castRayAndGetNormal(this.__wbg_ptr, narrow_phase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, rayOrig.__wbg_ptr, rayDir.__wbg_ptr, maxToi, solid, filter_flags, isLikeNone(filter_groups) ? Number.MAX_SAFE_INTEGER : (filter_groups) >>> 0, !isLikeNone(filter_exclude_collider), isLikeNone(filter_exclude_collider) ? 0 : filter_exclude_collider, !isLikeNone(filter_exclude_rigid_body), isLikeNone(filter_exclude_rigid_body) ? 0 : filter_exclude_rigid_body, addBorrowedObject(filter_predicate));
            return ret === 0 ? undefined : RawRayColliderIntersection.__wrap(ret);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {RawNarrowPhase} narrow_phase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawVector} rayOrig
     * @param {RawVector} rayDir
     * @param {number} maxToi
     * @param {boolean} solid
     * @param {number} filter_flags
     * @param {number | null | undefined} filter_groups
     * @param {number | null | undefined} filter_exclude_collider
     * @param {number | null | undefined} filter_exclude_rigid_body
     * @param {Function} filter_predicate
     * @returns {RawRayColliderHit | undefined}
     */
    castRay(narrow_phase, bodies, colliders, rayOrig, rayDir, maxToi, solid, filter_flags, filter_groups, filter_exclude_collider, filter_exclude_rigid_body, filter_predicate) {
        try {
            _assertClass(narrow_phase, RawNarrowPhase);
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(colliders, RawColliderSet);
            _assertClass(rayOrig, RawVector);
            _assertClass(rayDir, RawVector);
            const ret = wasm.rawbroadphase_castRay(this.__wbg_ptr, narrow_phase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, rayOrig.__wbg_ptr, rayDir.__wbg_ptr, maxToi, solid, filter_flags, isLikeNone(filter_groups) ? Number.MAX_SAFE_INTEGER : (filter_groups) >>> 0, !isLikeNone(filter_exclude_collider), isLikeNone(filter_exclude_collider) ? 0 : filter_exclude_collider, !isLikeNone(filter_exclude_rigid_body), isLikeNone(filter_exclude_rigid_body) ? 0 : filter_exclude_rigid_body, addBorrowedObject(filter_predicate));
            return ret === 0 ? undefined : RawRayColliderHit.__wrap(ret);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {RawNarrowPhase} narrow_phase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawVector} shapePos
     * @param {RawRotation} shapeRot
     * @param {RawVector} shapeVel
     * @param {RawShape} shape
     * @param {number} target_distance
     * @param {number} maxToi
     * @param {boolean} stop_at_penetration
     * @param {number} filter_flags
     * @param {number | null | undefined} filter_groups
     * @param {number | null | undefined} filter_exclude_collider
     * @param {number | null | undefined} filter_exclude_rigid_body
     * @param {Function} filter_predicate
     * @returns {RawColliderShapeCastHit | undefined}
     */
    castShape(narrow_phase, bodies, colliders, shapePos, shapeRot, shapeVel, shape, target_distance, maxToi, stop_at_penetration, filter_flags, filter_groups, filter_exclude_collider, filter_exclude_rigid_body, filter_predicate) {
        try {
            _assertClass(narrow_phase, RawNarrowPhase);
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(colliders, RawColliderSet);
            _assertClass(shapePos, RawVector);
            _assertClass(shapeRot, RawRotation);
            _assertClass(shapeVel, RawVector);
            _assertClass(shape, RawShape);
            const ret = wasm.rawbroadphase_castShape(this.__wbg_ptr, narrow_phase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, shapePos.__wbg_ptr, shapeRot.__wbg_ptr, shapeVel.__wbg_ptr, shape.__wbg_ptr, target_distance, maxToi, stop_at_penetration, filter_flags, isLikeNone(filter_groups) ? Number.MAX_SAFE_INTEGER : (filter_groups) >>> 0, !isLikeNone(filter_exclude_collider), isLikeNone(filter_exclude_collider) ? 0 : filter_exclude_collider, !isLikeNone(filter_exclude_rigid_body), isLikeNone(filter_exclude_rigid_body) ? 0 : filter_exclude_rigid_body, addBorrowedObject(filter_predicate));
            return ret === 0 ? undefined : RawColliderShapeCastHit.__wrap(ret);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {RawNarrowPhase} narrow_phase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawVector} aabbCenter
     * @param {RawVector} aabbHalfExtents
     * @param {Function} callback
     */
    collidersWithAabbIntersectingAabb(narrow_phase, bodies, colliders, aabbCenter, aabbHalfExtents, callback) {
        try {
            _assertClass(narrow_phase, RawNarrowPhase);
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(colliders, RawColliderSet);
            _assertClass(aabbCenter, RawVector);
            _assertClass(aabbHalfExtents, RawVector);
            wasm.rawbroadphase_collidersWithAabbIntersectingAabb(this.__wbg_ptr, narrow_phase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, aabbCenter.__wbg_ptr, aabbHalfExtents.__wbg_ptr, addBorrowedObject(callback));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {RawNarrowPhase} narrow_phase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawVector} shapePos
     * @param {RawRotation} shapeRot
     * @param {RawShape} shape
     * @param {number} filter_flags
     * @param {number | null | undefined} filter_groups
     * @param {number | null | undefined} filter_exclude_collider
     * @param {number | null | undefined} filter_exclude_rigid_body
     * @param {Function} filter_predicate
     * @returns {number | undefined}
     */
    intersectionWithShape(narrow_phase, bodies, colliders, shapePos, shapeRot, shape, filter_flags, filter_groups, filter_exclude_collider, filter_exclude_rigid_body, filter_predicate) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(narrow_phase, RawNarrowPhase);
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(colliders, RawColliderSet);
            _assertClass(shapePos, RawVector);
            _assertClass(shapeRot, RawRotation);
            _assertClass(shape, RawShape);
            wasm.rawbroadphase_intersectionWithShape(retptr, this.__wbg_ptr, narrow_phase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, shapePos.__wbg_ptr, shapeRot.__wbg_ptr, shape.__wbg_ptr, filter_flags, isLikeNone(filter_groups) ? Number.MAX_SAFE_INTEGER : (filter_groups) >>> 0, !isLikeNone(filter_exclude_collider), isLikeNone(filter_exclude_collider) ? 0 : filter_exclude_collider, !isLikeNone(filter_exclude_rigid_body), isLikeNone(filter_exclude_rigid_body) ? 0 : filter_exclude_rigid_body, addBorrowedObject(filter_predicate));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getFloat64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {RawNarrowPhase} narrow_phase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawVector} point
     * @param {Function} callback
     * @param {number} filter_flags
     * @param {number | null | undefined} filter_groups
     * @param {number | null | undefined} filter_exclude_collider
     * @param {number | null | undefined} filter_exclude_rigid_body
     * @param {Function} filter_predicate
     */
    intersectionsWithPoint(narrow_phase, bodies, colliders, point, callback, filter_flags, filter_groups, filter_exclude_collider, filter_exclude_rigid_body, filter_predicate) {
        try {
            _assertClass(narrow_phase, RawNarrowPhase);
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(colliders, RawColliderSet);
            _assertClass(point, RawVector);
            wasm.rawbroadphase_intersectionsWithPoint(this.__wbg_ptr, narrow_phase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, point.__wbg_ptr, addBorrowedObject(callback), filter_flags, isLikeNone(filter_groups) ? Number.MAX_SAFE_INTEGER : (filter_groups) >>> 0, !isLikeNone(filter_exclude_collider), isLikeNone(filter_exclude_collider) ? 0 : filter_exclude_collider, !isLikeNone(filter_exclude_rigid_body), isLikeNone(filter_exclude_rigid_body) ? 0 : filter_exclude_rigid_body, addBorrowedObject(filter_predicate));
        } finally {
            heap[stack_pointer++] = undefined;
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {RawNarrowPhase} narrow_phase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawVector} rayOrig
     * @param {RawVector} rayDir
     * @param {number} maxToi
     * @param {boolean} solid
     * @param {Function} callback
     * @param {number} filter_flags
     * @param {number | null | undefined} filter_groups
     * @param {number | null | undefined} filter_exclude_collider
     * @param {number | null | undefined} filter_exclude_rigid_body
     * @param {Function} filter_predicate
     */
    intersectionsWithRay(narrow_phase, bodies, colliders, rayOrig, rayDir, maxToi, solid, callback, filter_flags, filter_groups, filter_exclude_collider, filter_exclude_rigid_body, filter_predicate) {
        try {
            _assertClass(narrow_phase, RawNarrowPhase);
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(colliders, RawColliderSet);
            _assertClass(rayOrig, RawVector);
            _assertClass(rayDir, RawVector);
            wasm.rawbroadphase_intersectionsWithRay(this.__wbg_ptr, narrow_phase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, rayOrig.__wbg_ptr, rayDir.__wbg_ptr, maxToi, solid, addBorrowedObject(callback), filter_flags, isLikeNone(filter_groups) ? Number.MAX_SAFE_INTEGER : (filter_groups) >>> 0, !isLikeNone(filter_exclude_collider), isLikeNone(filter_exclude_collider) ? 0 : filter_exclude_collider, !isLikeNone(filter_exclude_rigid_body), isLikeNone(filter_exclude_rigid_body) ? 0 : filter_exclude_rigid_body, addBorrowedObject(filter_predicate));
        } finally {
            heap[stack_pointer++] = undefined;
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {RawNarrowPhase} narrow_phase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawVector} shapePos
     * @param {RawRotation} shapeRot
     * @param {RawShape} shape
     * @param {Function} callback
     * @param {number} filter_flags
     * @param {number | null | undefined} filter_groups
     * @param {number | null | undefined} filter_exclude_collider
     * @param {number | null | undefined} filter_exclude_rigid_body
     * @param {Function} filter_predicate
     */
    intersectionsWithShape(narrow_phase, bodies, colliders, shapePos, shapeRot, shape, callback, filter_flags, filter_groups, filter_exclude_collider, filter_exclude_rigid_body, filter_predicate) {
        try {
            _assertClass(narrow_phase, RawNarrowPhase);
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(colliders, RawColliderSet);
            _assertClass(shapePos, RawVector);
            _assertClass(shapeRot, RawRotation);
            _assertClass(shape, RawShape);
            wasm.rawbroadphase_intersectionsWithShape(this.__wbg_ptr, narrow_phase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, shapePos.__wbg_ptr, shapeRot.__wbg_ptr, shape.__wbg_ptr, addBorrowedObject(callback), filter_flags, isLikeNone(filter_groups) ? Number.MAX_SAFE_INTEGER : (filter_groups) >>> 0, !isLikeNone(filter_exclude_collider), isLikeNone(filter_exclude_collider) ? 0 : filter_exclude_collider, !isLikeNone(filter_exclude_rigid_body), isLikeNone(filter_exclude_rigid_body) ? 0 : filter_exclude_rigid_body, addBorrowedObject(filter_predicate));
        } finally {
            heap[stack_pointer++] = undefined;
            heap[stack_pointer++] = undefined;
        }
    }
    constructor() {
        const ret = wasm.rawbroadphase_new();
        this.__wbg_ptr = ret;
        RawBroadPhaseFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {RawNarrowPhase} narrow_phase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawVector} point
     * @param {number} filter_flags
     * @param {number | null | undefined} filter_groups
     * @param {number | null | undefined} filter_exclude_collider
     * @param {number | null | undefined} filter_exclude_rigid_body
     * @param {Function} filter_predicate
     * @returns {RawPointColliderProjection | undefined}
     */
    projectPointAndGetFeature(narrow_phase, bodies, colliders, point, filter_flags, filter_groups, filter_exclude_collider, filter_exclude_rigid_body, filter_predicate) {
        try {
            _assertClass(narrow_phase, RawNarrowPhase);
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(colliders, RawColliderSet);
            _assertClass(point, RawVector);
            const ret = wasm.rawbroadphase_projectPointAndGetFeature(this.__wbg_ptr, narrow_phase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, point.__wbg_ptr, filter_flags, isLikeNone(filter_groups) ? Number.MAX_SAFE_INTEGER : (filter_groups) >>> 0, !isLikeNone(filter_exclude_collider), isLikeNone(filter_exclude_collider) ? 0 : filter_exclude_collider, !isLikeNone(filter_exclude_rigid_body), isLikeNone(filter_exclude_rigid_body) ? 0 : filter_exclude_rigid_body, addBorrowedObject(filter_predicate));
            return ret === 0 ? undefined : RawPointColliderProjection.__wrap(ret);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {RawNarrowPhase} narrow_phase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawVector} point
     * @param {boolean} solid
     * @param {number} filter_flags
     * @param {number | null | undefined} filter_groups
     * @param {number | null | undefined} filter_exclude_collider
     * @param {number | null | undefined} filter_exclude_rigid_body
     * @param {Function} filter_predicate
     * @returns {RawPointColliderProjection | undefined}
     */
    projectPoint(narrow_phase, bodies, colliders, point, solid, filter_flags, filter_groups, filter_exclude_collider, filter_exclude_rigid_body, filter_predicate) {
        try {
            _assertClass(narrow_phase, RawNarrowPhase);
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(colliders, RawColliderSet);
            _assertClass(point, RawVector);
            const ret = wasm.rawbroadphase_projectPoint(this.__wbg_ptr, narrow_phase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, point.__wbg_ptr, solid, filter_flags, isLikeNone(filter_groups) ? Number.MAX_SAFE_INTEGER : (filter_groups) >>> 0, !isLikeNone(filter_exclude_collider), isLikeNone(filter_exclude_collider) ? 0 : filter_exclude_collider, !isLikeNone(filter_exclude_rigid_body), isLikeNone(filter_exclude_rigid_body) ? 0 : filter_exclude_rigid_body, addBorrowedObject(filter_predicate));
            return ret === 0 ? undefined : RawPointColliderProjection.__wrap(ret);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
if (Symbol.dispose) RawBroadPhase.prototype[Symbol.dispose] = RawBroadPhase.prototype.free;

export class RawCCDSolver {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawCCDSolverFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawccdsolver_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.rawccdsolver_new();
        this.__wbg_ptr = ret;
        RawCCDSolverFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) RawCCDSolver.prototype[Symbol.dispose] = RawCCDSolver.prototype.free;

export class RawCharacterCollision {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawCharacterCollisionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawcharactercollision_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    handle() {
        const ret = wasm.rawcharactercollision_handle(this.__wbg_ptr);
        return ret;
    }
    constructor() {
        const ret = wasm.rawcharactercollision_new();
        this.__wbg_ptr = ret;
        RawCharacterCollisionFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    toi() {
        const ret = wasm.rawcharactercollision_toi(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {Float32Array} scratch_buffer
     */
    translationDeltaApplied(scratch_buffer) {
        try {
            wasm.rawcharactercollision_translationDeltaApplied(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {Float32Array} scratch_buffer
     */
    translationDeltaRemaining(scratch_buffer) {
        try {
            wasm.rawcharactercollision_translationDeltaRemaining(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {Float32Array} scratch_buffer
     */
    worldNormal1(scratch_buffer) {
        try {
            wasm.rawcharactercollision_worldNormal1(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {Float32Array} scratch_buffer
     */
    worldNormal2(scratch_buffer) {
        try {
            wasm.rawcharactercollision_worldNormal2(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {Float32Array} scratch_buffer
     */
    worldWitness1(scratch_buffer) {
        try {
            wasm.rawcharactercollision_worldWitness1(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {Float32Array} scratch_buffer
     */
    worldWitness2(scratch_buffer) {
        try {
            wasm.rawcharactercollision_worldWitness2(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
if (Symbol.dispose) RawCharacterCollision.prototype[Symbol.dispose] = RawCharacterCollision.prototype.free;

export class RawColliderSet {
    static __wrap(ptr) {
        const obj = Object.create(RawColliderSet.prototype);
        obj.__wbg_ptr = ptr;
        RawColliderSetFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawColliderSetFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawcolliderset_free(ptr, 0);
    }
    /**
     * The collision types enabled for this collider.
     * @param {number} handle
     * @returns {number}
     */
    coActiveCollisionTypes(handle) {
        const ret = wasm.rawcolliderset_coActiveCollisionTypes(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * The events enabled for this collider.
     * @param {number} handle
     * @returns {number}
     */
    coActiveEvents(handle) {
        const ret = wasm.rawcolliderset_coActiveEvents(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * The physics hooks enabled for this collider.
     * @param {number} handle
     * @returns {number}
     */
    coActiveHooks(handle) {
        const ret = wasm.rawcolliderset_coActiveHooks(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * @param {number} handle
     * @param {RawVector} collider1Vel
     * @param {number} collider2handle
     * @param {RawVector} collider2Vel
     * @param {number} target_distance
     * @param {number} max_toi
     * @param {boolean} stop_at_penetration
     * @returns {RawColliderShapeCastHit | undefined}
     */
    coCastCollider(handle, collider1Vel, collider2handle, collider2Vel, target_distance, max_toi, stop_at_penetration) {
        _assertClass(collider1Vel, RawVector);
        _assertClass(collider2Vel, RawVector);
        const ret = wasm.rawcolliderset_coCastCollider(this.__wbg_ptr, handle, collider1Vel.__wbg_ptr, collider2handle, collider2Vel.__wbg_ptr, target_distance, max_toi, stop_at_penetration);
        return ret === 0 ? undefined : RawColliderShapeCastHit.__wrap(ret);
    }
    /**
     * @param {number} handle
     * @param {RawVector} rayOrig
     * @param {RawVector} rayDir
     * @param {number} maxToi
     * @param {boolean} solid
     * @returns {RawRayIntersection | undefined}
     */
    coCastRayAndGetNormal(handle, rayOrig, rayDir, maxToi, solid) {
        _assertClass(rayOrig, RawVector);
        _assertClass(rayDir, RawVector);
        const ret = wasm.rawcolliderset_coCastRayAndGetNormal(this.__wbg_ptr, handle, rayOrig.__wbg_ptr, rayDir.__wbg_ptr, maxToi, solid);
        return ret === 0 ? undefined : RawRayIntersection.__wrap(ret);
    }
    /**
     * @param {number} handle
     * @param {RawVector} rayOrig
     * @param {RawVector} rayDir
     * @param {number} maxToi
     * @param {boolean} solid
     * @returns {number}
     */
    coCastRay(handle, rayOrig, rayDir, maxToi, solid) {
        _assertClass(rayOrig, RawVector);
        _assertClass(rayDir, RawVector);
        const ret = wasm.rawcolliderset_coCastRay(this.__wbg_ptr, handle, rayOrig.__wbg_ptr, rayDir.__wbg_ptr, maxToi, solid);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {RawVector} colliderVel
     * @param {RawShape} shape2
     * @param {RawVector} shape2Pos
     * @param {RawRotation} shape2Rot
     * @param {RawVector} shape2Vel
     * @param {number} target_distance
     * @param {number} maxToi
     * @param {boolean} stop_at_penetration
     * @returns {RawShapeCastHit | undefined}
     */
    coCastShape(handle, colliderVel, shape2, shape2Pos, shape2Rot, shape2Vel, target_distance, maxToi, stop_at_penetration) {
        _assertClass(colliderVel, RawVector);
        _assertClass(shape2, RawShape);
        _assertClass(shape2Pos, RawVector);
        _assertClass(shape2Rot, RawRotation);
        _assertClass(shape2Vel, RawVector);
        const ret = wasm.rawcolliderset_coCastShape(this.__wbg_ptr, handle, colliderVel.__wbg_ptr, shape2.__wbg_ptr, shape2Pos.__wbg_ptr, shape2Rot.__wbg_ptr, shape2Vel.__wbg_ptr, target_distance, maxToi, stop_at_penetration);
        return ret === 0 ? undefined : RawShapeCastHit.__wrap(ret);
    }
    /**
     * The collision groups of this collider.
     * @param {number} handle
     * @returns {number}
     */
    coCollisionGroups(handle) {
        const ret = wasm.rawcolliderset_coCollisionGroups(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * @param {number} handle1
     * @param {number} handle2
     * @param {number} shift_x
     * @param {number} shift_y
     * @param {number} shift_z
     */
    coCombineVoxelStates(handle1, handle2, shift_x, shift_y, shift_z) {
        wasm.rawcolliderset_coCombineVoxelStates(this.__wbg_ptr, handle1, handle2, shift_x, shift_y, shift_z);
    }
    /**
     * @param {number} handle
     * @returns {number | undefined}
     */
    coCompoundFlags(handle) {
        const ret = wasm.rawcolliderset_coCompoundFlags(this.__wbg_ptr, handle);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} handle
     * @param {number} collider2handle
     * @param {number} prediction
     * @returns {RawShapeContact | undefined}
     */
    coContactCollider(handle, collider2handle, prediction) {
        const ret = wasm.rawcolliderset_coContactCollider(this.__wbg_ptr, handle, collider2handle, prediction);
        return ret === 0 ? undefined : RawShapeContact.__wrap(ret);
    }
    /**
     * The total force magnitude beyond which a contact force event can be emitted.
     * @param {number} handle
     * @returns {number}
     */
    coContactForceEventThreshold(handle) {
        const ret = wasm.rawcolliderset_coContactForceEventThreshold(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {RawShape} shape2
     * @param {RawVector} shapePos2
     * @param {RawRotation} shapeRot2
     * @param {number} prediction
     * @returns {RawShapeContact | undefined}
     */
    coContactShape(handle, shape2, shapePos2, shapeRot2, prediction) {
        _assertClass(shape2, RawShape);
        _assertClass(shapePos2, RawVector);
        _assertClass(shapeRot2, RawRotation);
        const ret = wasm.rawcolliderset_coContactShape(this.__wbg_ptr, handle, shape2.__wbg_ptr, shapePos2.__wbg_ptr, shapeRot2.__wbg_ptr, prediction);
        return ret === 0 ? undefined : RawShapeContact.__wrap(ret);
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    coContactSkin(handle) {
        const ret = wasm.rawcolliderset_coContactSkin(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {RawVector} point
     * @returns {boolean}
     */
    coContainsPoint(handle, point) {
        _assertClass(point, RawVector);
        const ret = wasm.rawcolliderset_coContainsPoint(this.__wbg_ptr, handle, point.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * The density of this collider.
     * @param {number} handle
     * @returns {number}
     */
    coDensity(handle) {
        const ret = wasm.rawcolliderset_coDensity(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    coFrictionCombineRule(handle) {
        const ret = wasm.rawcolliderset_coFrictionCombineRule(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * The friction coefficient of this collider.
     * @param {number} handle
     * @returns {number}
     */
    coFriction(handle) {
        const ret = wasm.rawcolliderset_coFriction(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * The half-extents of this collider if it has a cuboid shape.
     *
     * Returns `false` if it doesn’t have a cuboid shape.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     * @returns {boolean}
     */
    coHalfExtents(handle, scratch_buffer) {
        try {
            const ret = wasm.rawcolliderset_coHalfExtents(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The half height of this collider if it is a capsule, cylinder, or cone shape.
     * @param {number} handle
     * @returns {number | undefined}
     */
    coHalfHeight(handle) {
        const ret = wasm.rawcolliderset_coHalfHeight(this.__wbg_ptr, handle);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * The outward normal of this collider if it has a half-space shape.
     *
     * Returns `false` if it doesn’t have a half-space shape.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     * @returns {boolean}
     */
    coHalfspaceNormal(handle, scratch_buffer) {
        try {
            const ret = wasm.rawcolliderset_coHalfspaceNormal(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} handle
     * @returns {number | undefined}
     */
    coHeightFieldFlags(handle) {
        const ret = wasm.rawcolliderset_coHeightFieldFlags(this.__wbg_ptr, handle);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * The height of this heightfield if it is one.
     * @param {number} handle
     * @returns {Float32Array | undefined}
     */
    coHeightfieldHeights(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coHeightfieldHeights(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getArrayF32FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export2(r0, r1 * 4, 4);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * The number of columns on this heightfield's height matrix, if it is one.
     * @param {number} handle
     * @returns {number | undefined}
     */
    coHeightfieldNCols(handle) {
        const ret = wasm.rawcolliderset_coHeightfieldNCols(this.__wbg_ptr, handle);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * The number of rows on this heightfield's height matrix, if it is one.
     * @param {number} handle
     * @returns {number | undefined}
     */
    coHeightfieldNRows(handle) {
        const ret = wasm.rawcolliderset_coHeightfieldNRows(this.__wbg_ptr, handle);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * The scaling factor applied to this heightfield if it is one.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     * @returns {boolean}
     */
    coHeightfieldScale(handle, scratch_buffer) {
        try {
            const ret = wasm.rawcolliderset_coHeightfieldScale(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The indices of this triangle mesh, polyline, or convex polyhedron, if it is one.
     *
     * For convex polyhedra, the indices refer to the convex hull recomputed with
     * `try_convex_hull` (matching `coVertices`), not to the original input mesh.
     * @param {number} handle
     * @returns {Uint32Array | undefined}
     */
    coIndices(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coIndices(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getArrayU32FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export2(r0, r1 * 4, 4);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @param {RawVector} rayOrig
     * @param {RawVector} rayDir
     * @param {number} maxToi
     * @returns {boolean}
     */
    coIntersectsRay(handle, rayOrig, rayDir, maxToi) {
        _assertClass(rayOrig, RawVector);
        _assertClass(rayDir, RawVector);
        const ret = wasm.rawcolliderset_coIntersectsRay(this.__wbg_ptr, handle, rayOrig.__wbg_ptr, rayDir.__wbg_ptr, maxToi);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @param {RawShape} shape2
     * @param {RawVector} shapePos2
     * @param {RawRotation} shapeRot2
     * @returns {boolean}
     */
    coIntersectsShape(handle, shape2, shapePos2, shapeRot2) {
        _assertClass(shape2, RawShape);
        _assertClass(shapePos2, RawVector);
        _assertClass(shapeRot2, RawRotation);
        const ret = wasm.rawcolliderset_coIntersectsShape(this.__wbg_ptr, handle, shape2.__wbg_ptr, shapePos2.__wbg_ptr, shapeRot2.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Does this collider hold a soft body's deformable collision mesh?
     * @param {number} handle
     * @returns {boolean}
     */
    coIsDeformable(handle) {
        const ret = wasm.rawcolliderset_coIsDeformable(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @returns {boolean}
     */
    coIsEnabled(handle) {
        const ret = wasm.rawcolliderset_coIsEnabled(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * Is this collider a sensor?
     * @param {number} handle
     * @returns {boolean}
     */
    coIsSensor(handle) {
        const ret = wasm.rawcolliderset_coIsSensor(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * The mass of this collider.
     * @param {number} handle
     * @returns {number}
     */
    coMass(handle) {
        const ret = wasm.rawcolliderset_coMass(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * The unique integer identifier of the collider this collider is attached to.
     * @param {number} handle
     * @returns {number | undefined}
     */
    coParent(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coParent(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getFloat64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @returns {number | undefined}
     */
    coPolylineFlags(handle) {
        const ret = wasm.rawcolliderset_coPolylineFlags(this.__wbg_ptr, handle);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} handle
     * @param {RawVector} point
     * @param {boolean} solid
     * @returns {RawPointProjection}
     */
    coProjectPoint(handle, point, solid) {
        _assertClass(point, RawVector);
        const ret = wasm.rawcolliderset_coProjectPoint(this.__wbg_ptr, handle, point.__wbg_ptr, solid);
        return RawPointProjection.__wrap(ret);
    }
    /**
     * @param {number} handle1
     * @param {number} handle2
     * @param {number} ix
     * @param {number} iy
     * @param {number} iz
     * @param {number} shift_x
     * @param {number} shift_y
     * @param {number} shift_z
     */
    coPropagateVoxelChange(handle1, handle2, ix, iy, iz, shift_x, shift_y, shift_z) {
        wasm.rawcolliderset_coPropagateVoxelChange(this.__wbg_ptr, handle1, handle2, ix, iy, iz, shift_x, shift_y, shift_z);
    }
    /**
     * The radius of this collider if it is a ball, capsule, cylinder, or cone shape.
     * @param {number} handle
     * @returns {number | undefined}
     */
    coRadius(handle) {
        const ret = wasm.rawcolliderset_coRadius(this.__wbg_ptr, handle);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    coRestitutionCombineRule(handle) {
        const ret = wasm.rawcolliderset_coRestitutionCombineRule(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * The restitution coefficient of this collider.
     * @param {number} handle
     * @returns {number}
     */
    coRestitution(handle) {
        const ret = wasm.rawcolliderset_coRestitution(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * The orientation of this collider relative to its parent rigid-body.
     *
     * Returns `false` if it doesn’t have a parent.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     * @returns {boolean}
     */
    coRotationWrtParent(handle, scratch_buffer) {
        try {
            const ret = wasm.rawcolliderset_coRotationWrtParent(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The world-space orientation of this collider.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    coRotation(handle, scratch_buffer) {
        try {
            wasm.rawcolliderset_coRotation(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The radius of the round edges of this collider.
     * @param {number} handle
     * @returns {number | undefined}
     */
    coRoundRadius(handle) {
        const ret = wasm.rawcolliderset_coRoundRadius(this.__wbg_ptr, handle);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} handle
     * @param {number} types
     */
    coSetActiveCollisionTypes(handle, types) {
        wasm.rawcolliderset_coSetActiveCollisionTypes(this.__wbg_ptr, handle, types);
    }
    /**
     * @param {number} handle
     * @param {number} events
     */
    coSetActiveEvents(handle, events) {
        wasm.rawcolliderset_coSetActiveEvents(this.__wbg_ptr, handle, events);
    }
    /**
     * @param {number} handle
     * @param {number} hooks
     */
    coSetActiveHooks(handle, hooks) {
        wasm.rawcolliderset_coSetActiveHooks(this.__wbg_ptr, handle, hooks);
    }
    /**
     * @param {number} handle
     * @param {number} groups
     */
    coSetCollisionGroups(handle, groups) {
        wasm.rawcolliderset_coSetCollisionGroups(this.__wbg_ptr, handle, groups);
    }
    /**
     * @param {number} handle
     * @param {number} threshold
     */
    coSetContactForceEventThreshold(handle, threshold) {
        wasm.rawcolliderset_coSetContactForceEventThreshold(this.__wbg_ptr, handle, threshold);
    }
    /**
     * @param {number} handle
     * @param {number} contact_skin
     */
    coSetContactSkin(handle, contact_skin) {
        wasm.rawcolliderset_coSetContactSkin(this.__wbg_ptr, handle, contact_skin);
    }
    /**
     * @param {number} handle
     * @param {number} density
     */
    coSetDensity(handle, density) {
        wasm.rawcolliderset_coSetDensity(this.__wbg_ptr, handle, density);
    }
    /**
     * @param {number} handle
     * @param {boolean} enabled
     */
    coSetEnabled(handle, enabled) {
        wasm.rawcolliderset_coSetEnabled(this.__wbg_ptr, handle, enabled);
    }
    /**
     * @param {number} handle
     * @param {number} rule
     */
    coSetFrictionCombineRule(handle, rule) {
        wasm.rawcolliderset_coSetFrictionCombineRule(this.__wbg_ptr, handle, rule);
    }
    /**
     * @param {number} handle
     * @param {number} friction
     */
    coSetFriction(handle, friction) {
        wasm.rawcolliderset_coSetFriction(this.__wbg_ptr, handle, friction);
    }
    /**
     * Set the half-extents of this collider if it has a cuboid shape.
     * @param {number} handle
     * @param {RawVector} newHalfExtents
     */
    coSetHalfExtents(handle, newHalfExtents) {
        _assertClass(newHalfExtents, RawVector);
        wasm.rawcolliderset_coSetHalfExtents(this.__wbg_ptr, handle, newHalfExtents.__wbg_ptr);
    }
    /**
     * Set the half height of this collider if it is a capsule, cylinder, or cone shape.
     * @param {number} handle
     * @param {number} newHalfheight
     */
    coSetHalfHeight(handle, newHalfheight) {
        wasm.rawcolliderset_coSetHalfHeight(this.__wbg_ptr, handle, newHalfheight);
    }
    /**
     * @param {number} handle
     * @param {number} mass
     * @param {RawVector} centerOfMass
     * @param {RawVector} principalAngularInertia
     * @param {RawRotation} angularInertiaFrame
     */
    coSetMassProperties(handle, mass, centerOfMass, principalAngularInertia, angularInertiaFrame) {
        _assertClass(centerOfMass, RawVector);
        _assertClass(principalAngularInertia, RawVector);
        _assertClass(angularInertiaFrame, RawRotation);
        wasm.rawcolliderset_coSetMassProperties(this.__wbg_ptr, handle, mass, centerOfMass.__wbg_ptr, principalAngularInertia.__wbg_ptr, angularInertiaFrame.__wbg_ptr);
    }
    /**
     * @param {number} handle
     * @param {number} mass
     */
    coSetMass(handle, mass) {
        wasm.rawcolliderset_coSetMass(this.__wbg_ptr, handle, mass);
    }
    /**
     * Set the radius of this collider if it is a ball, capsule, cylinder, or cone shape.
     * @param {number} handle
     * @param {number} newRadius
     */
    coSetRadius(handle, newRadius) {
        wasm.rawcolliderset_coSetRadius(this.__wbg_ptr, handle, newRadius);
    }
    /**
     * @param {number} handle
     * @param {number} rule
     */
    coSetRestitutionCombineRule(handle, rule) {
        wasm.rawcolliderset_coSetRestitutionCombineRule(this.__wbg_ptr, handle, rule);
    }
    /**
     * @param {number} handle
     * @param {number} restitution
     */
    coSetRestitution(handle, restitution) {
        wasm.rawcolliderset_coSetRestitution(this.__wbg_ptr, handle, restitution);
    }
    /**
     * @param {number} handle
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} w
     */
    coSetRotationWrtParent(handle, x, y, z, w) {
        wasm.rawcolliderset_coSetRotationWrtParent(this.__wbg_ptr, handle, x, y, z, w);
    }
    /**
     * Sets the rotation quaternion of this collider.
     *
     * This does nothing if a zero quaternion is provided.
     *
     * # Parameters
     * - `x`: the first vector component of the quaternion.
     * - `y`: the second vector component of the quaternion.
     * - `z`: the third vector component of the quaternion.
     * - `w`: the scalar component of the quaternion.
     * - `wakeUp`: forces the collider to wake-up so it is properly affected by forces if it
     * wasn't moving before modifying its position.
     * @param {number} handle
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} w
     */
    coSetRotation(handle, x, y, z, w) {
        wasm.rawcolliderset_coSetRotation(this.__wbg_ptr, handle, x, y, z, w);
    }
    /**
     * Set the radius of the round edges of this collider.
     * @param {number} handle
     * @param {number} newBorderRadius
     */
    coSetRoundRadius(handle, newBorderRadius) {
        wasm.rawcolliderset_coSetRoundRadius(this.__wbg_ptr, handle, newBorderRadius);
    }
    /**
     * @param {number} handle
     * @param {boolean} is_sensor
     */
    coSetSensor(handle, is_sensor) {
        wasm.rawcolliderset_coSetSensor(this.__wbg_ptr, handle, is_sensor);
    }
    /**
     * @param {number} handle
     * @param {RawShape} shape
     */
    coSetShape(handle, shape) {
        _assertClass(shape, RawShape);
        wasm.rawcolliderset_coSetShape(this.__wbg_ptr, handle, shape.__wbg_ptr);
    }
    /**
     * @param {number} handle
     * @param {number} groups
     */
    coSetSolverGroups(handle, groups) {
        wasm.rawcolliderset_coSetSolverGroups(this.__wbg_ptr, handle, groups);
    }
    /**
     * @param {number} handle
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    coSetTranslationWrtParent(handle, x, y, z) {
        wasm.rawcolliderset_coSetTranslationWrtParent(this.__wbg_ptr, handle, x, y, z);
    }
    /**
     * Sets the translation of this collider.
     *
     * # Parameters
     * - `x`: the world-space position of the collider along the `x` axis.
     * - `y`: the world-space position of the collider along the `y` axis.
     * - `z`: the world-space position of the collider along the `z` axis.
     * - `wakeUp`: forces the collider to wake-up so it is properly affected by forces if it
     * wasn't moving before modifying its position.
     * @param {number} handle
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    coSetTranslation(handle, x, y, z) {
        wasm.rawcolliderset_coSetTranslation(this.__wbg_ptr, handle, x, y, z);
    }
    /**
     * @param {number} handle
     * @param {number} ix
     * @param {number} iy
     * @param {number} iz
     * @param {boolean} filled
     */
    coSetVoxel(handle, ix, iy, iz, filled) {
        wasm.rawcolliderset_coSetVoxel(this.__wbg_ptr, handle, ix, iy, iz, filled);
    }
    /**
     * The type of the shape of this collider.
     * @param {number} handle
     * @returns {RawShapeType}
     */
    coShapeType(handle) {
        const ret = wasm.rawcolliderset_coShapeType(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {RawShape}
     */
    coShape(handle) {
        const ret = wasm.rawcolliderset_coShape(this.__wbg_ptr, handle);
        return RawShape.__wrap(ret);
    }
    /**
     * The soft body whose deformable collision mesh this collider holds, if any.
     * @param {number} handle
     * @returns {number | undefined}
     */
    coSoftBody(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coSoftBody(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getFloat64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * The solver groups of this collider.
     * @param {number} handle
     * @returns {number}
     */
    coSolverGroups(handle) {
        const ret = wasm.rawcolliderset_coSolverGroups(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * The translation of this collider relative to its parent rigid-body.
     *
     * Returns `false` if it doesn’t have a parent.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     * @returns {boolean}
     */
    coTranslationWrtParent(handle, scratch_buffer) {
        try {
            const ret = wasm.rawcolliderset_coTranslationWrtParent(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The world-space translation of this collider.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    coTranslation(handle, scratch_buffer) {
        try {
            wasm.rawcolliderset_coTranslation(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} handle
     * @returns {number | undefined}
     */
    coTriMeshFlags(handle) {
        const ret = wasm.rawcolliderset_coTriMeshFlags(this.__wbg_ptr, handle);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * The vertices of this triangle mesh, polyline, convex polyhedron, segment, triangle or convex polyhedron, if it is one.
     *
     * For convex polyhedra, this returns the vertices of a convex hull recomputed with
     * `try_convex_hull`, so they may differ in count and order from the points the shape
     * was built from. This guarantees the result can be used to reconstruct the shape.
     * @param {number} handle
     * @returns {Float32Array | undefined}
     */
    coVertices(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coVertices(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getArrayF32FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export2(r0, r1 * 4, 4);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * The volume of this collider.
     * @param {number} handle
     * @returns {number}
     */
    coVolume(handle) {
        const ret = wasm.rawcolliderset_coVolume(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {Int32Array | undefined}
     */
    coVoxelData(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawcolliderset_coVoxelData(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getArrayI32FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export2(r0, r1 * 4, 4);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @returns {RawVector | undefined}
     */
    coVoxelSize(handle) {
        const ret = wasm.rawcolliderset_coVoxelSize(this.__wbg_ptr, handle);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
     * @param {number} handle
     * @returns {boolean}
     */
    contains(handle) {
        const ret = wasm.rawcolliderset_contains(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * @param {boolean} enabled
     * @param {RawShape} shape
     * @param {RawVector} translation
     * @param {RawRotation} rotation
     * @param {number} massPropsMode
     * @param {number} mass
     * @param {RawVector} centerOfMass
     * @param {RawVector} principalAngularInertia
     * @param {RawRotation} angularInertiaFrame
     * @param {number} density
     * @param {number} friction
     * @param {number} restitution
     * @param {number} frictionCombineRule
     * @param {number} restitutionCombineRule
     * @param {boolean} isSensor
     * @param {number} collisionGroups
     * @param {number} solverGroups
     * @param {number} activeCollisionTypes
     * @param {number} activeHooks
     * @param {number} activeEvents
     * @param {number} contactForceEventThreshold
     * @param {number} contactSkin
     * @param {boolean} hasParent
     * @param {number} parent
     * @param {RawRigidBodySet} bodies
     * @returns {number | undefined}
     */
    createCollider(enabled, shape, translation, rotation, massPropsMode, mass, centerOfMass, principalAngularInertia, angularInertiaFrame, density, friction, restitution, frictionCombineRule, restitutionCombineRule, isSensor, collisionGroups, solverGroups, activeCollisionTypes, activeHooks, activeEvents, contactForceEventThreshold, contactSkin, hasParent, parent, bodies) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(shape, RawShape);
            _assertClass(translation, RawVector);
            _assertClass(rotation, RawRotation);
            _assertClass(centerOfMass, RawVector);
            _assertClass(principalAngularInertia, RawVector);
            _assertClass(angularInertiaFrame, RawRotation);
            _assertClass(bodies, RawRigidBodySet);
            wasm.rawcolliderset_createCollider(retptr, this.__wbg_ptr, enabled, shape.__wbg_ptr, translation.__wbg_ptr, rotation.__wbg_ptr, massPropsMode, mass, centerOfMass.__wbg_ptr, principalAngularInertia.__wbg_ptr, angularInertiaFrame.__wbg_ptr, density, friction, restitution, frictionCombineRule, restitutionCombineRule, isSensor, collisionGroups, solverGroups, activeCollisionTypes, activeHooks, activeEvents, contactForceEventThreshold, contactSkin, hasParent, parent, bodies.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getFloat64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {boolean} enabled
     * @param {RawShape} shape
     * @param {RawVector} translation
     * @param {RawRotation} rotation
     * @param {number} massPropsMode
     * @param {number} mass
     * @param {RawVector} centerOfMass
     * @param {RawVector} principalAngularInertia
     * @param {RawRotation} angularInertiaFrame
     * @param {number} density
     * @param {number} friction
     * @param {number} restitution
     * @param {number} frictionCombineRule
     * @param {number} restitutionCombineRule
     * @param {boolean} isSensor
     * @param {number} collisionGroups
     * @param {number} solverGroups
     * @param {number} activeCollisionTypes
     * @param {number} activeHooks
     * @param {number} activeEvents
     * @param {number} contactForceEventThreshold
     * @param {number} contactSkin
     * @param {RawSoftMeshBindingMode} bindingMode
     * @param {Uint32Array} bindingParticles
     * @param {number} bindingEps
     * @param {boolean} bindingSelfContacts
     * @param {number} parent
     * @param {RawRigidBodySet} bodies
     * @param {RawSoftBodySet} softBodies
     * @returns {number | undefined}
     */
    createDeformableCollider(enabled, shape, translation, rotation, massPropsMode, mass, centerOfMass, principalAngularInertia, angularInertiaFrame, density, friction, restitution, frictionCombineRule, restitutionCombineRule, isSensor, collisionGroups, solverGroups, activeCollisionTypes, activeHooks, activeEvents, contactForceEventThreshold, contactSkin, bindingMode, bindingParticles, bindingEps, bindingSelfContacts, parent, bodies, softBodies) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(shape, RawShape);
            _assertClass(translation, RawVector);
            _assertClass(rotation, RawRotation);
            _assertClass(centerOfMass, RawVector);
            _assertClass(principalAngularInertia, RawVector);
            _assertClass(angularInertiaFrame, RawRotation);
            const ptr0 = passArray32ToWasm0(bindingParticles, wasm.__wbindgen_export3);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(softBodies, RawSoftBodySet);
            wasm.rawcolliderset_createDeformableCollider(retptr, this.__wbg_ptr, enabled, shape.__wbg_ptr, translation.__wbg_ptr, rotation.__wbg_ptr, massPropsMode, mass, centerOfMass.__wbg_ptr, principalAngularInertia.__wbg_ptr, angularInertiaFrame.__wbg_ptr, density, friction, restitution, frictionCombineRule, restitutionCombineRule, isSensor, collisionGroups, solverGroups, activeCollisionTypes, activeHooks, activeEvents, contactForceEventThreshold, contactSkin, bindingMode, ptr0, len0, bindingEps, bindingSelfContacts, parent, bodies.__wbg_ptr, softBodies.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getFloat64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Applies the given JavaScript function to the integer handle of each collider managed by this collider set.
     *
     * # Parameters
     * - `f(handle)`: the function to apply to the integer handle of each collider managed by this collider set. Called as `f(handle)`.
     * @param {Function} f
     */
    forEachColliderHandle(f) {
        try {
            wasm.rawcolliderset_forEachColliderHandle(this.__wbg_ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * Checks if a collider with the given integer handle exists.
     * @param {number} handle
     * @returns {boolean}
     */
    isHandleValid(handle) {
        const ret = wasm.rawcolliderset_isHandleValid(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    len() {
        const ret = wasm.rawcolliderset_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    constructor() {
        const ret = wasm.rawcolliderset_new();
        this.__wbg_ptr = ret;
        RawColliderSetFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Removes a collider from this set and wake-up the rigid-body it is attached to.
     * @param {number} handle
     * @param {RawIslandManager} islands
     * @param {RawRigidBodySet} bodies
     * @param {RawSoftBodySet} softBodies
     * @param {boolean} wakeUp
     */
    remove(handle, islands, bodies, softBodies, wakeUp) {
        _assertClass(islands, RawIslandManager);
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(softBodies, RawSoftBodySet);
        wasm.rawcolliderset_remove(this.__wbg_ptr, handle, islands.__wbg_ptr, bodies.__wbg_ptr, softBodies.__wbg_ptr, wakeUp);
    }
}
if (Symbol.dispose) RawColliderSet.prototype[Symbol.dispose] = RawColliderSet.prototype.free;

export class RawColliderShapeCastHit {
    static __wrap(ptr) {
        const obj = Object.create(RawColliderShapeCastHit.prototype);
        obj.__wbg_ptr = ptr;
        RawColliderShapeCastHitFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawColliderShapeCastHitFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawcollidershapecasthit_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    colliderHandle() {
        const ret = wasm.rawcollidershapecasthit_colliderHandle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {Float32Array} scratch_buffer
     */
    getComponents(scratch_buffer) {
        try {
            wasm.rawcollidershapecasthit_getComponents(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
if (Symbol.dispose) RawColliderShapeCastHit.prototype[Symbol.dispose] = RawColliderShapeCastHit.prototype.free;

export class RawContactForceEvent {
    static __wrap(ptr) {
        const obj = Object.create(RawContactForceEvent.prototype);
        obj.__wbg_ptr = ptr;
        RawContactForceEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawContactForceEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawcontactforceevent_free(ptr, 0);
    }
    /**
     * The first collider involved in the contact.
     * @returns {number}
     */
    collider1() {
        const ret = wasm.rawcontactforceevent_collider1(this.__wbg_ptr);
        return ret;
    }
    /**
     * The second collider involved in the contact.
     * @returns {number}
     */
    collider2() {
        const ret = wasm.rawcontactforceevent_collider2(this.__wbg_ptr);
        return ret;
    }
    /**
     * The world-space (unit) direction of the force with strongest magnitude.
     * @param {Float32Array} scratch_buffer
     */
    max_force_direction(scratch_buffer) {
        try {
            wasm.rawcontactforceevent_max_force_direction(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The magnitude of the largest force at a contact point of this contact pair.
     * @returns {number}
     */
    max_force_magnitude() {
        const ret = wasm.rawcontactforceevent_max_force_magnitude(this.__wbg_ptr);
        return ret;
    }
    /**
     * The sum of all the forces between the two colliders.
     * @param {Float32Array} scratch_buffer
     */
    total_force(scratch_buffer) {
        try {
            wasm.rawcontactforceevent_total_force(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The sum of the magnitudes of each force between the two colliders.
     *
     * Note that this is **not** the same as the magnitude of `self.total_force`.
     * Here we are summing the magnitude of all the forces, instead of taking
     * the magnitude of their sum.
     * @returns {number}
     */
    total_force_magnitude() {
        const ret = wasm.rawcontactforceevent_total_force_magnitude(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) RawContactForceEvent.prototype[Symbol.dispose] = RawContactForceEvent.prototype.free;

export class RawContactManifold {
    static __wrap(ptr) {
        const obj = Object.create(RawContactManifold.prototype);
        obj.__wbg_ptr = ptr;
        RawContactManifoldFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawContactManifoldFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawcontactmanifold_free(ptr, 0);
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    contact_dist(i) {
        const ret = wasm.rawcontactmanifold_contact_dist(this.__wbg_ptr, i);
        return ret;
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    contact_fid1(i) {
        const ret = wasm.rawcontactmanifold_contact_fid1(this.__wbg_ptr, i);
        return ret >>> 0;
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    contact_fid2(i) {
        const ret = wasm.rawcontactmanifold_contact_fid2(this.__wbg_ptr, i);
        return ret >>> 0;
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    contact_impulse(i) {
        const ret = wasm.rawcontactmanifold_contact_impulse(this.__wbg_ptr, i);
        return ret;
    }
    /**
     * @param {number} i
     * @param {Float32Array} scratch_buffer
     * @returns {boolean}
     */
    contact_local_p1(i, scratch_buffer) {
        try {
            const ret = wasm.rawcontactmanifold_contact_local_p1(this.__wbg_ptr, i, addBorrowedObject(scratch_buffer));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} i
     * @param {Float32Array} scratch_buffer
     * @returns {boolean}
     */
    contact_local_p2(i, scratch_buffer) {
        try {
            const ret = wasm.rawcontactmanifold_contact_local_p2(this.__wbg_ptr, i, addBorrowedObject(scratch_buffer));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    contact_tangent_impulse_x(i) {
        const ret = wasm.rawcontactmanifold_contact_tangent_impulse_x(this.__wbg_ptr, i);
        return ret;
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    contact_tangent_impulse_y(i) {
        const ret = wasm.rawcontactmanifold_contact_tangent_impulse_y(this.__wbg_ptr, i);
        return ret;
    }
    /**
     * @returns {number}
     */
    friction() {
        const ret = wasm.rawcontactmanifold_friction(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {Float32Array} scratch_buffer
     */
    local_n1(scratch_buffer) {
        try {
            wasm.rawcontactmanifold_local_n1(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {Float32Array} scratch_buffer
     */
    local_n2(scratch_buffer) {
        try {
            wasm.rawcontactmanifold_local_n2(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {Float32Array} scratch_buffer
     */
    normal(scratch_buffer) {
        try {
            wasm.rawcontactmanifold_normal(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @returns {number}
     */
    num_contacts() {
        const ret = wasm.rawcontactmanifold_num_contacts(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    num_solver_contacts() {
        const ret = wasm.rawcontactmanifold_num_solver_contacts(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    restitution() {
        const ret = wasm.rawcontactmanifold_restitution(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    solver_contact_dist(i) {
        const ret = wasm.rawcontactmanifold_solver_contact_dist(this.__wbg_ptr, i);
        return ret;
    }
    /**
     * @param {RawRigidBodySet} bodies
     * @param {number} i
     * @param {Float32Array} scratch_buffer
     * @returns {boolean}
     */
    solver_contact_point(bodies, i, scratch_buffer) {
        try {
            _assertClass(bodies, RawRigidBodySet);
            const ret = wasm.rawcontactmanifold_solver_contact_point(this.__wbg_ptr, bodies.__wbg_ptr, i, addBorrowedObject(scratch_buffer));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} i
     * @param {Float32Array} scratch_buffer
     */
    solver_contact_tangent_velocity(i, scratch_buffer) {
        try {
            wasm.rawcontactmanifold_solver_contact_tangent_velocity(this.__wbg_ptr, i, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @returns {number}
     */
    subshape1() {
        const ret = wasm.rawcontactmanifold_subshape1(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    subshape2() {
        const ret = wasm.rawcontactmanifold_subshape2(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) RawContactManifold.prototype[Symbol.dispose] = RawContactManifold.prototype.free;

export class RawContactPair {
    static __wrap(ptr) {
        const obj = Object.create(RawContactPair.prototype);
        obj.__wbg_ptr = ptr;
        RawContactPairFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawContactPairFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawcontactpair_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    collider1() {
        const ret = wasm.rawcontactpair_collider1(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    collider2() {
        const ret = wasm.rawcontactpair_collider2(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} i
     * @returns {RawContactManifold | undefined}
     */
    contactManifold(i) {
        const ret = wasm.rawcontactpair_contactManifold(this.__wbg_ptr, i);
        return ret === 0 ? undefined : RawContactManifold.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    numContactManifolds() {
        const ret = wasm.rawcontactpair_numContactManifolds(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) RawContactPair.prototype[Symbol.dispose] = RawContactPair.prototype.free;

/**
 * The vertex/index buffers of a convex polyhedron’s convex hull.
 */
export class RawConvexMeshData {
    static __wrap(ptr) {
        const obj = Object.create(RawConvexMeshData.prototype);
        obj.__wbg_ptr = ptr;
        RawConvexMeshDataFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawConvexMeshDataFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawconvexmeshdata_free(ptr, 0);
    }
    /**
     * @returns {Uint32Array}
     */
    get indices() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_rawconvexmeshdata_indices(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {Float32Array}
     */
    get vertices() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_rawconvexmeshdata_vertices(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {Uint32Array} arg0
     */
    set indices(arg0) {
        const ptr0 = passArray32ToWasm0(arg0, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rawconvexmeshdata_indices(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Float32Array} arg0
     */
    set vertices(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rawconvexmeshdata_vertices(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) RawConvexMeshData.prototype[Symbol.dispose] = RawConvexMeshData.prototype.free;

export class RawDebugRenderPipeline {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawDebugRenderPipelineFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawdebugrenderpipeline_free(ptr, 0);
    }
    /**
     * @returns {Float32Array}
     */
    colors() {
        const ret = wasm.rawdebugrenderpipeline_colors(this.__wbg_ptr);
        return takeObject(ret);
    }
    constructor() {
        const ret = wasm.rawdebugrenderpipeline_new();
        this.__wbg_ptr = ret;
        RawDebugRenderPipelineFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawSoftBodySet} soft_bodies
     * @param {RawImpulseJointSet} impulse_joints
     * @param {RawMultibodyJointSet} multibody_joints
     * @param {RawNarrowPhase} narrow_phase
     * @param {number} filter_flags
     * @param {Function} filter_predicate
     */
    render(bodies, colliders, soft_bodies, impulse_joints, multibody_joints, narrow_phase, filter_flags, filter_predicate) {
        try {
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(colliders, RawColliderSet);
            _assertClass(soft_bodies, RawSoftBodySet);
            _assertClass(impulse_joints, RawImpulseJointSet);
            _assertClass(multibody_joints, RawMultibodyJointSet);
            _assertClass(narrow_phase, RawNarrowPhase);
            wasm.rawdebugrenderpipeline_render(this.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, soft_bodies.__wbg_ptr, impulse_joints.__wbg_ptr, multibody_joints.__wbg_ptr, narrow_phase.__wbg_ptr, filter_flags, addBorrowedObject(filter_predicate));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @returns {Float32Array}
     */
    vertices() {
        const ret = wasm.rawdebugrenderpipeline_vertices(this.__wbg_ptr);
        return takeObject(ret);
    }
}
if (Symbol.dispose) RawDebugRenderPipeline.prototype[Symbol.dispose] = RawDebugRenderPipeline.prototype.free;

export class RawDeserializedWorld {
    static __wrap(ptr) {
        const obj = Object.create(RawDeserializedWorld.prototype);
        obj.__wbg_ptr = ptr;
        RawDeserializedWorldFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawDeserializedWorldFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawdeserializedworld_free(ptr, 0);
    }
    /**
     * @returns {RawRigidBodySet | undefined}
     */
    takeBodies() {
        const ret = wasm.rawdeserializedworld_takeBodies(this.__wbg_ptr);
        return ret === 0 ? undefined : RawRigidBodySet.__wrap(ret);
    }
    /**
     * @returns {RawBroadPhase | undefined}
     */
    takeBroadPhase() {
        const ret = wasm.rawdeserializedworld_takeBroadPhase(this.__wbg_ptr);
        return ret === 0 ? undefined : RawBroadPhase.__wrap(ret);
    }
    /**
     * @returns {RawColliderSet | undefined}
     */
    takeColliders() {
        const ret = wasm.rawdeserializedworld_takeColliders(this.__wbg_ptr);
        return ret === 0 ? undefined : RawColliderSet.__wrap(ret);
    }
    /**
     * @returns {RawVector | undefined}
     */
    takeGravity() {
        const ret = wasm.rawdeserializedworld_takeGravity(this.__wbg_ptr);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
     * @returns {RawImpulseJointSet | undefined}
     */
    takeImpulseJoints() {
        const ret = wasm.rawdeserializedworld_takeImpulseJoints(this.__wbg_ptr);
        return ret === 0 ? undefined : RawImpulseJointSet.__wrap(ret);
    }
    /**
     * @returns {RawIntegrationParameters | undefined}
     */
    takeIntegrationParameters() {
        const ret = wasm.rawdeserializedworld_takeIntegrationParameters(this.__wbg_ptr);
        return ret === 0 ? undefined : RawIntegrationParameters.__wrap(ret);
    }
    /**
     * @returns {RawIslandManager | undefined}
     */
    takeIslandManager() {
        const ret = wasm.rawdeserializedworld_takeIslandManager(this.__wbg_ptr);
        return ret === 0 ? undefined : RawIslandManager.__wrap(ret);
    }
    /**
     * @returns {RawMultibodyJointSet | undefined}
     */
    takeMultibodyJoints() {
        const ret = wasm.rawdeserializedworld_takeMultibodyJoints(this.__wbg_ptr);
        return ret === 0 ? undefined : RawMultibodyJointSet.__wrap(ret);
    }
    /**
     * @returns {RawNarrowPhase | undefined}
     */
    takeNarrowPhase() {
        const ret = wasm.rawdeserializedworld_takeNarrowPhase(this.__wbg_ptr);
        return ret === 0 ? undefined : RawNarrowPhase.__wrap(ret);
    }
    /**
     * @returns {RawSoftBodySet | undefined}
     */
    takeSoftBodies() {
        const ret = wasm.rawdeserializedworld_takeSoftBodies(this.__wbg_ptr);
        return ret === 0 ? undefined : RawSoftBodySet.__wrap(ret);
    }
}
if (Symbol.dispose) RawDeserializedWorld.prototype[Symbol.dispose] = RawDeserializedWorld.prototype.free;

export class RawDynamicRayCastVehicleController {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawDynamicRayCastVehicleControllerFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawdynamicraycastvehiclecontroller_free(ptr, 0);
    }
    /**
     * @param {RawVector} chassis_connection_cs
     * @param {RawVector} direction_cs
     * @param {RawVector} axle_cs
     * @param {number} suspension_rest_length
     * @param {number} radius
     */
    add_wheel(chassis_connection_cs, direction_cs, axle_cs, suspension_rest_length, radius) {
        _assertClass(chassis_connection_cs, RawVector);
        _assertClass(direction_cs, RawVector);
        _assertClass(axle_cs, RawVector);
        wasm.rawdynamicraycastvehiclecontroller_add_wheel(this.__wbg_ptr, chassis_connection_cs.__wbg_ptr, direction_cs.__wbg_ptr, axle_cs.__wbg_ptr, suspension_rest_length, radius);
    }
    /**
     * @returns {number}
     */
    chassis() {
        const ret = wasm.rawdynamicraycastvehiclecontroller_chassis(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    current_vehicle_speed() {
        const ret = wasm.rawdynamicraycastvehiclecontroller_current_vehicle_speed(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    index_forward_axis() {
        const ret = wasm.rawdynamicraycastvehiclecontroller_index_forward_axis(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    index_up_axis() {
        const ret = wasm.rawdynamicraycastvehiclecontroller_index_up_axis(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} chassis
     */
    constructor(chassis) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_new(chassis);
        this.__wbg_ptr = ret;
        RawDynamicRayCastVehicleControllerFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    num_wheels() {
        const ret = wasm.rawdynamicraycastvehiclecontroller_num_wheels(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} axis
     */
    set_index_forward_axis(axis) {
        wasm.rawdynamicraycastvehiclecontroller_set_index_forward_axis(this.__wbg_ptr, axis);
    }
    /**
     * @param {number} axis
     */
    set_index_up_axis(axis) {
        wasm.rawdynamicraycastvehiclecontroller_set_index_up_axis(this.__wbg_ptr, axis);
    }
    /**
     * @param {number} i
     * @param {RawVector} value
     */
    set_wheel_axle_cs(i, value) {
        _assertClass(value, RawVector);
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_axle_cs(this.__wbg_ptr, i, value.__wbg_ptr);
    }
    /**
     * @param {number} i
     * @param {number} value
     */
    set_wheel_brake(i, value) {
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_brake(this.__wbg_ptr, i, value);
    }
    /**
     * @param {number} i
     * @param {RawVector} value
     */
    set_wheel_chassis_connection_point_cs(i, value) {
        _assertClass(value, RawVector);
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_chassis_connection_point_cs(this.__wbg_ptr, i, value.__wbg_ptr);
    }
    /**
     * @param {number} i
     * @param {RawVector} value
     */
    set_wheel_direction_cs(i, value) {
        _assertClass(value, RawVector);
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_direction_cs(this.__wbg_ptr, i, value.__wbg_ptr);
    }
    /**
     * @param {number} i
     * @param {number} value
     */
    set_wheel_engine_force(i, value) {
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_engine_force(this.__wbg_ptr, i, value);
    }
    /**
     * @param {number} i
     * @param {number} value
     */
    set_wheel_friction_slip(i, value) {
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_friction_slip(this.__wbg_ptr, i, value);
    }
    /**
     * @param {number} i
     * @param {number} value
     */
    set_wheel_max_suspension_force(i, value) {
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_force(this.__wbg_ptr, i, value);
    }
    /**
     * @param {number} i
     * @param {number} value
     */
    set_wheel_max_suspension_travel(i, value) {
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_travel(this.__wbg_ptr, i, value);
    }
    /**
     * @param {number} i
     * @param {number} value
     */
    set_wheel_radius(i, value) {
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_radius(this.__wbg_ptr, i, value);
    }
    /**
     * @param {number} i
     * @param {number} stiffness
     */
    set_wheel_side_friction_stiffness(i, stiffness) {
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_side_friction_stiffness(this.__wbg_ptr, i, stiffness);
    }
    /**
     * @param {number} i
     * @param {number} value
     */
    set_wheel_steering(i, value) {
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_steering(this.__wbg_ptr, i, value);
    }
    /**
     * @param {number} i
     * @param {number} value
     */
    set_wheel_suspension_compression(i, value) {
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_suspension_compression(this.__wbg_ptr, i, value);
    }
    /**
     * @param {number} i
     * @param {number} value
     */
    set_wheel_suspension_relaxation(i, value) {
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_suspension_relaxation(this.__wbg_ptr, i, value);
    }
    /**
     * @param {number} i
     * @param {number} value
     */
    set_wheel_suspension_rest_length(i, value) {
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_suspension_rest_length(this.__wbg_ptr, i, value);
    }
    /**
     * @param {number} i
     * @param {number} value
     */
    set_wheel_suspension_stiffness(i, value) {
        wasm.rawdynamicraycastvehiclecontroller_set_wheel_suspension_stiffness(this.__wbg_ptr, i, value);
    }
    /**
     * @param {number} dt
     * @param {RawBroadPhase} broad_phase
     * @param {RawNarrowPhase} narrow_phase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {number} filter_flags
     * @param {number | null | undefined} filter_groups
     * @param {Function} filter_predicate
     */
    update_vehicle(dt, broad_phase, narrow_phase, bodies, colliders, filter_flags, filter_groups, filter_predicate) {
        try {
            _assertClass(broad_phase, RawBroadPhase);
            _assertClass(narrow_phase, RawNarrowPhase);
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(colliders, RawColliderSet);
            wasm.rawdynamicraycastvehiclecontroller_update_vehicle(this.__wbg_ptr, dt, broad_phase.__wbg_ptr, narrow_phase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, filter_flags, isLikeNone(filter_groups) ? Number.MAX_SAFE_INTEGER : (filter_groups) >>> 0, addBorrowedObject(filter_predicate));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} i
     * @param {Float32Array} scratch_buffer
     * @returns {boolean}
     */
    wheel_axle_cs(i, scratch_buffer) {
        try {
            const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_axle_cs(this.__wbg_ptr, i, addBorrowedObject(scratch_buffer));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_brake(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_brake(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @param {Float32Array} scratch_buffer
     * @returns {boolean}
     */
    wheel_chassis_connection_point_cs(i, scratch_buffer) {
        try {
            const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_chassis_connection_point_cs(this.__wbg_ptr, i, addBorrowedObject(scratch_buffer));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} i
     * @param {Float32Array} scratch_buffer
     * @returns {boolean}
     */
    wheel_contact_normal_ws(i, scratch_buffer) {
        try {
            const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_contact_normal_ws(this.__wbg_ptr, i, addBorrowedObject(scratch_buffer));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} i
     * @param {Float32Array} scratch_buffer
     * @returns {boolean}
     */
    wheel_contact_point_ws(i, scratch_buffer) {
        try {
            const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_contact_point_ws(this.__wbg_ptr, i, addBorrowedObject(scratch_buffer));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} i
     * @param {Float32Array} scratch_buffer
     * @returns {boolean}
     */
    wheel_direction_cs(i, scratch_buffer) {
        try {
            const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_direction_cs(this.__wbg_ptr, i, addBorrowedObject(scratch_buffer));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_engine_force(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_engine_force(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_forward_impulse(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_forward_impulse(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_friction_slip(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_friction_slip(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_ground_object(i) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawdynamicraycastvehiclecontroller_wheel_ground_object(retptr, this.__wbg_ptr, i);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getFloat64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} i
     * @param {Float32Array} scratch_buffer
     * @returns {boolean}
     */
    wheel_hard_point_ws(i, scratch_buffer) {
        try {
            const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_hard_point_ws(this.__wbg_ptr, i, addBorrowedObject(scratch_buffer));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} i
     * @returns {boolean}
     */
    wheel_is_in_contact(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_is_in_contact(this.__wbg_ptr, i);
        return ret !== 0;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_max_suspension_force(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_max_suspension_force(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_max_suspension_travel(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_max_suspension_travel(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_radius(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_radius(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_rotation(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_rotation(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_side_friction_stiffness(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_side_friction_stiffness(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_side_impulse(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_side_impulse(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_steering(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_steering(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_suspension_compression(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_suspension_compression(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_suspension_force(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_suspension_force(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_suspension_length(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_suspension_length(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_suspension_relaxation(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_suspension_relaxation(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_suspension_rest_length(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_suspension_rest_length(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {number | undefined}
     */
    wheel_suspension_stiffness(i) {
        const ret = wasm.rawdynamicraycastvehiclecontroller_wheel_suspension_stiffness(this.__wbg_ptr, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
}
if (Symbol.dispose) RawDynamicRayCastVehicleController.prototype[Symbol.dispose] = RawDynamicRayCastVehicleController.prototype.free;

/**
 * A structure responsible for collecting events generated
 * by the physics engine.
 */
export class RawEventQueue {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawEventQueueFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_raweventqueue_free(ptr, 0);
    }
    /**
     * Removes all events contained by this collector.
     */
    clear() {
        wasm.raweventqueue_clear(this.__wbg_ptr);
    }
    /**
     * Applies the given javascript closure on each collision event of this collector, then clear
     * the internal collision event buffer.
     *
     * # Parameters
     * - `f(handle1, handle2, started)`:  JavaScript closure applied to each collision event. The
     * closure should take three arguments: two integers representing the handles of the colliders
     * involved in the collision, and a boolean indicating if the collision started (true) or stopped
     * (false).
     * @param {Function} f
     */
    drainCollisionEvents(f) {
        try {
            wasm.raweventqueue_drainCollisionEvents(this.__wbg_ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {Function} f
     */
    drainContactForceEvents(f) {
        try {
            wasm.raweventqueue_drainContactForceEvents(this.__wbg_ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * Applies the given javascript closure on each soft-body tear event of this collector,
     * then clears the internal tear event buffer.
     * @param {Function} f
     */
    drainSoftBodyTearEvents(f) {
        try {
            wasm.raweventqueue_drainSoftBodyTearEvents(this.__wbg_ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * Creates a new event collector.
     *
     * # Parameters
     * - `autoDrain`: setting this to `true` is strongly recommended. If true, the collector will
     * be automatically drained before each `world.step(collector)`. If false, the collector will
     * keep all events in memory unless it is manually drained/cleared; this may lead to unbounded use of
     * RAM if no drain is performed.
     * @param {boolean} autoDrain
     */
    constructor(autoDrain) {
        const ret = wasm.raweventqueue_new(autoDrain);
        this.__wbg_ptr = ret;
        RawEventQueueFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) RawEventQueue.prototype[Symbol.dispose] = RawEventQueue.prototype.free;

/**
 * @enum {0 | 1 | 2 | 3}
 */
export const RawFeatureType = Object.freeze({
    Vertex: 0, "0": "Vertex",
    Edge: 1, "1": "Edge",
    Face: 2, "2": "Face",
    Unknown: 3, "3": "Unknown",
});

export class RawGenericJoint {
    static __wrap(ptr) {
        const obj = Object.create(RawGenericJoint.prototype);
        obj.__wbg_ptr = ptr;
        RawGenericJointFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawGenericJointFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawgenericjoint_free(ptr, 0);
    }
    /**
     * Creates a new joint descriptor that builds a Fixed joint.
     *
     * A fixed joint removes all the degrees of freedom between the affected bodies.
     * @param {RawVector} anchor1
     * @param {RawRotation} axes1
     * @param {RawVector} anchor2
     * @param {RawRotation} axes2
     * @returns {RawGenericJoint}
     */
    static fixed(anchor1, axes1, anchor2, axes2) {
        _assertClass(anchor1, RawVector);
        _assertClass(axes1, RawRotation);
        _assertClass(anchor2, RawVector);
        _assertClass(axes2, RawRotation);
        const ret = wasm.rawgenericjoint_fixed(anchor1.__wbg_ptr, axes1.__wbg_ptr, anchor2.__wbg_ptr, axes2.__wbg_ptr);
        return RawGenericJoint.__wrap(ret);
    }
    /**
     * Creates a new joint descriptor that builds generic joints.
     *
     * Generic joints allow arbitrary axes of freedom to be selected
     * for the joint from the available 6 degrees of freedom.
     * @param {RawVector} anchor1
     * @param {RawVector} anchor2
     * @param {RawVector} axis
     * @param {number} lockedAxes
     * @returns {RawGenericJoint | undefined}
     */
    static generic(anchor1, anchor2, axis, lockedAxes) {
        _assertClass(anchor1, RawVector);
        _assertClass(anchor2, RawVector);
        _assertClass(axis, RawVector);
        const ret = wasm.rawgenericjoint_generic(anchor1.__wbg_ptr, anchor2.__wbg_ptr, axis.__wbg_ptr, lockedAxes);
        return ret === 0 ? undefined : RawGenericJoint.__wrap(ret);
    }
    /**
     * Creates a new joint descriptor that builds a Prismatic joint.
     *
     * A prismatic joint removes all the degrees of freedom between the
     * affected bodies, except for the translation along one axis.
     *
     * Returns `None` if any of the provided axes cannot be normalized.
     * @param {RawVector} anchor1
     * @param {RawVector} anchor2
     * @param {RawVector} axis
     * @param {boolean} limitsEnabled
     * @param {number} limitsMin
     * @param {number} limitsMax
     * @returns {RawGenericJoint | undefined}
     */
    static prismatic(anchor1, anchor2, axis, limitsEnabled, limitsMin, limitsMax) {
        _assertClass(anchor1, RawVector);
        _assertClass(anchor2, RawVector);
        _assertClass(axis, RawVector);
        const ret = wasm.rawgenericjoint_prismatic(anchor1.__wbg_ptr, anchor2.__wbg_ptr, axis.__wbg_ptr, limitsEnabled, limitsMin, limitsMax);
        return ret === 0 ? undefined : RawGenericJoint.__wrap(ret);
    }
    /**
     * Create a new joint descriptor that builds Revolute joints with
     * independent local axes for each attached rigid-body.
     *
     * This is equivalent to a revolute generic joint with all linear axes
     * locked and only angular X free, but it preserves the local hinge axis
     * on each body instead of assuming they are identical.
     * @param {RawVector} anchor1
     * @param {RawVector} anchor2
     * @param {RawVector} axis1
     * @param {RawVector} axis2
     * @returns {RawGenericJoint | undefined}
     */
    static revoluteWithAxes(anchor1, anchor2, axis1, axis2) {
        _assertClass(anchor1, RawVector);
        _assertClass(anchor2, RawVector);
        _assertClass(axis1, RawVector);
        _assertClass(axis2, RawVector);
        const ret = wasm.rawgenericjoint_revoluteWithAxes(anchor1.__wbg_ptr, anchor2.__wbg_ptr, axis1.__wbg_ptr, axis2.__wbg_ptr);
        return ret === 0 ? undefined : RawGenericJoint.__wrap(ret);
    }
    /**
     * Create a new joint descriptor that builds Revolute joints.
     *
     * A revolute joint removes all degrees of freedom between the affected
     * bodies except for the rotation along one axis.
     * @param {RawVector} anchor1
     * @param {RawVector} anchor2
     * @param {RawVector} axis
     * @returns {RawGenericJoint | undefined}
     */
    static revolute(anchor1, anchor2, axis) {
        _assertClass(anchor1, RawVector);
        _assertClass(anchor2, RawVector);
        _assertClass(axis, RawVector);
        const ret = wasm.rawgenericjoint_revolute(anchor1.__wbg_ptr, anchor2.__wbg_ptr, axis.__wbg_ptr);
        return ret === 0 ? undefined : RawGenericJoint.__wrap(ret);
    }
    /**
     * @param {number} length
     * @param {RawVector} anchor1
     * @param {RawVector} anchor2
     * @returns {RawGenericJoint}
     */
    static rope(length, anchor1, anchor2) {
        _assertClass(anchor1, RawVector);
        _assertClass(anchor2, RawVector);
        const ret = wasm.rawgenericjoint_rope(length, anchor1.__wbg_ptr, anchor2.__wbg_ptr);
        return RawGenericJoint.__wrap(ret);
    }
    /**
     * Create a new joint descriptor that builds spherical joints.
     *
     * A spherical joints allows three relative rotational degrees of freedom
     * by preventing any relative translation between the anchors of the
     * two attached rigid-bodies.
     * @param {RawVector} anchor1
     * @param {RawVector} anchor2
     * @returns {RawGenericJoint}
     */
    static spherical(anchor1, anchor2) {
        _assertClass(anchor1, RawVector);
        _assertClass(anchor2, RawVector);
        const ret = wasm.rawgenericjoint_spherical(anchor1.__wbg_ptr, anchor2.__wbg_ptr);
        return RawGenericJoint.__wrap(ret);
    }
    /**
     * @param {number} rest_length
     * @param {number} stiffness
     * @param {number} damping
     * @param {RawVector} anchor1
     * @param {RawVector} anchor2
     * @returns {RawGenericJoint}
     */
    static spring(rest_length, stiffness, damping, anchor1, anchor2) {
        _assertClass(anchor1, RawVector);
        _assertClass(anchor2, RawVector);
        const ret = wasm.rawgenericjoint_spring(rest_length, stiffness, damping, anchor1.__wbg_ptr, anchor2.__wbg_ptr);
        return RawGenericJoint.__wrap(ret);
    }
}
if (Symbol.dispose) RawGenericJoint.prototype[Symbol.dispose] = RawGenericJoint.prototype.free;

export class RawImpulseJointSet {
    static __wrap(ptr) {
        const obj = Object.create(RawImpulseJointSet.prototype);
        obj.__wbg_ptr = ptr;
        RawImpulseJointSetFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawImpulseJointSetFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawimpulsejointset_free(ptr, 0);
    }
    /**
     * @param {number} handle
     * @returns {boolean}
     */
    contains(handle) {
        const ret = wasm.rawimpulsejointset_contains(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * @param {RawGenericJoint} params
     * @param {number} parent1
     * @param {number} parent2
     * @param {boolean} wake_up
     * @returns {number}
     */
    createJoint(params, parent1, parent2, wake_up) {
        _assertClass(params, RawGenericJoint);
        const ret = wasm.rawimpulsejointset_createJoint(this.__wbg_ptr, params.__wbg_ptr, parent1, parent2, wake_up);
        return ret;
    }
    /**
     * Applies the given JavaScript function to the integer handle of each joint attached to the given rigid-body.
     *
     * # Parameters
     * - `f(handle)`: the function to apply to the integer handle of each joint attached to the rigid-body. Called as `f(collider)`.
     * @param {number} body
     * @param {Function} f
     */
    forEachJointAttachedToRigidBody(body, f) {
        try {
            wasm.rawimpulsejointset_forEachJointAttachedToRigidBody(this.__wbg_ptr, body, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * Applies the given JavaScript function to the integer handle of each joint managed by this physics world.
     *
     * # Parameters
     * - `f(handle)`: the function to apply to the integer handle of each joint managed by this set. Called as `f(collider)`.
     * @param {Function} f
     */
    forEachJointHandle(f) {
        try {
            wasm.rawimpulsejointset_forEachJointHandle(this.__wbg_ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The position of the second anchor of this joint.
     *
     * The second anchor gives the position of the points application point on the
     * local frame of the second rigid-body it is attached to.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    jointAnchor1(handle, scratch_buffer) {
        try {
            wasm.rawimpulsejointset_jointAnchor1(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The position of the second anchor of this joint.
     *
     * The second anchor gives the position of the points application point on the
     * local frame of the second rigid-body it is attached to.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    jointAnchor2(handle, scratch_buffer) {
        try {
            wasm.rawimpulsejointset_jointAnchor2(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The unique integer identifier of the first rigid-body this joint it attached to.
     * @param {number} handle
     * @returns {number}
     */
    jointBodyHandle1(handle) {
        const ret = wasm.rawimpulsejointset_jointBodyHandle1(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * The unique integer identifier of the second rigid-body this joint is attached to.
     * @param {number} handle
     * @returns {number}
     */
    jointBodyHandle2(handle) {
        const ret = wasm.rawimpulsejointset_jointBodyHandle2(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {RawJointAxis} axis
     * @param {RawMotorModel} model
     */
    jointConfigureMotorModel(handle, axis, model) {
        wasm.rawimpulsejointset_jointConfigureMotorModel(this.__wbg_ptr, handle, axis, model);
    }
    /**
     * @param {number} handle
     * @param {RawJointAxis} axis
     * @param {number} targetPos
     * @param {number} stiffness
     * @param {number} damping
     */
    jointConfigureMotorPosition(handle, axis, targetPos, stiffness, damping) {
        wasm.rawimpulsejointset_jointConfigureMotorPosition(this.__wbg_ptr, handle, axis, targetPos, stiffness, damping);
    }
    /**
     * @param {number} handle
     * @param {RawJointAxis} axis
     * @param {number} targetVel
     * @param {number} factor
     */
    jointConfigureMotorVelocity(handle, axis, targetVel, factor) {
        wasm.rawimpulsejointset_jointConfigureMotorVelocity(this.__wbg_ptr, handle, axis, targetVel, factor);
    }
    /**
     * @param {number} handle
     * @param {RawJointAxis} axis
     * @param {number} targetPos
     * @param {number} targetVel
     * @param {number} stiffness
     * @param {number} damping
     */
    jointConfigureMotor(handle, axis, targetPos, targetVel, stiffness, damping) {
        wasm.rawimpulsejointset_jointConfigureMotor(this.__wbg_ptr, handle, axis, targetPos, targetVel, stiffness, damping);
    }
    /**
     * Are contacts between the rigid-bodies attached by this joint enabled?
     * @param {number} handle
     * @returns {boolean}
     */
    jointContactsEnabled(handle) {
        const ret = wasm.rawimpulsejointset_jointContactsEnabled(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * The angular part of the joint’s local frame relative to the first rigid-body it is attached to.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    jointFrameX1(handle, scratch_buffer) {
        try {
            wasm.rawimpulsejointset_jointFrameX1(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The angular part of the joint’s local frame relative to the second rigid-body it is attached to.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    jointFrameX2(handle, scratch_buffer) {
        try {
            wasm.rawimpulsejointset_jointFrameX2(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * Are the limits for this joint enabled?
     * @param {number} handle
     * @param {RawJointAxis} axis
     * @returns {boolean}
     */
    jointLimitsEnabled(handle, axis) {
        const ret = wasm.rawimpulsejointset_jointLimitsEnabled(this.__wbg_ptr, handle, axis);
        return ret !== 0;
    }
    /**
     * If this is a prismatic joint, returns its upper limit.
     * @param {number} handle
     * @param {RawJointAxis} axis
     * @returns {number}
     */
    jointLimitsMax(handle, axis) {
        const ret = wasm.rawimpulsejointset_jointLimitsMax(this.__wbg_ptr, handle, axis);
        return ret;
    }
    /**
     * Return the lower limit along the given joint axis.
     * @param {number} handle
     * @param {RawJointAxis} axis
     * @returns {number}
     */
    jointLimitsMin(handle, axis) {
        const ret = wasm.rawimpulsejointset_jointLimitsMin(this.__wbg_ptr, handle, axis);
        return ret;
    }
    /**
     * Sets the position of the first local anchor
     * @param {number} handle
     * @param {RawVector} newPos
     */
    jointSetAnchor1(handle, newPos) {
        _assertClass(newPos, RawVector);
        wasm.rawimpulsejointset_jointSetAnchor1(this.__wbg_ptr, handle, newPos.__wbg_ptr);
    }
    /**
     * Sets the position of the second local anchor
     * @param {number} handle
     * @param {RawVector} newPos
     */
    jointSetAnchor2(handle, newPos) {
        _assertClass(newPos, RawVector);
        wasm.rawimpulsejointset_jointSetAnchor2(this.__wbg_ptr, handle, newPos.__wbg_ptr);
    }
    /**
     * Sets whether contacts are enabled between the rigid-bodies attached by this joint.
     * @param {number} handle
     * @param {boolean} enabled
     */
    jointSetContactsEnabled(handle, enabled) {
        wasm.rawimpulsejointset_jointSetContactsEnabled(this.__wbg_ptr, handle, enabled);
    }
    /**
     * Sets the angular part of the joint's local frame relative to the first rigid-body.
     * @param {number} handle
     * @param {RawRotation} newRot
     */
    jointSetFrameX1(handle, newRot) {
        _assertClass(newRot, RawRotation);
        wasm.rawimpulsejointset_jointSetFrameX1(this.__wbg_ptr, handle, newRot.__wbg_ptr);
    }
    /**
     * Sets the angular part of the joint's local frame relative to the second rigid-body.
     * @param {number} handle
     * @param {RawRotation} newRot
     */
    jointSetFrameX2(handle, newRot) {
        _assertClass(newRot, RawRotation);
        wasm.rawimpulsejointset_jointSetFrameX2(this.__wbg_ptr, handle, newRot.__wbg_ptr);
    }
    /**
     * Enables and sets the joint limits
     * @param {number} handle
     * @param {RawJointAxis} axis
     * @param {number} min
     * @param {number} max
     */
    jointSetLimits(handle, axis, min, max) {
        wasm.rawimpulsejointset_jointSetLimits(this.__wbg_ptr, handle, axis, min, max);
    }
    /**
     * Sets the full local frame (anchor + rotation) for the first rigid-body attachment.
     * @param {number} handle
     * @param {RawVector} anchor
     * @param {RawRotation} rot
     */
    jointSetLocalFrame1(handle, anchor, rot) {
        _assertClass(anchor, RawVector);
        _assertClass(rot, RawRotation);
        wasm.rawimpulsejointset_jointSetLocalFrame1(this.__wbg_ptr, handle, anchor.__wbg_ptr, rot.__wbg_ptr);
    }
    /**
     * Sets the full local frame (anchor + rotation) for the second rigid-body attachment.
     * @param {number} handle
     * @param {RawVector} anchor
     * @param {RawRotation} rot
     */
    jointSetLocalFrame2(handle, anchor, rot) {
        _assertClass(anchor, RawVector);
        _assertClass(rot, RawRotation);
        wasm.rawimpulsejointset_jointSetLocalFrame2(this.__wbg_ptr, handle, anchor.__wbg_ptr, rot.__wbg_ptr);
    }
    /**
     * @param {number} handle
     * @param {RawJointAxis} axis
     * @param {number} maxForce
     */
    jointSetMotorMaxForce(handle, axis, maxForce) {
        wasm.rawimpulsejointset_jointSetMotorMaxForce(this.__wbg_ptr, handle, axis, maxForce);
    }
    /**
     * The type of this joint.
     * @param {number} handle
     * @returns {RawJointType}
     */
    jointType(handle) {
        const ret = wasm.rawimpulsejointset_jointType(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @returns {number}
     */
    len() {
        const ret = wasm.rawimpulsejointset_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    constructor() {
        const ret = wasm.rawimpulsejointset_new();
        this.__wbg_ptr = ret;
        RawImpulseJointSetFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} handle
     * @param {boolean} wakeUp
     */
    remove(handle, wakeUp) {
        wasm.rawimpulsejointset_remove(this.__wbg_ptr, handle, wakeUp);
    }
}
if (Symbol.dispose) RawImpulseJointSet.prototype[Symbol.dispose] = RawImpulseJointSet.prototype.free;

export class RawIntegrationParameters {
    static __wrap(ptr) {
        const obj = Object.create(RawIntegrationParameters.prototype);
        obj.__wbg_ptr = ptr;
        RawIntegrationParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawIntegrationParametersFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawintegrationparameters_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get contact_erp() {
        const ret = wasm.rawintegrationparameters_contact_erp(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get dt() {
        const ret = wasm.rawintegrationparameters_dt(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get lengthUnit() {
        const ret = wasm.rawintegrationparameters_lengthUnit(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get maxCcdSubsteps() {
        const ret = wasm.rawintegrationparameters_maxCcdSubsteps(this.__wbg_ptr);
        return ret >>> 0;
    }
    constructor() {
        const ret = wasm.rawintegrationparameters_new();
        this.__wbg_ptr = ret;
        RawIntegrationParametersFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get normalizedAllowedLinearError() {
        const ret = wasm.rawintegrationparameters_normalizedAllowedLinearError(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get normalizedPredictionDistance() {
        const ret = wasm.rawintegrationparameters_normalizedPredictionDistance(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get numInternalPgsIterations() {
        const ret = wasm.rawintegrationparameters_numInternalPgsIterations(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get numSolverIterations() {
        const ret = wasm.rawintegrationparameters_numSolverIterations(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} value
     */
    set contact_natural_frequency(value) {
        wasm.rawintegrationparameters_set_contact_natural_frequency(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set dt(value) {
        wasm.rawintegrationparameters_set_dt(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set lengthUnit(value) {
        wasm.rawintegrationparameters_set_lengthUnit(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set maxCcdSubsteps(value) {
        wasm.rawintegrationparameters_set_maxCcdSubsteps(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set normalizedAllowedLinearError(value) {
        wasm.rawintegrationparameters_set_normalizedAllowedLinearError(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set normalizedPredictionDistance(value) {
        wasm.rawintegrationparameters_set_normalizedPredictionDistance(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set numInternalPgsIterations(value) {
        wasm.rawintegrationparameters_set_numInternalPgsIterations(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set numSolverIterations(value) {
        wasm.rawintegrationparameters_set_numSolverIterations(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set softBodiesContactStiffening(value) {
        wasm.rawintegrationparameters_set_softBodiesContactStiffening(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set softBodiesFemLinearTolerance(value) {
        wasm.rawintegrationparameters_set_softBodiesFemLinearTolerance(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set softBodiesFemMaxDenseDofs(value) {
        wasm.rawintegrationparameters_set_softBodiesFemMaxDenseDofs(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set softBodiesFemMaxLinearIterations(value) {
        wasm.rawintegrationparameters_set_softBodiesFemMaxLinearIterations(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set softBodiesMaxExtraSubsteps(value) {
        wasm.rawintegrationparameters_set_softBodiesMaxExtraSubsteps(this.__wbg_ptr, value);
    }
    /**
     * @param {RawSoftRecoverySettings} value
     */
    set softBodiesRecovery(value) {
        _assertClass(value, RawSoftRecoverySettings);
        wasm.rawintegrationparameters_set_softBodiesRecovery(this.__wbg_ptr, value.__wbg_ptr);
    }
    /**
     * @param {number} value
     */
    set softBodiesResweepStrain(value) {
        wasm.rawintegrationparameters_set_softBodiesResweepStrain(this.__wbg_ptr, value);
    }
    /**
     * @returns {number}
     */
    get softBodiesContactStiffening() {
        const ret = wasm.rawintegrationparameters_softBodiesContactStiffening(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get softBodiesFemLinearTolerance() {
        const ret = wasm.rawintegrationparameters_softBodiesFemLinearTolerance(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get softBodiesFemMaxDenseDofs() {
        const ret = wasm.rawintegrationparameters_softBodiesFemMaxDenseDofs(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get softBodiesFemMaxLinearIterations() {
        const ret = wasm.rawintegrationparameters_softBodiesFemMaxLinearIterations(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get softBodiesMaxExtraSubsteps() {
        const ret = wasm.rawintegrationparameters_softBodiesMaxExtraSubsteps(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {RawSoftRecoverySettings}
     */
    get softBodiesRecovery() {
        const ret = wasm.rawintegrationparameters_softBodiesRecovery(this.__wbg_ptr);
        return RawSoftRecoverySettings.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get softBodiesResweepStrain() {
        const ret = wasm.rawintegrationparameters_softBodiesResweepStrain(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) RawIntegrationParameters.prototype[Symbol.dispose] = RawIntegrationParameters.prototype.free;

export class RawIslandManager {
    static __wrap(ptr) {
        const obj = Object.create(RawIslandManager.prototype);
        obj.__wbg_ptr = ptr;
        RawIslandManagerFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawIslandManagerFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawislandmanager_free(ptr, 0);
    }
    /**
     * Applies the given JavaScript function to the integer handle of each active rigid-body
     * managed by this island manager.
     *
     * After a short time of inactivity, a rigid-body is automatically deactivated ("asleep") by
     * the physics engine in order to save computational power. A sleeping rigid-body never moves
     * unless it is moved manually by the user.
     *
     * # Parameters
     * - `f(handle)`: the function to apply to the integer handle of each active rigid-body managed by this
     *   set. Called as `f(collider)`.
     * @param {Function} f
     */
    forEachActiveRigidBodyHandle(f) {
        try {
            wasm.rawislandmanager_forEachActiveRigidBodyHandle(this.__wbg_ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    constructor() {
        const ret = wasm.rawislandmanager_new();
        this.__wbg_ptr = ret;
        RawIslandManagerFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) RawIslandManager.prototype[Symbol.dispose] = RawIslandManager.prototype.free;

/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5}
 */
export const RawJointAxis = Object.freeze({
    LinX: 0, "0": "LinX",
    LinY: 1, "1": "LinY",
    LinZ: 2, "2": "LinZ",
    AngX: 3, "3": "AngX",
    AngY: 4, "4": "AngY",
    AngZ: 5, "5": "AngZ",
});

/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6}
 */
export const RawJointType = Object.freeze({
    Revolute: 0, "0": "Revolute",
    Fixed: 1, "1": "Fixed",
    Prismatic: 2, "2": "Prismatic",
    Rope: 3, "3": "Rope",
    Spring: 4, "4": "Spring",
    Spherical: 5, "5": "Spherical",
    Generic: 6, "6": "Generic",
});

export class RawKinematicCharacterController {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawKinematicCharacterControllerFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawkinematiccharactercontroller_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    autostepEnabled() {
        const ret = wasm.rawkinematiccharactercontroller_autostepEnabled(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    autostepIncludesDynamicBodies() {
        const ret = wasm.rawkinematiccharactercontroller_autostepIncludesDynamicBodies(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    autostepMaxHeight() {
        const ret = wasm.rawkinematiccharactercontroller_autostepMaxHeight(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    autostepMinWidth() {
        const ret = wasm.rawkinematiccharactercontroller_autostepMinWidth(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} dt
     * @param {RawBroadPhase} broad_phase
     * @param {RawNarrowPhase} narrow_phase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {number} collider_handle
     * @param {RawVector} desired_translation_delta
     * @param {boolean} apply_impulses_to_dynamic_bodies
     * @param {number | null | undefined} character_mass
     * @param {number} filter_flags
     * @param {number | null | undefined} filter_groups
     * @param {Function} filter_predicate
     */
    computeColliderMovement(dt, broad_phase, narrow_phase, bodies, colliders, collider_handle, desired_translation_delta, apply_impulses_to_dynamic_bodies, character_mass, filter_flags, filter_groups, filter_predicate) {
        try {
            _assertClass(broad_phase, RawBroadPhase);
            _assertClass(narrow_phase, RawNarrowPhase);
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(colliders, RawColliderSet);
            _assertClass(desired_translation_delta, RawVector);
            wasm.rawkinematiccharactercontroller_computeColliderMovement(this.__wbg_ptr, dt, broad_phase.__wbg_ptr, narrow_phase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, collider_handle, desired_translation_delta.__wbg_ptr, apply_impulses_to_dynamic_bodies, isLikeNone(character_mass) ? Number.MAX_SAFE_INTEGER : Math.fround(character_mass), filter_flags, isLikeNone(filter_groups) ? Number.MAX_SAFE_INTEGER : (filter_groups) >>> 0, addBorrowedObject(filter_predicate));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} i
     * @param {RawCharacterCollision} collision
     * @returns {boolean}
     */
    computedCollision(i, collision) {
        _assertClass(collision, RawCharacterCollision);
        const ret = wasm.rawkinematiccharactercontroller_computedCollision(this.__wbg_ptr, i, collision.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    computedGrounded() {
        const ret = wasm.rawkinematiccharactercontroller_computedGrounded(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Float32Array} scratch_buffer
     */
    computedMovement(scratch_buffer) {
        try {
            wasm.rawkinematiccharactercontroller_computedMovement(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    disableAutostep() {
        wasm.rawkinematiccharactercontroller_disableAutostep(this.__wbg_ptr);
    }
    disableSnapToGround() {
        wasm.rawkinematiccharactercontroller_disableSnapToGround(this.__wbg_ptr);
    }
    /**
     * @param {number} maxHeight
     * @param {number} minWidth
     * @param {boolean} includeDynamicBodies
     */
    enableAutostep(maxHeight, minWidth, includeDynamicBodies) {
        wasm.rawkinematiccharactercontroller_enableAutostep(this.__wbg_ptr, maxHeight, minWidth, includeDynamicBodies);
    }
    /**
     * @param {number} distance
     */
    enableSnapToGround(distance) {
        wasm.rawkinematiccharactercontroller_enableSnapToGround(this.__wbg_ptr, distance);
    }
    /**
     * @returns {number}
     */
    maxSlopeClimbAngle() {
        const ret = wasm.rawkinematiccharactercontroller_maxSlopeClimbAngle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    minSlopeSlideAngle() {
        const ret = wasm.rawkinematiccharactercontroller_minSlopeSlideAngle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} offset
     */
    constructor(offset) {
        const ret = wasm.rawkinematiccharactercontroller_new(offset);
        this.__wbg_ptr = ret;
        RawKinematicCharacterControllerFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    normalNudgeFactor() {
        const ret = wasm.rawkinematiccharactercontroller_normalNudgeFactor(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    numComputedCollisions() {
        const ret = wasm.rawkinematiccharactercontroller_numComputedCollisions(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    offset() {
        const ret = wasm.rawkinematiccharactercontroller_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} angle
     */
    setMaxSlopeClimbAngle(angle) {
        wasm.rawkinematiccharactercontroller_setMaxSlopeClimbAngle(this.__wbg_ptr, angle);
    }
    /**
     * @param {number} angle
     */
    setMinSlopeSlideAngle(angle) {
        wasm.rawkinematiccharactercontroller_setMinSlopeSlideAngle(this.__wbg_ptr, angle);
    }
    /**
     * @param {number} value
     */
    setNormalNudgeFactor(value) {
        wasm.rawkinematiccharactercontroller_setNormalNudgeFactor(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    setOffset(value) {
        wasm.rawkinematiccharactercontroller_setOffset(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} enabled
     */
    setSlideEnabled(enabled) {
        wasm.rawkinematiccharactercontroller_setSlideEnabled(this.__wbg_ptr, enabled);
    }
    /**
     * @param {RawVector} vector
     */
    setUp(vector) {
        _assertClass(vector, RawVector);
        wasm.rawkinematiccharactercontroller_setUp(this.__wbg_ptr, vector.__wbg_ptr);
    }
    /**
     * @returns {boolean}
     */
    slideEnabled() {
        const ret = wasm.rawkinematiccharactercontroller_slideEnabled(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    snapToGroundDistance() {
        const ret = wasm.rawkinematiccharactercontroller_snapToGroundDistance(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    snapToGroundEnabled() {
        const ret = wasm.rawkinematiccharactercontroller_snapToGroundEnabled(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {RawVector}
     */
    up() {
        const ret = wasm.rawkinematiccharactercontroller_up(this.__wbg_ptr);
        return RawVector.__wrap(ret);
    }
}
if (Symbol.dispose) RawKinematicCharacterController.prototype[Symbol.dispose] = RawKinematicCharacterController.prototype.free;

/**
 * @enum {0 | 1}
 */
export const RawMotorModel = Object.freeze({
    AccelerationBased: 0, "0": "AccelerationBased",
    ForceBased: 1, "1": "ForceBased",
});

export class RawMultibodyJointSet {
    static __wrap(ptr) {
        const obj = Object.create(RawMultibodyJointSet.prototype);
        obj.__wbg_ptr = ptr;
        RawMultibodyJointSetFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawMultibodyJointSetFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawmultibodyjointset_free(ptr, 0);
    }
    /**
     * @param {number} handle
     * @returns {boolean}
     */
    contains(handle) {
        const ret = wasm.rawmultibodyjointset_contains(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * @param {RawGenericJoint} params
     * @param {number} parent1
     * @param {number} parent2
     * @param {boolean} wakeUp
     * @returns {number}
     */
    createJoint(params, parent1, parent2, wakeUp) {
        _assertClass(params, RawGenericJoint);
        const ret = wasm.rawmultibodyjointset_createJoint(this.__wbg_ptr, params.__wbg_ptr, parent1, parent2, wakeUp);
        return ret;
    }
    /**
     * Applies the given JavaScript function to the integer handle of each joint attached to the given rigid-body.
     *
     * # Parameters
     * - `f(handle)`: the function to apply to the integer handle of each joint attached to the rigid-body. Called as `f(collider)`.
     * @param {number} body
     * @param {Function} f
     */
    forEachJointAttachedToRigidBody(body, f) {
        try {
            wasm.rawmultibodyjointset_forEachJointAttachedToRigidBody(this.__wbg_ptr, body, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * Applies the given JavaScript function to the integer handle of each joint managed by this physics world.
     *
     * # Parameters
     * - `f(handle)`: the function to apply to the integer handle of each joint managed by this set. Called as `f(collider)`.
     * @param {Function} f
     */
    forEachJointHandle(f) {
        try {
            wasm.rawmultibodyjointset_forEachJointHandle(this.__wbg_ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The position of the first anchor of this joint.
     *
     * The first anchor gives the position of the points application point on the
     * local frame of the first rigid-body it is attached to.
     * @param {number} handle
     * @returns {RawVector}
     */
    jointAnchor1(handle) {
        const ret = wasm.rawmultibodyjointset_jointAnchor1(this.__wbg_ptr, handle);
        return RawVector.__wrap(ret);
    }
    /**
     * The position of the second anchor of this joint.
     *
     * The second anchor gives the position of the points application point on the
     * local frame of the second rigid-body it is attached to.
     * @param {number} handle
     * @returns {RawVector}
     */
    jointAnchor2(handle) {
        const ret = wasm.rawmultibodyjointset_jointAnchor2(this.__wbg_ptr, handle);
        return RawVector.__wrap(ret);
    }
    /**
     * Are contacts between the rigid-bodies attached by this joint enabled?
     * @param {number} handle
     * @returns {boolean}
     */
    jointContactsEnabled(handle) {
        const ret = wasm.rawmultibodyjointset_jointContactsEnabled(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * The angular part of the joint’s local frame relative to the first rigid-body it is attached to.
     * @param {number} handle
     * @returns {RawRotation}
     */
    jointFrameX1(handle) {
        const ret = wasm.rawmultibodyjointset_jointFrameX1(this.__wbg_ptr, handle);
        return RawRotation.__wrap(ret);
    }
    /**
     * The angular part of the joint’s local frame relative to the second rigid-body it is attached to.
     * @param {number} handle
     * @returns {RawRotation}
     */
    jointFrameX2(handle) {
        const ret = wasm.rawmultibodyjointset_jointFrameX2(this.__wbg_ptr, handle);
        return RawRotation.__wrap(ret);
    }
    /**
     * Are the limits for this joint enabled?
     * @param {number} handle
     * @param {RawJointAxis} axis
     * @returns {boolean}
     */
    jointLimitsEnabled(handle, axis) {
        const ret = wasm.rawmultibodyjointset_jointLimitsEnabled(this.__wbg_ptr, handle, axis);
        return ret !== 0;
    }
    /**
     * If this is a prismatic joint, returns its upper limit.
     * @param {number} handle
     * @param {RawJointAxis} axis
     * @returns {number}
     */
    jointLimitsMax(handle, axis) {
        const ret = wasm.rawmultibodyjointset_jointLimitsMax(this.__wbg_ptr, handle, axis);
        return ret;
    }
    /**
     * Return the lower limit along the given joint axis.
     * @param {number} handle
     * @param {RawJointAxis} axis
     * @returns {number}
     */
    jointLimitsMin(handle, axis) {
        const ret = wasm.rawmultibodyjointset_jointLimitsMin(this.__wbg_ptr, handle, axis);
        return ret;
    }
    /**
     * Sets whether contacts are enabled between the rigid-bodies attached by this joint.
     * @param {number} handle
     * @param {boolean} enabled
     */
    jointSetContactsEnabled(handle, enabled) {
        wasm.rawmultibodyjointset_jointSetContactsEnabled(this.__wbg_ptr, handle, enabled);
    }
    /**
     * The type of this joint.
     * @param {number} handle
     * @returns {RawJointType}
     */
    jointType(handle) {
        const ret = wasm.rawmultibodyjointset_jointType(this.__wbg_ptr, handle);
        return ret;
    }
    constructor() {
        const ret = wasm.rawmultibodyjointset_new();
        this.__wbg_ptr = ret;
        RawMultibodyJointSetFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} handle
     * @param {boolean} wakeUp
     */
    remove(handle, wakeUp) {
        wasm.rawmultibodyjointset_remove(this.__wbg_ptr, handle, wakeUp);
    }
}
if (Symbol.dispose) RawMultibodyJointSet.prototype[Symbol.dispose] = RawMultibodyJointSet.prototype.free;

export class RawNarrowPhase {
    static __wrap(ptr) {
        const obj = Object.create(RawNarrowPhase.prototype);
        obj.__wbg_ptr = ptr;
        RawNarrowPhaseFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawNarrowPhaseFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawnarrowphase_free(ptr, 0);
    }
    /**
     * @param {number} handle1
     * @param {number} handle2
     * @returns {RawContactPair | undefined}
     */
    contact_pair(handle1, handle2) {
        const ret = wasm.rawnarrowphase_contact_pair(this.__wbg_ptr, handle1, handle2);
        return ret === 0 ? undefined : RawContactPair.__wrap(ret);
    }
    /**
     * @param {number} handle1
     * @param {Function} f
     */
    contact_pairs_with(handle1, f) {
        wasm.rawnarrowphase_contact_pairs_with(this.__wbg_ptr, handle1, addHeapObject(f));
    }
    /**
     * @param {number} handle1
     * @param {number} handle2
     * @returns {boolean}
     */
    intersection_pair(handle1, handle2) {
        const ret = wasm.rawnarrowphase_intersection_pair(this.__wbg_ptr, handle1, handle2);
        return ret !== 0;
    }
    /**
     * @param {number} handle1
     * @param {Function} f
     */
    intersection_pairs_with(handle1, f) {
        wasm.rawnarrowphase_intersection_pairs_with(this.__wbg_ptr, handle1, addHeapObject(f));
    }
    constructor() {
        const ret = wasm.rawnarrowphase_new();
        this.__wbg_ptr = ret;
        RawNarrowPhaseFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) RawNarrowPhase.prototype[Symbol.dispose] = RawNarrowPhase.prototype.free;

export class RawPhysicsPipeline {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawPhysicsPipelineFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawphysicspipeline_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    is_profiler_enabled() {
        const ret = wasm.rawphysicspipeline_is_profiler_enabled(this.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.rawphysicspipeline_new();
        this.__wbg_ptr = ret;
        RawPhysicsPipelineFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {boolean} enabled
     */
    set_profiler_enabled(enabled) {
        wasm.rawphysicspipeline_set_profiler_enabled(this.__wbg_ptr, enabled);
    }
    /**
     * @param {RawVector} gravity
     * @param {RawIntegrationParameters} integrationParameters
     * @param {RawIslandManager} islands
     * @param {RawBroadPhase} broadPhase
     * @param {RawNarrowPhase} narrowPhase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawSoftBodySet} softBodies
     * @param {RawImpulseJointSet} joints
     * @param {RawMultibodyJointSet} articulations
     * @param {RawCCDSolver} ccd_solver
     * @param {RawEventQueue} eventQueue
     * @param {object} hookObject
     * @param {Function} hookFilterContactPair
     * @param {Function} hookFilterIntersectionPair
     */
    stepWithEvents(gravity, integrationParameters, islands, broadPhase, narrowPhase, bodies, colliders, softBodies, joints, articulations, ccd_solver, eventQueue, hookObject, hookFilterContactPair, hookFilterIntersectionPair) {
        _assertClass(gravity, RawVector);
        _assertClass(integrationParameters, RawIntegrationParameters);
        _assertClass(islands, RawIslandManager);
        _assertClass(broadPhase, RawBroadPhase);
        _assertClass(narrowPhase, RawNarrowPhase);
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(colliders, RawColliderSet);
        _assertClass(softBodies, RawSoftBodySet);
        _assertClass(joints, RawImpulseJointSet);
        _assertClass(articulations, RawMultibodyJointSet);
        _assertClass(ccd_solver, RawCCDSolver);
        _assertClass(eventQueue, RawEventQueue);
        wasm.rawphysicspipeline_stepWithEvents(this.__wbg_ptr, gravity.__wbg_ptr, integrationParameters.__wbg_ptr, islands.__wbg_ptr, broadPhase.__wbg_ptr, narrowPhase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, softBodies.__wbg_ptr, joints.__wbg_ptr, articulations.__wbg_ptr, ccd_solver.__wbg_ptr, eventQueue.__wbg_ptr, addHeapObject(hookObject), addHeapObject(hookFilterContactPair), addHeapObject(hookFilterIntersectionPair));
    }
    /**
     * @param {RawVector} gravity
     * @param {RawIntegrationParameters} integrationParameters
     * @param {RawIslandManager} islands
     * @param {RawBroadPhase} broadPhase
     * @param {RawNarrowPhase} narrowPhase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawSoftBodySet} softBodies
     * @param {RawImpulseJointSet} joints
     * @param {RawMultibodyJointSet} articulations
     * @param {RawCCDSolver} ccd_solver
     */
    step(gravity, integrationParameters, islands, broadPhase, narrowPhase, bodies, colliders, softBodies, joints, articulations, ccd_solver) {
        _assertClass(gravity, RawVector);
        _assertClass(integrationParameters, RawIntegrationParameters);
        _assertClass(islands, RawIslandManager);
        _assertClass(broadPhase, RawBroadPhase);
        _assertClass(narrowPhase, RawNarrowPhase);
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(colliders, RawColliderSet);
        _assertClass(softBodies, RawSoftBodySet);
        _assertClass(joints, RawImpulseJointSet);
        _assertClass(articulations, RawMultibodyJointSet);
        _assertClass(ccd_solver, RawCCDSolver);
        wasm.rawphysicspipeline_step(this.__wbg_ptr, gravity.__wbg_ptr, integrationParameters.__wbg_ptr, islands.__wbg_ptr, broadPhase.__wbg_ptr, narrowPhase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, softBodies.__wbg_ptr, joints.__wbg_ptr, articulations.__wbg_ptr, ccd_solver.__wbg_ptr);
    }
    /**
     * @returns {number}
     */
    timing_broad_phase() {
        const ret = wasm.rawphysicspipeline_timing_broad_phase(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_ccd() {
        const ret = wasm.rawphysicspipeline_timing_ccd(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_ccd_broad_phase() {
        const ret = wasm.rawphysicspipeline_timing_ccd_broad_phase(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_ccd_narrow_phase() {
        const ret = wasm.rawphysicspipeline_timing_ccd_narrow_phase(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_ccd_solver() {
        const ret = wasm.rawphysicspipeline_timing_ccd_solver(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_ccd_toi_computation() {
        const ret = wasm.rawphysicspipeline_timing_ccd_toi_computation(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_collision_detection() {
        const ret = wasm.rawphysicspipeline_timing_collision_detection(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_island_construction() {
        const ret = wasm.rawphysicspipeline_timing_island_construction(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_narrow_phase() {
        const ret = wasm.rawphysicspipeline_timing_narrow_phase(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_solver() {
        const ret = wasm.rawphysicspipeline_timing_solver(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_step() {
        const ret = wasm.rawphysicspipeline_timing_step(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_user_changes() {
        const ret = wasm.rawphysicspipeline_timing_user_changes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_velocity_assembly() {
        const ret = wasm.rawphysicspipeline_timing_velocity_assembly(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_velocity_resolution() {
        const ret = wasm.rawphysicspipeline_timing_velocity_resolution(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_velocity_update() {
        const ret = wasm.rawphysicspipeline_timing_velocity_update(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timing_velocity_writeback() {
        const ret = wasm.rawphysicspipeline_timing_velocity_writeback(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) RawPhysicsPipeline.prototype[Symbol.dispose] = RawPhysicsPipeline.prototype.free;

export class RawPidController {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawPidControllerFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawpidcontroller_free(ptr, 0);
    }
    /**
     * @param {number} dt
     * @param {RawRigidBodySet} bodies
     * @param {number} rb_handle
     * @param {RawRotation} target_rotation
     * @param {RawVector} target_angvel
     * @param {Float32Array} scratch_buffer
     */
    angular_correction(dt, bodies, rb_handle, target_rotation, target_angvel, scratch_buffer) {
        try {
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(target_rotation, RawRotation);
            _assertClass(target_angvel, RawVector);
            wasm.rawpidcontroller_angular_correction(this.__wbg_ptr, dt, bodies.__wbg_ptr, rb_handle, target_rotation.__wbg_ptr, target_angvel.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} dt
     * @param {RawRigidBodySet} bodies
     * @param {number} rb_handle
     * @param {RawRotation} target_rotation
     * @param {RawVector} target_angvel
     */
    apply_angular_correction(dt, bodies, rb_handle, target_rotation, target_angvel) {
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(target_rotation, RawRotation);
        _assertClass(target_angvel, RawVector);
        wasm.rawpidcontroller_apply_angular_correction(this.__wbg_ptr, dt, bodies.__wbg_ptr, rb_handle, target_rotation.__wbg_ptr, target_angvel.__wbg_ptr);
    }
    /**
     * @param {number} dt
     * @param {RawRigidBodySet} bodies
     * @param {number} rb_handle
     * @param {RawVector} target_translation
     * @param {RawVector} target_linvel
     */
    apply_linear_correction(dt, bodies, rb_handle, target_translation, target_linvel) {
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(target_translation, RawVector);
        _assertClass(target_linvel, RawVector);
        wasm.rawpidcontroller_apply_linear_correction(this.__wbg_ptr, dt, bodies.__wbg_ptr, rb_handle, target_translation.__wbg_ptr, target_linvel.__wbg_ptr);
    }
    /**
     * @param {number} dt
     * @param {RawRigidBodySet} bodies
     * @param {number} rb_handle
     * @param {RawVector} target_translation
     * @param {RawVector} target_linvel
     * @param {Float32Array} scratch_buffer
     */
    linear_correction(dt, bodies, rb_handle, target_translation, target_linvel, scratch_buffer) {
        try {
            _assertClass(bodies, RawRigidBodySet);
            _assertClass(target_translation, RawVector);
            _assertClass(target_linvel, RawVector);
            wasm.rawpidcontroller_linear_correction(this.__wbg_ptr, dt, bodies.__wbg_ptr, rb_handle, target_translation.__wbg_ptr, target_linvel.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} kp
     * @param {number} ki
     * @param {number} kd
     * @param {number} axes_mask
     */
    constructor(kp, ki, kd, axes_mask) {
        const ret = wasm.rawpidcontroller_new(kp, ki, kd, axes_mask);
        this.__wbg_ptr = ret;
        RawPidControllerFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    reset_integrals() {
        wasm.rawpidcontroller_reset_integrals(this.__wbg_ptr);
    }
    /**
     * @param {number} axes_mask
     */
    set_axes_mask(axes_mask) {
        wasm.rawpidcontroller_set_axes_mask(this.__wbg_ptr, axes_mask);
    }
    /**
     * @param {number} kd
     * @param {number} axes
     */
    set_kd(kd, axes) {
        wasm.rawpidcontroller_set_kd(this.__wbg_ptr, kd, axes);
    }
    /**
     * @param {number} ki
     * @param {number} axes
     */
    set_ki(ki, axes) {
        wasm.rawpidcontroller_set_ki(this.__wbg_ptr, ki, axes);
    }
    /**
     * @param {number} kp
     * @param {number} axes
     */
    set_kp(kp, axes) {
        wasm.rawpidcontroller_set_kp(this.__wbg_ptr, kp, axes);
    }
}
if (Symbol.dispose) RawPidController.prototype[Symbol.dispose] = RawPidController.prototype.free;

export class RawPointColliderProjection {
    static __wrap(ptr) {
        const obj = Object.create(RawPointColliderProjection.prototype);
        obj.__wbg_ptr = ptr;
        RawPointColliderProjectionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawPointColliderProjectionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawpointcolliderprojection_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    colliderHandle() {
        const ret = wasm.rawpointcolliderprojection_colliderHandle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    featureId() {
        const ret = wasm.rawpointcolliderprojection_featureId(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {RawFeatureType}
     */
    featureType() {
        const ret = wasm.rawpointcolliderprojection_featureType(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    isInside() {
        const ret = wasm.rawpointcolliderprojection_isInside(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Writes the projected point components into the given scratch buffer.
     * @param {Float32Array} scratch_buffer
     */
    point(scratch_buffer) {
        try {
            wasm.rawpointcolliderprojection_point(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
if (Symbol.dispose) RawPointColliderProjection.prototype[Symbol.dispose] = RawPointColliderProjection.prototype.free;

export class RawPointProjection {
    static __wrap(ptr) {
        const obj = Object.create(RawPointProjection.prototype);
        obj.__wbg_ptr = ptr;
        RawPointProjectionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawPointProjectionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawpointprojection_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    isInside() {
        const ret = wasm.rawpointprojection_isInside(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Writes the projected point components into the given scratch buffer.
     * @param {Float32Array} scratch_buffer
     */
    point(scratch_buffer) {
        try {
            wasm.rawpointprojection_point(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
if (Symbol.dispose) RawPointProjection.prototype[Symbol.dispose] = RawPointProjection.prototype.free;

export class RawRayColliderHit {
    static __wrap(ptr) {
        const obj = Object.create(RawRayColliderHit.prototype);
        obj.__wbg_ptr = ptr;
        RawRayColliderHitFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawRayColliderHitFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawraycolliderhit_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    colliderHandle() {
        const ret = wasm.rawraycolliderhit_colliderHandle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    timeOfImpact() {
        const ret = wasm.rawraycolliderhit_timeOfImpact(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) RawRayColliderHit.prototype[Symbol.dispose] = RawRayColliderHit.prototype.free;

export class RawRayColliderIntersection {
    static __wrap(ptr) {
        const obj = Object.create(RawRayColliderIntersection.prototype);
        obj.__wbg_ptr = ptr;
        RawRayColliderIntersectionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawRayColliderIntersectionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawraycolliderintersection_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    colliderHandle() {
        const ret = wasm.rawraycolliderintersection_colliderHandle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    featureId() {
        const ret = wasm.rawraycolliderintersection_featureId(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {RawFeatureType}
     */
    featureType() {
        const ret = wasm.rawraycolliderintersection_featureType(this.__wbg_ptr);
        return ret;
    }
    /**
     * Writes the hit normal components into the given scratch buffer.
     * @param {Float32Array} scratch_buffer
     */
    normal(scratch_buffer) {
        try {
            wasm.rawraycolliderintersection_normal(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @returns {number}
     */
    time_of_impact() {
        const ret = wasm.rawraycolliderintersection_time_of_impact(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) RawRayColliderIntersection.prototype[Symbol.dispose] = RawRayColliderIntersection.prototype.free;

export class RawRayIntersection {
    static __wrap(ptr) {
        const obj = Object.create(RawRayIntersection.prototype);
        obj.__wbg_ptr = ptr;
        RawRayIntersectionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawRayIntersectionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawrayintersection_free(ptr, 0);
    }
    /**
     * @returns {number | undefined}
     */
    featureId() {
        const ret = wasm.rawrayintersection_featureId(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {RawFeatureType}
     */
    featureType() {
        const ret = wasm.rawrayintersection_featureType(this.__wbg_ptr);
        return ret;
    }
    /**
     * Writes the hit normal components into the given scratch buffer.
     * @param {Float32Array} scratch_buffer
     */
    normal(scratch_buffer) {
        try {
            wasm.rawrayintersection_normal(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @returns {number}
     */
    time_of_impact() {
        const ret = wasm.rawrayintersection_time_of_impact(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) RawRayIntersection.prototype[Symbol.dispose] = RawRayIntersection.prototype.free;

export class RawRigidBodySet {
    static __wrap(ptr) {
        const obj = Object.create(RawRigidBodySet.prototype);
        obj.__wbg_ptr = ptr;
        RawRigidBodySetFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawRigidBodySetFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawrigidbodyset_free(ptr, 0);
    }
    /**
     * Checks if a rigid-body with the given integer handle exists.
     * @param {number} handle
     * @returns {boolean}
     */
    contains(handle) {
        const ret = wasm.rawrigidbodyset_contains(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * @param {boolean} enabled
     * @param {RawVector} translation
     * @param {RawRotation} rotation
     * @param {number} gravityScale
     * @param {number} mass
     * @param {boolean} massOnly
     * @param {RawVector} centerOfMass
     * @param {RawVector} linvel
     * @param {RawVector} angvel
     * @param {RawVector} principalAngularInertia
     * @param {RawRotation} angularInertiaFrame
     * @param {boolean} translationEnabledX
     * @param {boolean} translationEnabledY
     * @param {boolean} translationEnabledZ
     * @param {boolean} rotationEnabledX
     * @param {boolean} rotationEnabledY
     * @param {boolean} rotationEnabledZ
     * @param {number} linearDamping
     * @param {number} angularDamping
     * @param {RawRigidBodyType} rb_type
     * @param {boolean} canSleep
     * @param {boolean} sleeping
     * @param {number} softCcdPrediction
     * @param {boolean} ccdEnabled
     * @param {number} dominanceGroup
     * @param {number} additional_solver_iterations
     * @param {number} additional_pgs_iterations
     * @returns {number}
     */
    createRigidBody(enabled, translation, rotation, gravityScale, mass, massOnly, centerOfMass, linvel, angvel, principalAngularInertia, angularInertiaFrame, translationEnabledX, translationEnabledY, translationEnabledZ, rotationEnabledX, rotationEnabledY, rotationEnabledZ, linearDamping, angularDamping, rb_type, canSleep, sleeping, softCcdPrediction, ccdEnabled, dominanceGroup, additional_solver_iterations, additional_pgs_iterations) {
        _assertClass(translation, RawVector);
        _assertClass(rotation, RawRotation);
        _assertClass(centerOfMass, RawVector);
        _assertClass(linvel, RawVector);
        _assertClass(angvel, RawVector);
        _assertClass(principalAngularInertia, RawVector);
        _assertClass(angularInertiaFrame, RawRotation);
        const ret = wasm.rawrigidbodyset_createRigidBody(this.__wbg_ptr, enabled, translation.__wbg_ptr, rotation.__wbg_ptr, gravityScale, mass, massOnly, centerOfMass.__wbg_ptr, linvel.__wbg_ptr, angvel.__wbg_ptr, principalAngularInertia.__wbg_ptr, angularInertiaFrame.__wbg_ptr, translationEnabledX, translationEnabledY, translationEnabledZ, rotationEnabledX, rotationEnabledY, rotationEnabledZ, linearDamping, angularDamping, rb_type, canSleep, sleeping, softCcdPrediction, ccdEnabled, dominanceGroup, additional_solver_iterations, additional_pgs_iterations);
        return ret;
    }
    /**
     * Applies the given JavaScript function to the integer handle of each rigid-body managed by this set.
     *
     * # Parameters
     * - `f(handle)`: the function to apply to the integer handle of each rigid-body managed by this set. Called as `f(collider)`.
     * @param {Function} f
     */
    forEachRigidBodyHandle(f) {
        try {
            wasm.rawrigidbodyset_forEachRigidBodyHandle(this.__wbg_ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The number of rigid-bodies on this set.
     * @returns {number}
     */
    len() {
        const ret = wasm.rawrigidbodyset_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    constructor() {
        const ret = wasm.rawrigidbodyset_new();
        this.__wbg_ptr = ret;
        RawRigidBodySetFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {RawColliderSet} colliders
     */
    propagateModifiedBodyPositionsToColliders(colliders) {
        _assertClass(colliders, RawColliderSet);
        wasm.rawrigidbodyset_propagateModifiedBodyPositionsToColliders(this.__wbg_ptr, colliders.__wbg_ptr);
    }
    /**
     * Adds a force at the given world-space point of this rigid-body.
     *
     * # Parameters
     * - `force`: the world-space force to apply on the rigid-body.
     * - `point`: the world-space point where the impulse is to be applied on the rigid-body.
     * - `wakeUp`: should the rigid-body be automatically woken-up?
     * @param {number} handle
     * @param {RawVector} force
     * @param {RawVector} point
     * @param {boolean} wakeUp
     */
    rbAddForceAtPoint(handle, force, point, wakeUp) {
        _assertClass(force, RawVector);
        _assertClass(point, RawVector);
        wasm.rawrigidbodyset_rbAddForceAtPoint(this.__wbg_ptr, handle, force.__wbg_ptr, point.__wbg_ptr, wakeUp);
    }
    /**
     * Adds a force at the center-of-mass of this rigid-body.
     *
     * # Parameters
     * - `force`: the world-space force to apply on the rigid-body.
     * - `wakeUp`: should the rigid-body be automatically woken-up?
     * @param {number} handle
     * @param {RawVector} force
     * @param {boolean} wakeUp
     */
    rbAddForce(handle, force, wakeUp) {
        _assertClass(force, RawVector);
        wasm.rawrigidbodyset_rbAddForce(this.__wbg_ptr, handle, force.__wbg_ptr, wakeUp);
    }
    /**
     * Adds a torque at the center-of-mass of this rigid-body.
     *
     * # Parameters
     * - `torque`: the world-space torque to apply on the rigid-body.
     * - `wakeUp`: should the rigid-body be automatically woken-up?
     * @param {number} handle
     * @param {RawVector} torque
     * @param {boolean} wakeUp
     */
    rbAddTorque(handle, torque, wakeUp) {
        _assertClass(torque, RawVector);
        wasm.rawrigidbodyset_rbAddTorque(this.__wbg_ptr, handle, torque.__wbg_ptr, wakeUp);
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    rbAdditionalPgsIterations(handle) {
        const ret = wasm.rawrigidbodyset_rbAdditionalPgsIterations(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    rbAdditionalSolverIterations(handle) {
        const ret = wasm.rawrigidbodyset_rbAdditionalSolverIterations(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * The angular damping coefficient of this rigid-body.
     * @param {number} handle
     * @returns {number}
     */
    rbAngularDamping(handle) {
        const ret = wasm.rawrigidbodyset_rbAngularDamping(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * The angular velocity of this rigid-body.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbAngvel(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbAngvel(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * Applies an impulse at the given world-space point of this rigid-body.
     *
     * # Parameters
     * - `impulse`: the world-space impulse to apply on the rigid-body.
     * - `point`: the world-space point where the impulse is to be applied on the rigid-body.
     * - `wakeUp`: should the rigid-body be automatically woken-up?
     * @param {number} handle
     * @param {RawVector} impulse
     * @param {RawVector} point
     * @param {boolean} wakeUp
     */
    rbApplyImpulseAtPoint(handle, impulse, point, wakeUp) {
        _assertClass(impulse, RawVector);
        _assertClass(point, RawVector);
        wasm.rawrigidbodyset_rbApplyImpulseAtPoint(this.__wbg_ptr, handle, impulse.__wbg_ptr, point.__wbg_ptr, wakeUp);
    }
    /**
     * Applies an impulse at the center-of-mass of this rigid-body.
     *
     * # Parameters
     * - `impulse`: the world-space impulse to apply on the rigid-body.
     * - `wakeUp`: should the rigid-body be automatically woken-up?
     * @param {number} handle
     * @param {RawVector} impulse
     * @param {boolean} wakeUp
     */
    rbApplyImpulse(handle, impulse, wakeUp) {
        _assertClass(impulse, RawVector);
        wasm.rawrigidbodyset_rbApplyImpulse(this.__wbg_ptr, handle, impulse.__wbg_ptr, wakeUp);
    }
    /**
     * Applies an impulsive torque at the center-of-mass of this rigid-body.
     *
     * # Parameters
     * - `torque impulse`: the world-space torque impulse to apply on the rigid-body.
     * - `wakeUp`: should the rigid-body be automatically woken-up?
     * @param {number} handle
     * @param {RawVector} torque_impulse
     * @param {boolean} wakeUp
     */
    rbApplyTorqueImpulse(handle, torque_impulse, wakeUp) {
        _assertClass(torque_impulse, RawVector);
        wasm.rawrigidbodyset_rbApplyTorqueImpulse(this.__wbg_ptr, handle, torque_impulse.__wbg_ptr, wakeUp);
    }
    /**
     * The status of this rigid-body: fixed, dynamic, or kinematic.
     * @param {number} handle
     * @returns {RawRigidBodyType}
     */
    rbBodyType(handle) {
        const ret = wasm.rawrigidbodyset_rbBodyType(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * Retrieves the `i-th` collider attached to this rigid-body.
     *
     * # Parameters
     * - `at`: The index of the collider to retrieve. Must be a number in `[0, this.numColliders()[`.
     *         This index is **not** the same as the unique identifier of the collider.
     * @param {number} handle
     * @param {number} at
     * @returns {number}
     */
    rbCollider(handle, at) {
        const ret = wasm.rawrigidbodyset_rbCollider(this.__wbg_ptr, handle, at);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    rbDominanceGroup(handle) {
        const ret = wasm.rawrigidbodyset_rbDominanceGroup(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * The effective world-space angular inertia (that takes the potential rotation locking into account) of
     * this rigid-body.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbEffectiveAngularInertia(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbEffectiveAngularInertia(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The inverse mass taking into account translation locking.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbEffectiveInvMass(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbEffectiveInvMass(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The world-space inverse angular inertia tensor of the rigid-body,
     * taking into account rotation locking.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbEffectiveWorldInvInertia(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbEffectiveWorldInvInertia(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} handle
     * @param {boolean} enabled
     */
    rbEnableCcd(handle, enabled) {
        wasm.rawrigidbodyset_rbEnableCcd(this.__wbg_ptr, handle, enabled);
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    rbGravityScale(handle) {
        const ret = wasm.rawrigidbodyset_rbGravityScale(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * The inverse of the mass of a rigid-body.
     *
     * If this is zero, the rigid-body is assumed to have infinite mass.
     * @param {number} handle
     * @returns {number}
     */
    rbInvMass(handle) {
        const ret = wasm.rawrigidbodyset_rbInvMass(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * The inverse of the principal angular inertia of the rigid-body.
     *
     * Components set to zero are assumed to be infinite along the corresponding principal axis.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbInvPrincipalInertia(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbInvPrincipalInertia(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * Is Continuous Collision Detection enabled for this rigid-body?
     * @param {number} handle
     * @returns {boolean}
     */
    rbIsCcdEnabled(handle) {
        const ret = wasm.rawrigidbodyset_rbIsCcdEnabled(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * Is this rigid-body dynamic?
     * @param {number} handle
     * @returns {boolean}
     */
    rbIsDynamic(handle) {
        const ret = wasm.rawrigidbodyset_rbIsDynamic(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @returns {boolean}
     */
    rbIsEnabled(handle) {
        const ret = wasm.rawrigidbodyset_rbIsEnabled(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * Is this rigid-body fixed?
     * @param {number} handle
     * @returns {boolean}
     */
    rbIsFixed(handle) {
        const ret = wasm.rawrigidbodyset_rbIsFixed(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * Is this rigid-body kinematic?
     * @param {number} handle
     * @returns {boolean}
     */
    rbIsKinematic(handle) {
        const ret = wasm.rawrigidbodyset_rbIsKinematic(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * Is the velocity of this rigid-body not zero?
     * @param {number} handle
     * @returns {boolean}
     */
    rbIsMoving(handle) {
        const ret = wasm.rawrigidbodyset_rbIsMoving(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * Is this rigid-body sleeping?
     * @param {number} handle
     * @returns {boolean}
     */
    rbIsSleeping(handle) {
        const ret = wasm.rawrigidbodyset_rbIsSleeping(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * Is this rigid-body the proxy of a soft-body cluster?
     * @param {number} handle
     * @returns {boolean}
     */
    rbIsSoftFrame(handle) {
        const ret = wasm.rawrigidbodyset_rbIsSoftFrame(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * The linear damping coefficient of this rigid-body.
     * @param {number} handle
     * @returns {number}
     */
    rbLinearDamping(handle) {
        const ret = wasm.rawrigidbodyset_rbLinearDamping(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * The linear velocity of this rigid-body.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbLinvel(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbLinvel(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The center of mass of a rigid-body expressed in its local-space.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbLocalCom(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbLocalCom(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} handle
     * @param {boolean} locked
     * @param {boolean} wake_up
     */
    rbLockRotations(handle, locked, wake_up) {
        wasm.rawrigidbodyset_rbLockRotations(this.__wbg_ptr, handle, locked, wake_up);
    }
    /**
     * @param {number} handle
     * @param {boolean} locked
     * @param {boolean} wake_up
     */
    rbLockTranslations(handle, locked, wake_up) {
        wasm.rawrigidbodyset_rbLockTranslations(this.__wbg_ptr, handle, locked, wake_up);
    }
    /**
     * The mass of this rigid-body.
     * @param {number} handle
     * @returns {number}
     */
    rbMass(handle) {
        const ret = wasm.rawrigidbodyset_rbMass(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * The world-space predicted orientation of this rigid-body.
     *
     * If this rigid-body is kinematic this value is set by the `setNextKinematicRotation`
     * method and is used for estimating the kinematic body velocity at the next timestep.
     * For non-kinematic bodies, this value is currently unspecified.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbNextRotation(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbNextRotation(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The world-space predicted translation of this rigid-body.
     *
     * If this rigid-body is kinematic this value is set by the `setNextKinematicTranslation`
     * method and is used for estimating the kinematic body velocity at the next timestep.
     * For non-kinematic bodies, this value is currently unspecified.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbNextTranslation(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbNextTranslation(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The number of colliders attached to this rigid-body.
     * @param {number} handle
     * @returns {number}
     */
    rbNumColliders(handle) {
        const ret = wasm.rawrigidbodyset_rbNumColliders(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * The principal vectors of the local angular inertia tensor of the rigid-body.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbPrincipalInertiaLocalFrame(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbPrincipalInertiaLocalFrame(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The angular inertia along the principal inertia axes of the rigid-body.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbPrincipalInertia(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbPrincipalInertia(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} handle
     * @param {RawColliderSet} colliders
     */
    rbRecomputeMassPropertiesFromColliders(handle, colliders) {
        _assertClass(colliders, RawColliderSet);
        wasm.rawrigidbodyset_rbRecomputeMassPropertiesFromColliders(this.__wbg_ptr, handle, colliders.__wbg_ptr);
    }
    /**
     * Resets to zero all user-added forces added to this rigid-body.
     * @param {number} handle
     * @param {boolean} wakeUp
     */
    rbResetForces(handle, wakeUp) {
        wasm.rawrigidbodyset_rbResetForces(this.__wbg_ptr, handle, wakeUp);
    }
    /**
     * Resets to zero all user-added torques added to this rigid-body.
     * @param {number} handle
     * @param {boolean} wakeUp
     */
    rbResetTorques(handle, wakeUp) {
        wasm.rawrigidbodyset_rbResetTorques(this.__wbg_ptr, handle, wakeUp);
    }
    /**
     * The world-space orientation of this rigid-body.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbRotation(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbRotation(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} handle
     * @param {number} mass
     * @param {RawVector} centerOfMass
     * @param {RawVector} principalAngularInertia
     * @param {RawRotation} angularInertiaFrame
     * @param {boolean} wake_up
     */
    rbSetAdditionalMassProperties(handle, mass, centerOfMass, principalAngularInertia, angularInertiaFrame, wake_up) {
        _assertClass(centerOfMass, RawVector);
        _assertClass(principalAngularInertia, RawVector);
        _assertClass(angularInertiaFrame, RawRotation);
        wasm.rawrigidbodyset_rbSetAdditionalMassProperties(this.__wbg_ptr, handle, mass, centerOfMass.__wbg_ptr, principalAngularInertia.__wbg_ptr, angularInertiaFrame.__wbg_ptr, wake_up);
    }
    /**
     * @param {number} handle
     * @param {number} mass
     * @param {boolean} wake_up
     */
    rbSetAdditionalMass(handle, mass, wake_up) {
        wasm.rawrigidbodyset_rbSetAdditionalMass(this.__wbg_ptr, handle, mass, wake_up);
    }
    /**
     * @param {number} handle
     * @param {number} iters
     */
    rbSetAdditionalPgsIterations(handle, iters) {
        wasm.rawrigidbodyset_rbSetAdditionalPgsIterations(this.__wbg_ptr, handle, iters);
    }
    /**
     * @param {number} handle
     * @param {number} iters
     */
    rbSetAdditionalSolverIterations(handle, iters) {
        wasm.rawrigidbodyset_rbSetAdditionalSolverIterations(this.__wbg_ptr, handle, iters);
    }
    /**
     * @param {number} handle
     * @param {number} factor
     */
    rbSetAngularDamping(handle, factor) {
        wasm.rawrigidbodyset_rbSetAngularDamping(this.__wbg_ptr, handle, factor);
    }
    /**
     * Sets the angular velocity of this rigid-body.
     * @param {number} handle
     * @param {RawVector} angvel
     * @param {boolean} wakeUp
     */
    rbSetAngvel(handle, angvel, wakeUp) {
        _assertClass(angvel, RawVector);
        wasm.rawrigidbodyset_rbSetAngvel(this.__wbg_ptr, handle, angvel.__wbg_ptr, wakeUp);
    }
    /**
     * Set a new status for this rigid-body: fixed, dynamic, or kinematic.
     * @param {number} handle
     * @param {RawRigidBodyType} status
     * @param {boolean} wake_up
     */
    rbSetBodyType(handle, status, wake_up) {
        wasm.rawrigidbodyset_rbSetBodyType(this.__wbg_ptr, handle, status, wake_up);
    }
    /**
     * @param {number} handle
     * @param {number} group
     */
    rbSetDominanceGroup(handle, group) {
        wasm.rawrigidbodyset_rbSetDominanceGroup(this.__wbg_ptr, handle, group);
    }
    /**
     * @param {number} handle
     * @param {boolean} allow_x
     * @param {boolean} allow_y
     * @param {boolean} allow_z
     * @param {boolean} wake_up
     */
    rbSetEnabledRotations(handle, allow_x, allow_y, allow_z, wake_up) {
        wasm.rawrigidbodyset_rbSetEnabledRotations(this.__wbg_ptr, handle, allow_x, allow_y, allow_z, wake_up);
    }
    /**
     * @param {number} handle
     * @param {boolean} allow_x
     * @param {boolean} allow_y
     * @param {boolean} allow_z
     * @param {boolean} wake_up
     */
    rbSetEnabledTranslations(handle, allow_x, allow_y, allow_z, wake_up) {
        wasm.rawrigidbodyset_rbSetEnabledTranslations(this.__wbg_ptr, handle, allow_x, allow_y, allow_z, wake_up);
    }
    /**
     * @param {number} handle
     * @param {boolean} enabled
     */
    rbSetEnabled(handle, enabled) {
        wasm.rawrigidbodyset_rbSetEnabled(this.__wbg_ptr, handle, enabled);
    }
    /**
     * @param {number} handle
     * @param {number} factor
     * @param {boolean} wakeUp
     */
    rbSetGravityScale(handle, factor, wakeUp) {
        wasm.rawrigidbodyset_rbSetGravityScale(this.__wbg_ptr, handle, factor, wakeUp);
    }
    /**
     * @param {number} handle
     * @param {number} factor
     */
    rbSetLinearDamping(handle, factor) {
        wasm.rawrigidbodyset_rbSetLinearDamping(this.__wbg_ptr, handle, factor);
    }
    /**
     * Sets the linear velocity of this rigid-body.
     * @param {number} handle
     * @param {RawVector} linvel
     * @param {boolean} wakeUp
     */
    rbSetLinvel(handle, linvel, wakeUp) {
        _assertClass(linvel, RawVector);
        wasm.rawrigidbodyset_rbSetLinvel(this.__wbg_ptr, handle, linvel.__wbg_ptr, wakeUp);
    }
    /**
     * If this rigid body is kinematic, sets its future rotation after the next timestep integration.
     *
     * This should be used instead of `rigidBody.setRotation` to make the dynamic object
     * interacting with this kinematic body behave as expected. Internally, Rapier will compute
     * an artificial velocity for this rigid-body from its current position and its next kinematic
     * position. This velocity will be used to compute forces on dynamic bodies interacting with
     * this body.
     *
     * # Parameters
     * - `x`: the first vector component of the quaternion.
     * - `y`: the second vector component of the quaternion.
     * - `z`: the third vector component of the quaternion.
     * - `w`: the scalar component of the quaternion.
     * @param {number} handle
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} w
     */
    rbSetNextKinematicRotation(handle, x, y, z, w) {
        wasm.rawrigidbodyset_rbSetNextKinematicRotation(this.__wbg_ptr, handle, x, y, z, w);
    }
    /**
     * If this rigid body is kinematic, sets its future translation after the next timestep integration.
     *
     * This should be used instead of `rigidBody.setTranslation` to make the dynamic object
     * interacting with this kinematic body behave as expected. Internally, Rapier will compute
     * an artificial velocity for this rigid-body from its current position and its next kinematic
     * position. This velocity will be used to compute forces on dynamic bodies interacting with
     * this body.
     *
     * # Parameters
     * - `x`: the world-space position of the rigid-body along the `x` axis.
     * - `y`: the world-space position of the rigid-body along the `y` axis.
     * - `z`: the world-space position of the rigid-body along the `z` axis.
     * @param {number} handle
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    rbSetNextKinematicTranslation(handle, x, y, z) {
        wasm.rawrigidbodyset_rbSetNextKinematicTranslation(this.__wbg_ptr, handle, x, y, z);
    }
    /**
     * Sets the rotation quaternion of this rigid-body.
     *
     * This does nothing if a zero quaternion is provided.
     *
     * # Parameters
     * - `x`: the first vector component of the quaternion.
     * - `y`: the second vector component of the quaternion.
     * - `z`: the third vector component of the quaternion.
     * - `w`: the scalar component of the quaternion.
     * - `wakeUp`: forces the rigid-body to wake-up so it is properly affected by forces if it
     * wasn't moving before modifying its position.
     * @param {number} handle
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} w
     * @param {boolean} wakeUp
     */
    rbSetRotation(handle, x, y, z, w, wakeUp) {
        wasm.rawrigidbodyset_rbSetRotation(this.__wbg_ptr, handle, x, y, z, w, wakeUp);
    }
    /**
     * @param {number} handle
     * @param {number} prediction
     */
    rbSetSoftCcdPrediction(handle, prediction) {
        wasm.rawrigidbodyset_rbSetSoftCcdPrediction(this.__wbg_ptr, handle, prediction);
    }
    /**
     * Sets the translation of this rigid-body.
     *
     * # Parameters
     * - `x`: the world-space position of the rigid-body along the `x` axis.
     * - `y`: the world-space position of the rigid-body along the `y` axis.
     * - `z`: the world-space position of the rigid-body along the `z` axis.
     * - `wakeUp`: forces the rigid-body to wake-up so it is properly affected by forces if it
     * wasn't moving before modifying its position.
     * @param {number} handle
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {boolean} wakeUp
     */
    rbSetTranslation(handle, x, y, z, wakeUp) {
        wasm.rawrigidbodyset_rbSetTranslation(this.__wbg_ptr, handle, x, y, z, wakeUp);
    }
    /**
     * Sets the user-defined 32-bit integer of this rigid-body.
     *
     * # Parameters
     * - `data`: an arbitrary user-defined 32-bit integer.
     * @param {number} handle
     * @param {number} data
     */
    rbSetUserData(handle, data) {
        wasm.rawrigidbodyset_rbSetUserData(this.__wbg_ptr, handle, data);
    }
    /**
     * Put the given rigid-body to sleep.
     * @param {number} handle
     */
    rbSleep(handle) {
        wasm.rawrigidbodyset_rbSleep(this.__wbg_ptr, handle);
    }
    /**
     * The soft body this rigid-body is a cluster proxy of, if any.
     * @param {number} handle
     * @returns {number | undefined}
     */
    rbSoftBody(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawrigidbodyset_rbSoftBody(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getFloat64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    rbSoftCcdPrediction(handle) {
        const ret = wasm.rawrigidbodyset_rbSoftCcdPrediction(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * The index of the cluster this proxy stands for in its soft body, if any.
     * @param {number} handle
     * @returns {number | undefined}
     */
    rbSoftCluster(handle) {
        const ret = wasm.rawrigidbodyset_rbSoftCluster(this.__wbg_ptr, handle);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * The world-space translation of this rigid-body.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbTranslation(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbTranslation(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * An arbitrary user-defined 32-bit integer
     * @param {number} handle
     * @returns {number}
     */
    rbUserData(handle) {
        const ret = wasm.rawrigidbodyset_rbUserData(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * Retrieves the constant force(s) the user added to this rigid-body.
     * Returns zero if the rigid-body is not dynamic.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbUserForce(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbUserForce(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * Retrieves the constant torque(s) the user added to this rigid-body.
     * Returns zero if the rigid-body is not dynamic.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbUserTorque(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbUserTorque(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * The velocity of the given world-space point on this rigid-body.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {RawVector} point
     * @param {Float32Array} scratch_buffer
     */
    rbVelocityAtPoint(handle, point, scratch_buffer) {
        try {
            _assertClass(point, RawVector);
            wasm.rawrigidbodyset_rbVelocityAtPoint(this.__wbg_ptr, handle, point.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * Wakes this rigid-body up.
     *
     * A dynamic rigid-body that does not move during several consecutive frames will
     * be put to sleep by the physics engine, i.e., it will stop being simulated in order
     * to avoid useless computations.
     * This method forces a sleeping rigid-body to wake-up. This is useful, e.g., before modifying
     * the position of a dynamic body so that it is properly simulated afterwards.
     * @param {number} handle
     */
    rbWakeUp(handle) {
        wasm.rawrigidbodyset_rbWakeUp(this.__wbg_ptr, handle);
    }
    /**
     * The world-space center of mass of the rigid-body.
     *
     * # Parameters
     * - `scratch_buffer`: The array to be populated.
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    rbWorldCom(handle, scratch_buffer) {
        try {
            wasm.rawrigidbodyset_rbWorldCom(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} handle
     * @param {RawIslandManager} islands
     * @param {RawColliderSet} colliders
     * @param {RawSoftBodySet} softBodies
     * @param {RawImpulseJointSet} joints
     * @param {RawMultibodyJointSet} articulations
     */
    remove(handle, islands, colliders, softBodies, joints, articulations) {
        _assertClass(islands, RawIslandManager);
        _assertClass(colliders, RawColliderSet);
        _assertClass(softBodies, RawSoftBodySet);
        _assertClass(joints, RawImpulseJointSet);
        _assertClass(articulations, RawMultibodyJointSet);
        wasm.rawrigidbodyset_remove(this.__wbg_ptr, handle, islands.__wbg_ptr, colliders.__wbg_ptr, softBodies.__wbg_ptr, joints.__wbg_ptr, articulations.__wbg_ptr);
    }
}
if (Symbol.dispose) RawRigidBodySet.prototype[Symbol.dispose] = RawRigidBodySet.prototype.free;

/**
 * @enum {0 | 1 | 2 | 3 | 4}
 */
export const RawRigidBodyType = Object.freeze({
    Dynamic: 0, "0": "Dynamic",
    Fixed: 1, "1": "Fixed",
    KinematicPositionBased: 2, "2": "KinematicPositionBased",
    KinematicVelocityBased: 3, "3": "KinematicVelocityBased",
    SoftFrame: 4, "4": "SoftFrame",
});

/**
 * A rotation quaternion.
 */
export class RawRotation {
    static __wrap(ptr) {
        const obj = Object.create(RawRotation.prototype);
        obj.__wbg_ptr = ptr;
        RawRotationFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawRotationFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawrotation_free(ptr, 0);
    }
    /**
     * The identity quaternion.
     * @returns {RawRotation}
     */
    static identity() {
        const ret = wasm.rawrotation_identity();
        return RawRotation.__wrap(ret);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} w
     */
    constructor(x, y, z, w) {
        const ret = wasm.rawrotation_new(x, y, z, w);
        this.__wbg_ptr = ret;
        RawRotationFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The `w` component of this quaternion.
     * @returns {number}
     */
    get w() {
        const ret = wasm.rawrotation_w(this.__wbg_ptr);
        return ret;
    }
    /**
     * The `x` component of this quaternion.
     * @returns {number}
     */
    get x() {
        const ret = wasm.rawrotation_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * The `y` component of this quaternion.
     * @returns {number}
     */
    get y() {
        const ret = wasm.rawrotation_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * The `z` component of this quaternion.
     * @returns {number}
     */
    get z() {
        const ret = wasm.rawrotation_z(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) RawRotation.prototype[Symbol.dispose] = RawRotation.prototype.free;

export class RawSdpMatrix3 {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawSdpMatrix3Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawsdpmatrix3_free(ptr, 0);
    }
    /**
     * Row major list of the upper-triangular part of the symmetric matrix.
     * @returns {Float32Array}
     */
    elements() {
        const ret = wasm.rawsdpmatrix3_elements(this.__wbg_ptr);
        return takeObject(ret);
    }
}
if (Symbol.dispose) RawSdpMatrix3.prototype[Symbol.dispose] = RawSdpMatrix3.prototype.free;

export class RawSerializationPipeline {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawSerializationPipelineFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawserializationpipeline_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} data
     * @returns {RawDeserializedWorld | undefined}
     */
    deserializeAll(data) {
        const ret = wasm.rawserializationpipeline_deserializeAll(this.__wbg_ptr, addHeapObject(data));
        return ret === 0 ? undefined : RawDeserializedWorld.__wrap(ret);
    }
    constructor() {
        const ret = wasm.rawserializationpipeline_new();
        this.__wbg_ptr = ret;
        RawSerializationPipelineFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {RawVector} gravity
     * @param {RawIntegrationParameters} integrationParameters
     * @param {RawIslandManager} islands
     * @param {RawBroadPhase} broadPhase
     * @param {RawNarrowPhase} narrowPhase
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawSoftBodySet} soft_bodies
     * @param {RawImpulseJointSet} impulse_joints
     * @param {RawMultibodyJointSet} multibody_joints
     * @returns {Uint8Array | undefined}
     */
    serializeAll(gravity, integrationParameters, islands, broadPhase, narrowPhase, bodies, colliders, soft_bodies, impulse_joints, multibody_joints) {
        _assertClass(gravity, RawVector);
        _assertClass(integrationParameters, RawIntegrationParameters);
        _assertClass(islands, RawIslandManager);
        _assertClass(broadPhase, RawBroadPhase);
        _assertClass(narrowPhase, RawNarrowPhase);
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(colliders, RawColliderSet);
        _assertClass(soft_bodies, RawSoftBodySet);
        _assertClass(impulse_joints, RawImpulseJointSet);
        _assertClass(multibody_joints, RawMultibodyJointSet);
        const ret = wasm.rawserializationpipeline_serializeAll(this.__wbg_ptr, gravity.__wbg_ptr, integrationParameters.__wbg_ptr, islands.__wbg_ptr, broadPhase.__wbg_ptr, narrowPhase.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, soft_bodies.__wbg_ptr, impulse_joints.__wbg_ptr, multibody_joints.__wbg_ptr);
        return takeObject(ret);
    }
}
if (Symbol.dispose) RawSerializationPipeline.prototype[Symbol.dispose] = RawSerializationPipeline.prototype.free;

export class RawShape {
    static __wrap(ptr) {
        const obj = Object.create(RawShape.prototype);
        obj.__wbg_ptr = ptr;
        RawShapeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof RawShape)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawShapeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawshape_free(ptr, 0);
    }
    /**
     * @param {number} radius
     * @returns {RawShape}
     */
    static ball(radius) {
        const ret = wasm.rawshape_ball(radius);
        return RawShape.__wrap(ret);
    }
    /**
     * @param {number} halfHeight
     * @param {number} radius
     * @returns {RawShape}
     */
    static capsule(halfHeight, radius) {
        const ret = wasm.rawshape_capsule(halfHeight, radius);
        return RawShape.__wrap(ret);
    }
    /**
     * @param {RawVector} shapePos
     * @param {RawRotation} shapeRot
     * @param {RawVector} rayOrig
     * @param {RawVector} rayDir
     * @param {number} maxToi
     * @param {boolean} solid
     * @returns {RawRayIntersection | undefined}
     */
    castRayAndGetNormal(shapePos, shapeRot, rayOrig, rayDir, maxToi, solid) {
        _assertClass(shapePos, RawVector);
        _assertClass(shapeRot, RawRotation);
        _assertClass(rayOrig, RawVector);
        _assertClass(rayDir, RawVector);
        const ret = wasm.rawshape_castRayAndGetNormal(this.__wbg_ptr, shapePos.__wbg_ptr, shapeRot.__wbg_ptr, rayOrig.__wbg_ptr, rayDir.__wbg_ptr, maxToi, solid);
        return ret === 0 ? undefined : RawRayIntersection.__wrap(ret);
    }
    /**
     * @param {RawVector} shapePos
     * @param {RawRotation} shapeRot
     * @param {RawVector} rayOrig
     * @param {RawVector} rayDir
     * @param {number} maxToi
     * @param {boolean} solid
     * @returns {number}
     */
    castRay(shapePos, shapeRot, rayOrig, rayDir, maxToi, solid) {
        _assertClass(shapePos, RawVector);
        _assertClass(shapeRot, RawRotation);
        _assertClass(rayOrig, RawVector);
        _assertClass(rayDir, RawVector);
        const ret = wasm.rawshape_castRay(this.__wbg_ptr, shapePos.__wbg_ptr, shapeRot.__wbg_ptr, rayOrig.__wbg_ptr, rayDir.__wbg_ptr, maxToi, solid);
        return ret;
    }
    /**
     * @param {RawVector} shapePos1
     * @param {RawRotation} shapeRot1
     * @param {RawVector} shapeVel1
     * @param {RawShape} shape2
     * @param {RawVector} shapePos2
     * @param {RawRotation} shapeRot2
     * @param {RawVector} shapeVel2
     * @param {number} target_distance
     * @param {number} maxToi
     * @param {boolean} stop_at_penetration
     * @returns {RawShapeCastHit | undefined}
     */
    castShape(shapePos1, shapeRot1, shapeVel1, shape2, shapePos2, shapeRot2, shapeVel2, target_distance, maxToi, stop_at_penetration) {
        _assertClass(shapePos1, RawVector);
        _assertClass(shapeRot1, RawRotation);
        _assertClass(shapeVel1, RawVector);
        _assertClass(shape2, RawShape);
        _assertClass(shapePos2, RawVector);
        _assertClass(shapeRot2, RawRotation);
        _assertClass(shapeVel2, RawVector);
        const ret = wasm.rawshape_castShape(this.__wbg_ptr, shapePos1.__wbg_ptr, shapeRot1.__wbg_ptr, shapeVel1.__wbg_ptr, shape2.__wbg_ptr, shapePos2.__wbg_ptr, shapeRot2.__wbg_ptr, shapeVel2.__wbg_ptr, target_distance, maxToi, stop_at_penetration);
        return ret === 0 ? undefined : RawShapeCastHit.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    compoundFlags() {
        const ret = wasm.rawshape_compoundFlags(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    compoundLen() {
        const ret = wasm.rawshape_compoundLen(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} index
     * @returns {RawRotation | undefined}
     */
    compoundRotation(index) {
        const ret = wasm.rawshape_compoundRotation(this.__wbg_ptr, index);
        return ret === 0 ? undefined : RawRotation.__wrap(ret);
    }
    /**
     * @param {number} index
     * @returns {RawShape | undefined}
     */
    compoundShape(index) {
        const ret = wasm.rawshape_compoundShape(this.__wbg_ptr, index);
        return ret === 0 ? undefined : RawShape.__wrap(ret);
    }
    /**
     * @param {number} index
     * @returns {RawVector | undefined}
     */
    compoundTranslation(index) {
        const ret = wasm.rawshape_compoundTranslation(this.__wbg_ptr, index);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
     * @param {RawShape[]} shapes
     * @param {Float32Array} positions
     * @param {Float32Array} rotations
     * @param {number} flags
     * @returns {RawShape}
     */
    static compound(shapes, positions, rotations, flags) {
        const ptr0 = passArrayJsValueToWasm0(shapes, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(positions, wasm.__wbindgen_export3);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArrayF32ToWasm0(rotations, wasm.__wbindgen_export3);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.rawshape_compound(ptr0, len0, ptr1, len1, ptr2, len2, flags);
        return RawShape.__wrap(ret);
    }
    /**
     * @param {number} halfHeight
     * @param {number} radius
     * @returns {RawShape}
     */
    static cone(halfHeight, radius) {
        const ret = wasm.rawshape_cone(halfHeight, radius);
        return RawShape.__wrap(ret);
    }
    /**
     * @param {RawVector} shapePos1
     * @param {RawRotation} shapeRot1
     * @param {RawShape} shape2
     * @param {RawVector} shapePos2
     * @param {RawRotation} shapeRot2
     * @param {number} prediction
     * @returns {RawShapeContact | undefined}
     */
    contactShape(shapePos1, shapeRot1, shape2, shapePos2, shapeRot2, prediction) {
        _assertClass(shapePos1, RawVector);
        _assertClass(shapeRot1, RawRotation);
        _assertClass(shape2, RawShape);
        _assertClass(shapePos2, RawVector);
        _assertClass(shapeRot2, RawRotation);
        const ret = wasm.rawshape_contactShape(this.__wbg_ptr, shapePos1.__wbg_ptr, shapeRot1.__wbg_ptr, shape2.__wbg_ptr, shapePos2.__wbg_ptr, shapeRot2.__wbg_ptr, prediction);
        return ret === 0 ? undefined : RawShapeContact.__wrap(ret);
    }
    /**
     * @param {RawVector} shapePos
     * @param {RawRotation} shapeRot
     * @param {RawVector} point
     * @returns {boolean}
     */
    containsPoint(shapePos, shapeRot, point) {
        _assertClass(shapePos, RawVector);
        _assertClass(shapeRot, RawRotation);
        _assertClass(point, RawVector);
        const ret = wasm.rawshape_containsPoint(this.__wbg_ptr, shapePos.__wbg_ptr, shapeRot.__wbg_ptr, point.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Float32Array} vertices
     * @param {Uint32Array} indices
     * @param {RawVHACDParameters} params
     * @param {number} flags
     * @returns {RawShape | undefined}
     */
    static convexDecompositionWithParams(vertices, indices, params, flags) {
        const ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_export3);
        const len1 = WASM_VECTOR_LEN;
        _assertClass(params, RawVHACDParameters);
        const ret = wasm.rawshape_convexDecompositionWithParams(ptr0, len0, ptr1, len1, params.__wbg_ptr, flags);
        return ret === 0 ? undefined : RawShape.__wrap(ret);
    }
    /**
     * @param {Float32Array} vertices
     * @param {Uint32Array} indices
     * @param {number} flags
     * @returns {RawShape | undefined}
     */
    static convexDecomposition(vertices, indices, flags) {
        const ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_export3);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.rawshape_convexDecomposition(ptr0, len0, ptr1, len1, flags);
        return ret === 0 ? undefined : RawShape.__wrap(ret);
    }
    /**
     * @param {Float32Array} points
     * @returns {RawShape | undefined}
     */
    static convexHull(points) {
        const ptr0 = passArrayF32ToWasm0(points, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.rawshape_convexHull(ptr0, len0);
        return ret === 0 ? undefined : RawShape.__wrap(ret);
    }
    /**
     * The vertices and indices of the convex hull of this convex polyhedron, recomputed
     * with `try_convex_hull` so that the result can always be fed back to
     * `RawShape::convexMesh`.
     *
     * This computes the convex hull only once, unlike calling both `vertices()` and
     * `indices()`.
     * @returns {RawConvexMeshData | undefined}
     */
    convexMeshData() {
        const ret = wasm.rawshape_convexMeshData(this.__wbg_ptr);
        return ret === 0 ? undefined : RawConvexMeshData.__wrap(ret);
    }
    /**
     * @param {Float32Array} vertices
     * @param {Uint32Array} indices
     * @returns {RawShape | undefined}
     */
    static convexMesh(vertices, indices) {
        const ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_export3);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.rawshape_convexMesh(ptr0, len0, ptr1, len1);
        return ret === 0 ? undefined : RawShape.__wrap(ret);
    }
    /**
     * @param {number} hx
     * @param {number} hy
     * @param {number} hz
     * @returns {RawShape}
     */
    static cuboid(hx, hy, hz) {
        const ret = wasm.rawshape_cuboid(hx, hy, hz);
        return RawShape.__wrap(ret);
    }
    /**
     * @param {number} halfHeight
     * @param {number} radius
     * @returns {RawShape}
     */
    static cylinder(halfHeight, radius) {
        const ret = wasm.rawshape_cylinder(halfHeight, radius);
        return RawShape.__wrap(ret);
    }
    /**
     * @returns {RawVector | undefined}
     */
    halfExtents() {
        const ret = wasm.rawshape_halfExtents(this.__wbg_ptr);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    halfHeight() {
        const ret = wasm.rawshape_halfHeight(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {RawVector | undefined}
     */
    halfspaceNormal() {
        const ret = wasm.rawshape_halfspaceNormal(this.__wbg_ptr);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
     * @param {RawVector} normal
     * @returns {RawShape}
     */
    static halfspace(normal) {
        _assertClass(normal, RawVector);
        const ret = wasm.rawshape_halfspace(normal.__wbg_ptr);
        return RawShape.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    heightFieldFlags() {
        const ret = wasm.rawshape_heightFieldFlags(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    heightfieldHeights() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawshape_heightfieldHeights(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getArrayF32FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export2(r0, r1 * 4, 4);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {number | undefined}
     */
    heightfieldNCols() {
        const ret = wasm.rawshape_heightfieldNCols(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    heightfieldNRows() {
        const ret = wasm.rawshape_heightfieldNRows(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {RawVector | undefined}
     */
    heightfieldScale() {
        const ret = wasm.rawshape_heightfieldScale(this.__wbg_ptr);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
     * @param {number} nrows
     * @param {number} ncols
     * @param {Float32Array} heights
     * @param {RawVector} scale
     * @param {number} flags
     * @returns {RawShape}
     */
    static heightfield(nrows, ncols, heights, scale, flags) {
        const ptr0 = passArrayF32ToWasm0(heights, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(scale, RawVector);
        const ret = wasm.rawshape_heightfield(nrows, ncols, ptr0, len0, scale.__wbg_ptr, flags);
        return RawShape.__wrap(ret);
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    indices() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawshape_indices(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getArrayU32FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export2(r0, r1 * 4, 4);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {RawVector} shapePos
     * @param {RawRotation} shapeRot
     * @param {RawVector} rayOrig
     * @param {RawVector} rayDir
     * @param {number} maxToi
     * @returns {boolean}
     */
    intersectsRay(shapePos, shapeRot, rayOrig, rayDir, maxToi) {
        _assertClass(shapePos, RawVector);
        _assertClass(shapeRot, RawRotation);
        _assertClass(rayOrig, RawVector);
        _assertClass(rayDir, RawVector);
        const ret = wasm.rawshape_intersectsRay(this.__wbg_ptr, shapePos.__wbg_ptr, shapeRot.__wbg_ptr, rayOrig.__wbg_ptr, rayDir.__wbg_ptr, maxToi);
        return ret !== 0;
    }
    /**
     * @param {RawVector} shapePos1
     * @param {RawRotation} shapeRot1
     * @param {RawShape} shape2
     * @param {RawVector} shapePos2
     * @param {RawRotation} shapeRot2
     * @returns {boolean}
     */
    intersectsShape(shapePos1, shapeRot1, shape2, shapePos2, shapeRot2) {
        _assertClass(shapePos1, RawVector);
        _assertClass(shapeRot1, RawRotation);
        _assertClass(shape2, RawShape);
        _assertClass(shapePos2, RawVector);
        _assertClass(shapeRot2, RawRotation);
        const ret = wasm.rawshape_intersectsShape(this.__wbg_ptr, shapePos1.__wbg_ptr, shapeRot1.__wbg_ptr, shape2.__wbg_ptr, shapePos2.__wbg_ptr, shapeRot2.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    polylineFlags() {
        const ret = wasm.rawshape_polylineFlags(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {Float32Array} vertices
     * @param {Uint32Array} indices
     * @param {number} flags
     * @returns {RawShape}
     */
    static polyline(vertices, indices, flags) {
        const ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_export3);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.rawshape_polyline(ptr0, len0, ptr1, len1, flags);
        return RawShape.__wrap(ret);
    }
    /**
     * @param {RawVector} shapePos
     * @param {RawRotation} shapeRot
     * @param {RawVector} point
     * @param {boolean} solid
     * @returns {RawPointProjection}
     */
    projectPoint(shapePos, shapeRot, point, solid) {
        _assertClass(shapePos, RawVector);
        _assertClass(shapeRot, RawRotation);
        _assertClass(point, RawVector);
        const ret = wasm.rawshape_projectPoint(this.__wbg_ptr, shapePos.__wbg_ptr, shapeRot.__wbg_ptr, point.__wbg_ptr, solid);
        return RawPointProjection.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    radius() {
        const ret = wasm.rawshape_radius(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} halfHeight
     * @param {number} radius
     * @param {number} borderRadius
     * @returns {RawShape}
     */
    static roundCone(halfHeight, radius, borderRadius) {
        const ret = wasm.rawshape_roundCone(halfHeight, radius, borderRadius);
        return RawShape.__wrap(ret);
    }
    /**
     * @param {Float32Array} points
     * @param {number} borderRadius
     * @returns {RawShape | undefined}
     */
    static roundConvexHull(points, borderRadius) {
        const ptr0 = passArrayF32ToWasm0(points, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.rawshape_roundConvexHull(ptr0, len0, borderRadius);
        return ret === 0 ? undefined : RawShape.__wrap(ret);
    }
    /**
     * @param {Float32Array} vertices
     * @param {Uint32Array} indices
     * @param {number} borderRadius
     * @returns {RawShape | undefined}
     */
    static roundConvexMesh(vertices, indices, borderRadius) {
        const ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_export3);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.rawshape_roundConvexMesh(ptr0, len0, ptr1, len1, borderRadius);
        return ret === 0 ? undefined : RawShape.__wrap(ret);
    }
    /**
     * @param {number} hx
     * @param {number} hy
     * @param {number} hz
     * @param {number} borderRadius
     * @returns {RawShape}
     */
    static roundCuboid(hx, hy, hz, borderRadius) {
        const ret = wasm.rawshape_roundCuboid(hx, hy, hz, borderRadius);
        return RawShape.__wrap(ret);
    }
    /**
     * @param {number} halfHeight
     * @param {number} radius
     * @param {number} borderRadius
     * @returns {RawShape}
     */
    static roundCylinder(halfHeight, radius, borderRadius) {
        const ret = wasm.rawshape_roundCylinder(halfHeight, radius, borderRadius);
        return RawShape.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    roundRadius() {
        const ret = wasm.rawshape_roundRadius(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {RawVector} p1
     * @param {RawVector} p2
     * @param {RawVector} p3
     * @param {number} borderRadius
     * @returns {RawShape}
     */
    static roundTriangle(p1, p2, p3, borderRadius) {
        _assertClass(p1, RawVector);
        _assertClass(p2, RawVector);
        _assertClass(p3, RawVector);
        const ret = wasm.rawshape_roundTriangle(p1.__wbg_ptr, p2.__wbg_ptr, p3.__wbg_ptr, borderRadius);
        return RawShape.__wrap(ret);
    }
    /**
     * @param {RawVector} p1
     * @param {RawVector} p2
     * @returns {RawShape}
     */
    static segment(p1, p2) {
        _assertClass(p1, RawVector);
        _assertClass(p2, RawVector);
        const ret = wasm.rawshape_segment(p1.__wbg_ptr, p2.__wbg_ptr);
        return RawShape.__wrap(ret);
    }
    /**
     * @returns {RawShapeType}
     */
    shapeType() {
        const ret = wasm.rawshape_shapeType(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    triMeshFlags() {
        const ret = wasm.rawshape_triMeshFlags(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {RawVector} p1
     * @param {RawVector} p2
     * @param {RawVector} p3
     * @returns {RawShape}
     */
    static triangle(p1, p2, p3) {
        _assertClass(p1, RawVector);
        _assertClass(p2, RawVector);
        _assertClass(p3, RawVector);
        const ret = wasm.rawshape_triangle(p1.__wbg_ptr, p2.__wbg_ptr, p3.__wbg_ptr);
        return RawShape.__wrap(ret);
    }
    /**
     * @param {Float32Array} vertices
     * @param {Uint32Array} indices
     * @param {number} flags
     * @returns {RawShape | undefined}
     */
    static trimesh(vertices, indices, flags) {
        const ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_export3);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.rawshape_trimesh(ptr0, len0, ptr1, len1, flags);
        return ret === 0 ? undefined : RawShape.__wrap(ret);
    }
    /**
     * The vertices of this shape, if it is vertex-based.
     *
     * For convex polyhedra, this returns the vertices of a convex hull recomputed with
     * `try_convex_hull` (so they may differ in count and order from the points the shape
     * was built from), ensuring the result can be fed back to `RawShape::convexMesh`.
     * If both `vertices` and `indices` are needed, prefer `convexMeshData` which computes
     * the convex hull only once.
     * @returns {Float32Array | undefined}
     */
    vertices() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawshape_vertices(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getArrayF32FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export2(r0, r1 * 4, 4);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {Int32Array | undefined}
     */
    voxelData() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawshape_voxelData(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getArrayI32FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export2(r0, r1 * 4, 4);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {RawVector | undefined}
     */
    voxelSize() {
        const ret = wasm.rawshape_voxelSize(this.__wbg_ptr);
        return ret === 0 ? undefined : RawVector.__wrap(ret);
    }
    /**
     * @param {RawVector} voxel_size
     * @param {Float32Array} points
     * @returns {RawShape}
     */
    static voxelsFromPoints(voxel_size, points) {
        _assertClass(voxel_size, RawVector);
        const ptr0 = passArrayF32ToWasm0(points, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.rawshape_voxelsFromPoints(voxel_size.__wbg_ptr, ptr0, len0);
        return RawShape.__wrap(ret);
    }
    /**
     * @param {RawVector} voxel_size
     * @param {Int32Array} grid_coords
     * @returns {RawShape}
     */
    static voxels(voxel_size, grid_coords) {
        _assertClass(voxel_size, RawVector);
        const ptr0 = passArray32ToWasm0(grid_coords, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.rawshape_voxels(voxel_size.__wbg_ptr, ptr0, len0);
        return RawShape.__wrap(ret);
    }
}
if (Symbol.dispose) RawShape.prototype[Symbol.dispose] = RawShape.prototype.free;

export class RawShapeCastHit {
    static __wrap(ptr) {
        const obj = Object.create(RawShapeCastHit.prototype);
        obj.__wbg_ptr = ptr;
        RawShapeCastHitFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawShapeCastHitFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawshapecasthit_free(ptr, 0);
    }
    /**
     * @param {Float32Array} scratch_buffer
     */
    getComponents(scratch_buffer) {
        try {
            wasm.rawshapecasthit_getComponents(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
if (Symbol.dispose) RawShapeCastHit.prototype[Symbol.dispose] = RawShapeCastHit.prototype.free;

export class RawShapeContact {
    static __wrap(ptr) {
        const obj = Object.create(RawShapeContact.prototype);
        obj.__wbg_ptr = ptr;
        RawShapeContactFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawShapeContactFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawshapecontact_free(ptr, 0);
    }
    /**
     * Writes the contact components into the given scratch buffer.
     *
     * Layout: `[distance, point1, point2, normal1, normal2]`.
     * @param {Float32Array} scratch_buffer
     */
    getComponents(scratch_buffer) {
        try {
            wasm.rawshapecontact_getComponents(this.__wbg_ptr, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
if (Symbol.dispose) RawShapeContact.prototype[Symbol.dispose] = RawShapeContact.prototype.free;

/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18}
 */
export const RawShapeType = Object.freeze({
    Ball: 0, "0": "Ball",
    Cuboid: 1, "1": "Cuboid",
    Capsule: 2, "2": "Capsule",
    Segment: 3, "3": "Segment",
    Polyline: 4, "4": "Polyline",
    Triangle: 5, "5": "Triangle",
    TriMesh: 6, "6": "TriMesh",
    HeightField: 7, "7": "HeightField",
    Compound: 8, "8": "Compound",
    ConvexPolyhedron: 9, "9": "ConvexPolyhedron",
    Cylinder: 10, "10": "Cylinder",
    Cone: 11, "11": "Cone",
    RoundCuboid: 12, "12": "RoundCuboid",
    RoundTriangle: 13, "13": "RoundTriangle",
    RoundCylinder: 14, "14": "RoundCylinder",
    RoundCone: 15, "15": "RoundCone",
    RoundConvexPolyhedron: 16, "16": "RoundConvexPolyhedron",
    HalfSpace: 17, "17": "HalfSpace",
    Voxels: 18, "18": "Voxels",
});

export class RawSoftBodyBuilder {
    static __wrap(ptr) {
        const obj = Object.create(RawSoftBodyBuilder.prototype);
        obj.__wbg_ptr = ptr;
        RawSoftBodyBuilderFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawSoftBodyBuilderFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawsoftbodybuilder_free(ptr, 0);
    }
    /**
     * @param {Uint32Array} edges
     */
    addEdges(edges) {
        const ptr0 = passArray32ToWasm0(edges, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        wasm.rawsoftbodybuilder_addEdges(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {RawSoftBodyBuilder} other
     */
    append(other) {
        _assertClass(other, RawSoftBodyBuilder);
        wasm.rawsoftbodybuilder_append(this.__wbg_ptr, other.__wbg_ptr);
    }
    /**
     * @returns {Uint32Array}
     */
    cellEdges() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodybuilder_cellEdges(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {RawVector} origin
     * @param {RawVector} du
     * @param {RawVector} dv
     * @param {number} nu
     * @param {number} nv
     * @param {number} warp_frequency
     * @param {number} warp_damping
     * @param {number} weft_frequency
     * @param {number} weft_damping
     * @param {number} shear_frequency
     * @param {number} shear_damping
     * @returns {RawSoftBodyBuilder}
     */
    static clothAnisotropic(origin, du, dv, nu, nv, warp_frequency, warp_damping, weft_frequency, weft_damping, shear_frequency, shear_damping) {
        _assertClass(origin, RawVector);
        _assertClass(du, RawVector);
        _assertClass(dv, RawVector);
        const ret = wasm.rawsoftbodybuilder_clothAnisotropic(origin.__wbg_ptr, du.__wbg_ptr, dv.__wbg_ptr, nu, nv, warp_frequency, warp_damping, weft_frequency, weft_damping, shear_frequency, shear_damping);
        return RawSoftBodyBuilder.__wrap(ret);
    }
    /**
     * @param {RawVector} origin
     * @param {RawVector} axis
     * @param {number} radius_start
     * @param {number} radius_end
     * @param {number} num_around
     * @param {number} num_along
     * @returns {RawSoftBodyBuilder}
     */
    static clothTube(origin, axis, radius_start, radius_end, num_around, num_along) {
        _assertClass(origin, RawVector);
        _assertClass(axis, RawVector);
        const ret = wasm.rawsoftbodybuilder_clothTube(origin.__wbg_ptr, axis.__wbg_ptr, radius_start, radius_end, num_around, num_along);
        return RawSoftBodyBuilder.__wrap(ret);
    }
    /**
     * @param {RawVector} origin
     * @param {RawVector} du
     * @param {RawVector} dv
     * @param {number} nu
     * @param {number} nv
     * @returns {RawSoftBodyBuilder}
     */
    static cloth(origin, du, dv, nu, nv) {
        _assertClass(origin, RawVector);
        _assertClass(du, RawVector);
        _assertClass(dv, RawVector);
        const ret = wasm.rawsoftbodybuilder_cloth(origin.__wbg_ptr, du.__wbg_ptr, dv.__wbg_ptr, nu, nv);
        return RawSoftBodyBuilder.__wrap(ret);
    }
    /**
     * @param {RawVector} center
     * @param {RawVector} half_extents
     * @param {number} nx
     * @param {number} ny
     * @param {number} nz
     * @returns {RawSoftBodyBuilder}
     */
    static cuboid(center, half_extents, nx, ny, nz) {
        _assertClass(center, RawVector);
        _assertClass(half_extents, RawVector);
        const ret = wasm.rawsoftbodybuilder_cuboid(center.__wbg_ptr, half_extents.__wbg_ptr, nx, ny, nz);
        return RawSoftBodyBuilder.__wrap(ret);
    }
    /**
     * @returns {RawSoftBodyMaterial}
     */
    material() {
        const ret = wasm.rawsoftbodybuilder_material(this.__wbg_ptr);
        return RawSoftBodyMaterial.__wrap(ret);
    }
    /**
     * A builder over the given world-space particle positions (`DIM` floats per particle), with
     * no element.
     * @param {Float32Array} positions
     */
    constructor(positions) {
        const ptr0 = passArrayF32ToWasm0(positions, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.rawsoftbodybuilder_new(ptr0, len0);
        this.__wbg_ptr = ret;
        RawSoftBodyBuilderFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    numParticles() {
        const ret = wasm.rawsoftbodybuilder_numParticles(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {Float32Array}
     */
    particlePositions() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodybuilder_particlePositions(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {RawVector} start
     * @param {RawVector} end
     * @param {number} num_particles
     * @returns {RawSoftBodyBuilder}
     */
    static rope(start, end, num_particles) {
        _assertClass(start, RawVector);
        _assertClass(end, RawVector);
        const ret = wasm.rawsoftbodybuilder_rope(start.__wbg_ptr, end.__wbg_ptr, num_particles);
        return RawSoftBodyBuilder.__wrap(ret);
    }
    /**
     * @param {number} iterations
     */
    setAdditionalPgsIterations(iterations) {
        wasm.rawsoftbodybuilder_setAdditionalPgsIterations(this.__wbg_ptr, iterations);
    }
    /**
     * @param {number} iterations
     */
    setAdditionalSolverIterations(iterations) {
        wasm.rawsoftbodybuilder_setAdditionalSolverIterations(this.__wbg_ptr, iterations);
    }
    /**
     * @param {Uint32Array} edges
     */
    setBendEdges(edges) {
        const ptr0 = passArray32ToWasm0(edges, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        wasm.rawsoftbodybuilder_setBendEdges(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} can_sleep
     */
    setCanSleep(can_sleep) {
        wasm.rawsoftbodybuilder_setCanSleep(this.__wbg_ptr, can_sleep);
    }
    /**
     * @param {RawSoftBodyCellModel} model
     */
    setCellModel(model) {
        wasm.rawsoftbodybuilder_setCellModel(this.__wbg_ptr, model);
    }
    /**
     * @param {Uint32Array} cells
     */
    setCells(cells) {
        const ptr0 = passArray32ToWasm0(cells, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        wasm.rawsoftbodybuilder_setCells(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Uint32Array} dihedrals
     */
    setDihedrals(dihedrals) {
        const ptr0 = passArray32ToWasm0(dihedrals, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        wasm.rawsoftbodybuilder_setDihedrals(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} group
     */
    setDominanceGroup(group) {
        wasm.rawsoftbodybuilder_setDominanceGroup(this.__wbg_ptr, group);
    }
    /**
     * @param {Uint32Array} edges
     * @param {Float32Array} frequencies
     * @param {Float32Array} dampings
     */
    setEdgeSoftness(edges, frequencies, dampings) {
        const ptr0 = passArray32ToWasm0(edges, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(frequencies, wasm.__wbindgen_export3);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArrayF32ToWasm0(dampings, wasm.__wbindgen_export3);
        const len2 = WASM_VECTOR_LEN;
        wasm.rawsoftbodybuilder_setEdgeSoftness(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
    }
    /**
     * @param {Uint32Array} edges
     * @param {Float32Array} resistances
     */
    setEdgeTearResistance(edges, resistances) {
        const ptr0 = passArray32ToWasm0(edges, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(resistances, wasm.__wbindgen_export3);
        const len1 = WASM_VECTOR_LEN;
        wasm.rawsoftbodybuilder_setEdgeTearResistance(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {Uint32Array} edges
     */
    setEdges(edges) {
        const ptr0 = passArray32ToWasm0(edges, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        wasm.rawsoftbodybuilder_setEdges(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} scale
     */
    setGravityScale(scale) {
        wasm.rawsoftbodybuilder_setGravityScale(this.__wbg_ptr, scale);
    }
    /**
     * @param {number} damping
     */
    setLinearDamping(damping) {
        wasm.rawsoftbodybuilder_setLinearDamping(this.__wbg_ptr, damping);
    }
    /**
     * @param {number} mass
     */
    setMass(mass) {
        wasm.rawsoftbodybuilder_setMass(this.__wbg_ptr, mass);
    }
    /**
     * @param {Float32Array} masses
     */
    setMasses(masses) {
        const ptr0 = passArrayF32ToWasm0(masses, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        wasm.rawsoftbodybuilder_setMasses(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {RawSoftBodyMaterial} material
     */
    setMaterial(material) {
        _assertClass(material, RawSoftBodyMaterial);
        wasm.rawsoftbodybuilder_setMaterial(this.__wbg_ptr, material.__wbg_ptr);
    }
    setNoSurfaceCollider() {
        wasm.rawsoftbodybuilder_setNoSurfaceCollider(this.__wbg_ptr);
    }
    /**
     * @param {boolean} oriented
     */
    setOriented(oriented) {
        wasm.rawsoftbodybuilder_setOriented(this.__wbg_ptr, oriented);
    }
    /**
     * @param {number} mass
     */
    setParticleMass(mass) {
        wasm.rawsoftbodybuilder_setParticleMass(this.__wbg_ptr, mass);
    }
    /**
     * @param {number} radius
     */
    setParticleRadius(radius) {
        wasm.rawsoftbodybuilder_setParticleRadius(this.__wbg_ptr, radius);
    }
    /**
     * @param {Uint32Array} pinned
     */
    setPinnedParticles(pinned) {
        const ptr0 = passArray32ToWasm0(pinned, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        wasm.rawsoftbodybuilder_setPinnedParticles(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Float32Array} positions
     */
    setPositions(positions) {
        const ptr0 = passArrayF32ToWasm0(positions, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        wasm.rawsoftbodybuilder_setPositions(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} enabled
     */
    setSelfContacts(enabled) {
        wasm.rawsoftbodybuilder_setSelfContacts(this.__wbg_ptr, enabled);
    }
    /**
     * @param {boolean} enabled
     */
    setShapeMatching(enabled) {
        wasm.rawsoftbodybuilder_setShapeMatching(this.__wbg_ptr, enabled);
    }
    /**
     * @param {boolean} enabled
     */
    setSkinCollision(enabled) {
        wasm.rawsoftbodybuilder_setSkinCollision(this.__wbg_ptr, enabled);
    }
    /**
     * @param {Float32Array} vertices
     * @param {Uint32Array} indices
     */
    setSkin(vertices, indices) {
        const ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_export3);
        const len1 = WASM_VECTOR_LEN;
        wasm.rawsoftbodybuilder_setSkin(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {number} natural_frequency
     * @param {number} damping_ratio
     */
    setSoftness(natural_frequency, damping_ratio) {
        wasm.rawsoftbodybuilder_setSoftness(this.__wbg_ptr, natural_frequency, damping_ratio);
    }
    /**
     * @param {RawSoftBodySolver} solver
     */
    setSolver(solver) {
        wasm.rawsoftbodybuilder_setSolver(this.__wbg_ptr, solver);
    }
    /**
     * The template of the body's colliders: its shape is replaced by the deformable surface,
     * or by a ball of `particleRadius` for a body colliding through its particles.
     * @param {number} friction
     * @param {number} restitution
     * @param {number} frictionCombineRule
     * @param {number} restitutionCombineRule
     * @param {boolean} isSensor
     * @param {number} collisionGroups
     * @param {number} solverGroups
     * @param {number} activeCollisionTypes
     * @param {number} activeHooks
     * @param {number} activeEvents
     * @param {number} contactForceEventThreshold
     * @param {number} contactSkin
     */
    setSurfaceCollider(friction, restitution, frictionCombineRule, restitutionCombineRule, isSensor, collisionGroups, solverGroups, activeCollisionTypes, activeHooks, activeEvents, contactForceEventThreshold, contactSkin) {
        wasm.rawsoftbodybuilder_setSurfaceCollider(this.__wbg_ptr, friction, restitution, frictionCombineRule, restitutionCombineRule, isSensor, collisionGroups, solverGroups, activeCollisionTypes, activeHooks, activeEvents, contactForceEventThreshold, contactSkin);
    }
    /**
     * @param {Uint32Array} surface
     */
    setSurface(surface) {
        const ptr0 = passArray32ToWasm0(surface, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        wasm.rawsoftbodybuilder_setSurface(this.__wbg_ptr, ptr0, len0);
    }
    setTensionOnly() {
        wasm.rawsoftbodybuilder_setTensionOnly(this.__wbg_ptr);
    }
    /**
     * @param {number} factor
     */
    setVolumeFactor(factor) {
        wasm.rawsoftbodybuilder_setVolumeFactor(this.__wbg_ptr, factor);
    }
    /**
     * @param {boolean} enabled
     */
    setVolumePreservation(enabled) {
        wasm.rawsoftbodybuilder_setVolumePreservation(this.__wbg_ptr, enabled);
    }
    /**
     * @param {Uint32Array} segments
     */
    setWire(segments) {
        const ptr0 = passArray32ToWasm0(segments, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        wasm.rawsoftbodybuilder_setWire(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {RawVector} center
     * @param {number} radius
     * @param {number} subdivisions
     * @returns {RawSoftBodyBuilder}
     */
    static sphere(center, radius, subdivisions) {
        _assertClass(center, RawVector);
        const ret = wasm.rawsoftbodybuilder_sphere(center.__wbg_ptr, radius, subdivisions);
        return RawSoftBodyBuilder.__wrap(ret);
    }
    /**
     * @returns {Uint32Array}
     */
    surfaceDihedrals() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodybuilder_surfaceDihedrals(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {Uint32Array}
     */
    surfaceEdges() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodybuilder_surfaceEdges(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {RawVector} translation
     */
    translated(translation) {
        _assertClass(translation, RawVector);
        wasm.rawsoftbodybuilder_translated(this.__wbg_ptr, translation.__wbg_ptr);
    }
    /**
     * @param {Float32Array} vertices
     * @param {Uint32Array} indices
     * @returns {RawSoftBodyBuilder | undefined}
     */
    static trimesh(vertices, indices) {
        const ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_export3);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.rawsoftbodybuilder_trimesh(ptr0, len0, ptr1, len1);
        return ret === 0 ? undefined : RawSoftBodyBuilder.__wrap(ret);
    }
    /**
     * A volumetric body filling the closed surface (segments in 2D, triangles in 3D) with
     * cells of the given size.
     * @param {Float32Array} vertices
     * @param {Uint32Array} indices
     * @param {number} cell_size
     * @param {boolean} skinned
     * @returns {RawSoftBodyBuilder | undefined}
     */
    static volumetric(vertices, indices, cell_size, skinned) {
        const ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_export3);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.rawsoftbodybuilder_volumetric(ptr0, len0, ptr1, len1, cell_size, skinned);
        return ret === 0 ? undefined : RawSoftBodyBuilder.__wrap(ret);
    }
}
if (Symbol.dispose) RawSoftBodyBuilder.prototype[Symbol.dispose] = RawSoftBodyBuilder.prototype.free;

/**
 * @enum {0 | 1 | 2}
 */
export const RawSoftBodyCellModel = Object.freeze({
    Volume: 0, "0": "Volume",
    Corotational: 1, "1": "Corotational",
    NeoHookean: 2, "2": "NeoHookean",
});

export class RawSoftBodyMaterial {
    static __wrap(ptr) {
        const obj = Object.create(RawSoftBodyMaterial.prototype);
        obj.__wbg_ptr = ptr;
        RawSoftBodyMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawSoftBodyMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawsoftbodymaterial_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get bendDampingRatio() {
        const ret = wasm.rawsoftbodymaterial_bendDampingRatio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get bendFrequency() {
        const ret = wasm.rawsoftbodymaterial_bendFrequency(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get deformationDamping() {
        const ret = wasm.rawsoftbodymaterial_deformationDamping(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get edgeDampingRatio() {
        const ret = wasm.rawsoftbodymaterial_edgeDampingRatio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get edgeFrequency() {
        const ret = wasm.rawsoftbodymaterial_edgeFrequency(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get edgePlasticCreep() {
        const ret = wasm.rawsoftbodymaterial_edgePlasticCreep(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {RawSoftEdgePlasticFlow}
     */
    get edgePlasticFlow() {
        const ret = wasm.rawsoftbodymaterial_edgePlasticFlow(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get edgePlasticMax() {
        const ret = wasm.rawsoftbodymaterial_edgePlasticMax(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get edgePlasticYield() {
        const ret = wasm.rawsoftbodymaterial_edgePlasticYield(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get elasticDampingRatio() {
        const ret = wasm.rawsoftbodymaterial_elasticDampingRatio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get interiorStrength() {
        const ret = wasm.rawsoftbodymaterial_interiorStrength(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get maxTearsPerStep() {
        const ret = wasm.rawsoftbodymaterial_maxTearsPerStep(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get minPiece() {
        const ret = wasm.rawsoftbodymaterial_minPiece(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    constructor() {
        const ret = wasm.rawsoftbodymaterial_new();
        this.__wbg_ptr = ret;
        RawSoftBodyMaterialFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get plasticCreep() {
        const ret = wasm.rawsoftbodymaterial_plasticCreep(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get plasticMax() {
        const ret = wasm.rawsoftbodymaterial_plasticMax(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get plasticYield() {
        const ret = wasm.rawsoftbodymaterial_plasticYield(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get poissonRatio() {
        const ret = wasm.rawsoftbodymaterial_poissonRatio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} value
     */
    set bendDampingRatio(value) {
        wasm.rawsoftbodymaterial_set_bendDampingRatio(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set bendFrequency(value) {
        wasm.rawsoftbodymaterial_set_bendFrequency(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set deformationDamping(value) {
        wasm.rawsoftbodymaterial_set_deformationDamping(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set edgeDampingRatio(value) {
        wasm.rawsoftbodymaterial_set_edgeDampingRatio(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set edgeFrequency(value) {
        wasm.rawsoftbodymaterial_set_edgeFrequency(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set edgePlasticCreep(value) {
        wasm.rawsoftbodymaterial_set_edgePlasticCreep(this.__wbg_ptr, value);
    }
    /**
     * @param {RawSoftEdgePlasticFlow} value
     */
    set edgePlasticFlow(value) {
        wasm.rawsoftbodymaterial_set_edgePlasticFlow(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set edgePlasticMax(value) {
        wasm.rawsoftbodymaterial_set_edgePlasticMax(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set edgePlasticYield(value) {
        wasm.rawsoftbodymaterial_set_edgePlasticYield(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set elasticDampingRatio(value) {
        wasm.rawsoftbodymaterial_set_elasticDampingRatio(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set interiorStrength(value) {
        wasm.rawsoftbodymaterial_set_interiorStrength(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set maxTearsPerStep(value) {
        wasm.rawsoftbodymaterial_set_maxTearsPerStep(this.__wbg_ptr, value);
    }
    /**
     * @param {number | null} [value]
     */
    set minPiece(value) {
        wasm.rawsoftbodymaterial_set_minPiece(this.__wbg_ptr, isLikeNone(value) ? Number.MAX_SAFE_INTEGER : (value) >>> 0);
    }
    /**
     * @param {number} value
     */
    set plasticCreep(value) {
        wasm.rawsoftbodymaterial_set_plasticCreep(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set plasticMax(value) {
        wasm.rawsoftbodymaterial_set_plasticMax(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set plasticYield(value) {
        wasm.rawsoftbodymaterial_set_plasticYield(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set poissonRatio(value) {
        wasm.rawsoftbodymaterial_set_poissonRatio(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set shapeMatchingDampingRatio(value) {
        wasm.rawsoftbodymaterial_set_shapeMatchingDampingRatio(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set shapeMatchingFrequency(value) {
        wasm.rawsoftbodymaterial_set_shapeMatchingFrequency(this.__wbg_ptr, value);
    }
    /**
     * @param {number | null} [value]
     */
    set tearForce(value) {
        wasm.rawsoftbodymaterial_set_tearForce(this.__wbg_ptr, isLikeNone(value) ? Number.MAX_SAFE_INTEGER : Math.fround(value));
    }
    /**
     * @param {number} value
     */
    set tearSmoothing(value) {
        wasm.rawsoftbodymaterial_set_tearSmoothing(this.__wbg_ptr, value);
    }
    /**
     * @param {number | null} [value]
     */
    set tearStrain(value) {
        wasm.rawsoftbodymaterial_set_tearStrain(this.__wbg_ptr, isLikeNone(value) ? Number.MAX_SAFE_INTEGER : Math.fround(value));
    }
    /**
     * @param {number} value
     */
    set volumeDampingRatio(value) {
        wasm.rawsoftbodymaterial_set_volumeDampingRatio(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set volumeFrequency(value) {
        wasm.rawsoftbodymaterial_set_volumeFrequency(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set youngModulus(value) {
        wasm.rawsoftbodymaterial_set_youngModulus(this.__wbg_ptr, value);
    }
    /**
     * @returns {number}
     */
    get shapeMatchingDampingRatio() {
        const ret = wasm.rawsoftbodymaterial_shapeMatchingDampingRatio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get shapeMatchingFrequency() {
        const ret = wasm.rawsoftbodymaterial_shapeMatchingFrequency(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    get tearForce() {
        const ret = wasm.rawsoftbodymaterial_tearForce(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    get tearSmoothing() {
        const ret = wasm.rawsoftbodymaterial_tearSmoothing(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    get tearStrain() {
        const ret = wasm.rawsoftbodymaterial_tearStrain(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    tears() {
        const ret = wasm.rawsoftbodymaterial_tears(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {number} natural_frequency
     * @param {number} damping_ratio
     * @returns {RawSoftBodyMaterial}
     */
    static uniform(natural_frequency, damping_ratio) {
        const ret = wasm.rawsoftbodymaterial_uniform(natural_frequency, damping_ratio);
        return RawSoftBodyMaterial.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get volumeDampingRatio() {
        const ret = wasm.rawsoftbodymaterial_volumeDampingRatio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get volumeFrequency() {
        const ret = wasm.rawsoftbodymaterial_volumeFrequency(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get youngModulus() {
        const ret = wasm.rawsoftbodymaterial_youngModulus(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) RawSoftBodyMaterial.prototype[Symbol.dispose] = RawSoftBodyMaterial.prototype.free;

export class RawSoftBodySet {
    static __wrap(ptr) {
        const obj = Object.create(RawSoftBodySet.prototype);
        obj.__wbg_ptr = ptr;
        RawSoftBodySetFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawSoftBodySetFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawsoftbodyset_free(ptr, 0);
    }
    /**
     * @param {number} handle
     * @param {Uint32Array} particles
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @returns {number | undefined}
     */
    addCluster(handle, particles, bodies, colliders) {
        const ptr0 = passArray32ToWasm0(particles, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(colliders, RawColliderSet);
        const ret = wasm.rawsoftbodyset_addCluster(this.__wbg_ptr, handle, ptr0, len0, bodies.__wbg_ptr, colliders.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Checks if a soft body with the given integer handle exists.
     * @param {number} handle
     * @returns {boolean}
     */
    contains(handle) {
        const ret = wasm.rawsoftbodyset_contains(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * Cuts a soft body along a blade: a segment (two points) in 2D, a triangle (three points)
     * in 3D, given as `DIM` floats per point.
     * @param {number} handle
     * @param {Float32Array} blade
     * @param {RawIslandManager} islands
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawImpulseJointSet} joints
     * @param {RawMultibodyJointSet} articulations
     * @returns {RawSoftBodyTearEvent | undefined}
     */
    cut(handle, blade, islands, bodies, colliders, joints, articulations) {
        const ptr0 = passArrayF32ToWasm0(blade, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(islands, RawIslandManager);
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(colliders, RawColliderSet);
        _assertClass(joints, RawImpulseJointSet);
        _assertClass(articulations, RawMultibodyJointSet);
        const ret = wasm.rawsoftbodyset_cut(this.__wbg_ptr, handle, ptr0, len0, islands.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, joints.__wbg_ptr, articulations.__wbg_ptr);
        return ret === 0 ? undefined : RawSoftBodyTearEvent.__wrap(ret);
    }
    /**
     * Applies the given JavaScript function to the integer handle of each soft body managed by
     * this set.
     * @param {Function} f
     */
    forEachSoftBodyHandle(f) {
        try {
            wasm.rawsoftbodyset_forEachSoftBodyHandle(this.__wbg_ptr, addBorrowedObject(f));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * Inserts the soft body described by the builder, creating its hidden root rigid body and
     * its colliders.
     * @param {RawSoftBodyBuilder} builder
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @returns {number}
     */
    insert(builder, bodies, colliders) {
        _assertClass(builder, RawSoftBodyBuilder);
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(colliders, RawColliderSet);
        const ret = wasm.rawsoftbodyset_insert(this.__wbg_ptr, builder.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr);
        return ret;
    }
    /**
     * The number of soft bodies on this set.
     * @returns {number}
     */
    len() {
        const ret = wasm.rawsoftbodyset_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    constructor() {
        const ret = wasm.rawsoftbodyset_new();
        this.__wbg_ptr = ret;
        RawSoftBodySetFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} handle
     * @param {number} cluster
     * @param {RawIslandManager} islands
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawImpulseJointSet} joints
     * @param {RawMultibodyJointSet} articulations
     * @returns {boolean}
     */
    removeCluster(handle, cluster, islands, bodies, colliders, joints, articulations) {
        _assertClass(islands, RawIslandManager);
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(colliders, RawColliderSet);
        _assertClass(joints, RawImpulseJointSet);
        _assertClass(articulations, RawMultibodyJointSet);
        const ret = wasm.rawsoftbodyset_removeCluster(this.__wbg_ptr, handle, cluster, islands.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, joints.__wbg_ptr, articulations.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @param {RawIslandManager} islands
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawImpulseJointSet} joints
     * @param {RawMultibodyJointSet} articulations
     */
    remove(handle, islands, bodies, colliders, joints, articulations) {
        _assertClass(islands, RawIslandManager);
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(colliders, RawColliderSet);
        _assertClass(joints, RawImpulseJointSet);
        _assertClass(articulations, RawMultibodyJointSet);
        wasm.rawsoftbodyset_remove(this.__wbg_ptr, handle, islands.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, joints.__wbg_ptr, articulations.__wbg_ptr);
    }
    /**
     * @param {number} handle
     * @param {RawVector} force
     * @param {boolean} wake_up
     */
    sbAddForce(handle, force, wake_up) {
        _assertClass(force, RawVector);
        wasm.rawsoftbodyset_sbAddForce(this.__wbg_ptr, handle, force.__wbg_ptr, wake_up);
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {RawVector} force
     * @param {boolean} wake_up
     */
    sbAddParticleForce(handle, i, force, wake_up) {
        _assertClass(force, RawVector);
        wasm.rawsoftbodyset_sbAddParticleForce(this.__wbg_ptr, handle, i, force.__wbg_ptr, wake_up);
    }
    /**
     * @param {number} handle
     * @param {RawVector} impulse
     * @param {RawVector} point
     * @param {number} falloff_radius
     * @param {boolean} wake_up
     */
    sbApplyImpulseAtPoint(handle, impulse, point, falloff_radius, wake_up) {
        _assertClass(impulse, RawVector);
        _assertClass(point, RawVector);
        wasm.rawsoftbodyset_sbApplyImpulseAtPoint(this.__wbg_ptr, handle, impulse.__wbg_ptr, point.__wbg_ptr, falloff_radius, wake_up);
    }
    /**
     * @param {number} handle
     * @param {RawVector} impulse
     * @param {boolean} wake_up
     */
    sbApplyImpulse(handle, impulse, wake_up) {
        _assertClass(impulse, RawVector);
        wasm.rawsoftbodyset_sbApplyImpulse(this.__wbg_ptr, handle, impulse.__wbg_ptr, wake_up);
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {RawVector} impulse
     * @param {boolean} wake_up
     */
    sbApplyParticleImpulse(handle, i, impulse, wake_up) {
        _assertClass(impulse, RawVector);
        wasm.rawsoftbodyset_sbApplyParticleImpulse(this.__wbg_ptr, handle, i, impulse.__wbg_ptr, wake_up);
    }
    /**
     * @param {number} handle
     * @param {RawVector} center
     * @param {number} magnitude
     * @param {number} falloff_radius
     * @param {boolean} wake_up
     */
    sbApplyRadialImpulse(handle, center, magnitude, falloff_radius, wake_up) {
        _assertClass(center, RawVector);
        wasm.rawsoftbodyset_sbApplyRadialImpulse(this.__wbg_ptr, handle, center.__wbg_ptr, magnitude, falloff_radius, wake_up);
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {number} body
     * @param {RawRigidBodySet} bodies
     */
    sbAttachParticle(handle, i, body, bodies) {
        _assertClass(bodies, RawRigidBodySet);
        wasm.rawsoftbodyset_sbAttachParticle(this.__wbg_ptr, handle, i, body, bodies.__wbg_ptr);
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number}
     */
    sbAttachmentBody(handle, i) {
        const ret = wasm.rawsoftbodyset_sbAttachmentBody(this.__wbg_ptr, handle, i);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number}
     */
    sbAttachmentParticle(handle, i) {
        const ret = wasm.rawsoftbodyset_sbAttachmentParticle(this.__wbg_ptr, handle, i);
        return ret >>> 0;
    }
    /**
     * The boundary elements of the body (segments in 2D, triangles in 3D), `DIM` particle
     * indices per element.
     * @param {number} handle
     * @returns {Uint32Array}
     */
    sbBoundary(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodyset_sbBoundary(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @returns {RawSoftBodyCellModel}
     */
    sbCellModel(handle) {
        const ret = wasm.rawsoftbodyset_sbCellModel(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number}
     */
    sbCellRestVolume(handle, i) {
        const ret = wasm.rawsoftbodyset_sbCellRestVolume(this.__wbg_ptr, handle, i);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number}
     */
    sbCellStiffnessScale(handle, i) {
        const ret = wasm.rawsoftbodyset_sbCellStiffnessScale(this.__wbg_ptr, handle, i);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number}
     */
    sbCellStress(handle, i) {
        const ret = wasm.rawsoftbodyset_sbCellStress(this.__wbg_ptr, handle, i);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number}
     */
    sbCellTearResistance(handle, i) {
        const ret = wasm.rawsoftbodyset_sbCellTearResistance(this.__wbg_ptr, handle, i);
        return ret;
    }
    /**
     * The particles of every cell, `DIM + 1` indices per cell.
     * @param {number} handle
     * @returns {Uint32Array}
     */
    sbCells(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodyset_sbCells(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @param {Float32Array} scratch_buffer
     */
    sbCenterOfMass(handle, scratch_buffer) {
        try {
            wasm.rawsoftbodyset_sbCenterOfMass(this.__wbg_ptr, handle, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {Uint32Array}
     */
    sbClusterParticles(handle, i) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodyset_sbClusterParticles(retptr, this.__wbg_ptr, handle, i);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number | undefined}
     */
    sbClusterProxy(handle, i) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodyset_sbClusterProxy(retptr, this.__wbg_ptr, handle, i);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getFloat64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {boolean}
     */
    sbClusterShapeMatchingEnabled(handle, i) {
        const ret = wasm.rawsoftbodyset_sbClusterShapeMatchingEnabled(this.__wbg_ptr, handle, i);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {boolean}
     */
    sbDetachParticle(handle, i) {
        const ret = wasm.rawsoftbodyset_sbDetachParticle(this.__wbg_ptr, handle, i);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number}
     */
    sbDihedralRestAngle(handle, i) {
        const ret = wasm.rawsoftbodyset_sbDihedralRestAngle(this.__wbg_ptr, handle, i);
        return ret;
    }
    /**
     * The particles of every dihedral (3D), four indices per dihedral.
     * @param {number} handle
     * @returns {Uint32Array}
     */
    sbDihedrals(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodyset_sbDihedrals(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number}
     */
    sbEdgeImpulse(handle, i) {
        const ret = wasm.rawsoftbodyset_sbEdgeImpulse(this.__wbg_ptr, handle, i);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {boolean}
     */
    sbEdgeIsBend(handle, i) {
        const ret = wasm.rawsoftbodyset_sbEdgeIsBend(this.__wbg_ptr, handle, i);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number}
     */
    sbEdgePlasticStrain(handle, i) {
        const ret = wasm.rawsoftbodyset_sbEdgePlasticStrain(this.__wbg_ptr, handle, i);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number}
     */
    sbEdgeRestLength(handle, i) {
        const ret = wasm.rawsoftbodyset_sbEdgeRestLength(this.__wbg_ptr, handle, i);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number}
     */
    sbEdgeStress(handle, i) {
        const ret = wasm.rawsoftbodyset_sbEdgeStress(this.__wbg_ptr, handle, i);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number}
     */
    sbEdgeTearResistance(handle, i) {
        const ret = wasm.rawsoftbodyset_sbEdgeTearResistance(this.__wbg_ptr, handle, i);
        return ret;
    }
    /**
     * The particle pairs of every edge, two indices per edge.
     * @param {number} handle
     * @returns {Uint32Array}
     */
    sbEdges(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodyset_sbEdges(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {boolean} enabled
     */
    sbEnableClusterShapeMatching(handle, i, enabled) {
        wasm.rawsoftbodyset_sbEnableClusterShapeMatching(this.__wbg_ptr, handle, i, enabled);
    }
    /**
     * @param {number} handle
     * @param {boolean} enabled
     */
    sbEnableVolumePreservation(handle, enabled) {
        wasm.rawsoftbodyset_sbEnableVolumePreservation(this.__wbg_ptr, handle, enabled);
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbGravityScale(handle) {
        const ret = wasm.rawsoftbodyset_sbGravityScale(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {boolean}
     */
    sbHasPendingTears(handle) {
        const ret = wasm.rawsoftbodyset_sbHasPendingTears(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {boolean}
     */
    sbIsClusterLive(handle, i) {
        const ret = wasm.rawsoftbodyset_sbIsClusterLive(this.__wbg_ptr, handle, i);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @returns {boolean}
     */
    sbIsEnabled(handle) {
        const ret = wasm.rawsoftbodyset_sbIsEnabled(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {boolean}
     */
    sbIsParticleDamaged(handle, i) {
        const ret = wasm.rawsoftbodyset_sbIsParticleDamaged(this.__wbg_ptr, handle, i);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {boolean}
     */
    sbIsParticleOnSurface(handle, i) {
        const ret = wasm.rawsoftbodyset_sbIsParticleOnSurface(this.__wbg_ptr, handle, i);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {boolean}
     */
    sbIsParticlePinned(handle, i) {
        const ret = wasm.rawsoftbodyset_sbIsParticlePinned(this.__wbg_ptr, handle, i);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @returns {boolean}
     */
    sbIsSleeping(handle) {
        const ret = wasm.rawsoftbodyset_sbIsSleeping(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbLinearDamping(handle) {
        const ret = wasm.rawsoftbodyset_sbLinearDamping(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbMass(handle) {
        const ret = wasm.rawsoftbodyset_sbMass(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {RawSoftBodyMaterial}
     */
    sbMaterial(handle) {
        const ret = wasm.rawsoftbodyset_sbMaterial(this.__wbg_ptr, handle);
        return RawSoftBodyMaterial.__wrap(ret);
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number | undefined}
     */
    sbMeshCluster(handle, i) {
        const ret = wasm.rawsoftbodyset_sbMeshCluster(this.__wbg_ptr, handle, i);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number | undefined}
     */
    sbMeshCollider(handle, i) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodyset_sbMeshCollider(retptr, this.__wbg_ptr, handle, i);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getFloat64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {boolean}
     */
    sbMeshCollisionEnabled(handle, i) {
        const ret = wasm.rawsoftbodyset_sbMeshCollisionEnabled(this.__wbg_ptr, handle, i);
        return ret !== 0;
    }
    /**
     * The elements of a collision mesh, `DIM` vertex indices per element.
     * @param {number} handle
     * @param {number} i
     * @returns {Uint32Array}
     */
    sbMeshIndices(handle, i) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodyset_sbMeshIndices(retptr, this.__wbg_ptr, handle, i);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {boolean}
     */
    sbMeshIsOriented(handle, i) {
        const ret = wasm.rawsoftbodyset_sbMeshIsOriented(this.__wbg_ptr, handle, i);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {boolean}
     */
    sbMeshIsSkinned(handle, i) {
        const ret = wasm.rawsoftbodyset_sbMeshIsSkinned(this.__wbg_ptr, handle, i);
        return ret !== 0;
    }
    /**
     * The index, in the body's mesh list, of the mesh a deformable collider holds.
     * @param {number} handle
     * @param {number} collider
     * @returns {number | undefined}
     */
    sbMeshOfCollider(handle, collider) {
        const ret = wasm.rawsoftbodyset_sbMeshOfCollider(this.__wbg_ptr, handle, collider);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * The world-space vertex positions of a collision mesh, `DIM` floats per vertex.
     * @param {number} handle
     * @param {number} i
     * @returns {Float32Array}
     */
    sbMeshVertices(handle, i) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodyset_sbMeshVertices(retptr, this.__wbg_ptr, handle, i);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbNumAttachments(handle) {
        const ret = wasm.rawsoftbodyset_sbNumAttachments(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbNumCells(handle) {
        const ret = wasm.rawsoftbodyset_sbNumCells(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbNumClusters(handle) {
        const ret = wasm.rawsoftbodyset_sbNumClusters(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbNumDihedrals(handle) {
        const ret = wasm.rawsoftbodyset_sbNumDihedrals(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbNumEdges(handle) {
        const ret = wasm.rawsoftbodyset_sbNumEdges(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbNumMeshes(handle) {
        const ret = wasm.rawsoftbodyset_sbNumMeshes(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbNumParticles(handle) {
        const ret = wasm.rawsoftbodyset_sbNumParticles(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * @param {number} handle
     * @returns {number | undefined}
     */
    sbOrigin(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodyset_sbOrigin(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getFloat64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @returns {number}
     */
    sbParticleMass(handle, i) {
        const ret = wasm.rawsoftbodyset_sbParticleMass(this.__wbg_ptr, handle, i);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {Float32Array} scratch_buffer
     */
    sbParticlePosition(handle, i, scratch_buffer) {
        try {
            wasm.rawsoftbodyset_sbParticlePosition(this.__wbg_ptr, handle, i, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} handle
     * @returns {Float32Array}
     */
    sbParticlePositions(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodyset_sbParticlePositions(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbParticleRadius(handle) {
        const ret = wasm.rawsoftbodyset_sbParticleRadius(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {Float32Array} scratch_buffer
     */
    sbParticleRestPosition(handle, i, scratch_buffer) {
        try {
            wasm.rawsoftbodyset_sbParticleRestPosition(this.__wbg_ptr, handle, i, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} handle
     * @returns {Float32Array}
     */
    sbParticleVelocities(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodyset_sbParticleVelocities(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {Float32Array} scratch_buffer
     */
    sbParticleVelocity(handle, i, scratch_buffer) {
        try {
            wasm.rawsoftbodyset_sbParticleVelocity(this.__wbg_ptr, handle, i, addBorrowedObject(scratch_buffer));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {number} handle
     * @returns {Float64Array}
     */
    sbPieces(handle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodyset_sbPieces(retptr, this.__wbg_ptr, handle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayF64FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 8, 8);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} handle
     * @param {boolean} wake_up
     */
    sbResetForces(handle, wake_up) {
        wasm.rawsoftbodyset_sbResetForces(this.__wbg_ptr, handle, wake_up);
    }
    /**
     * @param {number} handle
     */
    sbResetPlasticity(handle) {
        wasm.rawsoftbodyset_sbResetPlasticity(this.__wbg_ptr, handle);
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbRestVolume(handle) {
        const ret = wasm.rawsoftbodyset_sbRestVolume(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbRootBody(handle) {
        const ret = wasm.rawsoftbodyset_sbRootBody(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {number} iterations
     */
    sbSetAdditionalPgsIterations(handle, iterations) {
        wasm.rawsoftbodyset_sbSetAdditionalPgsIterations(this.__wbg_ptr, handle, iterations);
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {number | null} [natural_frequency]
     * @param {number | null} [damping_ratio]
     */
    sbSetClusterEdgeSoftness(handle, i, natural_frequency, damping_ratio) {
        wasm.rawsoftbodyset_sbSetClusterEdgeSoftness(this.__wbg_ptr, handle, i, isLikeNone(natural_frequency) ? Number.MAX_SAFE_INTEGER : Math.fround(natural_frequency), isLikeNone(damping_ratio) ? Number.MAX_SAFE_INTEGER : Math.fround(damping_ratio));
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {RawVector} translation
     * @param {RawRotation} rotation
     */
    sbSetClusterKinematicTarget(handle, i, translation, rotation) {
        _assertClass(translation, RawVector);
        _assertClass(rotation, RawRotation);
        wasm.rawsoftbodyset_sbSetClusterKinematicTarget(this.__wbg_ptr, handle, i, translation.__wbg_ptr, rotation.__wbg_ptr);
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {boolean} pinned
     */
    sbSetClusterPinned(handle, i, pinned) {
        wasm.rawsoftbodyset_sbSetClusterPinned(this.__wbg_ptr, handle, i, pinned);
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {number} scale
     */
    sbSetClusterStiffnessScale(handle, i, scale) {
        wasm.rawsoftbodyset_sbSetClusterStiffnessScale(this.__wbg_ptr, handle, i, scale);
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {number} resistance
     */
    sbSetClusterTearResistance(handle, i, resistance) {
        wasm.rawsoftbodyset_sbSetClusterTearResistance(this.__wbg_ptr, handle, i, resistance);
    }
    /**
     * @param {number} handle
     * @param {boolean} enabled
     */
    sbSetEnabled(handle, enabled) {
        wasm.rawsoftbodyset_sbSetEnabled(this.__wbg_ptr, handle, enabled);
    }
    /**
     * @param {number} handle
     * @param {RawSoftBodyMaterial} material
     */
    sbSetMaterial(handle, material) {
        _assertClass(material, RawSoftBodyMaterial);
        wasm.rawsoftbodyset_sbSetMaterial(this.__wbg_ptr, handle, material.__wbg_ptr);
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {RawVector} position
     */
    sbSetParticleKinematicTarget(handle, i, position) {
        _assertClass(position, RawVector);
        wasm.rawsoftbodyset_sbSetParticleKinematicTarget(this.__wbg_ptr, handle, i, position.__wbg_ptr);
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {boolean} pinned
     */
    sbSetParticlePinned(handle, i, pinned) {
        wasm.rawsoftbodyset_sbSetParticlePinned(this.__wbg_ptr, handle, i, pinned);
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {RawVector} position
     */
    sbSetParticlePosition(handle, i, position) {
        _assertClass(position, RawVector);
        wasm.rawsoftbodyset_sbSetParticlePosition(this.__wbg_ptr, handle, i, position.__wbg_ptr);
    }
    /**
     * @param {number} handle
     * @param {number} i
     * @param {RawVector} velocity
     */
    sbSetParticleVelocity(handle, i, velocity) {
        _assertClass(velocity, RawVector);
        wasm.rawsoftbodyset_sbSetParticleVelocity(this.__wbg_ptr, handle, i, velocity.__wbg_ptr);
    }
    /**
     * @param {number} handle
     * @param {RawSoftBodySolver} solver
     */
    sbSetSolver(handle, solver) {
        wasm.rawsoftbodyset_sbSetSolver(this.__wbg_ptr, handle, solver);
    }
    /**
     * @param {number} handle
     * @param {number} data
     */
    sbSetUserData(handle, data) {
        wasm.rawsoftbodyset_sbSetUserData(this.__wbg_ptr, handle, data);
    }
    /**
     * @param {number} handle
     * @param {number} factor
     */
    sbSetVolumeFactor(handle, factor) {
        wasm.rawsoftbodyset_sbSetVolumeFactor(this.__wbg_ptr, handle, factor);
    }
    /**
     * @param {number} handle
     * @returns {RawSoftBodySolver}
     */
    sbSolver(handle) {
        const ret = wasm.rawsoftbodyset_sbSolver(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {number} i
     */
    sbTearCell(handle, i) {
        wasm.rawsoftbodyset_sbTearCell(this.__wbg_ptr, handle, i);
    }
    /**
     * @param {number} handle
     * @param {number} i
     */
    sbTearEdge(handle, i) {
        wasm.rawsoftbodyset_sbTearEdge(this.__wbg_ptr, handle, i);
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbTopologyVersion(handle) {
        const ret = wasm.rawsoftbodyset_sbTopologyVersion(this.__wbg_ptr, handle);
        return ret >>> 0;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbUserData(handle) {
        const ret = wasm.rawsoftbodyset_sbUserData(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbVolumeFactor(handle) {
        const ret = wasm.rawsoftbodyset_sbVolumeFactor(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {boolean}
     */
    sbVolumePreservationEnabled(handle) {
        const ret = wasm.rawsoftbodyset_sbVolumePreservationEnabled(this.__wbg_ptr, handle);
        return ret !== 0;
    }
    /**
     * @param {number} handle
     * @returns {number}
     */
    sbVolume(handle) {
        const ret = wasm.rawsoftbodyset_sbVolume(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     */
    sbWakeUp(handle) {
        wasm.rawsoftbodyset_sbWakeUp(this.__wbg_ptr, handle);
    }
    /**
     * @param {number} handle
     * @param {Uint32Array} edges
     * @param {Uint32Array} cells
     * @param {RawIslandManager} islands
     * @param {RawRigidBodySet} bodies
     * @param {RawColliderSet} colliders
     * @param {RawImpulseJointSet} joints
     * @param {RawMultibodyJointSet} articulations
     * @returns {RawSoftBodyTearEvent | undefined}
     */
    tear(handle, edges, cells, islands, bodies, colliders, joints, articulations) {
        const ptr0 = passArray32ToWasm0(edges, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(cells, wasm.__wbindgen_export3);
        const len1 = WASM_VECTOR_LEN;
        _assertClass(islands, RawIslandManager);
        _assertClass(bodies, RawRigidBodySet);
        _assertClass(colliders, RawColliderSet);
        _assertClass(joints, RawImpulseJointSet);
        _assertClass(articulations, RawMultibodyJointSet);
        const ret = wasm.rawsoftbodyset_tear(this.__wbg_ptr, handle, ptr0, len0, ptr1, len1, islands.__wbg_ptr, bodies.__wbg_ptr, colliders.__wbg_ptr, joints.__wbg_ptr, articulations.__wbg_ptr);
        return ret === 0 ? undefined : RawSoftBodyTearEvent.__wrap(ret);
    }
    /**
     * @param {number} handle
     * @param {RawRigidBodySet} bodies
     * @param {boolean} strong
     */
    wakeUp(handle, bodies, strong) {
        _assertClass(bodies, RawRigidBodySet);
        wasm.rawsoftbodyset_wakeUp(this.__wbg_ptr, handle, bodies.__wbg_ptr, strong);
    }
}
if (Symbol.dispose) RawSoftBodySet.prototype[Symbol.dispose] = RawSoftBodySet.prototype.free;

/**
 * Which soft-body solver holds the cells of a body together.
 * @enum {0 | 1}
 */
export const RawSoftBodySolver = Object.freeze({
    Constraints: 0, "0": "Constraints",
    Fem: 1, "1": "Fem",
});

export class RawSoftBodyTearEvent {
    static __wrap(ptr) {
        const obj = Object.create(RawSoftBodyTearEvent.prototype);
        obj.__wbg_ptr = ptr;
        RawSoftBodyTearEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawSoftBodyTearEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawsoftbodytearevent_free(ptr, 0);
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    clusterSplitCluster(i) {
        const ret = wasm.rawsoftbodytearevent_clusterSplitCluster(this.__wbg_ptr, i);
        return ret >>> 0;
    }
    /**
     * @param {number} i
     * @returns {boolean}
     */
    clusterSplitKeepsProxy(i) {
        const ret = wasm.rawsoftbodytearevent_clusterSplitKeepsProxy(this.__wbg_ptr, i);
        return ret !== 0;
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    clusterSplitProxy(i) {
        const ret = wasm.rawsoftbodytearevent_clusterSplitProxy(this.__wbg_ptr, i);
        return ret;
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    clusterSplitSoftBody(i) {
        const ret = wasm.rawsoftbodytearevent_clusterSplitSoftBody(this.__wbg_ptr, i);
        return ret;
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    clusterSplitSource(i) {
        const ret = wasm.rawsoftbodytearevent_clusterSplitSource(this.__wbg_ptr, i);
        return ret >>> 0;
    }
    /**
     * @returns {Uint32Array}
     */
    insertedParticles() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodytearevent_insertedParticles(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    movedJointFrom(i) {
        const ret = wasm.rawsoftbodytearevent_movedJointFrom(this.__wbg_ptr, i);
        return ret;
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    movedJointTo(i) {
        const ret = wasm.rawsoftbodytearevent_movedJointTo(this.__wbg_ptr, i);
        return ret;
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    movedJoint(i) {
        const ret = wasm.rawsoftbodytearevent_movedJoint(this.__wbg_ptr, i);
        return ret;
    }
    /**
     * @returns {number}
     */
    numClusterSplits() {
        const ret = wasm.rawsoftbodytearevent_numClusterSplits(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    numMovedJoints() {
        const ret = wasm.rawsoftbodytearevent_numMovedJoints(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    numPieces() {
        const ret = wasm.rawsoftbodytearevent_numPieces(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} particle
     * @returns {number | undefined}
     */
    particleDestinationBody(particle) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodytearevent_particleDestinationBody(retptr, this.__wbg_ptr, particle);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getFloat64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} particle
     * @returns {number | undefined}
     */
    particleDestinationIndex(particle) {
        const ret = wasm.rawsoftbodytearevent_particleDestinationIndex(this.__wbg_ptr, particle);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} i
     * @returns {Uint32Array}
     */
    pieceClusters(i) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodytearevent_pieceClusters(retptr, this.__wbg_ptr, i);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} i
     * @returns {Uint32Array}
     */
    pieceParticles(i) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodytearevent_pieceParticles(retptr, this.__wbg_ptr, i);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} i
     * @returns {number}
     */
    pieceSoftBody(i) {
        const ret = wasm.rawsoftbodytearevent_pieceSoftBody(this.__wbg_ptr, i);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    removedEdges() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodytearevent_removedEdges(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {Uint32Array}
     */
    seeds() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodytearevent_seeds(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {number}
     */
    softBody() {
        const ret = wasm.rawsoftbodytearevent_softBody(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    splitParticles() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodytearevent_splitParticles(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {Uint32Array}
     */
    tornCells() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodytearevent_tornCells(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {Uint32Array}
     */
    tornEdges() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rawsoftbodytearevent_tornEdges(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
if (Symbol.dispose) RawSoftBodyTearEvent.prototype[Symbol.dispose] = RawSoftBodyTearEvent.prototype.free;

/**
 * @enum {0 | 1 | 2}
 */
export const RawSoftEdgePlasticFlow = Object.freeze({
    Both: 0, "0": "Both",
    Compression: 1, "1": "Compression",
    Tension: 2, "2": "Tension",
});

/**
 * How a deformable collider's vertices follow the particles of its cluster.
 * @enum {0 | 1 | 2}
 */
export const RawSoftMeshBindingMode = Object.freeze({
    Direct: 0, "0": "Direct",
    DirectByPosition: 1, "1": "DirectByPosition",
    Skinned: 2, "2": "Skinned",
});

/**
 * What the per-point constraints of the features a volume constraint acts on do.
 * @enum {0 | 1 | 2}
 */
export const RawSoftPatchConstraints = Object.freeze({
    Keep: 0, "0": "Keep",
    StandDown: 1, "1": "StandDown",
    AlongNormal: 2, "2": "AlongNormal",
});

export class RawSoftRecoverySettings {
    static __wrap(ptr) {
        const obj = Object.create(RawSoftRecoverySettings.prototype);
        obj.__wbg_ptr = ptr;
        RawSoftRecoverySettingsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawSoftRecoverySettingsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawsoftrecoverysettings_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get authoredVelocityMargin() {
        const ret = wasm.rawsoftrecoverysettings_authoredVelocityMargin(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get crossBodyDetection() {
        const ret = wasm.rawsoftrecoverysettings_crossBodyDetection(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get crossBodyExpelGate() {
        const ret = wasm.rawsoftrecoverysettings_crossBodyExpelGate(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get crossingRepulsionGuide() {
        const ret = wasm.rawsoftrecoverysettings_crossingRepulsionGuide(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get crossingRepulsionSelfGuide() {
        const ret = wasm.rawsoftrecoverysettings_crossingRepulsionSelfGuide(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get crossingRepulsion() {
        const ret = wasm.rawsoftrecoverysettings_crossingRepulsion(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get detectionMotionGating() {
        const ret = wasm.rawsoftrecoverysettings_detectionMotionGating(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get edgeSpeculation() {
        const ret = wasm.rawsoftrecoverysettings_edgeSpeculation(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get edgeStandDown() {
        const ret = wasm.rawsoftrecoverysettings_edgeStandDown(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get invertedCellDetection() {
        const ret = wasm.rawsoftrecoverysettings_invertedCellDetection(this.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.rawsoftrecoverysettings_new();
        this.__wbg_ptr = ret;
        RawSoftRecoverySettingsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get overlapConstraintPace() {
        const ret = wasm.rawsoftrecoverysettings_overlapConstraintPace(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get overlapConstraints() {
        const ret = wasm.rawsoftrecoverysettings_overlapConstraints(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get overlapEdgeStandDown() {
        const ret = wasm.rawsoftrecoverysettings_overlapEdgeStandDown(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get overlapKeptDepth() {
        const ret = wasm.rawsoftrecoverysettings_overlapKeptDepth(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get overlapMultiVolume() {
        const ret = wasm.rawsoftrecoverysettings_overlapMultiVolume(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get overlapNormalPush() {
        const ret = wasm.rawsoftrecoverysettings_overlapNormalPush(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {RawSoftPatchConstraints}
     */
    get overlapPatchConstraints() {
        const ret = wasm.rawsoftrecoverysettings_overlapPatchConstraints(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get overlapPatience() {
        const ret = wasm.rawsoftrecoverysettings_overlapPatience(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get overlapProgressMargin() {
        const ret = wasm.rawsoftrecoverysettings_overlapProgressMargin(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get overlapRigid() {
        const ret = wasm.rawsoftrecoverysettings_overlapRigid(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get overlapSelfRegions() {
        const ret = wasm.rawsoftrecoverysettings_overlapSelfRegions(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get overlapSkinVolume() {
        const ret = wasm.rawsoftrecoverysettings_overlapSkinVolume(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get overlapSkipSelfTangled() {
        const ret = wasm.rawsoftrecoverysettings_overlapSkipSelfTangled(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get overlapSplit() {
        const ret = wasm.rawsoftrecoverysettings_overlapSplit(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get recoveryPace() {
        const ret = wasm.rawsoftrecoverysettings_recoveryPace(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get selfCrossingDetection() {
        const ret = wasm.rawsoftrecoverysettings_selfCrossingDetection(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get selfStandDown() {
        const ret = wasm.rawsoftrecoverysettings_selfStandDown(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} value
     */
    set authoredVelocityMargin(value) {
        wasm.rawsoftrecoverysettings_set_authoredVelocityMargin(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set crossBodyDetection(value) {
        wasm.rawsoftrecoverysettings_set_crossBodyDetection(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set crossBodyExpelGate(value) {
        wasm.rawsoftrecoverysettings_set_crossBodyExpelGate(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set crossingRepulsionGuide(value) {
        wasm.rawsoftrecoverysettings_set_crossingRepulsionGuide(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set crossingRepulsionSelfGuide(value) {
        wasm.rawsoftrecoverysettings_set_crossingRepulsionSelfGuide(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set crossingRepulsion(value) {
        wasm.rawsoftrecoverysettings_set_crossingRepulsion(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set detectionMotionGating(value) {
        wasm.rawsoftrecoverysettings_set_detectionMotionGating(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set edgeSpeculation(value) {
        wasm.rawsoftrecoverysettings_set_edgeSpeculation(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set edgeStandDown(value) {
        wasm.rawsoftrecoverysettings_set_edgeStandDown(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set invertedCellDetection(value) {
        wasm.rawsoftrecoverysettings_set_invertedCellDetection(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set overlapConstraintPace(value) {
        wasm.rawsoftrecoverysettings_set_overlapConstraintPace(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set overlapConstraints(value) {
        wasm.rawsoftrecoverysettings_set_overlapConstraints(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set overlapEdgeStandDown(value) {
        wasm.rawsoftrecoverysettings_set_overlapEdgeStandDown(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set overlapKeptDepth(value) {
        wasm.rawsoftrecoverysettings_set_overlapKeptDepth(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set overlapMultiVolume(value) {
        wasm.rawsoftrecoverysettings_set_overlapMultiVolume(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set overlapNormalPush(value) {
        wasm.rawsoftrecoverysettings_set_overlapNormalPush(this.__wbg_ptr, value);
    }
    /**
     * @param {RawSoftPatchConstraints} value
     */
    set overlapPatchConstraints(value) {
        wasm.rawsoftrecoverysettings_set_overlapPatchConstraints(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set overlapPatience(value) {
        wasm.rawsoftrecoverysettings_set_overlapPatience(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set overlapProgressMargin(value) {
        wasm.rawsoftrecoverysettings_set_overlapProgressMargin(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set overlapRigid(value) {
        wasm.rawsoftrecoverysettings_set_overlapRigid(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set overlapSelfRegions(value) {
        wasm.rawsoftrecoverysettings_set_overlapSelfRegions(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set overlapSkinVolume(value) {
        wasm.rawsoftrecoverysettings_set_overlapSkinVolume(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set overlapSkipSelfTangled(value) {
        wasm.rawsoftrecoverysettings_set_overlapSkipSelfTangled(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set overlapSplit(value) {
        wasm.rawsoftrecoverysettings_set_overlapSplit(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    set recoveryPace(value) {
        wasm.rawsoftrecoverysettings_set_recoveryPace(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set selfCrossingDetection(value) {
        wasm.rawsoftrecoverysettings_set_selfCrossingDetection(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    set selfStandDown(value) {
        wasm.rawsoftrecoverysettings_set_selfStandDown(this.__wbg_ptr, value);
    }
}
if (Symbol.dispose) RawSoftRecoverySettings.prototype[Symbol.dispose] = RawSoftRecoverySettings.prototype.free;

/**
 * Parameters for VHACD convex decomposition algorithm
 */
export class RawVHACDParameters {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawVHACDParametersFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawvhacdparameters_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get alpha() {
        const ret = wasm.rawvhacdparameters_alpha(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get beta() {
        const ret = wasm.rawvhacdparameters_beta(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get concavity() {
        const ret = wasm.rawvhacdparameters_concavity(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get convex_hull_approximation() {
        const ret = wasm.rawvhacdparameters_convex_hull_approximation(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get convex_hull_downsampling() {
        const ret = wasm.rawvhacdparameters_convex_hull_downsampling(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get max_convex_hulls() {
        const ret = wasm.rawvhacdparameters_max_convex_hulls(this.__wbg_ptr);
        return ret >>> 0;
    }
    constructor() {
        const ret = wasm.rawvhacdparameters_new();
        this.__wbg_ptr = ret;
        RawVHACDParametersFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get plane_downsampling() {
        const ret = wasm.rawvhacdparameters_plane_downsampling(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get resolution() {
        const ret = wasm.rawvhacdparameters_resolution(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} val
     */
    set alpha(val) {
        wasm.rawvhacdparameters_set_alpha(this.__wbg_ptr, val);
    }
    /**
     * @param {number} val
     */
    set beta(val) {
        wasm.rawvhacdparameters_set_beta(this.__wbg_ptr, val);
    }
    /**
     * @param {number} val
     */
    set concavity(val) {
        wasm.rawvhacdparameters_set_concavity(this.__wbg_ptr, val);
    }
    /**
     * @param {boolean} val
     */
    set convex_hull_approximation(val) {
        wasm.rawvhacdparameters_set_convex_hull_approximation(this.__wbg_ptr, val);
    }
    /**
     * @param {number} val
     */
    set convex_hull_downsampling(val) {
        wasm.rawvhacdparameters_set_convex_hull_downsampling(this.__wbg_ptr, val);
    }
    /**
     * @param {number} val
     */
    set max_convex_hulls(val) {
        wasm.rawvhacdparameters_set_max_convex_hulls(this.__wbg_ptr, val);
    }
    /**
     * @param {number} val
     */
    set plane_downsampling(val) {
        wasm.rawvhacdparameters_set_plane_downsampling(this.__wbg_ptr, val);
    }
    /**
     * @param {number} val
     */
    set resolution(val) {
        wasm.rawvhacdparameters_set_resolution(this.__wbg_ptr, val);
    }
}
if (Symbol.dispose) RawVHACDParameters.prototype[Symbol.dispose] = RawVHACDParameters.prototype.free;

/**
 * A vector.
 */
export class RawVector {
    static __wrap(ptr) {
        const obj = Object.create(RawVector.prototype);
        obj.__wbg_ptr = ptr;
        RawVectorFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawVectorFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawvector_free(ptr, 0);
    }
    /**
     * Creates a new 3D vector from its two components.
     *
     * # Parameters
     * - `x`: the `x` component of this 3D vector.
     * - `y`: the `y` component of this 3D vector.
     * - `z`: the `z` component of this 3D vector.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
        const ret = wasm.rawvector_new(x, y, z);
        this.__wbg_ptr = ret;
        RawVectorFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Sets the `x` component of this vector.
     * @param {number} x
     */
    set x(x) {
        wasm.rawvector_set_x(this.__wbg_ptr, x);
    }
    /**
     * Sets the `y` component of this vector.
     * @param {number} y
     */
    set y(y) {
        wasm.rawvector_set_y(this.__wbg_ptr, y);
    }
    /**
     * Sets the `z` component of this vector.
     * @param {number} z
     */
    set z(z) {
        wasm.rawvector_set_z(this.__wbg_ptr, z);
    }
    /**
     * The `x` component of this vector.
     * @returns {number}
     */
    get x() {
        const ret = wasm.rawvector_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * Create a new 3D vector from this vector with its components rearranged as `{x, y, z}`.
     *
     * This will effectively return a copy of `this`. This method exist for completeness with the
     * other swizzling functions.
     * @returns {RawVector}
     */
    xyz() {
        const ret = wasm.rawvector_xyz(this.__wbg_ptr);
        return RawVector.__wrap(ret);
    }
    /**
     * Create a new 3D vector from this vector with its components rearranged as `{x, z, y}`.
     * @returns {RawVector}
     */
    xzy() {
        const ret = wasm.rawvector_xzy(this.__wbg_ptr);
        return RawVector.__wrap(ret);
    }
    /**
     * The `y` component of this vector.
     * @returns {number}
     */
    get y() {
        const ret = wasm.rawvector_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * Create a new 3D vector from this vector with its components rearranged as `{y, x, z}`.
     * @returns {RawVector}
     */
    yxz() {
        const ret = wasm.rawvector_yxz(this.__wbg_ptr);
        return RawVector.__wrap(ret);
    }
    /**
     * Create a new 3D vector from this vector with its components rearranged as `{y, z, x}`.
     * @returns {RawVector}
     */
    yzx() {
        const ret = wasm.rawvector_yzx(this.__wbg_ptr);
        return RawVector.__wrap(ret);
    }
    /**
     * The `z` component of this vector.
     * @returns {number}
     */
    get z() {
        const ret = wasm.rawvector_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * Creates a new vector filled with zeros.
     * @returns {RawVector}
     */
    static zero() {
        const ret = wasm.rawvector_zero();
        return RawVector.__wrap(ret);
    }
    /**
     * Create a new 3D vector from this vector with its components rearranged as `{z, x, y}`.
     * @returns {RawVector}
     */
    zxy() {
        const ret = wasm.rawvector_zxy(this.__wbg_ptr);
        return RawVector.__wrap(ret);
    }
    /**
     * Create a new 3D vector from this vector with its components rearranged as `{z, y, x}`.
     * @returns {RawVector}
     */
    zyx() {
        const ret = wasm.rawvector_zyx(this.__wbg_ptr);
        return RawVector.__wrap(ret);
    }
}
if (Symbol.dispose) RawVector.prototype[Symbol.dispose] = RawVector.prototype.free;

/**
 * @param {number} extra_bytes_count
 */
export function reserve_memory(extra_bytes_count) {
    wasm.reserve_memory(extra_bytes_count);
}

/**
 * @returns {string}
 */
export function version() {
    let deferred1_0;
    let deferred1_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.version(retptr);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred1_0 = r0;
        deferred1_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export2(deferred1_0, deferred1_1, 1);
    }
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_boolean_get_5b446f51afd21013: function(arg0) {
            const v = getObject(arg0);
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_is_function_1f9d30630b8b1d3d: function(arg0) {
            const ret = typeof(getObject(arg0)) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_undefined_8865fb403f8fe9d8: function(arg0) {
            const ret = getObject(arg0) === undefined;
            return ret;
        },
        __wbg___wbindgen_number_get_2e0e7dee9f701a71: function(arg0, arg1) {
            const obj = getObject(arg1);
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_throw_41e9ee4f547fc59a: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_bind_e7f12e49a3040c89: function(arg0, arg1, arg2, arg3) {
            const ret = getObject(arg0).bind(getObject(arg1), getObject(arg2), getObject(arg3));
            return addHeapObject(ret);
        },
        __wbg_call_1875a20c43a36133: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = getObject(arg0).call(getObject(arg1), getObject(arg2), getObject(arg3));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_call_187d372bd5fdd4aa: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_call_939a2607c4484b0b: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = getObject(arg0).call(getObject(arg1), getObject(arg2), getObject(arg3), getObject(arg4));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_length_58572db4c38f3c3e: function(arg0) {
            const ret = getObject(arg0).length;
            return ret;
        },
        __wbg_length_7f3c00c40364105e: function(arg0) {
            const ret = getObject(arg0).length;
            return ret;
        },
        __wbg_new_from_slice_9a868026ffa4208a: function(arg0, arg1) {
            const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
            return addHeapObject(ret);
        },
        __wbg_new_with_length_cc0362bfe8499e5a: function(arg0) {
            const ret = new Float32Array(arg0 >>> 0);
            return addHeapObject(ret);
        },
        __wbg_now_e7c6795a7f81e10f: function(arg0) {
            const ret = getObject(arg0).now();
            return ret;
        },
        __wbg_performance_3fcf6e32a7e1ed0a: function(arg0) {
            const ret = getObject(arg0).performance;
            return addHeapObject(ret);
        },
        __wbg_prototypesetcall_bc27214492979395: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), getObject(arg2));
        },
        __wbg_rawcontactforceevent_new: function(arg0) {
            const ret = RawContactForceEvent.__wrap(arg0);
            return addHeapObject(ret);
        },
        __wbg_rawraycolliderintersection_new: function(arg0) {
            const ret = RawRayColliderIntersection.__wrap(arg0);
            return addHeapObject(ret);
        },
        __wbg_rawshape_unwrap: function(arg0) {
            const ret = RawShape.__unwrap(getObject(arg0));
            return ret;
        },
        __wbg_rawsoftbodytearevent_new: function(arg0) {
            const ret = RawSoftBodyTearEvent.__wrap(arg0);
            return addHeapObject(ret);
        },
        __wbg_set_070bd465f1c195a4: function(arg0, arg1, arg2) {
            getObject(arg0).set(getArrayF32FromWasm0(arg1, arg2));
        },
        __wbg_set_index_3a9fd81ba7ece0c0: function(arg0, arg1, arg2) {
            getObject(arg0)[arg1 >>> 0] = arg2;
        },
        __wbg_static_accessor_GLOBAL_266715b9d96ba635: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_static_accessor_GLOBAL_THIS_10fb7dc1ae063179: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_static_accessor_SELF_0b583911f537483a: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_static_accessor_WINDOW_d7f903d1508cbdc4: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbindgen_generic_0000000000000001: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return addHeapObject(ret);
        },
        __wbindgen_object_clone_ref: function(arg0) {
            const ret = getObject(arg0);
            return addHeapObject(ret);
        },
        __wbindgen_object_drop_ref: function(arg0) {
            takeObject(arg0);
        },
    };
    return {
        __proto__: null,
        "./rapier_wasm3d_bg.js": import0,
    };
}

const RawBroadPhaseFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawbroadphase_free(ptr, 1));
const RawCCDSolverFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawccdsolver_free(ptr, 1));
const RawCharacterCollisionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawcharactercollision_free(ptr, 1));
const RawColliderSetFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawcolliderset_free(ptr, 1));
const RawColliderShapeCastHitFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawcollidershapecasthit_free(ptr, 1));
const RawContactForceEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawcontactforceevent_free(ptr, 1));
const RawContactManifoldFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawcontactmanifold_free(ptr, 1));
const RawContactPairFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawcontactpair_free(ptr, 1));
const RawConvexMeshDataFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawconvexmeshdata_free(ptr, 1));
const RawDebugRenderPipelineFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawdebugrenderpipeline_free(ptr, 1));
const RawDeserializedWorldFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawdeserializedworld_free(ptr, 1));
const RawDynamicRayCastVehicleControllerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawdynamicraycastvehiclecontroller_free(ptr, 1));
const RawEventQueueFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_raweventqueue_free(ptr, 1));
const RawGenericJointFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawgenericjoint_free(ptr, 1));
const RawImpulseJointSetFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawimpulsejointset_free(ptr, 1));
const RawIntegrationParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawintegrationparameters_free(ptr, 1));
const RawIslandManagerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawislandmanager_free(ptr, 1));
const RawKinematicCharacterControllerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawkinematiccharactercontroller_free(ptr, 1));
const RawMultibodyJointSetFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawmultibodyjointset_free(ptr, 1));
const RawNarrowPhaseFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawnarrowphase_free(ptr, 1));
const RawPhysicsPipelineFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawphysicspipeline_free(ptr, 1));
const RawPidControllerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawpidcontroller_free(ptr, 1));
const RawPointColliderProjectionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawpointcolliderprojection_free(ptr, 1));
const RawPointProjectionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawpointprojection_free(ptr, 1));
const RawRayColliderHitFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawraycolliderhit_free(ptr, 1));
const RawRayColliderIntersectionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawraycolliderintersection_free(ptr, 1));
const RawRayIntersectionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawrayintersection_free(ptr, 1));
const RawRigidBodySetFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawrigidbodyset_free(ptr, 1));
const RawRotationFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawrotation_free(ptr, 1));
const RawSdpMatrix3Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawsdpmatrix3_free(ptr, 1));
const RawSerializationPipelineFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawserializationpipeline_free(ptr, 1));
const RawShapeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawshape_free(ptr, 1));
const RawShapeCastHitFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawshapecasthit_free(ptr, 1));
const RawShapeContactFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawshapecontact_free(ptr, 1));
const RawSoftBodyBuilderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawsoftbodybuilder_free(ptr, 1));
const RawSoftBodyMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawsoftbodymaterial_free(ptr, 1));
const RawSoftBodySetFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawsoftbodyset_free(ptr, 1));
const RawSoftBodyTearEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawsoftbodytearevent_free(ptr, 1));
const RawSoftRecoverySettingsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawsoftrecoverysettings_free(ptr, 1));
const RawVHACDParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawvhacdparameters_free(ptr, 1));
const RawVectorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawvector_free(ptr, 1));

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}

function dropObject(idx) {
    if (idx < 1028) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

let cachedInt32ArrayMemory0 = null;
function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getObject(idx) { return heap[idx]; }

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_export(addHeapObject(e));
    }
}

let heap = new Array(1024).fill(undefined);
heap.push(undefined, null, true, false);

let heap_next = heap.length;

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    const mem = getDataViewMemory0();
    for (let i = 0; i < array.length; i++) {
        mem.setUint32(ptr + 4 * i, addHeapObject(array[i]), true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

let stack_pointer = 1024;

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedInt32ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (!module.ok) {
            throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
        }

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('rapier_wasm3d_bg.wasm', "<deleted>");
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
