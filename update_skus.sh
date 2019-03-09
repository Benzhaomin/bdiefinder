#!/bin/sh

DATAFILE='./src/js/data.js'
TMPFILE='/tmp/bdiefinder.html'

# get the forum page
[ -f $TMPFILE ] || wget 'https://www.hardwareluxx.de/community/f13/die-ultimative-hardwareluxx-samsung-8gb-b-die-liste-alle-hersteller-02-03-19-a-1161530-print.html' -O $TMPFILE

# find SKUS with 'ja' in the third column
#
# <tr valign="top" class="cms_table_grid_tr"><td class="cms_table_grid_td">ZD4-SHC3600C17-64GDSD</td>
# <td class="cms_table_grid_td">2x32GB DDR4-3600 17-19-19-39 1.35V</td>
# <td class="cms_table_grid_td">ja</td>
#
KITS=$(grep -B 2 '<td class="cms_table_grid_td">ja</td>' $TMPFILE | grep tr | sed 's/^<tr.*td">\(.*\)<\/td>/\1/')

# output SKUS not found in DATAFILE
for KIT in $KITS; do
    if ! grep --quiet $KIT $DATAFILE; then
        echo "  '$KIT',"
    fi
done
