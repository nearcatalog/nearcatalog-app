"use client"

import { useSearchModalStore } from "@/store/search-modal-store";
import { useSearchStore } from "@/store/search-store";

interface SearchInputProps {
  bgColor?: string;
  autoSelect?: boolean;
  showClearButton?: boolean;
  fullWidth?: boolean;
}

export default function SearchInput({
  bgColor,
  showClearButton,
  autoSelect,
  fullWidth
}: SearchInputProps) {
  const { searchKey, setSearchKey, showInactive, setShowInactive } = useSearchStore();
  const {
    isOpen,
    searchKey: modalSearchKey,
    setSearchKey: setModalSearchKey,
  } = useSearchModalStore();

  const handleSearchKeyChange = (e: any) => {
    if (isOpen) {
      setModalSearchKey(e.target.value);
    } else {
      setSearchKey(e.target.value);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-stretch md:items-end gap-3 group">
      <div className={`relative w-full ${fullWidth ? '' : 'md:max-w-72'}`}>
        <input
          autoFocus={autoSelect}
          type="text"
          name="search"
          value={isOpen ? modalSearchKey : searchKey}
          placeholder="SEARCH_SYSTEM..."
          onChange={handleSearchKeyChange}
          className="search-input !w-full !max-w-none !pl-11 h-11 bg-white/5 border-white/10 hover:border-accent-primary focus:border-accent-primary focus:bg-white/10 transition-all cursor-text text-sm shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]"
        />
        <i className="bi bi-search absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sm text-accent-primary/60 group-hover:text-accent-primary group-hover:drop-shadow-[0_0_8px_rgba(0,255,163,0.5)] transition-all" />
        {showClearButton && modalSearchKey !== "" && (
          <button
            className="absolute right-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-sm text-accent-primary/80 hover:text-accent-primary"
            onClick={() => {
              setModalSearchKey("");
            }}
          >
            <i className="bi bi-x" />
          </button>
        )}
      </div>
      <div className="flex items-center justify-end md:justify-end gap-2 text-[10px] text-white/50 font-mono tracking-widest uppercase mt-[-4px] px-1 group cursor-pointer" onClick={() => setShowInactive(!showInactive)}>
        <input
          id="showInactive"
          type="checkbox"
          className="h-3 w-3 cursor-pointer rounded-sm border-white/20 bg-black/50 text-accent-primary focus:ring-1 focus:ring-accent-primary focus:ring-offset-0 focus:ring-offset-transparent transition-all"
          checked={showInactive}
          onChange={(e) => {
            e.stopPropagation();
            setShowInactive(e.target.checked);
          }}
        />
        <label htmlFor="showInactive" className="cursor-pointer select-none group-hover:text-accent-primary transition-colors">
          Show inactive
        </label>
      </div>
    </div>
  );
}
