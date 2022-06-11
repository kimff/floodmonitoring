@echo off
sc stop cloudflared >nul 2>&1
rename "C:\Users\arabe\cloudflared.exe" cloudflared.exe.old
rename "C:\Users\arabe\cloudflared.exe.new" cloudflared.exe
del "C:\Users\arabe\cloudflared.exe.old"
sc start cloudflared >nul 2>&1
del cfd_update.bat