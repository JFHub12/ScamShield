import React from 'react';
import { RiskTier } from '../types/scamshield';
import { AlertTriangle, Info, OctagonX, HelpCircle } from 'lucide-react';

interface RiskBadgeProps {
  tier: RiskTier;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  tier,
  label,
  size = 'md',
  showIcon = true
}) => {
  let bg = 'bg-[#2E86AB]/10';
  let text = 'text-[#2E86AB]';
  let border = 'border-[#2E86AB]/30';
  let defaultLabel = 'LOW CONCERN';
  let Icon = Info;

  switch (tier) {
    case 'low_concern':
      bg = 'bg-[#2E86AB]/10';
      text = 'text-[#2E86AB]';
      border = 'border-[#2E86AB]/30';
      defaultLabel = 'LOW CONCERN';
      Icon = Info;
      break;
    case 'suspicious':
      bg = 'bg-[#F2A33A]/15';
      text = 'text-[#9C5B08]';
      border = 'border-[#F2A33A]/40';
      defaultLabel = 'SUSPICIOUS';
      Icon = AlertTriangle;
      break;
    case 'high_risk':
      bg = 'bg-[#D64545]/12';
      text = 'text-[#D64545]';
      border = 'border-[#D64545]/40';
      defaultLabel = 'HIGH RISK';
      Icon = OctagonX;
      break;
    case 'unable_to_assess':
      bg = 'bg-[#7A869A]/15';
      text = 'text-[#4A5568]';
      border = 'border-[#7A869A]/35';
      defaultLabel = 'UNABLE TO ASSESS';
      Icon = HelpCircle;
      break;
  }

  const sizeClasses = {
    sm: 'text-[10px] py-0.5 px-2.5 font-bold tracking-wider',
    md: 'text-xs py-1 px-3 font-semibold tracking-wider',
    lg: 'text-sm py-1.5 px-4 font-bold tracking-wide'
  };

  const iconSizes = {
    sm: 'w-3 h-3 mr-1',
    md: 'w-3.5 h-3.5 mr-1.5',
    lg: 'w-4 h-4 mr-2'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${bg} ${text} ${border} ${sizeClasses[size]} uppercase select-none`}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{label || defaultLabel}</span>
    </span>
  );
};
