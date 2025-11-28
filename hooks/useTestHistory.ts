import { useState, useEffect, useCallback } from 'react';
import { TestHistoryEntry, EndotelioResultado, NutrigenomicaResultado } from '../types';

const STORAGE_KEY = 'wellkitt-test-history';
const MAX_HISTORY_ITEMS = 10;

export const useTestHistory = () => {
  const [history, setHistory] = useState<TestHistoryEntry[]>([]);

  // Cargar historial desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      } catch (e) {
        console.error('Error parsing test history:', e);
        setHistory([]);
      }
    }
  }, []);

  // Guardar en localStorage cuando cambia el historial
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addTestResult = useCallback((
    testType: 'endotelio' | 'nutrigenomica',
    resultado: EndotelioResultado | NutrigenomicaResultado
  ) => {
    const newEntry: TestHistoryEntry = {
      id: `${testType}-${Date.now()}`,
      testType,
      fecha: new Date().toISOString(),
      resultado
    };

    setHistory(prev => {
      const updated = [newEntry, ...prev].slice(0, MAX_HISTORY_ITEMS);
      return updated;
    });
  }, []);

  const getHistoryByType = useCallback((testType: 'endotelio' | 'nutrigenomica') => {
    return history.filter(entry => entry.testType === testType);
  }, [history]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setHistory(prev => prev.filter(entry => entry.id !== id));
  }, []);

  return {
    history,
    addTestResult,
    getHistoryByType,
    clearHistory,
    deleteEntry
  };
};
