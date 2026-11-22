@echo off
chcp 65001 >nul
cd /d "%~dp0"

REM ===== 1. 先在 GitHub 网页新建一个空仓库（不要勾选 README / LICENSE）=====
REM     https://github.com/new
REM ===== 2. 把仓库名改成你刚才建的名字 =====
set GH_USER=Jooooo8
set GH_REPO=yushuxin-dsh-theme-full
set REPO_URL=https://github.com/%GH_USER%/%GH_REPO%.git

echo.
echo Repository to push: %REPO_URL%
echo.
echo Current commit:
git log -1 --oneline
echo.

git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo Pushing via HTTPS...
echo (Git Credential Manager may pop up a GitHub sign-in window - please sign in)
echo.
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
  echo SUCCESS: pushed to %REPO_URL%
) else (
  echo FAILED. Common causes:
  echo   1. repo does not exist yet on GitHub - create it first
  echo   2. sign-in window was cancelled - allow Git Credential Manager
  echo   3. no repo scope - if using a token, grant the "repo" permission
)
echo.
pause
