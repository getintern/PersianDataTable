import { HiOutlineCalendarDays, HiOutlineXCircle } from '@/components/icons/index';
import { useEffect, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
export default function DateRange({ onChange }) {
  const [values, setValues] = useState([null, null]);

  function GFG_Fun(values) {
    // Remove the square brackets and split the string into an array of strings
    const stringValues = values.substring(1, values.length - 1).split(',');

    // Convert array of strings to an array of numbers
    const numberValues = stringValues.map(Number);

    // Create Date objects using the millisecond values
    const startDate = numberValues[0] !== undefined && !isNaN(numberValues[0]) ? new Date(numberValues[0]) : null;
    const endDate = numberValues[1] !== undefined && !isNaN(numberValues[1]) ? new Date(numberValues[1]) : null;

    if (endDate) {
      endDate.setHours(0, 0, 0, 0);
    }
    if (startDate) {
      startDate.setHours(0, 0, 0, 0);
    }

    return [startDate, endDate];
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(GFG_Fun(JSON.stringify(values)));
    }, 300);

    return () => clearTimeout(timeout);
  }, [values]);

  return (
    <div className="relative ml-2 flex min-w-60 max-w-96 items-center self-baseline rounded-md border border-input bg-black py-1 sm:mb-0">
      <div className="absolute right-0 flex h-full items-center justify-center rounded-r-md border-l border-input bg-zinc-800/50 px-1">
        <HiOutlineCalendarDays className="h-5 w-5" />
      </div>
      <DatePicker
        mapDays={({ date }) => {
          let props = {};
          let isWeekend = date.weekDay.index === 6;

          if (isWeekend) props.className = 'highlight highlight-red';

          return props;
        }}
        inputClass="bg-black cursor-pointer mr-10 text-sm"
        numberOfMonths={2}
        value={values}
        dateSeparator=" تا "
        placeholder="فیلتر براساس تاریخ"
        onChange={setValues}
        range
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
      />
      {values[0] !== null && (
        <div className="absolute left-1 cursor-pointer" onClick={() => setValues([null, null])}>
          <HiOutlineXCircle className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
