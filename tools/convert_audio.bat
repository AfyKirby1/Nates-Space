@echo off
cd /d "%~dp0"
echo ===================================================
echo 🎵 Nate's Audio Converter Tool
echo ===================================================
echo.

:: Check if ffmpeg.exe exists in this folder
if not exist "ffmpeg.exe" (
    echo ❌ ERROR: ffmpeg.exe not found in the tools folder!
    echo.
    echo Please move 'ffmpeg.exe' into this folder:
    echo %~dp0
    echo.
    echo Then run this script again.
    pause
    exit /b
)

:: Set paths
set "INPUT_FILE=..\assets\music\Dark Spaces Natee  V2.wav"
set "OUTPUT_FILE=..\assets\music\Dark Spaces Natee  V2.m4a"

echo Target File: %INPUT_FILE%
echo.

:: Check if input file exists
if not exist "%INPUT_FILE%" (
    echo ❌ ERROR: Input WAV file not found!
    echo Checked path: %INPUT_FILE%
    pause
    exit /b
)

echo Converting WAV to M4A (AAC)...
echo This helps mobile loading speeds! 🚀
echo.

:: Run ffmpeg conversion
:: -i: Input file
:: -c:a aac: Use AAC audio codec
:: -b:a 192k: Set bitrate to 192kbps (good balance of quality/size)
:: -movflags +faststart: Optimize for web streaming
ffmpeg.exe -i "%INPUT_FILE%" -c:a aac -b:a 192k -movflags +faststart "%OUTPUT_FILE%"

if %ERRORLEVEL% EQ 0 (
    echo.
    echo ✅ SUCCESS! Conversion complete.
    echo Created: %OUTPUT_FILE%
) else (
    echo.
    echo ❌ ERROR: Something went wrong with the conversion.
)

pause
