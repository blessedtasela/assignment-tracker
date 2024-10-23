
import styles from "./header.module.css";
import { useEffect, useId, useState } from "react";
import { DayPicker } from "react-day-picker";
import classNames from "react-day-picker/style.module.css";
import { DatePickerProps } from "../../helpers/types";


export function DatePicker({ dueDate, onSelect, dialogRef }: DatePickerProps) {
    const dialogId = useId();
    const headerId = useId();

    // Hold the month in state to control the calendar when the input changes
    const [month, setMonth] = useState(new Date());

    // Hold the dialog visibility in state
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Function to toggle the dialog visibility
    const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

    // Hook to handle the body scroll behavior and focus trapping.
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
    }, [dialogRef, isDialogOpen]);


    return (
        <div className={styles.flexItems}>
            <div style={{ placeContent: "center" ,}}>
                <button
                    style={{
                        fontSize: "inherit", minHeight: "30px",
                        margin: "auto", width: "100%",
                        placeContent: "center",
                    }}
                    onClick={toggleDialog}
                    type="button"
                    aria-controls="dialog"
                    aria-haspopup="dialog"
                    aria-expanded={isDialogOpen}
                    aria-label="Open calendar to choose due date">
                    📆
                </button>
                <p aria-live="assertive" aria-atomic="true">
                    {dueDate !== undefined
                        ? dueDate.toDateString()
                        : ""}
                </p>
            </div>
            <dialog
                role="dialog"
                ref={dialogRef}
                id={dialogId}
                aria-modal
                aria-labelledby={headerId}
                onClose={() => setIsDialogOpen(false)}
            >
                <div className={styles.datePicker}>
                    <DayPicker
                        timeZone="UTC"
                        month={month}
                        onMonthChange={setMonth}
                        autoFocus
                        mode="single"
                        selected={dueDate}
                        onSelect={onSelect}
                        footer={
                            dueDate !== undefined ?
                                `Due date: ${dueDate.toDateString()}` : `Due date not selected`
                        }
                        required={true}
                        classNames={classNames}
                    />
                </div>
            </dialog>
        </div>
    );
}