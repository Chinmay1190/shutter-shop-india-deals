
import React from 'react';
import { IndianRupee } from 'lucide-react';

interface FormattedPriceProps {
  price: number;
  className?: string;
  iconSize?: number;
}

const FormattedPrice: React.FC<FormattedPriceProps> = ({ 
  price, 
  className = "", 
  iconSize = 4 
}) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price).replace('₹', '');

  return (
    <span className={`flex items-center ${className}`}>
      <IndianRupee className={`h-${iconSize} w-${iconSize} mr-1`} /> 
      {formattedPrice}
    </span>
  );
};

export default FormattedPrice;
