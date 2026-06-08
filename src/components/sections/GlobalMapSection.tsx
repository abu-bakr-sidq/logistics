import Image from "next/image";
import type { CSSProperties } from "react";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";

type Country = {
  name: string;
  code: string;
};

const countries: Country[] = [
  { name: "Saudi Arabia", code: "sa" },
  { name: "Afghanistan", code: "af" },
  { name: "Congo", code: "cd" },
  { name: "Costa Rica", code: "cr" },
  { name: "Ghana", code: "gh" },
  { name: "India", code: "in" },
  { name: "South Africa", code: "za" },
  { name: "Srilanka", code: "lk" },
  { name: "Indonesia", code: "id" },
  { name: "Iran", code: "ir" },
  { name: "Kenya", code: "ke" },
  { name: "Kuwait", code: "kw" },
  { name: "Malaysia", code: "my" },
  { name: "Tanzania", code: "tz" },
  { name: "Ethiopia", code: "et" },
  { name: "Zimbabwe", code: "zw" },
  { name: "Myanmar", code: "mm" },
  { name: "Nepal", code: "np" },
  { name: "Nigeria", code: "ng" },
  { name: "Qatar", code: "qa" },
  { name: "CHAD", code: "td" },
  { name: "Madagascar", code: "mg" },
  { name: "Mali", code: "ml" },
  { name: "Moldova", code: "md" },
  { name: "Morocco", code: "ma" },
  { name: "Nauru", code: "nr" },
  { name: "Netherlands", code: "nl" },
  { name: "New Zealand", code: "nz" },
  { name: "Norway", code: "no" },
  { name: "Panama", code: "pa" },
  { name: "Latvia", code: "lv" },
  { name: "Luxembourg", code: "lu" },
  { name: "Maldives", code: "mv" },
  { name: "Malta", code: "mt" },
  { name: "Micronesia", code: "fm" },
  { name: "Montenegro", code: "me" },
  { name: "Mozambique", code: "mz" },
  { name: "Namibia", code: "na" },
  { name: "Nicaragua", code: "ni" },
  { name: "Niger", code: "ne" },
  { name: "Vietnam", code: "vn" },
  { name: "Thailand", code: "th" },
  { name: "Singapore", code: "sg" },
  { name: "Philippines", code: "ph" },
  { name: "Bangladesh", code: "bd" },
  { name: "Pakistan", code: "pk" },
  { name: "Oman", code: "om" },
  { name: "Bahrain", code: "bh" },
  { name: "Turkey", code: "tr" },
  { name: "Egypt", code: "eg" },
  { name: "Jordan", code: "jo" },
  { name: "Israel", code: "il" },
  { name: "Iraq", code: "iq" },
  { name: "Lebanon", code: "lb" },
  { name: "Germany", code: "de" },
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "United Arab Emirates", code: "ae" },
  { name: "China", code: "cn" },
  { name: "Japan", code: "jp" },
  { name: "South Korea", code: "kr" },
  { name: "France", code: "fr" },
  { name: "Italy", code: "it" },
  { name: "Spain", code: "es" },
  { name: "Portugal", code: "pt" },
  { name: "Belgium", code: "be" },
  { name: "Switzerland", code: "ch" },
  { name: "Austria", code: "at" },
  { name: "Sweden", code: "se" },
  { name: "Denmark", code: "dk" },
  { name: "Finland", code: "fi" },
  { name: "Ireland", code: "ie" },
  { name: "Poland", code: "pl" },
  { name: "Czech Republic", code: "cz" },
  { name: "Hungary", code: "hu" },
  { name: "Romania", code: "ro" },
  { name: "Greece", code: "gr" },
  { name: "Bulgaria", code: "bg" },
  { name: "Croatia", code: "hr" },
  { name: "Serbia", code: "rs" },
  { name: "Ukraine", code: "ua" },
  { name: "Canada", code: "ca" },
  { name: "Mexico", code: "mx" },
  { name: "Brazil", code: "br" },
  { name: "Argentina", code: "ar" },
  { name: "Chile", code: "cl" },
  { name: "Colombia", code: "co" },
  { name: "Peru", code: "pe" },
  { name: "Ecuador", code: "ec" },
  { name: "Uruguay", code: "uy" },
  { name: "Paraguay", code: "py" },
  { name: "Bolivia", code: "bo" },
  { name: "Jamaica", code: "jm" },
  { name: "Australia", code: "au" },
  { name: "Fiji", code: "fj" },
  { name: "Papua New Guinea", code: "pg" },
  { name: "Algeria", code: "dz" },
  { name: "Tunisia", code: "tn" },
  { name: "Uganda", code: "ug" },
  { name: "Rwanda", code: "rw" },
  { name: "Zambia", code: "zm" },
  { name: "Botswana", code: "bw" },
  { name: "Senegal", code: "sn" },
  { name: "Ivory Coast", code: "ci" },
  { name: "Cameroon", code: "cm" },
  { name: "Angola", code: "ao" },
  { name: "Mauritius", code: "mu" },
  { name: "Seychelles", code: "sc" },
  { name: "Kazakhstan", code: "kz" },
  { name: "Uzbekistan", code: "uz" },
  { name: "Azerbaijan", code: "az" },
  { name: "Georgia", code: "ge" },
  { name: "Armenia", code: "am" },
];

