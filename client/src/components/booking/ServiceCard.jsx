import React from 'react';
import { useTranslation } from 'react-i18next';
import * as LucideIcons from 'lucide-react';
import Card from '../common/Card';
import { LanguageContext } from '../../context/LanguageContext';

const ServiceCard = ({ service, onClick }) => {
  const { t } = useTranslation();
  const { isHindi } = React.useContext(LanguageContext);
  const IconComponent = LucideIcons[service.icon];

  return (
    <Card 
      hoverable 
      onClick={onClick}
      className="flex flex-col items-center justify-center text-center gap-3 min-h-[120px]"
    >
      <div className="bg-primary-light bg-opacity-10 p-4 rounded-full text-primary">
        {IconComponent && <IconComponent size={32} strokeWidth={1.5} />}
      </div>
      <span className="font-semibold text-gray-800">
        {isHindi ? service.hindi : service.label}
      </span>
    </Card>
  );
};

export default ServiceCard;
