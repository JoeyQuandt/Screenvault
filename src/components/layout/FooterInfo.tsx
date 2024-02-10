type FooterInfoProps = {
  title: string;
  children: React.ReactNode;
};

export default function FooterInfo({ title, children }: FooterInfoProps) {
  return (
    <div>
      <h3>{title}</h3>
      {children}
    </div>
  );
}
