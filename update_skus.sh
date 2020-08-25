#!/bin/sh

DATAFILE='./src/js/data.js'
TMPFILE='/tmp/bdiefinder.html'

# get the forum page
[ -f $TMPFILE ] || wget 'https://www.hardwareluxx.de/community/threads/die-ultimative-hardwareluxx-samsung-8gb-b-die-liste-alle-hersteller-17-01-20.1161530/' -O - | cat -v > $TMPFILE

# find SKUS with 'nein' in the third column
#
# <tr><td>AX4U460038G19-DRZ</td><td>2x8GB DDR4-4600 19-26-26-46 1.50V</td><td>ja</td>
#
KITS=$(grep -o '<tr><td>[^<]*</td><td>[^<]*</td><td>ja' $TMPFILE | sed "s/<tr><td>\([^<]*\)<\/td>.*/\1/")

# output SKUS not found in DATAFILE
echo "Add these"
echo
for KIT in $KITS; do
    if ! grep --quiet "'$KIT'" $DATAFILE; then
        echo "  '$KIT',"
    fi
done

echo
echo "and remove those"
echo

KITS=$(grep -o '<tr><td>[^<]*</td><td>[^<]*</td><td>nein' $TMPFILE | sed "s/<tr><td>\([^<]*\)<\/td>.*/\1/")

for KIT in $KITS; do
    if grep --quiet "'$KIT'" $DATAFILE; then
        echo "  '$KIT',"
    fi
done