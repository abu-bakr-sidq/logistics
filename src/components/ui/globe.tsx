"use client";

export default function Globe() {
  return (
    <>
      <style>
        {`
          @keyframes earthRotate {
            0% { background-position: 0 0; }
            100% { background-position: 400px 0; }
          }

          @keyframes twinkling {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 1; }
          }
        `}
      </style>
      <div
        aria-hidden="true"
        className="relative h-[250px] w-[250px] overflow-hidden rounded-full shadow-[0_0_26px_rgba(255,255,255,0.24),-5px_0_8px_#c3f4ff_inset,15px_2px_25px_#000_inset,-24px_-2px_34px_#c3f4ff99_inset,250px_0_44px_#00000066_inset,150px_0_38px_#000000aa_inset]"
        style={{
          backgroundImage:
            "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg')",
          backgroundPosition: "left",
          backgroundSize: "cover",
          animation: "earthRotate 30s linear infinite",
        }}
      >
        {[
          ["-20px", "40px", "3s"],
          ["28px", "198px", "2.2s"],
          ["198px", "34px", "4s"],
          ["218px", "210px", "2.8s"],
          ["80px", "18px", "1.8s"],
          ["156px", "236px", "3.5s"],
        ].map(([left, top, duration]) => (
          <span
            key={`${left}-${top}`}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              animation: `twinkling ${duration} infinite`,
              left,
              top,
            }}
          />
        ))}
      </div>
    </>
  );
}
