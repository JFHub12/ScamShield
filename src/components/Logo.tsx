import React from 'react';

export const SCAMSHIELD_LOGO_URL = 'https://res.cloudinary.com/jsg7ebov/image/upload/v1793200255/Shield_illustration_isolated_on_white_background_virtual_security_concept_shield_illustration___Premium_AI-generated_image.jpg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', showText = false }) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className={`relative ${sizeMap[size]} rounded-xl overflow-hidden shadow-sm border border-[#0E9F8E]/30 bg-white flex items-center justify-center shrink-0`}>
        <img
          src={SCAMSHIELD_LOGO_URL}
          alt="ScamShield Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[#0F172A] tracking-tight leading-none text-base">
              SCAMSHIELD
            </span>
            <span className="bg-[#0F2A47] text-[#0E9F8E] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
              DEFENSE
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium tracking-wide">
            Frontline Fraud Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
