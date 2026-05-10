import React, { useEffect, useMemo, useState } from "react";

type Language = "ru" | "ua" | "en";
type Version = "extended" | "short";
type CalcType = "cpm" | "price";

type Translation = {
  title: string;
  subtitle: string;
  language: string;
  version: string;
  extended: string;
  short: string;
  calcType: string;
  calcCpm: string;
  calcPrice: string;
  platform: string;
  reach: string;
  reachHint: string;
  addReach: string;
  remove: string;
  clearAll: string;
  totalReach: string;
  fieldsCount: string;
  avgReach: string;
  streamReach: string;
  streamReachHint: string;
  avgOnline: string;
  streamHours: string;
  streamReachResult: string;
  data: string;
  pricePlacement: string;
  cpm: string;
  currency: string;
  formulaCpm: string;
  formulaPrice: string;
  formulaStreamReach: string;
  result: string;
  avgUsed: string;
  selectedPlatform: string;
  selectedCalcType: string;
  placeholderReach: string;
  placeholderPrice: string;
  placeholderCpm: string;
  placeholderAvgOnline: string;
  placeholderHours: string;
  noResult: string;
  instructionButton: string;
  instructionTitle: string;
  instructionSteps: string[];
  instructionClose: string;
};

const translations: Record<Language, Translation> = {
  ru: {
    title: "Калькулятор CPM",
    subtitle: "",
    language: "Язык",
    version: "Версия калькулятора",
    extended: "Расширенная версия",
    short: "Краткая версия",
    calcType: "Тип расчёта",
    calcCpm: "Посчитать CPM",
    calcPrice: "Посчитать цену",
    platform: "Тип площадки",
    reach: "Охват / просмотры",
    reachHint: "Можно добавить несколько значений. В расчёте используется средний охват по заполненным полям.",
    addReach: "+ Добавить охват",
    remove: "Удалить",
    clearAll: "Очистить всё",
    totalReach: "Сумма охватов",
    fieldsCount: "Количество заполненных полей",
    avgReach: "Средний охват",
    streamReach: "Средний охват за стрим",
    streamReachHint: "Для Twitch средний охват за стрим считается по формуле: Средний онлайн × Часы × 4.",
    avgOnline: "Средний онлайн",
    streamHours: "Кол-во часов",
    streamReachResult: "Средний охват за стрим",
    data: "Данные для расчёта",
    pricePlacement: "Цена за 1 размещение",
    cpm: "CPM",
    currency: "Валюта",
    formulaCpm: "Формула для расчёта CPM",
    formulaPrice: "Формула для расчёта цены",
    formulaStreamReach: "Формула среднего охвата за стрим",
    result: "Результат",
    avgUsed: "Средний охват",
    selectedPlatform: "Площадка",
    selectedCalcType: "Тип расчёта",
    placeholderReach: "Например: 50 000",
    placeholderPrice: "Например: 10",
    placeholderCpm: "Например: 0.20",
    placeholderAvgOnline: "Например: 1200",
    placeholderHours: "Например: 3",
    noResult: "Введите охват и значение для расчёта",
    instructionButton: "Инструкция",
    instructionTitle: "Как пользоваться калькулятором",
    instructionSteps: [
      "Выберите версию калькулятора: расширенную или краткую.",
      "Выберите тип расчёта: посчитать CPM или посчитать цену.",
      "Выберите площадку.",
      "Введите охват. В расширенной версии можно добавить несколько значений — калькулятор возьмёт средний охват.",
      "Для Twitch введите средний онлайн и количество часов — средний охват за стрим считается автоматически.",
      "Введите цену за 1 размещение или CPM, в зависимости от выбранного типа расчёта.",
      "Результат появится автоматически справа."
    ],
    instructionClose: "Закрыть",
  },
  ua: {
    title: "Калькулятор CPM",
    subtitle: "",
    language: "Мова",
    version: "Версія калькулятора",
    extended: "Розширена версія",
    short: "Коротка версія",
    calcType: "Тип розрахунку",
    calcCpm: "Порахувати CPM",
    calcPrice: "Порахувати ціну",
    platform: "Тип майданчика",
    reach: "Охоплення / перегляди",
    reachHint: "Можна додати кілька значень. У розрахунку використовується середнє охоплення за заповненими полями.",
    addReach: "+ Додати охоплення",
    remove: "Видалити",
    clearAll: "Очистити все",
    totalReach: "Сума охоплень",
    fieldsCount: "Кількість заповнених полів",
    avgReach: "Середнє охоплення",
    streamReach: "Середнє охоплення за стрім",
    streamReachHint: "Для Twitch середнє охоплення за стрім рахується за формулою: Середній онлайн × Години × 4.",
    avgOnline: "Середній онлайн",
    streamHours: "Кількість годин",
    streamReachResult: "Середнє охоплення за стрім",
    data: "Дані для розрахунку",
    pricePlacement: "Ціна за 1 розміщення",
    cpm: "CPM",
    currency: "Валюта",
    formulaCpm: "Формула для розрахунку CPM",
    formulaPrice: "Формула для розрахунку ціни",
    formulaStreamReach: "Формула середнього охоплення за стрім",
    result: "Результат",
    avgUsed: "Середнє охоплення",
    selectedPlatform: "Майданчик",
    selectedCalcType: "Тип розрахунку",
    placeholderReach: "Наприклад: 50 000",
    placeholderPrice: "Наприклад: 10",
    placeholderCpm: "Наприклад: 0.20",
    placeholderAvgOnline: "Наприклад: 1200",
    placeholderHours: "Наприклад: 3",
    noResult: "Введіть охоплення та значення для розрахунку",
    instructionButton: "Інструкція",
    instructionTitle: "Як користуватися калькулятором",
    instructionSteps: [
      "Оберіть версію калькулятора: розширену або коротку.",
      "Оберіть тип розрахунку: порахувати CPM або порахувати ціну.",
      "Оберіть майданчик.",
      "Введіть охоплення. У розширеній версії можна додати кілька значень — калькулятор візьме середнє охоплення.",
      "Для Twitch введіть середній онлайн і кількість годин — середнє охоплення за стрім рахується автоматично.",
      "Введіть ціну за 1 розміщення або CPM залежно від вибраного типу розрахунку.",
      "Результат з’явиться автоматично праворуч."
    ],
    instructionClose: "Закрити",
  },
  en: {
    title: "CPM Calculator",
    subtitle: "",
    language: "Language",
    version: "Calculator version",
    extended: "Extended version",
    short: "Short version",
    calcType: "Calculation type",
    calcCpm: "Calculate CPM",
    calcPrice: "Calculate price",
    platform: "Platform type",
    reach: "Reach / views",
    reachHint: "You can add several values. The calculation uses the average reach across filled fields.",
    addReach: "+ Add reach",
    remove: "Remove",
    clearAll: "Clear all",
    totalReach: "Total reach",
    fieldsCount: "Filled fields",
    avgReach: "Average reach",
    streamReach: "Average reach per stream",
    streamReachHint: "For Twitch, average reach per stream is calculated as: Average online × Hours × 4.",
    avgOnline: "Average online",
    streamHours: "Hours count",
    streamReachResult: "Average reach per stream",
    data: "Calculation data",
    pricePlacement: "Price per placement",
    cpm: "CPM",
    currency: "Currency",
    formulaCpm: "Formula for CPM calculation",
    formulaPrice: "Formula for price calculation",
    formulaStreamReach: "Formula for average reach per stream",
    result: "Result",
    avgUsed: "Average reach",
    selectedPlatform: "Platform",
    selectedCalcType: "Calculation type",
    placeholderReach: "Example: 50 000",
    placeholderPrice: "Example: 10",
    placeholderCpm: "Example: 0.20",
    placeholderAvgOnline: "Example: 1200",
    placeholderHours: "Example: 3",
    noResult: "Enter reach and a value to calculate",
    instructionButton: "Instructions",
    instructionTitle: "How to use the calculator",
    instructionSteps: [
      "Choose the calculator version: extended or short.",
      "Choose the calculation type: calculate CPM or calculate price.",
      "Choose the platform.",
      "Enter reach. In the extended version you can add several values — the calculator will use the average reach.",
      "For Twitch, enter average online and hours — average reach per stream is calculated automatically.",
      "Enter price per placement or CPM depending on the selected calculation type.",
      "The result will appear automatically on the right."
    ],
    instructionClose: "Close",
  },
};

