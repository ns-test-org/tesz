'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const Button = ({ 
    onClick, 
    className = '', 
    children, 
    variant = 'default' 
  }: { 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode;
    variant?: 'default' | 'operator' | 'equals' | 'clear';
  }) => {
    const baseClasses = 'h-16 text-xl font-semibold rounded-xl transition-all duration-150 active:scale-95 shadow-lg';
    
    const variantClasses = {
      default: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
      operator: 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-200 dark:shadow-blue-900',
      equals: 'bg-green-500 hover:bg-green-600 text-white shadow-green-200 dark:shadow-green-900',
      clear: 'bg-red-500 hover:bg-red-600 text-white shadow-red-200 dark:shadow-red-900'
    };

    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 w-full max-w-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
            Calculator
          </h1>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 min-h-[80px] flex items-center justify-end">
            <div className="text-right">
              <div className="text-3xl font-mono font-bold text-gray-800 dark:text-white break-all">
                {display}
              </div>
              {operation && previousValue !== null && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {previousValue} {operation}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button onClick={clear} variant="clear" className="col-span-2">
            Clear
          </Button>
          <Button onClick={() => performOperation('÷')} variant="operator">
            ÷
          </Button>
          <Button onClick={() => performOperation('×')} variant="operator">
            ×
          </Button>

          {/* Row 2 */}
          <Button onClick={() => inputNumber('7')}>7</Button>
          <Button onClick={() => inputNumber('8')}>8</Button>
          <Button onClick={() => inputNumber('9')}>9</Button>
          <Button onClick={() => performOperation('-')} variant="operator">
            −
          </Button>

          {/* Row 3 */}
          <Button onClick={() => inputNumber('4')}>4</Button>
          <Button onClick={() => inputNumber('5')}>5</Button>
          <Button onClick={() => inputNumber('6')}>6</Button>
          <Button onClick={() => performOperation('+')} variant="operator">
            +
          </Button>

          {/* Row 4 */}
          <Button onClick={() => inputNumber('1')}>1</Button>
          <Button onClick={() => inputNumber('2')}>2</Button>
          <Button onClick={() => inputNumber('3')}>3</Button>
          <Button onClick={handleEquals} variant="equals" className="row-span-2">
            =
          </Button>

          {/* Row 5 */}
          <Button onClick={() => inputNumber('0')} className="col-span-2">
            0
          </Button>
          <Button onClick={inputDecimal}>.</Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Built with Next.js & Tailwind CSS
        </div>
      </div>
    </div>
  );
}

