

set -e

echo "开始构建:::"

yarn build

echo "开始上传：：："

git init

git add .

git commit -m 'build'

git remote add origin git@github.com:chenxuyaoniming/CCblog.git

git remote -v

git fetch

git rebase origin/main

git push origin main:main --force

# git init
# git add .
# git commit -m "build"
# git branch -M main
# git remote add origin git@github.com:chenxuyaoniming/CCblog.git
# git push origin --delete main
# git push -u origin main

echo "上传完陈：：："

cd -