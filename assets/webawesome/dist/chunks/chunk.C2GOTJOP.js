/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  localeFieldOrder
} from "./chunk.UKE2VGOO.js";
import {
  PartialDateValidator
} from "./chunk.NBRHZUHK.js";
import {
  EMPTY_PARTS,
  isoToParts,
  partsToIso
} from "./chunk.HK6J5Q2R.js";
import {
  known_date_styles_default
} from "./chunk.DNPBGBAH.js";
import {
  form_control_styles_default
} from "./chunk.KTP2IKLN.js";
import {
  uniqueId
} from "./chunk.4SJJHQXE.js";
import {
  MirrorValidator
} from "./chunk.E3UENDF5.js";
import {
  WebAwesomeFormAssociatedElement
} from "./chunk.GB3TYL3J.js";
import {
  warnDeprecatedSize
} from "./chunk.DLSTVVIL.js";
import {
  HasSlotController
} from "./chunk.5FXMXJDZ.js";
import {
  size_styles_default
} from "./chunk.ITHNGWNG.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  LocalizeController
} from "./chunk.I5ZKJLBU.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/known-date/known-date.ts
import { html, isServer } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
var generateId = () => uniqueId("wa-known-date-");
var WaKnownDate = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super(...arguments);
    // Moving focus between the three internal fields shouldn't count as "leaving the group," so we key
    // interaction off `input` alone — matching `<wa-date-input>` and `<wa-time-input>`.
    this.assumeInteractionOn = ["input"];
    this.localize = new LocalizeController(this);
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.groupId = generateId();
    this.hintId = `${this.groupId}-hint`;
    this.errorId = `${this.groupId}-error`;
    /** Debounces duplicate `change` events when the value hasn't transitioned. */
    this.lastEmittedValue = "";
    this.pendingValue = null;
    this.parts = { ...EMPTY_PARTS };
    this.name = "";
    this._value = "";
    this.defaultValue = this.getAttribute("value") ?? "";
    this.disabled = false;
    this.required = false;
    this.readonly = false;
    this.size = "m";
    this.appearance = "outlined";
    this.pill = false;
    this.label = "";
    this.hint = "";
    this.autocomplete = "";
    this.min = "";
    this.max = "";
    this.locale = "";
    this.withLabel = false;
    this.withHint = false;
    //
    // Field handlers
    //
    this.handleFieldInput = (event) => {
      if (this.readonly) return;
      const target = event.currentTarget;
      const field = target.dataset.field;
      const max = field === "year" ? 4 : 2;
      const sanitized = target.value.replace(/\D/g, "").slice(0, max);
      if (sanitized !== target.value) target.value = sanitized;
      this.parts = { ...this.parts, [field]: sanitized };
      this.recomputeValue();
      this.requestUpdate();
    };
  }
  static get validators() {
    const validators = isServer ? [] : [MirrorValidator(), PartialDateValidator()];
    return [...super.validators, ...validators];
  }
  /**
   * The committed value as an ISO `YYYY-MM-DD` string. The setter also accepts a `Date` or `null`. Reading
   * returns an empty string when the value is blank or any field is only partially filled.
   */
  get value() {
    if (this.valueHasChanged) return this._value;
    return this._value || this.defaultValue || "";
  }
  set value(val) {
    const normalized = this.normalizeIncomingValue(val);
    if (normalized === this._value) return;
    const oldValue = this._value;
    this._value = normalized;
    this.valueHasChanged = true;
    if (this.hasUpdated) {
      this.syncPartsFromCanonical();
    } else {
      this.pendingValue = this._value;
    }
    this.requestUpdate("value", oldValue);
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  //
  // Lifecycle
  //
  firstUpdated() {
    if (this.pendingValue != null) {
      this._value = this.pendingValue;
      this.pendingValue = null;
    } else if (!this._value && this.defaultValue) {
      this._value = this.defaultValue;
    }
    this.syncPartsFromCanonical();
    this.input = this.valueInput;
    this.updateValidity();
    this.lastEmittedValue = this._value;
  }
  updated(changed) {
    super.updated?.(changed);
    if (changed.has("value")) {
      this.customStates.set("blank", !this._value);
    }
  }
  //
  // Public API
  //
  /** Focuses the first empty field, or the first field when all are filled. */
  focus(options) {
    const target = this.firstFocusableInput();
    target?.focus(options);
  }
  /** Removes focus from the known date. */
  blur() {
    const active = this.shadowRoot?.activeElement;
    active?.blur();
  }
  /** The committed value as a `Date`, or `null` when the value is empty/invalid. */
  get valueAsDate() {
    if (!this._value) return null;
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(this._value);
    if (!match) return null;
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }
  /**
   * Anchor native validation popups on a real visible input. The hidden mirror handles form data, but
   * anchoring a popup on `display: none` content would render it at offset (0, 0).
   */
  get validationTarget() {
    if (!this.shadowRoot) return void 0;
    const inputs = Array.from(this.shadowRoot.querySelectorAll('input[part~="field-input"]'));
    if (inputs.length === 0) return void 0;
    for (const field of this.fieldOrder()) {
      if (this.parts[field] === "") {
        const el = inputs.find((i) => i.dataset.field === field);
        if (el) return el;
      }
    }
    return inputs[0];
  }
  //
  // Form association
  //
  formResetCallback() {
    this._value = this.defaultValue;
    this.valueHasChanged = false;
    this.syncPartsFromCanonical();
    super.formResetCallback();
    this.lastEmittedValue = this._value;
    this.requestUpdate();
  }
  formStateRestoreCallback(state2) {
    if (typeof state2 === "string") {
      this.value = state2;
    }
    this.updateValidity();
  }
  //
  // Internal helpers
  //
  get resolvedLocale() {
    return this.locale || this.localize.lang() || "en";
  }
  fieldOrder() {
    return localeFieldOrder(this.resolvedLocale);
  }
  normalizeIncomingValue(val) {
    if (val == null) return "";
    if (val instanceof Date) {
      const y = String(val.getFullYear()).padStart(4, "0");
      const m = String(val.getMonth() + 1).padStart(2, "0");
      const d = String(val.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
    if (typeof val === "string") {
      const parts = isoToParts(val);
      return partsToIso(parts);
    }
    return "";
  }
  syncPartsFromCanonical() {
    this.parts = isoToParts(this._value);
    this.updateHiddenInput();
  }
  updateHiddenInput() {
    if (this.valueInput) {
      this.valueInput.value = this._value;
    }
    this.setValue(this._value || null);
  }
  recomputeValue() {
    const oldValue = this._value;
    const newValue = partsToIso(this.parts);
    if (newValue !== oldValue) {
      this._value = newValue;
      this.valueHasChanged = true;
      this.updateHiddenInput();
      this.updateValidity();
    }
    this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
    if (newValue !== this.lastEmittedValue) {
      this.lastEmittedValue = newValue;
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    }
  }
  firstFocusableInput() {
    if (!this.shadowRoot) return void 0;
    const inputs = Array.from(this.shadowRoot.querySelectorAll('input[part~="field-input"]'));
    for (const field of this.fieldOrder()) {
      if (this.parts[field] === "") {
        const el = inputs.find((i) => i.dataset.field === field);
        if (el) return el;
      }
    }
    return inputs[0];
  }
  autocompleteFor(field) {
    const family = this.autocomplete.trim();
    if (!family) return void 0;
    if (family === "bday") {
      if (field === "day") return "bday-day";
      if (field === "month") return "bday-month";
      return "bday-year";
    }
    if (family === "off" || family === "on") return family;
    return field === "year" ? family : void 0;
  }
  //
  // Render
  //
  render() {
    const hasLabelSlot = this.hasUpdated ? this.hasSlotController.test("label") : this.withLabel;
    const hasHintSlot = this.hasUpdated ? this.hasSlotController.test("hint") : this.withHint;
    const hasLabel = !!this.label || !!hasLabelSlot;
    const hasHint = !!this.hint || !!hasHintSlot;
    const groupAriaLabel = this.label || this.localize.term("date") || "Date";
    const userInvalid = !isServer && this.customStates.has("user-invalid");
    const errorMessage = userInvalid ? this.validationMessage : "";
    const showError = userInvalid && !!errorMessage;
    const describedBy = [hasHint ? this.hintId : null, showError ? this.errorId : null].filter(Boolean).join(" ");
    const fields = this.fieldOrder().map((field) => this.renderField(field, describedBy, userInvalid));
    const groupContent = html`
      <div part="base form-control-input fields" class="fields">${fields}</div>

      <slot
        name="hint"
        part="hint"
        id=${this.hintId}
        class=${classMap({ hint: true, "has-slotted": hasHint })}
        aria-hidden=${hasHint ? "false" : "true"}
      >
        ${this.hint}
      </slot>

      <div part="error" id=${this.errorId} class="error" role="alert" aria-live="polite" ?hidden=${!showError}>
        ${errorMessage}
      </div>
    `;
    return html`
      <div
        part="form-control"
        class=${classMap({
      "form-control": true,
      "form-control-has-label": hasLabel
    })}
      >
        ${hasLabel ? html`<fieldset part="fieldset" class="fieldset">
              <legend part="legend">
                <span part="form-control-label label" class="label">
                  <slot name="label">${this.label}</slot>
                </span>
              </legend>
              ${groupContent}
            </fieldset>` : html`<div part="fieldset" class="fieldset" role="group" aria-label=${groupAriaLabel}>${groupContent}</div>`}

        <input
          class="value-input"
          type="date"
          tabindex="-1"
          aria-hidden="true"
          .value=${this._value}
          min=${ifDefined(this.min || void 0)}
          max=${ifDefined(this.max || void 0)}
          ?disabled=${this.disabled}
          ?required=${this.required}
        />
      </div>
    `;
  }
  renderField(field, describedBy, userInvalid) {
    const fieldId = `${this.groupId}-${field}`;
    const value = this.parts[field];
    const autocompleteAttr = this.autocompleteFor(field);
    const ariaInvalid = userInvalid ? "true" : void 0;
    const fieldLabel = this.localize.term(field) || (field === "day" ? "Day" : field === "month" ? "Month" : "Year");
    return html`
      <div part="field field-${field}" class=${classMap({ field: true, [`field-${field}`]: true })}>
        <input
          id=${fieldId}
          part="field-input"
          class="field-input"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength=${field === "year" ? 4 : 2}
          data-field=${field}
          autocomplete=${ifDefined(autocompleteAttr)}
          aria-describedby=${ifDefined(describedBy || void 0)}
          aria-invalid=${ifDefined(ariaInvalid)}
          aria-required=${this.required ? "true" : "false"}
          .value=${live(value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @input=${this.handleFieldInput}
        />
        <label part="field-label" class="field-label" for=${fieldId}>${fieldLabel}</label>
      </div>
    `;
  }
};
WaKnownDate.css = [size_styles_default, form_control_styles_default, known_date_styles_default];
WaKnownDate.shadowRootOptions = {
  ...WebAwesomeFormAssociatedElement.shadowRootOptions,
  delegatesFocus: true
};
__decorateClass([
  query(".value-input")
], WaKnownDate.prototype, "valueInput", 2);
__decorateClass([
  state()
], WaKnownDate.prototype, "parts", 2);
__decorateClass([
  property({ reflect: true })
], WaKnownDate.prototype, "name", 2);
__decorateClass([
  state()
], WaKnownDate.prototype, "value", 1);
__decorateClass([
  property({ attribute: "value", reflect: true })
], WaKnownDate.prototype, "defaultValue", 2);
__decorateClass([
  property({ type: Boolean })
], WaKnownDate.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaKnownDate.prototype, "required", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaKnownDate.prototype, "readonly", 2);
__decorateClass([
  property({ reflect: true })
], WaKnownDate.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaKnownDate.prototype, "handleSizeChange", 1);
__decorateClass([
  property({ reflect: true })
], WaKnownDate.prototype, "appearance", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaKnownDate.prototype, "pill", 2);
__decorateClass([
  property()
], WaKnownDate.prototype, "label", 2);
__decorateClass([
  property({ attribute: "hint" })
], WaKnownDate.prototype, "hint", 2);
__decorateClass([
  property()
], WaKnownDate.prototype, "autocomplete", 2);
__decorateClass([
  property({ reflect: true })
], WaKnownDate.prototype, "min", 2);
__decorateClass([
  property({ reflect: true })
], WaKnownDate.prototype, "max", 2);
__decorateClass([
  property({ reflect: true })
], WaKnownDate.prototype, "locale", 2);
__decorateClass([
  property({ attribute: "with-label", type: Boolean })
], WaKnownDate.prototype, "withLabel", 2);
__decorateClass([
  property({ attribute: "with-hint", type: Boolean })
], WaKnownDate.prototype, "withHint", 2);
WaKnownDate = __decorateClass([
  customElement("wa-known-date")
], WaKnownDate);

export {
  WaKnownDate
};
