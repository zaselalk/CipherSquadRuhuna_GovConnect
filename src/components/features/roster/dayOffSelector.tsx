import { Card, Button, Calendar, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import ConfirmPopup from "../../common/ConfirmPopup";


const DayOffSelector = ({ onClose, onSubmit }: any) => {
  const today = dayjs();
  const maxDate = today.add(2, "month");

  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
  const [currentMonth, setCurrentMonth] = useState(today);
  const [confirmVisible, setConfirmVisible] = useState(false);

  // Toggle date selection
  const handleSelect = (date: Dayjs) => {
    if (date.isBefore(today, "day") || date.isAfter(maxDate, "day")) return;

    const exists = selectedDates.some((d) => d.isSame(date, "day"));
    setSelectedDates(
      exists
        ? selectedDates.filter((d) => !d.isSame(date, "day"))
        : [...selectedDates, date]
    );
  };

  const handleSubmit = () => {
    setConfirmVisible(true); // show confirm popup
  };

  const handleConfirm = () => {
    onSubmit(selectedDates);
    message.success("Day off submitted successfully!");
    setConfirmVisible(false);
    onClose(); // optional: close DayOffSelector after submission
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  const fullDateCellRender = (date: Dayjs) => {
    const isSelected = selectedDates.some((d) => d.isSame(date, "day"));
    const disabled = date.isBefore(today, "day") || date.isAfter(maxDate, "day");
    return (
      <div
        style={{
          backgroundColor: isSelected ? "#1890ff" : "transparent",
          color: disabled ? "#ccc" : isSelected ? "white" : "inherit",
          borderRadius: "50%",
          width: 28,
          height: 28,
          lineHeight: "28px",
          margin: "0 auto",
          cursor: disabled ? "not-allowed" : "pointer",
          userSelect: "none",
          textAlign: "center",
        }}
      >
        {date.date()}
      </div>
    );
  };

  return (
    <>
      <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white border rounded-lg shadow-lg p-4 z-50 w-[400px]">
        <Card
          title="Apply Day Off"
          className="w-full max-w-3xl"
          extra={<Button type="text" icon={<CloseOutlined />} onClick={onClose} />}
        >
          <Calendar
            fullscreen={false}
            value={currentMonth}
            onSelect={handleSelect}
            dateFullCellRender={fullDateCellRender}
            onPanelChange={(date) => {
              if (date.isBefore(today, "month")) setCurrentMonth(today);
              else if (date.isAfter(maxDate, "month")) setCurrentMonth(maxDate);
              else setCurrentMonth(date);
            }}
            headerRender={({ value, onChange }) => {
              const prev = value.clone().subtract(1, "month");
              const next = value.clone().add(1, "month");
              return (
                <div className="flex justify-between items-center px-4 py-2">
                  <Button
                    size="small"
                    disabled={prev.isBefore(today, "month")}
                    onClick={() => onChange(prev)}
                  >
                    {"<"}
                  </Button>
                  <div className="font-medium text-lg">{value.format("MMMM YYYY")}</div>
                  <Button
                    size="small"
                    disabled={next.isAfter(maxDate, "month")}
                    onClick={() => onChange(next)}
                  >
                    {">"}
                  </Button>
                </div>
              );
            }}
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={selectedDates.length === 0}
            >
              Submit
            </Button>
          </div>
        </Card>
      </div>

      {/* Use ConfirmPopup from components */}
      <ConfirmPopup
        visible={confirmVisible}
        title="Confirm Submission"
        content="Are you sure you want to submit these day(s) off?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};

export default DayOffSelector;
