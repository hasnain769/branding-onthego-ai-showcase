interface MetricCardProps {
  value: string;
  label: string;
}

const MetricCard = ({ value, label }: MetricCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow animate-scale-in">
      <div className="text-4xl font-bold gradient-text mb-2">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

export default MetricCard;
