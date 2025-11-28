import { useEffect } from 'react';

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      // Guardar la posición actual del scroll
      const scrollY = window.scrollY;

      // Calcular el ancho de la scrollbar para evitar layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Aplicar estilos para bloquear scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';

      return () => {
        // Restaurar estilos
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';
        document.body.style.overflow = '';

        // Restaurar posición del scroll
        window.scrollTo(0, scrollY);
      };
    }
  }, [isLocked]);
};
