import React from 'react';
import Input from '../ui/Input';

const SelectDate = ({ date, setDate }) => {
  return (
    <section className="flex gap-1 items-center mb-5">
      <div>
        <Input
          type="date"
          value={date.start}
          onChange={(e) =>
            setDate((prev) => ({
              ...prev,
              start: e.target.value,
            }))
          }
        />
      </div>
      <span> To</span>
      <div>
        <Input
          type="date"
          value={date.end}
          onChange={(e) =>
            setDate((prev) => ({
              ...prev,
              end: e.target.value,
            }))
          }
        />
      </div>
    </section>
  );
};

export default SelectDate;
