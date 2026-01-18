import { useState, useEffect, useRef, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface UserSuggestion {
  user_id: string;
  username: string | null;
  display_name: string | null;
}

interface MentionInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  minHeight?: string;
}

export const MentionInput = ({
  value,
  onChange,
  placeholder = "What's on your mind?",
  maxLength = 5000,
  className,
  minHeight = "80px"
}: MentionInputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionStartIndex, setMentionStartIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Detect @ mentions while typing
  const detectMention = useCallback((text: string, cursorPos: number) => {
    const textBeforeCursor = text.slice(0, cursorPos);
    const mentionMatch = textBeforeCursor.match(/@([\w-]*)$/);
    
    if (mentionMatch) {
      const query = mentionMatch[1];
      const startIndex = cursorPos - query.length - 1;
      setMentionQuery(query);
      setMentionStartIndex(startIndex);
      return query;
    }
    
    setMentionQuery('');
    setMentionStartIndex(-1);
    return null;
  }, []);

  // Fetch user suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (mentionQuery.length === 0) {
        // Show recent/popular users when @ is typed without query
        setIsLoadingSuggestions(true);
        const { data } = await supabase
          .from('profiles')
          .select('user_id, username, display_name')
          .not('username', 'is', null)
          .limit(5);
        
        setSuggestions(data || []);
        setIsLoadingSuggestions(false);
        setShowSuggestions(true);
        return;
      }

      if (mentionQuery.length < 1) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsLoadingSuggestions(true);
      const { data } = await supabase
        .from('profiles')
        .select('user_id, username, display_name')
        .or(`username.ilike.%${mentionQuery}%,display_name.ilike.%${mentionQuery}%`)
        .not('username', 'is', null)
        .limit(5);

      setSuggestions(data || []);
      setIsLoadingSuggestions(false);
      setShowSuggestions(data && data.length > 0);
    };

    if (mentionStartIndex >= 0) {
      fetchSuggestions();
    } else {
      setShowSuggestions(false);
    }
  }, [mentionQuery, mentionStartIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursorPos = e.target.selectionStart || 0;
    onChange(newValue);
    detectMention(newValue, cursorPos);
    setSelectedIndex(0);
  };

  const insertMention = (user: UserSuggestion) => {
    if (mentionStartIndex < 0 || !user.username) return;

    const beforeMention = value.slice(0, mentionStartIndex);
    const afterMention = value.slice(mentionStartIndex + mentionQuery.length + 1);
    const newValue = `${beforeMention}@${user.username} ${afterMention}`;
    
    onChange(newValue);
    setShowSuggestions(false);
    setMentionStartIndex(-1);
    setMentionQuery('');
    
    // Focus back on textarea
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos = mentionStartIndex + user.username.length + 2;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && showSuggestions) {
      e.preventDefault();
      insertMention(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleBlur = () => {
    // Delay hiding to allow click on suggestion
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        maxLength={maxLength}
        className={cn(`resize-none border-0 focus-visible:ring-0 p-0 text-base`, className)}
        style={{ minHeight }}
      />
      
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-64 mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
        >
          {isLoadingSuggestions ? (
            <div className="p-3 text-center text-sm text-muted-foreground">
              Loading...
            </div>
          ) : suggestions.length === 0 ? (
            <div className="p-3 text-center text-sm text-muted-foreground">
              No users found
            </div>
          ) : (
            suggestions.map((user, index) => (
              <button
                key={user.user_id}
                onClick={() => insertMention(user)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors text-left",
                  index === selectedIndex && "bg-muted"
                )}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {(user.display_name || user.username || 'U')[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {user.display_name || 'Anonymous'}
                  </p>
                  {user.username && (
                    <p className="text-xs text-muted-foreground truncate">
                      @{user.username}
                    </p>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// Function to render content with mentions and links
export const renderContentWithMentionsAndLinks = (content: string) => {
  // Combined regex for URLs and mentions
  const combinedRegex = /(https?:\/\/[^\s]+)|(@[\w-]+)/g;
  const parts: Array<{ type: 'text' | 'url' | 'mention'; content: string }> = [];
  let lastIndex = 0;
  let match;

  while ((match = combinedRegex.exec(content)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: content.slice(lastIndex, match.index) });
    }

    if (match[1]) {
      // URL match
      parts.push({ type: 'url', content: match[1] });
    } else if (match[2]) {
      // Mention match
      parts.push({ type: 'mention', content: match[2] });
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({ type: 'text', content: content.slice(lastIndex) });
  }

  return parts.map((part, index) => {
    if (part.type === 'url') {
      return (
        <a
          key={index}
          href={part.content}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-600 hover:underline break-all"
        >
          {part.content}
        </a>
      );
    }
    
    if (part.type === 'mention') {
      const username = part.content.slice(1); // Remove @
      return (
        <span
          key={index}
          className="text-primary font-medium hover:underline cursor-pointer bg-primary/10 px-1 rounded"
          title={`View @${username}'s profile`}
        >
          {part.content}
        </span>
      );
    }
    
    return part.content;
  });
};

export default MentionInput;