const platforms = ["Telegram", "Instagram", "Facebook", "X", "Kick", "Twitch", "Web site", "Whatsapp"];
const currency = "USD";

const COLORS = {
  page: "#F3F4F6",
  card: "#FFFFFF",
  soft: "#EEF2F6",
  softBorder: "#D8E1E8",
  border: "#DDE5EB",
  border2: "#D7DEE5",
  accent: "#6B839A",
  accentHover: "#5A738A",
  text: "#374151",
  muted: "#6B7280",
  softText: "#708090",
  chipBg: "#F6F8FA",
  chipText: "#425466",
};

function parseNumber(value: string): number | null {
  if (!value) return null;
  const cleaned = value.replace(/\s+/g, "").replace(/,/g, ".");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

function formatNumber(value: number | null, digits = 0): string {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function SegmentedButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
 <button
  type="button"
  onClick={onClick}
  className="rounded-full px-3 py-1.5 text-sm font-semibold transition-all duration-200 ease-out hover:scale-[1.03] active:scale-[0.98]"
  style={{
    border: `1px solid ${active ? COLORS.accent : COLORS.border2}`,
    background: active ? COLORS.accent : COLORS.card,
   color: active ? "#fff" : COLORS.chipText,
boxShadow: active 
  ? "0 2px 6px rgba(15,23,42,0.08)" 
  : "0 1px 2px rgba(15,23,42,0.04)",
  }}
>
  {children}
</button>
  );
}

