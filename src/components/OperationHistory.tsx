export interface HistoryEntry {
  id: number;
  num1: number;
  num2: number;
  operator: string;
  result: string;
}

interface OperationHistoryProps {
  history: HistoryEntry[];
}

export const OperationHistory = ({ history }: OperationHistoryProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-2xl">
      <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
        Historial
      </h2>

      {history.length === 0 ? (
        <div className="h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground text-center">
            No hay operaciones recientes
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="bg-secondary rounded-xl p-4 transition-all hover:bg-secondary/80"
            >
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  {entry.num1} {entry.operator} {entry.num2}
                </span>
                <span className="text-primary font-semibold text-lg">
                  = {entry.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
