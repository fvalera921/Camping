import { useEffect, useRef, useState } from "react";

const weekdayLabels = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
const monthFormatter = new Intl.DateTimeFormat("es-ES", {
  month: "long",
  year: "numeric"
});
const dayFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short"
});

const toDateOnly = (value) => {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const toInputValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const addMonths = (date, amount) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

const getDaysGrid = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  const startOffset = (firstDay.getDay() + 6) % 7;

  for (let index = 0; index < startOffset; index += 1) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(year, month, day));
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return days;
};

const isSameDay = (left, right) =>
  Boolean(left && right) &&
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const isWithinRange = (date, startDate, endDate) =>
  Boolean(date && startDate && endDate) && date > startDate && date < endDate;

export default function DateRangePicker({
  startDate,
  endDate,
  minDate,
  onChange
}) {
  const wrapperRef = useRef(null);
  const today = toDateOnly(minDate) || new Date();
  const initialMonth = toDateOnly(startDate) || today;
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1)
  );

  const parsedStartDate = toDateOnly(startDate);
  const parsedEndDate = toDateOnly(endDate);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleDayClick = (date) => {
    if (!date || date < today) {
      return;
    }

    const clickedValue = toInputValue(date);

    if (!parsedStartDate || parsedEndDate) {
      onChange({ startDate: clickedValue, endDate: "" });
      return;
    }

    if (date <= parsedStartDate) {
      onChange({ startDate: clickedValue, endDate: "" });
      return;
    }

    onChange({ startDate, endDate: clickedValue });
    setIsOpen(false);
  };

  const renderMonth = (monthDate) => {
    const days = getDaysGrid(monthDate);

    return (
      <div key={monthDate.toISOString()} className="rounded-[1.5rem] bg-stone-50 p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold capitalize text-stone-900">
            {monthFormatter.format(monthDate)}
          </p>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.15em] text-stone-400">
          {weekdayLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            if (!date) {
              return <span key={`empty-${index}`} className="h-10" />;
            }

            const isDisabled = date < today;
            const isStart = isSameDay(date, parsedStartDate);
            const isEnd = isSameDay(date, parsedEndDate);
            const isSelected = isStart || isEnd;
            const inRange = isWithinRange(date, parsedStartDate, parsedEndDate);

            return (
              <button
                key={date.toISOString()}
                type="button"
                disabled={isDisabled}
                onClick={() => handleDayClick(date)}
                className={[
                  "h-10 rounded-xl text-sm font-medium transition",
                  isSelected
                    ? "bg-emerald-600 text-white"
                    : inRange
                      ? "bg-emerald-100 text-emerald-900"
                      : "bg-white text-stone-700 hover:bg-stone-200",
                  isDisabled ? "cursor-not-allowed bg-stone-100 text-stone-300 hover:bg-stone-100" : ""
                ].join(" ")}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white"
      >
        <span className="block text-sm text-stone-300">Fechas de estancia</span>
        <span className="mt-1 block text-base font-medium">
          {parsedStartDate && parsedEndDate
            ? `${dayFormatter.format(parsedStartDate)} - ${dayFormatter.format(parsedEndDate)}`
            : parsedStartDate
              ? `${dayFormatter.format(parsedStartDate)} - Selecciona salida`
              : "Selecciona entrada y salida"}
        </span>
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-20 mt-3 w-[min(44rem,calc(100vw-3rem))] rounded-[2rem] border border-stone-200 bg-white p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)]">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-stone-900">Selecciona tu estancia</p>
              <p className="text-sm text-stone-500">
                Primero elige entrada y despues la fecha de salida.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setVisibleMonth((current) => addMonths(current, -1))}
                className="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => setVisibleMonth((current) => addMonths(current, 1))}
                className="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700"
              >
                Siguiente
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {renderMonth(visibleMonth)}
            {renderMonth(addMonths(visibleMonth, 1))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onChange({ startDate: "", endDate: "" })}
              className="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700"
            >
              Limpiar
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white"
            >
              Aplicar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
