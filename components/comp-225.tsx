import { useId } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countries = [
  {
    continent: "Countries",
    items: [
      { value: "United States", label: "United States", flag: "🇺🇸" },
      { value: "United Kingdom", label: "United Kingdom", flag: "🇬🇧" },
      { value: "Germany", label: "Germany", flag: "🇩🇪" },
      { value: "Global", label: "Global", flag: "🌐" },
      { value: "Europe", label: "Europe", flag: "🇪🇺" },
    ],
  },
];

export default function Component() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2 ">
      <Select>
        <SelectTrigger
          id={id}
          className="[&>span_svg]:text-muted-foreground/80 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0"
        >
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
          {countries.map((continent) => (
            <SelectGroup key={continent.continent}>
              <SelectLabel className="ps-2">{continent.continent}</SelectLabel>
              {continent.items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <span className="text-lg leading-none">{item.flag}</span>{" "}
                  <span className="truncate">{item.label}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
