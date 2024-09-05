import { addDays, format, isValid, parse } from "date-fns";
import { es } from "date-fns/locale";
import React, { useEffect, useId, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "./DayPicker.css";

type Props = {
  fecha: (data: Date | string) => void;
};

export function PickerDay({ fecha }: Readonly<Props>) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [inputValue, setInputValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  useEffect(() => {
    const handleBodyScroll = (isOpen: boolean) => {
      document.body.style.overflow = isOpen ? "hidden" : "";
    };
    if (!dialogRef.current) return;
    if (isDialogOpen) {
      handleBodyScroll(true);
      dialogRef.current.showModal();
    } else {
      handleBodyScroll(false);
      dialogRef.current.close();
    }
    return () => {
      handleBodyScroll(false);
    };
  }, [isDialogOpen]);

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setInputValue(format(date, "dd/MM/yyyy"));
      const nextDay = addDays(date, 1);

      const isoDate = nextDay.toISOString().split("T")[0] + "T00:00:00.000Z";
      fecha(isoDate);
    }
    dialogRef.current?.close();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    const parsedDate = parse(e.target.value, "dd/MM/yyyy", new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  return (
    <div style={{ marginTop: "1.5em", fontSize: "16px" }}>
      <label htmlFor="date-input">Fecha:</label>
      <input
        style={{ marginLeft: "24px" }}
        id="date-input"
        type="text"
        value={inputValue}
        placeholder={"dd/MM/yyyy"}
        onChange={handleInputChange}
      />
      <button
        style={{
          backgroundColor: "#BDD7EE",
          border: "0.5px solid #53a5dc",
        }}
        onClick={toggleDialog}
        aria-controls="dialog"
        aria-haspopup="dialog"
        aria-expanded={isDialogOpen}
        aria-label="Open calendar to choose booking date"
      >
        <i className="fa-regular fa-calendar-days"></i>
      </button>
      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-modal
        aria-labelledby={headerId}
        onClose={() => setIsDialogOpen(false)}
      >
        <div className="div-close-button">
          <button
            className="close-button"
            onClick={() => setIsDialogOpen(false)}
          >
            x
          </button>
        </div>
        <DayPicker
          locale={es}
          required
          fixedWeeks
          month={month}
          onMonthChange={setMonth}
          autoFocus
          mode="single"
          selected={selectedDate}
          onSelect={handleDayPickerSelect}
        />
      </dialog>
    </div>
  );
}
