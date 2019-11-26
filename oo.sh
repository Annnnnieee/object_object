# run with sh oo.sh <https git link>
git clone "$1"

cd "lol"
git log | grep -m 6 commit | cut -c8- | sed 's/^/(cd lol ; git checkout /' | sed 's/$/;git fetch) \'$'\n(cd .. ; node .\/oo\/410\-analysis\/index.js \".\/oo\/lol\/\")/' > ./../commits.sh
cd ..
sh commits.sh

