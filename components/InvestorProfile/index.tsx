import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users } from "lucide-react";
import Image from "next/image";
import { InvestmentData } from "./investment-data";

interface CompanyData {
  "Company Name": string;
  Description: string;
  Sector: string;
  Revenue: number;
}

export default function InvestorProfile({ data }: { data: any }) {
  // Static fallback data for fields not passed as props
  const staticData = {
    country: "United States",
    city: "New York",
    website: "www.investor.com",
    imageUrl: "https://placehold.co/50x50",
    investorTypes: [
      "Direct ",
      "Co-Invest",
      "FoF ",
      "Institutional",
      "Secondary ",
      "Individual ",
      "Corporate",
    ],
    assetClasses: [
      "Private Equity",
      "Venture Capital",
      "Angel Investors",
      "Real Estate",
      "Infrastructure",
    ],
    description:
      "One of Silicon Valley’s most legendary VC firms, Sequoia has made significant investments in AI, including Nvidia, OpenAI, DeepMind, and RunwayML. They support companies from seed to IPO, and their influence has shaped many of the biggest names in tech.",
  };

  return (
    <div className="w-full h-full border-none p-1.5 pt-1">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="p-8 bg-gradient-to-r from-slate-50 to-gray-50 border-b rounded-xl">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 relative flex-shrink-0">
              <Image
                src={staticData.imageUrl}
                alt={`${data.investor_name || "Investor Name"} Logo`}
                fill
                className="rounded-xl object-cover border shadow-sm"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {data.investor_name || "Investor Name"}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <span>🇺🇸</span>
                  {staticData.city}, {staticData.country}
                </div>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span>🌐</span>
                  {staticData.website}
                </a>
              </div>
              {/* Investor Types */}
              <div className="flex flex-wrap gap-2 mt-2">
                {staticData.investorTypes.map((type, idx) => (
                  <Badge key={idx} variant="secondary">
                    {type}
                  </Badge>
                ))}
              </div>
              {/* Asset Classes */}
              <div className="flex flex-wrap gap-2 mt-2">
                {staticData.assetClasses.map((as, idx) => (
                  <Badge key={as} variant="secondary">
                    {as}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-sm px-8">
          <span className="font-medium">Description:</span>
          <p className="mt-1 text-gray-700 leading-relaxed">
            {data.company_description || staticData.description}
          </p>
        </div>

        {/* Investments Section */}
        <div className="text-sm flex flex-col gap-2 px-8">
          <span className="font-medium pb-2">Investments:</span>
          <InvestmentData />
        </div>
      </div>
    </div>
  );
}
