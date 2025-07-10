import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { DialogClose } from "./ui/dialog";

interface SourcesSheetProps {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  sourcesBySection?: any;
  onClose?: () => void;
}

export function SourcesSheet({
  trigger,
  title = "Sources",
  description = "Reference sources for this information",
  sourcesBySection,
  onClose,
}: SourcesSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="gap-0">
        <SheetHeader className="bg-secondary/40">
          <SheetTitle className="text-lg">{title}</SheetTitle>
          {/* <SheetDescription>{description}</SheetDescription> */}
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-2">
          {sourcesBySection ? (
            // Display sources organized by section
            <div className="space-y-4">
              {Object.entries(sourcesBySection).map(
                ([key, section]: [string, any], idx) => {
                  if (section.count === 0) return null;

                  return (
                    <div
                      key={key}
                      className="border-b border-gray-200 pb-3 last:border-b-0 px-4"
                    >
                      <h3 className="font-semibold text-sm mb-2">
                        <span>{idx}.</span> {section.name}
                      </h3>
                      <div className="space-y-2">
                        {section.sources.map((url: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-start gap-2"
                            style={{
                              wordBreak: "break-all",
                              overflowWrap: "break-word",
                            }}
                          >
                            <span
                              className="text-xs font-mono text-muted-foreground min-w-[20px]"
                              style={{
                                wordBreak: "break-all",
                                overflowWrap: "break-word",
                              }}
                            >
                              &bull;
                            </span>
                            <Link
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline hover:text-blue-800 text-sm"
                              style={{
                                wordBreak: "break-all",
                                overflowWrap: "break-word",
                              }}
                            >
                              {url}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              No sources available
            </div>
          )}
        </div>
        <SheetClose asChild>
          <Button
            variant="outline"
            className="w-full rounded-none"
            onClick={onClose}
          >
            Close
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
