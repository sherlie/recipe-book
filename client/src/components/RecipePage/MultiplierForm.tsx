import { useState, type ChangeEvent } from "react";

interface MultiplierFormProps {
  currentMultiplier: number;
  onChange: (multiplier: number) => void;
}

export const MultiplierForm = ({
  currentMultiplier,
  onChange,
}: MultiplierFormProps) => {

  const MULTIPLIERS = [0.5, 1, 2];

  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState(0.1);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsCustom(false);
    onChange(Number(event.target.value));
  };

  const handleCustomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomValue(Number(event.target.value));
    if (isCustom) {
      onChange(Number(event.target.value));
    }
  };

  const handleIsCustom = () => {
    setIsCustom(true);
    onChange(Number(customValue));
  };

  return (
    <div>
      <form>
      {MULTIPLIERS.map(multiplier => 
        <label>
          <input 
            type="radio" 
            name="multiplier" 
            value={multiplier} 
            checked={currentMultiplier === multiplier && !isCustom} 
            onChange={handleChange} /> {multiplier}x
        </label>
      )}
      <label>
        <input 
          type="radio" 
          name="multiplier" 
          value="custom" 
          checked={isCustom} 
          onChange={handleIsCustom} /> custom
      </label>
      <input
        type="number"
        step={0.1}
        value={customValue}
        onChange={handleCustomChange}
      />
      </form>
    </div>
  );
}

export default MultiplierForm;
