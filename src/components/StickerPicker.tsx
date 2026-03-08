import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Sticker } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const STICKER_CATEGORIES = {
  pride: {
    label: '🏳️‍🌈 Pride',
    stickers: [
      '🏳️‍🌈', '🏳️‍⚧️', '🌈', '❤️‍🔥', '💜', '💛', '💚', '💙',
      '🧡', '❤️', '🩷', '🩵', '💗', '💖', '💝', '💞',
      '✨', '⭐', '🌟', '💫', '🎉', '🎊', '🦄', '🦋',
    ],
  },
  love: {
    label: '💕 Love',
    stickers: [
      '😍', '🥰', '😘', '💋', '💌', '💘', '💝', '💞',
      '💓', '💗', '💖', '💕', '❣️', '💟', '♥️', '🫶',
      '👨‍❤️‍👨', '👩‍❤️‍👩', '👨‍❤️‍💋‍👨', '👩‍❤️‍💋‍👩', '💑', '👫', '👬', '👭',
    ],
  },
  mood: {
    label: '😊 Mood',
    stickers: [
      '😊', '🥳', '😎', '🤩', '😁', '🤗', '😇', '🫡',
      '💪', '🙌', '👏', '🤝', '✊', '🤟', '🫰', '👋',
      '🔥', '💯', '⚡', '🎵', '🎶', '🎤', '🕺', '💃',
    ],
  },
  nature: {
    label: '🌸 Nature',
    stickers: [
      '🌸', '🌺', '🌻', '🌼', '🌷', '🌹', '💐', '🌿',
      '🍀', '🌱', '🌲', '🌳', '🌴', '🌵', '🪴', '🍄',
      '🌙', '☀️', '🌤️', '⛅', '🌊', '🏔️', '🏖️', '🌅',
    ],
  },
};

interface StickerPickerProps {
  onSelect: (sticker: string) => void;
  selectedSticker: string | null;
}

export const StickerPicker = ({ onSelect, selectedSticker }: StickerPickerProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (sticker: string) => {
    onSelect(sticker === selectedSticker ? '' : sticker);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`text-muted-foreground hover:text-primary ${selectedSticker ? 'text-primary bg-primary/10' : ''}`}
          title="Add sticker"
        >
          {selectedSticker ? (
            <span className="text-lg leading-none">{selectedSticker}</span>
          ) : (
            <Sticker className="h-5 w-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2" align="start" sideOffset={8}>
        <Tabs defaultValue="pride">
          <TabsList className="w-full h-auto flex-wrap gap-0.5 bg-muted/50 p-1">
            {Object.entries(STICKER_CATEGORIES).map(([key, cat]) => (
              <TabsTrigger key={key} value={key} className="text-xs px-2 py-1">
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(STICKER_CATEGORIES).map(([key, cat]) => (
            <TabsContent key={key} value={key} className="mt-2">
              <div className="grid grid-cols-8 gap-0.5">
                {cat.stickers.map((sticker) => (
                  <button
                    key={sticker}
                    onClick={() => handleSelect(sticker)}
                    className={`h-9 w-9 flex items-center justify-center text-xl rounded-md transition-colors hover:bg-primary/10 ${
                      selectedSticker === sticker ? 'bg-primary/20 ring-2 ring-primary' : ''
                    }`}
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        {selectedSticker && (
          <div className="border-t border-border mt-2 pt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Selected: {selectedSticker}</span>
            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => { onSelect(''); setOpen(false); }}>
              Remove
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
