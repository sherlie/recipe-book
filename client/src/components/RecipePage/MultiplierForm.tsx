import type { ChangeEvent } from "react";

interface MultiplierFormProps {
  currentMultiplier: number;
  onChange: (multiplier: number) => void;
}

export const MultiplierForm = ({
  currentMultiplier,
  onChange,
}: MultiplierFormProps) => {

  const MULTIPLIERS = [0.5, 1, 2];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
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
            checked={currentMultiplier === multiplier} 
            onChange={handleChange} /> {multiplier}x
        </label>
      )}
      </form>
    </div>
  );
}

export default MultiplierForm;
