import {useEffect} from 'react';

export function useOnClickOutside(refs, handleClick, ignoreClass) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (refs.every((ref) => ref.current && !ref.current.contains(event.target))) {
        let triggerClick = true;
        const ignoreClasses = ignoreClass?.split(' ');

        if (ignoreClasses?.length) {
          const targetButton = event?.target.closest('button');
          if (targetButton) {
            ignoreClasses.forEach((item) => {
              if (targetButton.className.includes(item)) triggerClick = false;
            });
          }
          ignoreClasses.forEach((i) => {
            if (typeof event.target.className === 'object') {
              const svg = event.target.className.__proto__.constructor.name;
              if (svg.includes(i)) triggerClick = false;
            } else if (event.target.closest(`.${i}`)) triggerClick = false;
          });
        }
        if (triggerClick) handleClick(event);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, refs);
}