const countryRows = [
  countries.slice(0, 34),
  countries.slice(34, 78),
  countries.slice(78),
];

function CountryPill({ country }: { country: Country }) {
  return (
    <div className="flex h-9 items-center gap-2 rounded-full bg-[#f8fafc] px-2.5 pr-3.5 text-slate-700 shadow-[0_5px_16px_rgba(15,23,42,0.05)] ring-1 ring-slate-200/55">
      <span
        aria-hidden="true"
        className="h-6 w-6 shrink-0 rounded-full bg-cover bg-center shadow-[0_2px_8px_rgba(15,23,42,0.12)] ring-1 ring-white"
        style={{
          backgroundImage: `url(https://flagcdn.com/w80/${country.code}.png)`,
        }}
      />
      <span className="whitespace-nowrap text-xs font-medium leading-none">
        {country.name}
      </span>
    </div>
  );
}

function CountryMarquee({
  countries,
  direction,
  duration,
}: {
  countries: Country[];
  direction: "left" | "right";
  duration: number;
}) {
  return (
    <div className="countries-marquee-mask overflow-hidden py-0.5">
      <div
        className={`flex w-max gap-3 ${
          direction === "left" ? "countries-marquee-left" : "countries-marquee-right"
        }`}
        style={{ "--countries-duration": `${duration}s` } as CSSProperties}
      >
        {[0, 1].map((setIndex) => (
          <div className="flex shrink-0 gap-3 pr-3" key={setIndex}>
            {countries.map((country, countryIndex) => (
              <CountryPill
                country={country}
                key={`${country.code}-${country.name}-${setIndex}-${countryIndex}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GlobalMapSection() {
  return (
    <section
      id="global-map"
      className="flex h-screen w-full snap-start flex-col overflow-hidden bg-white px-5 pb-8 pt-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto my-auto flex w-full max-w-[1460px] flex-col items-center justify-center overflow-hidden">
        <div className="h-[78px] w-full max-w-[1120px] sm:h-[88px] lg:h-[100px]">
          <VaporizeTextCycle
            texts={["We Source Products From 100+ Countries"]}
            font={{
              fontFamily: "Inter, Arial, sans-serif",
              fontSize: "46px",
              fontWeight: 600,
            }}
            color="rgb(2, 6, 23)"
            spread={3}
            density={6}
            animation={{
              vaporizeDuration: 0.9,
              fadeInDuration: 0.35,
            }}
            direction="left-to-right"
            alignment="center"
            tag={Tag.H2}
          />
        </div>

        <div className="relative mt-4 h-[34vh] min-h-[350px] w-full max-w-[980px]">
          <Image
            src="/images/map.png"
            alt="World map showing global sourcing routes"
            fill
            sizes="(max-width: 768px) 94vw, 980px"
            className="object-contain opacity-[0.52]"
            priority={false}
          />
        </div>

        <div className="mt-3 w-full space-y-2">
          <CountryMarquee countries={countryRows[0]} direction="right" duration={52} />
          <CountryMarquee countries={countryRows[1]} direction="left" duration={72} />
          <CountryMarquee countries={countryRows[2]} direction="right" duration={58} />
        </div>
      </div>
    </section>
  );
}
