#!/bin/bash

# Set up Emscripten environment
source emsdk/emsdk_env.sh

# Create output directory if it doesn't exist
mkdir -p public/wasm

# Compile C++ to WebAssembly
emcc src/wasm/sign_matcher.cpp \
    -o public/wasm/sign_matcher.js \
    -s WASM=1 \
    -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
    -s EXPORTED_FUNCTIONS='["_matchSign", "_getSignLetter", "_isValidImageId", "_getTotalSigns"]' \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s MODULARIZE=1 \
    -s EXPORT_NAME='SignMatcherModule' \
    -s ENVIRONMENT='web' \
    --bind \
    -O3

echo "WebAssembly build complete!"
echo "Generated files:"
echo "- public/wasm/sign_matcher.js"
echo "- public/wasm/sign_matcher.wasm"
