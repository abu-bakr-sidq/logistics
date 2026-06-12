"use client";

import {
  Banknote,
  CheckCircle2,
  CreditCard,
  Factory,
  FileText,
  Home,
  MessageCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";
import RadialOrbitalTimeline, {
  TimelineItem,
} from "@/components/ui/radial-orbital-timeline";

const sourcingTimelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Enquiry",
    date: "Step 01",
    content:
      "Get in touch with our team, and we can discuss your product specs, timeline and quantity.",
    category: "Discovery",
    icon: MessageCircle,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Quote",
    date: "Step 02",
    content:
      "Our team will prepare a quote for you after discussing your product specs with our network of factories.",
    category: "Commercial",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed",
    energy: 95,
  },
  {
    id: 3,
    title: "Confirm Order/Design",
    date: "Step 03",
    content:
      "Depending on your order, it may require a custom design. Approval is required before sampling and production.",
    category: "Approval",
    icon: CheckCircle2,
    relatedIds: [2, 4],
    status: "completed",
    energy: 88,
  },
  {
    id: 4,
    title: "Payment",
    date: "Step 04",
    content:
      "Once you're happy with your quote and design, a deposit is made to commence your order.",
    category: "Commercial",
    icon: CreditCard,
    relatedIds: [3, 5],
    status: "in-progress",
    energy: 78,
  },
  {
    id: 5,
    title: "Production",
    date: "Step 05",
    content:
      "We monitor manufacturing schedules close-up. Production usually takes 3-5 weeks.",
    category: "Manufacturing",
    icon: Factory,
    relatedIds: [4, 6],
    status: "in-progress",
    energy: 68,
  },
  {
    id: 6,
    title: "Quality Control",
    date: "Step 06",
    content:
      "A member of our team does a full QC inspection report to ensure the order is to spec.",
    category: "Inspection",
    icon: ShieldCheck,
    relatedIds: [5, 7],
    status: "in-progress",
    energy: 58,
  },
  {
    id: 7,
    title: "Balance Payment",
    date: "Step 07",
    content:
      "Once you're happy with the production results, the balance payment is required to ship your order.",
    category: "Commercial",
    icon: Banknote,
    relatedIds: [6, 8],
    status: "pending",
    energy: 50,
  },
  {
    id: 8,
    title: "Shipping & Storage",
    date: "Step 08",
    content:
      "Orders are shipped via sea or air cargo. We also have a warehouse to consolidate with any orders.",
    category: "Logistics",
    icon: Truck,
    relatedIds: [7, 9],
    status: "pending",
    energy: 38,
  },
  {
    id: 9,
    title: "Delivery at Doorsteps",
    date: "Step 09",
    content:
      "After the consignment reaches the port, we clear the goods and dispatch them to the final destination.",
    category: "Fulfilment",
    icon: Home,
    relatedIds: [8],
    status: "pending",
    energy: 28,
  },
];

export function SourcingProcessSection() {
  return (
    <section
      id="sourcing-process"
      className="flex min-h-screen lg:h-screen w-full lg:snap-start flex-col overflow-y-auto lg:overflow-hidden bg-gradient-to-br from-[#1b4452] via-[#245b6d] to-[#123642] px-5 pb-6 pt-24 sm:px-8 lg:px-12"
    >
      <div className="relative z-30 mx-auto w-full max-w-xl lg:max-w-6xl shrink-0 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#3cd5f7]">
          Affhan Workflow
        </span>
        <h2 className="mt-2 text-[28px] font-semibold leading-tight tracking-[-0.01em] text-white sm:text-[34px] lg:text-[38px]">
          Process of Sourcing
        </h2>
      </div>

      <div className="min-h-0 flex-1">
        <RadialOrbitalTimeline timelineData={sourcingTimelineData} />
      </div>
    </section>
  );
}
