import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { selectSegment } from '../data/select';

export default function SegmentApp() {
  const [segmentName, setSegmentName] = useState('');
  const [_, setSchema] = useState(0);
  const [segmentList, setSegmentList] = useState([]);
  const [selectedOption, setSelectedOptions] = useState({});
  const handleChange = (e) => {
    setSegmentName(e.target.value);
  };
  const handleSegmentList = () => {
    setSchema((prev) => {
      if (prev === selectSegment.length) return prev;
      let updatedCount = prev + 1;
      setSegmentList((prev) => [...prev, { id: `schema_${updatedCount}` }]);
      return updatedCount;
    });
  };
  const handleRemoveSchema = (id, index) => {
    setSegmentList((prev) => prev.filter((schema) => schema.id !== id));
    setSelectedOptions((prev) => ({
      ...prev,
      [index]: '',
    }));
    setSchema((prev) => prev - 1);
  };

  const handleChangeIndex = (e, currentIndex, id) => {
    const { value } = e.target;
    console.log('handleChangeIndex ~ value:', value);
    setSelectedOptions((prev) => ({
      ...prev,
      [currentIndex]: value,
    }));
    const findSegment = selectSegment.find(
      (item) => item.value === value
    ).label;
    setSegmentList((prev) =>
      prev.map((segment, index) => {
        if (segment.id === id) {
          const updatedSegment = {
            ...segmentList[index],
            [value]: findSegment,
          };
          return updatedSegment;
        } else {
          return segment;
        }
      })
    );
    console.log('handleChangeIndex ~ findSegment:', findSegment);
  };
  const getFilteredOptions = (currentIndex) => {
    const selectedValuesArray = Object.values(selectedOption).filter(
      (value, idx) => idx !== currentIndex
    );
    return selectSegment.filter(
      (option) => !selectedValuesArray.includes(option.value)
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      segment_name: segmentName,
      schemas: segmentList.map(({ id, ...rest }) => rest),
    };
    alert(JSON.stringify(payload));
  };
  return (
    <main>
      <form action="" onSubmit={handleSubmit}>
        <div className="segment">
          <TextField onChange={handleChange} value={segmentName} />
          <Button onClick={handleSegmentList}>Add Schema</Button>
        </div>

        <div className="segment-list">
          {segmentList.length > 0 &&
            segmentList.map((item, index) => {
              return (
                <div key={item.id} className="segment">
                  <Select
                    placeholder="Add Schema to Segement"
                    sx={{ width: '100%' }}
                    onChange={(e) => handleChangeIndex(e, index, item.id)}
                  >
                    {getFilteredOptions(index).map((item) => {
                      return (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Button
                    onClick={() => handleRemoveSchema(item.id, index)}
                    sx={{ fontSize: '2rem' }}
                  >
                    {' '}
                    -{' '}
                  </Button>
                </div>
              );
            })}
        </div>

        <div className="segment-action">
          <Button disabled={segmentList.length === 0} type={'submit'}>
            Save
          </Button>
          <Button>Cancel</Button>
        </div>
      </form>
    </main>
  );
}
