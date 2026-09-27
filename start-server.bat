@echo off
echo ==========================================
echo  Starting portfolio server (background)...
echo ==========================================
powershell -NoProfile -Command "Start-Process -WindowStyle Hidden -FilePath 'C:\Users\Chaitanya\AppData\Local\Programs\Python\Python311\python.exe' -ArgumentList '-m','http.server','8000','--directory','C:\Users\Chaitanya\portfolio'"
timeout /t 3 >nul
start http://localhost:8000
echo Done! Portfolio should open in your browser.
pause
