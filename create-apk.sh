#!/bin/bash

# Variabelen
AAB_FILE=$1  # Vervang dit met de naam van je AAB bestand
BUNDLETOOL_JAR="bundletool-all-1.18.1.jar"  # Vervang dit met de naam van je bundletool JAR bestand
OUTPUT_DIR="output"
TEMP_DIR="tmp"

# Maak de output en temp directories aan
mkdir -p "$OUTPUT_DIR"
mkdir -p "$TEMP_DIR"

# Zet het AAB bestand om naar APKs
echo "AAB omzetten naar APKs..."
java -jar "$BUNDLETOOL_JAR" build-apks --bundle="$AAB_FILE" --output="$TEMP_DIR/apks.apks" --mode=universal

mv "$TEMP_DIR/apks.apks" "$TEMP_DIR/apks.zip"
# Pak de APKs uit in de temp directory
echo "APKs uitpakken..."
unzip "$TEMP_DIR/apks.zip" -d "$TEMP_DIR"

# Verplaats de universal.apk naar de output directory
echo "Universal APK verplaatsen..."
mv "$TEMP_DIR/universal.apk" "$OUTPUT_DIR/"

# Ruim de temp directory op
echo "Tijdelijke bestanden opruimen..."
rm -rf "$TEMP_DIR"

echo "Klaar! Je vindt de universal.apk in de $OUTPUT_DIR directory."
