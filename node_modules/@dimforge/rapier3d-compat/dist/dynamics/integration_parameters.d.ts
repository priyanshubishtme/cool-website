import { RawIntegrationParameters } from "../raw";
import { SoftRecoverySettings } from "./soft_body";
export declare class IntegrationParameters {
    raw: RawIntegrationParameters;
    constructor(raw?: RawIntegrationParameters);
    /**
     * Free the WASM memory used by these integration parameters.
     */
    free(): void;
    /**
     * The timestep length (default: `1.0 / 60.0`)
     */
    get dt(): number;
    /**
     * The Error Reduction Parameter in `[0, 1]` is the proportion of
     * the positional error to be corrected at each time step (default: `0.2`).
     */
    get contact_erp(): number;
    get lengthUnit(): number;
    /**
     * Normalized amount of penetration the engine won’t attempt to correct (default: `0.001m`).
     *
     * This threshold considered by the physics engine is this value multiplied by the `lengthUnit`.
     */
    get normalizedAllowedLinearError(): number;
    /**
     * The maximal normalized distance separating two objects that will generate predictive contacts (default: `0.02`).
     *
     * This threshold considered by the physics engine is this value multiplied by the `lengthUnit`.
     */
    get normalizedPredictionDistance(): number;
    /**
     * The number of solver iterations run by the constraints solver for calculating forces (default: `4`).
     */
    get numSolverIterations(): number;
    /**
     * Number of internal Project Gauss Seidel (PGS) iterations run at each solver iteration (default: `1`).
     */
    get numInternalPgsIterations(): number;
    /**
     * Maximum number of substeps performed by the  solver (default: `1`).
     */
    get maxCcdSubsteps(): number;
    /**
     * Strain beyond which a soft-body constraint is re-solved after the contacts inside every
     * substep, so a light body buried under heavier ones is not torn (default: `0.75`).
     */
    get softBodiesResweepStrain(): number;
    /**
     * Maximum number of extra substeps a soft body requests for its island while it is hit
     * fast (default: `4`; `0` disables the impact-adaptive substeps).
     */
    get softBodiesMaxExtraSubsteps(): number;
    /**
     * Factor applied to the contact softness natural frequencies for the soft-body contacts
     * (default: `4.0`).
     */
    get softBodiesContactStiffening(): number;
    /**
     * The tangle detection and recovery settings shared by every soft body of the world.
     *
     * This gives back a copy: change it and assign it back to apply it.
     */
    get softBodiesRecovery(): SoftRecoverySettings;
    /**
     * Relative residual at which the conjugate gradient of the FEM soft-body solver stops
     * (default: `1.0e-5`).
     */
    get softBodiesFemLinearTolerance(): number;
    /**
     * Hard cap on the conjugate-gradient iterations of the FEM soft-body solver, whatever the
     * residual (default: `20`).
     */
    get softBodiesFemMaxLinearIterations(): number;
    /**
     * Largest number of degrees of freedom for which a FEM soft body is factorized directly
     * (default: `600`); the larger ones rely on the conjugate gradient.
     */
    get softBodiesFemMaxDenseDofs(): number;
    set dt(value: number);
    set softBodiesResweepStrain(value: number);
    set softBodiesMaxExtraSubsteps(value: number);
    set softBodiesContactStiffening(value: number);
    set softBodiesRecovery(value: SoftRecoverySettings);
    set softBodiesFemLinearTolerance(value: number);
    set softBodiesFemMaxLinearIterations(value: number);
    set softBodiesFemMaxDenseDofs(value: number);
    set contact_natural_frequency(value: number);
    set lengthUnit(value: number);
    set normalizedAllowedLinearError(value: number);
    set normalizedPredictionDistance(value: number);
    /**
     * Sets the number of solver iterations run by the constraints solver for calculating forces (default: `4`).
     */
    set numSolverIterations(value: number);
    /**
     * Sets the number of internal Project Gauss Seidel (PGS) iterations run at each solver iteration (default: `1`).
     */
    set numInternalPgsIterations(value: number);
    set maxCcdSubsteps(value: number);
}
