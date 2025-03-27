import { ReactNode } from 'react';
import { useFilterStore } from '@/store/useFilterStore';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface CollapsibleWrapperProps {
  children: ReactNode;
}

const CollapsibleWrapper: React.FC<CollapsibleWrapperProps> = ({ children }) => {
  const { isCollapsed, toggleCollapse } = useFilterStore();

  return (
    <div className="bg-[#fbfbfb] w-full transition-all duration-300">
      <div className="flex justify-between items-center border-b border-gray-200 px-4">
        <h1 className="text-gray-900 font-medium text-sm">Filters</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className="flex items-center transition-all duration-300 cursor-pointer"
        >
          <span className="">Filters</span>
          <div className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}>
            {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </div>
        </Button>
      </div>
      <div
        className={cn(`max-h-[1000px] transition-all duration-300 px-4 py-2 bg-gray-50`, {
          'max-h-0 overflow-hidden': isCollapsed,
        })}
      >
        {!isCollapsed && <div className="md:flex min-h-[140px] gap-8">{children}</div>}
      </div>
    </div>
  );
};

export default CollapsibleWrapper;
