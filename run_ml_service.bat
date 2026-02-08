@echo off
echo Starting ML Service...
cd ml_service
pip install -r requirements.txt
python app.py
pause
