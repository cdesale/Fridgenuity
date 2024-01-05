let autocomplete;

export const loadGoogleMapsScript = (callback, apiKey) => {
    if (window.google && window.google.maps) {
      callback(); // Script is already loaded
      return;
    }
  
    const existingScript = document.getElementById('googleMapsScript');
    if (existingScript) {
      existingScript.addEventListener('load', callback); 
      return;
    }
  
    const script = document.createElement('script');
    script.id = 'googleMapsScript';
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=en`;
    script.onload = callback;
    document.head.appendChild(script);
  };
  

export const initAutocomplete = (inputId, callback) => {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) {
      console.error(`No input`);
      return;
    }
  
    autocomplete = new window.google.maps.places.Autocomplete(inputElement, { types: ['geocode'] });
    autocomplete.addListener('place_changed', () => callback(autocomplete));
  };
  
  export const getPlaceDetails = (autocompleteInstance) => {
    const place = autocompleteInstance.getPlace();
    if (place.geometry) {
      return {
        address: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      };
    } else {
      console.warn('Place details are missing geometry information.');
      return null;
    }
  };
  