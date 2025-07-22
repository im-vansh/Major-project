#include <emscripten.h>
#include <emscripten/bind.h>

extern "C" {
    // Main matching function that maps image IDs to alphabet letters
    EMSCRIPTEN_KEEPALIVE
    char matchSign(int imageId) {
        // Simple hardcoded mapping: imageId 1-26 maps to A-Z
        if (imageId >= 1 && imageId <= 26) {
            return 'A' + (imageId - 1);
        }
        
        // Return null character for invalid IDs
        return '\0';
    }
    
    // Helper function to get the alphabet letter as a string
    EMSCRIPTEN_KEEPALIVE
    const char* getSignLetter(int imageId) {
        static char result[2] = {0, 0}; // Static buffer for the result
        char letter = matchSign(imageId);
        
        if (letter != '\0') {
            result[0] = letter;
            result[1] = '\0';
            return result;
        }
        
        return nullptr;
    }
    
    // Function to validate if an image ID is in valid range
    EMSCRIPTEN_KEEPALIVE
    bool isValidImageId(int imageId) {
        return imageId >= 1 && imageId <= 26;
    }
    
    // Function to get total number of supported signs
    EMSCRIPTEN_KEEPALIVE
    int getTotalSigns() {
        return 26; // A-Z
    }
}

// Using Embind for easier C++ to JavaScript binding
using namespace emscripten;

EMSCRIPTEN_BINDINGS(sign_language_module) {
    function("matchSign", &matchSign);
    function("getSignLetter", &getSignLetter, allow_raw_pointers());
    function("isValidImageId", &isValidImageId);
    function("getTotalSigns", &getTotalSigns);
}