import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type PrimaryInputProps = {
  type: string;
  label?: string;
  placeholder: string;
  icon?: React.ReactNode;
  required?: boolean;
  noOutline?: boolean;
  maxWidth?: boolean;
};

const PrimaryInput = ({
  type,
  label,
  icon,
  placeholder,
  required,
  noOutline,
  maxWidth = true,
  ...props
}: PrimaryInputProps) => {
  return (
    <div
      className={`grid w-full ${maxWidth ? 'max-w-[336px]' : ''} relative  items-center gap-1.5 text-white mb-6`}
    >
      {label && <Label htmlFor='email'>Email</Label>}
      <Input
        type={type}
        id={type}
        placeholder={placeholder}
        icon={icon}
        required={required}
        noOutline={noOutline}
        {...props}
      />
    </div>
  );
};

export default PrimaryInput;