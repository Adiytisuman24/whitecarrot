import { ContentSection } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Trash2, GripVertical } from "lucide-react";

interface EditorSectionProps {
  section: ContentSection;
  onUpdate: (updates: Partial<ContentSection>) => void;
  onDelete: () => void;
}

export function EditorSection({ section, onUpdate, onDelete }: EditorSectionProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
            <span className="text-sm font-medium uppercase tracking-wider text-gray-500">{section.type}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onDelete} className="text-red-500 hover:bg-red-50 hover:text-red-600">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <Input
          placeholder="Section Title"
          value={section.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="font-bold text-lg"
        />
        
        <textarea
          className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Content (Markdown supported)"
          value={section.content}
          onChange={(e) => onUpdate({ content: e.target.value })}
        />

        {section.type !== 'text' && (
             <Input
                placeholder="Image URL (optional)"
                value={section.imageUrl || ''}
                onChange={(e) => onUpdate({ imageUrl: e.target.value })}
              />
        )}
      </div>
    </div>
  );
}
