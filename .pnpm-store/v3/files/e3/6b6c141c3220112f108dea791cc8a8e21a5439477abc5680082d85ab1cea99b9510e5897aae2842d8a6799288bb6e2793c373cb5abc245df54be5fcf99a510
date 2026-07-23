import { Fragment as e, Teleport as t, Transition as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createSlots as c, createTextVNode as l, createVNode as u, defineComponent as d, guardReactiveProps as f, h as p, inject as m, mergeDefaults as h, mergeProps as g, nextTick as _, normalizeClass as v, normalizeProps as y, normalizeStyle as b, onBeforeUpdate as x, onMounted as S, onUnmounted as C, openBlock as w, provide as T, reactive as E, readonly as D, ref as O, renderList as k, renderSlot as A, resolveDynamicComponent as j, toDisplayString as M, toRef as N, toValue as P, unref as F, useSlots as I, useTemplateRef as L, vShow as R, watch as z, withCtx as B, withDirectives as V, withKeys as H, withModifiers as U } from "vue";
import { onClickOutside as ee, unrefElement as te, useSwipe as W } from "@vueuse/core";
import { arrow as ne, autoUpdate as G, flip as re, offset as ie, shift as ae, useFloating as K } from "@floating-ui/vue";
import { add as oe, addDays as q, addMonths as J, addYears as se, differenceInCalendarDays as ce, differenceInYears as le, eachDayOfInterval as ue, eachQuarterOfInterval as de, endOfQuarter as fe, endOfWeek as pe, endOfYear as me, format as he, getDay as ge, getHours as _e, getISOWeek as ve, getMinutes as ye, getMonth as Y, getQuarter as be, getSeconds as xe, getWeek as Se, getYear as X, isAfter as Ce, isBefore as we, isDate as Te, isEqual as Ee, isSameQuarter as De, isValid as Oe, parse as ke, roundToNearestMinutes as Ae, set as Z, setMilliseconds as je, setMonth as Me, setSeconds as Ne, setYear as Pe, startOfMonth as Fe, startOfQuarter as Ie, startOfWeek as Le, startOfYear as Re, sub as ze, subDays as Be, subMonths as Ve, subYears as He } from "date-fns";
import { TZDate as Ue, TZDate as We } from "@date-fns/tz";
//#region src/VueDatePicker/components/Icons/CalendarIcon.ts
function Ge() {
	return p("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		"aria-hidden": "true",
		class: "dp--icon",
		role: "img"
	}, [
		p("path", { d: "M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z" }),
		p("path", { d: "M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" }),
		p("path", { d: "M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" }),
		p("path", { d: "M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z" })
	]);
}
//#endregion
//#region src/VueDatePicker/components/Icons/CancelIcon.ts
function Ke() {
	return p("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		"aria-hidden": "true",
		class: "dp--icon",
		role: "img"
	}, [p("path", { d: "M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z" }), p("path", { d: "M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z" })]);
}
//#endregion
//#region src/VueDatePicker/components/Icons/ChevronLeftIcon.ts
function qe() {
	return p("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		"aria-hidden": "true",
		class: "dp--icon",
		role: "img"
	}, [p("path", { d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z" })]);
}
//#endregion
//#region src/VueDatePicker/components/Icons/ChevronRightIcon.ts
function Je() {
	return p("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		"aria-hidden": "true",
		class: "dp--icon",
		role: "img"
	}, [p("path", { d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z" })]);
}
//#endregion
//#region src/VueDatePicker/components/Icons/ClockIcon.ts
function Ye() {
	return p("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		"aria-hidden": "true",
		class: "dp--icon",
		role: "img"
	}, [p("path", { d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z" }), p("path", { d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" })]);
}
//#endregion
//#region src/VueDatePicker/components/Icons/ChevronUpIcon.ts
function Xe() {
	return p("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		"aria-hidden": "true",
		class: "dp--icon",
		role: "img"
	}, [p("path", { d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z" })]);
}
//#endregion
//#region src/VueDatePicker/components/Icons/ChevronDownIcon.ts
function Ze() {
	return p("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		"aria-hidden": "true",
		class: "dp--icon",
		role: "img"
	}, [p("path", { d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z" })]);
}
//#endregion
//#region src/VueDatePicker/composables/useInjector.ts
var Qe = Symbol("ContextKey"), $e = (e, t) => {
	let { setTimeModelValue: n } = Vt(), i = Bt(e), a = O(null), o = E({
		menuFocused: !1,
		shiftKeyInMenu: !1,
		isInputFocused: !1,
		isTextInputDate: !1,
		arrowNavigationLevel: 0
	}), s = i.getDate(/* @__PURE__ */ new Date()), c = O(""), l = O([{
		month: Y(s),
		year: X(s)
	}]), u = E({
		hours: 0,
		minutes: 0,
		seconds: 0
	});
	n(u, null, s, i.range.value.enabled);
	let d = r({
		get: () => a.value,
		set: (e) => {
			a.value = e;
		}
	}), f = r(() => (e) => l.value[e] ? l.value[e].month : 0), p = r(() => (e) => l.value[e] ? l.value[e].year : 0);
	T(Qe, {
		rootProps: e,
		defaults: i,
		modelValue: d,
		state: D(o),
		rootEmit: t,
		calendars: l,
		month: f,
		year: p,
		time: u,
		today: s,
		inputValue: c,
		setState: (e, t) => {
			o[e] = t;
		},
		updateTime: () => {
			n(u, d.value, s, i.range.value.enabled);
		},
		getDate: i.getDate
	});
}, Q = () => {
	let e = m(Qe);
	if (!e) throw Error("Can't use context");
	return e;
}, et = /* @__PURE__ */ function(e) {
	return e.month = "month", e.year = "year", e;
}({}), tt = /* @__PURE__ */ function(e) {
	return e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e;
}({}), nt = /* @__PURE__ */ function(e) {
	return e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e;
}({}), rt = [
	"timestamp",
	"date",
	"iso"
], it = /* @__PURE__ */ function(e) {
	return e.up = "up", e.down = "down", e.left = "left", e.right = "right", e;
}({}), $ = /* @__PURE__ */ function(e) {
	return e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e;
}({}), at = /* @__PURE__ */ function(e) {
	return e.MONTH_AND_YEAR = "MM-yyyy", e.YEAR = "yyyy", e.DATE = "dd-MM-yyyy", e;
}({}), ot = /* @__PURE__ */ function(e) {
	return e[e.Sunday = 0] = "Sunday", e[e.Monday = 1] = "Monday", e[e.Tuesday = 2] = "Tuesday", e[e.Wednesday = 3] = "Wednesday", e[e.Thursday = 4] = "Thursday", e[e.Friday = 5] = "Friday", e[e.Saturday = 6] = "Saturday", e;
}({}), st = () => {
	let { rootProps: e, state: t, defaults: { textInput: n } } = Q(), i = r(() => t.arrowNavigationLevel), a = O(-1), o = O(-1);
	z(i, (e, t) => {
		b(n.value.enabled && n.value.selectOnFocus ? !0 : e === 0 && t > 0);
	});
	let s = O([]), c = O(/* @__PURE__ */ new Map()), l = () => {
		let e = Array.from(document.querySelectorAll(`[data-dp-action-element="${i.value}"]`)), t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
		for (let r of e) {
			let e = r.getBoundingClientRect(), i = e.top, a = e.left;
			t.has(i) || t.set(i, []), t.get(i).push(r), n.set(r, {
				row: i,
				col: a
			});
		}
		s.value = Array.from(t.entries()).sort((e, t) => e[0] - t[0]).map(([e, t]) => u(t, n)), c.value = n;
	}, u = (e, t) => e.sort((e, n) => {
		let r = t.get(e), i = t.get(n);
		return r.col - i.col;
	}), d = (e, t) => {
		i.value === 0 && (a.value = e, o.value = t);
	}, f = (e) => {
		if (![
			$.arrowUp,
			$.arrowDown,
			$.arrowLeft,
			$.arrowRight
		].includes(e.key)) return;
		l(), e.preventDefault();
		let t = document.activeElement;
		if (!t?.hasAttribute("data-dp-action-element")) return;
		let n = -1, r = -1;
		for (let e = 0; e < s.value.length; e++) {
			let i = s.value[e].indexOf(t);
			if (i !== -1) {
				n = e, r = i;
				break;
			}
		}
		if (n !== -1) switch (e.key) {
			case $.arrowLeft: return p(n, r);
			case $.arrowRight: return m(n, r);
			case $.arrowUp: return h(n, r);
			case $.arrowDown: return g(n, r);
			default: return;
		}
	}, p = (e, t) => {
		if (t > 0) {
			let n = s.value[e][t - 1];
			d(e, t - 1), n && n.focus();
		}
	}, m = (e, t) => {
		if (t < s.value[e].length - 1) {
			let n = s.value[e][t + 1];
			d(e, t + 1), n && n.focus();
		}
	}, h = (e, t) => {
		if (e > 0) {
			let n = s.value[e - 1], r = Math.min(t, n.length - 1), i = n[r];
			d(e - 1, r), i && i.focus();
		}
	}, g = (e, t) => {
		if (e < s.value.length - 1) {
			let n = s.value[e + 1], r = Math.min(t, n.length - 1), i = n[r];
			d(e + 1, r), i && i.focus();
		}
	}, v = () => {
		_().then(() => {
			l();
			let e = s.value[a.value]?.[o.value];
			e && y(e);
		});
	}, y = (e) => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				e.focus({ preventScroll: !0 });
			});
		});
	}, b = (e) => {
		if (e) return v();
		let t = document.querySelector(`[data-dp-element-active="${i.value}"]`);
		if (t && !e) y(t);
		else {
			let e = document.querySelector(`[data-dp-action-element="${i.value}"]`);
			e && y(e);
		}
	};
	S(() => {
		e.arrowNavigation && (b(!1), document.addEventListener("keydown", f));
	}), C(() => {
		e.arrowNavigation && document.removeEventListener("keydown", f);
	});
}, ct = () => {
	let { checkPartialRangeValue: e, checkRangeEnabled: t, isValidDate: n } = dt(), { convertType: r, errorMapper: i } = Vt(), { getDate: a, rootEmit: o, state: s, rootProps: c, inputValue: l, defaults: { textInput: u, range: d, multiDates: f, timeConfig: p, formats: m, weekStart: h }, modelValue: g, updateTime: _ } = Q(), { setTime: v, getWeekFromDate: y } = Ht(), { formatSelectedDate: b, formatForTextInput: x } = Wt();
	z(g, (e, t) => {
		o("internal-model-change", g.value), JSON.stringify(t ?? {}) !== JSON.stringify(e ?? {}) && _();
	}, { deep: !0 }), z(d, (e, t) => {
		e.enabled !== t.enabled && (g.value = null, _());
	}), z(() => m.value.input, () => {
		B();
	});
	let S = (e) => e ? c.modelType ? H(e) : {
		hours: _e(e),
		minutes: ye(e),
		seconds: p.value.enableSeconds ? xe(e) : 0
	} : null, C = (e) => c.modelType ? H(e) : {
		month: Y(e),
		year: X(e)
	}, w = (n) => Array.isArray(n) ? f.value.enabled ? n.map((e) => T(e, Pe(a(), e))) : t(() => [Pe(a(), n[0]), n[1] ? Pe(a(), n[1]) : e(d.value.partialRange)], d.value.enabled) : Pe(a(), +n), T = (e, t) => (typeof e == "string" || typeof e == "number") && c.modelType ? V(e) : t, E = (e) => Array.isArray(e) ? [T(e[0], v(e[0])), T(e[1], v(e[1]))] : T(e, v(e)), D = (n) => {
		let r = Z(a(), { date: 1 });
		return Array.isArray(n) ? f.value.enabled ? n.map((e) => T(e, Z(r, {
			month: +e.month,
			year: +e.year
		}))) : t(() => [T(n[0], Z(r, {
			month: +n[0].month,
			year: +n[0].year
		})), T(n[1], n[1] ? Z(r, {
			month: +n[1].month,
			year: +n[1].year
		}) : e(d.value.partialRange))], d.value.enabled) : T(n, Z(r, {
			month: +n.month,
			year: +n.year
		}));
	}, O = (e) => {
		if (Array.isArray(e)) return e.map((e) => V(e));
		throw Error(i.dateArr("multi-dates"));
	}, k = (e) => {
		if (Array.isArray(e) && d.value.enabled) {
			let t = e[0], n = e[1];
			return [a(Array.isArray(t) ? t[0] : null), Array.isArray(n) && n.length ? a(n[0]) : null];
		}
		return a(e[0]);
	}, A = (n) => c.modelAuto ? Array.isArray(n) ? [V(n[0]), V(n[1])] : c.autoApply ? [V(n)] : [V(n), null] : Array.isArray(n) ? t(() => n[1] ? [V(n[0]), n[1] ? V(n[1]) : e(d.value.partialRange)] : [V(n[0])], d.value.enabled) : V(n), j = () => {
		Array.isArray(g.value) && d.value.enabled && g.value.length === 1 && g.value.push(e(d.value.partialRange));
	}, M = () => {
		let t = g.value;
		return [H(t[0]), t[1] ? H(t[1]) : e(d.value.partialRange)];
	}, N = () => Array.isArray(g.value) ? g.value[1] ? M() : H(r(g.value[0])) : [], P = () => (g.value || []).map((e) => H(e)), F = (e = !1) => (e || j(), c.modelAuto ? N() : f.value.enabled ? P() : Array.isArray(g.value) ? t(() => M(), d.value.enabled) : H(r(g.value))), I = (e) => !e || Array.isArray(e) && !e.length ? null : c.timePicker ? E(r(e)) : c.monthPicker ? D(r(e)) : c.yearPicker ? w(r(e)) : f.value.enabled ? O(r(e)) : c.weekPicker ? k(r(e)) : A(r(e)), L = (e) => {
		if (s.isTextInputDate) return;
		let t = I(e);
		n(r(t)) ? (g.value = r(t), B()) : (g.value = null, l.value = "");
	}, R = () => g.value ? f.value.enabled ? g.value.map((e) => b(e)).join("; ") : u.value.enabled ? x() : b(g.value) : "", B = () => {
		l.value = R();
	}, V = (e) => c.modelType ? rt.includes(c.modelType) ? a(e) : c.modelType === "format" && typeof m.value.input == "string" ? ke(e, m.value.input, a(), { locale: c.locale }) : ke(e, c.modelType, a(), { locale: c.locale }) : a(e), H = (e) => e ? c.modelType ? c.modelType === "timestamp" ? +e : c.modelType === "iso" ? e.toISOString() : c.modelType === "format" && typeof m.value.input == "string" ? b(e) : b(e, c.modelType) : e : null, U = (e) => {
		o("update:model-value", e);
	}, ee = (e) => Array.isArray(g.value) ? f.value.enabled ? g.value.map((t) => e(t)) : [e(g.value[0]), g.value[1] ? e(g.value[1]) : null] : e(r(g.value)), te = () => {
		if (Array.isArray(g.value)) {
			let e = y(g.value[0], h.value), t = g.value[1] ? y(g.value[1], h.value) : [];
			return [e.map((e) => a(e)), t.map((e) => a(e))];
		}
		return y(g.value, h.value).map((e) => a(e));
	}, W = (e) => U(r(ee(e))), ne = () => o("update:model-value", te());
	return {
		checkBeforeEmit: () => g.value ? d.value.enabled ? d.value.partialRange ? g.value.length >= 1 : g.value.length === 2 : !!g.value : !1,
		parseExternalModelValue: L,
		formatInputValue: B,
		emitModelValue: () => (B(), c.monthPicker ? W(C) : c.timePicker ? W(S) : c.yearPicker ? W(X) : c.weekPicker ? ne() : U(F()))
	};
}, lt = () => {
	let { defaults: { transitions: e } } = Q(), t = r(() => (t) => e.value ? t ? e.value.open : e.value.close : ""), n = r(() => (t) => e.value ? t ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
	return {
		transitionName: t,
		showTransition: !!e.value,
		menuTransition: n
	};
}, ut = (e) => {
	let { modelValue: t } = Q();
	z(t, (t, n) => {
		e && JSON.stringify(t ?? {}) !== JSON.stringify(n ?? {}) && e();
	}, { deep: !0 });
}, dt = () => {
	let { defaults: { safeDates: e, range: t, multiDates: n, filters: i, timeConfig: a }, rootProps: o, getDate: s } = Q(), { getMapKeyType: c, getMapDate: l, errorMapper: u, convertType: d } = Vt(), { isDateBefore: f, isDateAfter: p, isDateEqual: m, resetDate: h, getDaysInBetween: g, setTimeValue: _, getTimeObj: v, setTime: y } = Ht(), b = (t) => e.value.disabledDates ? typeof e.value.disabledDates == "function" ? e.value.disabledDates(s(t)) : !!l(t, e.value.disabledDates) : !1, x = (t) => e.value.maxDate ? o.yearPicker ? X(t) > X(e.value.maxDate) : p(t, e.value.maxDate) : !1, S = (t) => e.value.minDate ? o.yearPicker ? X(t) < X(e.value.minDate) : f(t, e.value.minDate) : !1, C = (e) => {
		if (!e) return !1;
		let t = x(e), n = S(e), r = b(e), a = i.value.months.map((e) => +e).includes(Y(e)), s = i.value.weekDays?.length ? i.value.weekDays.some((t) => +t === ge(e)) : !1, c = O(e), l = X(e), u = l < +o.yearRange[0] || l > +o.yearRange[1];
		return !(t || n || r || a || u || s || c);
	}, w = (t, n) => f(...W(e.value.minDate, t, n)) || m(...W(e.value.minDate, t, n)), T = (t, n) => p(...W(e.value.maxDate, t, n)) || m(...W(e.value.maxDate, t, n)), E = (t, n, r) => {
		let i = !1;
		return e.value.maxDate && r && T(t, n) && (i = !0), e.value.minDate && !r && w(t, n) && (i = !0), i;
	}, D = (t, n, r, i) => {
		let a = !1;
		return i && (e.value.minDate || e.value.maxDate) ? e.value.minDate && e.value.maxDate ? a = E(t, n, r) : (e.value.minDate && w(t, n) || e.value.maxDate && T(t, n)) && (a = !0) : a = !0, a;
	}, O = (t) => Array.isArray(e.value.allowedDates) && !e.value.allowedDates.length ? !0 : e.value.allowedDates ? !l(t, e.value.allowedDates, c(o.monthPicker, o.yearPicker)) : !1, k = (e) => !C(e), A = (e) => t.value.noDisabledRange ? !ue({
		start: e[0],
		end: e[1]
	}).some((e) => k(e)) : !0, j = (e) => {
		if (e) {
			let t = X(e);
			return t >= +o.yearRange[0] && t <= o.yearRange[1];
		}
		return !0;
	}, M = (e, n) => !!(Array.isArray(e) && e[n] && (t.value.maxRange || t.value.minRange) && j(e[n])), N = (e, n, r = 0) => {
		if (M(n, r) && j(e)) {
			let i = ce(e, n[r]), a = g(n[r], e), o = a.length === 1 ? 0 : a.filter((e) => k(e)).length, s = Math.abs(i) - (t.value.minMaxRawRange ? 0 : o);
			if (t.value.minRange && t.value.maxRange) return s >= +t.value.minRange && s <= +t.value.maxRange;
			if (t.value.minRange) return s >= +t.value.minRange;
			if (t.value.maxRange) return s <= +t.value.maxRange;
		}
		return !0;
	}, P = () => !a.value.enableTimePicker || o.monthPicker || o.yearPicker || a.value.ignoreTimeValidation, F = (e) => Array.isArray(e) ? [e[0] ? _(e[0]) : null, e[1] ? _(e[1]) : null] : _(e), I = (e, t, n) => t ? e.find((e) => +e.hours === _e(t) && e.minutes === "*" ? !0 : +e.minutes === ye(t) && +e.hours === _e(t)) && n : !1, L = (e, t, n) => {
		let [r, i] = e, [a, o] = t;
		return !I(r, a, n) && !I(i, o, n) && n;
	}, R = (e, t) => {
		let n = Array.isArray(t) ? t : [t];
		return Array.isArray(o.disabledTimes) ? Array.isArray(o.disabledTimes[0]) ? L(o.disabledTimes, n, e) : !n.some((t) => I(o.disabledTimes, t, e)) : e;
	}, z = (e, t) => {
		let n = Array.isArray(t) ? [v(t[0]), t[1] ? v(t[1]) : void 0] : v(t), r = !o.disabledTimes(n);
		return e && r;
	}, B = (e, t) => o.disabledTimes ? Array.isArray(o.disabledTimes) ? R(t, e) : z(t, e) : t, V = (t) => {
		let n = !0;
		if (!t || P()) return !0;
		let r = !e.value.minDate && !e.value.maxDate ? F(t) : t;
		return (o.maxTime || e.value.maxDate) && (n = G(o.maxTime, e.value.maxDate, "max", d(r), n)), (o.minTime || e.value.minDate) && (n = G(o.minTime, e.value.minDate, "min", d(r), n)), B(t, n);
	}, H = (t) => {
		if (!o.monthPicker) return !0;
		let n = !0, r = s(h(t));
		if (e.value.minDate && e.value.maxDate) {
			let t = s(h(e.value.minDate)), n = s(h(e.value.maxDate));
			return p(r, t) && f(r, n) || m(r, t) || m(r, n);
		}
		if (e.value.minDate) {
			let t = s(h(e.value.minDate));
			n = p(r, t) || m(r, t);
		}
		if (e.value.maxDate) {
			let t = s(h(e.value.maxDate));
			n = f(r, t) || m(r, t);
		}
		return n;
	}, U = r(() => (e) => !a.value.enableTimePicker || a.value.ignoreTimeValidation ? !0 : V(e)), ee = r(() => (e) => o.monthPicker ? Array.isArray(e) && (t.value.enabled || n.value.enabled) ? !e.filter((e) => !H(e)).length : H(e) : !0), te = (t, n, r) => {
		if (!n || r && !e.value.maxDate || !r && !e.value.minDate) return !1;
		let i = r ? J(t, 1) : Ve(t, 1), a = [Y(i), X(i)];
		return r ? !T(...a) : !w(...a);
	}, W = (e, t, n) => [Z(s(e), { date: 1 }), Z(s(), {
		month: t,
		year: n,
		date: 1
	})], ne = (e, t, n, r) => {
		if (!e) return !0;
		if (r) {
			let r = n === "max" ? we(e, t) : Ce(e, t), i = {
				seconds: 0,
				milliseconds: 0
			};
			return r || Ee(Z(e, i), Z(t, i));
		}
		return n === "max" ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime();
	}, G = (e, t, n, r, i) => {
		if (Array.isArray(r)) {
			let a = re(e, r[0], t), o = re(e, r[1], t);
			return ne(r[0], a, n, !!t) && ne(r[1], o, n, !!t) && i;
		}
		return ne(r, re(e, r, t), n, !!t) && i;
	}, re = (e, t, n) => e ? y(e, t) : s(n ?? t);
	return {
		isDisabled: k,
		validateDate: C,
		validateMonthYearInRange: D,
		isDateRangeAllowed: A,
		checkMinMaxRange: N,
		isValidTime: V,
		validateMonthYear: te,
		validateMinDate: w,
		validateMaxDate: T,
		isValidDate: (e) => Array.isArray(e) ? Oe(e[0]) && (e[1] ? Oe(e[1]) : !0) : e ? Oe(e) : !1,
		checkPartialRangeValue: (e) => {
			if (e) return null;
			throw Error(u.prop("partial-range"));
		},
		checkRangeEnabled: (e, t) => {
			if (t) return e();
			throw Error(u.prop("range"));
		},
		checkMinMaxValue: (e, t, n) => {
			let r = n != null, i = t != null;
			if (!r && !i) return !1;
			let a = +n, o = +t;
			return r && i ? +e > a || +e < o : r ? +e > a : i ? +e < o : !1;
		},
		isTimeValid: U,
		isMonthValid: ee
	};
}, ft = (e) => {
	let { rootEmit: t, rootProps: n, defaults: { timeConfig: i, flow: a } } = Q(), o = O(0), s = E({
		[tt.timePicker]: !i.value.enableTimePicker || n.timePicker || n.monthPicker,
		[tt.calendar]: !1,
		[tt.header]: !1
	}), c = r(() => n.monthPicker || n.timePicker), l = (e) => {
		if (a.value?.steps?.length) {
			if (!e && c.value) return p();
			s[e] = !0, Object.keys(s).filter((e) => !s[e]).length || p();
		}
	}, u = () => {
		a.value?.steps?.length && o.value !== -1 && (o.value += 1, t("flow-step", o.value), p()), a.value?.steps?.length === o.value && _().then(() => d());
	}, d = () => {
		o.value = -1;
	}, f = (t, n, ...r) => {
		a.value?.steps[o.value] === t && e.value && e.value[n]?.(...r);
	}, p = (e = 0) => {
		e && (o.value += e), f(nt.month, "toggleMonthPicker", !0), f(nt.year, "toggleYearPicker", !0), f(nt.calendar, "toggleTimePicker", !1, !0), f(nt.time, "toggleTimePicker", !0, !0);
		let t = a.value?.steps[o.value];
		(t === nt.hours || t === nt.minutes || t === nt.seconds) && f(t, "toggleTimePicker", !0, !0, t);
	};
	return {
		childMount: l,
		updateFlowStep: u,
		resetFlow: d,
		handleFlow: p,
		flowStep: o
	};
};
//#endregion
//#region ../../node_modules/.pnpm/date-fns@4.2.1/node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function pt(e) {
	return (t = {}) => {
		let n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth];
	};
}
//#endregion
//#region ../../node_modules/.pnpm/date-fns@4.2.1/node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function mt(e) {
	return (t, n) => {
		let r = n?.context ? String(n.context) : "standalone", i;
		if (r === "formatting" && e.formattingValues) {
			let t = e.defaultFormattingWidth || e.defaultWidth, r = n?.width ? String(n.width) : t;
			i = e.formattingValues[r] || e.formattingValues[t];
		} else {
			let t = e.defaultWidth, r = n?.width ? String(n.width) : e.defaultWidth;
			i = e.values[r] || e.values[t];
		}
		let a = e.argumentCallback ? e.argumentCallback(t) : t;
		return i[a];
	};
}
//#endregion
//#region ../../node_modules/.pnpm/date-fns@4.2.1/node_modules/date-fns/locale/_lib/buildMatchFn.js
function ht(e) {
	return (t, n = {}) => {
		let r = n.width, i = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(i);
		if (!a) return null;
		let o = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? _t(s, (e) => e.test(o)) : gt(s, (e) => e.test(o)), l;
		l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? n.valueCallback(l) : l;
		let u = t.slice(o.length);
		return {
			value: l,
			rest: u
		};
	};
}
function gt(e, t) {
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function _t(e, t) {
	for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
//#endregion
//#region ../../node_modules/.pnpm/date-fns@4.2.1/node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function vt(e) {
	return (t, n = {}) => {
		let r = t.match(e.matchPattern);
		if (!r) return null;
		let i = r[0], a = t.match(e.parsePattern);
		if (!a) return null;
		let o = e.valueCallback ? e.valueCallback(a[0]) : a[0];
		o = n.valueCallback ? n.valueCallback(o) : o;
		let s = t.slice(i.length);
		return {
			value: o,
			rest: s
		};
	};
}
//#endregion
//#region ../../node_modules/.pnpm/date-fns@4.2.1/node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var yt = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
}, bt = (e, t, n) => {
	let r, i = yt[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
}, xt = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
}, St = (e, t, n, r) => xt[e], Ct = {
	ordinalNumber: (e, t) => {
		let n = Number(e), r = n % 100;
		if (r > 20 || r < 10) switch (r % 10) {
			case 1: return n + "st";
			case 2: return n + "nd";
			case 3: return n + "rd";
		}
		return n + "th";
	},
	era: mt({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: mt({
		values: {
			narrow: [
				"1",
				"2",
				"3",
				"4"
			],
			abbreviated: [
				"Q1",
				"Q2",
				"Q3",
				"Q4"
			],
			wide: [
				"1st quarter",
				"2nd quarter",
				"3rd quarter",
				"4th quarter"
			]
		},
		defaultWidth: "wide",
		argumentCallback: (e) => e - 1
	}),
	month: mt({
		values: {
			narrow: [
				"J",
				"F",
				"M",
				"A",
				"M",
				"J",
				"J",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			abbreviated: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			],
			wide: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]
		},
		defaultWidth: "wide"
	}),
	day: mt({
		values: {
			narrow: [
				"S",
				"M",
				"T",
				"W",
				"T",
				"F",
				"S"
			],
			short: [
				"Su",
				"Mo",
				"Tu",
				"We",
				"Th",
				"Fr",
				"Sa"
			],
			abbreviated: [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			],
			wide: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			]
		},
		defaultWidth: "wide"
	}),
	dayPeriod: mt({
		values: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			}
		},
		defaultWidth: "wide",
		formattingValues: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			}
		},
		defaultFormattingWidth: "wide"
	})
}, wt = {
	ordinalNumber: vt({
		matchPattern: /^(\d+)(th|st|nd|rd)?/i,
		parsePattern: /\d+/i,
		valueCallback: (e) => parseInt(e, 10)
	}),
	era: ht({
		matchPatterns: {
			narrow: /^(b|a)/i,
			abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
			wide: /^(before christ|before common era|anno domini|common era)/i
		},
		defaultMatchWidth: "wide",
		parsePatterns: { any: [/^b/i, /^(a|c)/i] },
		defaultParseWidth: "any"
	}),
	quarter: ht({
		matchPatterns: {
			narrow: /^[1234]/i,
			abbreviated: /^q[1234]/i,
			wide: /^[1234](th|st|nd|rd)? quarter/i
		},
		defaultMatchWidth: "wide",
		parsePatterns: { any: [
			/1/i,
			/2/i,
			/3/i,
			/4/i
		] },
		defaultParseWidth: "any",
		valueCallback: (e) => e + 1
	}),
	month: ht({
		matchPatterns: {
			narrow: /^[jfmasond]/i,
			abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
			wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
		},
		defaultMatchWidth: "wide",
		parsePatterns: {
			narrow: [
				/^j/i,
				/^f/i,
				/^m/i,
				/^a/i,
				/^m/i,
				/^j/i,
				/^j/i,
				/^a/i,
				/^s/i,
				/^o/i,
				/^n/i,
				/^d/i
			],
			any: [
				/^ja/i,
				/^f/i,
				/^mar/i,
				/^ap/i,
				/^may/i,
				/^jun/i,
				/^jul/i,
				/^au/i,
				/^s/i,
				/^o/i,
				/^n/i,
				/^d/i
			]
		},
		defaultParseWidth: "any"
	}),
	day: ht({
		matchPatterns: {
			narrow: /^[smtwf]/i,
			short: /^(su|mo|tu|we|th|fr|sa)/i,
			abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
			wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
		},
		defaultMatchWidth: "wide",
		parsePatterns: {
			narrow: [
				/^s/i,
				/^m/i,
				/^t/i,
				/^w/i,
				/^t/i,
				/^f/i,
				/^s/i
			],
			any: [
				/^su/i,
				/^m/i,
				/^tu/i,
				/^w/i,
				/^th/i,
				/^f/i,
				/^sa/i
			]
		},
		defaultParseWidth: "any"
	}),
	dayPeriod: ht({
		matchPatterns: {
			narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
			any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
		},
		defaultMatchWidth: "any",
		parsePatterns: { any: {
			am: /^a/i,
			pm: /^p/i,
			midnight: /^mi/i,
			noon: /^no/i,
			morning: /morning/i,
			afternoon: /afternoon/i,
			evening: /evening/i,
			night: /night/i
		} },
		defaultParseWidth: "any"
	})
}, Tt = {
	code: "en-US",
	formatDistance: bt,
	formatLong: {
		date: pt({
			formats: {
				full: "EEEE, MMMM do, y",
				long: "MMMM do, y",
				medium: "MMM d, y",
				short: "MM/dd/yyyy"
			},
			defaultWidth: "full"
		}),
		time: pt({
			formats: {
				full: "h:mm:ss a zzzz",
				long: "h:mm:ss a z",
				medium: "h:mm:ss a",
				short: "h:mm a"
			},
			defaultWidth: "full"
		}),
		dateTime: pt({
			formats: {
				full: "{{date}} 'at' {{time}}",
				long: "{{date}} 'at' {{time}}",
				medium: "{{date}}, {{time}}",
				short: "{{date}}, {{time}}"
			},
			defaultWidth: "full"
		})
	},
	formatRelative: St,
	localize: Ct,
	match: wt,
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
}, Et = {
	noDisabledRange: !1,
	showLastInRange: !0,
	minMaxRawRange: !1,
	partialRange: !0,
	disableTimeRangeValidation: !1,
	maxRange: void 0,
	minRange: void 0,
	autoRange: void 0,
	fixedStart: !1,
	fixedEnd: !1,
	autoSwitchStartEnd: !0
}, Dt = {
	allowStopPropagation: !0,
	closeOnScroll: !1,
	modeHeight: 255,
	allowPreventDefault: !1,
	closeOnClearValue: !0,
	closeOnAutoApply: !0,
	noSwipe: !1,
	keepActionRow: !1,
	onClickOutside: void 0,
	tabOutClosesMenu: !0,
	arrowLeft: void 0,
	keepViewOnOffsetClick: !1,
	timeArrowHoldThreshold: 0,
	shadowDom: !1,
	mobileBreakpoint: 600,
	setDateOnMenuClose: !1,
	escClose: !0,
	spaceConfirm: !0,
	monthChangeOnArrows: !0,
	monthChangeOnScroll: !0
}, Ot = {
	enterSubmit: !0,
	tabSubmit: !0,
	openMenu: "open",
	selectOnFocus: !1,
	rangeSeparator: " - ",
	escClose: !0,
	format: void 0,
	maskFormat: void 0,
	applyOnBlur: !1,
	separators: void 0
}, kt = {
	dates: [],
	years: [],
	months: [],
	quarters: [],
	weeks: [],
	weekdays: [],
	options: { highlightDisabled: !1 }
}, At = {
	showSelect: !0,
	showCancel: !0,
	showNow: !1,
	showPreview: !0,
	selectBtnLabel: "Select",
	cancelBtnLabel: "Cancel",
	nowBtnLabel: "Now",
	nowBtnRound: void 0
}, jt = {
	toggleOverlay: "Toggle overlay",
	menu: "Datepicker menu",
	input: "Datepicker input",
	openTimePicker: "Open time picker",
	closeTimePicker: "Close time Picker",
	incrementValue: (e) => `Increment ${e}`,
	decrementValue: (e) => `Decrement ${e}`,
	openTpOverlay: (e) => `Open ${e} overlay`,
	amPmButton: "Switch AM/PM mode",
	openYearsOverlay: "Open years overlay",
	openMonthsOverlay: "Open months overlay",
	nextMonth: "Next month",
	prevMonth: "Previous month",
	nextYear: "Next year",
	prevYear: "Previous year",
	day: void 0,
	weekDay: void 0,
	clearInput: "Clear value",
	calendarIcon: "Calendar icon",
	timePicker: "Time picker",
	monthPicker: (e) => `Month picker${e ? " overlay" : ""}`,
	yearPicker: (e) => `Year picker${e ? " overlay" : ""}`,
	timeOverlay: (e) => `${e} overlay`
}, Mt = {
	menuAppearTop: "dp-menu-appear-top",
	menuAppearBottom: "dp-menu-appear-bottom",
	open: "dp-slide-down",
	close: "dp-slide-up",
	next: "calendar-next",
	previous: "calendar-prev",
	vNext: "dp-slide-up",
	vPrevious: "dp-slide-down"
}, Nt = {
	weekDays: [],
	months: [],
	years: [],
	times: {
		hours: [],
		minutes: [],
		seconds: []
	}
}, Pt = {
	month: "LLL",
	year: "yyyy",
	weekDay: "EEEEEE",
	quarter: "MMMM",
	day: "d",
	input: void 0,
	preview: void 0
}, Ft = {
	enableTimePicker: !0,
	ignoreTimeValidation: !1,
	enableSeconds: !1,
	enableMinutes: !0,
	is24: !0,
	noHoursOverlay: !1,
	noMinutesOverlay: !1,
	noSecondsOverlay: !1,
	hoursGridIncrement: 1,
	minutesGridIncrement: 5,
	secondsGridIncrement: 5,
	hoursIncrement: 1,
	minutesIncrement: 1,
	secondsIncrement: 1,
	timePickerInline: !1,
	startTime: void 0
}, It = {
	flowStep: 0,
	menuWrapRef: null,
	collapse: !1
}, Lt = {
	yearRange: () => [1900, 2100],
	ui: () => ({}),
	locale: () => Tt,
	dark: !1,
	transitions: !0,
	hideNavigation: () => [],
	vertical: !1,
	hideMonthYearSelect: !1,
	disableYearSelect: !1,
	autoApply: !1,
	disabledDates: () => [],
	hideOffsetDates: !1,
	noToday: !1,
	markers: () => [],
	presetDates: () => [],
	preventMinMaxNavigation: !1,
	reverseYears: !1,
	weekPicker: !1,
	arrowNavigation: !1,
	monthPicker: !1,
	yearPicker: !1,
	quarterPicker: !1,
	timePicker: !1,
	modelAuto: !1,
	multiDates: !1,
	range: !1,
	inline: !1,
	sixWeeks: !1,
	focusStartDate: !1,
	yearFirst: !1,
	loading: !1,
	centered: !1
}, Rt = {
	name: void 0,
	required: !1,
	autocomplete: "off",
	state: void 0,
	clearable: !0,
	alwaysClearable: !1,
	hideInputIcon: !1,
	id: void 0,
	inputmode: "none"
}, zt = {
	type: "local",
	hideOnOffsetDates: !1,
	label: "W"
}, Bt = (e) => {
	let { getMapKey: t, getMapKeyType: n, getTimeObjFromCurrent: i } = Vt();
	function a(t, n) {
		let r;
		return r = e.timezone ? new We(t ?? /* @__PURE__ */ new Date(), e.timezone) : t ? new Date(t) : /* @__PURE__ */ new Date(), n ? Z(r, {
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0
		}) : r;
	}
	let o = () => {
		let e = A.value.enableSeconds ? ":ss" : "", t = A.value.enableMinutes ? ":mm" : "";
		return A.value.is24 ? `HH${t}${e}` : `hh${t}${e} aa`;
	}, s = () => e.monthPicker ? "MM/yyyy" : e.timePicker ? o() : e.weekPicker ? `${C.value?.type === "iso" ? "II" : "ww"}-RR` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : A.value.enableTimePicker ? `MM/dd/yyyy, ${o()}` : "MM/dd/yyyy", c = (e) => i(a(), e, A.value.enableSeconds), l = () => E.value.enabled ? A.value.startTime && Array.isArray(A.value.startTime) ? [c(A.value.startTime[0]), c(A.value.startTime[1])] : null : A.value.startTime && !Array.isArray(A.value.startTime) ? c(A.value.startTime) : null, u = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : Math.max(+e, 2) : 0, d = (r) => {
		let i = n(e.monthPicker, e.yearPicker);
		return new Map(r.map((e) => {
			let n = a(e, f.value);
			return [t(n, i), n];
		}));
	}, f = r(() => e.monthPicker || e.yearPicker || e.quarterPicker), p = r(() => {
		let t = typeof e.multiCalendars == "object" && e.multiCalendars, n = {
			static: !0,
			solo: !1
		};
		if (!e.multiCalendars) return {
			...n,
			count: u(!1)
		};
		let r = t ? e.multiCalendars : {}, i = u(t ? r.count ?? !0 : e.multiCalendars);
		return Object.assign(n, r, { count: i });
	}), m = r(() => l()), h = r(() => ({
		...jt,
		...e.ariaLabels
	})), g = r(() => ({
		...Nt,
		...e.filters
	})), _ = r(() => typeof e.transitions == "boolean" ? e.transitions ? Mt : !1 : {
		...Mt,
		...e.transitions
	}), v = r(() => ({
		...At,
		...e.actionRow
	})), y = r(() => typeof e.textInput == "object" ? {
		...Ot,
		...e.textInput,
		format: typeof e.textInput.format == "string" ? e.textInput.format : O.value.input,
		pattern: e.textInput.format ?? O.value.input,
		enabled: !0
	} : {
		...Ot,
		format: O.value.input,
		pattern: O.value.input,
		enabled: e.textInput
	}), b = r(() => {
		let t = { input: !1 };
		return typeof e.inline == "object" ? {
			...t,
			...e.inline,
			enabled: !0
		} : {
			enabled: e.inline,
			...t
		};
	}), x = r(() => ({
		...Dt,
		...e.config
	})), S = r(() => typeof e.highlight == "function" ? e.highlight : {
		...kt,
		...e.highlight
	}), C = r(() => typeof e.weekNumbers == "object" ? {
		type: e.weekNumbers?.type ?? zt.type,
		hideOnOffsetDates: e.weekNumbers?.hideOnOffsetDates ?? zt.hideOnOffsetDates,
		label: e.weekNumbers.label ?? zt.label
	} : e.weekNumbers ? zt : void 0), w = r(() => typeof e.multiDates == "boolean" ? {
		enabled: e.multiDates,
		dragSelect: !0,
		limit: null
	} : {
		enabled: !!e.multiDates,
		limit: e.multiDates?.limit ? +e.multiDates.limit : null,
		dragSelect: e.multiDates?.dragSelect ?? !0
	}), T = r(() => ({
		minDate: e.minDate ? a(e.minDate) : null,
		maxDate: e.maxDate ? a(e.maxDate) : null,
		disabledDates: Array.isArray(e.disabledDates) ? d(e.disabledDates) : e.disabledDates,
		allowedDates: Array.isArray(e.allowedDates) ? d(e.allowedDates) : null,
		highlight: typeof S.value == "object" && Array.isArray(S.value.dates) ? d(S.value.dates) : S.value,
		markers: e.markers?.length ? new Map(e.markers.map((e) => [t(a(e.date), at.DATE), e])) : null
	})), E = r(() => typeof e.range == "object" ? {
		enabled: !0,
		...Et,
		...e.range
	} : {
		enabled: e.range,
		...Et
	}), D = r(() => Object.fromEntries(Object.keys(e.ui).map((t) => {
		let n = t, r = e.ui[n];
		return n === "dayClass" ? [n, e.ui[n]] : [t, typeof e.ui[n] == "string" ? { [r]: !0 } : Object.fromEntries(r.map((e) => [e, !0]))];
	}))), O = r(() => ({
		...Pt,
		...e.formats,
		input: e.formats?.input ?? s(),
		preview: e.formats?.preview ?? e.formats?.input ?? s()
	})), k = r(() => {
		if (e.teleport) return typeof e.teleport == "string" ? e.teleport : typeof e.teleport == "boolean" ? "body" : e.teleport;
	}), A = r(() => ({
		...Ft,
		...e.timeConfig
	}));
	return {
		transitions: _,
		multiCalendars: p,
		startTime: m,
		ariaLabels: h,
		filters: g,
		actionRow: v,
		textInput: y,
		inline: b,
		config: x,
		highlight: S,
		weekNumbers: C,
		range: E,
		safeDates: T,
		multiDates: w,
		ui: D,
		formats: O,
		teleport: k,
		timeConfig: A,
		flow: r(() => {
			if (e.flow) return {
				steps: [],
				partial: !1,
				...e.flow
			};
		}),
		inputAttrs: r(() => {
			let t = y.value.enabled ? "text" : "none";
			return e.inputAttrs ? {
				...Rt,
				inputmode: t,
				...e.inputAttrs
			} : {
				...Rt,
				inputmode: t
			};
		}),
		floatingConfig: r(() => ({
			offset: e.floating?.offset ?? 10,
			arrow: e.floating?.arrow ?? !0,
			strategy: e.floating?.strategy ?? void 0,
			placement: e.floating?.placement ?? void 0,
			flip: e.floating?.flip ?? !0,
			shift: e.floating?.shift ?? !0
		})),
		weekStart: r(() => e.weekStart || e.weekStart === 0 || e.weekStart === "0" ? +e.weekStart : ge(Le(a(), { locale: e.locale }))),
		getDate: a
	};
}, Vt = () => {
	let e = (e, t) => he(e, t ?? at.DATE), t = (e, t) => e ? at.MONTH_AND_YEAR : t ? at.YEAR : at.DATE, n = (t, n, r) => n.get(e(t, r)), r = (e) => e, i = (e) => e === 0 ? e : !e || Number.isNaN(+e) ? null : +e, a = () => [
		"a[href]",
		"area[href]",
		"input:not([disabled]):not([type='hidden'])",
		"select:not([disabled])",
		"textarea:not([disabled])",
		"button:not([disabled])",
		"[tabindex]:not([tabindex='-1'])",
		"[data-datepicker-instance]"
	].join(", "), o = (e, t) => {
		let n = [...document.querySelectorAll(a())];
		n = n.filter((t) => !e.contains(t) || "datepicker-instance" in t.dataset);
		let r = n.indexOf(e);
		if (r >= 0 && (t ? r - 1 >= 0 : r + 1 <= n.length)) return n[r + (t ? -1 : 1)];
	}, s = (e) => String(e).padStart(2, "0"), c = (e, t) => e?.querySelector(`[data-dp-element="${t}"]`), l = (e, t, n = !1) => {
		e && t.allowStopPropagation && (n && e.stopImmediatePropagation(), e.stopPropagation());
	}, u = (e, t, n = !1, r) => {
		if (e.key === $.enter || e.key === $.space) return n && e.preventDefault(), t();
		if (r) return r(e);
	}, d = (e, t) => {
		t.allowStopPropagation && e.stopPropagation(), t.allowPreventDefault && e.preventDefault();
	}, f = (e) => {
		if (e) return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
	}, p = () => "ontouchstart" in globalThis || navigator.maxTouchPoints > 0, m = (e) => [
		12,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11
	][e], h = (e) => {
		let t = [], n = (e) => e.filter((e) => !!e);
		for (let r = 0; r < e.length; r += 3) {
			let i = [
				e[r],
				e[r + 1],
				e[r + 2]
			];
			t.push(n(i));
		}
		return t;
	}, g = {
		prop: (e) => `"${e}" prop must be enabled!`,
		dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
	}, _ = (e, t, n, r, i) => {
		let a = {
			hours: _e,
			minutes: ye,
			seconds: xe
		};
		if (!t) return r ? [a[e](n), a[e](n)] : a[e](n);
		if (Array.isArray(t) && r) {
			let r = t[0] ?? n, o = t[1];
			return [a[e](r), o ? a[e](o) : i[e][1] ?? a[e](n)];
		}
		return Array.isArray(t) && !r ? a[e](t.at(-1) ?? n) : a[e](t);
	};
	return {
		getMapKey: e,
		getMapKeyType: t,
		getMapDate: n,
		convertType: r,
		getNumVal: i,
		findNextFocusableElement: o,
		padZero: s,
		getElWithin: c,
		checkStopPropagation: l,
		checkKeyDown: u,
		handleEventPropagation: d,
		findFocusableEl: f,
		isTouchDevice: p,
		hoursToAmPmHours: m,
		getGroupedList: h,
		setTimeModelValue: (e, t, n, r) => {
			e.hours = _("hours", t, n, r, e), e.minutes = _("minutes", t, n, r, e), e.seconds = _("seconds", t, n, r, e);
		},
		getTimeObjFromCurrent: (e, t, n) => {
			let r = {
				hours: _e(e),
				minutes: ye(e),
				seconds: n ? xe(e) : 0
			};
			return Object.assign(r, t);
		},
		errorMapper: g
	};
}, Ht = () => {
	let { getDate: e } = Q(), { getMapDate: t, getGroupedList: n } = Vt(), r = (t, n) => {
		if (!t) return e();
		let r = Z(e(t), {
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0
		});
		return n ? Fe(r) : r;
	}, i = (t, n) => {
		let r = e(n);
		return Z(r, {
			hours: +(t.hours ?? _e(r)),
			minutes: +(t.minutes ?? ye(r)),
			seconds: +(t.seconds ?? xe(r)),
			milliseconds: 0
		});
	}, a = (e, t) => [Le(e, { weekStartsOn: +t }), pe(e, { weekStartsOn: +t })], o = (e, t) => !e || !t ? !1 : we(r(e), r(t)), s = (e, t) => !e || !t ? !1 : Ee(r(e), r(t)), c = (e, t) => !e || !t ? !1 : Ce(r(e), r(t)), l = (e, t, n) => e?.[0] && e?.[1] ? c(n, e[0]) && o(n, e[1]) : e?.[0] && t ? c(n, e[0]) && o(n, t) || o(n, e[0]) && c(n, t) : !1, u = (e, t) => ue({
		start: c(e, t) ? t : e,
		end: c(t, e) ? t : e
	}), d = (e) => `dp-${he(e, "yyyy-MM-dd")}`, f = (t) => r(Z(e(t), { date: 1 })), p = (t, n) => {
		if (n) {
			let r = X(e(n));
			if (r > t) return 12;
			if (r === t) return Y(e(n));
		}
	}, m = (t, n) => {
		if (n) {
			let r = X(e(n));
			return r < t ? -1 : r === t ? Y(e(n)) : void 0;
		}
	}, h = (t) => {
		if (t) return X(e(t));
	}, g = (e) => ({
		hours: _e(e),
		minutes: ye(e),
		seconds: xe(e)
	});
	return {
		resetDateTime: r,
		groupListAndMap: (e, t) => n(e).map((e) => e.map((e) => {
			let { active: n, disabled: r, isBetween: i, highlighted: a } = t(e);
			return {
				...e,
				active: n,
				disabled: r,
				className: {
					"dp--active dp--overlay-cell-active": n,
					"dp--overlay-cell": !n,
					"dp--overlay-cell-disabled": r,
					"dp--overlay-cell-pad": !0,
					"dp--overlay-cell-active-disabled": r && n,
					"dp--cell-in-between": i,
					"dp--highlighted": a
				}
			};
		})),
		setTime: i,
		getWeekFromDate: a,
		isDateAfter: c,
		isDateBefore: o,
		isDateBetween: l,
		isDateEqual: s,
		getDaysInBetween: u,
		getCellId: d,
		resetDate: f,
		getMinMonth: p,
		getMaxMonth: m,
		getYearFromDate: h,
		getTimeObj: g,
		setTimeValue: (t) => Z(e(), g(t)),
		sanitizeTime: (e, t, n) => t && (n || n === 0) ? Object.fromEntries([
			"hours",
			"minutes",
			"seconds"
		].map((r) => r === t ? [r, n] : [r, Number.isNaN(+e[r]) ? void 0 : +e[r]])) : {
			hours: Number.isNaN(+e.hours) ? void 0 : +e.hours,
			minutes: Number.isNaN(+e.minutes) ? void 0 : +e.minutes,
			seconds: Number.isNaN(+(e.seconds ?? "")) ? void 0 : +e.seconds
		},
		getBeforeAndAfterInRange: (e, t) => ({
			before: Be(r(t), e),
			after: q(r(t), e)
		}),
		isModelAuto: (e) => Array.isArray(e) ? !!e[0] && !!e[1] : !1,
		matchDate: (n, r) => n ? r ? r instanceof Map ? !!t(n, r) : r(e(n)) : !1 : !0,
		checkHighlightMonth: (e, t, n) => typeof e == "function" ? e({
			month: t,
			year: n
		}) : e.months.some((e) => e.month === t && e.year === n),
		checkHighlightYear: (e, t) => typeof e == "function" ? e(t) : e.years.includes(t)
	};
}, Ut = () => {
	let { defaults: { config: e } } = Q(), t = O(0);
	S(() => {
		n(), globalThis.addEventListener("resize", n, { passive: !0 });
	}), C(() => {
		globalThis.removeEventListener("resize", n);
	});
	let n = () => {
		t.value = globalThis.document.documentElement.clientWidth;
	};
	return { isMobile: r(() => t.value <= e.value.mobileBreakpoint ? !0 : void 0) };
}, Wt = () => {
	let { getDate: e, state: t, modelValue: n, rootProps: r, defaults: { formats: i, textInput: a } } = Q(), o = (t) => he(Pe(e(), t), i.value.year, { locale: r.locale }), s = (t) => he(Me(e(), t), i.value.month, { locale: r.locale }), c = (e) => he(e, i.value.weekDay, { locale: r.locale }), l = (e) => he(e, i.value.quarter, { locale: r.locale }), u = (e, t) => [e, t].map((e) => l(e)).join("-"), d = (e) => he(e, i.value.day, { locale: r.locale }), f = (e, t, n) => {
		let o = n ? i.value.preview : i.value.input;
		if (!e) return "";
		if (typeof o == "function") return o(e);
		let s = t ?? o, c = { locale: r.locale };
		return Array.isArray(e) ? `${he(e[0], s, c)}${r.modelAuto && !e[1] ? "" : a.value.rangeSeparator}${e[1] ? he(e[1], s, c) : ""}` : he(e, s, c);
	}, p = () => {
		let e = (e) => he(e, a.value.format);
		return Array.isArray(n.value) ? `${e(n.value[0])}${a.value.rangeSeparator}${n.value[1] ? e(n.value[1]) : ""}` : "";
	};
	return {
		formatYear: o,
		formatMonth: s,
		formatWeekDay: c,
		formatQuarter: l,
		formatSelectedDate: f,
		formatForTextInput: () => t.isInputFocused && n.value ? Array.isArray(n.value) ? p() : he(n.value, a.value.format) : f(n.value),
		formatPreview: (e) => f(e, void 0, !0),
		formatQuarterText: u,
		formatDay: d
	};
}, Gt = () => {
	let { rootProps: e } = Q(), { formatYear: t, formatMonth: n } = Wt();
	return {
		getMonths: () => [
			0,
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11
		].map((e) => ({
			text: n(e),
			value: e
		})),
		getYears: () => {
			let n = [];
			for (let r = +e.yearRange[0]; r <= +e.yearRange[1]; r++) n.push({
				value: +r,
				text: t(r)
			});
			return e.reverseYears ? n.reverse() : n;
		},
		isOutOfYearRange: (t) => t < +e.yearRange[0] || t > +e.yearRange[1]
	};
}, Kt = (e) => ({
	openMenu: () => e.value?.openMenu(),
	closeMenu: () => e.value?.closeMenu(),
	selectDate: () => e.value?.selectDate(),
	clearValue: () => e.value?.clearValue(),
	formatInputValue: () => e.value?.formatInputValue(),
	updateInternalModelValue: (t) => e.value?.updateInternalModelValue(t),
	setMonthYear: (t, n) => e.value?.setMonthYear(t, n),
	parseModel: () => e.value?.parseModel(),
	switchView: (t, n) => e.value?.switchView(t, n),
	handleFlow: () => e.value?.handleFlow(),
	toggleMenu: () => e.value?.toggleMenu(),
	dpMenuRef: () => e.value?.dpMenuRef(),
	dpWrapMenuRef: () => e.value?.dpWrapMenuRef(),
	inputRef: () => e.value?.inputRef()
}), qt = () => ({ boolHtmlAttribute: (e) => e ? !0 : void 0 }), Jt = () => {
	let { getDate: e, rootProps: t, defaults: { textInput: n, startTime: i, timeConfig: a } } = Q(), { getTimeObjFromCurrent: o } = Vt(), s = O(!1), c = r(() => Array.isArray(i.value) ? i.value[0] : i.value ?? o(e(), {}, a.value.enableSeconds)), l = (e, t) => {
		let n = /[^a-zA-Z0-9]+/g, r = t.split(n), i = e.split(n), a = e.match(n) || [], o = t.match(n) || [], s = "";
		for (let e = 0; e < r.length && e < i.length; e++) {
			e > 0 && o[e - 1] && (s += a[e - 1] || o[e - 1]);
			let t = r[e]?.length;
			s += i[e]?.slice(0, t);
		}
		return s;
	}, u = (n, r, i) => {
		let a = ke(n, l(r, n), e(), { locale: t.locale });
		return Oe(a) && Te(a) ? i || s.value ? a : Z(a, {
			hours: +c.value.hours,
			minutes: +c.value.minutes,
			seconds: +(c.value.seconds ?? 0),
			milliseconds: 0
		}) : null;
	};
	return {
		textPasted: s,
		parseFreeInput: (e, t) => {
			if (typeof n.value.pattern == "string") return u(e, n.value.pattern, t);
			if (Array.isArray(n.value.pattern)) {
				let r = null;
				for (let i of n.value.pattern) if (r = u(e, i, t), r) break;
				return r;
			}
			return typeof n.value.pattern == "function" ? n.value.pattern(e) : null;
		},
		applyMaxValues: (e, t) => {
			let n = {
				MM: 12,
				DD: 31,
				hh: 23,
				mm: 59,
				ss: 59
			}, r = "", i = 0;
			for (let a = 0; a < t.length; a++) {
				let o = t[a], s = o.length, c = e.slice(i, i + s);
				if (!c) break;
				if (c.length < s) r += c;
				else {
					let e = Number.parseInt(c, 10);
					n[o] && e > n[o] && (e = n[o]), r += e.toString().padStart(s, "0").slice(0, s);
				}
				i += s;
			}
			return r;
		},
		createMaskedValue: (e, t) => {
			let n = /(YYYY|MM|DD|hh|mm|ss)/g, r = [...t.matchAll(n)].map((e) => e[0]), i = t.replace(n, "|").split("|").filter(Boolean), a = r.map((e) => e.length), o = "", s = 0;
			for (let t = 0; t < r.length; t++) {
				let n = a[t], r = e.slice(s, s + n);
				if (!r) break;
				o += r, r.length === n && i[t] && (o += i[t]), s += n;
			}
			return o;
		}
	};
}, Yt = /* @__PURE__ */ function(e) {
	return e.Input = "input", e.DatePicker = "date-picker", e.Calendar = "calendar", e.DatePickerHeader = "date-picker-header", e.Menu = "menu", e.ActionRow = "action-row", e.TimePicker = "time-picker", e.TimeInput = "time-input", e.PassTrough = "pass-trough", e.MonthPicker = "month-picker", e.YearMode = "year-mode", e.QuarterPicker = "quarter-picker", e.YearPicker = "year-picker", e;
}({}), Xt = [
	"time-input",
	"time-picker",
	"pass-trough"
], Zt = [
	{
		name: "trigger",
		use: ["input"]
	},
	{
		name: "input-icon",
		use: ["input"]
	},
	{
		name: "clear-icon",
		use: ["input"]
	},
	{
		name: "dp-input",
		use: ["input"]
	},
	{
		name: "clock-icon",
		use: [
			"time-picker",
			"time-input",
			"pass-trough"
		]
	},
	{
		name: "arrow-left",
		use: [
			"date-picker-header",
			"pass-trough",
			"year-mode"
		]
	},
	{
		name: "arrow-right",
		use: [
			"date-picker-header",
			"pass-trough",
			"year-mode"
		]
	},
	{
		name: "arrow-up",
		use: [
			"time-picker",
			"time-input",
			"date-picker-header",
			"pass-trough"
		]
	},
	{
		name: "arrow-down",
		use: [
			"time-picker",
			"time-input",
			"date-picker-header",
			"pass-trough"
		]
	},
	{
		name: "calendar-icon",
		use: [
			"date-picker-header",
			"time-picker",
			"pass-trough",
			"year-mode"
		]
	},
	{
		name: "day",
		use: ["calendar", "pass-trough"]
	},
	{
		name: "month-overlay-value",
		use: [
			"date-picker-header",
			"pass-trough",
			"month-picker"
		]
	},
	{
		name: "year-overlay-value",
		use: [
			"date-picker-header",
			"pass-trough",
			"year-mode",
			"year-picker"
		]
	},
	{
		name: "year-overlay",
		use: ["date-picker-header", "pass-trough"]
	},
	{
		name: "month-overlay",
		use: ["date-picker-header", "pass-trough"]
	},
	{
		name: "month-overlay-header",
		use: ["date-picker-header", "pass-trough"]
	},
	{
		name: "year-overlay-header",
		use: ["date-picker-header", "pass-trough"]
	},
	{
		name: "hours-overlay-value",
		use: Xt
	},
	{
		name: "hours-overlay-header",
		use: Xt
	},
	{
		name: "minutes-overlay-value",
		use: Xt
	},
	{
		name: "minutes-overlay-header",
		use: Xt
	},
	{
		name: "seconds-overlay-value",
		use: Xt
	},
	{
		name: "seconds-overlay-header",
		use: Xt
	},
	{
		name: "hours",
		use: [
			"time-input",
			"time-picker",
			"pass-trough"
		]
	},
	{
		name: "minutes",
		use: [
			"time-input",
			"time-picker",
			"pass-trough"
		]
	},
	{
		name: "seconds",
		use: [
			"time-input",
			"time-picker",
			"pass-trough"
		]
	},
	{
		name: "month",
		use: [
			"date-picker-header",
			"time-picker",
			"pass-trough"
		]
	},
	{
		name: "year",
		use: [
			"date-picker-header",
			"time-picker",
			"pass-trough",
			"year-mode"
		]
	},
	{
		name: "action-buttons",
		use: ["action-row"]
	},
	{
		name: "action-preview",
		use: ["action-row"]
	},
	{
		name: "calendar-header",
		use: ["calendar", "pass-trough"]
	},
	{
		name: "marker-tooltip",
		use: ["calendar", "pass-trough"]
	},
	{
		name: "action-extra",
		use: ["menu"]
	},
	{
		name: "time-picker-overlay",
		use: [
			"time-picker",
			"time-picker",
			"pass-trough"
		]
	},
	{
		name: "am-pm-button",
		use: [
			"time-picker",
			"time-input",
			"pass-trough"
		]
	},
	{
		name: "left-sidebar",
		use: ["menu"]
	},
	{
		name: "right-sidebar",
		use: ["menu"]
	},
	{
		name: "month-year",
		use: [
			"date-picker-header",
			"pass-trough",
			"month-picker",
			"year-picker"
		]
	},
	{
		name: "time-picker",
		use: ["date-picker", "pass-trough"]
	},
	{
		name: "action-row",
		use: ["action-row"]
	},
	{
		name: "marker",
		use: ["calendar", "pass-trough"]
	},
	{
		name: "quarter",
		use: ["quarter-picker", "pass-trough"]
	},
	{
		name: "top-extra",
		use: [
			"date-picker-header",
			"pass-trough",
			"month-picker",
			"quarter-picker",
			"year-picker"
		]
	},
	{
		name: "tp-inline-arrow-up",
		use: [
			"date-picker",
			"time-input",
			"time-picker",
			"pass-trough"
		]
	},
	{
		name: "tp-inline-arrow-down",
		use: [
			"date-picker",
			"time-input",
			"time-picker",
			"pass-trough"
		]
	},
	{
		name: "arrow",
		use: ["menu"]
	},
	{
		name: "menu-header",
		use: ["menu"]
	}
], Qt = (e, t) => Zt.filter((n) => e[n.name] && n.use.includes(t)).map((e) => e.name), $t = (e, t) => Zt.map((e) => e.name).concat(t?.filter((e) => e.slot).map((e) => e.slot) ?? []).filter((t) => !!e[t]), en = {
	key: 1,
	class: "dp--input-wrap"
}, tn = [
	"id",
	"name",
	"inputmode",
	"placeholder",
	"disabled",
	"readonly",
	"required",
	"value",
	"autocomplete",
	"aria-label",
	"aria-disabled",
	"aria-invalid"
], nn = {
	key: 1,
	class: "dp--clear-btn"
}, rn = ["aria-label"], an = /* @__PURE__ */ d({
	__name: "DatepickerInput",
	props: { isMenuOpen: {
		type: Boolean,
		default: !1
	} },
	emits: [
		"clear",
		"open",
		"set-input-date",
		"close",
		"select-date",
		"set-empty-date",
		"toggle",
		"focus",
		"blur",
		"real-blur"
	],
	setup(e, { expose: t, emit: n }) {
		let c = n, l = e, { rootEmit: d, inputValue: f, rootProps: p, defaults: { textInput: m, ariaLabels: h, inline: g, config: y, range: b, multiDates: x, ui: S, inputAttrs: C } } = Q(), { checkMinMaxRange: T, isValidDate: E } = dt(), { parseFreeInput: D, textPasted: k, createMaskedValue: j, applyMaxValues: M } = Jt(), { checkKeyDown: N, checkStopPropagation: P } = Vt(), { boolHtmlAttribute: I } = qt(), R = L("dp-input"), z = O(null), B = O(!1), V = r(() => ({
			"dp--pointer": !p.disabled && !p.readonly && !m.value.enabled,
			"dp--disabled": p.disabled,
			"dp--input-readonly": !m.value.enabled,
			"dp--input": !0,
			"dp--input-not-clearable": !C.value.clearable,
			"dp--input-icon-pad": !C.value.hideInputIcon,
			"dp--input-valid": typeof C.value.state == "boolean" ? C.value.state : !1,
			"dp--input-invalid": typeof C.value.state == "boolean" ? !C.value.state : !1,
			"dp--input-focus": B.value || l.isMenuOpen,
			"dp--input-reg": !m.value.enabled,
			...S.value.input
		})), H = () => {
			c("set-input-date", null), C && p.autoApply && (c("set-empty-date"), z.value = null);
		}, ee = (e) => {
			if (m.value.separators?.length) {
				let t = new RegExp(m.value.separators.map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"));
				return e.split(t);
			}
			return e.split(m.value.rangeSeparator);
		}, te = (e) => {
			let [t, n] = ee(e);
			if (t) {
				let e = D(t.trim(), f.value), r = n ? D(n.trim(), f.value) : void 0;
				if (Ce(e, r)) return;
				let i = e && r ? [e, r] : [e];
				T(r, i, 0) && (z.value = e ? i : null);
			}
		}, W = () => {
			k.value = !0;
		}, ne = (e) => {
			b.value.enabled ? te(e) : x.value.enabled ? z.value = e.split(";").map((e) => D(e.trim())).filter((e) => !!e) : z.value = D(e, f.value);
		}, G = (e) => {
			let t = typeof e == "string" ? e : e.target?.value, n = m?.value?.maskFormat, r = t;
			if (typeof n == "string") {
				let e = [...n.matchAll(/(YYYY|MM|DD|hh|mm|ss)/g)].map((e) => e[0]);
				r = j(M(t.replace(/\D/g, ""), e), n);
			}
			r === "" ? H() : (m.value.openMenu && !l.isMenuOpen && c("open"), ne(r), c("set-input-date", z.value)), k.value = !1, f.value = r, d("text-input", e, z.value);
		}, re = (e) => {
			m.value.enabled ? (ne(e.target.value), m.value.enterSubmit && E(z.value) && f.value !== "" ? (c("set-input-date", z.value, !0), z.value = null) : m.value.enterSubmit && f.value === "" && (z.value = null, c("clear"))) : K(e);
		}, ie = (e, t) => {
			m.value.enabled && m.value.tabSubmit && !t && ne(e.target.value), m.value.tabSubmit && E(z.value) && f.value !== "" ? (c("set-input-date", z.value, !0, !0), z.value = null) : m.value.tabSubmit && f.value === "" && (z.value = null, c("clear"));
		}, ae = () => {
			B.value = !0, c("focus"), _().then(() => {
				m.value.enabled && m.value.selectOnFocus && R.value?.select();
			});
		}, K = (e) => {
			if (P(e, y.value, !0), m.value.enabled && m.value.openMenu && !g.value.input) {
				if (m.value.openMenu === "open" && !l.isMenuOpen) return c("open");
				if (m.value.openMenu === "toggle") return c("toggle");
			} else m.value.enabled || c("toggle");
		}, oe = () => {
			c("real-blur"), B.value = !1, (!l.isMenuOpen || g.value.enabled && g.value.input) && c("blur"), (p.autoApply && m.value.enabled && z.value && !l.isMenuOpen || m.value.applyOnBlur) && (c("set-input-date", z.value), c("select-date"), z.value = null);
		}, q = (e) => {
			P(e, y.value, !0), c("clear");
		}, J = () => {
			c("close");
		}, se = (e) => {
			if (e.key === "Tab" && ie(e), e.key === "Enter" && re(e), e.key === "Escape" && m.value.escClose && J(), !m.value.enabled) {
				if (e.code === "Tab") return;
				e.preventDefault();
			}
		}, ce = () => {
			R.value?.focus({ preventScroll: !0 });
		}, le = (e) => {
			z.value = e;
		}, ue = (e) => {
			e.key === $.tab && ie(e, !0);
		};
		return t({
			focusInput: ce,
			setParsedDate: le
		}), (t, n) => (w(), o("div", { onClick: K }, [!t.$slots["dp-input"] && !F(g).enabled ? A(t.$slots, "trigger", { key: 0 }) : a("", !0), !t.$slots.trigger && (!F(g).enabled || F(g).input) ? (w(), o("div", en, [
			!t.$slots.trigger && (!F(g).enabled || F(g).enabled && F(g).input) ? A(t.$slots, "dp-input", {
				key: 0,
				value: F(f),
				isMenuOpen: e.isMenuOpen,
				onInput: G,
				onEnter: re,
				onTab: ie,
				onClear: q,
				onBlur: oe,
				onKeypress: se,
				onPaste: W,
				onFocus: ae,
				openMenu: () => t.$emit("open"),
				closeMenu: () => t.$emit("close"),
				toggleMenu: () => t.$emit("toggle")
			}, () => [s("input", {
				id: F(C).id,
				ref: "dp-input",
				"data-test-id": "dp-input",
				name: F(C).name,
				class: v(V.value),
				inputmode: F(C).inputmode,
				placeholder: F(p).placeholder,
				disabled: F(I)(F(p).disabled),
				readonly: F(I)(F(p).readonly),
				required: F(I)(F(C).required),
				value: F(f),
				autocomplete: F(C).autocomplete,
				"aria-label": F(h).input,
				"aria-disabled": F(p).disabled || void 0,
				"aria-invalid": F(C).state === !1 ? !0 : void 0,
				onInput: G,
				onBlur: oe,
				onFocus: ae,
				onKeypress: se,
				onKeydown: n[0] ||= (e) => se(e),
				onPaste: W,
				onInvalid: n[1] ||= (e) => F(d)("invalid", e)
			}, null, 42, tn)]) : a("", !0),
			s("div", { onClick: n[4] ||= (e) => c("toggle") }, [t.$slots["input-icon"] && !F(C).hideInputIcon ? (w(), o("span", {
				key: 0,
				class: "dp--input-icon",
				onClick: n[2] ||= (e) => c("toggle")
			}, [A(t.$slots, "input-icon")])) : a("", !0), !t.$slots["input-icon"] && !F(C).hideInputIcon && !t.$slots["dp-input"] ? (w(), i(F(Ge), {
				key: 1,
				"aria-label": F(h)?.calendarIcon,
				class: "dp--input-icon dp--input-icons",
				onClick: n[3] ||= (e) => c("toggle")
			}, null, 8, ["aria-label"])) : a("", !0)]),
			t.$slots["clear-icon"] && (F(C).alwaysClearable || F(f) && F(C).clearable && !F(p).disabled && !F(p).readonly) ? (w(), o("span", nn, [A(t.$slots, "clear-icon", { clear: q })])) : a("", !0),
			!t.$slots["clear-icon"] && (F(C).alwaysClearable || F(C).clearable && F(f) && !F(p).disabled && !F(p).readonly) ? (w(), o("button", {
				key: 2,
				"aria-label": F(h)?.clearInput,
				class: "dp--clear-btn",
				type: "button",
				"data-test-id": "clear-input-value-btn",
				onKeydown: n[5] ||= (e) => F(N)(e, () => q(e), !0, ue),
				onClick: n[6] ||= U((e) => q(e), ["prevent"])
			}, [u(F(Ke), { class: "dp--input-icons" })], 40, rn)) : a("", !0)
		])) : a("", !0)]));
	}
}), on = {
	ref: "action-row",
	class: "dp--action-row"
}, sn = ["title"], cn = {
	ref: "action-buttons-container",
	class: "dp--action-buttons",
	"data-dp-element": "action-row"
}, ln = ["disabled"], un = /* @__PURE__ */ d({
	__name: "ActionRow",
	props: {
		menuMount: {
			type: Boolean,
			default: !1
		},
		calendarWidth: { default: 0 }
	},
	emits: [
		"close-picker",
		"select-date",
		"select-now"
	],
	setup(t, { emit: n }) {
		let i = n, c = t, { rootEmit: u, rootProps: d, modelValue: f, defaults: { actionRow: p, multiCalendars: m, inline: h, range: _, multiDates: v, formats: x } } = Q(), { isTimeValid: T, isMonthValid: E } = dt(), { formatPreview: D } = Wt(), { checkKeyDown: k, convertType: j } = Vt(), { boolHtmlAttribute: N } = qt(), P = L("action-buttons-container"), I = L("action-row"), R = O(!1), z = O({});
		S(() => {
			B(), globalThis.addEventListener("resize", B);
		}), C(() => {
			globalThis.removeEventListener("resize", B);
		});
		let B = () => {
			R.value = !1, setTimeout(() => {
				let e = P.value?.getBoundingClientRect(), t = I.value?.getBoundingClientRect();
				e && t && (z.value.maxWidth = `${t.width - e.width - 20}px`), R.value = !0;
			}, 0);
		}, V = r(() => _.value.enabled && !_.value.partialRange && f.value ? f.value.length === 2 : !0), H = r(() => !T.value(f.value) || !E.value(f.value) || !V.value), U = () => {
			let e = x.value.preview;
			return d.timePicker || d.monthPicker, e(j(f.value));
		}, ee = () => {
			let e = f.value;
			return m.value.count > 0 ? `${D(e[0])} - ${D(e[1])}` : [D(e[0]), D(e[1])];
		}, te = r(() => !f.value || !c.menuMount ? "" : typeof x.value.preview == "string" ? Array.isArray(f.value) ? f.value.length === 2 && f.value[1] ? ee() : v.value.enabled ? f.value.map((e) => `${D(e)}`) : d.modelAuto ? `${D(f.value[0])}` : `${D(f.value[0])} -` : D(f.value) : U()), W = () => v.value.enabled ? "; " : " - ", ne = r(() => Array.isArray(te.value) ? te.value.join(W()) : te.value), G = () => {
			T.value(f.value) && E.value(f.value) && V.value ? i("select-date") : u("invalid-select");
		};
		return (t, n) => (w(), o("div", on, [t.$slots["action-row"] ? A(t.$slots, "action-row", y(g({ key: 0 }, {
			modelValue: F(f),
			disabled: H.value,
			selectDate: () => t.$emit("select-date"),
			closePicker: () => t.$emit("close-picker")
		}))) : (w(), o(e, { key: 1 }, [F(p).showPreview ? (w(), o("div", {
			key: 0,
			class: "dp--selection-preview",
			title: ne.value || void 0,
			style: b(z.value)
		}, [t.$slots["action-preview"] && R.value ? A(t.$slots, "action-preview", {
			key: 0,
			value: F(f),
			formatValue: ne.value
		}) : a("", !0), !t.$slots["action-preview"] && R.value ? (w(), o(e, { key: 1 }, [l(M(ne.value), 1)], 64)) : a("", !0)], 12, sn)) : a("", !0), s("div", cn, [t.$slots["action-buttons"] ? A(t.$slots, "action-buttons", {
			key: 0,
			value: F(f),
			selectDate: G,
			selectionDisabled: H.value
		}) : a("", !0), t.$slots["action-buttons"] ? a("", !0) : (w(), o(e, { key: 1 }, [
			!F(h).enabled && F(p).showCancel ? (w(), o("button", {
				key: 0,
				ref: "cancel-btn",
				type: "button",
				"data-dp-action-element": "0",
				class: "dp--action-button dp--action-cancel",
				onClick: n[0] ||= (e) => t.$emit("close-picker"),
				onKeydown: n[1] ||= (e) => F(k)(e, () => t.$emit("close-picker"))
			}, M(F(p).cancelBtnLabel), 545)) : a("", !0),
			F(p).showNow ? (w(), o("button", {
				key: 1,
				type: "button",
				"data-dp-action-element": "0",
				class: "dp--action-button dp--action-cancel",
				onClick: n[2] ||= (e) => t.$emit("select-now"),
				onKeydown: n[3] ||= (e) => F(k)(e, () => t.$emit("select-now"))
			}, M(F(p).nowBtnLabel), 33)) : a("", !0),
			F(p).showSelect ? (w(), o("button", {
				key: 2,
				ref: "select-btn",
				type: "button",
				"data-dp-action-element": "0",
				class: "dp--action-button dp--action-select",
				disabled: F(N)(H.value),
				"data-test-id": "select-button",
				onKeydown: n[4] ||= (e) => F(k)(e, () => G()),
				onClick: G
			}, M(F(p).selectBtnLabel), 41, ln)) : a("", !0)
		], 64))], 512)], 64))], 512));
	}
}), dn = () => {
	let { rootProps: e, defaults: { multiCalendars: t } } = Q();
	return {
		hideNavigationButtons: r(() => (t) => e.hideNavigation?.includes(t)),
		showLeftIcon: r(() => (e) => t.value.count ? t.value.solo ? !0 : e === 0 : !0),
		showRightIcon: r(() => (e) => t.value.count ? t.value.solo ? !0 : e === t.value.count - 1 : !0)
	};
}, fn = [
	"role",
	"aria-label",
	"tabindex"
], pn = { class: "dp--selection-grid-header" }, mn = [
	"aria-selected",
	"aria-disabled",
	"data-dp-action-element",
	"data-dp-element-active",
	"data-test-id",
	"onClick",
	"onKeydown",
	"onMouseover"
], hn = ["aria-label", "data-dp-action-element"], gn = /* @__PURE__ */ d({
	__name: "SelectionOverlay",
	props: {
		items: {},
		type: {},
		useRelative: { type: Boolean },
		height: {},
		overlayLabel: {},
		isLast: { type: Boolean },
		level: {}
	},
	emits: [
		"selected",
		"toggle",
		"reset-flow",
		"hover-value"
	],
	setup(t, { emit: n }) {
		let i = n, c = t, { setState: u, defaults: { ariaLabels: d, config: f } } = Q(), { hideNavigationButtons: p } = dn(), { handleEventPropagation: m, checkKeyDown: h } = Vt(), g = L("toggle-button"), y = L("overlay-container"), T = L("grid-wrap"), E = O(!1), D = O(null), j = O(), N = O(0);
		x(() => {
			D.value = null;
		}), S(async () => {
			await _(), W(), u("arrowNavigationLevel", c.level ?? 1);
		}), C(() => {
			u("arrowNavigationLevel", (c.level ?? 1) - 1);
		});
		let P = r(() => ({
			"dp--overlay": !0,
			"dp--overlay-absolute": !c.useRelative,
			"dp--overlay-relative": c.useRelative
		})), I = r(() => c.useRelative ? {
			height: `${c.height}px`,
			width: "var(--dp-menu-min-width)"
		} : void 0), B = r(() => ({ "dp--overlay-col": !0 })), H = r(() => ({
			"dp--btn-base dp--bg-none": !0,
			"dp--button": !0,
			"dp--overlay-action": !0,
			"dp--over-action-scroll": E.value,
			"dp--button-bottom": c.isLast
		})), ee = r(() => ({
			"dp--overlay-container": !0,
			"dp--container-flex": c.items?.length <= 6,
			"dp--container-block": c.items?.length > 6
		}));
		z(() => c.items, () => W(!1), { deep: !0 });
		let W = (e = !0) => {
			_().then(() => {
				let t = document.querySelector(`[data-dp-element-active="${c.level ?? 1}"]`), n = te(T), r = te(g), i = te(y), a = r ? r.getBoundingClientRect().height : 0;
				n && (n.getBoundingClientRect().height ? N.value = n.getBoundingClientRect().height - a : N.value = f.value.modeHeight - a), t && i && e && (i.scrollTop = t.offsetTop - i.offsetTop - (N.value / 2 - t.getBoundingClientRect().height) - a);
			});
		}, ne = (e) => {
			e.disabled || i("selected", e.value);
		}, G = () => {
			i("toggle"), i("reset-flow");
		}, re = (e) => {
			f.value.escClose && (G(), m(e, f.value));
		}, ie = (e) => {
			j.value = e, i("hover-value", e);
		}, ae = (e) => {
			if (e.key === $.esc) return re(e);
		}, K = (e) => {
			if (e.key === $.enter) return G();
		};
		return (n, r) => (w(), o("div", {
			ref: "grid-wrap",
			class: v(P.value),
			style: b(I.value),
			role: t.useRelative ? void 0 : "dialog",
			"aria-label": t.overlayLabel,
			tabindex: t.useRelative ? void 0 : "0",
			onKeydown: ae,
			onClick: r[0] ||= U(() => {}, ["prevent"])
		}, [s("div", {
			ref: "overlay-container",
			class: v(ee.value),
			style: b({ "--dp-overlay-height": `${N.value}px` }),
			role: "grid"
		}, [s("div", pn, [A(n.$slots, "header")]), A(n.$slots, "overlay", {}, () => [(w(!0), o(e, null, k(t.items, (r, i) => (w(), o("div", {
			key: i,
			class: v(["dp--overlay-row", { "dp--flex-row": t.items.length >= 3 }]),
			role: "row"
		}, [(w(!0), o(e, null, k(r, (e) => (w(), o("div", {
			key: e.value,
			role: "gridcell",
			class: v(B.value),
			"aria-selected": e.active || void 0,
			"aria-disabled": e.disabled || void 0,
			"data-dp-action-element": t.level ?? 1,
			"data-dp-element-active": e.active ? t.level ?? 1 : void 0,
			tabindex: "0",
			"data-test-id": e.text,
			onClick: U((t) => ne(e), ["prevent"]),
			onKeydown: (t) => F(h)(t, () => ne(e), !0),
			onMouseover: (t) => ie(e.value)
		}, [s("div", { class: v(e.className) }, [A(n.$slots, "item", { item: e }, () => [l(M(e.text), 1)])], 2)], 42, mn))), 128))], 2))), 128))])], 6), n.$slots["button-icon"] ? V((w(), o("button", {
			key: 0,
			ref: "toggle-button",
			type: "button",
			"aria-label": F(d)?.toggleOverlay,
			class: v(H.value),
			tabindex: "0",
			"data-dp-action-element": t.level ?? 1,
			onClick: G,
			onKeydown: K
		}, [A(n.$slots, "button-icon")], 42, hn)), [[R, !F(p)(t.type)]]) : a("", !0)], 46, fn));
	}
}), _n = ["data-dp-mobile"], vn = /* @__PURE__ */ d({
	__name: "InstanceWrap",
	props: {
		stretch: { type: Boolean },
		collapse: { type: Boolean }
	},
	setup(e) {
		let { defaults: { multiCalendars: t } } = Q(), { isMobile: n } = Ut(), i = r(() => t.value.count > 0 ? [...Array.from({ length: t.value.count }).keys()] : [0]);
		return (r, a) => (w(), o("div", {
			class: v({
				"dp--menu-inner": !e.stretch,
				"dp--menu--inner-stretched": e.stretch,
				"dp--flex-display": F(t).count > 0,
				"dp--flex-display-collapsed": e.collapse
			}),
			"data-dp-mobile": F(n)
		}, [A(r.$slots, "default", {
			instances: i.value,
			wrapClass: { "dp--instance-calendar": F(t).count > 0 }
		})], 10, _n));
	}
}), yn = [
	"data-dp-element",
	"aria-label",
	"aria-disabled"
], bn = /* @__PURE__ */ d({
	__name: "ArrowBtn",
	props: {
		ariaLabel: {},
		elName: {},
		disabled: { type: Boolean }
	},
	emits: ["activate", "set-ref"],
	setup(e, { emit: t }) {
		let { checkKeyDown: n } = Vt(), r = t;
		return (t, i) => (w(), o("button", {
			ref: "arrow-btn",
			type: "button",
			"data-dp-element": e.elName,
			"data-dp-action-element": "0",
			class: "dp--btn-base dp--bg-none dp--arrow-btn-nav",
			tabindex: "0",
			"aria-label": e.ariaLabel,
			"aria-disabled": e.disabled || void 0,
			onClick: i[0] ||= (e) => r("activate"),
			onKeydown: i[1] ||= (e) => F(n)(e, () => r("activate"), !0)
		}, [s("span", { class: v(["dp--inner-nav", { "dp--inner-nav-disabled": e.disabled }]) }, [A(t.$slots, "default")], 2)], 40, yn));
	}
}), xn = ["aria-label", "data-test-id"], Sn = /* @__PURE__ */ d({
	__name: "YearModePicker",
	props: {
		items: {},
		instance: {},
		year: {},
		showYearPicker: {
			type: Boolean,
			default: !1
		},
		isDisabled: {}
	},
	emits: [
		"handle-year",
		"year-select",
		"toggle-year-picker"
	],
	setup(t, { emit: d }) {
		let f = d, p = t, { showRightIcon: m, showLeftIcon: h } = dn(), { rootProps: g, defaults: { config: _, ariaLabels: y, ui: b } } = Q(), { showTransition: x, transitionName: S } = lt(), { formatYear: C } = Wt(), { boolHtmlAttribute: T } = qt(), E = O(!1), D = r(() => C(p.year)), k = (e = !1, t) => {
			E.value = !E.value, f("toggle-year-picker", {
				flow: e,
				show: t
			});
		}, j = (e) => {
			E.value = !1, f("year-select", e);
		}, N = (e = !1) => {
			f("handle-year", e);
		};
		return (r, d) => (w(), o(e, null, [s("div", { class: v(["dp--year-mode-picker", { "dp--hidden-el": E.value }]) }, [
			F(h)(t.instance) ? (w(), i(bn, {
				key: 0,
				ref: "mpPrevIconRef",
				"aria-label": F(y)?.prevYear,
				disabled: F(T)(t.isDisabled(!1)),
				class: v(F(b)?.navBtnPrev),
				onActivate: d[0] ||= (e) => N(!1)
			}, {
				default: B(() => [r.$slots["arrow-left"] ? A(r.$slots, "arrow-left", { key: 0 }) : a("", !0), r.$slots["arrow-left"] ? a("", !0) : (w(), i(F(qe), { key: 1 }))]),
				_: 3
			}, 8, [
				"aria-label",
				"disabled",
				"class"
			])) : a("", !0),
			s("button", {
				ref: "mpYearButtonRef",
				class: "dp--btn-base dp--bg-none dp--month-year-select-base dp--year-select",
				type: "button",
				"aria-label": `${t.year}-${F(y)?.openYearsOverlay}`,
				"data-test-id": `year-mode-btn-${t.instance}`,
				"data-dp-action-element": "0",
				onClick: d[1] ||= () => k(!1),
				onKeydown: d[2] ||= H(U(() => k(!1), ["prevent"]), ["enter"])
			}, [r.$slots.year ? A(r.$slots, "year", {
				key: 0,
				text: D.value,
				value: t.year
			}) : a("", !0), r.$slots.year ? a("", !0) : (w(), o(e, { key: 1 }, [l(M(t.year), 1)], 64))], 40, xn),
			F(m)(t.instance) ? (w(), i(bn, {
				key: 1,
				ref: "mpNextIconRef",
				"aria-label": F(y)?.nextYear,
				disabled: F(T)(t.isDisabled(!0)),
				class: v(F(b)?.navBtnNext),
				onActivate: d[3] ||= (e) => N(!0)
			}, {
				default: B(() => [r.$slots["arrow-right"] ? A(r.$slots, "arrow-right", { key: 0 }) : a("", !0), r.$slots["arrow-right"] ? a("", !0) : (w(), i(F(Je), { key: 1 }))]),
				_: 3
			}, 8, [
				"aria-label",
				"disabled",
				"class"
			])) : a("", !0)
		], 2), u(n, {
			name: F(S)(t.showYearPicker),
			css: F(x)
		}, {
			default: B(() => [t.showYearPicker ? (w(), i(gn, {
				key: 0,
				items: t.items,
				config: F(_),
				"is-last": F(g).autoApply && !F(_).keepActionRow,
				"overlay-label": F(y)?.yearPicker?.(!0),
				type: "year",
				onToggle: k,
				onSelected: d[4] ||= (e) => j(e)
			}, c({
				"button-icon": B(() => [r.$slots["calendar-icon"] ? A(r.$slots, "calendar-icon", { key: 0 }) : a("", !0), r.$slots["calendar-icon"] ? a("", !0) : (w(), i(F(Ge), { key: 1 }))]),
				_: 2
			}, [r.$slots["year-overlay-value"] ? {
				name: "item",
				fn: B(({ item: e }) => [A(r.$slots, "year-overlay-value", {
					text: e.text,
					value: e.value
				})]),
				key: "0"
			} : void 0]), 1032, [
				"items",
				"config",
				"is-last",
				"overlay-label"
			])) : a("", !0)]),
			_: 3
		}, 8, ["name", "css"])], 64));
	}
}), Cn = (e) => {
	let { getDate: t, rootEmit: n, state: i, month: a, year: o, modelValue: s, calendars: c, rootProps: l, defaults: { multiCalendars: u, range: d, safeDates: f, filters: p, highlight: m } } = Q(), { resetDate: h, getYearFromDate: g, checkHighlightYear: _, groupListAndMap: v } = Ht(), { getYears: y } = Gt(), { validateMonthYear: b, checkMinMaxValue: x } = dt(), C = O([!1]), w = r(() => y()), T = r(() => (e, n) => {
		let r = Z(h(t()), {
			month: a.value(e),
			year: o.value(e)
		});
		return b(n ? me(r) : Re(r), l.preventMinMaxNavigation, n);
	}), E = () => Array.isArray(s.value) && u.value.solo && s.value[1], D = () => {
		for (let e = 0; e < u.value.count; e++) if (e === 0) c.value[e] = c.value[0];
		else if (e === u.value.count - 1 && E()) c.value[e] = {
			month: Y(s.value[1]),
			year: X(s.value[1])
		};
		else {
			let n = Z(t(), c.value[e - 1]);
			c.value[e] = {
				month: Y(n),
				year: X(se(n, 1))
			};
		}
	}, k = (e) => {
		if (!e) return D();
		let n = Z(t(), c.value[e]);
		return c.value[0].year = X(He(n, u.value.count - 1)), D();
	}, A = (e, t) => {
		let n = le(t, e);
		return d.value.showLastInRange && n > 1 ? t : e;
	}, j = (e) => l.focusStartDate || u.value.solo ? e[0] : e[1] ? A(e[0], e[1]) : e[0], M = () => {
		if (s.value) {
			let e = Array.isArray(s.value) ? j(s.value) : s.value;
			c.value[0] = {
				month: Y(e),
				year: X(e)
			};
		}
	}, N = () => {
		M(), u.value.count && D();
	};
	z(s, (e, t) => {
		i.isTextInputDate && JSON.stringify(e ?? {}) !== JSON.stringify(t ?? {}) && N();
	}), S(() => {
		N();
	});
	let P = (e, t) => {
		c.value[t].year = e, n("update-month-year", {
			instance: t,
			year: e,
			month: c.value[t].month
		}), u.value.count && !u.value.solo && k(t);
	}, F = r(() => (e) => v(w.value, (t) => ({
		active: o.value(e) === t.value,
		disabled: x(t.value, g(f.value.minDate), g(f.value.maxDate)) || p.value.years?.includes(t.value),
		highlighted: _(m.value, t.value)
	}))), I = (e, t) => {
		P(e, t), R(t);
	}, L = (e, t = !1) => {
		T.value(e, t) || P(t ? o.value(e) + 1 : o.value(e) - 1, e);
	}, R = (t, r = !1, i) => {
		r || e("reset-flow"), i === void 0 ? C.value[t] = !C.value[t] : C.value[t] = i, C.value[t] ? n("overlay-toggle", {
			open: !0,
			overlay: nt.year
		}) : n("overlay-toggle", {
			open: !1,
			overlay: nt.year
		});
	};
	return {
		isDisabled: T,
		groupedYears: F,
		showYearPicker: C,
		selectYear: P,
		setStartDate: () => {
			l.startDate && (s.value && l.focusStartDate || !s.value) && P(X(t(l.startDate)), 0);
		},
		toggleYearPicker: R,
		handleYearSelect: I,
		handleYear: L
	};
}, wn = () => {
	let { isDateAfter: e, isDateBefore: t, isDateEqual: n } = Ht(), { getDate: r, rootEmit: i, rootProps: a, modelValue: o, defaults: { range: s } } = Q();
	return {
		getRangeWithFixedDate: (r) => Array.isArray(o.value) && (o.value.length === 2 || o.value.length === 1 && s.value.partialRange) ? s.value.fixedStart && (e(r, o.value[0]) || n(r, o.value[0])) ? [o.value[0], r] : s.value.fixedEnd && (t(r, o.value[1]) || n(r, o.value[1])) ? [r, o.value[1]] : (i("invalid-fixed-range", r), o.value) : [],
		setPresetDate: (e) => {
			Array.isArray(e.value) && e.value.length <= 2 && s.value.enabled ? o.value = e.value.map((e) => r(e)) : Array.isArray(e.value) || (o.value = r(e.value));
		},
		checkRangeAutoApply: (e, t, n) => {
			s && (e[0] && e[1] && a.autoApply && t("auto-apply", n), e[0] && !e[1] && (a.modelAuto || s.value.partialRange) && a.autoApply && t("auto-apply", n));
		},
		setMonthOrYearRange: (e) => {
			let n = o.value ? o.value.slice() : [];
			return n.length === 2 && n[1] !== null && (n = []), n.length ? (t(e, n[0]) ? n.unshift(e) : n[1] = e, i("range-end", e)) : (n = [e], i("range-start", e)), n;
		},
		handleMultiDatesSelect: (e, t) => {
			if (o.value && Array.isArray(o.value)) if (o.value.some((t) => n(e, t))) {
				let t = o.value.filter((t) => !n(t, e));
				o.value = t.length ? t : null;
			} else (t && +t > o.value.length || !t) && o.value.push(e);
			else o.value = [e];
		}
	};
}, Tn = (e, t) => {
	let { getDate: n, rootEmit: i, state: a, calendars: o, year: s, modelValue: c, rootProps: l, defaults: { range: u, highlight: d, safeDates: f, filters: p, multiDates: m } } = Q();
	ut(() => {
		a.isTextInputDate && L(X(n(l.startDate)), 0);
	});
	let { checkMinMaxRange: h, checkMinMaxValue: g } = dt(), { isDateBetween: v, resetDateTime: y, resetDate: b, getMinMonth: x, getMaxMonth: C, checkHighlightMonth: w, groupListAndMap: T } = Ht(), { checkRangeAutoApply: E, getRangeWithFixedDate: D, handleMultiDatesSelect: k, setMonthOrYearRange: A, setPresetDate: j } = wn(), { padZero: M } = Vt(), { getMonths: N, isOutOfYearRange: P } = Gt(), F = r(() => N()), I = O(null), { selectYear: L, groupedYears: R, showYearPicker: z, toggleYearPicker: B, handleYearSelect: V, handleYear: H, isDisabled: U, setStartDate: ee } = Cn(t);
	S(() => {
		ee();
	});
	let te = (e) => e ? {
		month: Y(e),
		year: X(e)
	} : {
		month: null,
		year: null
	}, W = () => c.value ? Array.isArray(c.value) ? c.value.map((e) => te(e)) : te(c.value) : te(), ne = (e, t) => {
		let n = o.value[e], r = W();
		return Array.isArray(r) ? r.some((e) => e.year === n?.year && e.month === t) : n?.year === r.year && t === r.month;
	}, G = (e, t, n) => {
		let r = W();
		return Array.isArray(r) ? s.value(t) === r[n]?.year && e === r[n]?.month : !1;
	}, re = (e, t) => {
		if (u.value.enabled) {
			let r = W();
			if (Array.isArray(c.value) && Array.isArray(r)) {
				let r = G(e, t, 0) || G(e, t, 1), i = Z(b(n()), {
					month: e,
					year: s.value(t)
				});
				return v(c.value, I.value, i) && !r;
			}
			return !1;
		}
		return !1;
	}, ie = r(() => (e) => T(F.value, (t) => ({
		active: ne(e, t.value),
		disabled: g(t.value, x(s.value(e), f.value.minDate), C(s.value(e), f.value.maxDate)) || de(f.value.disabledDates, s.value(e), t.value) || p.value.months?.includes(t.value) || !fe(f.value.allowedDates, s.value(e), t.value) || P(s.value(e)),
		isBetween: re(t.value, e),
		highlighted: w(d.value, t.value, s.value(e))
	}))), ae = (e, t) => Z(b(n()), {
		month: e,
		year: s.value(t)
	}), K = (e, r) => {
		c.value = Z(c.value ? c.value : b(n()), {
			month: e,
			year: s.value(r)
		}), t("auto-apply"), t("update-flow-step");
	}, oe = (e, n) => {
		let r = ae(e, n);
		u.value.fixedEnd || u.value.fixedStart ? c.value = D(r) : c.value ? h(r, c.value) && (c.value = A(ae(e, n))) : c.value = [ae(e, n)], _().then(() => {
			E(c.value, t, c.value.length < 2);
		});
	}, q = (e, n) => {
		k(ae(e, n), m.value.limit), t("auto-apply", !0);
	}, J = (e, t) => (o.value[t].month = e, ce(t, o.value[t].year, e), m.value.enabled ? q(e, t) : u.value.enabled ? oe(e, t) : K(e, t)), se = (e, t) => {
		L(e, t), ce(t, e, null);
	}, ce = (e, t, n) => {
		let r = n;
		if (!r && r !== 0) {
			let t = W();
			r = Array.isArray(t) ? t[e].month : t.month;
		}
		i("update-month-year", {
			instance: e,
			year: t,
			month: r
		});
	}, le = (e, t) => {
		I.value = ae(e, t);
	}, ue = (e) => {
		j({ value: e }), t("auto-apply");
	}, de = (e, t, r) => {
		if (e instanceof Map) {
			let n = `${M(r + 1)}-${t}`;
			return e.size ? e.has(n) : !1;
		}
		return typeof e == "function" ? e(y(Z(n(), {
			month: r,
			year: t
		}), !0)) : !1;
	}, fe = (e, t, n) => {
		if (e instanceof Map) {
			let r = `${M(n + 1)}-${t}`;
			return e.size ? e.has(r) : !0;
		}
		return !0;
	};
	return {
		groupedMonths: ie,
		groupedYears: R,
		year: s,
		isDisabled: U,
		showYearPicker: z,
		modelValue: c,
		toggleYearPicker: B,
		handleYearSelect: V,
		handleYear: H,
		presetDate: ue,
		setHoverDate: le,
		selectMonth: J,
		selectYear: se,
		getModelMonthYear: W
	};
}, En = /* @__PURE__ */ d({
	__name: "MonthPicker",
	props: {
		flowStep: {},
		collapse: { type: Boolean },
		menuWrapRef: {},
		noOverlayFocus: { type: Boolean }
	},
	emits: [
		"reset-flow",
		"auto-apply",
		"update-flow-step",
		"mount"
	],
	setup(t, { expose: n, emit: r }) {
		let s = r, l = t, d = I(), { rootProps: f, defaults: { config: p } } = Q(), m = Qt(d, Yt.YearMode);
		S(() => {
			s("mount");
		});
		let { groupedMonths: h, groupedYears: _, year: y, isDisabled: b, showYearPicker: x, modelValue: C, presetDate: T, setHoverDate: E, selectMonth: D, selectYear: O, toggleYearPicker: j, handleYearSelect: M, handleYear: N, getModelMonthYear: P } = Tn(l, s);
		return n({
			getSidebarProps: () => ({
				modelValue: C,
				year: y,
				getModelMonthYear: P,
				selectMonth: D,
				selectYear: O,
				handleYear: N
			}),
			presetDate: T,
			toggleYearPicker: (e) => j(0, e)
		}), (n, r) => (w(), i(vn, {
			collapse: t.collapse,
			stretch: ""
		}, {
			default: B(({ instances: r, wrapClass: i }) => [(w(!0), o(e, null, k(r, (e) => (w(), o("div", {
				key: e,
				class: v(i)
			}, [n.$slots["top-extra"] ? A(n.$slots, "top-extra", {
				key: 0,
				value: F(C)
			}) : a("", !0), A(n.$slots, "month-year", g({ ref_for: !0 }, {
				mode: "month",
				year: F(y),
				months: F(h)(e),
				years: F(_)(e),
				selectMonth: F(D),
				selectYear: F(O),
				instance: e
			}), () => [u(gn, {
				items: F(h)(e),
				"is-last": F(f).autoApply && !F(p).keepActionRow,
				height: F(p).modeHeight,
				"no-overlay-focus": !!(t.noOverlayFocus || F(f).textInput),
				"use-relative": "",
				level: 0,
				type: "month",
				onSelected: (t) => F(D)(t, e),
				onHoverValue: (t) => F(E)(t, e)
			}, c({
				header: B(() => [u(Sn, {
					items: F(_)(e),
					instance: e,
					"show-year-picker": F(x)[e],
					year: F(y)(e),
					"is-disabled": (t) => F(b)(e, t),
					onHandleYear: (t) => F(N)(e, t),
					onYearSelect: (t) => F(M)(t, e),
					onToggleYearPicker: (t) => F(j)(e, t?.flow, t?.show)
				}, c({ _: 2 }, [k(F(m), (e, t) => ({
					name: e,
					fn: B((t) => [A(n.$slots, e, g({ ref_for: !0 }, t))])
				}))]), 1032, [
					"items",
					"instance",
					"show-year-picker",
					"year",
					"is-disabled",
					"onHandleYear",
					"onYearSelect",
					"onToggleYearPicker"
				])]),
				_: 2
			}, [n.$slots["month-overlay-value"] ? {
				name: "item",
				fn: B(({ item: e }) => [A(n.$slots, "month-overlay-value", {
					text: e.text,
					value: e.value
				})]),
				key: "0"
			} : void 0]), 1032, [
				"items",
				"is-last",
				"height",
				"no-overlay-focus",
				"onSelected",
				"onHoverValue"
			])])], 2))), 128))]),
			_: 3
		}, 8, ["collapse"]));
	}
}), Dn = (e, t) => {
	let { rootEmit: n, getDate: i, state: a, modelValue: o, rootProps: s, defaults: { highlight: c, multiDates: l, filters: u, range: d, safeDates: f } } = Q(), { getYears: p } = Gt(), { isDateBetween: m, resetDate: h, resetDateTime: g, getYearFromDate: v, checkHighlightYear: y, groupListAndMap: b } = Ht(), { checkRangeAutoApply: x, setMonthOrYearRange: C } = wn(), { checkMinMaxValue: w, checkMinMaxRange: T } = dt();
	ut(() => {
		a.isTextInputDate && (D.value = X(i(s.startDate)));
	});
	let E = O(null), D = O();
	S(() => {
		s.startDate && (o.value && s.focusStartDate || !o.value) && (D.value = X(i(s.startDate)));
	});
	let k = (e) => Array.isArray(o.value) ? o.value.some((t) => X(t) === e) : o.value ? X(o.value) === e : !1, A = (e) => d.value.enabled && Array.isArray(o.value) ? m(o.value, E.value, P(e)) : !1, j = (e) => f.value.allowedDates?.size ? f.value.allowedDates.has(`${e}`) : !0, M = (e) => f.value.disabledDates instanceof Map ? f.value.disabledDates.size ? f.value.disabledDates.has(`${e}`) : !1 : typeof f.value.disabledDates == "function" ? f.value.disabledDates(Pe(g(Re(i())), e)) : !0, N = r(() => b(p(), (e) => {
		let t = k(e.value);
		return {
			active: t,
			disabled: w(e.value, v(f.value.minDate), v(f.value.maxDate)) || u.value.years.includes(e.value) || !j(e.value) || M(e.value),
			isBetween: A(e.value) && !t,
			highlighted: y(c.value, e.value)
		};
	})), P = (e) => Pe(h(Re(i())), e);
	return {
		groupedYears: N,
		focusYear: D,
		setHoverValue: (e) => {
			E.value = Pe(h(i()), e);
		},
		selectYear: (e) => {
			if (n("update-month-year", {
				instance: 0,
				year: e,
				month: NaN
			}), l.value.enabled) return o.value ? Array.isArray(o.value) && ((o.value?.map((e) => X(e))).includes(e) ? o.value = o.value.filter((t) => X(t) !== e) : o.value.push(Pe(g(i()), e))) : o.value = [Pe(g(Re(i())), e)], t("auto-apply", !0);
			d.value.enabled ? T(P(e), o.value) && (o.value = C(P(e)), _().then(() => {
				x(o.value, t, o.value.length < 2);
			})) : (o.value = P(e), t("auto-apply"));
		}
	};
}, On = /* @__PURE__ */ d({
	__name: "YearPicker",
	props: {
		flowStep: {},
		collapse: { type: Boolean },
		menuWrapRef: {},
		noOverlayFocus: { type: Boolean }
	},
	emits: ["reset-flow", "auto-apply"],
	setup(e, { expose: t, emit: n }) {
		let r = n, s = e, { modelValue: l, defaults: { config: u }, rootProps: d } = Q(), { groupedYears: f, focusYear: p, selectYear: m, setHoverValue: h } = Dn(s, r);
		return t({ getSidebarProps: () => ({
			modelValue: l,
			selectYear: m
		}) }), (t, n) => (w(), o("div", null, [t.$slots["top-extra"] ? A(t.$slots, "top-extra", {
			key: 0,
			value: F(l)
		}) : a("", !0), t.$slots["month-year"] ? A(t.$slots, "month-year", y(g({ key: 1 }, {
			mode: "year",
			years: F(f),
			selectYear: F(m)
		}))) : (w(), i(gn, {
			key: 2,
			items: F(f),
			"is-last": F(d).autoApply && !F(u).keepActionRow,
			height: F(u).modeHeight,
			"no-overlay-focus": !!(e.noOverlayFocus || F(d).textInput),
			"focus-value": F(p),
			type: "year",
			"use-relative": "",
			onSelected: F(m),
			onHoverValue: F(h)
		}, c({ _: 2 }, [t.$slots["year-overlay-value"] ? {
			name: "item",
			fn: B(({ item: e }) => [A(t.$slots, "year-overlay-value", {
				text: e.text,
				value: e.value
			})]),
			key: "0"
		} : void 0]), 1032, [
			"items",
			"is-last",
			"height",
			"no-overlay-focus",
			"focus-value",
			"onSelected",
			"onHoverValue"
		]))]));
	}
}), kn = {
	key: 0,
	class: "dp--time-input"
}, An = ["data-compact", "data-collapsed"], jn = [
	"data-test-id",
	"aria-label",
	"data-dp-action-element",
	"onKeydown",
	"onClick",
	"onMousedown"
], Mn = [
	"aria-label",
	"disabled",
	"data-dp-action-element",
	"data-test-id",
	"onKeydown",
	"onClick"
], Nn = [
	"data-test-id",
	"aria-label",
	"data-dp-action-element",
	"onKeydown",
	"onClick",
	"onMousedown"
], Pn = { key: 0 }, Fn = [
	"aria-label",
	"data-dp-action-element",
	"data-compact"
], In = /* @__PURE__ */ d({
	__name: "TimeInput",
	props: {
		hours: {},
		minutes: {},
		seconds: {},
		order: {},
		closeTimePickerBtn: {},
		disabledTimesConfig: {},
		validateTime: {}
	},
	emits: [
		"update:hours",
		"update:minutes",
		"update:seconds",
		"overlay-opened",
		"overlay-closed",
		"set-hours",
		"set-minutes",
		"reset-flow",
		"mounted"
	],
	setup(t, { expose: d, emit: f }) {
		let p = f, m = t, { getDate: h, rootEmit: g, rootProps: _, defaults: { ariaLabels: y, filters: b, config: x, range: C, multiCalendars: T, timeConfig: D } } = Q(), { checkKeyDown: N, hoursToAmPmHours: P } = Vt(), { boolHtmlAttribute: I } = qt(), { sanitizeTime: L, groupListAndMap: R } = Ht(), { transitionName: z, showTransition: V } = lt(), H = E({
			hours: !1,
			minutes: !1,
			seconds: !1
		}), U = O("AM"), ee = O(null), te = O(), W = O(!1);
		S(() => {
			p("mounted");
		});
		let ne = (e) => Z(h(), {
			hours: e.hours,
			minutes: e.minutes,
			seconds: D.value.enableSeconds ? e.seconds : 0,
			milliseconds: 0
		}), G = r(() => _.timePicker || D.value.timePickerInline ? 0 : 1), re = r(() => (e) => me(e, m[e]) || ae(e, m[e])), ie = r(() => ({
			hours: m.hours,
			minutes: m.minutes,
			seconds: m.seconds
		})), ae = (e, t) => C.value.enabled && !C.value.disableTimeRangeValidation ? !m.validateTime(e, t) : !1, K = (e, t) => {
			if (C.value.enabled && !C.value.disableTimeRangeValidation) {
				let n = t ? +D.value[`${e}Increment`] : -+D.value[`${e}Increment`], r = m[e] + n;
				return !m.validateTime(e, r);
			}
			return !1;
		}, q = r(() => (e) => !be(+m[e] + +D.value[`${e}Increment`], e) || K(e, !0)), J = r(() => (e) => !be(m[e] - +D.value[`${e}Increment`], e) || K(e, !1)), se = (e, t) => oe(Z(h(), e), t), ce = (e, t) => ze(Z(h(), e), t), le = r(() => ({
			"dp--time-col": !0,
			"dp--time-col-block": !D.value.timePickerInline,
			"dp--time-col-reg-block": !D.value.enableSeconds && D.value.is24 && !D.value.timePickerInline,
			"dp--time-col-reg-inline": !D.value.enableSeconds && D.value.is24 && D.value.timePickerInline,
			"dp--time-col-reg-with-button": !D.value.enableSeconds && !D.value.is24,
			"dp--time-col-sec": D.value.enableSeconds && D.value.is24,
			"dp--time-col-sec-with-button": D.value.enableSeconds && !D.value.is24
		})), ue = r(() => D.value.timePickerInline && C.value.enabled && !T.value.count), de = r(() => {
			let e = [{ type: "hours" }];
			return D.value.enableMinutes && e.push({
				type: "",
				separator: !0
			}, { type: "minutes" }), D.value.enableSeconds && e.push({
				type: "",
				separator: !0
			}, { type: "seconds" }), e;
		}), fe = r(() => de.value.filter((e) => !e.separator)), pe = r(() => (e) => {
			if (e === "hours") {
				let e = ke(+m.hours);
				return {
					text: e < 10 ? `0${e}` : `${e}`,
					value: e
				};
			}
			return {
				text: m[e] < 10 ? `0${m[e]}` : `${m[e]}`,
				value: m[e]
			};
		}), me = (e, t) => {
			if (!m.disabledTimesConfig) return !1;
			let n = m.disabledTimesConfig(m.order, e === "hours" ? t : void 0);
			return n[e] ? !!n[e]?.includes(t) : !0;
		}, he = (e, t) => t === "hours" ? U.value === "AM" ? e : e + 12 : e, ge = (e) => {
			let t = D.value.is24 ? 24 : 12, n = e === "hours" ? t : 60, r = +D.value[`${e}GridIncrement`], i = e === "hours" && !D.value.is24 ? r : 0, a = [];
			for (let t = i; t < n; t += r) a.push({
				value: D.value.is24 ? t : he(t, e),
				text: t < 10 ? `0${t}` : `${t}`
			});
			return e === "hours" && !D.value.is24 && a.unshift({
				value: U.value === "PM" ? 12 : 0,
				text: "12"
			}), R(a, (t) => ({
				active: !1,
				disabled: b.value.times[e].includes(t.value) || !be(t.value, e) || me(e, t.value) || ae(e, t.value)
			}));
		}, ve = (e) => e >= 0 ? e : 59, Y = (e) => e >= 0 ? e : 23, be = (e, t) => {
			let n = _.minTime ? ne(L(_.minTime)) : null, r = _.maxTime ? ne(L(_.maxTime)) : null, i = ne(L(ie.value, t, t === "minutes" || t === "seconds" ? ve(e) : Y(e)));
			return n && r ? (we(i, r) || Ee(i, r)) && (Ce(i, n) || Ee(i, n)) : n ? Ce(i, n) || Ee(i, n) : r ? we(i, r) || Ee(i, r) : !0;
		}, Se = (e) => D.value[`no${e[0].toUpperCase() + e.slice(1)}Overlay`], X = (e) => {
			Se(e) || (H[e] = !H[e], H[e] ? (W.value = !0, p("overlay-opened", e)) : (W.value = !1, p("overlay-closed", e)));
		}, Te = (e) => e === "hours" ? _e : e === "minutes" ? ye : xe, De = () => {
			te.value && clearTimeout(te.value);
		}, Oe = (e, t = !0, n) => {
			let r = t ? se : ce, i = t ? +D.value[`${e}Increment`] : -+D.value[`${e}Increment`];
			be(+m[e] + i, e) && p(`update:${e}`, Te(e)(r({ [e]: +m[e] }, { [e]: +D.value[`${e}Increment`] }))), !n?.keyboard && x.value.timeArrowHoldThreshold && (te.value = setTimeout(() => {
				Oe(e, t);
			}, x.value.timeArrowHoldThreshold));
		}, ke = (e) => D.value.is24 ? e : (e >= 12 ? U.value = "PM" : U.value = "AM", P(e)), Ae = () => {
			U.value === "PM" ? (U.value = "AM", p("update:hours", m.hours - 12)) : (U.value = "PM", p("update:hours", m.hours + 12)), g("am-pm-change", U.value);
		}, je = (e) => {
			H[e] = !0;
		}, Me = (e, t) => (X(e), p(`update:${e}`, t));
		return d({ openChildCmp: je }), (t, r) => F(_).disabled ? a("", !0) : (w(), o("div", kn, [
			(w(!0), o(e, null, k(de.value, (n, i) => (w(), o("div", {
				key: i,
				class: v(le.value),
				"data-compact": ue.value && !F(D).enableSeconds,
				"data-collapsed": ue.value && F(D).enableSeconds
			}, [n.separator ? (w(), o(e, { key: 0 }, [W.value ? a("", !0) : (w(), o(e, { key: 0 }, [l(":")], 64))], 64)) : (w(), o(e, { key: 1 }, [
				s("button", {
					type: "button",
					class: v({
						"dp--btn-base dp--bg-none": !0,
						"dp--inc-dec-button": !F(D).timePickerInline,
						"dp--inc-dec-button-inline": F(D).timePickerInline,
						"dp--tp-inline-btn-top": F(D).timePickerInline,
						"dp--inc-dec-button-disabled": q.value(n.type),
						"dp--hidden-el": W.value
					}),
					"data-test-id": `${n.type}-time-inc-btn-${m.order}`,
					"aria-label": F(y)?.incrementValue(n.type),
					tabindex: "0",
					"data-dp-action-element": G.value,
					onKeydown: (e) => F(N)(e, () => Oe(n.type, !0, { keyboard: !0 }), !0),
					onClick: (e) => F(x).timeArrowHoldThreshold ? void 0 : Oe(n.type, !0),
					onMousedown: (e) => F(x).timeArrowHoldThreshold ? Oe(n.type, !0) : void 0,
					onMouseup: De
				}, [F(D).timePickerInline ? A(t.$slots, "tp-inline-arrow-up", { key: 1 }, () => [r[2] ||= s("span", { class: "dp--tp-inline-btn-bar dp--tp-btn-in-l" }, null, -1), r[3] ||= s("span", { class: "dp--tp-inline-btn-bar dp--tp-btn-in-r" }, null, -1)]) : A(t.$slots, "arrow-up", { key: 0 }, () => [u(F(Xe))])], 42, jn),
				s("button", {
					type: "button",
					"aria-label": `${pe.value(n.type).text}-${F(y)?.openTpOverlay(n.type)}`,
					class: v({
						"dp--time-display": !0,
						"dp--time-display-block": !F(D).timePickerInline,
						"dp--time-display-inline": F(D).timePickerInline,
						"dp--btn-base dp--time-invalid": re.value(n.type),
						"dp--btn-base dp--time-overlay-btn": !re.value(n.type),
						"dp--hidden-el": W.value
					}),
					disabled: F(I)(Se(n.type)),
					tabindex: "0",
					"data-dp-action-element": G.value,
					"data-test-id": `${n.type}-toggle-overlay-btn-${m.order}`,
					onKeydown: (e) => F(N)(e, () => X(n.type), !0),
					onClick: (e) => X(n.type)
				}, [A(t.$slots, n.type, {
					text: pe.value(n.type).text,
					value: pe.value(n.type).value
				}, () => [l(M(pe.value(n.type).text), 1)])], 42, Mn),
				s("button", {
					type: "button",
					class: v({
						"dp--btn-base dp--bg-none": !0,
						"dp--inc-dec-button": !F(D).timePickerInline,
						"dp--inc-dec-button-inline": F(D).timePickerInline,
						"dp--tp-inline-btn-bottom": F(D).timePickerInline,
						"dp--inc-dec-button-disabled": J.value(n.type),
						"dp--hidden-el": W.value
					}),
					"data-test-id": `${n.type}-time-dec-btn-${m.order}`,
					"aria-label": F(y)?.decrementValue(n.type),
					tabindex: "0",
					"data-dp-action-element": G.value,
					onKeydown: (e) => F(N)(e, () => Oe(n.type, !1, { keyboard: !0 }), !0),
					onClick: (e) => F(x).timeArrowHoldThreshold ? void 0 : Oe(n.type, !1),
					onMousedown: (e) => F(x).timeArrowHoldThreshold ? Oe(n.type, !1) : void 0,
					onMouseup: De
				}, [F(D).timePickerInline ? A(t.$slots, "tp-inline-arrow-down", { key: 1 }, () => [r[4] ||= s("span", { class: "dp--tp-inline-btn-bar dp--tp-btn-in-l" }, null, -1), r[5] ||= s("span", { class: "dp--tp-inline-btn-bar dp--tp-btn-in-r" }, null, -1)]) : A(t.$slots, "arrow-down", { key: 0 }, () => [u(F(Ze))])], 42, Nn)
			], 64))], 10, An))), 128)),
			F(D).is24 ? a("", !0) : (w(), o("div", Pn, [A(t.$slots, "am-pm-button", {
				toggle: Ae,
				value: U.value
			}, () => [s("button", {
				ref_key: "amPmButton",
				ref: ee,
				type: "button",
				class: "dp--pm-am-button",
				role: "button",
				"aria-label": F(y)?.amPmButton,
				tabindex: "0",
				"data-dp-action-element": G.value,
				"data-compact": ue.value,
				onClick: Ae,
				onKeydown: r[0] ||= (e) => F(N)(e, () => Ae(), !0)
			}, M(U.value), 41, Fn)])])),
			(w(!0), o(e, null, k(fe.value, (e, o) => (w(), i(n, {
				key: o,
				name: F(z)(H[e.type]),
				css: F(V)
			}, {
				default: B(() => [H[e.type] ? (w(), i(gn, {
					key: 0,
					items: ge(e.type),
					"is-last": F(_).autoApply && !F(x).keepActionRow,
					type: e.type,
					"aria-labels": F(y),
					level: F(D).timePickerInline || F(_).timePicker ? 1 : 2,
					"overlay-label": F(y).timeOverlay?.(e.type),
					onSelected: (t) => Me(e.type, t),
					onToggle: (t) => X(e.type),
					onResetFlow: r[1] ||= (e) => t.$emit("reset-flow")
				}, c({
					"button-icon": B(() => [A(t.$slots, "clock-icon", {}, () => [t.$slots["clock-icon"] ? a("", !0) : (w(), i(j(F(D).timePickerInline ? F(Ge) : F(Ye)), { key: 0 }))])]),
					_: 2
				}, [t.$slots[`${e.type}-overlay-value`] ? {
					name: "item",
					fn: B(({ item: n }) => [A(t.$slots, `${e.type}-overlay-value`, {
						text: n.text,
						value: n.value
					})]),
					key: "0"
				} : void 0, t.$slots[`${e.type}-overlay-header`] ? {
					name: "header",
					fn: B(() => [A(t.$slots, `${e.type}-overlay-header`, { toggle: () => X(e.type) })]),
					key: "1"
				} : void 0]), 1032, [
					"items",
					"is-last",
					"type",
					"aria-labels",
					"level",
					"overlay-label",
					"onSelected",
					"onToggle"
				])) : a("", !0)]),
				_: 2
			}, 1032, ["name", "css"]))), 128))
		]));
	}
}), Ln = ["data-dp-mobile"], Rn = ["aria-label", "tabindex"], zn = [
	"role",
	"aria-label",
	"tabindex"
], Bn = ["aria-label"], Vn = /* @__PURE__ */ d({
	__name: "TimePicker",
	props: {
		hours: {},
		minutes: {},
		seconds: {},
		disabledTimesConfig: { type: [Function, null] },
		noOverlayFocus: { type: Boolean },
		validateTime: { type: Function }
	},
	emits: [
		"update:hours",
		"update:minutes",
		"update:seconds",
		"mount",
		"reset-flow"
	],
	setup(t, { expose: l, emit: d }) {
		let f = d, p = t, { rootEmit: m, setState: h, modelValue: y, rootProps: x, defaults: { ariaLabels: C, textInput: T, config: E, range: D, timeConfig: j } } = Q(), { isModelAuto: M } = Ht(), { checkKeyDown: N, findFocusableEl: P } = Vt(), { transitionName: z, showTransition: H } = lt(), { hideNavigationButtons: U } = dn(), { isMobile: ee } = Ut(), te = I(), W = L("overlay"), ne = L("close-tp-btn"), G = L("tp-input"), re = O(!1);
		S(() => {
			f("mount");
		});
		let ie = r(() => D.value.enabled && x.modelAuto ? M(y.value) : !0), ae = O(!1), K = (e) => ({
			hours: Array.isArray(p.hours) ? p.hours[e] : p.hours,
			minutes: Array.isArray(p.minutes) ? p.minutes[e] : p.minutes,
			seconds: Array.isArray(p.seconds) ? p.seconds[e] : p.seconds
		}), oe = r(() => {
			let e = [];
			if (D.value.enabled) for (let t = 0; t < 2; t++) e.push(K(t));
			else e.push(K(0));
			return e;
		}), q = (e, t = !1, n = "") => {
			t || f("reset-flow"), ae.value = e, h("arrowNavigationLevel", +!!e), m("overlay-toggle", {
				open: e,
				overlay: nt.time
			}), _().then(() => {
				n !== "" && G.value?.[0] && G.value[0].openChildCmp(n);
			});
		}, J = r(() => ({
			"dp--btn-base dp--bg-none": !0,
			"dp--button": !0,
			"dp--button-bottom": x.autoApply && !E.value.keepActionRow
		})), se = Qt(te, Yt.TimeInput), ce = (e, t, n) => D.value.enabled ? t === 0 ? [e, oe.value[1][n]] : [oe.value[0][n], e] : e, le = (e) => {
			f("update:hours", e);
		}, ue = (e) => {
			f("update:minutes", e);
		}, de = (e) => {
			f("update:seconds", e);
		}, fe = () => {
			if (W.value && !T.value.enabled && !p.noOverlayFocus) {
				let e = P(W.value);
				e && e.focus({ preventScroll: !0 });
			}
		}, pe = (e) => {
			re.value = !1, m("overlay-toggle", {
				open: !1,
				overlay: e
			});
		}, me = (e) => {
			re.value = !0, m("overlay-toggle", {
				open: !0,
				overlay: e
			});
		};
		return l({ toggleTimePicker: q }), (r, l) => (w(), o("div", {
			class: "dp--tp-wrap",
			"data-dp-mobile": F(ee)
		}, [!F(x).timePicker && !F(j).timePickerInline ? V((w(), o("button", {
			key: 0,
			ref: "open-tp-btn",
			type: "button",
			"data-dp-action-element": "0",
			class: v({
				...J.value,
				"dp--hidden-el": ae.value
			}),
			"aria-label": F(C)?.openTimePicker,
			tabindex: t.noOverlayFocus ? void 0 : 0,
			"data-test-id": "open-time-picker-btn",
			onKeydown: l[0] ||= (e) => F(N)(e, () => q(!0)),
			onClick: l[1] ||= (e) => q(!0)
		}, [A(r.$slots, "clock-icon", {}, () => [u(F(Ye))])], 42, Rn)), [[R, !F(U)("time")]]) : a("", !0), u(n, {
			name: F(z)(ae.value),
			css: F(H) && !F(j).timePickerInline
		}, {
			default: B(() => [ae.value || F(x).timePicker || F(j).timePickerInline ? (w(), o("div", {
				key: 0,
				ref: "overlay",
				role: F(j).timePickerInline ? void 0 : "dialog",
				class: v({
					"dp--overlay": !F(j).timePickerInline,
					"dp--overlay-absolute": !F(x).timePicker && !F(j).timePickerInline,
					"dp--overlay-relative": F(x).timePicker
				}),
				style: b(F(x).timePicker ? { height: `${F(E).modeHeight}px` } : void 0),
				"aria-label": F(C)?.timePicker,
				tabindex: F(j).timePickerInline ? void 0 : 0
			}, [s("div", {
				class: v(F(j).timePickerInline ? "dp--time-picker-inline-container" : "dp--overlay-container dp--container-flex dp--time-picker-overlay-container"),
				style: { display: "flex" }
			}, [A(r.$slots, "time-picker-overlay", {
				hours: t.hours,
				minutes: t.minutes,
				seconds: t.seconds,
				setHours: le,
				setMinutes: ue,
				setSeconds: de
			}, () => [s("div", { class: v(F(j).timePickerInline ? "dp--flex" : "dp--overlay-row dp--flex-row") }, [(w(!0), o(e, null, k(oe.value, (e, n) => V((w(), i(In, g({ key: n }, { ref_for: !0 }, {
				order: n,
				hours: e.hours,
				minutes: e.minutes,
				seconds: e.seconds,
				closeTimePickerBtn: ne.value,
				disabledTimesConfig: t.disabledTimesConfig,
				disabled: n === 0 ? F(D).fixedStart : F(D).fixedEnd
			}, {
				ref_for: !0,
				ref: "tp-input",
				"validate-time": (e, r) => t.validateTime(e, ce(r, n, e)),
				"onUpdate:hours": (e) => le(ce(e, n, "hours")),
				"onUpdate:minutes": (e) => ue(ce(e, n, "minutes")),
				"onUpdate:seconds": (e) => de(ce(e, n, "seconds")),
				onMounted: fe,
				onOverlayClosed: pe,
				onOverlayOpened: me
			}), c({ _: 2 }, [k(F(se), (e, t) => ({
				name: e,
				fn: B((t) => [A(r.$slots, e, g({ ref_for: !0 }, t))])
			}))]), 1040, [
				"validate-time",
				"onUpdate:hours",
				"onUpdate:minutes",
				"onUpdate:seconds"
			])), [[R, n === 0 ? !0 : ie.value]])), 128))], 2)]), !F(x).timePicker && !F(j).timePickerInline ? V((w(), o("button", {
				key: 0,
				ref: "close-tp-btn",
				"data-dp-action-element": "1",
				type: "button",
				class: v({
					...J.value,
					"dp--hidden-el": re.value
				}),
				"aria-label": F(C)?.closeTimePicker,
				tabindex: "0",
				onKeydown: l[2] ||= (e) => F(N)(e, () => q(!1)),
				onClick: l[3] ||= (e) => q(!1)
			}, [A(r.$slots, "calendar-icon", {}, () => [u(F(Ge))])], 42, Bn)), [[R, !F(U)("time")]]) : a("", !0)], 2)], 14, zn)) : a("", !0)]),
			_: 3
		}, 8, ["name", "css"])], 8, Ln));
	}
}), Hn = (e) => {
	let { getDate: t, modelValue: n, time: i, rootProps: a, defaults: { range: o, timeConfig: s } } = Q(), { isDateEqual: c, setTime: l } = Ht(), u = (e, t) => Array.isArray(i[e]) ? i[e][t] : i[e], d = (e) => s.value.enableSeconds ? Array.isArray(i.seconds) ? i.seconds[e] : i.seconds : 0, f = (e, n) => e ? l(n === void 0 ? {
		hours: i.hours,
		minutes: i.minutes,
		seconds: d()
	} : {
		hours: u("hours", n),
		minutes: u("minutes", n),
		seconds: d(n)
	}, e) : Ne(t(), d(n)), p = (e, t) => {
		i[e] = t;
	}, m = r(() => a.modelAuto && o.value.enabled ? Array.isArray(n.value) ? n.value.length > 1 : !1 : o.value.enabled), h = (e, t) => {
		let r = Object.fromEntries(Object.keys(i).map((n) => n === e ? [n, t] : [n, i[n]].slice()));
		if (m.value && !o.value.disableTimeRangeValidation) {
			let e = (e) => n.value ? l({
				hours: r.hours[e],
				minutes: r.minutes[e],
				seconds: r.seconds[e]
			}, n.value[e]) : null, t = (e) => je(n.value[e], 0);
			return !(c(e(0), e(1)) && (Ce(e(0), t(1)) || we(e(1), t(0))));
		}
		return !0;
	}, g = (t, n) => {
		h(t, n) && (p(t, n), e && e());
	}, _ = (e) => {
		g("hours", e);
	}, v = (e) => {
		g("minutes", e);
	}, y = (e) => {
		g("seconds", e);
	}, b = (e, t) => {
		_(e.hours), v(e.minutes), y(e.seconds), n.value && t(n.value);
	}, x = (e) => {
		if (e) {
			let t = Array.isArray(e), n = t ? [+e[0].hours, +e[1].hours] : +e.hours, r = t ? [+e[0].minutes, +e[1].minutes] : +e.minutes, i = t ? [+(e[0].seconds ?? 0), +(e[1].seconds ?? 0)] : +(e.seconds ?? 0);
			p("hours", n), p("minutes", r), s.value.enableSeconds && p("seconds", i);
		}
	}, S = (e, t) => {
		let n = {
			hours: Array.isArray(i.hours) ? i.hours[e] : i.hours,
			disabledArr: []
		};
		return (t || t === 0) && (n.hours = t), Array.isArray(a.disabledTimes) && (n.disabledArr = o.value.enabled && Array.isArray(a.disabledTimes[e]) ? a.disabledTimes[e] : a.disabledTimes), n;
	};
	return {
		assignTime: p,
		updateHours: _,
		updateMinutes: v,
		updateSeconds: y,
		getSetDateTime: f,
		updateTimeValues: b,
		getSecondsValue: d,
		assignStartTime: x,
		validateTime: h,
		disabledTimesConfig: r(() => (e, t) => {
			if (Array.isArray(a.disabledTimes)) {
				let { disabledArr: n, hours: r } = S(e, t), i = n.filter((e) => +e.hours === r);
				return i[0]?.minutes === "*" ? {
					hours: [r],
					minutes: void 0,
					seconds: void 0
				} : {
					hours: [],
					minutes: i?.map((e) => +e.minutes) ?? [],
					seconds: i?.map((e) => e.seconds ? +e.seconds : void 0) ?? []
				};
			}
			return {
				hours: [],
				minutes: [],
				seconds: []
			};
		})
	};
}, Un = (e) => {
	let { getDate: t, time: n, modelValue: r, state: i, defaults: { startTime: a, range: o, timeConfig: s } } = Q(), { getTimeObj: c } = Ht();
	ut(() => {
		i.isTextInputDate && x();
	});
	let { updateTimeValues: l, getSetDateTime: u, assignTime: d, assignStartTime: f, disabledTimesConfig: p, validateTime: m } = Hn(h);
	function h() {
		e("update-flow-step");
	}
	let g = (e) => {
		let { hours: t, minutes: n, seconds: r } = e;
		return {
			hours: +t,
			minutes: +n,
			seconds: r ? +r : 0
		};
	}, _ = () => {
		if (s.value.startTime) {
			if (Array.isArray(s.value.startTime)) {
				let e = g(s.value.startTime[0]), n = g(s.value.startTime[1]);
				return [Z(t(), e), Z(t(), n)];
			}
			let e = g(s.value.startTime);
			return Z(t(), e);
		}
		return o.value.enabled ? [null, null] : null;
	}, v = () => {
		if (o.value.enabled) {
			let [e, t] = _();
			r.value = [u(e, 0), u(t, 1)];
		} else r.value = u(_());
	}, y = (e) => Array.isArray(e) ? [c(t(e[0])), c(t(e[1]))] : [c(e ?? t())], b = (e, t, n) => {
		d("hours", e), d("minutes", t), d("seconds", s.value.enableSeconds ? n : 0);
	}, x = () => {
		let [e, t] = y(r.value);
		return o.value.enabled ? b([e.hours, t.hours], [e.minutes, t.minutes], [e.seconds, t.seconds]) : b(e.hours, e.minutes, e.seconds);
	};
	S(() => (f(a.value), r.value ? x() : v()));
	let C = () => {
		Array.isArray(r.value) ? r.value = r.value.map((e, t) => e && u(e, t)) : r.value = u(r.value), e("time-update");
	};
	return {
		modelValue: r,
		time: n,
		disabledTimesConfig: p,
		validateTime: m,
		updateTime: (e) => {
			l(e, C);
		}
	};
}, Wn = /* @__PURE__ */ d({
	__name: "TimePickerSolo",
	props: {
		flowStep: {},
		collapse: { type: Boolean },
		menuWrapRef: {},
		noOverlayFocus: { type: Boolean }
	},
	emits: [
		"time-update",
		"mount",
		"reset-flow",
		"update-flow-step"
	],
	setup(e, { expose: t, emit: n }) {
		let r = n, a = Qt(I(), Yt.TimePicker), o = L("time-input"), { time: l, modelValue: d, disabledTimesConfig: p, updateTime: m, validateTime: h } = Un(r);
		return S(() => {
			r("mount");
		}), t({
			getSidebarProps: () => ({
				modelValue: d,
				time: l,
				updateTime: m
			}),
			toggleTimePicker: (e, t = !1, n = "") => {
				o.value?.toggleTimePicker(e, t, n);
			}
		}), (e, t) => (w(), i(vn, {
			"multi-calendars": 0,
			stretch: ""
		}, {
			default: B(({ wrapClass: n }) => [s("div", { class: v(n) }, [u(Vn, g({ ref: "time-input" }, e.$props, {
				hours: F(l).hours,
				minutes: F(l).minutes,
				seconds: F(l).seconds,
				"disabled-times-config": F(p),
				"validate-time": F(h),
				"onUpdate:hours": t[0] ||= (e) => F(m)({
					hours: e,
					minutes: F(l).minutes,
					seconds: F(l).seconds
				}),
				"onUpdate:minutes": t[1] ||= (e) => F(m)({
					hours: F(l).hours,
					minutes: e,
					seconds: F(l).seconds
				}),
				"onUpdate:seconds": t[2] ||= (e) => F(m)({
					hours: F(l).hours,
					minutes: F(l).minutes,
					seconds: e
				}),
				onResetFlow: t[3] ||= (t) => e.$emit("reset-flow")
			}), c({ _: 2 }, [k(F(a), (t, n) => ({
				name: t,
				fn: B((n) => [A(e.$slots, t, y(f(n)))])
			}))]), 1040, [
				"hours",
				"minutes",
				"seconds",
				"disabled-times-config",
				"validate-time"
			])], 2)]),
			_: 3
		}));
	}
}), Gn = (e, t) => {
	let { getDate: n, rootProps: i, defaults: { filters: a } } = Q(), { validateMonthYearInRange: o, validateMonthYear: s } = dt(), c = (e, t) => {
		let n = e;
		return a.value.months.includes(Y(n)) ? (n = t ? J(e, 1) : Ve(e, 1), c(n, t)) : n;
	}, l = (e, t) => {
		let n = e;
		return a.value.years.includes(X(n)) ? (n = t ? se(e, 1) : He(e, 1), l(n, t)) : n;
	}, u = (t, r = !1) => {
		let s = Z(n(), {
			month: e.month,
			year: e.year
		}), u = t ? J(s, 1) : Ve(s, 1);
		i.disableYearSelect && (u = Pe(u, e.year));
		let f = Y(u), p = X(u);
		a.value.months.includes(f) && (u = c(u, t), f = Y(u), p = X(u)), a.value.years.includes(p) && (u = l(u, t), p = X(u)), o(f, p, t, i.preventMinMaxNavigation) && d(f, p, r);
	}, d = (e, n, r = !1) => {
		t("update-month-year", {
			month: e,
			year: n,
			fromNav: r
		});
	};
	return {
		handleMonthYearChange: u,
		isDisabled: r(() => (t) => s(Z(n(), {
			month: e.month,
			year: e.year
		}), i.preventMinMaxNavigation, t)),
		updateMonthYear: d
	};
}, Kn = { class: "dp--header-wrap" }, qn = {
	key: 0,
	class: "dp--month-year-wrap"
}, Jn = { key: 0 }, Yn = { class: "dp--month-year-wrap" }, Xn = [
	"data-dp-element",
	"aria-label",
	"data-test-id",
	"onClick",
	"onKeydown"
], Zn = /* @__PURE__ */ d({
	__name: "DpHeader",
	props: {
		month: {},
		year: {},
		instance: {},
		years: {},
		months: {},
		menuWrapRef: {}
	},
	emits: [
		"mount",
		"reset-flow",
		"update-month-year"
	],
	setup(t, { expose: d, emit: p }) {
		let m = p, h = t, { rootEmit: _, rootProps: b, modelValue: x, defaults: { ariaLabels: C, filters: T, config: E, highlight: D, safeDates: N, ui: P } } = Q(), { transitionName: I, showTransition: L } = lt(), { showLeftIcon: R, showRightIcon: z } = dn(), { handleMonthYearChange: V, isDisabled: H, updateMonthYear: U } = Gn(h, m), { getMaxMonth: ee, getMinMonth: te, getYearFromDate: W, groupListAndMap: ne, checkHighlightYear: G, checkHighlightMonth: re } = Ht(), { checkKeyDown: ie } = Vt(), { formatYear: ae } = Wt(), { checkMinMaxValue: K } = dt(), { boolHtmlAttribute: oe } = qt(), q = O(!1), J = O(!1), se = O(!1);
		S(() => {
			m("mount");
		});
		let ce = (e) => ({
			get: () => h[e],
			set: (t) => {
				let n = e === et.month ? et.year : et.month;
				m("update-month-year", {
					[e]: t,
					[n]: h[n]
				}), e === et.month ? ge(!0) : _e(!0);
			}
		}), le = r(ce(et.month)), ue = r(ce(et.year)), de = r(() => (e) => ({
			month: h.month,
			year: h.year,
			items: e === et.month ? h.months : h.years,
			instance: h.instance,
			updateMonthYear: U,
			toggle: e === et.month ? ge : _e
		})), fe = r(() => h.months.find((e) => e.value === h.month) || {
			text: "",
			value: 0
		}), pe = r(() => ne(h.months, (e) => ({
			active: h.month === e.value,
			disabled: K(e.value, te(h.year, N.value.minDate), ee(h.year, N.value.maxDate)) || T.value.months.includes(e.value),
			highlighted: re(D.value, e.value, h.year)
		}))), me = r(() => ne(h.years, (e) => ({
			active: h.year === e.value,
			disabled: K(e.value, W(N.value.minDate), W(N.value.maxDate)) || T.value.years.includes(e.value),
			highlighted: G(D.value, e.value)
		}))), he = (e, t, n) => {
			n === void 0 ? e.value = !e.value : e.value = n, e.value ? (se.value = !0, _("overlay-toggle", {
				open: !0,
				overlay: t
			})) : (se.value = !1, _("overlay-toggle", {
				open: !1,
				overlay: t
			}));
		}, ge = (e = !1, t) => {
			ve(e), he(q, nt.month, t);
		}, _e = (e = !1, t) => {
			ve(e), he(J, nt.year, t);
		}, ve = (e) => {
			e || m("reset-flow");
		}, ye = r(() => [{
			type: et.month,
			index: 1,
			toggle: ge,
			modelValue: le.value,
			updateModelValue: (e) => le.value = e,
			text: fe.value.text,
			showSelectionGrid: q.value,
			items: pe.value,
			ariaLabel: C.value?.openMonthsOverlay,
			overlayLabel: C.value.monthPicker?.(!0) ?? void 0
		}, {
			type: et.year,
			index: 2,
			toggle: _e,
			modelValue: ue.value,
			updateModelValue: (e) => ue.value = e,
			text: ae(h.year),
			showSelectionGrid: J.value,
			items: me.value,
			ariaLabel: C.value?.openYearsOverlay,
			overlayLabel: C.value.yearPicker?.(!0) ?? void 0
		}]), Y = r(() => b.disableYearSelect ? [ye.value[0]] : b.yearFirst ? [...ye.value].reverse() : ye.value);
		return d({
			toggleMonthPicker: ge,
			toggleYearPicker: _e,
			handleMonthYearChange: V
		}), (r, d) => (w(), o("div", Kn, [r.$slots["month-year"] ? (w(), o("div", qn, [A(r.$slots, "month-year", y(f({
			mode: "date",
			month: t.month,
			year: t.year,
			months: t.months,
			years: t.years,
			updateMonthYear: F(U),
			handleMonthYearChange: F(V),
			instance: t.instance,
			isDisabled: F(H)
		})))])) : (w(), o(e, { key: 1 }, [r.$slots["top-extra"] ? (w(), o("div", Jn, [A(r.$slots, "top-extra", { value: F(x) })])) : a("", !0), s("div", Yn, [
			F(R)(t.instance) && !F(b).vertical ? (w(), i(bn, {
				key: 0,
				"aria-label": F(C)?.prevMonth,
				disabled: F(oe)(F(H)(!1)),
				class: v(F(P)?.navBtnPrev),
				"el-name": "action-prev",
				onActivate: d[0] ||= (e) => F(V)(!1, !0)
			}, {
				default: B(() => [r.$slots["arrow-left"] ? A(r.$slots, "arrow-left", { key: 0 }) : a("", !0), r.$slots["arrow-left"] ? a("", !0) : (w(), i(F(qe), { key: 1 }))]),
				_: 3
			}, 8, [
				"aria-label",
				"disabled",
				"class"
			])) : a("", !0),
			s("div", { class: v(["dp--month-year-wrap", { "dp--year-disable-select": F(b).disableYearSelect }]) }, [(w(!0), o(e, null, k(Y.value, (d) => (w(), o(e, { key: d.type }, [s("button", {
				type: "button",
				"data-dp-element": `overlay-${d.type}`,
				class: v(["dp--btn-base dp--bg-none dp--month-year-select-base dp--month-year-select", { "dp--hidden-el": se.value }]),
				"aria-label": `${d.text}-${d.ariaLabel}`,
				"data-test-id": `${d.type}-toggle-overlay-${t.instance}`,
				tabindex: "0",
				"data-dp-action-element": "0",
				onClick: (e) => d.toggle(!1),
				onKeydown: (e) => F(ie)(e, () => d.toggle(), !0)
			}, [r.$slots[d.type] ? A(r.$slots, d.type, {
				key: 0,
				text: d.text,
				value: h[d.type]
			}) : a("", !0), r.$slots[d.type] ? a("", !0) : (w(), o(e, { key: 1 }, [l(M(d.text), 1)], 64))], 42, Xn), u(n, {
				name: F(I)(d.showSelectionGrid),
				css: F(L)
			}, {
				default: B(() => [d.showSelectionGrid ? (w(), i(gn, {
					key: 0,
					items: d.items,
					"is-last": F(b).autoApply && !F(E).keepActionRow,
					"skip-button-ref": !1,
					type: d.type,
					"header-refs": [],
					"menu-wrap-ref": t.menuWrapRef,
					"overlay-label": d.overlayLabel,
					onSelected: d.updateModelValue,
					onToggle: d.toggle
				}, c({
					"button-icon": B(() => [r.$slots["calendar-icon"] ? A(r.$slots, "calendar-icon", { key: 0 }) : a("", !0), r.$slots["calendar-icon"] ? a("", !0) : (w(), i(F(Ge), { key: 1 }))]),
					_: 2
				}, [
					r.$slots[`${d.type}-overlay-value`] ? {
						name: "item",
						fn: B(({ item: e }) => [A(r.$slots, `${d.type}-overlay-value`, {
							text: e.text,
							value: e.value
						})]),
						key: "0"
					} : void 0,
					r.$slots[`${d.type}-overlay`] ? {
						name: "overlay",
						fn: B(() => [A(r.$slots, `${d.type}-overlay`, g({ ref_for: !0 }, de.value(d.type)))]),
						key: "1"
					} : void 0,
					r.$slots[`${d.type}-overlay-header`] ? {
						name: "header",
						fn: B(() => [A(r.$slots, `${d.type}-overlay-header`, { toggle: d.toggle })]),
						key: "2"
					} : void 0
				]), 1032, [
					"items",
					"is-last",
					"type",
					"menu-wrap-ref",
					"overlay-label",
					"onSelected",
					"onToggle"
				])) : a("", !0)]),
				_: 2
			}, 1032, ["name", "css"])], 64))), 128))], 2),
			F(R)(t.instance) && F(b).vertical ? (w(), i(bn, {
				key: 1,
				"aria-label": F(C)?.prevMonth,
				"el-name": "action-prev",
				disabled: F(oe)(F(H)(!1)),
				class: v(F(P)?.navBtnPrev),
				onActivate: d[1] ||= (e) => F(V)(!1, !0)
			}, {
				default: B(() => [r.$slots["arrow-up"] ? A(r.$slots, "arrow-up", { key: 0 }) : a("", !0), r.$slots["arrow-up"] ? a("", !0) : (w(), i(F(Xe), { key: 1 }))]),
				_: 3
			}, 8, [
				"aria-label",
				"disabled",
				"class"
			])) : a("", !0),
			F(z)(t.instance) ? (w(), i(bn, {
				key: 2,
				ref: "rightIcon",
				"el-name": "action-next",
				disabled: F(oe)(F(H)(!0)),
				"aria-label": F(C)?.nextMonth,
				class: v(F(P)?.navBtnNext),
				onActivate: d[2] ||= (e) => F(V)(!0, !0)
			}, {
				default: B(() => [r.$slots[F(b).vertical ? "arrow-down" : "arrow-right"] ? A(r.$slots, F(b).vertical ? "arrow-down" : "arrow-right", { key: 0 }) : a("", !0), r.$slots[F(b).vertical ? "arrow-down" : "arrow-right"] ? a("", !0) : (w(), i(j(F(b).vertical ? F(Ze) : F(Je)), { key: 1 }))]),
				_: 3
			}, 8, [
				"disabled",
				"aria-label",
				"class"
			])) : a("", !0)
		])], 64))]));
	}
}), Qn = {
	class: "dp--calendar-header",
	role: "row"
}, $n = {
	key: 0,
	class: "dp--calendar-header-item",
	role: "gridcell"
}, er = ["aria-label"], tr = {
	key: 0,
	class: "dp--calendar-item dp--week-num",
	role: "gridcell"
}, nr = { class: "dp--cell-inner" }, rr = [
	"id",
	"aria-selected",
	"aria-disabled",
	"aria-label",
	"tabindex",
	"data-test-id",
	"data-dp-element-active",
	"onClick",
	"onTouchend",
	"onKeydown",
	"onMouseenter",
	"onMouseleave",
	"onMousedown"
], ir = /* @__PURE__ */ d({
	__name: "DpCalendar",
	props: {
		instance: {},
		mappedDates: {},
		month: {},
		year: {}
	},
	emits: [
		"mount",
		"select-date",
		"set-hover-date",
		"handle-scroll",
		"handle-swipe"
	],
	setup(t, { expose: i, emit: c }) {
		let d = c, f = t, { getDate: p, rootEmit: m, rootProps: h, defaults: { transitions: g, config: y, ariaLabels: x, multiCalendars: T, weekNumbers: E, multiDates: D, ui: j, weekStart: N } } = Q(), { isDateAfter: P, isDateEqual: I, resetDateTime: R, getCellId: z } = Ht(), { checkKeyDown: V, checkStopPropagation: H, isTouchDevice: ee } = Vt(), { formatWeekDay: ne } = Wt(), G = L("calendar-wrap"), re = L("active-tooltip"), ie = O([]), ae = O(null), K = O(!0), oe = O(!1), q = O(""), J = O({
			bottom: "",
			left: "",
			transform: ""
		}), se = O({ left: "50%" });
		W(G, { onSwipeEnd: (e, t) => {
			y.value.noSwipe || (h.vertical ? (t === "up" || t === "down") && d("handle-swipe", t === "up" ? "left" : "right") : (t === "left" || t === "right") && d("handle-swipe", t === "right" ? "left" : "right"));
		} });
		let ce = r(() => h.calendar ? h.calendar(f.mappedDates) : f.mappedDates), le = r(() => h.dayNames ? Array.isArray(h.dayNames) ? h.dayNames : h.dayNames() : je());
		S(() => {
			d("mount", {
				cmp: "calendar",
				dayRefs: ie.value
			}), y.value.monthChangeOnScroll && G.value && G.value.addEventListener("wheel", Te, { passive: !1 });
		}), C(() => {
			y.value.monthChangeOnScroll && G.value && G.value.removeEventListener("wheel", Te);
		});
		let de = (e) => e ? h.vertical ? "vNext" : "next" : h.vertical ? "vPrevious" : "previous", fe = (e, t) => {
			if (h.transitions) {
				let n = R(Z(p(), {
					month: f.month,
					year: f.year
				}));
				q.value = P(R(Z(p(), {
					month: e,
					year: t
				})), n) ? g.value[de(!0)] : g.value[de(!1)], K.value = !1, _().then(() => K.value = !0);
			}
		}, me = r(() => ({ ...j.value.calendar })), he = (e) => ({
			type: "dot",
			...e
		}), ge = r(() => (e) => {
			let t = he(e);
			return {
				"dp--marker-base": !0,
				"dp--marker-dot": t.type === "dot",
				"dp--marker-line": t.type === "line"
			};
		}), _e = r(() => (e) => I(e, ae.value)), ye = r(() => ({
			"dp--calendar": !0,
			"dp--calendar-next": T.value.count > 0 && f.instance !== 0
		})), Y = r(() => (e) => h.hideOffsetDates ? e.current : !0), be = async (e, t) => {
			let { width: n, height: r } = e.getBoundingClientRect();
			ae.value = t.value;
			let i = { left: `${n / 2}px` }, a = -50;
			if (await _(), re.value?.[0]) {
				let { left: e, width: t } = re.value[0].getBoundingClientRect();
				e < 0 && (i = { left: "0" }, a = 0, se.value.left = `${n / 2}px`), globalThis.innerWidth < e + t && (i = { right: "0" }, a = 0, se.value.left = `${t - n / 2}px`);
			}
			J.value = {
				bottom: `${r}px`,
				...i,
				transform: `translateX(${a}%)`
			};
		}, xe = async (e, t, n) => {
			let r = te(ie.value?.[t]?.[n]);
			r && (e.marker?.customPosition && e.marker?.tooltip?.length ? J.value = e.marker.customPosition(r) : await be(r, e), m("tooltip-open", e.marker));
		}, X = async (e, t, n) => {
			if (oe.value && D.value.enabled && D.value.dragSelect) return d("select-date", e);
			if (d("set-hover-date", e), e.marker?.tooltip?.length) {
				if (h.hideOffsetDates && !e.current) return;
				await xe(e, t, n);
			}
		}, Ce = (e) => {
			ae.value && (ae.value = null, J.value = structuredClone({
				bottom: "",
				left: "",
				transform: ""
			}), m("tooltip-close", e.marker));
		}, we = (e, t, n) => {
			e && (Array.isArray(ie.value[t]) ? ie.value[t][n] = e : ie.value[t] = [e]);
		}, Te = (e) => {
			y.value.monthChangeOnScroll && (e.preventDefault(), d("handle-scroll", e));
		}, Ee = (e) => E.value ? E.value.type === "local" ? Se(e.value, {
			weekStartsOn: N.value,
			locale: h.locale
		}) : E.value.type === "iso" ? ve(e.value) : typeof E.value.type == "function" ? E.value.type(e.value) : "" : "", De = (e) => {
			let t = e[0];
			return E.value?.hideOnOffsetDates ? e.some((e) => e.current) ? Ee(t) : "" : Ee(t);
		}, Oe = (e, t, n = !0) => {
			!n && ee() || (!D.value.enabled || y.value.allowPreventDefault) && (H(e, y.value), d("select-date", t));
		}, ke = (e) => {
			H(e, y.value);
		}, Ae = (e) => {
			D.value.enabled && D.value.dragSelect ? (oe.value = !0, d("select-date", e)) : D.value.enabled && d("select-date", e);
		}, je = () => {
			let e = p();
			return ue({
				start: Le(e, {
					locale: h.locale,
					weekStartsOn: N.value
				}),
				end: pe(e, {
					locale: h.locale,
					weekStartsOn: N.value
				})
			}).map((e) => ne(e));
		};
		return i({ triggerTransition: fe }), (t, r) => (w(), o("div", { class: v(ye.value) }, [s("div", {
			ref: "calendar-wrap",
			class: v(me.value),
			role: "grid"
		}, [
			s("div", Qn, [F(E) ? (w(), o("div", $n, M(F(E).label), 1)) : a("", !0), (w(!0), o(e, null, k(le.value, (e, n) => (w(), o("div", {
				key: n,
				class: "dp--calendar-header-item",
				role: "gridcell",
				"data-test-id": "calendar-header",
				"aria-label": F(x)?.weekDay?.(n)
			}, [A(t.$slots, "calendar-header", {
				day: e,
				index: n
			}, () => [l(M(e), 1)])], 8, er))), 128))]),
			r[2] ||= s("div", { class: "dp--calendar-header-separator" }, null, -1),
			u(n, {
				name: q.value,
				css: !!F(g)
			}, {
				default: B(() => [K.value ? (w(), o("div", {
					key: 0,
					class: "dp--calendar",
					role: "rowgroup",
					onMouseleave: r[1] ||= (e) => oe.value = !1
				}, [(w(!0), o(e, null, k(ce.value, (n, i) => (w(), o("div", {
					key: i,
					class: "dp--calendar-row",
					role: "row"
				}, [F(E) ? (w(), o("div", tr, [s("div", nr, M(De(n.days)), 1)])) : a("", !0), (w(!0), o(e, null, k(n.days, (n, c) => (w(), o("div", {
					id: F(z)(n.value),
					ref_for: !0,
					ref: (e) => we(e, i, c),
					key: c + i,
					role: "gridcell",
					class: "dp--calendar-item",
					"aria-selected": (n.classData["dp--active"] || n.classData["dp--range-border-start"] || n.classData["dp--range-border-end"]) ?? void 0,
					"aria-disabled": n.classData["dp--cell-disabled"] || void 0,
					"aria-label": F(x)?.day?.(n),
					tabindex: !n.current && F(h).hideOffsetDates ? void 0 : 0,
					"data-test-id": F(z)(n.value),
					"data-dp-element-active": n.classData["dp--active"] ? 0 : void 0,
					"data-dp-action-element": "0",
					onClick: U((e) => Oe(e, n), ["prevent"]),
					onTouchend: (e) => Oe(e, n, !1),
					onKeydown: (e) => F(V)(e, () => t.$emit("select-date", n)),
					onMouseenter: (e) => X(n, i, c),
					onMouseleave: (e) => Ce(n),
					onMousedown: (e) => Ae(n),
					onMouseup: r[0] ||= (e) => oe.value = !1
				}, [s("div", { class: v(["dp--cell-inner", n.classData]) }, [
					t.$slots.day && Y.value(n) ? A(t.$slots, "day", {
						key: 0,
						day: +n.text,
						date: n.value
					}) : a("", !0),
					t.$slots.day ? a("", !0) : (w(), o(e, { key: 1 }, [l(M(n.text), 1)], 64)),
					n.marker && Y.value(n) ? A(t.$slots, "marker", {
						key: 2,
						marker: n.marker,
						day: +n.text,
						date: n.value
					}, () => [s("div", {
						class: v(ge.value(n.marker)),
						style: b(n.marker.color ? { backgroundColor: n.marker.color } : {})
					}, null, 6)]) : a("", !0),
					_e.value(n.value) ? (w(), o("div", {
						key: 3,
						ref_for: !0,
						ref: "active-tooltip",
						class: "dp--marker-tooltip",
						style: b(J.value)
					}, [n.marker?.tooltip ? (w(), o("div", {
						key: 0,
						class: "dp--tooltip-content",
						onClick: ke
					}, [(w(!0), o(e, null, k(n.marker.tooltip, (e, r) => (w(), o("div", {
						key: r,
						class: "dp--tooltip-text"
					}, [A(t.$slots, "marker-tooltip", {
						tooltip: e,
						day: n.value
					}, () => [s("div", {
						class: "dp--tooltip-mark",
						style: b(e.color ? { backgroundColor: e.color } : {})
					}, null, 4), s("div", null, M(e.text), 1)])]))), 128)), s("div", {
						class: "dp--arrow-bottom-tp",
						style: b(se.value)
					}, null, 4)])) : a("", !0)], 4)) : a("", !0)
				], 2)], 40, rr))), 128))]))), 128))], 32)) : a("", !0)]),
				_: 3
			}, 8, ["name", "css"])
		], 2)], 2));
	}
}), ar = (e, t, n, i) => {
	let a = O([]), o = O(/* @__PURE__ */ new Date()), s = O(), { getDate: c, rootEmit: l, calendars: u, month: d, year: f, time: p, modelValue: m, rootProps: h, today: g, state: v, defaults: { multiCalendars: y, startTime: b, range: x, config: C, safeDates: w, multiDates: T, timeConfig: E, flow: D, weekStart: k } } = Q(), { validateMonthYearInRange: A, isDisabled: j, isDateRangeAllowed: M, checkMinMaxRange: N } = dt(), { updateTimeValues: P, getSetDateTime: F, assignTime: I, assignStartTime: L, validateTime: R, disabledTimesConfig: z } = Hn(i), { formatDay: B } = Wt(), { resetDateTime: V, setTime: H, isDateBefore: U, isDateEqual: ee, getDaysInBetween: te } = Ht(), { checkRangeAutoApply: W, getRangeWithFixedDate: ne, handleMultiDatesSelect: G, setPresetDate: re } = wn(), { getMapDate: ie } = Vt();
	ut(() => de(v.isTextInputDate));
	let ae = (e) => !C.value.keepViewOnOffsetClick || e ? !0 : !s.value, K = (e, t, n, r = !1) => {
		ae(r) && (u.value[e] ??= u.value[e] = {
			month: 0,
			year: 0
		}, u.value[e].month = t ?? u.value[e]?.month, u.value[e].year = n ?? u.value[e]?.year);
	}, se = () => {
		h.autoApply && t("select-date");
	}, ce = () => {
		b.value && L(b.value);
	};
	S(() => {
		m.value || (Ee(), ce()), de(!0), h.focusStartDate && h.startDate && Ee();
	});
	let le = r(() => D.value?.steps?.length && !D.value?.partial ? e.flowStep === D.value.steps.length : !0), ue = () => {
		h.autoApply && le.value && t("auto-apply", D.value?.partial ? e.flowStep !== D.value?.steps?.length : !1);
	}, de = (e = !1) => {
		if (m.value) return Array.isArray(m.value) ? (a.value = m.value, Se(e)) : he(m.value, e);
		if (y.value.count && e && !h.startDate) return me(c(), e);
	}, fe = () => Array.isArray(m.value) && x.value.enabled ? Y(m.value[0]) === Y(m.value[1] ?? m.value[0]) : !1, pe = (e) => {
		let t = J(e, 1);
		return {
			month: Y(t),
			year: X(t)
		};
	}, me = (e = c(), t = !1) => {
		if ((!y.value.count || !y.value.static || t) && K(0, Y(e), X(e)), y.value.count && (!m.value || fe() || !y.value.solo) && (!y.value.solo || t)) for (let e = 1; e < y.value.count; e++) {
			let t = oe(Z(c(), {
				month: d.value(e - 1),
				year: f.value(e - 1)
			}), { months: 1 });
			u.value[e] = {
				month: Y(t),
				year: X(t)
			};
		}
	}, he = (e, t) => {
		me(e), I("hours", _e(e)), I("minutes", ye(e)), I("seconds", xe(e)), y.value.count && t && Te();
	}, ge = (e) => {
		if (y.value.count) {
			if (y.value.solo) return 0;
			let t = Y(e[0]), n = Y(e[1]);
			return Math.abs(n - t) < y.value.count ? 0 : 1;
		}
		return 1;
	}, ve = (e, t) => {
		e[1] && x.value.showLastInRange ? me(e[ge(e)], t) : me(e[0], t);
		let n = (t, n) => [t(e[0]), e?.[1] ? t(e[1]) : p[n][1]];
		I("hours", n(_e, "hours")), I("minutes", n(ye, "minutes")), I("seconds", n(xe, "seconds"));
	}, be = (e, t) => {
		if ((x.value.enabled || h.weekPicker) && !T.value.enabled) return ve(e, t);
		if (T.value.enabled && t) {
			let n = e.at(-1);
			if (n) return he(n, t);
		}
	}, Se = (e) => {
		let t = m.value;
		be(t, e), y.value.count && y.value.solo && Te();
	}, Ce = (e, t) => {
		let r = Z(c(), {
			month: d.value(t),
			year: f.value(t)
		}), i = e < 0 ? J(r, 1) : Ve(r, 1);
		A(Y(i), X(i), e < 0, h.preventMinMaxNavigation) && (K(t, Y(i), X(i)), l("update-month-year", {
			instance: t,
			month: Y(i),
			year: X(i)
		}), y.value.count && !y.value.solo && we(t), n());
	}, we = (e) => {
		for (let t = e - 1; t >= 0; t--) {
			let e = Ve(Z(c(), {
				month: d.value(t + 1),
				year: f.value(t + 1)
			}), 1);
			K(t, Y(e), X(e));
		}
		for (let t = e + 1; t <= y.value.count - 1; t++) {
			let e = J(Z(c(), {
				month: d.value(t - 1),
				year: f.value(t - 1)
			}), 1);
			K(t, Y(e), X(e));
		}
	}, Te = () => {
		if (Array.isArray(m.value) && m.value.length === 2) {
			let e = c(c(m.value[1] ?? J(m.value[0], 1))), [t, n] = [Y(m.value[0]), X(m.value[0])], [r, i] = [Y(m.value[1]), X(m.value[1])];
			(t !== r || t === r && n !== i) && y.value.solo && K(1, Y(e), X(e));
		} else m.value && !Array.isArray(m.value) && (K(0, Y(m.value), X(m.value)), me(c()));
	}, Ee = () => {
		h.startDate && (K(0, Y(c(h.startDate)), X(c(h.startDate))), y.value.count && we(0));
	}, De = (e, t) => {
		if (C.value.monthChangeOnScroll) {
			let n = Date.now() - o.value.getTime(), r = Math.abs(e.deltaY), i = 500;
			r > 1 && (i = 100), r > 100 && (i = 0), n > i && (o.value = /* @__PURE__ */ new Date(), Ce(C.value.monthChangeOnScroll === "inverse" ? e.deltaY : -e.deltaY, t));
		}
	}, Oe = (e, t, n = !1) => {
		C.value.monthChangeOnArrows && h.vertical === n && ke(e, t);
	}, ke = (e, t) => {
		Ce(e === "right" ? -1 : 1, t);
	}, je = (e) => {
		if (w.value.markers) return ie(e.value, w.value.markers);
	}, Me = (e, t) => {
		switch (h.sixWeeks === !0 ? "append" : h.sixWeeks) {
			case "prepend": return [!0, !1];
			case "center": return [e == 0, !0];
			case "fair": return [e == 0 || t > e, !0];
			case "append": return [!1, !1];
			default: return [!1, !1];
		}
	}, Ne = (e, t, n) => {
		if (n) {
			let r = n.days.at(-1);
			if (r) {
				let n = Fe(q(r.value, 1), Y(t));
				e.push({ days: n });
			}
		}
	}, Pe = (e, t, n, r) => {
		if (h.sixWeeks && e.length < 6) {
			let i = 6 - e.length, [a, o] = Me((t.getDay() + 7 - r) % 7, 6 - (n.getDay() + 7 - r) % 7);
			for (let n = 1; n <= i; n++) if (o ? !!(n % 2) == a : a) {
				let n = e[0].days[0], r = Fe(q(n.value, -7), Y(t));
				e.unshift({ days: r });
			} else Ne(e, t, e.at(-1));
		}
		return e;
	}, Fe = (e, t) => {
		let n = c(e), r = [];
		for (let e = 0; e < 7; e++) {
			let i = q(n, e), a = Y(i) !== t;
			r.push({
				text: h.hideOffsetDates && a ? "" : B(i),
				value: i,
				current: !a,
				classData: {}
			});
		}
		return r;
	}, Ie = (e, t) => {
		let n = [], r = c(new Date(t, e)), i = c(new Date(t, e + 1, 0)), a = Le(r, { weekStartsOn: k.value }), o = (t) => {
			let r = Fe(t, e);
			n.push({ days: r }), n.at(-1)?.days.some((e) => ee(c(e.value), V(i))) || o(q(t, 7));
		};
		return o(a), Pe(n, r, i, k.value);
	}, Re = (e) => {
		let t = H({
			hours: p.hours,
			minutes: p.minutes,
			seconds: Ke()
		}, c(e.value));
		l("date-click", t), T.value.enabled ? G(t, T.value.limit) : m.value = t, i(), _().then(() => {
			ue();
		});
	}, ze = (e) => x.value.noDisabledRange ? te(a.value[0], e).some((e) => j(e)) : !1, Be = () => {
		a.value = m.value ? m.value.slice().filter((e) => !!e) : [], a.value.length === 2 && !(x.value.fixedStart || x.value.fixedEnd) && (a.value = []);
	}, He = (e, t) => {
		let n = [c(e.value), q(c(e.value), +x.value.autoRange)];
		M(n) ? (t && Ue(e.value), a.value = n) : l("invalid-date", e.value);
	}, Ue = (e) => {
		if (K(0, Y(c(e)), X(c(e))), y.value.count > 0) for (let t = 1; t < y.value.count; t++) {
			let n = pe(Z(c(e), {
				year: f.value(t - 1),
				month: d.value(t - 1)
			}));
			K(t, n.month, n.year);
		}
	}, We = (e) => {
		if (ze(e.value) || !N(e.value, m.value, +!x.value.fixedStart)) return l("invalid-date", e.value);
		a.value = ne(c(e.value));
	}, Ge = (e, t) => {
		if (Be(), x.value.autoRange) return He(e, t);
		if (x.value.fixedStart || x.value.fixedEnd) return We(e);
		a.value[0] ? N(c(e.value), m.value) && !ze(e.value) ? U(c(e.value), c(a.value[0])) ? x.value.autoSwitchStartEnd ? (a.value.unshift(c(e.value)), l("range-end", a.value[0])) : (a.value[0] = c(e.value), l("range-start", a.value[0])) : (a.value[1] = c(e.value), l("range-end", a.value[1])) : l("invalid-date", e.value) : (a.value[0] = c(e.value), l("range-start", a.value[0]));
	}, Ke = (e = !0) => E.value.enableSeconds ? Array.isArray(p.seconds) ? e ? p.seconds[0] : p.seconds[1] : p.seconds : 0, qe = (e) => {
		a.value[e] = H({
			hours: p.hours[e],
			minutes: p.minutes[e],
			seconds: Ke(e !== 1)
		}, a.value[e]);
	}, Je = () => {
		a.value[0] && a.value[1] && +a.value?.[0] > +a.value?.[1] && (a.value.reverse(), l("range-start", a.value[0]), l("range-end", a.value[1]));
	}, Ye = () => {
		a.value.length && (a.value[0] && !a.value[1] ? qe(0) : (qe(0), qe(1), i()), Je(), m.value = a.value.slice(), W(a.value, t, a.value.length < 2 || D.value?.steps.length ? e.flowStep !== D.value?.steps?.length : !1));
	}, Xe = (e, t = !1) => {
		if (j(e.value) || !e.current && h.hideOffsetDates) return l("invalid-date", e.value);
		if (s.value = structuredClone(e), !x.value.enabled) return Re(e);
		Array.isArray(p.hours) && Array.isArray(p.minutes) && !T.value.enabled && (Ge(e, t), Ye());
	}, Ze = (t, r) => {
		K(t, r.month, r.year, !0), y.value.count && !y.value.solo && we(t), l("update-month-year", {
			instance: t,
			month: r.month,
			year: r.year
		}), n(y.value.solo ? t : void 0);
		let a = D.value?.steps?.length ? D.value.steps[e.flowStep] : void 0;
		!r.fromNav && (a === nt.month || a === nt.year) && i();
	}, Qe = (e) => {
		re({ value: e }), se(), h.multiCalendars && _().then(() => de(!0));
	}, $e = () => {
		let e = c();
		return h.actionRow?.nowBtnRound && (e = Ae(e, {
			roundingMethod: h.actionRow.nowBtnRound.rounding ?? "ceil",
			nearestTo: h.actionRow.nowBtnRound.roundTo ?? 15
		})), e;
	}, et = () => {
		let e = $e();
		!x.value.enabled && !T.value.enabled ? m.value = e : m.value && Array.isArray(m.value) && m.value[0] ? T.value.enabled ? m.value = [...m.value, e] : m.value = U(e, m.value[0]) ? [e, m.value[0]] : [m.value[0], e] : m.value = [e], se();
	}, tt = () => {
		if (Array.isArray(m.value)) if (T.value.enabled) {
			let e = rt();
			m.value[m.value.length - 1] = F(e);
		} else m.value = m.value.map((e, t) => e && F(e, t));
		else m.value = F(m.value);
		t("time-update");
	}, rt = () => Array.isArray(m.value) && m.value.length ? m.value[m.value.length - 1] : null, it = (e) => {
		let t = "";
		if (x.value.enabled && Array.isArray(m.value)) for (let n of Object.keys(e)) {
			let r = e[n];
			Array.isArray(r) && (p[n][0] !== r[0] && (t = "range-start"), p[n][1] !== r[1] && (t = "range-start"));
		}
		return t;
	};
	return {
		calendars: u,
		modelValue: m,
		month: d,
		year: f,
		time: p,
		disabledTimesConfig: z,
		today: g,
		validateTime: R,
		getCalendarDays: Ie,
		getMarker: je,
		handleScroll: De,
		handleSwipe: ke,
		handleArrow: Oe,
		selectDate: Xe,
		updateMonthYear: Ze,
		presetDate: Qe,
		selectCurrentDate: et,
		updateTime: (e) => {
			let t = it(e);
			P(e, tt), t && l(t, m.value[t === "range-start" ? 0 : 1]);
		},
		assignMonthAndYear: me,
		setStartTime: ce
	};
}, or = () => {
	let { isModelAuto: e, matchDate: t, isDateAfter: n, isDateBefore: r, isDateBetween: i, isDateEqual: a, getWeekFromDate: o, getBeforeAndAfterInRange: s } = Ht(), { getDate: c, today: l, rootProps: u, defaults: { multiCalendars: d, multiDates: f, ui: p, highlight: m, safeDates: h, range: g, weekStart: _ }, modelValue: v } = Q(), { isDisabled: y } = dt(), b = O(null), x = (e) => {
		!e.current && u.hideOffsetDates || (b.value = e.value);
	}, S = () => {
		b.value = null;
	}, C = (e) => Array.isArray(v.value) && g.value.enabled && v.value[0] && b.value ? e ? n(b.value, v.value[0]) : r(b.value, v.value[0]) : !0, w = (e, t) => {
		let n = v.value && Array.isArray(v.value) && v.value ? t ? v.value[0] || null : v.value[1] : null;
		return a(c(e.value), n);
	}, T = (e) => {
		let t = Array.isArray(v.value) ? v.value[0] : null;
		return e ? !r(b.value, t) : !0;
	}, E = (e, t = !0) => (g.value.enabled || u.weekPicker) && Array.isArray(v.value) && v.value.length === 2 ? u.hideOffsetDates && !e.current ? !1 : a(c(e.value), v.value[+!t]) : g.value.enabled ? w(e, t) && T(t) || a(e.value, Array.isArray(v.value) ? v.value[0] : null) && C(t) : !1, D = (e, t) => {
		if (Array.isArray(v.value) && v.value[0] && v.value.length === 1) {
			let i = a(e.value, b.value);
			return t ? n(v.value[0], e.value) && i : r(v.value[0], e.value) && i;
		}
		return !1;
	}, k = (e) => !v.value || u.hideOffsetDates && !e.current ? !1 : g.value.enabled ? u.modelAuto && Array.isArray(v.value) ? a(e.value, v.value[0] ?? l) : !1 : f.value.enabled && Array.isArray(v.value) ? v.value.some((t) => a(t, e.value)) : a(e.value, v.value ? v.value : l), A = (e) => {
		if (g.value.autoRange || u.weekPicker) {
			if (b.value) {
				if (u.hideOffsetDates && !e.current) return !1;
				let t = q(b.value, +g.value.autoRange), n = o(c(b.value), _.value);
				return u.weekPicker ? a(n[1], c(e.value)) : a(t, c(e.value));
			}
			return !1;
		}
		return !1;
	}, j = (e) => {
		if (g.value.autoRange || u.weekPicker) {
			if (b.value) {
				let t = q(b.value, +g.value.autoRange);
				if (u.hideOffsetDates && !e.current) return !1;
				let i = o(c(b.value), _.value);
				return u.weekPicker ? n(e.value, i[0]) && r(e.value, i[1]) : n(e.value, b.value) && r(e.value, t);
			}
			return !1;
		}
		return !1;
	}, M = (e) => {
		if (g.value.autoRange || u.weekPicker) {
			if (b.value) {
				if (u.hideOffsetDates && !e.current) return !1;
				let t = o(c(b.value), _.value);
				return u.weekPicker ? a(t[0], e.value) : a(b.value, e.value);
			}
			return !1;
		}
		return !1;
	}, N = (e) => i(v.value, b.value, e.value), P = () => u.modelAuto && Array.isArray(v.value) ? !!v.value[0] : !1, F = () => u.modelAuto ? e(v.value) : !0, I = (e) => {
		if (u.weekPicker) return !1;
		let t = g.value.enabled ? !E(e) && !E(e, !1) : !0;
		return !y(e.value) && !k(e) && !(!e.current && u.hideOffsetDates) && t;
	}, L = (e) => g.value.enabled ? u.modelAuto ? P() && k(e) : !1 : k(e), R = (e) => m.value ? t(e.value, h.value.highlight) : !1, z = (e) => {
		let t = y(e.value);
		return t && (typeof m.value == "function" ? !m.value(e.value, t) : !m.value.options.highlightDisabled);
	}, B = (e) => typeof m.value == "function" ? m.value(e.value) : m.value.weekdays?.includes(e.value.getDay()), V = (e) => (g.value.enabled || u.weekPicker) && (!(d.value.count > 0) || e.current) && F() && !(!e.current && u.hideOffsetDates) && !k(e) ? N(e) : !1, H = (e) => {
		if (Array.isArray(v.value) && v.value.length === 1) {
			let { before: t, after: n } = s(+g.value.maxRange, v.value[0]);
			return we(e.value, t) || Ce(e.value, n);
		}
		return !1;
	}, U = (e) => {
		if (Array.isArray(v.value) && v.value.length === 1) {
			let { before: t, after: n } = s(+g.value.minRange, v.value[0]);
			return i([t, n], v.value[0], e.value);
		}
		return !1;
	}, ee = (e) => g.value.enabled && (g.value.maxRange || g.value.minRange) ? g.value.maxRange && g.value.minRange ? H(e) || U(e) : g.value.maxRange ? H(e) : U(e) : !1, te = (e) => {
		let { isRangeStart: t, isRangeEnd: i } = re(e), o = g.value.enabled ? t || i : !1;
		return {
			"dp--cell-offset": !e.current,
			"dp--pointer": !u.disabled && !(!e.current && u.hideOffsetDates) && !y(e.value) && !ee(e),
			"dp--cell-disabled": y(e.value) || ee(e),
			"dp--cell-highlight": !z(e) && (R(e) || B(e)) && !L(e) && !o && !M(e) && !(V(e) && u.weekPicker) && !i,
			"dp--cell-highlight-active": !z(e) && (R(e) || B(e)) && L(e),
			"dp--today": !u.noToday && a(e.value, l) && e.current,
			"dp--past": r(e.value, l),
			"dp--future": n(e.value, l)
		};
	}, W = (e) => ({
		"dp--active": L(e),
		"dp--date-hoverable": I(e)
	}), ne = (e) => {
		if (v.value && !Array.isArray(v.value)) {
			let t = o(v.value, _.value);
			return {
				...J(e),
				"dp--range-border-start dp--active": a(t[0], e.value),
				"dp--range-border-end dp--active": a(t[1], e.value),
				"dp--range-preview dp--range-between-week": n(e.value, t[0]) && r(e.value, t[1])
			};
		}
		return { ...J(e) };
	}, G = (e) => {
		if (v.value && Array.isArray(v.value)) {
			let t = o(v.value[0], _.value), i = v.value[1] ? o(v.value[1], _.value) : [];
			return {
				...J(e),
				"dp--range-border-start dp--active": a(t[0], e.value) || a(i[0], e.value),
				"dp--range-border-end dp--active": a(t[1], e.value) || a(i[1], e.value),
				"dp--range-preview dp--range-between-week": n(e.value, t[0]) && r(e.value, t[1]) || n(e.value, i[0]) && r(e.value, i[1]),
				"dp--range-between": n(e.value, t[1]) && r(e.value, i[0])
			};
		}
		return { ...J(e) };
	}, re = (e) => ({
		isRangeStart: d.value.count > 0 ? e.current && E(e) && F() : E(e) && F(),
		isRangeEnd: d.value.count > 0 ? e.current && E(e, !1) && F() : E(e, !1) && F()
	}), ie = (e) => g.value.enabled && (g.value.fixedStart || g.value.fixedEnd) && Array.isArray(e) && e.length === 2, ae = (e, t, n, r) => !ie(v.value) || !b.value ? !1 : t ? g.value.fixedEnd && a(e.value, b.value) && we(e.value, v.value[0]) && !n : g.value.fixedStart && a(e.value, b.value) && Ce(e.value, v.value[1]) && !r, K = (e, t) => !ie(v.value) || !b.value ? !1 : t ? g.value.fixedEnd && Ce(e.value, b.value) && we(e.value, v.value[0]) : g.value.fixedStart && we(e.value, b.value) && Ce(e.value, v.value[1]), oe = (e) => {
		let { isRangeStart: t, isRangeEnd: n } = re(e);
		return {
			"dp--range-border-start dp--active": t,
			"dp--range-border-end dp--active": n,
			"dp--range-between": V(e) || K(e, !0) || K(e, !1),
			"dp--date-hoverable": a(e.value, b.value) && !t && !n && !u.weekPicker,
			"dp--date-hoverable dp--date-hoverable-start": D(e, !0) || ae(e, !0, t, n),
			"dp--date-hoverable dp--date-hoverable-end": D(e, !1) || ae(e, !1, t, n)
		};
	}, J = (e) => ({
		...oe(e),
		"dp--range-preview dp--cell-auto-range": j(e),
		"dp--range-preview dp--range-border-start dp--cell-auto-range-start": M(e),
		"dp--range-preview dp--range-border-end dp--cell-auto-range-end": A(e)
	}), se = (e) => g.value.enabled ? g.value.autoRange ? J(e) : u.modelAuto ? {
		...W(e),
		...oe(e)
	} : u.weekPicker ? G(e) : oe(e) : u.weekPicker ? ne(e) : W(e);
	return {
		setHoverDate: x,
		clearHoverDate: S,
		getDayClassData: (e) => u.hideOffsetDates && !e.current ? {} : {
			...te(e),
			...se(e),
			[p.value.dayClass ? p.value.dayClass(e.value, v.value) : ""]: !0,
			...p.value.calendarCell
		}
	};
}, sr = { key: 0 }, cr = /* @__PURE__ */ d({
	__name: "DatePicker",
	props: /* @__PURE__ */ h({
		flowStep: {},
		collapse: { type: Boolean },
		menuWrapRef: {},
		noOverlayFocus: { type: Boolean }
	}, It),
	emits: [
		"mount",
		"update-flow-step",
		"reset-flow",
		"focus-menu",
		"select-date",
		"time-update",
		"auto-apply"
	],
	setup(t, { expose: n, emit: s }) {
		let l = s, { month: d, year: p, modelValue: m, time: h, disabledTimesConfig: _, today: b, validateTime: x, getCalendarDays: S, getMarker: C, handleArrow: T, handleScroll: E, handleSwipe: D, selectDate: O, updateMonthYear: j, presetDate: M, selectCurrentDate: N, updateTime: P, assignMonthAndYear: R, setStartTime: V } = ar(t, l, me, he), H = I(), { setHoverDate: U, getDayClassData: ee, clearHoverDate: te } = or(), { getDate: W, rootEmit: ne, rootProps: G, defaults: { multiCalendars: re, timeConfig: ie } } = Q(), { getYears: ae, getMonths: K } = Gt(), { getCellId: oe } = Ht(), q = L("calendar-header"), J = L("calendar"), se = L("time-picker"), ce = Qt(H, Yt.Calendar), le = Qt(H, Yt.DatePickerHeader), ue = Qt(H, Yt.TimePicker), de = (e) => {
			l("mount", e);
		};
		z(re, (e, t) => {
			e.count - t.count > 0 && R();
		}, { deep: !0 });
		let fe = r(() => (e) => S(d.value(e), p.value(e)).map((e) => ({
			...e,
			days: e.days.map((e) => (e.marker = C(e), e.classData = ee(e), e))
		})));
		function me(e) {
			e || e === 0 ? J.value?.[e]?.triggerTransition(d.value(e), p.value(e)) : J.value?.forEach((e, t) => e?.triggerTransition(d.value(t), p.value(t)));
		}
		function he() {
			l("update-flow-step");
		}
		let ge = (e, t, n = 0) => {
			q.value?.[n]?.toggleMonthPicker(e, t);
		}, _e = (e, t, n = 0) => {
			q.value?.[n]?.toggleYearPicker(e, t);
		}, ve = (e, t, n) => {
			se.value?.toggleTimePicker(e, t, n);
		}, ye = (e, t) => {
			if (!G.range) {
				let n = m.value ? m.value : b, r = t ? W(t) : n, i = e ? Le(r, { weekStartsOn: 1 }) : pe(r, { weekStartsOn: 1 });
				O({
					value: i,
					current: Y(r) === d.value(0),
					text: "",
					classData: {}
				}), document.getElementById(oe(i))?.focus();
			}
		}, be = (e) => {
			q.value?.[0]?.handleMonthYearChange(e, !0);
		}, xe = (e) => {
			j(0, {
				month: d.value(0),
				year: p.value(0) + (e ? 1 : -1),
				fromNav: !0
			});
		}, Se = (e) => {
			ne("overlay-toggle", {
				open: !1,
				overlay: e
			}), l("focus-menu");
		};
		return n({
			clearHoverDate: te,
			presetDate: M,
			selectCurrentDate: N,
			handleArrow: T,
			updateMonthYear: j,
			setStartTime: V,
			toggleMonthPicker: ge,
			toggleYearPicker: _e,
			toggleTimePicker: ve,
			getSidebarProps: () => ({
				modelValue: m,
				month: d,
				year: p,
				time: h,
				updateTime: P,
				updateMonthYear: j,
				selectDate: O,
				presetDate: M
			}),
			changeMonth: be,
			changeYear: xe,
			selectWeekDate: ye
		}), (n, r) => (w(), o(e, null, [u(vn, { collapse: t.collapse }, {
			default: B(({ instances: s, wrapClass: l }) => [(w(!0), o(e, null, k(s, (e) => (w(), o("div", {
				key: e,
				class: v(l)
			}, [F(G).hideMonthYearSelect ? a("", !0) : (w(), i(Zn, {
				key: 0,
				ref_for: !0,
				ref: "calendar-header",
				months: F(K)(),
				years: F(ae)(),
				month: F(d)(e),
				year: F(p)(e),
				instance: e,
				"menu-wrap-ref": t.menuWrapRef,
				onMount: r[0] ||= (e) => de(F(tt).header),
				onResetFlow: r[1] ||= (e) => n.$emit("reset-flow"),
				onUpdateMonthYear: (t) => F(j)(e, t),
				onOverlayClosed: Se
			}, c({ _: 2 }, [k(F(le), (e, t) => ({
				name: e,
				fn: B((t) => [A(n.$slots, e, g({ ref_for: !0 }, t))])
			}))]), 1032, [
				"months",
				"years",
				"month",
				"year",
				"instance",
				"menu-wrap-ref",
				"onUpdateMonthYear"
			])), u(ir, {
				ref_for: !0,
				ref: "calendar",
				"mapped-dates": fe.value(e),
				instance: e,
				month: F(d)(e),
				year: F(p)(e),
				onSelectDate: (t) => F(O)(t, e !== 1),
				onSetHoverDate: r[2] ||= (e) => F(U)(e),
				onHandleScroll: (t) => F(E)(t, e),
				onHandleSwipe: (t) => F(D)(t, e),
				onMount: r[3] ||= (e) => de(F(tt).calendar)
			}, c({ _: 2 }, [k(F(ce), (e, t) => ({
				name: e,
				fn: B((t) => [A(n.$slots, e, g({ ref_for: !0 }, t))])
			}))]), 1032, [
				"mapped-dates",
				"instance",
				"month",
				"year",
				"onSelectDate",
				"onHandleScroll",
				"onHandleSwipe"
			])], 2))), 128))]),
			_: 3
		}, 8, ["collapse"]), F(ie).enableTimePicker ? (w(), o("div", sr, [A(n.$slots, "time-picker", y(f({
			time: F(h),
			updateTime: F(P)
		})), () => [u(Vn, {
			ref: "time-picker",
			hours: F(h).hours,
			minutes: F(h).minutes,
			seconds: F(h).seconds,
			"disabled-times-config": F(_),
			"validate-time": F(x),
			"no-overlay-focus": t.noOverlayFocus,
			onMount: r[4] ||= (e) => de(F(tt).timePicker),
			"onUpdate:hours": r[5] ||= (e) => F(P)({
				hours: e,
				minutes: F(h).minutes,
				seconds: F(h).seconds
			}),
			"onUpdate:minutes": r[6] ||= (e) => F(P)({
				hours: F(h).hours,
				minutes: e,
				seconds: F(h).seconds
			}),
			"onUpdate:seconds": r[7] ||= (e) => F(P)({
				hours: F(h).hours,
				minutes: F(h).minutes,
				seconds: e
			}),
			onResetFlow: r[8] ||= (e) => n.$emit("reset-flow")
		}, c({ _: 2 }, [k(F(ue), (e, t) => ({
			name: e,
			fn: B((t) => [A(n.$slots, e, y(f(t)))])
		}))]), 1032, [
			"hours",
			"minutes",
			"seconds",
			"disabled-times-config",
			"validate-time",
			"no-overlay-focus"
		])])])) : a("", !0)], 64));
	}
}), lr = (e, t) => {
	let { getDate: n, modelValue: i, year: a, calendars: o, defaults: { highlight: s, range: c, multiDates: l } } = Q(), { isDateBetween: u, isDateEqual: d } = Ht(), { checkRangeAutoApply: f, handleMultiDatesSelect: p, setMonthOrYearRange: m } = wn();
	ut();
	let { isDisabled: h } = dt(), { formatQuarterText: g } = Wt(), { selectYear: _, groupedYears: v, showYearPicker: y, isDisabled: b, toggleYearPicker: x, handleYearSelect: C, handleYear: w, setStartDate: T } = Cn(t), E = O();
	S(() => {
		T();
	});
	let D = r(() => (e) => i.value ? Array.isArray(i.value) ? i.value.some((t) => De(e, t)) : De(i.value, e) : !1), k = (e) => {
		if (c.value.enabled) {
			if (Array.isArray(i.value)) {
				let t = d(e, i.value[0]) || d(e, i.value[1]);
				return u(i.value, E.value, e) && !t;
			}
			return !1;
		}
		return !1;
	}, A = (e, t) => e.quarter === be(t) && e.year === X(t), j = (e) => typeof s.value == "function" ? s.value({
		quarter: be(e),
		year: X(e)
	}) : s.value.quarters.some((t) => A(t, e)), M = r(() => (e) => {
		let t = Z(n(), { year: a.value(e) });
		return de({
			start: Re(t),
			end: me(t)
		}).map((e) => {
			let t = Ie(e), n = fe(e), r = h(e), i = k(t), a = j(t);
			return {
				text: g(t, n),
				value: t,
				active: D.value(t),
				highlighted: a,
				disabled: r,
				isBetween: i
			};
		});
	}), N = (e) => {
		p(e, l.value.limit), t("auto-apply", !0);
	}, P = (e) => {
		i.value = m(e), f(i.value, t, i.value.length < 2);
	}, F = (e) => {
		i.value = e, t("auto-apply");
	};
	return {
		groupedYears: v,
		year: a,
		isDisabled: b,
		quarters: M,
		showYearPicker: y,
		modelValue: i,
		selectYear: _,
		toggleYearPicker: x,
		handleYearSelect: C,
		handleYear: w,
		setHoverDate: (e) => {
			E.value = e;
		},
		selectQuarter: (e, t, n) => {
			if (!n) return o.value[t].month = Y(fe(e)), l.value.enabled ? N(e) : c.value.enabled ? P(e) : F(e);
		}
	};
}, ur = { class: "dp--quarter-items" }, dr = [
	"data-test-id",
	"disabled",
	"onClick",
	"onMouseover"
], fr = /* @__PURE__ */ d({
	__name: "QuarterPicker",
	props: {
		flowStep: {},
		collapse: { type: Boolean },
		menuWrapRef: {},
		noOverlayFocus: { type: Boolean }
	},
	emits: ["reset-flow", "auto-apply"],
	setup(t, { expose: n, emit: r }) {
		let d = r, f = t, { defaults: { config: p } } = Q(), m = I(), { boolHtmlAttribute: h } = qt(), _ = Qt(m, Yt.YearMode), { groupedYears: y, year: x, isDisabled: S, quarters: C, modelValue: T, showYearPicker: E, setHoverDate: D, selectQuarter: O, toggleYearPicker: j, handleYearSelect: N, handleYear: P } = lr(f, d);
		return n({ getSidebarProps: () => ({
			modelValue: T,
			year: x,
			selectQuarter: O,
			handleYearSelect: N,
			handleYear: P
		}) }), (n, r) => (w(), i(vn, {
			collapse: t.collapse,
			stretch: ""
		}, {
			default: B(({ instances: t, wrapClass: r }) => [(w(!0), o(e, null, k(t, (t) => (w(), o("div", {
				key: t,
				class: v(r)
			}, [s("div", {
				class: "dp-quarter-picker-wrap",
				style: b({ minHeight: `${F(p).modeHeight}px` })
			}, [
				n.$slots["top-extra"] ? A(n.$slots, "top-extra", {
					key: 0,
					value: F(T)
				}) : a("", !0),
				s("div", null, [u(Sn, {
					items: F(y)(t),
					instance: t,
					"show-year-picker": F(E)[t],
					year: F(x)(t),
					"is-disabled": (e) => F(S)(t, e),
					onHandleYear: (e) => F(P)(t, e),
					onYearSelect: (e) => F(N)(e, t),
					onToggleYearPicker: (e) => F(j)(t, e?.flow, e?.show)
				}, c({ _: 2 }, [k(F(_), (e, t) => ({
					name: e,
					fn: B((t) => [A(n.$slots, e, g({ ref_for: !0 }, t))])
				}))]), 1032, [
					"items",
					"instance",
					"show-year-picker",
					"year",
					"is-disabled",
					"onHandleYear",
					"onYearSelect",
					"onToggleYearPicker"
				])]),
				s("div", ur, [(w(!0), o(e, null, k(F(C)(t), (e, r) => (w(), o("div", { key: r }, [s("button", {
					type: "button",
					class: v(["dp--btn-base dp--qr-btn", {
						"dp--active": e.active,
						"dp--qr-btn-between": e.isBetween,
						"dp--qr-btn-disabled": e.disabled,
						"dp--highlighted": e.highlighted
					}]),
					"data-dp-action-element": "0",
					"data-test-id": e.value,
					disabled: F(h)(e.disabled),
					onClick: (n) => F(O)(e.value, t, e.disabled),
					onMouseover: (t) => F(D)(e.value)
				}, [A(n.$slots, "quarter", {
					value: e.value,
					text: e.text
				}, () => [l(M(e.text), 1)])], 42, dr)]))), 128))])
			], 4)], 2))), 128))]),
			_: 3
		}, 8, ["collapse"]));
	}
}), pr = [
	"id",
	"tabindex",
	"role",
	"aria-label"
], mr = {
	key: 0,
	class: "dp--menu-load-container"
}, hr = {
	key: 1,
	class: "dp--menu-header"
}, gr = ["data-dp-mobile"], _r = {
	key: 0,
	class: "dp--sidebar-left"
}, vr = ["data-dp-mobile"], yr = [
	"data-test-id",
	"data-dp-mobile",
	"onClick",
	"onKeydown"
], br = { class: "dp--instance-calendar" }, xr = {
	key: 2,
	class: "dp--sidebar-right"
}, Sr = {
	key: 2,
	class: "dp--action-extra"
}, Cr = /* @__PURE__ */ d({
	__name: "DatepickerMenu",
	props: {
		collapse: { type: Boolean },
		noOverlayFocus: { type: Boolean },
		getInputRect: { type: Function }
	},
	emits: [
		"close-picker",
		"select-date",
		"auto-apply",
		"time-update",
		"menu-blur"
	],
	setup(t, { expose: n, emit: l }) {
		let u = l, d = I(), { state: p, rootProps: m, defaults: { textInput: h, inline: g, config: _, ui: x, ariaLabels: T }, setState: E } = Q(), { isMobile: D } = Ut(), { handleEventPropagation: N, getElWithin: R, checkStopPropagation: z, checkKeyDown: V } = Vt();
		st();
		let H = L("inner-menu"), ee = L("dp-menu"), W = L("dyn-cmp"), ne = O(0), G = O(!1), re = O(!1), { flowStep: ie, updateFlowStep: ae, childMount: K, resetFlow: oe, handleFlow: q } = ft(W), J = (e) => {
			re.value = !0, _.value.allowPreventDefault && e.preventDefault(), z(e, _.value, !0);
		};
		S(() => {
			G.value = !0, se(), globalThis.addEventListener("resize", se);
			let e = te(ee);
			e && !h.value.enabled && !g.value.enabled && E("menuFocused", !0), e && (e.addEventListener("pointerdown", J), e.addEventListener("mousedown", J)), document.addEventListener("mousedown", Ee);
		}), C(() => {
			globalThis.removeEventListener("resize", se), document.removeEventListener("mousedown", Ee);
			let e = te(ee);
			e && (e.removeEventListener("pointerdown", J), e.removeEventListener("mousedown", J));
		});
		let se = () => {
			let e = te(H);
			e && (ne.value = e.getBoundingClientRect().width);
		}, ce = r(() => m.monthPicker ? En : m.yearPicker ? On : m.timePicker ? Wn : m.quarterPicker ? fr : cr), le = () => {
			let e = te(ee);
			e && e.focus({ preventScroll: !0 });
		}, ue = r(() => W.value?.getSidebarProps() || {}), de = Qt(d, Yt.ActionRow), fe = Qt(d, Yt.PassTrough), pe = r(() => ({
			"dp--menu-unclickable dp--menu-disabled": m.disabled,
			"dp--menu-unclickable dp--menu-readonly": m.readonly,
			"dp--menu-unclickable dp-menu-loading": m.loading
		})), me = r(() => ({
			"dp--menu": !0,
			"dp--menu-index": !g.value.enabled,
			"dp--relative": g.value.enabled,
			...x.value.menu
		})), he = (e) => {
			z(e, _.value, !0);
		}, ge = (e) => {
			_.value.escClose && (u("close-picker"), N(e, _.value));
		}, _e = (e) => {
			m.arrowNavigation || (e === it.left || e === it.up ? be("handleArrow", it.left, 0, e === it.up) : be("handleArrow", it.right, 0, e === it.down));
		}, ve = (e) => {
			E("shiftKeyInMenu", e.shiftKey), !m.hideMonthYearSelect && e.code === $.tab && e.target.classList.contains("dp--menu") && p.shiftKeyInMenu && (e.preventDefault(), z(e, _.value, !0), u("close-picker"));
		}, ye = (e) => {
			W.value?.toggleTimePicker(!1, !1), W.value?.toggleMonthPicker(!1, !1, e), W.value?.toggleYearPicker(!1, !1, e);
		}, Y = (e, t = 0) => e === "month" ? W.value?.toggleMonthPicker(!1, !0, t) : e === "year" ? W.value?.toggleYearPicker(!1, !0, t) : e === "time" ? W.value?.toggleTimePicker(!0, !1) : ye(t), be = (e, ...t) => {
			W.value?.[e] && W.value?.[e](...t);
		}, xe = () => {
			be("selectCurrentDate");
		}, Se = (e) => {
			be("presetDate", P(e));
		}, X = () => {
			be("clearHoverDate");
		}, Ce = (e, t) => {
			be("updateMonthYear", e, t);
		}, we = (e, t) => {
			e.preventDefault(), _e(t);
		}, Te = (e) => {
			if (ve(e), e.key === $.home || e.key === $.end) return be("selectWeekDate", e.key === $.home, e.target.getAttribute("id"));
			switch ((e.key === $.pageUp || e.key === $.pageDown) && (e.shiftKey ? (be("changeYear", e.key === $.pageUp), R(ee.value, "overlay-year")?.focus()) : (be("changeMonth", e.key === $.pageUp), R(ee.value, e.key === $.pageUp ? "action-prev" : "action-next")?.focus()), e.target.getAttribute("id") && ee.value?.focus({ preventScroll: !0 })), e.key) {
				case $.esc: return ge(e);
				case $.arrowLeft: return we(e, it.left);
				case $.arrowRight: return we(e, it.right);
				case $.arrowUp: return we(e, it.up);
				case $.arrowDown: return we(e, it.down);
				default: return;
			}
		}, Ee = (e) => {
			g.value.enabled && !g.value.input && !ee.value?.contains(e.target) && re.value && (re.value = !1, u("menu-blur"));
		};
		return n({
			updateMonthYear: Ce,
			switchView: Y,
			onValueCleared: () => {
				W.value?.setStartTime?.();
			},
			handleFlow: q
		}), (n, r) => (w(), o("div", {
			id: F(m).menuId,
			ref: "dp-menu",
			tabindex: F(g).enabled ? void 0 : "0",
			role: F(g).enabled ? void 0 : "dialog",
			"aria-label": F(T)?.menu,
			class: v(me.value),
			onMouseleave: X,
			onClick: he,
			onKeydown: Te
		}, [
			(F(m).disabled || F(m).readonly) && F(g).enabled || F(m).loading ? (w(), o("div", {
				key: 0,
				class: v(pe.value)
			}, [F(m).loading ? (w(), o("div", mr, [...r[5] ||= [s("span", { class: "dp--menu-loader" }, null, -1)]])) : a("", !0)], 2)) : a("", !0),
			n.$slots["menu-header"] ? (w(), o("div", hr, [A(n.$slots, "menu-header")])) : a("", !0),
			A(n.$slots, "arrow"),
			s("div", {
				ref: "inner-menu",
				class: v({
					"dp--menu-content-wrapper": F(m).presetDates?.length || !!n.$slots["left-sidebar"] || !!n.$slots["right-sidebar"],
					"dp--menu-content-wrapper-collapsed": t.collapse && (F(m).presetDates?.length || !!n.$slots["left-sidebar"] || !!n.$slots["right-sidebar"])
				}),
				"data-dp-mobile": F(D),
				style: b({ "--dp-menu-width": `${ne.value}px` })
			}, [
				n.$slots["left-sidebar"] ? (w(), o("div", _r, [A(n.$slots, "left-sidebar", y(f(ue.value)))])) : a("", !0),
				F(m).presetDates.length ? (w(), o("div", {
					key: 1,
					class: v({
						"dp--preset-dates-collapsed": t.collapse,
						"dp--preset-dates": !0
					}),
					"data-dp-mobile": F(D)
				}, [(w(!0), o(e, null, k(F(m).presetDates, (r, i) => (w(), o(e, { key: i }, [r.slot ? A(n.$slots, r.slot, {
					key: 0,
					presetDate: Se,
					label: r.label,
					value: r.value
				}) : (w(), o("button", {
					key: 1,
					type: "button",
					style: b(r.style || {}),
					class: v(["dp--btn dp--preset-range", { "dp--preset-range-collapsed": t.collapse }]),
					"data-test-id": r.testId ?? void 0,
					"data-dp-mobile": F(D),
					onClick: U((e) => Se(r.value), ["prevent"]),
					onKeydown: (e) => F(V)(e, () => Se(r.value), !0)
				}, M(r.label), 47, yr))], 64))), 128))], 10, vr)) : a("", !0),
				s("div", br, [(w(), i(j(ce.value), {
					ref: "dyn-cmp",
					"flow-step": F(ie),
					collapse: t.collapse,
					"no-overlay-focus": t.noOverlayFocus,
					"menu-wrap-ref": ee.value,
					onMount: F(K),
					onUpdateFlowStep: F(ae),
					onResetFlow: F(oe),
					onFocusMenu: le,
					onSelectDate: r[0] ||= (e) => n.$emit("select-date"),
					onAutoApply: r[1] ||= (e) => n.$emit("auto-apply", e),
					onTimeUpdate: r[2] ||= (e) => n.$emit("time-update")
				}, c({ _: 2 }, [k(F(fe), (e, t) => ({
					name: e,
					fn: B((t) => [A(n.$slots, e, y(f({ ...t })))])
				}))]), 1064, [
					"flow-step",
					"collapse",
					"no-overlay-focus",
					"menu-wrap-ref",
					"onMount",
					"onUpdateFlowStep",
					"onResetFlow"
				]))]),
				n.$slots["right-sidebar"] ? (w(), o("div", xr, [A(n.$slots, "right-sidebar", y(f(ue.value)))])) : a("", !0)
			], 14, gr),
			n.$slots["action-extra"] ? (w(), o("div", Sr, [n.$slots["action-extra"] ? A(n.$slots, "action-extra", {
				key: 0,
				selectCurrentDate: xe
			}) : a("", !0)])) : a("", !0),
			!F(m).autoApply || F(_).keepActionRow ? (w(), i(un, {
				key: 3,
				"menu-mount": G.value,
				"calendar-width": ne.value,
				onClosePicker: r[3] ||= (e) => n.$emit("close-picker"),
				onSelectDate: r[4] ||= (e) => n.$emit("select-date"),
				onSelectNow: xe
			}, c({ _: 2 }, [k(F(de), (e, t) => ({
				name: e,
				fn: B((t) => [A(n.$slots, e, y(f(t)))])
			}))]), 1032, ["menu-mount", "calendar-width"])) : a("", !0)
		], 42, pr));
	}
}), wr = ["data-dp-mobile"], Tr = /* @__PURE__ */ d({
	__name: "VueDatePicker",
	setup(e, { expose: l }) {
		let { rootEmit: d, setState: p, inputValue: m, modelValue: h, rootProps: g, defaults: { inline: x, config: T, textInput: E, range: D, multiDates: j, teleport: M, floatingConfig: P } } = Q(), { validateDate: R, isValidTime: V } = dt(), { menuTransition: H, showTransition: U } = lt(), { isMobile: te } = Ut(), { findNextFocusableElement: W, getNumVal: oe } = Vt(), q = I(), J = O(!1), se = O(x.value.enabled), ce = O(x.value.enabled || g.centered), le = N(g, "modelValue"), ue = N(g, "timezone"), de = L("dp-menu-wrap"), fe = L("dp-menu"), pe = L("input-cmp"), me = L("picker-wrapper"), he = L("menu-arrow"), ge = O(!1), _e = O(!1), ve = O(!1), ye = O(!0), { floatingStyles: Y, middlewareData: be, placement: xe, y: Se } = K(pe, de, {
			strategy: P.value.strategy,
			placement: P.value.placement,
			middleware: ((e) => (P.value.arrow && e.push(ne({ element: P.value.arrow === !0 ? he : P.value.arrow })), P.value.flip && e.push(re(typeof P.value.flip == "object" ? P.value.flip : {})), P.value.shift && e.push(ae(typeof P.value.shift == "object" ? P.value.shift : {})), e))([ie(P.value.offset)]),
			whileElementsMounted: G
		});
		S(() => {
			we(g.modelValue), _().then(() => {
				x.value.enabled || globalThis.addEventListener("resize", Me);
			}), x.value.enabled && (J.value = !0), globalThis.addEventListener("keyup", Ne), globalThis.addEventListener("keydown", Pe);
		}), C(() => {
			x.value.enabled || globalThis.removeEventListener("resize", Me), globalThis.removeEventListener("keyup", Ne), globalThis.removeEventListener("keydown", Pe);
		});
		let X = $t(q, g.presetDates), Ce = Qt(q, Yt.Input);
		z([le, ue], () => {
			we(le.value);
		}, { deep: !0 }), z([xe, Se], () => {
			!x.value.enabled && !g.centered && ye.value && (ce.value = !1, _().then(() => {
				ye.value = !1, ce.value = !0;
			}));
		});
		let { parseExternalModelValue: we, emitModelValue: Te, formatInputValue: Ee, checkBeforeEmit: De } = ct(), Oe = r(() => ({
			"dp--main": !0,
			"dp--theme-dark": g.dark,
			"dp--theme-light": !g.dark,
			"dp--flex-display": x.value.enabled,
			"dp--flex-display-collapsed": ve.value,
			"dp--flex-display-with-input": x.value.input
		})), ke = r(() => g.dark ? "dp--theme-dark" : "dp--theme-light"), Ae = r(() => x.value.enabled && (g.timePicker || g.monthPicker || g.yearPicker || g.quarterPicker)), Z = () => pe.value?.$el?.getBoundingClientRect() ?? {
			width: 0,
			left: 0,
			right: 0
		}, je = () => {
			J.value && T.value.closeOnScroll && Ue();
		}, Me = () => {
			let e = fe.value?.$el.getBoundingClientRect().width ?? 0;
			ve.value = document.body.offsetWidth <= e;
		}, Ne = (e) => {
			e.key === "Tab" && !x.value.enabled && !g.teleport && T.value.tabOutClosesMenu && (me.value.contains(document.activeElement) || Ue()), _e.value = e.shiftKey;
		}, Pe = (e) => {
			_e.value = e.shiftKey;
		}, Fe = () => {
			!g.disabled && !g.readonly && (ye.value = !0, se.value = !0, J.value = !0, J.value && d("open"), J.value || He(), we(g.modelValue));
		}, Ie = () => {
			m.value = "", He(), fe.value?.onValueCleared(), pe.value?.setParsedDate(null), d("update:model-value", null), d("cleared"), T.value.closeOnClearValue && Ue();
		}, Le = () => {
			let e = h.value;
			return !e || !Array.isArray(e) && R(e) ? !0 : Array.isArray(e) ? j.value.enabled || e.length === 2 && R(e[0]) && R(e[1]) ? !0 : D.value.partialRange && !g.timePicker ? R(e[0]) : !1 : !1;
		}, Re = () => {
			De() && Le() ? (Te(), Ue()) : d("invalid-select");
		}, ze = (e) => {
			Be(), Te(), T.value.closeOnAutoApply && !e && Ue();
		}, Be = () => {
			pe.value && E.value.enabled && pe.value.setParsedDate(h.value);
		}, Ve = (e = !1) => {
			g.autoApply && V(h.value) && Le() && (D.value.enabled && Array.isArray(h.value) ? (D.value.partialRange || h.value.length === 2) && ze(e) : ze(e));
		}, He = () => {
			E.value.enabled || (h.value = null);
		}, Ue = (e = !1) => {
			ye.value = !0, e && h.value && T.value.setDateOnMenuClose && Re(), x.value.enabled || (J.value && (J.value = !1, p("menuFocused", !1), p("shiftKeyInMenu", !1), d("closed"), m.value && we(le.value)), He(), d("blur"));
		}, We = () => {
			!x.value.enabled && !J.value && (se.value = !1);
		}, Ge = (e, t, n = !1) => {
			if (!e) {
				h.value = null;
				return;
			}
			let r = Array.isArray(e) ? e.every((e) => R(e)) : R(e), i = V(e);
			r && i ? (p("isTextInputDate", !0), h.value = e, t ? (ge.value = n, Re(), d("text-submit")) : g.autoApply && Ve(!0), _().then(() => {
				p("isTextInputDate", !1);
			})) : d("invalid-date", e);
		}, Ke = () => {
			g.autoApply && V(h.value) && Te(), Be();
		}, qe = () => J.value ? Ue() : Fe(), Je = (e) => {
			h.value = e;
		}, Ye = () => {
			E.value.enabled && (p("isInputFocused", !0), Ee()), d("focus");
		}, Xe = () => {
			E.value.enabled && (p("isInputFocused", !1), we(g.modelValue), ge.value && W(me.value, _e.value)?.focus()), d("blur");
		}, Ze = (e, t) => {
			fe.value && fe.value.updateMonthYear(t ?? 0, {
				month: oe(e.month),
				year: oe(e.year)
			});
		}, Qe = (e) => {
			we(e ?? g.modelValue);
		}, $e = (e, t) => {
			fe.value?.switchView(e, t);
		}, et = (e, t) => {
			if (J.value) return T.value.onClickOutside ? T.value.onClickOutside(e, t) : Ue(!0);
		};
		return ee(de, (e) => et(Le, e), { ignore: [pe] }), l({
			closeMenu: Ue,
			selectDate: Re,
			clearValue: Ie,
			openMenu: Fe,
			onScroll: je,
			formatInputValue: Ee,
			updateInternalModelValue: Je,
			setMonthYear: Ze,
			parseModel: Qe,
			switchView: $e,
			toggleMenu: qe,
			handleFlow: (e = 0) => {
				fe.value?.handleFlow(e);
			},
			getDpWrapMenuRef: () => de,
			dpMenuRef: () => fe,
			dpWrapMenuRef: () => de,
			inputRef: () => pe
		}), (e, r) => (w(), o("div", {
			ref: "picker-wrapper",
			class: v(Oe.value),
			"data-datepicker-instance": "",
			"data-dp-mobile": F(te)
		}, [u(an, {
			ref: "input-cmp",
			"is-menu-open": J.value,
			onClear: Ie,
			onOpen: Fe,
			onSetInputDate: Ge,
			onSetEmptyDate: F(Te),
			onSelectDate: Re,
			onToggle: qe,
			onClose: Ue,
			onFocus: Ye,
			onBlur: Xe,
			onRealBlur: r[0] ||= (e) => F(p)("isInputFocused", !1)
		}, c({ _: 2 }, [k(F(Ce), (t, n) => ({
			name: t,
			fn: B((n) => [A(e.$slots, t, y(f(n)))])
		}))]), 1032, ["is-menu-open", "onSetEmptyDate"]), u(t, {
			to: F(M),
			disabled: !F(M)
		}, {
			default: B(() => [se.value ? (w(), o("div", {
				key: 0,
				ref: "dp-menu-wrap",
				class: v({
					"dp--menu-wrapper": !F(x).enabled,
					"dp--outer-menu-wrap": !0,
					"dp--centered": F(g).centered
				}),
				style: b(!F(x).enabled && !F(g).centered ? F(Y) : void 0)
			}, [u(n, {
				name: F(H)(F(xe).startsWith("top")),
				css: F(U) && !F(x).enabled && !F(g).centered && ce.value,
				appear: "",
				onAfterLeave: We
			}, {
				default: B(() => [J.value && ce.value ? (w(), i(Cr, {
					key: 0,
					ref: "dp-menu",
					class: v({ [ke.value]: !0 }),
					"no-overlay-focus": Ae.value,
					collapse: ve.value,
					"get-input-rect": Z,
					onClosePicker: Ue,
					onSelectDate: Re,
					onAutoApply: Ve,
					onTimeUpdate: Ke,
					onMenuBlur: r[1] ||= (e) => F(d)("blur")
				}, c({ _: 2 }, [k(F(X), (t, n) => ({
					name: t,
					fn: B((n) => [A(e.$slots, t, y(f({ ...n })))])
				})), !F(x).enabled && !F(g).centered && F(P).arrow === !0 ? {
					name: "arrow",
					fn: B(() => [s("div", {
						ref: "menu-arrow",
						class: v({
							"dp--arrow-top": F(xe) === "bottom",
							"dp--arrow-bottom": F(xe) === "top"
						}),
						style: b({
							left: F(be).arrow?.x == null ? "" : `${F(be).arrow.x}px`,
							top: F(be).arrow?.y == null ? "" : `${F(be).arrow.y}px`
						})
					}, null, 6)]),
					key: "0"
				} : void 0]), 1032, [
					"class",
					"no-overlay-focus",
					"collapse"
				])) : a("", !0)]),
				_: 3
			}, 8, ["name", "css"])], 6)) : a("", !0)]),
			_: 3
		}, 8, ["to", "disabled"])], 10, wr));
	}
}), Er = /* @__PURE__ */ d({
	__name: "VueDatePickerRoot",
	props: /* @__PURE__ */ h({
		multiCalendars: { type: [
			Boolean,
			Number,
			String,
			Object
		] },
		modelValue: {},
		modelType: {},
		dark: { type: Boolean },
		transitions: { type: [Boolean, Object] },
		ariaLabels: {},
		hideNavigation: {},
		timezone: {},
		vertical: { type: Boolean },
		hideMonthYearSelect: { type: Boolean },
		disableYearSelect: { type: Boolean },
		yearRange: {},
		autoApply: { type: Boolean },
		disabledDates: { type: [Array, Function] },
		startDate: {},
		hideOffsetDates: { type: Boolean },
		noToday: { type: Boolean },
		allowedDates: {},
		markers: {},
		presetDates: {},
		flow: {},
		preventMinMaxNavigation: { type: Boolean },
		reverseYears: { type: Boolean },
		weekPicker: { type: Boolean },
		filters: {},
		arrowNavigation: { type: Boolean },
		highlight: { type: [Function, Object] },
		teleport: { type: [Boolean, String] },
		centered: { type: Boolean },
		locale: {},
		weekStart: {},
		weekNumbers: { type: [Boolean, Object] },
		dayNames: { type: [Function, Array] },
		monthPicker: { type: Boolean },
		yearPicker: { type: Boolean },
		modelAuto: { type: Boolean },
		formats: {},
		multiDates: { type: [Boolean, Object] },
		minDate: {},
		maxDate: {},
		minTime: {},
		maxTime: {},
		inputAttrs: {},
		timeConfig: {},
		placeholder: {},
		timePicker: { type: Boolean },
		range: { type: [Boolean, Object] },
		menuId: {},
		disabled: { type: Boolean },
		readonly: { type: Boolean },
		inline: { type: [Boolean, Object] },
		textInput: { type: [Boolean, Object] },
		sixWeeks: { type: [Boolean, String] },
		actionRow: {},
		focusStartDate: { type: Boolean },
		disabledTimes: { type: [Function, Array] },
		calendar: { type: Function },
		config: {},
		quarterPicker: { type: Boolean },
		yearFirst: { type: Boolean },
		loading: { type: Boolean },
		ui: {},
		floating: {}
	}, Lt),
	emits: [
		"update:model-value",
		"internal-model-change",
		"text-submit",
		"text-input",
		"open",
		"closed",
		"focus",
		"blur",
		"cleared",
		"flow-step",
		"update-month-year",
		"invalid-select",
		"invalid-fixed-range",
		"invalid-date",
		"tooltip-open",
		"tooltip-close",
		"am-pm-change",
		"range-start",
		"range-end",
		"date-click",
		"overlay-toggle",
		"invalid"
	],
	setup(e, { expose: t, emit: n }) {
		let r = n, a = e;
		$e(a, r);
		let o = $t(I(), a.presetDates);
		return t(Kt(L("date-picker"))), (e, t) => (w(), i(Tr, { ref: "date-picker" }, c({ _: 2 }, [k(F(o), (t, n) => ({
			name: t,
			fn: B((n) => [A(e.$slots, t, y(f(n)))])
		}))]), 1536));
	}
});
//#endregion
export { Ue as TZDate, Er as VueDatePicker, ot as WeekStart };
