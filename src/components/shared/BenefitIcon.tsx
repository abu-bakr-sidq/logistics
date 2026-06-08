export function BenefitIcon({ icon }: { icon: string }) {
  const commonProps = {
    className: "h-5 w-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.9",
  };

  if (icon === "shield") {
    return (
      <svg {...commonProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5.5 5.8v5.7c0 4.2 2.8 7.9 6.5 9.1 3.7-1.2 6.5-4.9 6.5-9.1V5.8L12 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.9 12 2 2 4.3-5" />
      </svg>
    );
  }

  if (icon === "layers") {
    return (
      <svg {...commonProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m12 4 8 4-8 4-8-4 8-4Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m4 12 8 4 8-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m4 16 8 4 8-4" />
      </svg>
    );
  }

  if (icon === "box") {
    return (
      <svg {...commonProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12 4.5 7.7M12 12l7.5-4.3M12 12v8.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m16 5.2-7.5 4.3" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h6v6H5zM15 5h4v4h-4zM5 15h4v4H5zM13 13h6v6h-6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m7 8 1.3 1.3L11 6.7" />
    </svg>
  );
}
