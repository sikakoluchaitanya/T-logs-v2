import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { blogTags } from "@/constants/blog-tags";
import { Badge } from "./ui/badge";

interface BlogTagsPickerProps {
  selectedTags: string[];
  onTagSelection: (tags: string[]) => void;
}

export function BlogTagsPicker({
  selectedTags,
  onTagSelection,
}: BlogTagsPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleRemoveTag = (tagValue: string) => {
    const newTags = selectedTags.filter((item) => item !== tagValue);
    onTagSelection(newTags); // Call parent callback
  };

  return (
    <div className="w-full">
      {selectedTags.length > 0 && !isCollapsed && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1 group"
            >
              {tag}
              <button
                type="button"
                className="w-3 h-3 transition-opacity opacity-50 cursor-pointer group-hover:opacity-100"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveTag(tag);
                }}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedTags.length > 3 && (
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => setIsCollapsed(true)}
            >
              Show Less
            </Badge>
          )}
        </div>
      )}
      {selectedTags.length > 0 && isCollapsed && (
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">
            {selectedTags.length} topics selected
          </Badge>
          <Badge
            variant="outline"
            className="cursor-pointer hover:bg-secondary/80"
            onClick={() => setIsCollapsed(false)}
          >
            Show All
          </Badge>
        </div>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full px-2 py-6 cursor-pointer"
          >
            {selectedTags.length > 0
              ? "Select all topics that apply..."
              : "Select Related Topics..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command className="w-full">
            <CommandInput placeholder="Search blogTags..." className="h-10" />
            <CommandList>
              <CommandEmpty>No related topics found.</CommandEmpty>
              <CommandGroup>
                {blogTags.map((tag) => (
                  <CommandItem
                    className="py-4"
                    key={tag.value}
                    value={tag.value}
                    onSelect={(currentValue) => {
                      const newTags = selectedTags.includes(currentValue)
                        ? selectedTags.filter((item) => item !== currentValue)
                        : [...selectedTags, currentValue];
                      onTagSelection(newTags); // Call parent callback
                    }}
                  >
                    {tag.label}
                    <Check
                      className={cn(
                        " h-4 w-4",
                        selectedTags.includes(tag.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
