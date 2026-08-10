export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4 bg-void">
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-4 w-1.5 h-1.5 bg-gold/30 rotate-45" />
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </div>
  );
}
