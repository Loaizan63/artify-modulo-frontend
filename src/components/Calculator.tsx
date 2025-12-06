import { useState } from "react";
import { OperationHistory, HistoryEntry } from "./OperationHistory";

type Operator = "+" | "-" | "×" | "÷";

export const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const calculate = (operator: Operator) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setError("Por favor ingresa números válidos");
      setResult(null);
      return;
    }

    let res: number;
    let operationResult: string;

    switch (operator) {
      case "+":
        res = n1 + n2;
        break;
      case "-":
        res = n1 - n2;
        break;
      case "×":
        res = n1 * n2;
        break;
      case "÷":
        if (n2 === 0) {
          setError("Error: No se puede dividir por cero");
          setResult(null);
          return;
        }
        res = n1 / n2;
        break;
    }

    operationResult = Number.isInteger(res) ? res.toString() : res.toFixed(4);
    
    setResult(operationResult);
    setError(null);

    const newEntry: HistoryEntry = {
      id: Date.now(),
      num1: n1,
      num2: n2,
      operator,
      result: operationResult,
    };

    setHistory((prev) => [newEntry, ...prev].slice(0, 10));
  };

  const clear = () => {
    setNum1("");
    setNum2("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto grid gap-6 md:grid-cols-2">
      {/* Calculator */}
      <div className="bg-card rounded-2xl p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
          Calculadora
        </h2>

        {/* Inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">
              Primer número
            </label>
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="Ingresa el primer número"
              className="w-full h-12 px-4 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">
              Segundo número
            </label>
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="Ingresa el segundo número"
              className="w-full h-12 px-4 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Operation Buttons */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => calculate("+")}
            className="h-14 rounded-xl bg-primary text-primary-foreground text-2xl font-medium hover:bg-primary/80 active:scale-95 transition-all"
          >
            +
          </button>
          <button
            onClick={() => calculate("-")}
            className="h-14 rounded-xl bg-primary text-primary-foreground text-2xl font-medium hover:bg-primary/80 active:scale-95 transition-all"
          >
            −
          </button>
          <button
            onClick={() => calculate("×")}
            className="h-14 rounded-xl bg-primary text-primary-foreground text-2xl font-medium hover:bg-primary/80 active:scale-95 transition-all"
          >
            ×
          </button>
          <button
            onClick={() => calculate("÷")}
            className="h-14 rounded-xl bg-primary text-primary-foreground text-2xl font-medium hover:bg-primary/80 active:scale-95 transition-all"
          >
            ÷
          </button>
        </div>

        {/* Clear Button */}
        <button
          onClick={clear}
          className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-accent/80 active:scale-95 transition-all mb-6"
        >
          Limpiar
        </button>

        {/* Result Display */}
        <div className="bg-secondary rounded-xl p-4 min-h-[80px] flex items-center justify-center">
          {error ? (
            <p className="text-destructive text-lg font-medium text-center">
              {error}
            </p>
          ) : result !== null ? (
            <p className="text-3xl font-semibold text-foreground">
              Resultado: <span className="text-primary">{result}</span>
            </p>
          ) : (
            <p className="text-muted-foreground text-lg">
              Ingresa números y selecciona una operación
            </p>
          )}
        </div>
      </div>

      {/* History */}
      <OperationHistory history={history} />
    </div>
  );
};
