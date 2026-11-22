@echo off
chcp 65001 >nul
cd /d "%~dp0"

REM ===== 1. 先在 GitHub 网页新建一个空仓库（不要勾选 README / LICENSE）=====
REM ===== 2. 把下面两处换成你自己的用户名和仓库名 =====
set GH_USER=Jooooo8
set GH_REPO=yushuxin-dsh-theme-full
set REPO_URL=git@github.com:%GH_USER%/%GH_REPO%.git

echo.
echo Repository to push: %REPO_URL%
echo.
echo Current commit:
git log -1 --oneline
echo.

git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo Pushing...
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
  echo SUCCESS: pushed to %REPO_URL%
) else (
  echo FAILED. Common causes:
  echo   - repo does not exist yet on GitHub
  echo   - no SSH key added to your GitHub account
  echo   - network ^(try HTTPS: set REPO_URL=https://github.com/%GH_USER%/%GH_REPO%.git^)
)
echo.
pause
