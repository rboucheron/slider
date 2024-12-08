document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('[data-state]');
    const toggleButton = document.querySelector('[data-sidebar="menu-button"]');
  
    toggleButton.addEventListener('click', () => {
      const currentState = sidebar.getAttribute('data-state');
      const newState = currentState === 'expanded' ? 'collapsed' : 'expanded';
      sidebar.setAttribute('data-state', newState);
    });
  });
  
  