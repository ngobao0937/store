/*
: Copyright (c) 2012-2019 Dan Grossman. All rights reserved.
@license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
@website: http://www.daterangepicker.com/
*/
var $jscomp = {
    scope: {},
    findInternal: function (e, f, k) {
        e instanceof String && (e = String(e));
        for (var c = e.length, a = 0; a < c; a++) {
            var b = e[a];
            if (f.call(k, b, a, e)) return {
                i: a,
                v: b
            }
        }
        return {
            i: -1,
            v: void 0
        }
    }
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (e, f, k) {
    if (k.get || k.set) throw new TypeError("ES3 does not support getters and setters.");
    e != Array.prototype && e != Object.prototype && (e[f] = k.value)
};
$jscomp.getGlobal = function (e) {
    return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (e, f, k, c) {
    if (f) {
        k = $jscomp.global;
        e = e.split(".");
        for (c = 0; c < e.length - 1; c++) {
            var a = e[c];
            a in k || (k[a] = {});
            k = k[a]
        }
        e = e[e.length - 1];
        c = k[e];
        f = f(c);
        f != c && null != f && $jscomp.defineProperty(k, e, {
            configurable: !0,
            writable: !0,
            value: f
        })
    }
};
$jscomp.polyfill("Array.prototype.find", function (e) {
    return e ? e : function (f, e) {
        return $jscomp.findInternal(this, f, e).v
    }
}, "es6-impl", "es3");
(function (e, f) {
    if ("function" === typeof define && define.amd) define(["moment", "jquery"], function (a, b) {
        b.fn || (b.fn = {});
        "function" !== typeof a && a.hasOwnProperty("default") && (a = a["default"]);
        return f(a, b)
    });
    else if ("object" === typeof module && module.exports) {
        var k = "undefined" != typeof window ? window.jQuery : void 0;
        k || (k = require("jquery"), k.fn || (k.fn = {}));
        var c = "undefined" != typeof window && "undefined" != typeof window.moment ? window.moment : require("moment");
        module.exports = f(c, k)
    } else e.daterangepicker = f(e.moment, e.jQuery)
})("undefined" !==
    typeof window ? window : this,
    function (e, f) {
        var k = function (c, a, b) {
            this.parentEl = "body";
            this.element = f(c);
            this.startDate = e().startOf("day");
            this.endDate = e().endOf("day");
            this.showDropdowns = this.singleDatePicker = this.autoApply = this.maxSpan = this.maxDate = this.minDate = !1;
            this.minYear = e().subtract(100, "year").format("YYYY");
            this.maxYear = e().add(100, "year").format("YYYY");
            this.showISOWeekNumbers = this.showWeekNumbers = !1;
            this.showCustomRangeLabel = !0;
            this.timePicker24Hour = this.timePicker = !1;
            this.timePickerIncrement =
                1;
            this.timePickerSeconds = !1;
            this.autoUpdateInput = this.linkedCalendars = !0;
            this.alwaysShowCalendars = !1;
            this.ranges = {};
            this.opens = "right";
            this.element.hasClass("pull-right") && (this.opens = "left");
            this.drops = "down";
            this.element.hasClass("dropup") && (this.drops = "up");
            this.buttonClasses = "btn btn-sm";
            this.applyButtonClasses = "btn-primary";
            this.cancelButtonClasses = "btn-default";
            this.locale = {
                direction: "ltr",
                format: e.localeData().longDateFormat("L"),
                separator: " - ",
                applyLabel: "Apply",
                cancelLabel: "Cancel",
                weekLabel: "W",
                customRangeLabel: "Custom Range",
                daysOfWeek: e.weekdaysMin(),
                monthNames: e.monthsShort(),
                firstDay: e.localeData().firstDayOfWeek()
            };
            this.callback = function () { };
            this.isShowing = !1;
            this.leftCalendar = {};
            this.rightCalendar = {};
            if ("object" !== typeof a || null === a) a = {};
            a = f.extend(this.element.data(), a);
            "string" === typeof a.template || a.template instanceof f || (a.template = '<div class="daterangepicker"><div class="ranges"></div><div class="drp-calendar left"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-calendar right"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-buttons"><span class="drp-selected"></span><button class="cancelBtn" type="button"></button><button class="applyBtn" disabled="disabled" type="button"></button> </div></div>');
            this.parentEl = a.parentEl && f(a.parentEl).length ? f(a.parentEl) : f(this.parentEl);
            this.container = f(a.template).appendTo(this.parentEl);
            if ("object" === typeof a.locale && ("string" === typeof a.locale.direction && (this.locale.direction = a.locale.direction), "string" === typeof a.locale.format && (this.locale.format = a.locale.format), "string" === typeof a.locale.separator && (this.locale.separator = a.locale.separator), "object" === typeof a.locale.daysOfWeek && (this.locale.daysOfWeek = a.locale.daysOfWeek.slice()), "object" === typeof a.locale.monthNames &&
                (this.locale.monthNames = a.locale.monthNames.slice()), "number" === typeof a.locale.firstDay && (this.locale.firstDay = a.locale.firstDay), "string" === typeof a.locale.applyLabel && (this.locale.applyLabel = a.locale.applyLabel), "string" === typeof a.locale.cancelLabel && (this.locale.cancelLabel = a.locale.cancelLabel), "string" === typeof a.locale.weekLabel && (this.locale.weekLabel = a.locale.weekLabel), "string" === typeof a.locale.customRangeLabel)) {
                var d = document.createElement("textarea");
                d.innerHTML = a.locale.customRangeLabel;
                d = d.value;
                this.locale.customRangeLabel = d
            }
            this.container.addClass(this.locale.direction);
            "string" === typeof a.startDate && (this.startDate = e(a.startDate, this.locale.format));
            "string" === typeof a.endDate && (this.endDate = e(a.endDate, this.locale.format));
            "string" === typeof a.minDate && (this.minDate = e(a.minDate, this.locale.format));
            "string" === typeof a.maxDate && (this.maxDate = e(a.maxDate, this.locale.format));
            "object" === typeof a.startDate && (this.startDate = e(a.startDate));
            "object" === typeof a.endDate && (this.endDate =
                e(a.endDate));
            "object" === typeof a.minDate && (this.minDate = e(a.minDate));
            "object" === typeof a.maxDate && (this.maxDate = e(a.maxDate));
            this.minDate && this.startDate.isBefore(this.minDate) && (this.startDate = this.minDate.clone());
            this.maxDate && this.endDate.isAfter(this.maxDate) && (this.endDate = this.maxDate.clone());
            "string" === typeof a.applyButtonClasses && (this.applyButtonClasses = a.applyButtonClasses);
            "string" === typeof a.applyClass && (this.applyButtonClasses = a.applyClass);
            "string" === typeof a.cancelButtonClasses &&
                (this.cancelButtonClasses = a.cancelButtonClasses);
            "string" === typeof a.cancelClass && (this.cancelButtonClasses = a.cancelClass);
            "object" === typeof a.maxSpan && (this.maxSpan = a.maxSpan);
            "object" === typeof a.dateLimit && (this.maxSpan = a.dateLimit);
            "string" === typeof a.opens && (this.opens = a.opens);
            "string" === typeof a.drops && (this.drops = a.drops);
            "boolean" === typeof a.showWeekNumbers && (this.showWeekNumbers = a.showWeekNumbers);
            "boolean" === typeof a.showISOWeekNumbers && (this.showISOWeekNumbers = a.showISOWeekNumbers);
            "string" ===
                typeof a.buttonClasses && (this.buttonClasses = a.buttonClasses);
            "object" === typeof a.buttonClasses && (this.buttonClasses = a.buttonClasses.join(" "));
            "boolean" === typeof a.showDropdowns && (this.showDropdowns = a.showDropdowns);
            "number" === typeof a.minYear && (this.minYear = a.minYear);
            "number" === typeof a.maxYear && (this.maxYear = a.maxYear);
            "boolean" === typeof a.showCustomRangeLabel && (this.showCustomRangeLabel = a.showCustomRangeLabel);
            "boolean" === typeof a.singleDatePicker && (this.singleDatePicker = a.singleDatePicker) &&
                (this.endDate = this.startDate.clone());
            "boolean" === typeof a.timePicker && (this.timePicker = a.timePicker);
            "boolean" === typeof a.timePickerSeconds && (this.timePickerSeconds = a.timePickerSeconds);
            "number" === typeof a.timePickerIncrement && (this.timePickerIncrement = a.timePickerIncrement);
            "boolean" === typeof a.timePicker24Hour && (this.timePicker24Hour = a.timePicker24Hour);
            "boolean" === typeof a.autoApply && (this.autoApply = a.autoApply);
            "boolean" === typeof a.autoUpdateInput && (this.autoUpdateInput = a.autoUpdateInput);
            "boolean" ===
                typeof a.linkedCalendars && (this.linkedCalendars = a.linkedCalendars);
            "function" === typeof a.isInvalidDate && (this.isInvalidDate = a.isInvalidDate);
            "function" === typeof a.isCustomDate && (this.isCustomDate = a.isCustomDate);
            "boolean" === typeof a.alwaysShowCalendars && (this.alwaysShowCalendars = a.alwaysShowCalendars);
            if (0 != this.locale.firstDay)
                for (c = this.locale.firstDay; 0 < c;) this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()), c--;
            var p, h;
            if ("undefined" === typeof a.startDate && "undefined" === typeof a.endDate &&
                f(this.element).is(":text")) {
                var d = f(this.element).val(),
                    g = d.split(this.locale.separator);
                c = p = null;
                2 == g.length ? (c = e(g[0], this.locale.format), p = e(g[1], this.locale.format)) : this.singleDatePicker && "" !== d && (c = e(d, this.locale.format), p = e(d, this.locale.format));
                null !== c && null !== p && (this.setStartDate(c), this.setEndDate(p))
            }
            if ("object" === typeof a.ranges) {
                for (h in a.ranges) c = "string" === typeof a.ranges[h][0] ? e(a.ranges[h][0], this.locale.format) : e(a.ranges[h][0]), p = "string" === typeof a.ranges[h][1] ? e(a.ranges[h][1],
                    this.locale.format) : e(a.ranges[h][1]), this.minDate && c.isBefore(this.minDate) && (c = this.minDate.clone()), d = this.maxDate, this.maxSpan && d && c.clone().add(this.maxSpan).isAfter(d) && (d = c.clone().add(this.maxSpan)), d && p.isAfter(d) && (p = d.clone()), this.minDate && p.isBefore(this.minDate, this.timepicker ? "minute" : "day") || d && c.isAfter(d, this.timepicker ? "minute" : "day") || (d = document.createElement("textarea"), d.innerHTML = h, d = d.value, this.ranges[d] = [c, p]);
                c = "<ul>";
                for (h in this.ranges) c += '<li data-range-key="' + h + '">' +
                    h + "</li>";
                this.showCustomRangeLabel && (c += '<li data-range-key="' + this.locale.customRangeLabel + '">' + this.locale.customRangeLabel + "</li>");
                c += "</ul>";
                this.container.find(".ranges").prepend(c)
            }
            "function" === typeof b && (this.callback = b);
            this.timePicker || (this.startDate = this.startDate.startOf("day"), this.endDate = this.endDate.endOf("day"), this.container.find(".calendar-time").hide());
            this.timePicker && this.autoApply && (this.autoApply = !1);
            this.autoApply && this.container.addClass("auto-apply");
            "object" === typeof a.ranges &&
                this.container.addClass("show-ranges");
            this.singleDatePicker && (this.container.addClass("single"), this.container.find(".drp-calendar.left").addClass("single"), this.container.find(".drp-calendar.left").show(), this.container.find(".drp-calendar.right").hide(), !this.timePicker && this.autoApply && this.container.addClass("auto-apply"));
            ("undefined" === typeof a.ranges && !this.singleDatePicker || this.alwaysShowCalendars) && this.container.addClass("show-calendar");
            this.container.addClass("opens" + this.opens);
            this.container.find(".applyBtn, .cancelBtn").addClass(this.buttonClasses);
            this.applyButtonClasses.length && this.container.find(".applyBtn").addClass(this.applyButtonClasses);
            this.cancelButtonClasses.length && this.container.find(".cancelBtn").addClass(this.cancelButtonClasses);
            this.container.find(".applyBtn").html(this.locale.applyLabel);
            this.container.find(".cancelBtn").html(this.locale.cancelLabel);
            this.container.find(".drp-calendar").on("click.daterangepicker", ".prev", f.proxy(this.clickPrev, this)).on("click.daterangepicker", ".next", f.proxy(this.clickNext, this)).on("mousedown.daterangepicker",
                "td.available", f.proxy(this.clickDate, this)).on("mouseenter.daterangepicker", "td.available", f.proxy(this.hoverDate, this)).on("change.daterangepicker", "select.yearselect", f.proxy(this.monthOrYearChanged, this)).on("change.daterangepicker", "select.monthselect", f.proxy(this.monthOrYearChanged, this)).on("change.daterangepicker", "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect", f.proxy(this.timeChanged, this));
            this.container.find(".ranges").on("click.daterangepicker", "li", f.proxy(this.clickRange,
                this));
            this.container.find(".drp-buttons").on("click.daterangepicker", "button.applyBtn", f.proxy(this.clickApply, this)).on("click.daterangepicker", "button.cancelBtn", f.proxy(this.clickCancel, this));
            if (this.element.is("input") || this.element.is("button")) this.element.on({
                "click.daterangepicker": f.proxy(this.show, this),
                "focus.daterangepicker": f.proxy(this.show, this),
                "keyup.daterangepicker": f.proxy(this.elementChanged, this),
                "keydown.daterangepicker": f.proxy(this.keydown, this)
            });
            else this.element.on("click.daterangepicker",
                f.proxy(this.toggle, this)), this.element.on("keydown.daterangepicker", f.proxy(this.toggle, this));
            this.updateElement()
        };
        k.prototype = {
            constructor: k,
            setStartDate: function (c) {
                "string" === typeof c && (this.startDate = e(c, this.locale.format));
                "object" === typeof c && (this.startDate = e(c));
                this.timePicker || (this.startDate = this.startDate.startOf("day"));
                this.timePicker && this.timePickerIncrement && this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
                this.minDate &&
                    this.startDate.isBefore(this.minDate) && (this.startDate = this.minDate.clone(), this.timePicker && this.timePickerIncrement && this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement));
                this.maxDate && this.startDate.isAfter(this.maxDate) && (this.startDate = this.maxDate.clone(), this.timePicker && this.timePickerIncrement && this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement));
                this.isShowing || this.updateElement();
                this.updateMonthsInView()
            },
            setEndDate: function (c) {
                "string" === typeof c && (this.endDate = e(c, this.locale.format));
                "object" === typeof c && (this.endDate = e(c));
                this.timePicker || (this.endDate = this.endDate.endOf("day"));
                this.timePicker && this.timePickerIncrement && this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
                this.endDate.isBefore(this.startDate) && (this.endDate = this.startDate.clone());
                this.maxDate && this.endDate.isAfter(this.maxDate) && (this.endDate = this.maxDate.clone());
                this.maxSpan && this.startDate.clone().add(this.maxSpan).isBefore(this.endDate) && (this.endDate = this.startDate.clone().add(this.maxSpan));
                this.previousRightTime = this.endDate.clone();
                this.container.find(".drp-selected").html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                this.isShowing || this.updateElement();
                this.updateMonthsInView()
            },
            isInvalidDate: function () {
                return !1
            },
            isCustomDate: function () {
                return !1
            },
            updateView: function () {
                this.timePicker && (this.renderTimePicker("left"),
                    this.renderTimePicker("right"), this.endDate ? this.container.find(".right .calendar-time select").prop("disabled", !1).removeClass("disabled") : this.container.find(".right .calendar-time select").prop("disabled", !0).addClass("disabled"));
                this.endDate && this.container.find(".drp-selected").html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                this.updateMonthsInView();
                this.updateCalendars();
                this.updateFormInputs()
            },
            updateMonthsInView: function () {
                if (this.endDate) {
                    if (!this.singleDatePicker &&
                        this.leftCalendar.month && this.rightCalendar.month && (this.startDate.format("YYYY-MM") == this.leftCalendar.month.format("YYYY-MM") || this.startDate.format("YYYY-MM") == this.rightCalendar.month.format("YYYY-MM")) && (this.endDate.format("YYYY-MM") == this.leftCalendar.month.format("YYYY-MM") || this.endDate.format("YYYY-MM") == this.rightCalendar.month.format("YYYY-MM"))) return;
                    this.leftCalendar.month = this.startDate.clone().date(2);
                    this.linkedCalendars || this.endDate.month() == this.startDate.month() && this.endDate.year() ==
                        this.startDate.year() ? this.rightCalendar.month = this.startDate.clone().date(2).add(1, "month") : this.rightCalendar.month = this.endDate.clone().date(2)
                } else this.leftCalendar.month.format("YYYY-MM") != this.startDate.format("YYYY-MM") && this.rightCalendar.month.format("YYYY-MM") != this.startDate.format("YYYY-MM") && (this.leftCalendar.month = this.startDate.clone().date(2), this.rightCalendar.month = this.startDate.clone().date(2).add(1, "month"));
                this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month >
                    this.maxDate && (this.rightCalendar.month = this.maxDate.clone().date(2), this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, "month"))
            },
            updateCalendars: function () {
                if (this.timePicker) {
                    var c, a, b;
                    if (this.endDate) {
                        if (c = parseInt(this.container.find(".left .hourselect").val(), 10), a = parseInt(this.container.find(".left .minuteselect").val(), 10), isNaN(a) && (a = parseInt(this.container.find(".left .minuteselect option:last").val(), 10)), b = this.timePickerSeconds ? parseInt(this.container.find(".left .secondselect").val(),
                            10) : 0, !this.timePicker24Hour) {
                            var d = this.container.find(".left .ampmselect").val();
                            "PM" === d && 12 > c && (c += 12);
                            "AM" === d && 12 === c && (c = 0)
                        }
                    } else c = parseInt(this.container.find(".right .hourselect").val(), 10), a = parseInt(this.container.find(".right .minuteselect").val(), 10), isNaN(a) && (a = parseInt(this.container.find(".right .minuteselect option:last").val(), 10)), b = this.timePickerSeconds ? parseInt(this.container.find(".right .secondselect").val(), 10) : 0, this.timePicker24Hour || (d = this.container.find(".right .ampmselect").val(),
                        "PM" === d && 12 > c && (c += 12), "AM" === d && 12 === c && (c = 0));
                    this.leftCalendar.month.hour(c).minute(a).second(b);
                    this.rightCalendar.month.hour(c).minute(a).second(b)
                }
                this.renderCalendar("left");
                this.renderCalendar("right");
                this.container.find(".ranges li").removeClass("active");
                null != this.endDate && this.calculateChosenLabel()
            },
            renderCalendar: function (c) {
                var a = "left" == c ? this.leftCalendar : this.rightCalendar,
                    b = a.month.month(),
                    d = a.month.year(),
                    p = a.month.hour(),
                    h = a.month.minute(),
                    g = a.month.second(),
                    a = e([d, b]).daysInMonth(),
                    l = e([d, b, 1]),
                    k = e([d, b, a]),
                    b = e(l).subtract(1, "month").month(),
                    d = e(l).subtract(1, "month").year(),
                    m = e([d, b]).daysInMonth(),
                    r = l.day(),
                    a = [];
                a.firstDay = l;
                a.lastDay = k;
                for (l = 0; 6 > l; l++) a[l] = [];
                l = m - r + this.locale.firstDay + 1;
                l > m && (l -= 7);
                r == this.locale.firstDay && (l = m - 6);
                m = e([d, b, l, 12, h, g]);
                for (d = b = l = 0; 42 > l; l++, b++, m = e(m).add(24, "hour")) 0 < l && 0 === b % 7 && (b = 0, d++), a[d][b] = m.clone().hour(p).minute(h).second(g), m.hour(12), this.minDate && a[d][b].format("YYYY-MM-DD") == this.minDate.format("YYYY-MM-DD") && a[d][b].isBefore(this.minDate) &&
                    "left" == c && (a[d][b] = this.minDate.clone()), this.maxDate && a[d][b].format("YYYY-MM-DD") == this.maxDate.format("YYYY-MM-DD") && a[d][b].isAfter(this.maxDate) && "right" == c && (a[d][b] = this.maxDate.clone());
                "left" == c ? this.leftCalendar.calendar = a : this.rightCalendar.calendar = a;
                var b = "left" == c ? this.minDate : this.startDate,
                    p = this.maxDate,
                    n = '<table class="table-condensed">',
                    n = n + "<thead>",
                    n = n + "<tr>";
                if (this.showWeekNumbers || this.showISOWeekNumbers) n += "<th></th>";
                n = b && !b.isBefore(a.firstDay) || this.linkedCalendars && "left" !=
                    c ? n + "<th></th>" : n + '<th class="prev available"><span></span></th>';
                h = this.locale.monthNames[a[1][1].month()] + a[1][1].format(" YYYY");
                if (this.showDropdowns) {
                    for (var m = a[1][1].month(), h = a[1][1].year(), g = p && p.year() || this.maxYear, d = b && b.year() || this.minYear, r = h == d, k = h == g, l = '<select class="monthselect">', q = 0; 12 > q; q++) l = (!r || b && q >= b.month()) && (!k || p && q <= p.month()) ? l + ("<option value='" + q + "'" + (q === m ? " selected='selected'" : "") + ">" + this.locale.monthNames[q] + "</option>") : l + ("<option value='" + q + "'" + (q === m ? " selected='selected'" :
                        "") + " disabled='disabled'>" + this.locale.monthNames[q] + "</option>");
                    for (b = '<select class="yearselect">'; d <= g; d++) b += '<option value="' + d + '"' + (d === h ? ' selected="selected"' : "") + ">" + d + "</option>";
                    h = l + "</select>" + (b + "</select>")
                }
                n += '<th colspan="5" class="month">' + h + "</th>";
                n = p && !p.isAfter(a.lastDay) || this.linkedCalendars && "right" != c && !this.singleDatePicker ? n + "<th></th>" : n + '<th class="next available"><span></span></th>';
                n += "</tr>";
                n += "<tr>";
                if (this.showWeekNumbers || this.showISOWeekNumbers) n += '<th class="week">' +
                    this.locale.weekLabel + "</th>";
                f.each(this.locale.daysOfWeek, function (a, b) {
                    n += "<th>" + b + "</th>"
                });
                n += "</tr>";
                n += "</thead>";
                n += "<tbody>";
                null == this.endDate && this.maxSpan && (h = this.startDate.clone().add(this.maxSpan).endOf("day"), !p || h.isBefore(p)) && (p = h);
                for (d = 0; 6 > d; d++) {
                    n += "<tr>";
                    this.showWeekNumbers ? n += '<td class="week">' + a[d][0].week() + "</td>" : this.showISOWeekNumbers && (n += '<td class="week">' + a[d][0].isoWeek() + "</td>");
                    for (b = 0; 7 > b; b++) {
                        h = [];
                        a[d][b].isSame(new Date, "day") && h.push("today");
                        5 < a[d][b].isoWeekday() &&
                            h.push("weekend");
                        a[d][b].month() != a[1][1].month() && h.push("off", "ends");
                        this.minDate && a[d][b].isBefore(this.minDate, "day") && h.push("off", "disabled");
                        p && a[d][b].isAfter(p, "day") && h.push("off", "disabled");
                        this.isInvalidDate(a[d][b]) && h.push("off", "disabled");
                        a[d][b].format("YYYY-MM-DD") == this.startDate.format("YYYY-MM-DD") && h.push("active", "start-date");
                        null != this.endDate && a[d][b].format("YYYY-MM-DD") == this.endDate.format("YYYY-MM-DD") && h.push("active", "end-date");
                        null != this.endDate && a[d][b] > this.startDate &&
                            a[d][b] < this.endDate && h.push("in-range");
                        g = this.isCustomDate(a[d][b]);
                        !1 !== g && ("string" === typeof g ? h.push(g) : Array.prototype.push.apply(h, g));
                        g = "";
                        m = !1;
                        for (l = 0; l < h.length; l++) g += h[l] + " ", "disabled" == h[l] && (m = !0);
                        m || (g += "available");
                        n += '<td class="' + g.replace(/^\s+|\s+$/g, "") + '" data-title="r' + d + "c" + b + '">' + a[d][b].date() + "</td>"
                    }
                    n += "</tr>"
                }
                n += "</tbody>";
                n += "</table>";
                this.container.find(".drp-calendar." + c + " .calendar-table").html(n)
            },
            renderTimePicker: function (c) {
                if ("right" != c || this.endDate) {
                    var a,
                        b, d, e = this.maxDate;
                    !this.maxSpan || this.maxDate && !this.startDate.clone().add(this.maxSpan).isBefore(this.maxDate) || (e = this.startDate.clone().add(this.maxSpan));
                    "left" == c ? (b = this.startDate.clone(), d = this.minDate) : "right" == c && (b = this.endDate.clone(), d = this.startDate, a = this.container.find(".drp-calendar.right .calendar-time"), "" != a.html() && (b.hour(isNaN(b.hour()) ? a.find(".hourselect option:selected").val() : b.hour()), b.minute(isNaN(b.minute()) ? a.find(".minuteselect option:selected").val() : b.minute()),
                        b.second(isNaN(b.second()) ? a.find(".secondselect option:selected").val() : b.second()), this.timePicker24Hour || (a = a.find(".ampmselect option:selected").val(), "PM" === a && 12 > b.hour() && b.hour(b.hour() + 12), "AM" === a && 12 === b.hour() && b.hour(0))), b.isBefore(this.startDate) && (b = this.startDate.clone()), e && b.isAfter(e) && (b = e.clone()));
                    a = '<select class="hourselect">';
                    for (var f = this.timePicker24Hour ? 23 : 12, g = this.timePicker24Hour ? 0 : 1; g <= f; g++) {
                        var l = g;
                        this.timePicker24Hour || (l = 12 <= b.hour() ? 12 == g ? 12 : g + 12 : 12 == g ? 0 : g);
                        var k = b.clone().hour(l),
                            m = !1;
                        d && k.minute(59).isBefore(d) && (m = !0);
                        e && k.minute(0).isAfter(e) && (m = !0);
                        a = l != b.hour() || m ? m ? a + ('<option value="' + g + '" disabled="disabled" class="disabled">' + g + "</option>") : a + ('<option value="' + g + '">' + g + "</option>") : a + ('<option value="' + g + '" selected="selected">' + g + "</option>")
                    }
                    a += '</select> : <select class="minuteselect">';
                    for (g = 0; 60 > g; g += this.timePickerIncrement) f = 10 > g ? "0" + g : g, k = b.clone().minute(g), m = !1, d && k.second(59).isBefore(d) && (m = !0), e && k.second(0).isAfter(e) && (m = !0),
                        a = b.minute() != g || m ? m ? a + ('<option value="' + g + '" disabled="disabled" class="disabled">' + f + "</option>") : a + ('<option value="' + g + '">' + f + "</option>") : a + ('<option value="' + g + '" selected="selected">' + f + "</option>");
                    a += "</select> ";
                    if (this.timePickerSeconds) {
                        a += ': <select class="secondselect">';
                        for (g = 0; 60 > g; g++) f = 10 > g ? "0" + g : g, k = b.clone().second(g), m = !1, d && k.isBefore(d) && (m = !0), e && k.isAfter(e) && (m = !0), a = b.second() != g || m ? m ? a + ('<option value="' + g + '" disabled="disabled" class="disabled">' + f + "</option>") : a + ('<option value="' +
                            g + '">' + f + "</option>") : a + ('<option value="' + g + '" selected="selected">' + f + "</option>");
                        a += "</select> "
                    }
                    this.timePicker24Hour || (a += '<select class="ampmselect">', k = g = "", d && b.clone().hour(12).minute(0).second(0).isBefore(d) && (g = ' disabled="disabled" class="disabled"'), e && b.clone().hour(0).minute(0).second(0).isAfter(e) && (k = ' disabled="disabled" class="disabled"'), a = 12 <= b.hour() ? a + ('<option value="AM"' + g + '>AM</option><option value="PM" selected="selected"' + k + ">PM</option>") : a + ('<option value="AM" selected="selected"' +
                        g + '>AM</option><option value="PM"' + k + ">PM</option>"), a += "</select>");
                    this.container.find(".drp-calendar." + c + " .calendar-time").html(a)
                }
            },
            updateFormInputs: function () {
                this.singleDatePicker || this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)) ? this.container.find("button.applyBtn").prop("disabled", !1) : this.container.find("button.applyBtn").prop("disabled", !0)
            },
            move: function () {
                var c = 0,
                    a = 0,
                    b, d = this.drops,
                    e = f(window).width();
                this.parentEl.is("body") || (c = this.parentEl.offset().top -
                    this.parentEl.scrollTop(), a = this.parentEl.offset().left - this.parentEl.scrollLeft(), e = this.parentEl[0].clientWidth + this.parentEl.offset().left);
                switch (d) {
                    case "auto":
                        b = this.element.offset().top + this.element.outerHeight() - c;
                        b + this.container.outerHeight() >= this.parentEl[0].scrollHeight && (b = this.element.offset().top - this.container.outerHeight() - c, d = "up");
                        break;
                    case "up":
                        b = this.element.offset().top - this.container.outerHeight() - c;
                        break;
                    default:
                        b = this.element.offset().top + this.element.outerHeight() - c
                }
                this.container.css({
                    top: 0,
                    left: 0,
                    right: "auto"
                });
                c = this.container.outerWidth();
                this.container.toggleClass("drop-up", "up" == d);
                "left" == this.opens ? (a = e - this.element.offset().left - this.element.outerWidth(), c + a > f(window).width() ? this.container.css({
                    top: b,
                    right: "auto",
                    left: 9
                }) : this.container.css({
                    top: b,
                    right: a,
                    left: "auto"
                })) : "center" == this.opens ? (a = this.element.offset().left - a + this.element.outerWidth() / 2 - c / 2, 0 > a ? this.container.css({
                    top: b,
                    right: "auto",
                    left: 9
                }) : a + c > f(window).width() ? this.container.css({
                    top: b,
                    left: "auto",
                    right: 0
                }) :
                    this.container.css({
                        top: b,
                        left: a,
                        right: "auto"
                    })) : (a = this.element.offset().left - a, a + c > f(window).width() ? this.container.css({
                        top: b,
                        left: "auto",
                        right: 0
                    }) : this.container.css({
                        top: b,
                        left: a,
                        right: "auto"
                    }))
            },
            show: function (c) {
                this.isShowing || (this._outsideClickProxy = f.proxy(function (a) {
                    this.outsideClick(a)
                }, this), f(document).on("mousedown.daterangepicker", this._outsideClickProxy).on("touchend.daterangepicker", this._outsideClickProxy).on("click.daterangepicker", "[data-toggle=dropdown]", this._outsideClickProxy).on("focusin.daterangepicker",
                    this._outsideClickProxy), f(window).on("resize.daterangepicker", f.proxy(function (a) {
                        this.move(a)
                    }, this)), this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), this.previousRightTime = this.endDate.clone(), this.updateView(), this.container.show(), this.move(), this.element.trigger("show.daterangepicker", this), this.isShowing = !0)
            },
            hide: function (c) {
                this.isShowing && (this.endDate || (this.startDate = this.oldStartDate.clone(), this.endDate = this.oldEndDate.clone()), this.startDate.isSame(this.oldStartDate) &&
                    this.endDate.isSame(this.oldEndDate) || this.callback(this.startDate.clone(), this.endDate.clone(), this.chosenLabel), this.updateElement(), f(document).off(".daterangepicker"), f(window).off(".daterangepicker"), this.container.hide(), this.element.trigger("hide.daterangepicker", this), this.isShowing = !1)
            },
            toggle: function (c) {
                this.isShowing ? this.hide() : this.show()
            },
            outsideClick: function (c) {
                var a = f(c.target);
                "focusin" == c.type || a.closest(this.element).length || a.closest(this.container).length || a.closest(".calendar-table").length ||
                    (this.hide(), this.element.trigger("outsideClick.daterangepicker", this))
            },
            showCalendars: function () {
                this.container.addClass("show-calendar");
                this.move();
                this.element.trigger("showCalendar.daterangepicker", this)
            },
            hideCalendars: function () {
                this.container.removeClass("show-calendar");
                this.element.trigger("hideCalendar.daterangepicker", this)
            },
            clickRange: function (c) {
                this.chosenLabel = c = c.target.getAttribute("data-range-key");
                c == this.locale.customRangeLabel ? this.showCalendars() : (c = this.ranges[c], this.startDate =
                    c[0], this.endDate = c[1], this.timePicker || (this.startDate.startOf("day"), this.endDate.endOf("day")), this.alwaysShowCalendars || this.hideCalendars(), this.clickApply())
            },
            clickPrev: function (c) {
                f(c.target).parents(".drp-calendar").hasClass("left") ? (this.leftCalendar.month.subtract(1, "month"), this.linkedCalendars && this.rightCalendar.month.subtract(1, "month")) : this.rightCalendar.month.subtract(1, "month");
                this.updateCalendars()
            },
            clickNext: function (c) {
                f(c.target).parents(".drp-calendar").hasClass("left") ? this.leftCalendar.month.add(1,
                    "month") : (this.rightCalendar.month.add(1, "month"), this.linkedCalendars && this.leftCalendar.month.add(1, "month"));
                this.updateCalendars()
            },
            hoverDate: function (c) {
                if (f(c.target).hasClass("available")) {
                    var a = f(c.target).attr("data-title"),
                        b = a.substr(1, 1),
                        a = a.substr(3, 1),
                        d = f(c.target).parents(".drp-calendar").hasClass("left") ? this.leftCalendar.calendar[b][a] : this.rightCalendar.calendar[b][a],
                        e = this.leftCalendar,
                        k = this.rightCalendar,
                        g = this.startDate;
                    this.endDate || this.container.find(".drp-calendar tbody td").each(function (a,
                        b) {
                        if (!f(b).hasClass("week")) {
                            var c = f(b).attr("data-title"),
                                h = c.substr(1, 1),
                                c = c.substr(3, 1),
                                h = f(b).parents(".drp-calendar").hasClass("left") ? e.calendar[h][c] : k.calendar[h][c];
                            h.isAfter(g) && h.isBefore(d) || h.isSame(d, "day") ? f(b).addClass("in-range") : f(b).removeClass("in-range")
                        }
                    })
                }
            },
            clickDate: function (c) {
                if (f(c.target).hasClass("available")) {
                    var a = f(c.target).attr("data-title"),
                        b = a.substr(1, 1),
                        a = a.substr(3, 1),
                        b = f(c.target).parents(".drp-calendar").hasClass("left") ? this.leftCalendar.calendar[b][a] : this.rightCalendar.calendar[b][a];
                    if (this.endDate || b.isBefore(this.startDate, "day")) {
                        if (this.timePicker) {
                            a = parseInt(this.container.find(".left .hourselect").val(), 10);
                            if (!this.timePicker24Hour) {
                                var d = this.container.find(".left .ampmselect").val();
                                "PM" === d && 12 > a && (a += 12);
                                "AM" === d && 12 === a && (a = 0)
                            }
                            d = parseInt(this.container.find(".left .minuteselect").val(), 10);
                            isNaN(d) && (d = parseInt(this.container.find(".left .minuteselect option:last").val(), 10));
                            var e = this.timePickerSeconds ? parseInt(this.container.find(".left .secondselect").val(), 10) :
                                0,
                                b = b.clone().hour(a).minute(d).second(e)
                        }
                        this.endDate = null;
                        this.setStartDate(b.clone())
                    } else !this.endDate && b.isBefore(this.startDate) ? this.setEndDate(this.startDate.clone()) : (this.timePicker && (a = parseInt(this.container.find(".right .hourselect").val(), 10), this.timePicker24Hour || (d = this.container.find(".right .ampmselect").val(), "PM" === d && 12 > a && (a += 12), "AM" === d && 12 === a && (a = 0)), d = parseInt(this.container.find(".right .minuteselect").val(), 10), isNaN(d) && (d = parseInt(this.container.find(".right .minuteselect option:last").val(),
                        10)), e = this.timePickerSeconds ? parseInt(this.container.find(".right .secondselect").val(), 10) : 0, b = b.clone().hour(a).minute(d).second(e)), this.setEndDate(b.clone()), this.autoApply && (this.calculateChosenLabel(), this.clickApply()));
                    this.singleDatePicker && (this.setEndDate(this.startDate), !this.timePicker && this.autoApply && this.clickApply());
                    this.updateView();
                    c.stopPropagation()
                }
            },
            calculateChosenLabel: function () {
                var c = !0,
                    a = 0,
                    b;
                for (b in this.ranges) {
                    if (this.timePicker) {
                        var d = this.timePickerSeconds ? "YYYY-MM-DD HH:mm:ss" :
                            "YYYY-MM-DD HH:mm";
                        if (this.startDate.format(d) == this.ranges[b][0].format(d) && this.endDate.format(d) == this.ranges[b][1].format(d)) {
                            c = !1;
                            this.chosenLabel = this.container.find(".ranges li:eq(" + a + ")").addClass("active").attr("data-range-key");
                            break
                        }
                    } else if (this.startDate.format("YYYY-MM-DD") == this.ranges[b][0].format("YYYY-MM-DD") && this.endDate.format("YYYY-MM-DD") == this.ranges[b][1].format("YYYY-MM-DD")) {
                        c = !1;
                        this.chosenLabel = this.container.find(".ranges li:eq(" + a + ")").addClass("active").attr("data-range-key");
                        break
                    }
                    a++
                }
                c && (this.chosenLabel = this.showCustomRangeLabel ? this.container.find(".ranges li:last").addClass("active").attr("data-range-key") : null, this.showCalendars())
            },
            clickApply: function (c) {
                this.hide();
                this.element.trigger("apply.daterangepicker", this)
            },
            clickCancel: function (c) {
                this.startDate = this.oldStartDate;
                this.endDate = this.oldEndDate;
                this.hide();
                this.element.trigger("cancel.daterangepicker", this)
            },
            monthOrYearChanged: function (c) {
                c = f(c.target).closest(".drp-calendar").hasClass("left");
                var a = this.container.find(".drp-calendar." +
                    (c ? "left" : "right")),
                    b = parseInt(a.find(".monthselect").val(), 10),
                    a = a.find(".yearselect").val();
                !c && (a < this.startDate.year() || a == this.startDate.year() && b < this.startDate.month()) && (b = this.startDate.month(), a = this.startDate.year());
                this.minDate && (a < this.minDate.year() || a == this.minDate.year() && b < this.minDate.month()) && (b = this.minDate.month(), a = this.minDate.year());
                this.maxDate && (a > this.maxDate.year() || a == this.maxDate.year() && b > this.maxDate.month()) && (b = this.maxDate.month(), a = this.maxDate.year());
                c ? (this.leftCalendar.month.month(b).year(a),
                    this.linkedCalendars && (this.rightCalendar.month = this.leftCalendar.month.clone().add(1, "month"))) : (this.rightCalendar.month.month(b).year(a), this.linkedCalendars && (this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, "month")));
                this.updateCalendars()
            },
            timeChanged: function (c) {
                var a = f(c.target).closest(".drp-calendar"),
                    b = a.hasClass("left");
                c = parseInt(a.find(".hourselect").val(), 10);
                var d = parseInt(a.find(".minuteselect").val(), 10);
                isNaN(d) && (d = parseInt(a.find(".minuteselect option:last").val(),
                    10));
                var e = this.timePickerSeconds ? parseInt(a.find(".secondselect").val(), 10) : 0;
                this.timePicker24Hour || (a = a.find(".ampmselect").val(), "PM" === a && 12 > c && (c += 12), "AM" === a && 12 === c && (c = 0));
                b ? (b = this.startDate.clone(), b.hour(c), b.minute(d), b.second(e), this.setStartDate(b), this.singleDatePicker ? this.endDate = this.startDate.clone() : this.endDate && this.endDate.format("YYYY-MM-DD") == b.format("YYYY-MM-DD") && this.endDate.isBefore(b) && this.setEndDate(b.clone())) : this.endDate && (b = this.endDate.clone(), b.hour(c), b.minute(d),
                    b.second(e), this.setEndDate(b));
                this.updateCalendars();
                this.updateFormInputs();
                this.renderTimePicker("left");
                this.renderTimePicker("right")
            },
            elementChanged: function () {
                if (this.element.is("input") && this.element.val().length) {
                    var c = this.element.val().split(this.locale.separator),
                        a = null,
                        b = null;
                    2 === c.length && (a = e(c[0], this.locale.format), b = e(c[1], this.locale.format));
                    if (this.singleDatePicker || null === a || null === b) b = a = e(this.element.val(), this.locale.format);
                    a.isValid() && b.isValid() && (this.setStartDate(a),
                        this.setEndDate(b), this.updateView())
                }
            },
            keydown: function (c) {
                9 !== c.keyCode && 13 !== c.keyCode || this.hide();
                27 === c.keyCode && (c.preventDefault(), c.stopPropagation(), this.hide())
            },
            updateElement: function () {
                if (this.element.is("input") && this.autoUpdateInput) {
                    var c = this.startDate.format(this.locale.format);
                    this.singleDatePicker || (c += this.locale.separator + this.endDate.format(this.locale.format));
                    c !== this.element.val() && this.element.val(c).trigger("change")
                }
            },
            remove: function () {
                this.container.remove();
                this.element.off(".daterangepicker");
                this.element.removeData()
            }
        };
        f.fn.daterangepicker = function (c, a) {
            var b = f.extend(!0, {}, f.fn.daterangepicker.defaultOptions, c);
            this.each(function () {
                var c = f(this);
                c.data("daterangepicker") && c.data("daterangepicker").remove();
                c.data("daterangepicker", new k(c, b, a))
            });
            return this
        };
        return k
    });