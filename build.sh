

set -e

echo "开始构建:::"

yarn build

echo "开始复制：：："

cp -f docs/.vuepress/dist/* ../CCblog

echo "复制完成:::"

echo "开始上传:::"

cd ../CCblog

git add .

git commit -m 'save:::ok'

git push origin release

echo "上传完成：：："

cd -