import type { Validator } from '$webawesome/internal/webawesome-form-associated-element.js';
import type WaDateInput from '../date-input.js';
/**
 * Validates a `<wa-date-input>`'s committed value against its `min`/`max` properties, producing
 * `rangeUnderflow`/`rangeOverflow` validity. In range mode, both ends are checked. ISO `YYYY-MM-DD`
 * strings are lexically ordered, so plain string comparison is sufficient.
 */
export declare const MinMaxDateValidator: () => Validator<WaDateInput>;
