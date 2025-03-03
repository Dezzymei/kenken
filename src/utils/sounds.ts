// Initialize audio objects
const hoverSound = new Audio('/sounds/hover.mp3');
const clickSound = new Audio('/sounds/click.mp3');

// Pre-load sounds
const loadSounds = () => {
  hoverSound.load();
  clickSound.load();
};

// Try to load sounds when the module initializes
loadSounds();

export const playHoverSound = () => {
  try {
    if (hoverSound.readyState >= 2) { // HAVE_CURRENT_DATA or higher
      hoverSound.currentTime = 0;
      hoverSound.volume = 0.3;
      const playPromise = hoverSound.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Hover sound playback failed:', error);
        });
      }
    } else {
      console.log('Hover sound not ready yet');
      // Retry loading
      hoverSound.load();
    }
  } catch (error) {
    console.log('Error playing hover sound:', error);
  }
};

export const playClickSound = () => {
  try {
    if (clickSound.readyState >= 2) { // HAVE_CURRENT_DATA or higher
      clickSound.currentTime = 0;
      clickSound.volume = 0.4;
      const playPromise = clickSound.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Click sound playback failed:', error);
        });
      }
    } else {
      console.log('Click sound not ready yet');
      // Retry loading
      clickSound.load();
    }
  } catch (error) {
    console.log('Error playing click sound:', error);
  }
}; 