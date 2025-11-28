import { useState, useEffect, useCallback } from 'react';
import { Recommendation } from '../types';

export interface RecommendationHistoryEntry {
  id: string;
  timestamp: string;
  userInput: string;
  healthAreas: string[];
  goal: string;
  recommendation: Recommendation;
}

const STORAGE_KEY = 'wellkitt-recommendation-history';
const MAX_HISTORY_ITEMS = 10;

export const useRecommendationHistory = () => {
  const [history, setHistory] = useState<RecommendationHistoryEntry[]>([]);

  // Cargar historial desde localStorage al inicializar
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY);
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
      }
    } catch (error) {
      console.error('Error loading recommendation history:', error);
    }
  }, []);

  // Guardar en localStorage cuando cambie el historial
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving recommendation history:', error);
    }
  }, [history]);

  const addRecommendation = useCallback((
    userInput: string,
    healthAreas: string[],
    goal: string,
    recommendation: Recommendation
  ) => {
    const newEntry: RecommendationHistoryEntry = {
      id: `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      userInput,
      healthAreas,
      goal,
      recommendation,
    };

    setHistory(prev => {
      const updated = [newEntry, ...prev].slice(0, MAX_HISTORY_ITEMS);
      return updated;
    });

    return newEntry.id;
  }, []);

  const deleteRecommendation = useCallback((id: string) => {
    setHistory(prev => prev.filter(entry => entry.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const getRecommendationById = useCallback((id: string) => {
    return history.find(entry => entry.id === id);
  }, [history]);

  return {
    history,
    addRecommendation,
    deleteRecommendation,
    clearHistory,
    getRecommendationById,
    hasHistory: history.length > 0,
  };
};
