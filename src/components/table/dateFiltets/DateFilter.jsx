import DateRange from '../date-pickers-table';

const DateFilter = ({ column }) => {
  return (
    <DateRange
      onChange={(value) => {
        column.setFilterValue([...value]);
      }}
    />
  );
};

export default DateFilter;