function PlatformSelect({ value, onChange, options, inputStyle }: { value: string; onChange: (value: string) => void; options: string[]; inputStyle: React.CSSProperties }) {
  return (
    <div className="relative">
      <select className="w-full appearance-none pr-12" style={inputStyle} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center" style={{ color: COLORS.chipText }}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 8l4 4 4-4" />
        </svg>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase min-h-[40px]" style={{ letterSpacing: "0.12em", color: COLORS.softText }}>
        {label}
      </p>
      <p className="mt-1 text-xl font-bold tabular-nums" style={{ letterSpacing: "-0.02em", color: COLORS.text }}>
        {value}
      </p>
    </div>
  );
}

function InstructionModal({ t, onClose }: { t: Translation; onClose: () => void }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(30,41,59,0.22)",
          zIndex: 40,
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="rounded-3xl p-5 shadow-sm"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(560px, calc(100vw - 32px))",
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          zIndex: 50,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: COLORS.text }}>
            {t.instructionTitle}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl px-3 py-1.5 text-sm font-semibold transition-colors"
            style={{ border: `1px solid ${COLORS.border2}`, background: COLORS.card, color: COLORS.chipText }}
          >
            {t.instructionClose}
          </button>
        </div>
        <div className="mt-4 space-y-3 text-sm" style={{ color: COLORS.muted, lineHeight: 1.55 }}>
          {t.instructionSteps.map((step, index) => (
            <div key={index} className="flex gap-3">
              <span style={{ minWidth: 20, fontWeight: 700, color: COLORS.text }}>{index + 1}.</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function CalculatorWireframePreview() {
  useEffect(() => {
    document.documentElement.style.background = COLORS.page;
    document.body.style.background = COLORS.page;
    document.body.style.margin = "0";
    return () => {
      document.documentElement.style.background = "";
      document.body.style.background = "";
      document.body.style.margin = "";
    };
  }, []);

  const [language, setLanguage] = useState<Language>("ru");
  const [version, setVersion] = useState<Version>("extended");
  const [calcType, setCalcType] = useState<CalcType>("cpm");
  const [platform, setPlatform] = useState<string>("Telegram");
  const [reachValues, setReachValues] = useState<string[]>([""]);
  const [shortReach, setShortReach] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [cpm, setCpm] = useState<string>("");
  const [avgOnline, setAvgOnline] = useState<string>("");
  const [streamHours, setStreamHours] = useState<string>("");
  const [isInstructionOpen, setIsInstructionOpen] = useState<boolean>(false);

  const resetAll = () => {
  setReachValues([""]);
  setShortReach("");
  setPrice("");
  setCpm("");
  setAvgOnline("");
  setStreamHours("");
};

  const t = translations[language];
  const compact = version === "short";
  const isTwitch = platform === "Twitch";

  const inputStyle: React.CSSProperties = {
    height: 38,
    width: "100%",
    borderRadius: 12,
    border: `1px solid ${COLORS.border2}`,
    background: COLORS.page,
    padding: "0 12px",
    fontSize: 13,
    fontWeight: 500,
    color: COLORS.text,
    outline: "none",
    fontFamily: "Manrope, Inter, system-ui, sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    marginBottom: 8,
    minHeight: 56,
    display: "block",
    fontSize: 14,
    fontWeight: 500,
    color: "#6B7280",
  };

  const simpleLabelStyle: React.CSSProperties = {
    marginBottom: 8,
    display: "block",
    fontSize: 14,
    fontWeight: 500,
    color: "#6B7280",
  };

  const cardStyle: React.CSSProperties = {
    background: "transparent",
    border: `1px solid ${COLORS.border}`,
  };

  const softCardStyle: React.CSSProperties = {
    background: "transparent",
    border: `1px solid ${COLORS.softBorder}`,
  };

  const filledReachValues = useMemo(() => reachValues.map(parseNumber).filter((v): v is number => v != null && v > 0), [reachValues]);
  const totalReach = useMemo(() => filledReachValues.reduce((sum, item) => sum + item, 0), [filledReachValues]);
  const filledCount = filledReachValues.length;
  const averageReach = filledCount > 0 ? totalReach / filledCount : null;
  const shortReachValue = parseNumber(shortReach);

  const avgOnlineValue = parseNumber(avgOnline);
  const streamHoursValue = parseNumber(streamHours);
  const streamReach = isTwitch && avgOnlineValue != null && avgOnlineValue > 0 && streamHoursValue != null && streamHoursValue > 0
    ? avgOnlineValue * streamHoursValue * 4
    : null;

  const effectiveReach = isTwitch ? streamReach : compact ? shortReachValue : averageReach;

  const result = useMemo<number | null>(() => {
    if (!effectiveReach || effectiveReach <= 0) return null;
    if (calcType === "cpm") {
      const priceValue = parseNumber(price);
      if (priceValue == null) return null;
      return (priceValue / effectiveReach) * 1000;
    }
    const cpmValue = parseNumber(cpm);
    if (cpmValue == null) return null;
    return (cpmValue * effectiveReach) / 1000;
  }, [effectiveReach, calcType, price, cpm]);

  const addReachField = () => setReachValues((prev) => [...prev, ""]);
  const updateReachField = (
  index: number,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const input = e.target;
  const rawValue = input.value;

  const selectionStart = input.selectionStart || 0;

  const digitsOnly = rawValue.replace(/\D/g, "");
  const formatted = digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const digitsBeforeCursor = rawValue
    .slice(0, selectionStart)
    .replace(/\D/g, "").length;

  setReachValues((prev) =>
    prev.map((item, i) => (i === index ? formatted : item))
  );

  requestAnimationFrame(() => {
    let pos = 0;
    let digitCount = 0;

    while (pos < formatted.length && digitCount < digitsBeforeCursor) {
      if (/\d/.test(formatted[pos])) digitCount++;
      pos++;
    }

    input.setSelectionRange(pos, pos);
  });
};
  const removeReachField = (index: number) => {
    setReachValues((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));
  };
  const addReachText = t.addReach.replace(/^\+\s*/, "");

  const dataBlock = (
    <div className="rounded-3xl p-4 shadow-sm" style={cardStyle}>
      <h2 className="text-[22px] font-bold" style={{ letterSpacing: "-0.02em", color: COLORS.text }}>
        {t.data}
      </h2>
      <div className="mt-5 grid items-end gap-4 md:grid-cols-[240px_120px] md:justify-start">
        <div className="flex h-full flex-col justify-between">
          <label style={labelStyle}>{calcType === "cpm" ? t.pricePlacement : t.cpm}</label>
          <input
            style={inputStyle}
            value={calcType === "cpm" ? price : cpm}
            onChange={(e) => {
              if (calcType === "cpm") setPrice(e.target.value);
              else setCpm(e.target.value);
            }}
            placeholder={calcType === "cpm" ? t.placeholderPrice : t.placeholderCpm}
          />
        </div>
        <div className="flex h-full flex-col justify-between">
          <label style={labelStyle}>{t.currency}</label>
          <div
            className="flex h-[38px] max-w-[120px] items-center justify-center rounded-xl text-sm font-semibold"
            style={{ background: COLORS.chipBg, border: `1px solid ${COLORS.softBorder}`, color: COLORS.chipText }}
          >
            {currency}
          </div>
        </div>
      </div>
      {!compact && (
        <div className="mt-5 rounded-2xl p-4 text-sm" style={softCardStyle}>
          <span style={{ color: COLORS.muted }}>{calcType === "cpm" ? t.formulaCpm : t.formulaPrice}: </span>
          <span style={{ fontWeight: 700, color: COLORS.text }}>
            {calcType === "cpm" ? "(Price / Views) × 1000" : "(CPM × Views) / 1000"}
          </span>
        </div>
      )}
    </div>
  );

  const resultBlock = (
    <div className="rounded-3xl p-4 shadow-sm" style={softCardStyle}>
      <p className="text-xs font-medium uppercase" style={{ letterSpacing: "0.12em", color: COLORS.softText }}>
        {t.result}
      </p>
      <p className="mt-3 font-semibold leading-[0.95]" style={{ fontSize: 32, letterSpacing: "-0.06em", color: COLORS.text }}>
        {result == null ? t.noResult : `${formatNumber(result, 2)} ${currency}`}
      </p>
      <div className="mt-6 space-y-3 text-[13px]" style={{ color: COLORS.muted }}>
        <div className="flex items-center justify-between gap-3 pb-3" style={{ borderBottom: `1px solid ${COLORS.softBorder}` }}>
          <span>{t.selectedPlatform}</span>
          <span style={{ fontWeight: 700, color: COLORS.text }}>{platform}</span>
        </div>
        {!compact && (
          <>
            <div className="flex items-center justify-between gap-3 pb-3" style={{ borderBottom: `1px solid ${COLORS.softBorder}` }}>
              <span>{isTwitch ? t.streamReachResult : t.avgUsed}</span>
              <span style={{ fontWeight: 700, color: COLORS.text }}>{formatNumber(isTwitch ? streamReach : averageReach)}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>{t.selectedCalcType}</span>
              <span style={{ fontWeight: 700, color: COLORS.text }}>{calcType === "cpm" ? "CPM" : t.pricePlacement}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: COLORS.page, fontFamily: "Manrope, Inter, system-ui, sans-serif" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-7">
          <h1 className="font-extrabold" style={{ fontSize: 34, letterSpacing: "-0.04em", color: COLORS.text }}>
            {t.title}
          </h1>
          {t.subtitle && (
            <p className="mt-2 text-sm" style={{ color: COLORS.muted }}>
              {t.subtitle}
            </p>
          )}
          <button
            type="button"
            onClick={() => setIsInstructionOpen(true)}
            className="mt-4 rounded-2xl px-4 py-2 text-sm font-semibold transition-all duration-200 ease-out hover:scale-[1.03] active:scale-[0.98]"
            style={{ border: `1px solid ${COLORS.border2}`, background: COLORS.card, color: COLORS.chipText, boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }}
          >
            {t.instructionButton}
          </button>
         
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-3xl p-5 shadow-sm" style={cardStyle}>
            <div className="mb-6">
              <p style={simpleLabelStyle}>{t.language}</p>
              <div className="flex flex-wrap gap-2">
                <SegmentedButton active={language === "ru"} onClick={() => setLanguage("ru")}>Русский</SegmentedButton>
                <SegmentedButton active={language === "ua"} onClick={() => setLanguage("ua")}>Українська</SegmentedButton>
                <SegmentedButton active={language === "en"} onClick={() => setLanguage("en")}>English</SegmentedButton>
              </div>
            </div>

            <div className="mb-6">
              <p style={simpleLabelStyle}>{t.version}</p>
              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                <SegmentedButton active={version === "extended"} onClick={() => setVersion("extended")}>{t.extended}</SegmentedButton>
                <SegmentedButton active={version === "short"} onClick={() => setVersion("short")}>{t.short}</SegmentedButton>
              </div>
            </div>

            <div className="mb-6">
              <p style={simpleLabelStyle}>{t.calcType}</p>
              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                <SegmentedButton
                  active={calcType === "cpm"}
                  onClick={() => {
                    setCalcType("cpm");
                    if (result != null) setPrice(result.toFixed(2));
                  }}
                >
                  {t.calcCpm}
                </SegmentedButton>
                <SegmentedButton
                  active={calcType === "price"}
                  onClick={() => {
                    setCalcType("price");
                    if (result != null) setCpm(result.toFixed(2));
                  }}
                >
                  {t.calcPrice}
                </SegmentedButton>
              </div>
            </div>

            <div>
              <label style={simpleLabelStyle}>{t.platform}</label>
              <PlatformSelect value={platform} onChange={setPlatform} options={platforms} inputStyle={inputStyle} />
            </div>

            <button
  type="button"
  onClick={resetAll}
  className="mt-6 rounded-2xl px-4 py-2 text-sm font-semibold transition-all duration-200 ease-out hover:scale-[1.03] active:scale-[0.98]"
  style={{
    border: `1px solid ${COLORS.border2}`,
    background: COLORS.card,
    color: COLORS.chipText,
    boxShadow: "0 1px 2px rgba(15,23,42,0.04)"
  }}
>
{t.clearAll}
</button>

          </aside>

          <main className="space-y-6">
            {isTwitch ? (
      <>
              <section className="rounded-3xl p-4 shadow-sm" style={cardStyle}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-[22px] font-bold" style={{ letterSpacing: "-0.02em", color: COLORS.text }}>
                      {t.streamReach}
                    </h2>
                  </div>
                  <form action="https://twitchtracker.com/channels/ranking" method="get" target="_blank" className="m-0">
                    <button
                      type="submit"
                      className="rounded-2xl px-3 py-1.5 text-sm font-semibold transition-colors"
                      style={{ border: `1px solid ${COLORS.border2}`, background: COLORS.page, color: COLORS.chipText }}
                    >
                      TwitchTracker
                    </button>
                  </form>
                </div>

                <div className="mt-5 grid items-end gap-4 md:grid-cols-2">
                  <div className="flex h-full flex-col justify-between">
                    <label style={labelStyle}>{t.avgOnline}</label>
                    <input style={inputStyle} value={avgOnline} onChange={(e) => setAvgOnline(e.target.value)} placeholder={t.placeholderAvgOnline} />
                  </div>
                  <div className="flex h-full flex-col justify-between">
                    <label style={labelStyle}>{t.streamHours}</label>
                    <input style={inputStyle} value={streamHours} onChange={(e) => setStreamHours(e.target.value)} placeholder={t.placeholderHours} />
                  </div>
                </div>

                <div className="mt-5 rounded-2xl p-4" style={softCardStyle}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.12em", color: COLORS.softText }}>
                      {t.streamReachResult}
                    </p>
                    <p className="text-xl font-bold" style={{ letterSpacing: "-0.02em", color: COLORS.text }}>
                      {formatNumber(streamReach)}
                    </p>
                  </div>
                </div>

                {!compact && (
                  <div className="mt-5 rounded-2xl p-4 text-sm" style={softCardStyle}>
                    <span style={{ color: COLORS.muted }}>{t.formulaStreamReach}: </span>
                    <span style={{ fontWeight: 700, color: COLORS.text }}>Average online × Hours × 4</span>
                  </div>
                )}
              </section>
            ) : (
  <>
    <section className="rounded-3xl p-4 shadow-sm" style={cardStyle}>
                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-[22px] font-bold" style={{ letterSpacing: "-0.02em", color: COLORS.text }}>
                      {t.reach}
                    </h2>
                    {!compact && <p className="mt-1 text-sm" style={{ color: COLORS.muted }}>{t.reachHint}</p>}
                  </div>
                  {!compact && (
                    <button
                      type="button"
                      onClick={addReachField}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-2xl px-3 py-1.5 text-sm font-semibold transition-colors"
                      style={{ border: `1px solid ${COLORS.border2}`, background: COLORS.page, color: COLORS.chipText }}
                    >
                      <span className="text-base leading-none">+</span>
                      <span>{addReachText}</span>
                    </button>
                  )}
                </div>

                {compact ? (
  <div className="mt-5">
    <input
      style={inputStyle}
      value={shortReach}
      onChange={(e) => setShortReach(e.target.value)}
      placeholder={t.placeholderReach}
    />
  </div>
) : (
  <div>
    <div className="grid gap-3 md:grid-cols-2">
      {reachValues.map((value, index) => (
        <div key={index} className="flex gap-2">
          <input
            style={inputStyle}
            value={value}
            onChange={(e) => updateReachField(index, e)}
          />

          {reachValues.length > 1 && (
            <button
              type="button"
              onClick={() => removeReachField(index)}
              className="shrink-0 rounded-2xl px-3 py-2 text-sm font-semibold"
              style={{
                border: `1px solid ${COLORS.border2}`,
                background: COLORS.page,
                color: COLORS.chipText,
              }}
            >
              {t.remove}
            </button>
          )}
        </div>
      ))}
    </div>

    <div
      className="mt-5 grid gap-4 rounded-2xl p-4 md:grid-cols-3"
      style={softCardStyle}
    >
      <MetricCard label={t.totalReach} value={formatNumber(totalReach)} />
      <MetricCard label={t.fieldsCount} value={formatNumber(filledCount)} />
      <MetricCard label={t.avgReach} value={formatNumber(averageReach)} />
    </div>
  </div>
)}
</section>

            <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {dataBlock}
      {resultBlock}
    </section>
  </>
        ) : (
)}
</main>
</div>
</div>
{isInstructionOpen && (
  <InstructionModal
    t={t}
    onClose={() => setIsInstructionOpen(false)}
  />
)}

</div>
);
}
